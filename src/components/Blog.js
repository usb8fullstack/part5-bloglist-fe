import { React, useState } from 'react'
import BlogDetail from './BlogDetail'
import PropTypes from 'prop-types'

const Blog = (props) => {
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
    <div style={blogStyle}  className='blog'>
      {
        toggle === false
          ?
          <>
            {props.blog.title} - {props.blog.author}
            <button onClick={handleToggle}>{ toggle ? 'hide' : 'view'}</button>
          </>
          :
          <BlogDetail {...props} />
      }
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
}

export default Blog