import { useState } from 'react'

import { CheckCircleIcon } from '@chakra-ui/icons'
import {
  Button,
  Container,
  Flex,
  useToast,
  Link,
  Text,
  Box,
  useDisclosure,
} from '@chakra-ui/react'

import { MetaTags } from '@redwoodjs/web'

import ArticleCell from 'src/components/ArticleCell'
import CommentModal from 'src/components/CommentModal/CommentModal'

interface Props {
  slug: string
}

const ArticlePage = ({ slug }: Props) => {
  const [isLoading, setIsLoading] = useState(false)

  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const downloadArticlePdf = async () => {
    try {
      setIsLoading(true)
      const url = await fetch(
        'http://localhost:8910/.netlify/functions/downloadArticlePdf',
        {
          method: 'POST',
          body: JSON.stringify({ slug }),
        }
      )

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
    } catch (err) {
      toast({
        position: 'top',
        title: 'PDF generation failed',
        description: err,
        status: 'error',
        duration: null,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Flex>
      <MetaTags description="Article page" title="Article" />
      <CommentModal isOpen={isOpen} postSlug={slug} onClose={onClose} />
      <Container display="flex" justifyContent="center" maxW="container.sm">
        <ArticleCell slug={slug} />
      </Container>
      <Flex gap="4">
        <Button position="sticky" top="96px" onClick={onOpen}>
          Add comment
        </Button>
        <Button
          isLoading={isLoading}
          position="sticky"
          top="96px"
          onClick={downloadArticlePdf}
        >
          Generate PDF
        </Button>
      </Flex>
    </Flex>
  )
}

export default ArticlePage
