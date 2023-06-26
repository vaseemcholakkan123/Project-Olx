import {useState,useEffect,useRef, useContext} from 'react'
import LoginModal from './LoginModal'
import CreateModal from './CreateModal'
import { user, userContext } from '../../UserApp'


function LoginPopper() {
    const [currentModal,gotoModal] = useState('login-selection')
    const [isloggedIn,SetLoggedIn] = useState(false)
    const modalCloser = useRef<HTMLButtonElement>(null)
    const {setUserData} = useContext(userContext)

    useEffect(()=>{
        modalCloser.current?.click();
          let localStorageUserString = localStorage.getItem('logged_user')
    if(localStorageUserString && setUserData){
      let localStorageUser = JSON.parse(localStorageUserString)
    setUserData(
        {
          username:localStorageUser ? localStorageUser.username : null,
          user_id:localStorageUser ? localStorageUser.user_id : null,
          email:localStorageUser ? localStorageUser.email : null,
          profile:localStorageUser ? localStorageUser.profile : null
        })
    }


    },[isloggedIn])
    
  return (
    <>
        <a href="" className='login-text ms-auto-2' data-bs-toggle="modal" data-bs-target="#staticBackdrop" >Login</a>
        
        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
            <div className="modal-header">
                <button type="button" ref={modalCloser} onClick={()=>{gotoModal('login-selection')}} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

                { currentModal == 'login-selection' ? 

            <div className="modal-body">
                
                <div id="carouselExampleRide" className="carousel slide" data-bs-ride="true">
                    <div className="carousel-inner">
                        
                         <div className="carousel-item active">
                            <div className="d-flex modal-corousel">
                                <img src="https://statics.olx.in/external/base/img/loginEntryPointChat.webp" className="d-block w-100" alt="..."/>
                                <p className="modal-text mt-1">Keep all your favorites in one place</p>

                            </div>

                            
                        </div>

                        <div className="carousel-item">
                            <div className="d-flex modal-corousel">
                                <img src="https://statics.olx.in/external/base/img/loginEntryPointPost.webp" className="d-block w-100" alt="..."/>
                                <p className="modal-text mt-1">Help us become one of the safest place to buy and sell</p>

                            </div>
                        </div>

                        <div className="carousel-item">
                            
                            <div className="d-flex modal-corousel">
                                <img src="https://statics.olx.in/external/base/img/loginEntryPointFavorite.webp" className="d-block w-100" alt="..."/>
                                <p className="modal-text mt-1">Close deals from comfort of your home.</p>

                            </div>
                        </div>

                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>  

                <div className="d-flex login-selection">

                    <div className="login-option" onClick={()=>{gotoModal('login')}}>
                        <h3 className="modal-t">
                        <svg width="40px" height="40px" viewBox="0 0 1024 1024" data-aut-id="icon" className="_2oC8g" fillRule="evenodd"><path className="rui-4K4Y7 _3Z_D3" d="M743.68 85.333l66.987 67.84v701.227l-63.573 84.267h-471.253l-62.507-85.333v-700.373l67.627-67.627h462.72zM708.053 170.667h-391.893l-17.493 17.707v637.653l20.053 27.307h385.92l21.333-27.52v-637.653l-17.92-17.493zM512 682.667c23.564 0 42.667 19.103 42.667 42.667s-19.103 42.667-42.667 42.667c-23.564 0-42.667-19.103-42.667-42.667s19.103-42.667 42.667-42.667z"></path></svg>
                            
                        &nbsp; Login with Username</h3>
                    </div>
                    <div className="login-option" onClick={()=>{gotoModal('create')}}>
                        <h3 className="modal-t">
                        <svg width="40px" height="40px" viewBox="0 0 1024 1024" data-aut-id="icon" className="_2oC8g" fillRule="evenodd"><path className="rui-4K4Y7 _3Z_D3" d="M743.68 85.333l66.987 67.84v701.227l-63.573 84.267h-471.253l-62.507-85.333v-700.373l67.627-67.627h462.72zM708.053 170.667h-391.893l-17.493 17.707v637.653l20.053 27.307h385.92l21.333-27.52v-637.653l-17.92-17.493zM512 682.667c23.564 0 42.667 19.103 42.667 42.667s-19.103 42.667-42.667 42.667c-23.564 0-42.667-19.103-42.667-42.667s19.103-42.667 42.667-42.667z"></path></svg>
                        &nbsp; Create new Account</h3>
                    </div>

                    <div className="terms">
                        <p className='f-auto'>All your personal details are safe with us.</p>
                        <p className='f-auto'>If you continue, you are accepting OLX Terms and Conditions and Privacy Policy</p>
                    </div>

                </div>       

            </div> 

                : currentModal == 'login' ? 


                <LoginModal gotoModal={gotoModal} Logged_in={SetLoggedIn}/>

            :


                <CreateModal gotoModal={gotoModal} />

            }

        </div>
        </div>
        </div>
    </>
  )
}

export default LoginPopper