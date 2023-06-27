 
import { Dispatch, SetStateAction, useContext } from 'react'
import olxAxios from '../../../../../Config/AxiosConfig'
import { NotifyProfileError, NotifyProfileSuccess } from '../../Helper'
import { userContext } from '../../UserApp'
import { BASE_IMAGE_URL } from '../../../../../Config/ConstAPI'

type pic = {
    profile : string|null|File,
    setActivePage:Dispatch<SetStateAction<string>>,
    activePage:string,
}

function EditProfilePic({setActivePage,activePage,...props}:pic) {

    const {userData,setUserData} = useContext(userContext)

  return (
        <div className="col-md-10 col-12">

        <div className="d-flex text-secondary c-pointer mb-2 d-lg-none">
            <p onClick={e=>{setActivePage('details')}} className='active-content ms-2'>{'Edit Details >'}</p>
        </div>

        <div className="form-el border-nobottom">
            <h4>Profile Picture</h4>
        </div>
        <div className="form-el border-noup low-p">
            
            <div className="d-flex">
                <img className='m-1 rounded-circle' width={200} height={200} src={userData.profile ? String(userData.profile) : 'https://statics.olx.in/external/base/img/avatar_1.png'} alt="" />
                <div className='m-1 p-2 container-1'>
                    <p className='f-medium w-90 mb-2 d-none d-md-block'>Clear photos are an important way for buyers and sellers to learn about each other. Be sure doesn’t include any personal or sensitive info you’d rather not have others see.</p>
                    <p className="mt-2 f-medium wieght-500 mb-2">It’s not much fun to chat with a landscape!</p>
                    <div>
                        <input type="file" multiple={false} onChange={e=>{
                            let file = e.target.files ? e.target.files[0] : ''
                            let token = localStorage.getItem('access-token')
                            olxAxios.post('edit-profile_pic',
                                {'profile':file},
                                {
                                    headers:{
                                        Authorization:
                                        token ? 
                                        'Bearer ' + token
                                        :
                                        null,
                                        'Content-Type':'multipart/form-data'
                                    }
                                })
                                .then(res=>{
                                    NotifyProfileSuccess()
                                    setUserData? setUserData({...userData,profile:res.data.user.profile}) : null
                                    localStorage.setItem('logged_user',JSON.stringify(res.data.user))

                                })
                                .catch(err=>{
                                    NotifyProfileError()
                                }
                                )

                        }} id='profile_pic' accept="image/png, image/gif, image/jpeg" className='d-none' />
                        <label htmlFor='profile_pic' className='form-btn2 w-100' onClick={()=>{}}>Upload Photo</label>
                    </div>
                </div>
            </div>

            
        </div>
    </div>
  )
}

export default EditProfilePic