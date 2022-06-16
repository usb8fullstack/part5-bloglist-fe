import { React } from 'react'

const BlogDetail = (props) => {
  const blog = props.blog
  const _newBlog = { ...blog, likes: blog.likes+1 }

  return (
    <div>
      <div>
        {blog.title}
        <button id='hide-blog-button' onClick={props.handleToggle}>hide</button>
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
        (props.userId === blog.user.id || props.userId === blog.user)
          ?
          <button id='remove-blog-button'
            onClick={() => props.handleRemove(blog, blog.id)}
          >
            remove
          </button>
          : <></>
      }
    </div>
  )
}

export default BlogDetail