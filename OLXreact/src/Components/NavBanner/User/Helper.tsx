import { toast } from 'react-toastify'
import olxAxios from '../../../Config/AxiosConfig'
import $ from 'jquery'


export const NotifyProfileSuccess = () => toast.success("Profile Updated",
                          { position: "top-right",
                          autoClose: 1000,
                          hideProgressBar: true,
                          closeOnClick: true,
                          progressStyle:{color:'red'},
                          pauseOnHover: false,
                          draggable: true,
                          progress: undefined,
                          theme: "light", })
export const NotifyProfileError = () => toast.warn("Server error,Try again later",
                          { position: "top-right",
                          autoClose: 1000,
                          hideProgressBar: true,
                          closeOnClick: true,
                          progressStyle:{color:'red'},
                          pauseOnHover: false,
                          draggable: true,
                          progress: undefined,
                          theme: "light", })

const NotifyFailure = () => toast.warn("Pls Login First",
                    { position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    progressStyle:{color:'red'},
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light", })

                
export const NotifyServerFailure = () => toast.warn("Unknown Error occured",
                    { position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    progressStyle:{color:'red'},
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light", })

const NotifySuccess = () => toast.success("Added to Wishlist",
                          { position: "top-right",
                          autoClose: 1000,
                          hideProgressBar: true,
                          closeOnClick: true,
                          progressStyle:{color:'red'},
                          pauseOnHover: false,
                          draggable: true,
                          progress: undefined,
                          theme: "light", })

const NotifyWishlistDeletion = () => toast.success("Removed from Wishlist",
                          { position: "top-right",
                          autoClose: 1000,
                          hideProgressBar: true,
                          closeOnClick: true,
                          progressStyle:{color:'red'},
                          pauseOnHover: false,
                          draggable: true,
                          progress: undefined,
                          theme: "light", })

export const NotifyUpdateSuccess = () => toast.success("Ad Updated Successfully !",
                                { position: "top-center",
                                autoClose: 3000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                progressStyle:{color:'red'},
                                pauseOnHover: false,
                                draggable: true,
                                progress: undefined,
                                theme: "light", })

export const NotifyLoginFailure = () => toast.warn("Login to Chat",
                                { position: "top-center",
                                autoClose: 3000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                progressStyle:{color:'red'},
                                pauseOnHover: false,
                                draggable: true,
                                progress: undefined,
                                theme: "light", })


export async function handleWishlist(id:number|null,category:string|null){
    if(!localStorage.getItem('logged_user')){
        NotifyFailure()
        return Promise.reject()
    }
    if(!id || !category) return

    try{
        const result = await olxAxios.get(`wishlist_ad/${category}/${id}`)
       if(result) NotifySuccess()
    }
    catch{
        NotifyFailure()
    }

}
export async function handleWishlistDelete(id:number|null,category:string|null){
    
    if(!localStorage.getItem('logged_user_id')) return NotifyFailure()
    if(!id || !category) return

    try{
        const result=  await olxAxios.get(`remove_wishlist_ad/${category}/${id}`)
        if(result) NotifyWishlistDeletion()

      } catch(err){
        console.log(err);
        
        NotifyFailure()
      }

    }


  export const NotifySessionExpired = () => toast.warn("Session has expired login again !",
    { position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    progressStyle:{color:'red'},
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light", })





function updateTimeSince(timeString : string) {
      let time;
      const then = new Date(timeString);
      const now = new Date();
      const secondsPast = (now.getTime() - then.getTime()) / 1000;
      const minutesPast = Math.floor(secondsPast / 60);
      const hoursPast = Math.floor(minutesPast / 60);
      const daysPast = Math.floor(hoursPast / 24);
      

      if (daysPast > 6) {
          const year = then.getFullYear() === now.getFullYear() ? '' : ' ' + then.getFullYear();
          const month = then.toLocaleString('default', {month: 'short'});
          const day = then.getDate();
          time = then.toLocaleTimeString([], {hour: 'numeric', minute: '2-digit'});
          return month + ' ' + day + year + ', ' + time;
      } else if (daysPast > 0) {
          const days = daysPast === 1 ? "1 day" : daysPast + " days";
          time = then.toLocaleTimeString([], {hour: 'numeric', minute: '2-digit'});
          return days + " ago, " + time;
      } else if (hoursPast > 0) {
          return hoursPast + " hours ago";
      } else if (minutesPast > 0) {
          return minutesPast + " minutes ago";
      } else {
          return "just now";
      }
  }





export const updateTimes = ()=>{
      $('.time').each(function () {

          const timeString = $(this).data('time');
          const timeSince = updateTimeSince(timeString);
          $(this).text(timeSince);
      });
    }

