import { useContext, useEffect, useState } from 'react'
import './detail.css'
import olxAxios from '../../../../Config/AxiosConfig'
import { ad } from '../Home-User/HomePage'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { userContext } from '../UserApp'
import CatorBread from '../NavItems/CatorBread'

type detailpageProps = {
    ad_id : null|Number,
    category : null|string
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


function DetailPage(props:detailpageProps) {

    let url = useNavigate()

    useEffect(()=>{
        if (!props.ad_id && !props.category) url('/')
        let category = props.category
        if (props.category == 'Properties') category = 'Property'


        olxAxios.get(`ads-${category}/${props.ad_id}`)
        .then(res=>{
            SetAd(res.data)
        })
        .catch(err=>{
            NotifyFailure()
        })
    },[])


    function handleDelete(id?:Number){

        if (!id) return;
        olxAxios.delete(`ads-${props.category}/${id}`).then(res=>{
            console.log(res);
            url('/')
        })
        .catch(err=>{
            console.log(err);
            
        })

    }
    
    function handleMessage(){

        if (!userData.user_id)return NotifyFailure()

        url('/chat',
        {state:
            {'username':DetailAd?.posted_user?.username ,
             'profile' : DetailAd?.posted_user?.profile ,
              'id' : DetailAd?.posted_user?.id}});


    }

    const [DetailAd,SetAd] = useState<ad>()
    const { userData } = useContext(userContext)



  return (
    <>
     <CatorBread context={{category:DetailAd?.category , title : DetailAd?.title}} />
    <div className='user-home-container row'>
    
        <div className="d-flex col-8">
            <div id="carouselExampleFade" className="carousel slide carousel-fade details-corousel" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                    <img src={DetailAd?.related_images?.[0].image} className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                    <img src={DetailAd?.related_images?.[1].image} className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                    <img src={DetailAd?.related_images?.[2].image} className="d-block w-100" alt="..." />
                    </div>
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
        <div className="col-4 p-2">
            <div className="border1 detail-container1">
                <div className="d-flex mt-2">
                    <h2 className='fw-700'> ₹ {DetailAd?.price}</h2>
                    <svg width="24px" height="24px" viewBox="0 0 1024 1024" data-aut-id="icon" className="" fillRule="evenodd"><path className="rui-w4DG7" d="M768 853.333c-47.104 0-85.333-38.229-85.333-85.333s38.229-85.333 85.333-85.333c47.104 0 85.333 38.229 85.333 85.333s-38.229 85.333-85.333 85.333zM256 597.333c-47.104 0-85.333-38.229-85.333-85.333s38.229-85.333 85.333-85.333c47.104 0 85.333 38.229 85.333 85.333s-38.229 85.333-85.333 85.333zM768 170.667c47.104 0 85.333 38.229 85.333 85.333s-38.229 85.333-85.333 85.333c-47.104 0-85.333-38.229-85.333-85.333s38.229-85.333 85.333-85.333zM768 597.333c-52.437 0-98.688 24.107-130.005 61.312l-213.675-123.392c1.067-7.637 2.347-15.275 2.347-23.253 0-4.779-1.024-9.259-1.408-13.909l218.283-126.037c31.104 33.408 75.179 54.613 124.459 54.613 94.251 0 170.667-76.416 170.667-170.667s-76.416-170.667-170.667-170.667c-94.251 0-170.667 76.416-170.667 170.667 0 14.208 2.261 27.819 5.504 41.003l-205.867 118.912c-30.763-45.013-82.389-74.581-140.971-74.581-94.251 0-170.667 76.416-170.667 170.667s76.416 170.667 170.667 170.667c55.467 0 104.235-26.88 135.424-67.84l209.195 120.747c-2.048 10.539-3.285 21.333-3.285 32.427 0 94.251 76.416 170.667 170.667 170.667s170.667-76.416 170.667-170.667c0-94.251-76.416-170.667-170.667-170.667z"></path></svg>
                    <svg width="24px" height="24px" viewBox="0 0 1024 1024" data-aut-id="icon" className='m-0 ms-2' fillRule="evenodd"><path className="rui-w4DG7" d="M830.798 448.659l-318.798 389.915-317.828-388.693c-20.461-27.171-31.263-59.345-31.263-93.033 0-85.566 69.605-155.152 155.152-155.152 72.126 0 132.752 49.552 150.051 116.364h87.777c17.299-66.812 77.905-116.364 150.051-116.364 85.547 0 155.152 69.585 155.152 155.152 0 33.687-10.802 65.862-30.293 91.811zM705.939 124.121c-80.853 0-152.204 41.425-193.939 104.204-41.736-62.778-113.086-104.204-193.939-104.204-128.33 0-232.727 104.378-232.727 232.727 0 50.657 16.194 98.948 47.806 140.897l328.766 402.133h100.189l329.716-403.355c30.662-40.727 46.856-89.018 46.856-139.675 0-128.349-104.398-232.727-232.727-232.727z"></path></svg>
                
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
                <h6 className='txt1 fw-700'>AD ID {DetailAd?.id}</h6>
                {  DetailAd?.posted_user?.id != userData.user_id ? 

                    <h6 className='txt1 fw-700 ms-auto'>REPORT THIS AD</h6>
                    :
                    null
                }
            </div>

        </div>


        <div className="row">
            <div className="border1 p-3 col-8">
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
        </div>


        
    </div>
    </>
  )
}

export default DetailPage