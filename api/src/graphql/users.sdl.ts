export const schema = gql`
  type User {
    id: Int!
    email: String!
    hashedPassword: String!
    resetToken: String
    resetTokenExpiresAt: DateTime
    salt: String!
    roles: String!
  }

  type Query {
    users: [User!]! @requireAuth
    user(id: Int!): User @requireAuth
  }

  input CreateUserInput {
    email: String!
    hashedPassword: String!
    resetToken: String
    resetTokenExpiresAt: DateTime
    salt: String!
    roles: String!
  }

  input UpdateUserInput {
    email: String
    hashedPassword: String
    resetToken: String
    resetTokenExpiresAt: DateTime
    salt: String
    roles: String
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: Int!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: Int!): User! @requireAuth
  }
`
