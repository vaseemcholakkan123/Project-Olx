import { useState, useEffect, useRef, useContext, BaseSyntheticEvent, Dispatch, SetStateAction } from 'react'
import './chat.css'
import { UserMessageElement, getEndpoint } from './chat'
import { userContext } from '../../UserApp'
import { NotifyServerFailure, updateTimes } from '../../Helper'
import olxAxios from '../../../../../Config/AxiosConfig'
import { BASE_IMAGE_URL } from '../../../../../Config/ConstAPI'


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
                <input ref={msg} name='vaaaal' type="text" placeholder='Enter your message' />
                <button className='send-btn' type='submit'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
                        <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/>
                    </svg>
                </button>
            </form>
        </footer>

    </div>
  )
}

export default ChatOne