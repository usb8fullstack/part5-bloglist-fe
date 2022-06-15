import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    author: "test-author1",
    id: "62a8570e45d52368f6fa5723",
    likes: 2,
    title: "test-title1",
    url: "www.test-url1",
    user: {id: "62a6e4f75ac2bd311f0f29d8", name: "one", username: "test-user1"}
  }

  const { container } = render(<Blog blog={blog} />)

  const div1 = container.querySelector('.blog')
  expect(div1).toHaveTextContent('test-title1 - test-author1')

  // screen.debug()  // NOTE: debug
  // screen.debug(div1)

  const div2 = screen.queryByText('www.test-url1')
  expect(div2).toBeNull()
  const div3 = screen.queryByText('2')
  expect(div3).toBeNull()
})