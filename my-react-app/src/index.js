import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
// import { Provider } from 'react-redux'
import App from './App'
import { Provider } from 'react-redux'
import store from './store/store'
import './index.css'
// import store from './store/store'
const rootElement = document.getElementById('root')

render(
  <React.StrictMode>

     <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
        </Provider>
    
  </React.StrictMode>,
  rootElement
)
