import { MetaTags } from '@redwoodjs/web'

import ArticlesCell from 'src/components/ArticlesCell'

const HomePage = () => {
  return (
    <>
      <MetaTags description="Home page" title="Home" />
      <ArticlesCell />
    </>
  )
}

export default HomePage
