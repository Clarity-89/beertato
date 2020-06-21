module.exports = /* GraphQL */ `
  enum Purpose {
    bittering
    aroma
    dual
  }

  type Hop {
    id: String!
    name: String!
    origin: Origin
    purpose: Purpose
    alpha_acid_composition: Float
    beta_acid_composition: Float
    description: String
    sub_names: String
    beer_style: String
    image: String
  }

  type Query {
    hop(id: String!): Hop
    hops: [Hop]
  }

  schema {
    query: Query
  }
`;
