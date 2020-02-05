const express = require("express");
const bodyParser = require("body-parser");
const graphqlHTTP = require("express-graphql");
const path = require("path");
const mongoose = require("mongoose");

const graphQlSchema = require("./graphql/schema/schema");
const graphQlResolvers = require("./graphql/resolvers/resolvers");

const app = express();
const PORT = process.env.PORT || 5000;

// Configure graphql
app.use(bodyParser.json());
app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
  })
);

// Configure for Heroku
if (process.env.NODE_ENV === "production") {
  app.use(express.static("criassist-frontend/criassist-frontend/build"));

  app.get("*", (req, res) => {
    res.sendFile(
      path.join(
        __dirname,
        "criassist-frontend",
        "criassist-frontend",
        "build",
        "index.html"
      )
    );
  });
}

// Configure MongoDB
const mongoDBuri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-moznn.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
mongoose
  .connect(mongoDBuri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () =>
      console.log(`CriAssist server listening on port ${PORT}!`)
    );
  })
  .catch(err => {
    console.log(err);
  });
