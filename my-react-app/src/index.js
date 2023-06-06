import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
// import { Provider } from 'react-redux'
import App from './App'

import './index.css'
// import store from './store/store'
const rootElement = document.getElementById('root')

render(
  <React.StrictMode>

    
        <BrowserRouter>
          <App />
        </BrowserRouter>
    
  </React.StrictMode>,
  rootElement
)
