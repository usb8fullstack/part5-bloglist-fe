import React from 'react'

export default function BlogForm(props) {
  return (
    <div>
      <h2>create new</h2>
      
      <form onSubmit={props.handleAddBlog}>
        <div>
          title:
          <input type="text"
            value={props.newBlog.title}
            name="Title"
            onChange={e => props.setNewBlog({ ...props.newBlog, title: e.target.value })}
          />
        </div>
        <div>
          author:
          <input type="text"
            value={props.newBlog.author}
            name="Author"
            onChange={e => props.setNewBlog({ ...props.newBlog, author: e.target.value })}
          />
        </div>
        <div>
          url:
          <input type="text"
            value={props.newBlog.url}
            name="Url"
            onChange={e => props.setNewBlog({ ...props.newBlog, url: e.target.value })}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}
