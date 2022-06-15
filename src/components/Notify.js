import React from 'react'

const Notify = ({ notify }) => {
  const successStyle = {
    color: 'green',
    background: '#a7a7a8',
    fontSize: 16,
    border: '2px solid green',
    padding: 4,
  }
  const failStyle = {
    color: 'red',
    background: '#a7a7a8',
    fontSize: 16,
    border: '2px solid red',
    padding: 4,
  }

  return (
    // (Object.keys(notify).length === 0)
    (!notify.success && !notify.fail)
      ? <></>
      : (notify.success)
        ? <div style={successStyle}>{notify.success}</div>
        : <div style={failStyle}>{notify.fail}</div>
  )
}

export default Notify