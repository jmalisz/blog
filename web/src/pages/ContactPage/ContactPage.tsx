import {
  Container,
  Input,
  useToast,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Textarea,
  Button,
} from '@chakra-ui/react'
import {
  CreateContactMutation,
  CreateContactMutationVariables,
} from 'types/graphql'

import {
  FieldError,
  Form,
  FormError,
  TextField,
  Submit,
  SubmitHandler,
  TextAreaField,
  useForm,
} from '@redwoodjs/forms'
import { MetaTags, useMutation } from '@redwoodjs/web'

const CREATE_CONTACT = gql`
  mutation CreateContactMutation($input: CreateContactInput!) {
    createContact(input: $input) {
      id
    }
  }
`

interface FormValues {
  name: string
  email: string
  message: string
}

const ContactPage = () => {
  const toast = useToast()
  const formMethods = useForm({ mode: 'onBlur' })

  const [create, { loading, error }] = useMutation<
    CreateContactMutation,
    CreateContactMutationVariables
  >(CREATE_CONTACT, {
    onCompleted: () => {
      toast({
        title: 'Thank you for your submission!',
        description: "I'll get back to you shortly!",
        status: 'success',
        duration: 4000,
        isClosable: true,
        position: 'top',
      })
      formMethods.reset()
    },
  })

  const handleSubmit: SubmitHandler<FormValues> = (data) => {
    create({ variables: { input: data } })
  }

  return (
    <>
      <MetaTags description="Contact page" title="Contact" />
      <Form error={error} formMethods={formMethods} onSubmit={handleSubmit}>
        <Container
          display="flex"
          flexDirection="column"
          gap="4"
          maxW="container.sm"
        >
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
          <FormControl isInvalid={!!formMethods.getFieldState('email').error}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              validation={{
                required: 'Email is required',
                pattern: {
                  value: /^[^@]+@[^.]+\..+$/,
                  message: 'Please enter a valid email address',
                },
              }}
              as={TextField}
              name="email"
            />
            <FormErrorMessage>
              <FieldError name="email" />
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!formMethods.getFieldState('message').error}>
            <FormLabel htmlFor="message">Message</FormLabel>
            <Textarea
              as={TextAreaField}
              name="message"
              validation={{ required: 'Message is required' }}
            />
            <FormErrorMessage>
              <FieldError name="message" />
            </FormErrorMessage>
          </FormControl>
          <Button
            alignSelf="flex-end"
            as={Submit}
            disabled={loading}
            type="submit"
          >
            Send
          </Button>
        </Container>
      </Form>
    </>
  )
}

export default ContactPage
