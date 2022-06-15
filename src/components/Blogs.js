import { React, useState } from 'react'
import Blog from './Blog'
import jwt_decode from 'jwt-decode'

const BlogMiddle = (props) => {
  const [toggle, setToggle] = useState(false)

  const handleToggle = () => {
    setToggle(!toggle)
  }

  return (
    <Blog {...props} toggle={toggle} setToggle={setToggle} handleToggle={handleToggle} />
  )
}

export default function Blogs(props) {
  const _user = JSON.parse(window.localStorage.getItem('localUser'))
  const userId = jwt_decode(_user.token).id

  return (
    // <>
    //   {props.blogs.map(o =>
    //     <Blog key={o.id} blog={o} userId={userId} handleUpdate={props.handleUpdate} handleRemove={props.handleRemove} />
    //   )}
    // </>
    <>
      {props.blogs.map(o =>
        <BlogMiddle key={o.id} {...props} blog={o} userId={userId} />
      )}
    </>
  )
}
