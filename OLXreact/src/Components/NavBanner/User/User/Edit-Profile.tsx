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
    const [activePage,SetActivePage] = useState<string>('details')
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
    <div className='container-fluid parent dynamic-p row ms-3'>
        <div className="col-2 hide-lg">
            <p className={activePage == 'details' ? 'active-txt cursor' : 'cursor'} onClick={e=>{SetActivePage('details')}}>Edit Profile</p>
            <p className={activePage == 'profile_image' ? 'active-txt cursor' : 'cursor'} onClick={e=>{SetActivePage('profile_image')}}>Profile Picture</p>
            <button className='w-100 mt-2 login-form-btn btn-2 padding-no' onClick={e=>url(`/profile/${userData.username}`,{state:{'user_id':localStorage.getItem('logged_user_id')}})}>View Profile</button>
        </div>
        {
            activePage == 'details' ?
            <div className="col-md-10 col-12">
                <div className="d-flex text-secondary c-pointer mb-2 d-lg-none">
                    <p onClick={e=>{SetActivePage('Profile-Image')}} className='active-content ms-2'>{'Profile Picture >'}</p>
                    <p onClick={e=>url(`/profile/${userData.username}`,{state:{'user_id':localStorage.getItem('logged_user_id')}})} className='active-content ms-auto'>{'Profile >'}</p>
                </div>
                <div className="form-el border-nobottom">
                    <h4>Edit Profile</h4>
                </div>
                <div className="form-el border-noup h-75 d-flex">
                    <div className='col-12 col-md-6 profile-inputs'>
                        <p className="form-t1">Basic Information</p>
                        <p className="err">{err ? err : null}</p>
                        <form action="">
                            <div className='col-8'>
                                <input type="text" ref={usernameInput} placeholder='Username' defaultValue={userData.username ? userData.username : ''} />
                                
                            </div>
                            
                            <div className="col-8">
                                <p className="form-t1 m-0 mt-3 mb-1">Contact Information</p>
                                <input className='mb-1 w-100' ref={emailInput} type="text" name='email' defaultValue={userData.email ? userData.email : ''} placeholder='E-mail' />
                                
                            </div>
                        </form>
                    </div>
                    <div className="border-1 p-2 info2 form-el hide-lg">
                        <div className="d-flex a-center">
                            <svg width="25px" height="25px" viewBox="0 0 1024 1024" data-aut-id="icon" fillRule="evenodd"><path className="rui-w4DG7" d="M318.061 279.272h-54.847l-61.517-61.517v-54.847h54.847l61.517 61.517v54.847zM512 240.485l-38.789-38.789v-77.575l38.789-38.789 38.789 38.789v77.575l-38.789 38.789zM938.667 473.211l-38.789 38.789h-77.575l-38.789-38.789 38.789-38.789h77.575l38.789 38.789zM201.697 434.425l38.789 38.789-38.789 38.789h-77.575l-38.789-38.789 38.789-38.789h77.575zM822.303 217.755l-61.517 61.517h-54.847v-54.847l61.517-61.517h54.847v54.847zM621.73 621.73c-13.848 13.809-29.867 24.747-47.67 32.505l-23.272 35.569v54.924h-77.575v-54.924l-23.272-35.53c-17.804-7.757-33.823-18.734-47.67-32.582-60.47-60.47-60.47-158.913 0-219.385 60.51-60.51 158.952-60.51 219.462 0 60.47 60.47 60.47 158.913 0 219.385zM473.211 861.091h77.575v-38.789h-77.575v38.789zM512 279.272c-62.177 0-120.63 24.204-164.538 68.19-90.764 90.725-90.764 238.351 0 329.115 14.507 14.469 30.643 26.919 48.174 37.043v186.259l38.789 38.789h155.151l38.789-38.789v-186.259c17.57-10.163 33.669-22.574 48.174-37.081 90.764-90.725 90.764-238.391 0-329.115-43.909-43.909-102.323-68.15-164.538-68.15z"></path></svg>
                            <h6 className='p-1 mb-0'>Why is it Important ?</h6>
                        </div>
                        <p className='f-small'>OLX is built on trust. Help other people get to know you. Tell them about the things you like. Share your favorite brands, books, movies, shows, music, food. And you will see the results…</p>
                    </div>
                </div>
                <div className="form-el border-noup extra-p">
                    <button onClick={()=>{url('/')}} className='form-btn1'>Discard</button>
                    <button className='form-btn2' onClick={()=>{handleSubmit()}}>Save Changes</button>
                </div>
            </div>
        :
         <EditProfilePic setActivePage={SetActivePage} activePage={activePage} profile={userData.profile} />
        }
    </div>
  )
}

export default EditProfile