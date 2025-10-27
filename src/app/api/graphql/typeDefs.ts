export const typeDefs = `#graphql
  type Field {
    id: Int!
    type: String!
    options: JSON!
    order: Int!
  }

  type Form {
    id: Int!
    name: String!
    fields: [Field!]!
  }

  type Query {
    forms: [Form!]!
    form(id: Int!): Form
  }

  type Mutation {
    createForm(name: String!, fields: [FieldInput!]!): Form!
    updateForm(id: Int!, name: String, fields: [FieldInput!]!): Form!
    deleteForm(id: Int!): Boolean!
  }

  input FieldInput {
    type: String!
    options: JSON!
    order: Int!
  }

  scalar JSON
`;