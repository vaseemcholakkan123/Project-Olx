import './user.css'
import { useContext, useState } from 'react'
import { userContext } from '../UserApp'
import { useRef } from 'react'
import olxAxios from '../../../../Config/AxiosConfig'
import { useNavigate } from 'react-router-dom'
import EditProfilePic from './Profile/Edit-ProfilePic'

function EditProfile() {

    const { userData,setUserData } = useContext(userContext)
    const url = useNavigate()
    const usernameInput = useRef<HTMLInputElement>(null);
    const profileInput = useRef<HTMLInputElement>(null)
    const [activePage,SetActivePage] = useState('details')
    const emailInput  = useRef<HTMLInputElement>(null)
    const [err,appendERR] = useState('')

    function handleSubmit(){
        let usernameData = usernameInput.current ? usernameInput.current.value : userData.username
        let emailData = emailInput.current ? emailInput.current.value : null
        let profileData = profileInput.current?.files ? profileInput.current.files[0] : null 
        
        olxAxios.put(`user/${userData.user_id}`,
        {username:usernameData ,email: emailData,profile:profileData},
        {headers:{'Content-Type':'multipart/form-data'}})
        .then(res=>{
            alert('Changes Saved')
            
            let localStorageUserString = localStorage.getItem('logged_user')
                if(localStorageUserString && setUserData){
                let localStorageUser = JSON.parse(localStorageUserString)
                setUserData(
                    {
                    username:res.data.username,
                    user_id:localStorageUser ? localStorageUser.user_id : null,
                    email:res.data.email,
                    profile:res.data.profile
                    })
                }
            url('/')
        })
        .catch(e=>{
            e.response.data.username ? appendERR('Username may not be blank') : e.response.data.email ? appendERR(e.response.data.email) : appendERR(e.response.data.profile)
        })
    }

  return (
    <div className='container-fluid parent row ms-3'>
        <div className="col-2">
            <p className={activePage == 'details' ? 'active-txt cursor' : 'cursor'} onClick={e=>{SetActivePage('details')}}>Edit Profile</p>
            <p className={activePage == 'profile_image' ? 'active-txt cursor' : 'cursor'} onClick={e=>{SetActivePage('profile_image')}}>Profile Picture</p>
            <button className='w-100 mt-2 login-form-btn btn-2 padding-no' onClick={e=>url(`/profile/${userData.username}`,{state:{'user_id':userData.user_id}})}>View Profile</button>
        </div>
        {
            activePage == 'details' ?
            <div className="col-10">
                <div className="form-el border-nobottom">
                    <h4>Edit Profile</h4>
                </div>
                <div className="form-el border-noup">
                    <p className="form-t1">Basic Information</p>
                    <p className="err">{err ? err : null}</p>
                    <form action="">
                        <div>
                            <input type="text" ref={usernameInput} placeholder='Username' defaultValue={userData.username ? userData.username : ''} />
                            <label className='mybtn' htmlFor="profile-image">Profile Image</label>
                            <input type="file" ref={profileInput} id='profile-image' style={{'display':'none'}} />
                        </div>
                        <p className="form-t1 m-0 mt-4 mb-1">Contact Information</p>
                        <input className='mb-1' ref={emailInput} type="text" name='email' defaultValue={userData.email ? userData.email : ''} placeholder='E-mail' />
                        
                    </form>
                </div>
                <div className="form-el border-noup extra-p">
                    <button onClick={()=>{url('/ ')}} className='form-btn1'>Discard</button>
                    <button className='form-btn2' onClick={()=>{handleSubmit()}}>Save Changes</button>
                </div>
            </div>
        :
         <EditProfilePic profile={userData.profile} />
        }
    </div>
  )
}

export default EditProfile