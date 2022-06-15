import { React } from 'react'
import jwt_decode from 'jwt-decode'

const BlogDetail = ({ blog, toggle, handleToggle, handleUpdate, handleRemove }) => {
  const _newBlog = { ...blog, likes: blog.likes+1 }

  const user = JSON.parse(window.localStorage.getItem('localUser'))
  const decode = jwt_decode(user.token)

  return (
    <div>
      <div>
        {blog.title}
        <button onClick={handleToggle}>
          { toggle ? 'hide' : 'view'}
        </button>
      </div>
      <div>{blog.author}</div>
      <div>
        like {blog.likes}&nbsp;
        <button onClick={() => handleUpdate(_newBlog, blog.id)}>like</button>
      </div>
      <div>{blog.author}</div>
      {
        decode.id === blog.user.id
          ? <button onClick={() => handleRemove(blog, blog.id)}>remove</button>
          : <></>
      }
    </div>
  )
}

export default BlogDetail