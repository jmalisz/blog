import { Button, Flex, Heading, Text, useToast } from '@chakra-ui/react'

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
  const toast = useToast()
  const { hasRole } = useAuth()

  const [deleteComment, { loading }] = useMutation(DELETE_COMMENT, {
    refetchQueries: ({ data }) => [
      {
        query: CommentsQuery,
        variables: { postSlug: data.deleteComment.postSlug },
      },
    ],
    onCompleted: () => {
      toast({
        title: 'Post deleted!',
        status: 'success',
        duration: 4000,
        isClosable: true,
        position: 'top',
      })
    },
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
        <Button alignSelf="flex-end" isLoading={loading} onClick={moderate}>
          Delete
        </Button>
      )}
    </Flex>
  )
}

export default Comment
