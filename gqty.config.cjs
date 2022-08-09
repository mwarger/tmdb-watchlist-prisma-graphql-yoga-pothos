/**
 * @type {import("@gqty/cli").GQtyConfig}
 */
const config = {
  react: true,
  scalarTypes: { DateTime: 'string' },
  introspection: {
    endpoint: 'http://localhost:4200/api/graphql',
    headers: {},
  },
  destination: './gqty/index.ts',
  subscriptions: false,
  javascriptOutput: false,
  enumsAsConst: false,
}

module.exports = config
