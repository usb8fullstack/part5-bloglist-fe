import { React, useState } from 'react'

export default function BlogForm({ handleAddBlog }) {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  })

  const handleOnSubmit = async (event) => {
    event.preventDefault()
    // handleAddBlog(newBlog)
    //   .then((res) => {
    //     if (res === true) {
    //       setNewBlog({
    //         title: '',
    //         author: '',
    //         url: '',
    //       })
    //     }
    //   })
    const res = await handleAddBlog(newBlog)
    if (res === true) {
      setNewBlog({
        title: '',
        author: '',
        url: '',
      })
    }
  }

  return (
    <div>
      <h2>create new blog</h2>

      <form onSubmit={handleOnSubmit}>
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
    </div>
  )
}