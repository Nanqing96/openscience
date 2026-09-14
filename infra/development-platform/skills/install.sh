#!/usr/bin/env bash
# Root orchestrates this on the server. Only package lock creation and image build;
# no CLI invocation, skill installation, application build, test or service restart.
set -euo pipefail
set +x
umask 077
skills_source_dir=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd -P)
skills_npm_cache=${SKILLS_NPM_CACHE_DIR:-/root/.npm}

if [[ $(uname -s) != Linux || $EUID != 0 ]]; then
  printf '%s\n' 'Run this installer as root on the server.' >&2
  exit 64
fi
install -d -m 0700 "$skills_npm_cache"

if [[ ! -f "$skills_source_dir/pnpm-lock.yaml" ]]; then
  # Produce the isolated lock on the authorized server; later builds are frozen.
  # No upstream prepare/prepublish scripts or development dependencies are run.
  with-proxy docker run --rm --pull never --network host \
    --mount "type=bind,source=$skills_source_dir,target=/opt/skills" \
    --mount "type=bind,source=$skills_npm_cache,target=/root/.npm" \
    --workdir /opt/skills \
    --env HTTP_PROXY --env HTTPS_PROXY --env http_proxy --env https_proxy --env NO_PROXY \
    node:22-bookworm-slim \
    npx --yes pnpm@9.15.0 install --lockfile-only --prod --ignore-scripts
  chmod 0644 "$skills_source_dir/pnpm-lock.yaml"
fi

with-proxy docker build --pull=false --network host \
  --build-arg HTTP_PROXY --build-arg HTTPS_PROXY --build-arg http_proxy --build-arg https_proxy --build-arg NO_PROXY \
  --tag openscience-development-skills:1.5.26 "$skills_source_dir"
printf '%s\n' 'Skills CLI image built. No skills installed and no product runtime invoked.'
