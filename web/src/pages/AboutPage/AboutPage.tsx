import { Text, Image, Grid, Container } from '@chakra-ui/react'

import { MetaTags } from '@redwoodjs/web'

const AboutPage = () => {
  return (
    <Container display="flex" justifyContent="center" maxW="container.sm">
      <MetaTags description="About page" title="About" />
      <Grid
        gridTemplateAreas={`"cat about"
                            "description about"`}
        gap="4"
        gridTemplateColumns="250px 1fr"
        gridTemplateRows="250px 1fr"
        justifyItems="center"
      >
        <Text gridArea="about">Made by Jakub Maliszewski</Text>
        <Image
          alt="Cat"
          as={Image}
          boxSize={250}
          gridArea="cat"
          src="https://cataas.com/cat?width=250&height=250"
        />
        <Text gridArea="description">Have a random cat photo!</Text>
      </Grid>
    </Container>
  )
}

export default AboutPage
