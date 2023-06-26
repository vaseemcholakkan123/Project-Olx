import { useState,Dispatch,SetStateAction,useContext, useRef } from 'react'
import { userContext } from '../../UserApp';
import '../Nav-Cat.css'
import LoginPopper from './LoginPopper';
import UserOnNav from '../UserOnNav';
import { Link, useNavigate } from 'react-router-dom';
export const location = ['Kerala','Karnataka','Tamil Nadu']

type NavProps = {
    selectLocation : Dispatch<SetStateAction<string>>,
    setQuery : Dispatch<SetStateAction<string | null>>
}

function Navbar(props:NavProps) {
    const [navOpened,isOpened] = useState(false)
    const [currentLocation,setLocation] = useState(location[0])
    const {userData} = useContext(userContext)
    const url = useNavigate()
    const searchinp = useRef<HTMLInputElement>(null)

    function handleSearch(){
        
        if (searchinp.current?.value == '') return
        props.setQuery(searchinp.current?.value ? searchinp.current.value : null)
    }
    
  return (
    <div id='navbar'>

            <svg onClick={e=>{url('/'); window.location.reload()}} width="48" height="48" viewBox="0 0 1024 1024" data-aut-id="icon" className="" fillRule="evenodd">
                <path className="rui-4K4Y7" d="M661.333 256v512h-128v-512h128zM277.333 298.667c117.824 0 213.333 95.531 213.333 213.333s-95.509 213.333-213.333 213.333c-117.824 0-213.333-95.531-213.333-213.333s95.509-213.333 213.333-213.333zM794.496 384l37.504 37.504 37.504-37.504h90.496v90.496l-37.504 37.504 37.504 37.504v90.496h-90.496l-37.504-37.504-37.504 37.504h-90.496v-90.496l37.504-37.504-37.504-37.504v-90.496h90.496zM277.333 426.667c-47.061 0-85.333 38.293-85.333 85.333s38.272 85.333 85.333 85.333c47.061 0 85.333-38.293 85.333-85.333s-38.272-85.333-85.333-85.333z"></path>
            </svg>


        <div className="d-flex w-100 contain-nav">
            <div id="searchbar" onClick={()=>{isOpened(!navOpened)}}>

            <svg width="25" height="25" viewBox="0 0 1024 1024" data-aut-id="icon" fillRule="evenodd"><path className="rui-4K4Y7" d="M512 85.333c211.755 0 384 172.267 384 384 0 200.576-214.805 392.341-312.661 469.333v0h-142.656c-97.856-76.992-312.683-268.757-312.683-469.333 0-211.733 172.267-384 384-384zM512 170.667c-164.672 0-298.667 133.973-298.667 298.667 0 160.021 196.885 340.523 298.453 416.597 74.816-56.725 298.88-241.323 298.88-416.597 0-164.693-133.973-298.667-298.667-298.667zM512.006 298.66c94.101 0 170.667 76.565 170.667 170.667s-76.565 170.667-170.667 170.667c-94.101 0-170.667-76.565-170.667-170.667s76.565-170.667 170.667-170.667zM512.006 383.994c-47.061 0-85.333 38.272-85.333 85.333s38.272 85.333 85.333 85.333c47.061 0 85.333-38.272 85.333-85.333s-38.272-85.333-85.333-85.333z">
                </path>
            </svg>

            <input disabled className='locationinput' type="text" placeholder='Location' value={currentLocation} />

                          
                <svg onClick={()=>{isOpened(!false)}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={ navOpened ? 'up' : 'down'} viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
                </svg>


            <ul className='locationList' style={{display : navOpened ? 'block' : 'none'}}>
                
                {
                location.map(loc=>(
                <li key={loc} onClick={()=>{ setLocation(loc) ; isOpened(false); props.selectLocation(loc)}}>
                    <svg width="25" height="25" viewBox="0 0 1024 1024" data-aut-id="icon" className="" fillRule="evenodd"><path className="rui-4K4Y7" d="M512 85.333c211.755 0 384 172.267 384 384 0 200.576-214.805 392.341-312.661 469.333v0h-142.656c-97.856-76.992-312.683-268.757-312.683-469.333 0-211.733 172.267-384 384-384zM512 170.667c-164.672 0-298.667 133.973-298.667 298.667 0 160.021 196.885 340.523 298.453 416.597 74.816-56.725 298.88-241.323 298.88-416.597 0-164.693-133.973-298.667-298.667-298.667zM512.006 298.66c94.101 0 170.667 76.565 170.667 170.667s-76.565 170.667-170.667 170.667c-94.101 0-170.667-76.565-170.667-170.667s76.565-170.667 170.667-170.667zM512.006 383.994c-47.061 0-85.333 38.272-85.333 85.333s38.272 85.333 85.333 85.333c47.061 0 85.333-38.272 85.333-85.333s-38.272-85.333-85.333-85.333z">
                        </path>
                    </svg>
                    {loc}   
                </li>
                ))

                }
            
            </ul>


            </div>

            

            <div id="searchbar2" className='hide-lg'>
                <input type="text" ref={searchinp} placeholder='Find Cars, Mobile Phones and more...' />

                <div className="search-icon-div" onClick={e=>{url('/');handleSearch();}}>

                    <svg width="24px" height="24px" viewBox="0 0 1024 1024" data-aut-id="icon" className="" fillRule="evenodd"><path className="rui-2lrc2" d="M448 725.333c-152.917 0-277.333-124.416-277.333-277.333s124.416-277.333 277.333-277.333c152.917 0 277.333 124.416 277.333 277.333s-124.416 277.333-277.333 277.333v0zM884.437 824.107v0.021l-151.915-151.936c48.768-61.781 78.144-139.541 78.144-224.192 0-199.979-162.688-362.667-362.667-362.667s-362.667 162.688-362.667 362.667c0 199.979 162.688 362.667 362.667 362.667 84.629 0 162.411-29.376 224.171-78.144l206.144 206.144h60.352v-60.331l-54.229-54.229z">
                    </path>
                    </svg>

                </div>

            </div>

            <p id='lang-text' className='hide-lg'>ENGLISH</p>
            
            {
                
                !localStorage.getItem('logged_user') ? 
                
                <LoginPopper/>

                :
                <>
                    <Link className='m-0 me-2 login-text hide-lg' to={'/chat'}>
                        <svg width="24px" className='chat-ico' height="24px" viewBox="0 0 1024 1024" data-aut-id="icon" fillRule="evenodd"><path className="rui-w4DG7" d="M469.333 171.119c-164.693 0-298.667 134.684-298.667 300.25v359.529l108.907-54.753 19.093-4.525h256c164.693 0 298.667-134.684 298.667-300.25s-133.973-300.25-298.667-300.25h-85.333zM147.093 938.667l-61.76-38.368v-428.929c0-212.856 172.267-386.036 384-386.036h85.333c211.733 0 384 173.18 384 386.036s-172.267 386.036-384 386.036h-245.931l-161.643 81.261z"></path></svg>
                    </Link>

                    <Link className='m-0 me-1 login-text hide-lg' to={'/Post-Ad'}>
                        Sell
                    </Link>
                    <UserOnNav />
                </>

            }
        

        </div>

    </div>
  )
}

export default Navbar