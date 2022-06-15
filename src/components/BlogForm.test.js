import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const handleAddBlog = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm handleAddBlog={handleAddBlog} />)

  const inputs = screen.getAllByRole('textbox')
  const sendButton = screen.getByText('create')

  await user.type(inputs[0], 'test-title2')
  await user.type(inputs[1], 'test-author2')
  await user.type(inputs[2], 'www.test-url1')
  await user.click(sendButton)

  expect(handleAddBlog.mock.calls).toHaveLength(1)
  expect(handleAddBlog.mock.calls[0][0].title).toBe('test-title2')
  expect(handleAddBlog.mock.calls[0][0].author).toBe('test-author2')
  expect(handleAddBlog.mock.calls[0][0].url).toBe('www.test-url1')
})