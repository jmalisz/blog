import { Flex, Spinner, Text } from '@chakra-ui/react'
import { CommentsQuery, CommentsQueryVariables } from 'types/graphql'

import { CellSuccessProps } from '@redwoodjs/web'

import Comment from 'src/components/Comment'

export const QUERY = gql`
  query CommentsQuery($postSlug: String!) {
    comments(postSlug: $postSlug) {
      id
      name
      body
      createdAt
    }
  }
`

export const Loading = () => (
  <Flex justifyContent="center">
    <Spinner color="teal.500" margin="auto" size="xl" />
  </Flex>
)

export const Empty = () => {
  return (
    <Text color="gray.500" textAlign="center">
      No comments yet
    </Text>
  )
}

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({
  comments,
}: CellSuccessProps<CommentsQuery, CommentsQueryVariables>) => {
  return (
    <Flex flexDirection="column" gap="6">
      {comments.map((comment) => (
        <Comment key={comment.id} {...comment} />
      ))}
    </Flex>
  )
}
