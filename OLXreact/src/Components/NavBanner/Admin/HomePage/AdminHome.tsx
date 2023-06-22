import { useEffect,useRef,useState } from 'react'
import './Admin-home.css'
import olxAxios from '../../../../Config/AxiosConfig'
const dummy_user=[{'username':'vaseem','email':'vaseememail'},{'username':'murshid','email':'murshiemail'},{'username':'salih','email':'salihemail'},{'username':'vishnu','email':'vishnuemail'}]

type userfetch = {
    username : string,
    email: string,
    profile: string | File | null,
    id:number | null
}

type userCreationFormType = {
    username : string,
    password1 : string,
    password2 : string
}



function AdminHome() {

    const [users,setUsers] = useState<userfetch[]>([])
    const [userlist,setUserList] = useState<userfetch[]>([])
    const [userUpdateForm,setForm] = useState<userfetch>({username:'',email:'',id:null,profile:null})
    const [updateErr,appendERR] = useState('')
    const [CreateErr,appendCreationERR] = useState('')
    const [hardReload,makereload] = useState(false)
    const createModal = useRef<HTMLButtonElement>(null)
    const [userCreationForm,setCreationForm] = useState<userCreationFormType>({username:'',password1:'',password2:''})

    const [modalState, setModalState] = useState(false)

    function handleSubmit(btn:EventTarget){
        const url = `/user/${userUpdateForm.id}`
        console.log(btn);
        
        if(!userUpdateForm.username) return appendERR('Enter a Username')
        if (!userUpdateForm.email) return appendERR('Enter an E-mail')
        olxAxios.put(url,userUpdateForm,{headers:{'Content-Type':'multipart/form-data'}})
        .then(res=>{ 
            alert('User Updated')
            setModalState(false)
        })
        .catch(res=>{
            
            res.response.data.email ? appendERR(res.response.data.email) :
            alert(`Error in Server`)
        })
    }

    function handleDelete(id:number|null){
    
        let url = `user/${id}`
        olxAxios.delete(url).then(res=>{
            alert('User Deleted Successfully !')
            makereload(!hardReload)
        }).catch(res=>{
            console.log(res);  
        })

    }

    function data_is_valid(form:userCreationFormType){
        if (form.username.length <= 5) {
            appendCreationERR('Username should contain atleat 6 letters')
            return false;
        }
        else if (form.password1.length <= 7){
            appendCreationERR('Password must contain 8 letters')
        }
        else if (form.password1 != form.password2){
            appendCreationERR("Passwords don't match")
            return false
        }
        else return true
    }

    function handleCreation(){
        if (!data_is_valid(userCreationForm)) return;
        olxAxios.post('create-user/',
                            {
                                username:userCreationForm.username,
                                password:userCreationForm.password1
                            
                            })
                            .then(res=>{
                                alert('User Created Successfully')
                                createModal.current?.click()
                                makereload(!hardReload)
                            })
                            .catch(res=>{
                        
                                res.response.data.username ? appendCreationERR(res.response.data.username) : 
                                alert(res.data)
                            })
    }

    useEffect(()=>{

        olxAxios.get('get-users').then(res=>{
            setUsers(res.data)
            setUserList(res.data)
        }).catch(resErr=>{
            console.log('Error fetching Data')
            console.log(resErr);
            
        })
    },[hardReload])

    function handleSearch(query:string){

        setUserList(users.filter(user=>{
            
            if(user.username.toLowerCase().includes(query.toLowerCase()) || user.email.toLowerCase().includes(query.toLowerCase())){
               return user
            }
        }))
        
    }

  return (
    <div className='container-fluid'>
        <div className="admin-header">
            <svg width="48" height="48" viewBox="0 0 1024 1024" data-aut-id="icon" className="" fillRule="evenodd">
                <path className="rui-4K4Y7" d="M661.333 256v512h-128v-512h128zM277.333 298.667c117.824 0 213.333 95.531 213.333 213.333s-95.509 213.333-213.333 213.333c-117.824 0-213.333-95.531-213.333-213.333s95.509-213.333 213.333-213.333zM794.496 384l37.504 37.504 37.504-37.504h90.496v90.496l-37.504 37.504 37.504 37.504v90.496h-90.496l-37.504-37.504-37.504 37.504h-90.496v-90.496l37.504-37.504-37.504-37.504v-90.496h90.496zM277.333 426.667c-47.061 0-85.333 38.293-85.333 85.333s38.272 85.333 85.333 85.333c47.061 0 85.333-38.293 85.333-85.333s-38.272-85.333-85.333-85.333z">
                </path>
            </svg>
            <h3 className='ms-2'>Admin Panel</h3>
        </div>

        <div className='m-auto'>
            <h3 className='m-2 text-center'># Users</h3>
            <div className="d-flex search">
                <input className='m-2' onChange={(e)=>{handleSearch(e.target.value)}} type="text" placeholder='search username' />
                <button data-bs-toggle="modal" data-bs-target="#ModalAddUser" className='form-btn2 m-2'>Add User</button>
            </div>
        </div>
        <div className='main-body'>

            <div className='table-div'>

                <div className="modal fade modal-def" id="ModalAddUser" tabIndex={-1} aria-labelledby="ModalLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="ModalLabel">Create User</h5>
                                                    <button type="button" ref={createModal} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body admin-edit">
                                                    <p className="err">{CreateErr ? CreateErr : null}</p>

                                                    <input onChange={(e)=>{setCreationForm({...userCreationForm,username:e.target.value})}} type="text" placeholder='Username' />
                                                    <input onChange={(e)=>{setCreationForm({...userCreationForm,password1:e.target.value})}} type="password" placeholder='Password' />
                                                    <input onChange={(e)=>{setCreationForm({...userCreationForm,password2:e.target.value})}} type="password" placeholder='Confirm' />

                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="form-btn1" data-bs-dismiss="modal">Close</button>


                                                    <button type="button" onClick={()=>{handleCreation()}}  className="form-btn2">Create User</button>


                                                </div>
                                            </div>
                                        </div>
                                    </div>

                <table className="table table-bordered">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Profile</th>
                        <th scope='col'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {
                            
                            userlist.map((user,index)=>{
                                return (
                                    <>
                                    <tr key={user.username}>
                                        <th scope="row">{index+1}</th>
                                        <td>{user.username}</td>
                                        <td>{user.email ? user.email : 'Not Provided'}</td>
                                        <td>{user.profile ? <img width={50} height={50} src={`${user.profile}`} alt="Not Provided" /> : 'Not Provided'}</td>
                                        <td>
                                            <svg onClick={
                                                ()=>{
                                                    setForm({...userUpdateForm,username:user.username,id:user.id,profile:null,email:user.email})
                                                    setModalState(true)
                                                }}
                                                 data-bs-toggle="modal" data-bs-target="#EditModal" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="m-1 bi bi-pencil-square" viewBox="0 0 16 16">
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                            </svg>
                                            /
                                            <svg id={`${user.id}`} onClick={(e)=>{handleDelete(user.id)}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="m-1 bi bi-trash2-fill" viewBox="0 0 16 16">
                                                <path d="M2.037 3.225A.703.703 0 0 1 2 3c0-1.105 2.686-2 6-2s6 .895 6 2a.702.702 0 0 1-.037.225l-1.684 10.104A2 2 0 0 1 10.305 15H5.694a2 2 0 0 1-1.973-1.671L2.037 3.225zm9.89-.69C10.966 2.214 9.578 2 8 2c-1.58 0-2.968.215-3.926.534-.477.16-.795.327-.975.466.18.14.498.307.975.466C5.032 3.786 6.42 4 8 4s2.967-.215 3.926-.534c.477-.16.795-.327.975-.466-.18-.14-.498-.307-.975-.466z"/>
                                            </svg>
                                        </td>
                                    </tr>

                                    
                                    </>
                                )
                            })
                        }
                    </tbody>
                </table>


                <div className={modalState ? 'modal fade modal-def show' : 'modal fade modal-def'} id="EditModal" tabIndex={-1} aria-labelledby="ModalLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="ModalLabel">Edit User</h5>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body admin-edit">
                                                    <p className="err">{updateErr ? updateErr : null}</p>

                                                    {/* inputs  */}
                                                    <input onChange={(e)=>{setForm({...userUpdateForm,username:e.target.value,id:userUpdateForm.id})}} type="text" placeholder='Username' defaultValue={userUpdateForm.username} />
                                                    <input onChange={(e)=>{setForm({...userUpdateForm,email:e.target.value})}} type="email" placeholder='E-mail' defaultValue={userUpdateForm.email} />
                                                    <input onChange={(e)=>{setForm({...userUpdateForm,profile:e.target.files ? e.target.files[0] : userUpdateForm.profile})}} style={{'display':'none'}} type="file" name="" id="prof" />
                                                    <label htmlFor="prof" className='form-btn2 prof'>Profile Image</label>


                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="form-btn1" data-bs-dismiss="modal">Close</button>


                                                    <button type="button" onClick={(e)=>{handleSubmit(e.target)}}  className="form-btn2">Save changes</button>


                                                </div>
                                            </div>
                                        </div>
                                    </div>


            </div>
        </div>
    </div>
  )
}

export default AdminHome