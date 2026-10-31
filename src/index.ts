import "reflect-metadata"
import express from "express"
import { ApolloServer } from "@apollo/server"
import { buildSchema } from "type-graphql"
import { expressMiddleware } from "@as-integrations/express5"

// resolvers
import { AuthResolver } from "./resolvers/auth.resolver"
import { UserResolver } from "./resolvers/user.resolver"
import { IdeaResolver } from "./resolvers/idea.resolver"

// context
import { buildContext } from "./graphql/context"

const PORT = 4000

async function bootstrap() {
  const app = express()

  const schema = await buildSchema({
    resolvers: [
      AuthResolver,
      UserResolver,
      IdeaResolver
    ],
    validate: false,
    emitSchemaFile: './schema.graphql',
  })

  const server = new ApolloServer({
    schema,
  })

  await server.start()

  app.use(
    '/graphql',
    express.json(),
    expressMiddleware(server, {
      context: buildContext
    })
  )


  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
  })
}

bootstrap().catch((err) => {
  console.error('Error starting server:', err)
  process.exit(1)
})
