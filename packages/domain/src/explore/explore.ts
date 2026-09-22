import type { Prisma, SdfNodeType } from '@prisma/client';
import type { WorkspaceDeps } from '../workspace/types';
import { canReadCurrentPublicResearch } from '../visibility/current-public-access';

export const EXPLORE_ARTIFACT_TYPES = ['document', 'image', 'data', 'code', 'video', 'other'] as const;
export type ExploreArtifactType = (typeof EXPLORE_ARTIFACT_TYPES)[number];

export interface ResearchIndexItem {
  publicId: string;
  title: string;
  url: string;
  latestVersion: number;
  publishedAt: string | null;
  updatedAt: string;
  insight: string | null;
  fields: SdfNodeType[];
  artifactTypes: ExploreArtifactType[];
  authors: string[];
}

export interface ResearchIndexPage {
  items: ResearchIndexItem[];
  nextCursor: string | null;
}

const EXTENSIONS: Record<Exclude<ExploreArtifactType, 'other'>, string[]> = {
  document: ['.pdf', '.doc', '.docx', '.md', '.tex', '.txt', '.rtf'],
  image: ['.png', '.jpg', '.jpeg', '.tif', '.tiff', '.webp'],
  data: ['.csv', '.tsv', '.json', '.yaml', '.yml', '.parquet', '.h5', '.hdf5'],
  code: ['.py', '.r', '.ipynb', '.jl', '.m', '.sh'],
  video: ['.mp4', '.webm', '.mov', '.avi'],
};

function entryCondition(type: ExploreArtifactType): Prisma.ManifestEntryWhereInput {
  const known = Object.values(EXTENSIONS).flat();
  if (type === 'other') {
    return { AND: known.map((extension) => ({ logicalPath: { not: { endsWith: extension, mode: 'insensitive' } } })) };
  }
  return { OR: EXTENSIONS[type].map((extension) => ({ logicalPath: { endsWith: extension, mode: 'insensitive' } })) };
}

export function classifyExploreArtifact(logicalPath: string): ExploreArtifactType {
  const normalized = logicalPath.toLocaleLowerCase();
  for (const [type, extensions] of Object.entries(EXTENSIONS) as Array<[Exclude<ExploreArtifactType, 'other'>, string[]]>) {
    if (extensions.some((extension) => normalized.endsWith(extension))) return type;
  }
  return 'other';
}

export async function listPublicResearchIndex(
  deps: Pick<WorkspaceDeps, 'prisma'>,
  input: { query?: string; cursor?: string; limit: number; field?: SdfNodeType; artifactType?: ExploreArtifactType },
): Promise<ResearchIndexPage> {
  const query = input.query?.trim();
  const and: Prisma.ResearchObjectWhereInput[] = [];
  if (query) {
    and.push({ OR: [
      { title: { contains: query, mode: 'insensitive' } },
      { sdfDocument: { nodes: { some: { content: { contains: query, mode: 'insensitive' } } } } },
    ] });
  }
  if (input.field) {
    and.push({ sdfDocument: { nodes: { some: { nodeType: input.field, content: { not: '' } } } } });
  }
  if (input.artifactType) {
    and.push({ versions: { some: { status: 'published', manifest: { is: { entries: { some: entryCondition(input.artifactType) } } } } } });
  }

  const rows = await deps.prisma.researchObject.findMany({
    where: {
      visibility: 'public',
      publicId: { not: null, ...(input.cursor ? { gt: input.cursor } : {}) },
      versions: { some: { status: 'published' } },
      ...(and.length ? { AND: and } : {}),
    },
    include: {
      sdfDocument: { include: { nodes: { orderBy: { sortOrder: 'asc' } } } },
      versions: {
        where: { status: 'published' }, orderBy: { versionNo: 'desc' }, take: 1,
        include: { manifest: { include: { entries: true } }, publications: true },
      },
      authors: { orderBy: { sortOrder: 'asc' }, include: { user: { select: { displayName: true } } } },
    },
    orderBy: { publicId: 'asc' },
    take: input.limit + 1,
  });

  const allowed = (await Promise.all(rows.map(async (row) => ({
    row,
    allowed: !!row.versions[0] && await canReadCurrentPublicResearch(deps, {
      researchObjectId: row.id,
      versionId: row.versions[0].id,
    }),
  })))).filter((item) => item.allowed).map((item) => item.row);
  const visible = allowed.slice(0, input.limit);
  const nextCursor = allowed.length > input.limit
    ? visible.at(-1)?.publicId ?? null
    : rows.length > input.limit
      ? rows.at(-1)?.publicId ?? null
      : null;
  const items = visible.map((row): ResearchIndexItem => {
    const version = row.versions[0];
    const nodes = row.sdfDocument?.nodes.filter((node) => node.content.trim()) ?? [];
    const artifactTypes = [...new Set((version?.manifest?.entries ?? []).map((entry) => classifyExploreArtifact(entry.logicalPath)))];
    return {
      publicId: row.publicId!,
      title: row.title,
      url: `/research/${row.publicId}`,
      latestVersion: version.versionNo,
      publishedAt: version.publications[0]?.publishedAt.toISOString() ?? null,
      updatedAt: row.updatedAt.toISOString(),
      insight: nodes.find((node) => node.nodeType === 'insight')?.content ?? null,
      fields: nodes.map((node) => node.nodeType),
      artifactTypes,
      authors: row.authors.map((author) => author.user.displayName),
    };
  });
  return { items, nextCursor };
}
