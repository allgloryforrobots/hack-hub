import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { store } from './store'
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'

import './App.css'
import LoadingLayout from './components/LoadingLayout'

function App() {
  
  return (
    <Provider store={store}>
      <BrowserRouter>
        <LoadingLayout />
      </BrowserRouter>
    </Provider>
  );
}

export default App

