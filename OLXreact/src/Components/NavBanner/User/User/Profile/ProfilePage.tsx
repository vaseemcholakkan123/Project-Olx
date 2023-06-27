import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
import './profile.css'
import { detailType, userContext } from '../../UserApp'
import { useLocation, useNavigate } from 'react-router-dom'
import olxAxios from '../../../../../Config/AxiosConfig'
import { ad } from '../../Home-User/HomePage'
import CatorBread from '../../NavItems/CatorBread'
import { handleWishlist, handleWishlistDelete } from '../../Helper'
import NoData from '../../NoData'
import { BASE_IMAGE_URL } from '../../../../../Config/ConstAPI'



function ProfilePage(props:{ShowDetails:Dispatch<SetStateAction<detailType>>}) {

    let {userData} = useContext(userContext)
    let RouterState = useLocation()
    const [userdata,setUserData] = useState({username:null,id:null,email:null,profile:null,date_joined:''})
    const [userPosts,setUserPosts] = useState<ad[]>([])
    const url = useNavigate()
    const [active_content,setActiveContent] = useState('ads')

    useEffect(()=>{
        let user_id;
        if(!RouterState.state.user_id){
            user_id = userData.user_id 
        }else user_id = RouterState.state.user_id


        olxAxios.get(`get-user/${user_id}`).then(res=>{
            if (!res.data.profile) res.data.profile = 'https://statics.olx.in/external/base/img/avatar_1.png'
            setUserData(res.data)
        })
        .catch(err=>{
            console.log(err);
            
        })
        let content_url = active_content == 'wishlist' ?`get-user-${active_content}` : `get-user-${active_content}/${user_id}`
        olxAxios.get(content_url).then(res=>{

            if (res.data.Ads){
                let lis: Array<ad> = [...res.data.Ads]
                setUserPosts(lis)
            }   
            else{
                let lis: Array<ad> = [...res.data.Cars , ...res.data.Scooter , ...res.data.Mobile , ...res.data.Accessory , ...res.data.Property]
                setUserPosts(lis)

            }        

            
        }).catch(err=>{
            console.log(err.response.data);
            
        })

    },[active_content])

  return (
    <>
    <CatorBread noBanner={true} />
    <div className='profile-container row'>
        <div className="user-holder col-12 col-md-3">
            <img className='rounded-circle mb-2 ms-0' src={userdata.profile ? BASE_IMAGE_URL + userdata.profile : 'https://statics.olx.in/external/base/img/avatar_1.png'} width={90} height={90} alt="" />
            <h4>{userdata.username}</h4>

            <div className="d-flex a-center">
                <svg width="16px" height="16px" viewBox="0 0 1024 1024" data-aut-id="members" fillRule="evenodd"><path className="rui-w4DG7" d="M341.579 85.3359V127.981H683.211V85.3359H768.619V127.981H895.963L938.667 170.669V895.981L895.963 938.669H128.038L85.3335 895.981V170.669L128.038 127.981H256.15V85.3359H341.579ZM853.259 426.648H170.742V853.315H853.259V426.648ZM320.221 511.988C355.601 511.988 384.277 540.66 384.277 575.988C384.277 611.337 355.601 639.988 320.221 639.988C284.84 639.988 256.165 611.337 256.165 575.988C256.165 540.66 284.84 511.988 320.221 511.988ZM256.15 213.315H170.742V341.336H853.259V213.315H768.619V255.981L725.915 298.648L683.211 255.981V213.315H341.579V255.981L298.875 298.648L256.15 255.981V213.315Z"></path></svg>
                <p className='f-small ms-2'> Member since {userdata.date_joined.split('T')[0]}</p>
            </div>

            {
                userdata.email ? 
                    <>
                        <p className='f-small mt-2'>User verified with</p>
                        <svg className='ms-2' width="16px" height="16px" viewBox="0 0 1024 1024" data-aut-id="icon" fillRule="evenodd"><path className="rui-w4DG7" d="M880.485 764.516C880.485 753.636 878.934 743.163 876.024 733.097C868.073 704.569 849.455 680.54 824.63 665.412C806.982 654.746 786.23 648.346 764.121 648.346C699.927 648.346 647.758 700.302 647.758 764.516C647.758 786.217 653.964 806.794 664.63 824.229C679.564 849.054 703.612 867.866 732.121 876.031C742.206 878.92 753.067 880.666 764.121 880.666C828.315 880.666 880.485 828.516 880.485 764.516V764.516ZM589.576 764.515C589.576 668.302 667.733 590.164 764.121 590.164C793.794 590.164 821.915 597.708 846.352 610.702C855.855 579.09 861.091 545.926 861.091 511.211C861.091 319.211 704.388 162.722 512 162.722C319.612 162.722 162.909 319.211 162.909 511.211C162.909 703.425 319.612 859.72 512 859.72C545.94 859.72 578.715 854.678 609.746 845.582C596.946 821.34 589.576 793.606 589.576 764.515V764.515ZM908.994 667.332C927.612 694.872 938.667 728.443 938.667 764.515C938.667 860.709 860.509 938.654 764.121 938.654C727.661 938.654 693.915 927.405 665.794 908.419C618.085 926.823 566.303 937.102 512 937.102C276.752 937.102 85.3335 746.091 85.3335 511.211C85.3335 276.351 276.752 85.3203 512 85.3203C747.249 85.3203 938.667 276.351 938.667 511.211C938.667 566.29 928 618.848 908.994 667.332V667.332ZM744.727 781.369L738.909 775.745L708.267 745.122H667.152V786.023L724.17 843.061H765.285L861.091 747.429V706.334H819.976L744.727 781.369ZM667.152 500.932C667.152 602.557 599.079 674.702 496.097 674.702C397.77 674.702 318.061 595.206 318.061 497.073C318.061 398.746 397.77 319.211 496.097 319.211C544.194 319.211 584.533 336.86 615.37 365.582L565.14 415.618V415.425C546.327 397.776 522.667 388.642 496.097 388.642C437.333 388.642 389.624 438.115 389.624 496.86C389.624 555.449 437.333 605.078 496.097 605.078C549.43 605.078 585.697 574.843 593.261 532.952H496.097V463.696H663.661C665.988 475.546 667.152 487.938 667.152 500.932V500.932Z"></path></svg>
                    </>
                :
                <p className="f-small mt-2">User not verified</p>
            }


            {
                userdata.id != userData.user_id ? 
                // <button className="w-100 mt-2 login-form-btn btn-2">
                
                //     <svg width="22px" height="22px" viewBox="0 0 1024 1024" data-aut-id="icon" className="me-2" fillRule="evenodd"><path className="rui-lquEm rui-B79vz" d="M127.979 106.667L85.333 149.334V874.686L127.979 917.354L170.647 874.686V618.679H579.681L622.349 661.347H895.448L938.666 618.679V190.187L895.448 149.334H572.343L529.675 106.667H127.979ZM170.647 192.002H494.325L536.992 234.67H853.352V576.012H657.678L615.01 533.344H170.647V192.002Z"></path></svg>
    
                //     Report User
                // </button>
                null

                :
            <button onClick={()=>{url('/edit-profile')}} className='login-form-btn keep-color login-form-btn popper-btn'>Edit Profile</button>
                
            }

        </div>

        <div className="user-posts-holder col-12 col-md-9">
            <div className="ads-container row gy-3 gx-2">
                {
                    userData.user_id == userdata.id ?
                        <div className="d-flex text-secondary c-pointer">
                            <p onClick={e=>{setActiveContent('ads')}} className={active_content == 'ads' ? 'active-content ms-2' : 'ms-2'}>My Ads</p>
                            <p onClick={(e=>{setActiveContent('wishlist')})} className={active_content == 'wishlist' ? 'active-content ms-2' : 'ms-2'}>Wishlist</p>
                        </div>
                    :
                    <div className="d-flex text-secondary c-pointer">
                            <p onClick={e=>{setActiveContent('ads')}} className={active_content == 'ads' ? 'active-content ms-2' : 'ms-2'}>Posted Ads</p>
                    </div>
                }
                {
                userPosts.map(item=>{
                    return(
                        <div key={item.title} className="Ad-card col-12 col-sm-6 col-lg-5 col-xl-4" >
                            <div className="Ad-image-container">

                                {
                                    
                                    userData.user_id == item.posted_user?.id ?
                                    
                                    <button type="button" onClick={e=>url('/Post-Ad',{state:{'editAd' : item.id,'category':item.category}})} className="wish-icon rui-3a8k1 _29mJd favoriteOff" role="button" tabIndex={0} data-aut-id="btnFav" title="Favourite">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                            </svg>
                                    </button>
                                        
                                    :

                                
                                
                                    item.is_wishlisted ?
                                    
                                        <button onClick={e=>{
                                        handleWishlistDelete(item.id,item.category).then(r=>{
                                            if (userData.user_id == userdata.id){
                                                setUserPosts(userPosts.filter(ad=>{
                                                    if (ad.id != item.id) return ad
                                                }))
                                            }else{
                                                setUserPosts(userPosts.filter(ad=>{
                                                    if (ad.id == item.id) ad.is_wishlisted = false
                                                    return ad
                                                }))
                                            }
                                        })
                                        
                                        }} type="button" className="wish-icon rui-3a8k1 _29mJd favoriteOff" role="button" tabIndex={0} data-aut-id="btnFav" title="Favourite">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="22px" height="22" fill="currentColor" className="bi bi-suit-heart-fill" viewBox="0 0 16 16">
                                            <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z"/>
                                        </svg>
                                        </button>
                                        :
                                        <button onClick={e=>{
                                            handleWishlist(item.id,item.category).then(r=>{
                                                setUserPosts(userPosts.filter(ad=>{
                                                    if (ad.id == item.id) ad.is_wishlisted = true 
                                                    return ad
                                                }))
                                            })
                                            }} type="button" className="wish-icon rui-3a8k1 _29mJd favoriteOff" role="button" tabIndex={0} data-aut-id="btnFav" title="Favourite">
                                        <svg width="24px" height="24px" viewBox="0 0 1024 1024" data-aut-id="icon" className="" fillRule="evenodd" fill='black'><path className="rui-w4DG7" d="M830.798 448.659l-318.798 389.915-317.828-388.693c-20.461-27.171-31.263-59.345-31.263-93.033 0-85.566 69.605-155.152 155.152-155.152 72.126 0 132.752 49.552 150.051 116.364h87.777c17.299-66.812 77.905-116.364 150.051-116.364 85.547 0 155.152 69.585 155.152 155.152 0 33.687-10.802 65.862-30.293 91.811zM705.939 124.121c-80.853 0-152.204 41.425-193.939 104.204-41.736-62.778-113.086-104.204-193.939-104.204-128.33 0-232.727 104.378-232.727 232.727 0 50.657 16.194 98.948 47.806 140.897l328.766 402.133h100.189l329.716-403.355c30.662-40.727 46.856-89.018 46.856-139.675 0-128.349-104.398-232.727-232.727-232.727z"></path>
                                        </svg>
                                        </button>
                                    
                                      

                                }

                                <img onClick={()=>{ url(`/details/${item.title}`); props.ShowDetails({Ad_category:item.category , Ad_id : item.id}); localStorage.setItem('detail-id',String(item.id));localStorage.setItem('detail-category',item.category) }} src={item.related_images[0].image} width={400} height={300} alt="asdsa  " />

                            </div>
                            <div onClick={()=>{ url(`/details/${item.title}`); props.ShowDetails({Ad_category:item.category , Ad_id : item.id});localStorage.setItem('detail-id',String(item.id));localStorage.setItem('detail-category',item.category) }} className="Ad-text-container">
                                <p className="price-text">
                                ₹ {item.price}
                                </p>
                                <p className="Ad-Text">{item.title}</p>
                                
                                <p className="Ad-text2">{item.ad_location}</p>
                                <p className="Ad-text3">{item.date_created}</p>
                            </div>
                        </div>)
                    })
                    }

                    {
                    userPosts.length == 0 ? 
                        <NoData />
                    :
                    null
                
                    }

            

            </div>
        </div>
    </div>
    </>
  )
}

export default ProfilePage