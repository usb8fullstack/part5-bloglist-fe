import { React } from "react"

const BlogDetail = ({blog, toggle, handleToggle}) => {
  return (
    <div>
      <div>
        {blog.title}
        <button onClick={handleToggle}>{ toggle ? 'hide' : 'view'}</button>  
      </div>
      <div>{blog.author}</div>
      <div>
        like {blog.likes}&nbsp;
        <button>like</button>
      </div>
      <div>{blog.author}</div>
    </div>  
  )
}

export default BlogDetail