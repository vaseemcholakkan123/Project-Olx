import { createElement } from "react"
import olxAxios from "../../../../../Config/AxiosConfig"


function getMonth(month_num:string){
    let month = 'Jan '

    if (month_num === '02') month = 'Feb '
    if (month_num === '03') month = 'March '
    if (month_num === '04') month = 'Apr '
    if (month_num === '05') month = 'May '
    if (month_num === '06') month = 'Jun '
    if (month_num === '07') month = 'July '
    if (month_num === '08') month = 'Aug '
    if (month_num === '09') month = 'Sep '
    if (month_num === '10') month = 'Oct '
    if (month_num === '11') month = 'Nov '
    if (month_num === '12') month = 'Dec '
    
    return month
}


export const UserMessageElement = (msg:string,userID:Number|null,senderID:Number,sent_by_name:string,datetime:string)=>{

    let date,time;
    
    let hours = Number(datetime.split('T')[1].split('.')[0].split(':')[0])
    let minute = datetime.split('T')[1].split('.')[0].split(':')[1]

    var ampm = hours >= 12 ? ' pm' : ' am';
    
    hours = hours % 12;
    
    hours = hours ? hours : 12;

    date = datetime.split('T')[0].split('-')[2]

    time = String(hours) + ':' + minute + ampm


    const dateobj = new Date();

    let currentMonth = String(dateobj.getMonth()+1).padStart(2,"0");
    

    let appenddatetime = getMonth(currentMonth) + date + ',' + time
    
    
    let el = document.createElement('div')
    el.className = senderID == userID ? 'user-msg' : 'reciever-msg'

    let p1 = document.createElement('p')
    p1.className = 'name'

    let span1 = document.createElement('span')
    span1.className = 'time'
    span1.dataset.time = datetime 
    span1.innerText = appenddatetime

    p1.innerText = senderID == userID ? 'You ' : sent_by_name + ' '
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

    // let endpoint = wsStart + '127.0.0.1:8000' + location.pathname
    let endpoint = wsStart + 'moddroid.tk/olx-api' + location.pathname
    console.log(endpoint,'llllllllll');
    
    return endpoint
}



