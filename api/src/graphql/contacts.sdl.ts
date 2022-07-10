export const schema = gql`
  type Contact {
    id: Int!
    createdAt: DateTime!
    email: String!
    message: String!
    name: String!
  }

  type Query {
    contacts: [Contact!]! @requireAuth
    contact(id: Int!): Contact! @requireAuth
  }

  input CreateContactInput {
    email: String!
    message: String!
    name: String!
  }

  input UpdateContactInput {
    email: String
    message: String
    name: String
  }

  type Mutation {
    createContact(input: CreateContactInput!): Contact! @skipAuth
  }
`
