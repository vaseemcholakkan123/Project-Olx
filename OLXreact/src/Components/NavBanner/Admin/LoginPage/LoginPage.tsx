import { Dispatch, SetStateAction,useState,useRef } from 'react'
import './loginpage.css'
import olxAxios from '../../../../Config/AxiosConfig'

type adminLogin = {
  setLogin : Dispatch<SetStateAction<boolean>>
  
}

function LoginPage(props:adminLogin) {

  const [err,appendERR] = useState(null)
  const usernameInput = useRef<HTMLInputElement>(null)
  const passwordInput = useRef<HTMLInputElement>(null)

  function handleSubmit(){
    let usernameData = usernameInput.current ? usernameInput.current.value : null
    let passwordData = passwordInput.current ? passwordInput.current.value : null

    olxAxios.post('admin-login/',{username:usernameData,password:passwordData}).then(res=>{
        olxAxios.post('token/',{
                                    username : usernameData,
                                    password : passwordData 
                                })
                                .then(res=>{
                                    localStorage.setItem('access-token',res.data.access)
                                    localStorage.setItem('refresh-token',res.data.refresh)
                                    olxAxios.defaults.headers['Authorization'] = 'Bearer ' + localStorage.getItem('access-token')
                                    
                                })
                                .catch(axiosR=>{
                                    console.log('error');
                                    console.log(axiosR);

                                })

                                localStorage.setItem('logged_user',JSON.stringify(res.data.user))
                                localStorage.setItem('adminLogged','true')
                                props.setLogin(true)

    }).catch(AxiosErr=>{
       appendERR(AxiosErr.response.data.message) 
    })

  }

  return (
    <div className='admin-login container-fluid'>

      <div className="form-el contain border-nobottom">
        <svg width="48" height="48" viewBox="0 0 1024 1024" data-aut-id="icon" className="" fillRule="evenodd">
            <path className="rui-4K4Y7" d="M661.333 256v512h-128v-512h128zM277.333 298.667c117.824 0 213.333 95.531 213.333 213.333s-95.509 213.333-213.333 213.333c-117.824 0-213.333-95.531-213.333-213.333s95.509-213.333 213.333-213.333zM794.496 384l37.504 37.504 37.504-37.504h90.496v90.496l-37.504 37.504 37.504 37.504v90.496h-90.496l-37.504-37.504-37.504 37.504h-90.496v-90.496l37.504-37.504-37.504-37.504v-90.496h90.496zM277.333 426.667c-47.061 0-85.333 38.293-85.333 85.333s38.272 85.333 85.333 85.333c47.061 0 85.333-38.293 85.333-85.333s-38.272-85.333-85.333-85.333z">
            </path>
        </svg>
        <h3  className='m-0 ms-2'>Admin Login</h3>
      </div>
      <div className="form-el contain border-noup a-form">
        <h3>
          Enter Username and Password
        </h3>
        <p className='err'>{err ? err : null}</p>
        <input type="text" ref={usernameInput} placeholder='Username' />
        <input type="password" ref={passwordInput} placeholder='Password' />

        <button onClick={()=>{handleSubmit()}} className='form-btn2 w-25 mb-4'>Login</button>
      </div>

    </div>
  )
}

export default LoginPage