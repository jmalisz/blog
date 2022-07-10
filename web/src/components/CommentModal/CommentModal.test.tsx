import { render } from '@redwoodjs/testing/web'

import CommentModal from './CommentModal'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CommentModal', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CommentModal />)
    }).not.toThrow()
  })
})
