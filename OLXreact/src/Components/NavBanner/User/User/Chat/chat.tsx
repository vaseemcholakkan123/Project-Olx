import { createElement } from "react"
import olxAxios from "../../../../../Config/AxiosConfig"


export const UserMessageElement = (msg:string,userID:Number|null,senderID:Number,sent_by_name:string)=>{
    
    let el = document.createElement('div')
    el.className = senderID == userID ? 'user-msg' : 'reciever-msg'

    let p1 = document.createElement('p')
    p1.className = 'name'

    let span1 = document.createElement('span')
    span1.className = 'time'
    span1.innerText = ' just now'

    p1.innerText = senderID == userID ? 'You' : sent_by_name
    p1.appendChild(span1)
    
    let p2 = document.createElement('p')
    p2.innerText = msg
    
    el.appendChild(p1)
    el.appendChild(p2)

    return el
    
}

export const getEndpoint = () =>{
    
    var location = window.location
    let wsStart = 'ws://'

    if (location.protocol == 'https') wsStart = 'wss://'

    let endpoint = wsStart + '10.4.2.62:8000' + location.pathname
    return endpoint
}



export const handleInvalidToken = () =>{
    const refreshToken = localStorage.getItem('refresh-token')
                if (refreshToken){
                    console.log('getting refreshhhh');
                    
                    olxAxios.post('/token/refresh/',{refresh:refreshToken})
                    .then(res=>{
                        console.log('then worked');
                        
                        localStorage.setItem('access-token',res.data.access)
                        olxAxios.defaults.headers['Authorization']='Bearer ' + res.data.access;
                        window.location.href = '/chat'
                        return 
                    }).catch(err=>{
                        alert('Session expired pls Login Again !')
                        localStorage.clear()
                        window.location.href = '/'
                    })
                    

                }
}