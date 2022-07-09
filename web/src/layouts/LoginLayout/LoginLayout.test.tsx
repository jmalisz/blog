import { render } from '@redwoodjs/testing/web'

import LoginLayout from './LoginLayout'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('LoginLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<LoginLayout />)
    }).not.toThrow()
  })
})
