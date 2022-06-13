import React from 'react'
import Blog from './Blog'

export default function Blogs(props) {
  return (
    <>
      {props.blogs.map(o =>
        <Blog key={o.id} blog={o} />
      )}
    </>
  )
}
