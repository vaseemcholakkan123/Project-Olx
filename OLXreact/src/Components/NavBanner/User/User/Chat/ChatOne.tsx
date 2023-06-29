import { useState, useEffect, useRef, useContext, BaseSyntheticEvent, Dispatch, SetStateAction } from 'react'
import './chat.css'
import { UserMessageElement, getEndpoint } from './chat'
import { userContext } from '../../UserApp'
import { NotifyServerFailure, updateTimes } from '../../Helper'
import olxAxios from '../../../../../Config/AxiosConfig'
import { BASE_IMAGE_URL } from '../../../../../Config/ConstAPI'
import { useLocation } from 'react-router-dom'


type ChatOneProps = {
    username:string,
    profile:string,
    reciever_id:Number,
    setChatroom:Dispatch<SetStateAction<{ username : string , profile : string ,id : Number} | null>>

}
type chatmessage = {
    message: string,
    user: {
        id:number,
        username:string,
    },
    timestamp:string
}

function ChatOne(props:ChatOneProps) {

    const msg = useRef<HTMLInputElement>(null)
    const chatBody = useRef<HTMLDivElement>(null)
    const current_user = useContext(userContext)
    const RouterState = useLocation()

    const [OLXSocket,setSocket] = useState<WebSocket | null>(null)
    
    useEffect(()=>{
        if(OLXSocket) OLXSocket.close()
        
        olxAxios.get(`get-thread-messages/${props.reciever_id}`)
        .then(res=>{
            if (res.data == 'empty') return
            let lis:chatmessage[] = [...res.data]

            lis.map(msg=>{
                chatBody.current?.appendChild(
                    UserMessageElement(
                        msg.message,
                        current_user.userData.user_id,
                        msg.user.id,
                        msg.user.username,
                        msg.timestamp,
                        
                        ))
                        updateTimes()
            })
            
        })
        .catch(err=>{
            console.log(err.response.data);
            
        })

        const socket = new WebSocket(getEndpoint() + `?token=${localStorage.getItem('access-token')}`)
        
        socket.onopen = async event => {
            setSocket(socket)
            console.log('connected');

            
        }
        
        socket.onerror = async event => {

            console.log(event);
            
            NotifyServerFailure()
        
            
        }
        
        socket.onmessage = async event => {
            try {
                let data = JSON.parse(event.data)
                if(data.sent_by != props.reciever_id && data.sent_by != localStorage.getItem('logged_user_id')) return
                
                chatBody.current?.appendChild(
                UserMessageElement(
                    data.message,
                    current_user.userData.user_id,
                    data.sent_by,
                    data.sent_by_name,
                    data.timestamp
                    ))
                    updateTimes()
                chatBody.current ? chatBody.current.scrollTop = chatBody.current.scrollHeight : null
            } catch (error) {
                return
            }
              
        }
        const timerupdate = setInterval(() => {
            updateTimes()
        }, 1000);
        
        return (()=>{
            clearInterval(timerupdate)
            chatBody.current? chatBody.current.innerHTML = '' : ''
        })
        
    },[props.reciever_id])
    
    function SendMessage(message:string){
        if (message =='') return

        OLXSocket?.send(JSON.stringify({
            'message':message,
            'sent_by':current_user.userData.user_id,
            'reciever': props.reciever_id
        }))
    }
    

    const handleSubmit = (e:BaseSyntheticEvent)=>{
        e.preventDefault();
        let message = e.target[0].value
        SendMessage(message)
        msg.current?.value ? msg.current.value = '' : null
    }



  return (

    <div className='olx-messenger'>
        <header className='chat-one-header bg-light border1-bottom'> 
            <svg onClick={e=>props.setChatroom(null)} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-left chat-one-back d-none" viewBox="0 0 16 16"><path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"></path></svg>
            <img src={ props.profile} alt="reciever_profile" className='rounded-circle' width={50} height={50} />
            <p className="username-chat-header">{props.username}</p>
        </header>

        <div ref={chatBody} className='chat-body'>
            {/*             
            <div className="user-msg">
                <p className='name'>You <span className='time'>just now</span></p>
                <p >Hi</p>
            </div>

            <div className="reciever-msg">
                <p className='name'>{props.username} <span className='time'>just now</span></p>
                <p >Halo</p>
            </div> */}

        </div>

        <footer className='bg-light border1-up'>
            <form onSubmit={handleSubmit}>
                <input ref={msg} name='vaaaal' className='messenger' type="text" placeholder='Enter your message' 
                    value={RouterState.state.product ? RouterState.state.id == props.reciever_id ?  `Hi sir I would like to buy this product :${RouterState.state.product},Shall we talk?` : '' : ''}
                />
                <button className='send-btn' type='submit'>
                    Send 

                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send-fill" viewBox="0 0 16 16">
                        <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"/>
                    </svg>

                </button>
            </form>
        </footer>

    </div>
  )
}

export default ChatOne