import { React } from 'react'

const BlogDetail = (props) => {
  const blog = props.blog
  const _newBlog = { ...blog, likes: blog.likes+1 }

  return (
    <div>
      <div>
        {blog.title}
        <button onClick={props.handleToggle}>hide</button>
      </div>
      <div>{blog.author}</div>
      <div className='like'>
        like {blog.likes}&nbsp;
        <button id='like-button' onClick={() => props.handleUpdate(_newBlog, blog.id)}>
          like
        </button>
      </div>
      <div>{blog.url}</div>
      {
        props.userId === blog.user.id
          ? <button onClick={() => props.handleRemove(blog, blog.id)}>remove</button>
          : <></>
      }
    </div>
  )
}

export default BlogDetail