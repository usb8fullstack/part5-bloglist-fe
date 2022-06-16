import React from 'react'

export default function LoginForm(props) {
  return (
    <form onSubmit={props.handleLogin}>
      <div>
        username
        <input
          type="text" id='username'
          value={props.username}
          name="Username"
          onChange={({ target }) => props.setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password" id='password'
          value={props.password}
          name="Password"
          onChange={({ target }) => props.setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">login</button>
    </form>
  )
}
