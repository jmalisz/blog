import { Flex, Heading, Spinner, Text } from '@chakra-ui/react'
import type { ArticlesQuery } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import { formatDate } from 'src/utils/formatDate'

export const QUERY = gql`
  query ArticlesQuery {
    articles: posts {
      slug
      title
      createdAt
      summary
    }
  }
`

export const Loading = () => (
  <Flex justifyContent="center">
    <Spinner color="teal.500" margin="auto" size="xl" />
  </Flex>
)

export const Empty = () => {
  return (
    <Text color="gray.500" textAlign="center">
      No articles yet
    </Text>
  )
}
export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ articles }: CellSuccessProps<ArticlesQuery>) => (
  <Flex flexDir="column" gap="24px">
    {articles.map(({ title, summary, slug, createdAt }) => (
      <article key={slug}>
        <header>
          <Link to={routes.article({ slug })}>
            <Heading color="teal.700" mb="1" size="lg">
              {title}
            </Heading>
          </Link>
          <Text fontSize="xs">{formatDate(new Date(createdAt))}</Text>
        </header>
        <Text>{summary}</Text>
      </article>
    ))}
  </Flex>
)
