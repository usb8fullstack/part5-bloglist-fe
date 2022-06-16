import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

afterEach(() => cleanup())

test('renders content', () => {
  const blog = {
    author: 'test-author1',
    id: '62a8570e45d52368f6fa5723',
    likes: 2,
    title: 'test-title1',
    url: 'www.test-url1',
    user: { id: '62a6e4f75ac2bd311f0f29d8', name: 'one', username: 'test-user1' }
  }

  const mockHandler = jest.fn()
  const { container } = render(<Blog blog={blog} handleUpdate={mockHandler} handleRemove={mockHandler} />)

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent('test-title1 - test-author1')

  // screen.debug()  // NOTE: debug
  // screen.debug(div1)

  // const urlElement = screen.getByText('www.test-url1')
  // NOTE: throw err, but query not throw
  const urlElement = screen.queryByText('www.test-url1')
  expect(urlElement).toBeNull()

  const likeElement = screen.queryByText('like 2')
  expect(likeElement).toBeNull()
})

test('after clicking the button view/hide, then can see url ...', () => {
  const blog = {
    author: 'test-author1',
    id: '62a8570e45d52368f6fa5723',
    likes: 2,
    title: 'test-title1',
    url: 'www.test-url1',
    user: { id: '62a6e4f75ac2bd311f0f29d8', name: 'one', username: 'test-user1' }
  }

  const mockHandler = jest.fn()
  render(
    <Blog blog={blog} handleUpdate={mockHandler} handleRemove={mockHandler} />
  )

  const buttonElement = screen.queryByRole('button', { name: /view/i })
  fireEvent.click(buttonElement)

  const urlElement = screen.queryByText('www.test-url1')
  expect(urlElement).not.toBeNull()
  // expect(urlElement).toBeInTheDocument()

  const likeElement = screen.queryByText('like 2')
  expect(likeElement).not.toBeNull()
})

test('clicking 2 times the button likes, calls event handler twice', async () => {
  const blog = {
    author: 'test-author1',
    id: '62a8570e45d52368f6fa5723',
    likes: 2,
    title: 'test-title1',
    url: 'www.test-url1',
    user: { id: '62a6e4f75ac2bd311f0f29d8', name: 'one', username: 'test-user1' }
  }

  const mockHandler = jest.fn()

  render(
    <Blog blog={blog} handleUpdate={mockHandler} handleRemove={mockHandler} />
  )

  const buttonElement = screen.queryByRole('button', { name: /view/i })
  fireEvent.click(buttonElement)

  const user = userEvent.setup()
  const button = screen.queryByText('like')
  await user.click(button)
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})