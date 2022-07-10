export const schema = gql`
  type Comment {
    id: Int!
    postSlug: String!
    post: Post!
    createdAt: DateTime!
    body: String!
    name: String!
  }

  type Query {
    comments(postSlug: String!): [Comment!]! @skipAuth
  }

  input CreateCommentInput {
    postSlug: String!
    body: String!
    name: String!
  }

  type Mutation {
    createComment(input: CreateCommentInput!): Comment! @skipAuth
    deleteComment(id: Int!): Comment!
      @requireAuth(roles: ["admin", "moderator"])
  }
`
