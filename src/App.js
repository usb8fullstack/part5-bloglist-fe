import { useState, useEffect } from 'react'
import BlogForm from './components/BlogForm'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
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

      blogService.setToken(user.token)
      window.localStorage.setItem(
        'localUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
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
      setBlogs([...blogs, _newBlog])
      setNewBlog({
        title: '',
        author: '',
        url: '',
      })
    } catch (exception) {
      setErrorMessage(`${ exception }`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      { 
        user === null
        ?
          <LoginForm username={username} password={password}
          setUsername={setUsername} setPassword={setPassword}
          handleLogin={handleLogin} />
        :
          <>
            <h2>blogs</h2>
            <div>
              {user.name} logged in
              <button onClick={handleLogout}>logout</button>
            </div>
            <h2>create new</h2>
            <BlogForm newBlog={newBlog} setNewBlog={setNewBlog} handleAddBlog={handleAddBlog} />
            <Blogs blogs={blogs} />
          </>
      }
    </div>
  )
}

export default App
