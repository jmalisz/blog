import { Box, Button, Container, Flex, Heading } from '@chakra-ui/react'

import { useAuth } from '@redwoodjs/auth'
import { Link, NavLink, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/dist/toast'

type BlogLayoutProps = {
  children?: React.ReactNode
}

const BlogLayout = ({ children }: BlogLayoutProps) => {
  const { isAuthenticated, currentUser, logOut, hasRole } = useAuth()

  return (
    <>
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <Box
        as="header"
        background="white"
        borderBottom="1px"
        borderBottomColor="gray.200"
        height="80px"
        position="sticky"
        top="0"
      >
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
          {isAuthenticated ? (
            <Flex alignItems="center" gap="16px">
              <span>Logged in as {currentUser.email}</span>
              {hasRole('admin') && (
                <Button as={Link} to={routes.posts()} variant="outline">
                  Admin panel
                </Button>
              )}
              <Button onClick={logOut}>Logout</Button>
            </Flex>
          ) : (
            <Button as={Link} to={routes.login()}>
              Login
            </Button>
          )}
        </Container>
      </Box>
      <Container
        display="flex"
        justifyContent="space-between"
        maxW="container.xl"
        padding={4}
      >
        <Box
          as="nav"
          borderRight="1px"
          borderRightColor="gray.200"
          display="flex"
          flexDir="column"
          gap={4}
          h="min"
          padding={4}
          position="sticky"
          top="96px"
        >
          <NavLink
            activeClassName="nav-link--active"
            className="nav-link"
            to={routes.home()}
          >
            Home
          </NavLink>
          <NavLink
            activeClassName="nav-link--active"
            className="nav-link"
            to={routes.about()}
          >
            About
          </NavLink>
          <NavLink
            activeClassName="nav-link--active"
            className="nav-link"
            to={routes.contact()}
          >
            Contact
          </NavLink>
        </Box>
        <Box as="main" width="100%">
          {children}
        </Box>
      </Container>
    </>
  )
}

export default BlogLayout
