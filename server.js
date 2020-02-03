const express = require('express');
const bodyParser = require('body-parser');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// const areas = [];

app.use(bodyParser.json());

// let schema = buildSchema(`
// type Area {
//   _id: ID!
//   name: String!
// }

// input AreaInput {
//   name: String!
// }

// type rootQuery {
//   areas: [Area!]!
// }

// type rootMutation {
//   createArea(areaInput: AreaInput): Area
// }

// schema {
//   query: rootQuery
//   mutation: rootMutation
// }
// `);

// let root = {
//   areas: () => {
//     return areas;
//   },
//   createArea: (args) => {
//     const area = {
//       _id: Math.random().toString(),
//       name: args.areaInput.name,
//       geojson: args.areaInput.geojson
//     };
//     areas.push(area);
//     return area;
//   }
// };

// app.use('/graphql', graphqlHTTP({
//   schema: schema,
//   rootValue: root,
//   graphiql: true
// }));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('criassist-frontend/criassist-frontend/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'criassist-frontend', 'criassist-frontend', 'build', 'index.html'));
  })
}

app.listen(PORT, () => console.log(`CriAssist server listening on port ${PORT}!`));