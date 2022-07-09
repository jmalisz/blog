import { Box, Container, Heading } from '@chakra-ui/react'

import { Link, routes } from '@redwoodjs/router'

type BlogLayoutProps = {
  children?: React.ReactNode
}

const LoginLayout = ({ children }: BlogLayoutProps) => {
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
        </Container>
      </Box>
      <Container maxW="container.sm">{children}</Container>
    </>
  )
}

export default LoginLayout
