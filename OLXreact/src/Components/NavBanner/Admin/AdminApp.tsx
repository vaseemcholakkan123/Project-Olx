import AdminHome from "./HomePage/AdminHome"
import { useNavigate } from "react-router-dom"
import { useEffect,useState } from "react"
import LoginPage from "./LoginPage/LoginPage"

function AdminApp() {
  const [adminLoggedIn,IsadminLoggedIn] = useState(false)
  useEffect(()=>{
    let adminData = localStorage.getItem('adminLogged')
    
    if (adminData == 'true') IsadminLoggedIn(true)
    
  },[adminLoggedIn])

  return (
    <>
    {
      adminLoggedIn ? <AdminHome />
      : <LoginPage setLogin={IsadminLoggedIn}/>
    }
    </>
  )
}

export default AdminApp