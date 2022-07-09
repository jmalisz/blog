import { MetaTags } from '@redwoodjs/web'

import ArticleCell from 'src/components/ArticleCell'

interface Props {
  slug: string
}

const ArticlePage = ({ slug }: Props) => {
  return (
    <>
      <MetaTags description="Article page" title="Article" />
      <ArticleCell slug={slug} />
    </>
  )
}

export default ArticlePage
