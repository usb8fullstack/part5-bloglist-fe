import { React, useState } from "react"
import BlogDetail from './BlogDetail'

const Blog = ({blog}) => {
  const [toggle, setToggle] = useState(false)

  const handleToggle = () => {
    setToggle(!toggle)
  }

  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      {
        toggle === false
        ? 
          <>
            {blog.title} - {blog.author}
            <button onClick={handleToggle}>{ toggle ? 'hide' : 'view'}</button>
          </>
        : <BlogDetail blog={blog} toggle={toggle} handleToggle={handleToggle} />
      }
    </div>  
  )
}

export default Blog