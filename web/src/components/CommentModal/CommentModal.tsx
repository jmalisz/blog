import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from '@chakra-ui/react'
import {
  CreateCommentMutation,
  CreateCommentMutationVariables,
} from 'types/graphql'

import { Form, Submit, SubmitHandler, useForm } from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'

import { QUERY as CommentsQuery } from 'src/components/CommentsCell'

import CommentFormBody from '../CommentForm/CommentForm'

const CREATE_COMMENT = gql`
  mutation CreateCommentMutation($input: CreateCommentInput!) {
    createComment(input: $input) {
      postSlug
    }
  }
`

interface FormValues {
  name: string
  body: string
}

interface CommentModalProps {
  postSlug: string
  isOpen: boolean
  onClose: () => void
}

const CommentModal = ({ postSlug, isOpen, onClose }: CommentModalProps) => {
  const toast = useToast()
  const formMethods = useForm({ mode: 'onBlur' })

  const [createComment, { loading, error }] = useMutation<
    CreateCommentMutation,
    CreateCommentMutationVariables
  >(CREATE_COMMENT, {
    refetchQueries: (result) => [
      {
        query: CommentsQuery,
        variables: { postSlug: result.data.createComment.postSlug },
      },
    ],
    onCompleted: () => {
      toast({
        title: 'Thanks for for your comment!',
        status: 'success',
        duration: 4000,
        isClosable: true,
        position: 'top',
      })
      formMethods.reset()
    },
  })

  const onCloseWrapper = () => {
    formMethods.reset()
    onClose()
  }

  const handleSubmit: SubmitHandler<FormValues> = (formData) => {
    createComment({ variables: { input: { postSlug, ...formData } } })
    onCloseWrapper()
  }

  return (
    <Modal isOpen={isOpen} onClose={onCloseWrapper}>
      <ModalOverlay />
      <ModalContent>
        <Form error={error} formMethods={formMethods} onSubmit={handleSubmit}>
          <ModalHeader>Add comment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CommentFormBody error={error} formMethods={formMethods} />
          </ModalBody>
          <ModalFooter>
            <Button mr="3" variant="outline" onClick={onCloseWrapper}>
              Close
            </Button>
            <Button as={Submit} disabled={loading} type="submit">
              Submit
            </Button>
          </ModalFooter>
        </Form>
      </ModalContent>
    </Modal>
  )
}

export default CommentModal
