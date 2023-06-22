import React , {useState,Dispatch,SetStateAction} from 'react'
import olxAxios from '../../../../../Config/AxiosConfig'

type login_create_modal = {
    gotoModal : Dispatch<SetStateAction<string>>
}
type userCreationFormType = {
    username : string,
    password1 : string,
    password2 : string
}



function CreateModal(props:login_create_modal) {

    const [User_Creation_form,updateCreationForm] = useState({username:'',password1:'',password2:''})
    const [create_loading,show_create_loading] = useState(false)
    const [err,appendERR] = useState<string>('')
    const [creationSuccess,create_is_success] = useState(false)

    function data_is_valid(form:userCreationFormType){
        if (form.username.length <= 5) {
            appendERR('Username should contain atleat 6 letters')
            return false;
        }
        else if (form.password1.length <= 7){
            appendERR('Password must contain 8 letters')
        }
        else if (form.password1 != form.password2){
            appendERR("Passwords don't match")
            return false
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

                    {   creationSuccess ? 
                        <>
                        <svg style={{'margin':'.5rem 0'}} version="1.1" id="Capa_1" width={100} height={100} xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 50 50" >
                            <circle style={{'fill':'#25AE88'}} cx="25" cy="25" r="25"/>
                            <polyline style={{'fill':'none','stroke':'#FFFFFF','strokeWidth':2,'strokeLinecap':'round','strokeLinejoin':'round','strokeMiterlimit':10}} points="38,15 22,33 12,25 "/>
                        </svg>


                            <h2 >Account Created !</h2>

                            <button className="login-form-btn" onClick={()=>{props.gotoModal('login')}}>Login Now</button>
                        </>
                        :
                    <>
                    <h3 className='modal-t'>Enter Username and password</h3>
                    <p className="form-error">{ err ? err : null}</p>

                    <form className='login-form'>
                        <input required onChange={(e)=>{updateCreationForm({...User_Creation_form,[e.target.name] : e.target.value})}} type="text" name='username' placeholder='eg - Vaseemcholakkan' />
                        <input required onChange={(e)=>{updateCreationForm({...User_Creation_form,[e.target.name] : e.target.value})}} name="password1" type="password" placeholder='eg - vas12@4' />
                        <input required onChange={(e)=>{updateCreationForm({...User_Creation_form,[e.target.name] : e.target.value})}} type="password" name='password2' placeholder='Confirm password' />
                        <button className="login-form-btn create-btn" type='submit' onClick={(e)=>{

                            e.preventDefault()
                            if (!data_is_valid(User_Creation_form)) return;
                            show_create_loading(true)
                            const btn = e.currentTarget
                            btn.disabled = true

                                
                            olxAxios.post('create-user/',
                            {
                                username:User_Creation_form.username,
                                password:User_Creation_form.password1
                            
                            })
                            .then(res=>{
                                show_create_loading(false)
                                create_is_success(true)
                            }
                            )
                            .catch(err=>{
                                appendERR(err.response.data.username)
                                btn.innerText = 'Try Again'
                                btn.disabled = false

                            })
                        }}>


                        {   !create_loading ? 
                        
                        'Create Account'
                            :
                        <div className="loading"></div>

                        }

                        </button>
                    </form>

                    <div className="terms">
                        <p className='f-auto'>Your details is never shared with external parties nor do we use it to spam you in any way.</p>
                    </div>
                    </>

                    }


                </div>
            </div>
  )
}

export default CreateModal