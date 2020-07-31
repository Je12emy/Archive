import "reflect-metadata";
import { createConnection, getConnectionOptions } from "typeorm";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloWorldResolver } from "./resolvers/HelloWorldResolver";
import { MovieResolver } from "./resolvers/MovieResolver"

(async () => {
  // Create a express instance
  const app = express();

  // Extract the orm confifuration
  const options = await getConnectionOptions(
    process.env.NODE_ENV || "development"
  );
  // Creates a connection using typeORM
  await createConnection({ ...options, name: "default" });
    // Initialize a Apollo Server Instance
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloWorldResolver, MovieResolver],
      validate: true
    }),
    context: ({ req, res }) => ({ req, res })
  });

  // Connect the Apollo server and Express
  apolloServer.applyMiddleware({ app, cors: false });
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`server started at http://localhost:${port}/graphql`);
  });
})();
