import { Box, Container, Heading, Flex, Button } from '@chakra-ui/react'

import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

type PostLayoutProps = {
  children: React.ReactNode
}

const PostsLayout = ({ children }: PostLayoutProps) => {
  const { logOut } = useAuth()

  return (
    <>
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <Box as="header" borderBottom="1px" borderBottomColor="gray.200">
        <Container
          display="flex"
          justifyContent="space-between"
          maxW="container.xl"
          padding={4}
        >
          <Link to={routes.home()}>
            <Heading as="h1" color="teal.700">
              Redwood Blog
            </Heading>
          </Link>
          <Flex alignItems="center" gap="16px">
            <Button as={Link} to={routes.home()} variant="outline">
              Back
            </Button>
            <Button onClick={logOut}>Logout</Button>
          </Flex>
        </Container>
      </Box>
      <Container maxW="container.xl" p="4">
        <Flex justifyContent="space-between">
          <Link className="rw-link" to={routes.posts()}>
            Posts
          </Link>
          <Link className="rw-button rw-button-green" to={routes.newPost()}>
            <div className="rw-button-icon">+</div> New Post
          </Link>
        </Flex>
        <Container maxW="container.lg" p="4">
          {children}
        </Container>
      </Container>
    </>
  )
}

export default PostsLayout
