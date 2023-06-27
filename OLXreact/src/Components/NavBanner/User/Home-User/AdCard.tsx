import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import './homepage.css'
import { ad } from './HomePage'
import { handleWishlistDelete, handleWishlist } from '../Helper'
import { detailType } from '../UserApp'
import { useNavigate } from 'react-router-dom'
import { BASE_IMAGE_URL } from '../../../../Config/ConstAPI'

type AdCardType = {
    Ad : ad,
    showDetails : Dispatch<SetStateAction<detailType>>,
    cat?:boolean
}

function AdCard({Ad,showDetails,cat}:AdCardType) {

    const url = useNavigate()
    
    const [item,setAd] = useState<ad>(Ad)

    useEffect(()=>{},[item])
  return (
    <div className={cat? "Ad-card col-sm-6 col-md-4 col-lg-5 col-xl-4" : "Ad-card col-sm-6 col-md-4 col-lg-4 col-xl-3"}>
              <div className="Ad-image-container">

                  {
                  item.is_wishlisted ?
                  
                    <button onClick={e=>{
                    handleWishlistDelete(item.id,item.category).then(r=>setAd({...item,is_wishlisted:false}))
                    
                    }} type="button" className="wish-icon rui-3a8k1 _29mJd favoriteOff" role="button" tabIndex={0} data-aut-id="btnFav" title="Favourite">
                      <svg xmlns="http://www.w3.org/2000/svg" width="22px" height="22" fill="currentColor" className="bi bi-suit-heart-fill" viewBox="0 0 16 16">
                        <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z"/>
                      </svg>
                    </button>
                    :
                    <button onClick={e=>{
                        handleWishlist(item.id,item.category).then(r=>setAd({...item,is_wishlisted:true}))
                        }} type="button" className="wish-icon rui-3a8k1 _29mJd favoriteOff" role="button" tabIndex={0} data-aut-id="btnFav" title="Favourite">
                      <svg width="24px" height="24px" viewBox="0 0 1024 1024" data-aut-id="icon" className="" fillRule="evenodd" fill='black'><path className="rui-w4DG7" d="M830.798 448.659l-318.798 389.915-317.828-388.693c-20.461-27.171-31.263-59.345-31.263-93.033 0-85.566 69.605-155.152 155.152-155.152 72.126 0 132.752 49.552 150.051 116.364h87.777c17.299-66.812 77.905-116.364 150.051-116.364 85.547 0 155.152 69.585 155.152 155.152 0 33.687-10.802 65.862-30.293 91.811zM705.939 124.121c-80.853 0-152.204 41.425-193.939 104.204-41.736-62.778-113.086-104.204-193.939-104.204-128.33 0-232.727 104.378-232.727 232.727 0 50.657 16.194 98.948 47.806 140.897l328.766 402.133h100.189l329.716-403.355c30.662-40.727 46.856-89.018 46.856-139.675 0-128.349-104.398-232.727-232.727-232.727z"></path>
                      </svg>
                    </button>
                }
                
                <img src={ BASE_IMAGE_URL +  item.related_images[0].image} width={400} height={300} onClick={()=>{ url(`/details/${item.title}`); showDetails({Ad_category:item.category , Ad_id : item.id});localStorage.setItem('detail-id',String(item.id));localStorage.setItem('detail-category',item.category) }} />

              </div>
              <div className="Ad-text-container" onClick={()=>{ url(`/details/${item.title}`); showDetails({Ad_category:item.category , Ad_id : item.id}); localStorage.setItem('detail-id',String(item.id));localStorage.setItem('detail-category',item.category) }}>
                <p className="price-text">
                  ₹ {item.price}
                </p>
                <p className="Ad-Text">{item.title}</p>
                
                <p className="Ad-text2">{item.ad_location}</p>
                <p className="Ad-text3">{item.date_created}</p>
              </div>
            </div>
  )
}

export default AdCard