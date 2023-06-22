import { useContext, useEffect, useRef, useState } from 'react'
import './chat.css'
import ChatOne from './ChatOne'
import olxAxios from '../../../../../Config/AxiosConfig'
import { useLocation, useNavigate } from 'react-router-dom'
import { userContext } from '../../UserApp'
import { toast } from 'react-toastify'

let defaultpic = 'https://statics.olx.in/external/base/img/avatar_1.png'
type ChatViewProps = {
    username? : string,
    profile? : string,
    id? : Number
}

const NotifyFailure = () => toast.warn("Login to Chat",
                    { position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    progressStyle:{color:'red'},
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light", })

function ChatView(props:ChatViewProps) {

    const [searching,Setsearching] = useState(false)
    const [SelectedFilter,SelectFilter] = useState('All')
    const [chatroom,selectChatroom] = useState< { username : string , profile : string ,id : Number} | null>(null)
    const [chatroomlist,setChatroomList] = useState<{ username : string , profile : string , id : Number }[]>([])
    const [chatSetted,SetLocationState] = useState(false)
    const { userData } = useContext(userContext)
    const url = useNavigate()

    let locationRouter = useLocation()

    useEffect(()=>{

        if (!localStorage.getItem('logged_user')) {
            url('/')
            NotifyFailure()
        }

        if (locationRouter.state && !chatSetted){
            setChatroomList([...chatroomlist,{'username' : locationRouter.state.username , 'profile' : locationRouter.state.profile , 'id' : locationRouter.state.id}])
            selectChatroom({'username' : locationRouter.state.username , 'profile' : locationRouter.state.profile , 'id' : locationRouter.state.id})
            SetLocationState(true)
        }
        
        
    },[chatroomlist])

    function handleSearch(searchInp:string){
        if (searchInp == '') {
            setChatroomList([]);
            return;
        }

        olxAxios.get(`search-user/${searchInp}`)
        .then(res=>{
            setChatroomList(res.data.Users)
            
        })
        .catch(err=>{
            console.log(err);
            
        })
    }
 
    return (
    <div className="user-home-container row no-p chat-container y-hidden">
        <div className={chatroom ? "col-12 col-md-9 col-lg-4 chat-height dynamic-chat border1-bottom overflow-y-hidden" : "col-12 col-md-9 col-lg-4 chat-height border1-bottom overflow-y-hidden"}>
            <div className="border1 p-3 bg-light d-flex a-center">
                {   searching ?

                <>
                    <input type="text" onKeyUp={e=>handleSearch(e.target.value)} className='chat-search bg-light' placeholder='Search for users' />
                    <svg onClick={()=>{Setsearching(false)}} xmlns="http://www.w3.org/2000/svg" className='ms-auto bi bi-x-lg' width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                    </svg>
                </>
                    :
                <>
                    <h3 className='fw-700'>INBOX</h3>
                    <svg onClick={()=>{Setsearching(true)}} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="ms-auto  bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                    </svg>
                </>

                }

            </div>

            <div className='p-1 users-holder border1 border-no-top' style={{'height':'91%'}}>
                <p className='ps-2 f-small'>Quick Filters</p>
                <div className="d-flex p-1 pb-2 ps-3 pe-3">
                    <p onClick={()=>{SelectFilter('All')}}  className={SelectedFilter == 'All' ? 'chat-filter active-item' : 'chat-filter' } >All</p>
                    <p onClick={()=>{SelectFilter('Meeting')}} className={SelectedFilter == 'Meeting' ? 'chat-filter active-item' : 'chat-filter'} >Meeting</p>
                    <p onClick={()=>{SelectFilter('Unread')}} className={SelectedFilter == 'Unread' ? 'chat-filter active-item' : 'chat-filter'} >Unread</p>
                    <p onClick={()=>{SelectFilter('Important')}} className={SelectedFilter == 'Important' ? 'chat-filter active-item' : 'chat-filter'} >Important</p>
                </div>

                {/* <div className='w-100 h-100 d-flex a-center mt-5 f-coloumn'>
                    <img width={125} height={125} src="https://statics.olx.in/external/base/img/emptyChat.png" alt="" />
                    <p>No chats basis current filter selection</p>
                </div> */}

                {
                    chatroomlist.map(user=>{
                        if (user.id == userData.user_id) return
                        return(
                            <div key={user.username} className="chat-room">
                                <div className={user.username == chatroom?.username ? "chat-room-reciever-holder active-chat" : "chat-room-reciever-holder"} onClick={e =>{ selectChatroom({ username : user.username , profile : user.profile , id : user.id}) } }>
                                    <img src={user.profile ? `http://127.0.1:8000${user.profile}` : defaultpic} className='rounded-circle' alt="profile" width={70} height={70} />
                                    <p className="chat-room-name">{user.username}</p>
                                </div>
                                
                            </div>
                        )
                    })
                }

            </div>

        </div>


        <div className={chatroom ? "col-12 col-md-9 col-lg-7 chat-height" : "col-9 col-lg-7 dynamic-chat chat-height"} >
            <div className={chatroom ? 'border1 border-no-left h-100 chatrooms-holder'  : 'border1 border-no-left p-3 h-100 chatrooms-holder'}>
               {chatroom ? 
               
               <ChatOne setChatroom={selectChatroom} username={chatroom.username} profile={chatroom.profile ? `http://127.0.1:8000${chatroom.profile}` : defaultpic} reciever_id={chatroom.id} />
               
               : 
               
               <div className='w-100 h-100 d-flex a-center j-center f-coloumn'>
                    <img width={200} height={200} className='mt-4' src="https://statics.olx.in/external/base/img/emptyChat.png" alt="" />
                    <p>Select a chat to view conversation</p>
                </div>

               }
            </div>

        </div>
    </div>
  )
}

export default ChatView