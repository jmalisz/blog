export const schema = gql`
  type Post {
    id: Int!
    slug: String!
    createdAt: DateTime!
    body: String!
    summary: String!
    title: String!
  }

  type PdfUrl {
    url: String!
  }

  type Query {
    posts: [Post!]! @skipAuth
    postById(id: Int!): Post @skipAuth
    postBySlug(slug: String!): Post @skipAuth
  }

  input CreatePostInput {
    body: String!
    summary: String!
    title: String!
  }

  input UpdatePostInput {
    body: String
    summary: String
    title: String
  }

  type Mutation {
    createPost(input: CreatePostInput!): Post! @requireAuth
    updatePost(id: Int!, input: UpdatePostInput!): Post! @requireAuth
    deletePost(id: Int!): Post! @requireAuth
    generatePostPdfBySlug(slug: String!): PdfUrl! @skipAuth
  }
`
