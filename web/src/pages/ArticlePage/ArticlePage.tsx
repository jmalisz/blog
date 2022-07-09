import { CheckCircleIcon } from '@chakra-ui/icons'
import {
  Button,
  Container,
  Flex,
  useToast,
  Link,
  Text,
  Box,
} from '@chakra-ui/react'

import { MetaTags } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'

import ArticleCell from 'src/components/ArticleCell'

const GENERATE_PDF_MUTATION = gql`
  mutation GeneratePostPdfBySlugMutation($slug: String!) {
    generatePostPdfBySlug(slug: $slug) {
      url
    }
  }
`

interface Props {
  slug: string
}

const ArticlePage = ({ slug }: Props) => {
  const toast = useToast()

  const [generatePdf, { loading }] = useMutation(GENERATE_PDF_MUTATION, {
    onCompleted: ({ generatePostPdfBySlug: { url } }) => {
      toast({
        position: 'top',
        duration: null,
        render: ({ onClose }) => (
          <Button
            as={Link}
            colorScheme="green"
            height="72px"
            href={url}
            padding="12px 16px"
            width="100%"
            isExternal
            onClick={onClose}
          >
            <Flex gap="3">
              <CheckCircleIcon boxSize="5" />
              <Box>
                <Text fontWeight="bold">Your PDF is ready, click here! </Text>
                <Text>It will be available for 10 min.</Text>
              </Box>
            </Flex>
          </Button>
        ),
      })
    },
    onError: (error) => {
      toast({
        position: 'top',
        title: 'PDF generation failed',
        description: error,
        status: 'error',
        duration: null,
        isClosable: true,
      })
    },
  })

  return (
    <Flex>
      <MetaTags description="Article page" title="Article" />
      <Container display="flex" justifyContent="center" maxW="container.sm">
        <ArticleCell slug={slug} />
      </Container>
      <Button
        isLoading={loading}
        position="sticky"
        top="96px"
        onClick={() => generatePdf({ variables: { slug } })}
      >
        Generate PDF
      </Button>
    </Flex>
  )
}

export default ArticlePage
