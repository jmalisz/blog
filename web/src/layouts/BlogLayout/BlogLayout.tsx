import { Container, Grid, GridItem, Heading } from '@chakra-ui/react'

import { useAuth } from '@redwoodjs/auth'
import { Link, NavLink, routes } from '@redwoodjs/router'

type BlogLayoutProps = {
  children?: React.ReactNode
}

const BlogLayout = ({ children }: BlogLayoutProps) => {
  const { isAuthenticated, currentUser, logOut } = useAuth()

  return (
    <Grid
      templateAreas={`"header header"
                      "nav main"`}
      gridTemplateColumns="160px 1fr"
      gridTemplateRows="auto 1fr"
      h="100%"
    >
      <GridItem
        area="header"
        as="header"
        borderBottom="1px"
        borderBottomColor="gray.200"
        display="flex"
        justifyContent="space-between"
        padding={4}
      >
        <Heading as="h1">
          <Link to={routes.home()}>Redwood Blog</Link>
        </Heading>
        {isAuthenticated ? (
          <div>
            <span>Logged in as {currentUser.email}</span>{' '}
            <button type="button" onClick={logOut}>
              Logout
            </button>
          </div>
        ) : (
          <Link to={routes.login()}>Login</Link>
        )}
      </GridItem>
      <GridItem
        area="nav"
        as="nav"
        borderRight="1px"
        borderRightColor="gray.200"
        display="flex"
        flexDir="column"
        gap={4}
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
      </GridItem>
      <GridItem area="main" as="main" flexGrow={1}>
        <Container>{children}</Container>
      </GridItem>
    </Grid>
  )
}

export default BlogLayout
