# syntax=docker/dockerfile:1
FROM node:22-bookworm-slim AS dependencies
WORKDIR /app

# Native SQLite may need compilation when no upstream prebuilt binary matches.
# These build tools never enter the runtime image.
RUN apt-get update && apt-get install -y --no-install-recommends python3 g++ make
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
RUN npx --yes pnpm@9.15.0 install --frozen-lockfile --prod

FROM node:22-bookworm-slim AS runtime
ENV NODE_ENV=production
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY package.json pnpm-workspace.yaml backend.mjs query.mjs app-config.yaml catalog-info.yaml ./
USER 1000:1000
EXPOSE 3131
CMD ["node", "--no-node-snapshot", "backend.mjs", "--config", "app-config.yaml"]
