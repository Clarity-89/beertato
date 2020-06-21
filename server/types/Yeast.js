module.exports = /* GraphQL */ `
  enum Flocculation {
    low
    medium
    high
  }

  enum Type {
    liquid
    dried
  }

  type Yeast {
    id: String!
    name: String!
    lab: String
    code: String
    beer_type: String
    flocculation: Flocculation
    temperature: String
    description: String
    attenuation: Float
    type: Type
    image: String
  }

  type Query {
    yeast(id: String!): Yeast
    yeasts: [Yeast]
  }
`;
