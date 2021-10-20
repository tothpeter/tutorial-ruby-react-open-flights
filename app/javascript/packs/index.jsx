import React from 'react'
import ReactDOM from 'react-dom'

import App from '../components/app'

const Hello = props => (
  <div>Hello {props.name}!</div>
)

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App/>,
    document.body.appendChild(document.createElement('div')),
  )
})
