import {useContext} from 'react'
import { userContext } from '../UserApp'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Nav-Cat.css'
import olxAxios from '../../../../Config/AxiosConfig'



function UserOnNav() {
    const {userData,setUserData} = useContext(userContext)
    const [userPopOpened,isOpened] = useState(false)
    const url = useNavigate()

    function handleLogout(){
      let token = localStorage.getItem('refresh-token') 
      olxAxios.post('/logout/',{'refresh-token':token}).then(res=>{
        localStorage.clear()
        if (setUserData) setUserData({username:null,user_id:null,email:null,profile:null}) 
        olxAxios.defaults.headers['Authorization'] = null
        url('/')
      }).catch(err=>{
        alert('Something wrong !')
        
      })
    }

  return (
    <div className='d-flex align-items-center me-1 user-on-nav' onClick={()=>{isOpened(!userPopOpened)}}>
      
      <figure style={{'width': '45px','margin':0,'marginRight':'7px','backgroundSize':'cover','height': '45px','backgroundImage':'url("https://statics.olx.in/external/base/img/avatar_1.png")'}}></figure>

       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={ userPopOpened ? 'up ms-1' : 'down ms-1'} viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
        </svg>

        {
          userPopOpened ? 
          <div className="userPopper">
            <div className="popper-img">
              <figure className='rounded-circle' style={{'width': '50px','margin':0,'marginRight':'7px','backgroundSize':'cover','height': '50px','backgroundImage':userData.profile ? `url("${userData.profile}")` : 'url("https://statics.olx.in/external/base/img/avatar_1.png")'}}></figure>
              <h4>{userData.username}</h4>
            </div>
            <ul className='user-popper-li'>
              <li>
                <button onClick={()=>{url('edit-profile')}} className='login-form-btn popper-btn'>View or Edit Profile</button>
              </li>
              <li className='hovli'>
                <svg width="23px" height="23px" viewBox="0 0 1024 1024" data-aut-id="icon" className="" fillRule="evenodd"><path className="rui-w4DG7" d="M128 85.333l-42.667 42.667v768l42.667 42.667h768l42.667-42.667v-213.333l-42.667-42.667-42.667 42.667v170.667h-682.667v-682.667h682.667v170.667l42.667 42.667 42.667-42.667v-213.333l-42.667-42.667h-768zM494.336 298.667l-183.168 183.168v60.331l183.168 183.168h60.331v-60.331l-110.336-110.336h323.669l42.667-42.667-42.667-42.667h-323.669l110.336-110.336v-60.331h-60.331z"></path></svg>
                <p onClick={()=>{handleLogout()}}>Logout</p>
              </li>
            </ul>
          </div>
          : null
        }
    </div>
  )
}

export default UserOnNav