import { Heading, Spinner, Text } from '@chakra-ui/react'
import type { FindArticleQuery, FindArticleQueryVariables } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import { formatDate } from 'src/utils/formatDate'

import CommentsCell from '../CommentsCell'

export const QUERY = gql`
  query FindArticleQuery($slug: String!) {
    article: postBySlug(slug: $slug) {
      id
      slug
      body
      createdAt
      title
    }
  }
`

export const Loading = () => <Spinner color="teal.500" size="xl" />

export const Empty = () => {
  return (
    <Text color="gray.500" textAlign="center">
      This shouldn`&apos;`t be empty
    </Text>
  )
}
export const Failure = ({
  error,
}: CellFailureProps<FindArticleQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({
  article: { slug, title, createdAt, body },
}: CellSuccessProps<FindArticleQuery, FindArticleQueryVariables>) => {
  return (
    <>
      <article data-article>
        <header>
          <Heading color="teal.700" mb="1" size="lg">
            {title}
          </Heading>
          <Text fontSize="xs" mb="6">
            {formatDate(new Date(createdAt))}
          </Text>
        </header>
        <Text mb="12">{body}</Text>
        <CommentsCell postSlug={slug} />
      </article>
    </>
  )
}
