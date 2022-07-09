import { Box, Button, Container, Flex, Heading } from '@chakra-ui/react'

import { useAuth } from '@redwoodjs/auth'
import { Link, NavLink, routes } from '@redwoodjs/router'

type BlogLayoutProps = {
  children?: React.ReactNode
}

const BlogLayout = ({ children }: BlogLayoutProps) => {
  const { isAuthenticated, currentUser, logOut } = useAuth()

  return (
    <>
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
          {isAuthenticated ? (
            <Flex alignItems="center" gap="16px">
              <span>Logged in as {currentUser.email}</span>
              <Button as={Link} to={routes.posts()} variant="outline">
                Admin panel
              </Button>
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
        <Container as="main" maxW="container.sm" padding="4">
          {children}
        </Container>
      </Container>
    </>
  )
}

export default BlogLayout
