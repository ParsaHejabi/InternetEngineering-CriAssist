const express = require("express");
const bodyParser = require("body-parser");
const graphqlHTTP = require("express-graphql");
const { buildSchema } = require("graphql");
const path = require("path");
const mongoose = require("mongoose");

// Models
const Form = require("./models/form");

const app = express();
const PORT = process.env.PORT || 5000;

const GeoJSONTypes = {
  POINT: "Point",
  LINESTRING: "LineString",
  POLYGON: "Polygon",
  MULTIPOINT: "MultiPoint",
  MULTILINESTRING: "MultiLineString",
  MULTIPOLYGON: "MultiPolygon",
  FEATURE: "Feature",
  FEATURECOLLECTION: "FeatureCollection"
};

const points = [];
const lineStrings = [];
const polygons = [];

app.use(bodyParser.json());

// Configure GraphQL
let schema = buildSchema(`
enum GeometryTypeEnum {
  Point
  LineString
  Polygon
  MultiPoint
  MultiLineString
  MultiPolygon
  Feature
  FeatureCollection
}

interface Geometry {
  type: GeometryTypeEnum!
}

type Point implements Geometry {
  type: GeometryTypeEnum!
  pointCoordinates: [Float!]!
}

input PointInput {
  pointCoordinates: [Float!]!
}

type LineString implements Geometry {
  type: GeometryTypeEnum!
  lineStringCoordinates: [[Float!]!]!
}

input LineStringInput {
  lineStringCoordinates: [[Float!]!]!
}

type Polygon implements Geometry {
  type: GeometryTypeEnum!
  polygonCoordinates: [[[Float!]!]!]!
}

input PolygonInput {
  polygonCoordinates: [[[Float!]!]!]!
}

type Feature {
  type: GeometryTypeEnum!
  name: String!
  geometry: Geometry!
}

type GeoJSON {
  type: String!
  name: String!
  features: [Feature!]!
}

type Area {
  _id: ID!
  name: String!
  geojson: GeoJSON!
}

type Form {
  _id: ID!
  title: String!
}

input FormInput {
  title: String!
}

type RootQuery {
  points: [Point!]!
  lineStrings: [LineString!]!
  polygons: [Polygon!]!

  forms: [Form!]!
}

type RootMutation {
  createPoint(pointInput: PointInput): Point
  createLineStrings(lineStringInput: LineStringInput): LineString
  createPolygon(polygonInput: PolygonInput): Polygon

  createForm(formInput: FormInput): Form
}

schema {
  query: RootQuery
  mutation: RootMutation
}
`);

const root = {
  points: () => {
    return points;
  },
  createPoint: args => {
    const point = {
      type: GeoJSONTypes.POINT,
      pointCoordinates: args.pointInput.pointCoordinates
    };
    points.push(point);
    return point;
  },
  lineStrings: () => {
    return lineStrings;
  },
  createLineStrings: args => {
    const lineString = {
      type: GeoJSONTypes.LINESTRING,
      lineStringCoordinates: args.lineStringInput.lineStringCoordinates
    };
    lineStrings.push(lineString);
    return lineString;
  },
  polygons: () => {
    return polygons;
  },
  createPolygon: args => {
    const polygon = {
      type: GeoJSONTypes.POLYGON,
      polygonCoordinates: args.polygonInput.polygonCoordinates
    };
    polygons.push(polygon);
    return polygon;
  },
  forms: () => {
    return Form.find()
      .then(forms => {
        return forms.map(form => {
          return { ...form._doc };
        });
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  },
  createForm: args => {
    const form = new Form({
      title: args.formInput.title
    });
    return form
      .save()
      .then(result => {
        console.log(result);
        return { ...result._doc };
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  }
};

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
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
