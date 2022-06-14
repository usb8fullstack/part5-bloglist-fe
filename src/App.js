import { useState, useEffect, useRef } from 'react'
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

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const _user = window.localStorage.getItem('localUser')
    // NOTE: promise
    // if (_user) {
    //   const set = new Promise((resolve, reject) => {
    //     setUser(JSON.parse(_user))
    //     resolve(true)
    //   })
    //   set
    //     .then(() => blogService.setToken(user.token))
    // }
    if (_user) {
      const _userObj = JSON.parse(_user)
      setUser(_userObj)
      blogService.setToken(_userObj.token)
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

  const handleAddBlog = async (newBlog) => {
    try {
      const _newBlog = await blogService.create(newBlog)

      setNotify({
        success: `a new blog ${_newBlog.title} - ${_newBlog.author} added`
      })
      setTimeout(() => {
        setNotify({})
      }, 5000)

      setBlogs([...blogs, _newBlog])
      blogFormRef.current.toggleVisibility()
      return true
    } catch(exception) {
      setNotify({ fail: `${exception}` })
      setTimeout(() => {
        setNotify({})
      }, 5000)
      return false
    }
  }

  const handleUpdate = async (newBlog, id) => {
    try {
      const _newBlog = await blogService.update(newBlog, id)

      setNotify({
        success: `Your like is success`
      })
      setTimeout(() => {
        setNotify({})
      }, 5000)

      setBlogs(blogs.map(o => (o.id !== id) ? o : _newBlog ))
    } catch(exception) {
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

            <Togglable buttonLabel="new blog" ref={blogFormRef}>
              <BlogForm handleAddBlog={handleAddBlog} />
            </Togglable>
            <Blogs blogs={blogs} handleUpdate={handleUpdate} />
          </>
      }
    </div>
  )
}

export default App
