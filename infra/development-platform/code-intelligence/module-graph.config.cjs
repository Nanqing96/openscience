const path = require('node:path');
const { options } = require(path.resolve('.dependency-cruiser.cjs'));

// Standard dependency-cruiser reporting configuration. No audit rules are run.
module.exports = {
  forbidden: [],
  options: {
    ...options,
    tsPreCompilationDeps: true,
    includeOnly: { path: process.env.XGS_GRAPH_SCOPE_PATTERN },
    doNotFollow: { path: 'node_modules' },
    enhancedResolveOptions: {
      alias: {
        '@openscience/ai-gateway': path.resolve('packages/ai-gateway/src/index.ts'),
      },
      conditionNames: ['import', 'require', 'node', 'default'],
      exportsFields: ['exports'],
    },
  },
};
