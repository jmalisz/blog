import {
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Textarea,
  Flex,
} from '@chakra-ui/react'
import { GraphQLError } from 'graphql'

import {
  FieldError,
  FormError,
  TextField,
  TextAreaField,
  useForm,
} from '@redwoodjs/forms'
import { MetaTags } from '@redwoodjs/web'

interface ServerParseError extends Error {
  response: Response
  statusCode: number
  bodyText: string
}

interface ServerError extends Error {
  response: Response
  statusCode: number
  result: Record<string, any>
}

interface RWGqlError {
  message: string
  graphQLErrors: ReadonlyArray<GraphQLError>
  networkError: Error | ServerParseError | ServerError | null
}

interface CommentFormBodyProps {
  error: RWGqlError
  formMethods: ReturnType<typeof useForm>
}

const CommentFormBody = ({ error, formMethods }: CommentFormBodyProps) => {
  return (
    <>
      <MetaTags description="Contact page" title="Contact" />
      <Flex flexDirection="column" gap="4">
        <FormError error={error} wrapperClassName="form-error" />
        <FormControl isInvalid={!!formMethods.getFieldState('name').error}>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input
            as={TextField}
            name="name"
            validation={{ required: 'Name is required' }}
          />
          <FormErrorMessage>
            <FieldError className="error" name="name" />
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!formMethods.getFieldState('body').error}>
          <FormLabel htmlFor="body">Message</FormLabel>
          <Textarea
            as={TextAreaField}
            name="body"
            validation={{ required: 'Comment body is required' }}
          />
          <FormErrorMessage>
            <FieldError name="body" />
          </FormErrorMessage>
        </FormControl>
      </Flex>
    </>
  )
}

export default CommentFormBody
