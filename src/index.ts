import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"

const typeDefs = `
  type Query {
    ping: String
  }
`

async function bootstrap() {
  const server = new ApolloServer({
    typeDefs,
    resolvers: {
      Query: {
        ping: () => 'pong',
      },
    },
  })

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  })

  console.log(`🚀 Server ready at ${url}`)
}

bootstrap().catch((err) => {
  console.error('Error starting server:', err)
  process.exit(1)
})
