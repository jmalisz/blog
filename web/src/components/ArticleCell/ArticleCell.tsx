import { Heading, Text } from '@chakra-ui/react'
import type { FindArticleQuery, FindArticleQueryVariables } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import { formatDate } from 'src/utils/formatDate'

export const QUERY = gql`
  query FindArticleQuery($slug: String!) {
    article: postBySlug(slug: $slug) {
      id
      body
      createdAt
      title
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Looks empty... For now :)</div>

export const Failure = ({
  error,
}: CellFailureProps<FindArticleQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({
  article: { title, createdAt, body },
}: CellSuccessProps<FindArticleQuery, FindArticleQueryVariables>) => {
  return (
    <>
      <article data-article>
        <header>
          <Heading color="teal.700" mb="1" size="lg">
            {title}
          </Heading>
          <Text fontSize="xs">{formatDate(new Date(createdAt))}</Text>
        </header>
        <Text mt="6">{body}</Text>
      </article>
    </>
  )
}
