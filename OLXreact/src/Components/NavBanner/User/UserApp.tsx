import React,{ContextType, Dispatch, SetStateAction, useEffect,useState} from 'react'
import Navbar from './NavItems/Strict Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'

import HomePage from './Home-User/HomePage'
import EditProfile from './User/Edit-Profile'
import SellProduct from './Products/Sell-Product'
import DetailPage from './Products/DetailPage'
import ChatView from './User/Chat/ChatView'
import ProfilePage from './User/Profile/ProfilePage'
import CategoryPanel from './Home-User/Category/CategoryPanel'
import olxAxios from '../../../Config/AxiosConfig'

export type user = {
  username: string | null,
  user_id : number | null,
  email : string | null,
  profile : string | null | File
}

type contextType = {
  userData : {
    username: string | null,
    user_id : number | null,
    email : string | null,
    profile : string | null | File
  },
  setUserData : Dispatch<SetStateAction<user>> | null,
  setSearchQuery : Dispatch<SetStateAction<string | null>>|null
}

export const userContext = React.createContext<contextType>({
    userData:{username:null,user_id:null,email:null,profile:null},
    setUserData:null,
    setSearchQuery:null,
  })
export type detailType = {
    Ad_id : null|Number,
    Ad_category : null|string
  }


function UserApp() {

  const [userData,setUserData] = useState<user>({username:null,user_id:null,email:null,profile:null})
  const [Ad,AdDetails] = useState<detailType>({Ad_id:null , Ad_category:null})
  const [location,selectLocation] = useState('Kerala')
  const [searchQuery,setSearchQuery] = useState<string | null>(null)

  useEffect(()=>{
    if (localStorage.getItem('logged_user_id')){

      olxAxios.get(`get-user/${localStorage.getItem('logged_user_id')}`)
      .then(res=>{
        localStorage.setItem('logged_user',JSON.stringify({
          "username":res.data.username,
          "profile":res.data.profile,
          "user_id":res.data.id,
          "email":res.data.email,
        }))

        setUserData(
          {
            username:res.data.username,
            user_id:res.data.id,
            email:res.data.email ? res.data.email : null,
            profile:res.data.profile ? res.data.profile : null
          })
      })
      .catch(err=>{}
      )

    }

  },[])

  return (
    
    <userContext.Provider value={{userData,setUserData,setSearchQuery}}>
      
        <Navbar setQuery={setSearchQuery} selectLocation={selectLocation}/>
        <Routes>
          <Route element={<HomePage location={location} query={searchQuery} ShowDetails={AdDetails} /> } path='*'/>
          <Route element={<CategoryPanel ShowDetails={AdDetails} />} path='/Category/*'/>
          <Route element={<DetailPage ad_id={Ad.Ad_id} category={Ad.Ad_category} />} path={`/details/*`} />
          <Route element={<ProfilePage ShowDetails={AdDetails} />} path='/profile/*'/>
          <Route element={<EditProfile />} path='/edit-profile'/> 
          <Route element={<SellProduct/>} path='/Post-Ad' />
          <Route element={<ChatView />} path='/chat' />
        </Routes>

    </userContext.Provider>

  )
}

export default UserApp