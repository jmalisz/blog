import { Button, Flex, Heading, Text } from '@chakra-ui/react'

import { useAuth } from '@redwoodjs/auth'
import { useMutation } from '@redwoodjs/web'

import { QUERY as CommentsQuery } from 'src/components/CommentsCell'
import { formatDate } from 'src/utils/formatDate'

const DELETE_COMMENT = gql`
  mutation DeleteCommentMutation($id: Int!) {
    deleteComment(id: $id) {
      postSlug
    }
  }
`

interface CommentProps {
  id: number
  name: string
  createdAt: string
  body: string
}

const Comment = ({ id, createdAt, name, body }: CommentProps) => {
  const { hasRole } = useAuth()
  const [deleteComment] = useMutation(DELETE_COMMENT, {
    refetchQueries: ({ data }) => [
      {
        query: CommentsQuery,
        variables: { postSlug: data.deleteComment.postSlug },
      },
    ],
  })

  const moderate = () => {
    if (confirm('Are you sure?')) {
      deleteComment({
        variables: { id },
      })
    }
  }

  return (
    <Flex background="gray.200" flexDir="column" p="4" rounded="lg">
      <Heading as="h3" color="teal.700" fontSize="2xl" mb="1">
        {name}
      </Heading>
      <Text as="time" dateTime={createdAt} fontSize="xs">
        {formatDate(new Date(createdAt))}
      </Text>
      <Text>{body}</Text>
      {hasRole(['admin', 'moderator']) && (
        <Button alignSelf="flex-end" onClick={moderate}>
          Delete
        </Button>
      )}
      {/* <div className="bg-gray-200 p-8 rounded-lg relative">
      <header className="flex justify-between">
        <h2 className="font-semibold text-gray-700">{name}</h2>
        <time className="text-xs text-gray-500" dateTime={createdAt}>
          {formatDate(new Date(createdAt))}
        </time>
      </header>
      <p className="text-sm mt-2">{body}</p>
      {hasRole(['admin', 'moderator']) && (
        <button
          className="absolute bottom-2 right-2 bg-red-500 text-xs rounded text-white px-2 py-1"
          data-testid="commentDeleteButton"
          type="button"
          onClick={moderate}
        >
          Delete
        </button>
      )}
    </div> */}
    </Flex>
  )
}

export default Comment
