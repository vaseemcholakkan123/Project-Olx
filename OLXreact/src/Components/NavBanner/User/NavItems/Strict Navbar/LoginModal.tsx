import axios from "axios";
import {Dispatch,SetStateAction, useState,useEffect} from 'react'
import olxAxios from "../../../../../Config/AxiosConfig";


type login_create_modal = {
    gotoModal : Dispatch<SetStateAction<string>>,
    Logged_in : Dispatch<SetStateAction<boolean>>
}
type LoginForm = {
    username : string,
    password: string
}



function LoginModal(props:login_create_modal) {

    const [theLoginForm,appendForm] = useState({username:'',password:''})
    const [err,appendERR] = useState<string>('')
    const [login_loading,show_login_loading] = useState(false)


    function data_is_valid(form:LoginForm){
        if (form.username.length <= 5) {
            appendERR('Username will have atleat 6 letters')
            return false;
        }
        else if (form.password.length <= 7){
            appendERR('Password will have 8 letters')
        }
        else return true
    }

  return (
    <div className="modal-body">
               <div className="backButton p-2" onClick={()=>{props.gotoModal('login-selection')}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                    </svg>
               </div>

                <div className="container w-form">
                    <div className="logo">
                        <svg width="60px" height="60px" viewBox="0 0 1024 1024" data-aut-id="icon" className="" fillRule="evenodd"><path className="rui-l7uK1" d="M661.333 256v512h-128v-512h128zM277.333 298.667c117.824 0 213.333 95.531 213.333 213.333s-95.509 213.333-213.333 213.333c-117.824 0-213.333-95.531-213.333-213.333s95.509-213.333 213.333-213.333zM794.496 384l37.504 37.504 37.504-37.504h90.496v90.496l-37.504 37.504 37.504 37.504v90.496h-90.496l-37.504-37.504-37.504 37.504h-90.496v-90.496l37.504-37.504-37.504-37.504v-90.496h90.496zM277.333 426.667c-47.061 0-85.333 38.293-85.333 85.333s38.272 85.333 85.333 85.333c47.061 0 85.333-38.293 85.333-85.333s-38.272-85.333-85.333-85.333z"></path></svg>
                    </div>

                    <h3 className='modal-t'>Enter Username and password</h3>
                    <p className="form-error">{err ? err : null}</p>


                    <form action="" className='login-form'>
                        <input name="username" onChange={(e)=>{appendForm({...theLoginForm,[e.target.name]:e.target.value})}} type="text" placeholder='eg - Vaseemcholakkan' />
                        <input name="password" onChange={(e)=>{appendForm({...theLoginForm,[e.target.name]:e.target.value})}} type="password" placeholder='eg - vas12@4' />
                        <button className="login-form-btn" onClick={e=>{

                            e.preventDefault()
                            const login_btn = e.currentTarget
                            if (!data_is_valid(theLoginForm)) return ;
                            
                            login_btn.innerText = ''
                            login_btn.disabled = true
                            show_login_loading(true)

                            olxAxios.post('login/',
                            {
                                username: theLoginForm.username,
                                password : theLoginForm.password
                            }
                            ).then(res=>{
                                olxAxios.post('token/',{
                                    username : theLoginForm.username,
                                    password : theLoginForm.password 
                                })
                                .then(res=>{
                                    localStorage.setItem('access-token',res.data.access)
                                    localStorage.setItem('refresh-token',res.data.refresh)
                                    olxAxios.defaults.headers['Authorization'] = 'Bearer ' + localStorage.getItem('access-token')
                                    
                                })
                                .catch(axiosR=>{
                                    
                                })
                                localStorage.setItem('logged_user',JSON.stringify(res.data.user))
                                localStorage.setItem('logged_user_id',res.data.user.user_id)
                                localStorage.setItem('username',res.data.user.username)
                                props.Logged_in(true)
                             
                            })
                            .catch(axiosR=>{
                           
                                login_btn.disabled = false
                                show_login_loading(false)   
                                appendERR(axiosR.response.data.message)
                                
                            })


                        }}>

                        {   !login_loading && !err ? 
                            'Login'
                            : err && !login_loading ? 'Try Again' :
                        <div className="loading"></div>
                        }
                        </button>
                    </form>

                    <div className="terms m-0">
                        <p className="f-auto">Your details is never shared with external parties nor do we use it to spam you in any way.</p>
                    </div>

                </div>
            </div> 
  )
}

export default LoginModal