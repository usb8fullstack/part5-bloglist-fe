import { React } from 'react'

const BlogDetail = ({blog, toggle, handleToggle, handleUpdate}) => {
  const _newBlog = {...blog, likes: blog.likes+1}

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
    </div>  
  )
}

export default BlogDetail