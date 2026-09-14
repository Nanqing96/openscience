#!/usr/bin/env bash
# Server installation/start only. No tests, probes, indexing rehearsal or model calls.
set -euo pipefail
set +x
umask 022

source_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd -P)"
source_release=""
revision=""
install_root=/opt/openscience-development/code-intelligence
upstream_revision=403ad0a562bbc86ff5a0e26c23544dbd99235c15

while [[ $# -gt 0 ]]; do
  case "$1" in
    --source-release) source_release="$2"; shift 2 ;;
    --revision) revision="$2"; shift 2 ;;
    *) printf '%s\n' "Unknown argument: $1" >&2; exit 1 ;;
  esac
done
if [[ "$(id -u)" != 0 || -z "$source_release" || ! "$revision" =~ ^[0-9a-f]{40}$ ]]; then
  printf '%s\n' 'Run as root on the server: install.sh --source-release /opt/openscience-releases/<commit> --revision <same-full-commit>' >&2
  exit 1
fi
export SERENA_IMAGE_TAG="${SERENA_IMAGE_TAG:-$revision}"
export SERENA_SNAPSHOT_DIR="$install_root/snapshots/$revision"
export SERENA_STATE_DIR="$install_root/state/$revision"
install -d -m 0755 "$install_root/snapshots" "$install_root/build" "$install_root/upstream"

if [[ ! -d "$SERENA_SNAPSHOT_DIR" ]]; then
  python3 "$source_dir/snapshot.py" --source-release "$source_release" \
    --revision "$revision" --output "$SERENA_SNAPSHOT_DIR"
fi
install -d -m 0750 -o 1000 -g 1000 "$SERENA_STATE_DIR/cache" "$SERENA_STATE_DIR/logs"

upstream_archive="$install_root/upstream/$upstream_revision.tar.gz"
if [[ ! -f "$upstream_archive" ]]; then
  download_file="$(mktemp "$install_root/upstream/$upstream_revision.partial.XXXXXX")"
  with-proxy curl --fail --location --silent --show-error \
    "https://codeload.github.com/oraios/serena/tar.gz/$upstream_revision" \
    --output "$download_file"
  mv --no-clobber "$download_file" "$upstream_archive"
fi

build_dir="$(mktemp -d "$install_root/build/$revision.XXXXXX")"
for source_file in Dockerfile .dockerignore package.json pnpm-lock.yaml prepare-config.py readonly-context.yml query.py serve.py; do
  install -m 0644 "$source_dir/$source_file" "$build_dir/$source_file"
done
# Reuse the existing host uv binary; it is present only in the build stage.
install -m 0755 /usr/bin/uv "$build_dir/uv"
install -m 0644 "$upstream_archive" "$build_dir/serena-upstream.tar.gz"
with-proxy docker build --pull=false --network host \
  --build-arg HTTP_PROXY --build-arg HTTPS_PROXY --build-arg http_proxy --build-arg https_proxy \
  --tag "openscience-serena:$SERENA_IMAGE_TAG" "$build_dir"
docker compose --env-file /dev/null --file "$source_dir/compose.yaml" up --detach --no-build
printf '%s\n' "Serena start requested for source revision $revision at http://127.0.0.1:3132/mcp; no symbol query or result-quality claim made."
