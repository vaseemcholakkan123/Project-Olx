import { useContext, useEffect, useState } from 'react'
import './detail.css'
import olxAxios from '../../../../Config/AxiosConfig'
import { ad } from '../Home-User/HomePage'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { userContext } from '../UserApp'
import CatorBread from '../NavItems/CatorBread'
import { NotifyDeletionSuccess, handleWishlist, handleWishlistDelete } from '../Helper'
import AdCard from '../Home-User/AdCard'
import { BASE_IMAGE_URL } from '../../../../Config/ConstAPI'

type detailpageProps = {
    ad_id : null|Number,
    category : null|string,
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


const NotifyFetchFailure = () => toast.warn("Fetching data failed",
                    { position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    progressStyle:{color:'red'},
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light", })
                    

function DetailPage(props:detailpageProps) {

    let url = useNavigate()

    const [DetailAd,SetAd] = useState<ad>()
    const [realtedAds,setrelatedAds] = useState<ad[]>([])


    useEffect(()=>{
        
        let category;
        let id;
        if (!props.ad_id && !props.category) {
            category = localStorage.getItem('detail-category')
            id = localStorage.getItem('detail-id')
            if(!category || !id) return url('/')
        }
        else {
            category = props.category
            id = props.ad_id
         }
        if (props.category == 'Properties') category = 'Property'


        olxAxios.get(`ads-${category}/${id}`)
        .then(res=>{
            SetAd(res.data)
        })
        .catch(err=>{
            
            NotifyFetchFailure()
        })

        olxAxios.get(`/ads-${category}/?sort_by=-date_created`)
        .then(res=>{
            let lis: Array<ad> = [...res.data]
            setrelatedAds(
                lis.filter(item=>item.title != DetailAd?.title)
            )
            
        })
        .catch(err=>{
            NotifyFetchFailure()
        })

    },[])


    function handleDelete(id?:Number){

        if (!id) return;
        let category;
        category = localStorage.getItem('detail-category')


        if (category == 'Properties') category = 'Property';
        
        olxAxios.delete(`ads-${category}/${id}/`).then(res=>{
            NotifyDeletionSuccess()
            
            url('/')
        })
        .catch(err=>{
            console.log(err);
            
        })

    }
    
    function handleMessage(){

        if (!localStorage.getItem('logged_user_id'))return NotifyFailure()

        url('/chat',
        {state:
            {'username':DetailAd?.posted_user?.username ,
             'profile' : DetailAd?.posted_user?.profile ,
              'id' : DetailAd?.posted_user?.id}});


    }

    const { userData } = useContext(userContext)



  return (
    <>
     <CatorBread context={{category:DetailAd?.category , title : DetailAd?.title}} />
    <div className='user-home-container mt-3 row'>
    
        <div className="d-flex col-12 col-lg-8">
            <div id="carouselExampleFade" className="carousel slide carousel-fade details-corousel" data-bs-ride="carousel">
                <div className="carousel-inner">
                    {
                        DetailAd?.related_images.map(item=>{
                            return (
                                <div key={item.image} className="carousel-item active">
                                    <img src={BASE_IMAGE_URL + item.image} className="d-block w-100" alt="..." />
                                </div>
                            )
                        })
                    }

                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

        </div>
        <div className="col-12 col-md-4 p-2 position-relative">
            <div className="border1 detail-container1">
                <div className="d-flex mt-2">
                    <h2 className='fw-700'> ₹ {DetailAd?.price}</h2>
                    {/* <svg width="24px" height="24px" viewBox="0 0 1024 1024" data-aut-id="icon" className="" fillRule="evenodd"><path className="rui-w4DG7" d="M768 853.333c-47.104 0-85.333-38.229-85.333-85.333s38.229-85.333 85.333-85.333c47.104 0 85.333 38.229 85.333 85.333s-38.229 85.333-85.333 85.333zM256 597.333c-47.104 0-85.333-38.229-85.333-85.333s38.229-85.333 85.333-85.333c47.104 0 85.333 38.229 85.333 85.333s-38.229 85.333-85.333 85.333zM768 170.667c47.104 0 85.333 38.229 85.333 85.333s-38.229 85.333-85.333 85.333c-47.104 0-85.333-38.229-85.333-85.333s38.229-85.333 85.333-85.333zM768 597.333c-52.437 0-98.688 24.107-130.005 61.312l-213.675-123.392c1.067-7.637 2.347-15.275 2.347-23.253 0-4.779-1.024-9.259-1.408-13.909l218.283-126.037c31.104 33.408 75.179 54.613 124.459 54.613 94.251 0 170.667-76.416 170.667-170.667s-76.416-170.667-170.667-170.667c-94.251 0-170.667 76.416-170.667 170.667 0 14.208 2.261 27.819 5.504 41.003l-205.867 118.912c-30.763-45.013-82.389-74.581-140.971-74.581-94.251 0-170.667 76.416-170.667 170.667s76.416 170.667 170.667 170.667c55.467 0 104.235-26.88 135.424-67.84l209.195 120.747c-2.048 10.539-3.285 21.333-3.285 32.427 0 94.251 76.416 170.667 170.667 170.667s170.667-76.416 170.667-170.667c0-94.251-76.416-170.667-170.667-170.667z"></path></svg> */}
            
                    {
                  DetailAd?.is_wishlisted ?
                  
                      <svg onClick={e=>{
                    handleWishlistDelete(DetailAd?.id,DetailAd?.category).then(()=>SetAd({...DetailAd,is_wishlisted:false}))
                    
                    }} xmlns="http://www.w3.org/2000/svg" width="22px" height="22" fill="currentColor" className="bi bi-suit-heart-fill" viewBox="0 0 16 16">
                        <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z"/>
                      </svg>
                    
                    :
                      <svg onClick={e=>{
                        handleWishlist(DetailAd ? DetailAd.id :  null,DetailAd? DetailAd.category : null).then(r=>{DetailAd ? SetAd({...DetailAd,is_wishlisted:false}) : null})
                        }} width="24px" height="24px" viewBox="0 0 1024 1024" data-aut-id="icon" className="" fillRule="evenodd" fill='black'><path className="rui-w4DG7" d="M830.798 448.659l-318.798 389.915-317.828-388.693c-20.461-27.171-31.263-59.345-31.263-93.033 0-85.566 69.605-155.152 155.152-155.152 72.126 0 132.752 49.552 150.051 116.364h87.777c17.299-66.812 77.905-116.364 150.051-116.364 85.547 0 155.152 69.585 155.152 155.152 0 33.687-10.802 65.862-30.293 91.811zM705.939 124.121c-80.853 0-152.204 41.425-193.939 104.204-41.736-62.778-113.086-104.204-193.939-104.204-128.33 0-232.727 104.378-232.727 232.727 0 50.657 16.194 98.948 47.806 140.897l328.766 402.133h100.189l329.716-403.355c30.662-40.727 46.856-89.018 46.856-139.675 0-128.349-104.398-232.727-232.727-232.727z"></path>
                      </svg>
                    
                }
                </div>
                <h5>{DetailAd?.title}</h5>

                <div className="d-flex">
                    <p className='f-inherit'>{DetailAd?.ad_location}</p>
                    <p className="date-ad">{DetailAd?.date_created}</p>
                </div>
            </div>

            <div className="border1 detail-container1 p-3 mt-2">
                <div className="d-flex a-center"  onClick={e=>url(`/profile/${DetailAd?.posted_user?.username}`,{state:{'user_id':DetailAd?.posted_user?.id}})}>
                    <img src={DetailAd?.posted_user?.profile ? DetailAd?.posted_user?.profile : 'https://statics.olx.in/external/base/img/avatar_1.png'} width={100} height={100} alt="" className="rounded-circle" />
                    <h3 className='ms-3'>{DetailAd?.posted_user?.username}</h3>
                    <svg width="18px" height="18px" viewBox="0 0 1024 1024" data-aut-id="icon" className="ms-auto" fillRule="evenodd"><path className="rui-w4DG7" d="M277.333 85.333v60.331l366.336 366.336-366.336 366.336v60.331h60.331l409.003-408.981v-35.307l-409.003-409.045z"></path></svg>
                </div>
                
                {
               
                DetailAd?.posted_user?.id == userData.user_id ? 

                <button className="w-100 mt-2 login-form-btn"  onClick={e=>{handleDelete(DetailAd?.id)}}>Remove Ad</button>

                    :

                    <button className="w-100 mt-2 login-form-btn" onClick={handleMessage}>Chat with seller</button>

                }


            </div>

            <div className="d-flex p-1">
                <h6 className='txt1 fw-700 ms-auto'>AD ID {DetailAd?.id}</h6>
                {/* {  DetailAd?.posted_user?.id != userData.user_id ? 

                    <h6 className='txt1 fw-700 ms-auto'>REPORT THIS AD</h6>
                    :
                    null
                } */}
            </div>

            {
                realtedAds.length > 0 ? 

                <div className='position-absolute rel-ads border1 w-100 d-none d-lg-block'>
                <h4 className='mb-2 p-2'>Related Ads</h4>

                {
                    realtedAds.map(item=>{
                        return(
                            <div className="Ad-card col-12 mb-3">
                                <div className="Ad-image-container" style={{width:'400px',height:'200px'}}>

                                    {
                                    item.is_wishlisted ?
                                    
                                        <button onClick={e=>{
                                        handleWishlistDelete(item.id,item.category).then(r=> {
                                            setrelatedAds(realtedAds.filter(ad=>{
                                                if (ad.id != item.id) return ad
                                            }))
                                        })
                                        
                                        }} type="button" className="wish-icon rui-3a8k1 _29mJd favoriteOff" role="button" tabIndex={0} data-aut-id="btnFav" title="Favourite">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="22px" height="22" fill="currentColor" className="bi bi-suit-heart-fill" viewBox="0 0 16 16">
                                            <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z"/>
                                        </svg>
                                        </button>
                                        :
                                        <button onClick={e=>{
                                            handleWishlist(item.id,item.category).then(r=>{
                                                setrelatedAds(realtedAds.filter(ad=>{
                                                    if (ad.id != item.id) ad.is_wishlisted = true
                                                    return ad
                                                }))
                                            })
                                            }} type="button" className="wish-icon rui-3a8k1 _29mJd favoriteOff" role="button" tabIndex={0} data-aut-id="btnFav" title="Favourite">
                                        <svg width="24px" height="24px" viewBox="0 0 1024 1024" data-aut-id="icon" className="" fillRule="evenodd" fill='black'><path className="rui-w4DG7" d="M830.798 448.659l-318.798 389.915-317.828-388.693c-20.461-27.171-31.263-59.345-31.263-93.033 0-85.566 69.605-155.152 155.152-155.152 72.126 0 132.752 49.552 150.051 116.364h87.777c17.299-66.812 77.905-116.364 150.051-116.364 85.547 0 155.152 69.585 155.152 155.152 0 33.687-10.802 65.862-30.293 91.811zM705.939 124.121c-80.853 0-152.204 41.425-193.939 104.204-41.736-62.778-113.086-104.204-193.939-104.204-128.33 0-232.727 104.378-232.727 232.727 0 50.657 16.194 98.948 47.806 140.897l328.766 402.133h100.189l329.716-403.355c30.662-40.727 46.856-89.018 46.856-139.675 0-128.349-104.398-232.727-232.727-232.727z"></path>
                                        </svg>
                                        </button>
                                    }
                                    
                                    <img src={ BASE_IMAGE_URL + item.related_images[0].image} width={400} height={300} onClick={()=>{ url(`/details/${item.title}`); SetAd(item);localStorage.setItem('detail-id',String(item.id));localStorage.setItem('detail-category',item.category) }} />

                                </div>
                                <div className="Ad-text-container" style={{width:'400px'}} onClick={()=>{ url(`/details/${item.title}`); SetAd(item); localStorage.setItem('detail-id',String(item.id));localStorage.setItem('detail-category',item.category) }}>
                                    <p className="price-text">
                                    ₹ {item.price}
                                    </p>
                                    <p className="Ad-Text">{item.title}</p>
                                    
                                    <p className="Ad-text2">{item.ad_location}</p>
                                    <p className="Ad-text3">{item.date_created}</p>
                                </div>
                            </div>
                        )
                    })
                }
            

            </div>

                :
                null
            }

        </div>


        <div className="mt-2 col-12 col-md-8 col-lg-12">
            <div className="border1 p-3 col-lg-8 col-12">
                <h3>Details</h3>

                <div className="m-2">
                    { DetailAd?.brand ? <p className='txt1'>Brand <span className='ms-4'>{DetailAd?.brand}</span> </p> : null}
                    { DetailAd?.model_name ? <p className='txt1'>Model Name <span className='ms-4'>{DetailAd?.model_name}</span> </p> : null}
                    { DetailAd?.km_driven ? <p className='txt1'>Kilometers Driven <span className='ms-4'>{DetailAd?.km_driven}</span> </p> : null}
                    { DetailAd?.transmission_type ? <p className='txt1'>Transmission Type <span className='ms-4'>{DetailAd?.transmission_type}</span> </p> : null}
                    { DetailAd?.fuel_type ? <p className='txt1'>Fuel Type <span className='ms-4'>{DetailAd?.fuel_type}</span> </p> : null}
                    { DetailAd?.no_of_owners ? <p className='txt1'>No. of Owners <span className='ms-4'>{DetailAd?.no_of_owners}</span> </p> : null}
                    { DetailAd?.year ? <p className='txt1'>Model Year <span className='ms-4'>{DetailAd?.year}</span> </p> : null}
                    { DetailAd?.accessory_type ? <p className='txt1'>Accessory Type <span className='ms-4'>{DetailAd?.accessory_type}</span> </p> : null}
                    { DetailAd?.battery_health ? <p className='txt1'>Battery Health <span className='ms-4'>{DetailAd?.battery_health + '%'}</span> </p> : null}
                    { DetailAd?.years_used ? <p className='txt1'>Years Used <span className='ms-4'>{DetailAd?.years_used + ' Yrs'}</span> </p> : null}
                    { DetailAd?.building_type ? <p className='txt1'>Building Type <span className='ms-4'>{DetailAd?.building_type}</span> </p> : null}
                    { DetailAd?.bedrooms ? <p className='txt1'>Total Bedrooms <span className='ms-4'>{DetailAd?.bedrooms}</span> </p> : null}
                    { DetailAd?.bathrooms ? <p className='txt1'>Total Bathrooms <span className='ms-4'>{DetailAd?.bathrooms}</span> </p> : null}

                </div>

                <div className="border-line"></div>

                <h3>Description</h3>

                <div className="m-2">
                    <p className="txt1">{DetailAd?.description}</p>
                </div>

            </div>

            {
                realtedAds.length > 0 ?

                <div className="col-12 d-lg-none position-absolute" style={{left:'1rem'}}>
                <h4 className='mb-2 p-2'>Related Ads</h4>

                <div className="row gx-1 gy-2">
                {
                    realtedAds.map(item=>{
                        return(
                            <div className="Ad-card col-sm-6 col-md-4 col-lg-4 col-xl-3">
                                <div className="Ad-image-container">

                                    {
                                    item.is_wishlisted ?
                                    
                                        <button onClick={e=>{
                                        handleWishlistDelete(item.id,item.category).then(r=> {
                                            setrelatedAds(realtedAds.filter(ad=>{
                                                if (ad.id != item.id) return ad
                                            }))
                                        })
                                        
                                        }} type="button" className="wish-icon rui-3a8k1 _29mJd favoriteOff" role="button" tabIndex={0} data-aut-id="btnFav" title="Favourite">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="22px" height="22" fill="currentColor" className="bi bi-suit-heart-fill" viewBox="0 0 16 16">
                                            <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z"/>
                                        </svg>
                                        </button>
                                        :
                                        <button onClick={e=>{
                                            handleWishlist(item.id,item.category).then(r=>{
                                                setrelatedAds(realtedAds.filter(ad=>{
                                                    if (ad.id != item.id) ad.is_wishlisted = true
                                                    return ad
                                                }))
                                            })
                                            }} type="button" className="wish-icon rui-3a8k1 _29mJd favoriteOff" role="button" tabIndex={0} data-aut-id="btnFav" title="Favourite">
                                        <svg width="24px" height="24px" viewBox="0 0 1024 1024" data-aut-id="icon" className="" fillRule="evenodd" fill='black'><path className="rui-w4DG7" d="M830.798 448.659l-318.798 389.915-317.828-388.693c-20.461-27.171-31.263-59.345-31.263-93.033 0-85.566 69.605-155.152 155.152-155.152 72.126 0 132.752 49.552 150.051 116.364h87.777c17.299-66.812 77.905-116.364 150.051-116.364 85.547 0 155.152 69.585 155.152 155.152 0 33.687-10.802 65.862-30.293 91.811zM705.939 124.121c-80.853 0-152.204 41.425-193.939 104.204-41.736-62.778-113.086-104.204-193.939-104.204-128.33 0-232.727 104.378-232.727 232.727 0 50.657 16.194 98.948 47.806 140.897l328.766 402.133h100.189l329.716-403.355c30.662-40.727 46.856-89.018 46.856-139.675 0-128.349-104.398-232.727-232.727-232.727z"></path>
                                        </svg>
                                        </button>
                                    }
                                    
                                    <img src={ BASE_IMAGE_URL +item.related_images[0].image} width={400} height={300} onClick={()=>{ url(`/details/${item.title}`); SetAd(item);localStorage.setItem('detail-id',String(item.id));localStorage.setItem('detail-category',item.category) }} />

                                </div>
                                <div className="Ad-text-container" onClick={()=>{ url(`/details/${item.title}`); SetAd(item); localStorage.setItem('detail-id',String(item.id));localStorage.setItem('detail-category',item.category) }}>
                                    <p className="price-text">
                                    ₹ {item.price}
                                    </p>
                                    <p className="Ad-Text">{item.title}</p>
                                    
                                    <p className="Ad-text2">{item.ad_location}</p>
                                    <p className="Ad-text3">{item.date_created}</p>
                                </div>
                            </div>
                        )
                    })
                }
                </div>
            </div>

                :
                null
            }


        </div>


        
    </div>
    </>
  )
}

export default DetailPage