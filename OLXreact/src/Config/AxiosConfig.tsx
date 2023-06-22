import axios from "axios";
import { BASE_URL } from "./ConstAPI";


const olxAxios = axios.create({
    baseURL:BASE_URL,
    headers:{
        Authorization:
        localStorage.getItem('access-token') ? 
        'Bearer ' + localStorage.getItem('access-token')
        :
        null,
        'Content-Type':'application/json',
        accept:'application/json',
    }
    
})

olxAxios.interceptors.request.use(config => {

    let userData = localStorage.getItem('logged_user')

      if (!config.headers['Authorization'] && userData) {
        
        const token = localStorage.getItem('access-token');
        if (token) {
          config.headers.Authorization = "Bearer " + token;
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);    
    })

olxAxios.interceptors.response.use(resp=>resp,
    async function (err) {
        
        const originalRequest = err.config

        let userData = localStorage.getItem('logged_user')
        
        if (userData && 
            err.response.status === 401 &&
            err.response.data.code === 'token_not_valid' &&
            err.response.statusText === 'Unauthorized')
            {
                const refreshToken = localStorage.getItem('refresh-token')
                if (refreshToken){
                    console.log('getting refreshhhh');
                    
                    olxAxios.post('/token/refresh/',{refresh:refreshToken})
                    .then(res=>{
                        console.log('then worked');
                        
                        localStorage.setItem('access-token',res.data.access)
                        olxAxios.defaults.headers['Authorization']='Bearer ' + res.data.access;
                        originalRequest.headers['Authorization']='Bearer ' + res.data.access;
                        return olxAxios(originalRequest)
                    }).catch(err=>{
                        alert('Session expired pls Login Again !')
                        localStorage.clear()
                        window.location.href = '/'
                    })
                    

                }
                    
                
            } 
        return Promise.reject(err);
        
    }
    )

export default olxAxios