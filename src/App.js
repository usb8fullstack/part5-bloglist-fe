import { useState, useEffect } from 'react'
import BlogForm from './components/BlogForm'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import Notify from './components/Notify'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/utils/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notify, setNotify] = useState({})
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const _user = window.localStorage.getItem('localUser')
    if (_user) {
      setUser(JSON.parse(_user))
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      setNotify({ success: 'Login success' })
      setTimeout(() => {
        setNotify({})
      }, 5000)

      blogService.setToken(user.token)
      window.localStorage.setItem(
        'localUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotify({ fail: 'wrong username or password' })
      setTimeout(() => {
        setNotify({})
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('localUser')
    setUser(null)
  }

  const handleAddBlog = async (event) => {
    event.preventDefault()
    try {
      const _newBlog = await blogService.create(newBlog)

      setNotify({
        success: `a new blog ${_newBlog.title} - ${_newBlog.author} added`
      })
      setTimeout(() => {
        setNotify({})
      }, 5000)

      setBlogs([...blogs, _newBlog])
      setNewBlog({
        title: '',
        author: '',
        url: '',
      })
    } catch (exception) {
      setNotify({ fail: `${exception}` })
      setTimeout(() => {
        setNotify({})
      }, 5000)
    }
  }

  return (
    <div>
      { 
        user === null
        ?
          <>
            <h2>log in to application</h2>
            <Notify notify={notify} />
            <LoginForm username={username} password={password}
          setUsername={setUsername} setPassword={setPassword}
              handleLogin={handleLogin}
            />
          </>
        :
          <>
            <h2>blogs</h2>
            <Notify notify={notify} />
            <div>
              {user.name} logged in
              <button onClick={handleLogout}>logout</button>
            </div>

            <Togglable buttonLabel="new blog">
              <BlogForm newBlog={newBlog} setNewBlog={setNewBlog} handleAddBlog={handleAddBlog} />
            </Togglable>
            <Blogs blogs={blogs} />
          </>
      }
    </div>
  )
}

export default App
