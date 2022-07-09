import { Text, Image, Grid } from '@chakra-ui/react'

import { MetaTags } from '@redwoodjs/web'

const AboutPage = () => {
  return (
    <>
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
        <Text gridArea="description">A random cat photo</Text>
      </Grid>
    </>
  )
}

export default AboutPage
