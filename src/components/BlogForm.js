import React from 'react'

export default function BlogForm({handleAddBlog, newBlog, setNewBlog}) {
  return (
    <form onSubmit={handleAddBlog}>
      <div>
        title:
        <input type="text"
          value={newBlog.title}
          name="Title"
          onChange={e => setNewBlog({ ...newBlog, title: e.target.value })}
        />
      </div>
      <div>
        author:
        <input type="text"
          value={newBlog.author}
          name="Author"
          onChange={e => setNewBlog({ ...newBlog, author: e.target.value })}
        />
      </div>
      <div>
        url:
        <input type="text"
          value={newBlog.url}
          name="Url"
          onChange={e => setNewBlog({ ...newBlog, url: e.target.value })}
        />
      </div>
      <button type="submit">create</button>
    </form>  
  )
}
