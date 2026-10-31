import "reflect-metadata"
import express from "express"
import { ApolloServer } from "@apollo/server"
import { buildSchema } from "type-graphql"
import { expressMiddleware } from "@as-integrations/express5"
import cors from "cors"

// resolvers
import { AuthResolver } from "./resolvers/auth.resolver"
import { UserResolver } from "./resolvers/user.resolver"
import { IdeaResolver } from "./resolvers/idea.resolver"
import { CommentResolver } from "./resolvers/comment.resolver"

// context
import { buildContext } from "./graphql/context"
import { VoteResolver } from "./resolvers/vote.resolver"

const PORT = 4000

async function bootstrap() {
  const app = express()

  app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
  }))

  const schema = await buildSchema({
    resolvers: [
      AuthResolver,
      UserResolver,
      IdeaResolver,
      CommentResolver,
      VoteResolver
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
