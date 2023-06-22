import React from 'react'
import olxAxios from '../../../../../Config/AxiosConfig'

type pic = {
    profile : string|null|File
}

function EditProfilePic(props:pic) {
  return (
        <div className="col-10">
        <div className="form-el border-nobottom">
            <h4>Profile Picture</h4>
        </div>
        <div className="form-el border-noup">
            
            <div className="d-flex">
                <img className='m-1' src={props.profile ? props.profile : 'https://statics.olx.in/external/base/img/avatar_1.png'} alt="" />
                <div className='m-1 p-2 container-1'>
                    <p className='f-medium w-90 mb-2'>Clear photos are an important way for buyers and sellers to learn about each other. Be sure doesn’t include any personal or sensitive info you’d rather not have others see.</p>
                    <p className="mt-2 f-medium wieght-500">It’s not much fun to chat with a landscape!</p>
                    <div>
                        <input type="file" multiple={false} onChange={e=>{
                            let file = e.target.files ? e.target.files[0] : ''
                            let token = localStorage.getItem('access-token')
                            console.log(token,'asd');
                            
                            olxAxios.post('edit-profile_pic',
                                file,
                                {
                                    headers:{
                                        Authorization:
                                        token ? 
                                        'Bearer ' + token
                                        :
                                        null,
                                        'Content-Type':'multipart/form-data',
                                        accept:'application/json',
                                    }
                                })

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