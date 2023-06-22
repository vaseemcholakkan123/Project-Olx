
import UserApp from './Components/NavBanner/User/UserApp'
import AdminApp from './Components/NavBanner/Admin/AdminApp'
import './App.css'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Router>
        <Routes>
          <Route element={<AdminApp />} path='/admin' />
          <Route element={<UserApp />} path='/*' />
        </Routes>
      </Router>
    </div>
  ) 
}

export default App
