import { Container } from '@chakra-ui/react'

import { MetaTags } from '@redwoodjs/web'

import ArticlesCell from 'src/components/ArticlesCell'

const HomePage = () => {
  return (
    <Container display="flex" justifyContent="center" maxW="container.sm">
      <MetaTags description="Home page" title="Home" />
      <ArticlesCell />
    </Container>
  )
}

export default HomePage
