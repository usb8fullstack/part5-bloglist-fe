import { React } from 'react'
import Blog from './Blog'
import jwt_decode from 'jwt-decode'

export default function Blogs(props) {
  const _user = JSON.parse(window.localStorage.getItem('localUser'))
  const userId = jwt_decode(_user.token).id

  return (
    <>
      {props.blogs.map(o =>
        <Blog key={o.id} {...props} blog={o} userId={userId} />
      )}
    </>
  )
}
