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
    <div className='d-flex align-items-center me-1 user-on-nav ms-auto-2' onClick={()=>{isOpened(!userPopOpened)}}>
      
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
              <li onClick={e=>{ url(`/profile/${userData.username}`,{state:{'user_id':userData.user_id}}); 
            
              if(location.href.includes('/profile/')) window.location.reload()
            
            }} className='hovli'>
              <svg width="23px" height="23px" viewBox="0 0 1024 1024" data-aut-id="icon" fillRule="evenodd"><path className="rui-w4DG7" d="M830.798 448.659l-318.798 389.915-317.828-388.693c-20.461-27.171-31.263-59.345-31.263-93.033 0-85.566 69.605-155.152 155.152-155.152 72.126 0 132.752 49.552 150.051 116.364h87.777c17.299-66.812 77.905-116.364 150.051-116.364 85.547 0 155.152 69.585 155.152 155.152 0 33.687-10.802 65.862-30.293 91.811zM705.939 124.121c-80.853 0-152.204 41.425-193.939 104.204-41.736-62.778-113.086-104.204-193.939-104.204-128.33 0-232.727 104.378-232.727 232.727 0 50.657 16.194 98.948 47.806 140.897l328.766 402.133h100.189l329.716-403.355c30.662-40.727 46.856-89.018 46.856-139.675 0-128.349-104.398-232.727-232.727-232.727z"></path></svg>
                <p>My Ads</p>
              </li>
              <li onClick={()=>{url('edit-profile')}} className='hovli d-lg-none'>
                <svg width="24px" className='chat-ico' height="24px" viewBox="0 0 1024 1024" data-aut-id="icon" fillRule="evenodd"><path className="rui-w4DG7" d="M469.333 171.119c-164.693 0-298.667 134.684-298.667 300.25v359.529l108.907-54.753 19.093-4.525h256c164.693 0 298.667-134.684 298.667-300.25s-133.973-300.25-298.667-300.25h-85.333zM147.093 938.667l-61.76-38.368v-428.929c0-212.856 172.267-386.036 384-386.036h85.333c211.733 0 384 173.18 384 386.036s-172.267 386.036-384 386.036h-245.931l-161.643 81.261z"></path></svg>
                <p>Chat</p>
              </li>
              <li onClick={()=>{handleLogout()}} className='hovli'>
                <svg width="23px" height="23px" viewBox="0 0 1024 1024" data-aut-id="icon" className="" fillRule="evenodd"><path className="rui-w4DG7" d="M128 85.333l-42.667 42.667v768l42.667 42.667h768l42.667-42.667v-213.333l-42.667-42.667-42.667 42.667v170.667h-682.667v-682.667h682.667v170.667l42.667 42.667 42.667-42.667v-213.333l-42.667-42.667h-768zM494.336 298.667l-183.168 183.168v60.331l183.168 183.168h60.331v-60.331l-110.336-110.336h323.669l42.667-42.667-42.667-42.667h-323.669l110.336-110.336v-60.331h-60.331z"></path></svg>
                <p >Logout</p>
              </li>

            </ul>
          </div>
          : null
        }
    </div>
  )
}

export default UserOnNav