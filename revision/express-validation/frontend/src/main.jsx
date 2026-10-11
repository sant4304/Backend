import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "../src/app/index.css"
import App from "../src/app/App"
import { store } from './app/app.store'
import { Provider } from "react-redux";

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Provider store = {store}> 
    <App />
 </Provider>

  </StrictMode>,
)
