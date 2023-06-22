import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import CatorBread from '../NavItems/CatorBread'
import './homepage.css'
import olxAxios from '../../../../Config/AxiosConfig'
import { BASE_IMAGE_URL } from '../../../../Config/ConstAPI'
import { detailType } from '../UserApp'
import { useNavigate } from 'react-router-dom'



export interface ad  {
    description?:String,
    battery_health?:string,
    years_used?:string,
    building_type?:string,
    bedrooms?:string,
    bathrooms?:string,
    accessory_type?:string,
    year?:string,
    transmission_type?:string,
    fuel_type?:string,
    no_of_owners?:string,
    km_driven?:string,
    model_name?:string,
    brand ?: string,
    title?:string,
    id : number,
    related_images?:[{image:string}],
    price?:string,
    ad_location?:string,
    date_created:string,
    category:string,
    posted_user?:{
      profile : string,
      username : string,
      id : Number,
    }
}
type propshome = {
  ShowDetails : Dispatch<SetStateAction<detailType>>,
  location : string,
  query?:string|null
}


function HomePage(props:propshome) {

  useEffect(()=>{
    
    let fetchurl = props.query ? `lsads/${props.location}/${props.query}` : `lsads/${props.location}`
    
    olxAxios.get(fetchurl).then(res=>{
      let lis: Array<ad> = [...res.data.Cars , ...res.data.Scooter , ...res.data.Mobile , ...res.data.Accessory , ...res.data.Property]
      SetAdList(lis)
      
    })
    .catch(err=>{
      console.log(err);
      
    })
  },[props.location,props.query])

  let url = useNavigate()

  const [Ads,SetAdList] = useState<ad[]>([])


  return (
    <div>
      <CatorBread />
      <div className="user-home-container">
        <h4>Fresh recommendations</h4>

        <div className="ads-container row gy-3 gx-2">
            {
              Ads.map(item=>{
                return(<div key={item.title} className="Ad-card col-md-4 col-lg-3" onClick={()=>{ url(`/details/${item.title}`); props.ShowDetails({Ad_category:item.category , Ad_id : item.id}) }}>
              <div className="Ad-image-container">

                  <button type="button" className="wish-icon rui-3a8k1 _29mJd favoriteOff" role="button" tabIndex={0} data-aut-id="btnFav" title="Favourite">
                    <svg width="24px" height="24px" viewBox="0 0 1024 1024" data-aut-id="icon" className="" fillRule="evenodd"><path className="rui-w4DG7" d="M830.798 448.659l-318.798 389.915-317.828-388.693c-20.461-27.171-31.263-59.345-31.263-93.033 0-85.566 69.605-155.152 155.152-155.152 72.126 0 132.752 49.552 150.051 116.364h87.777c17.299-66.812 77.905-116.364 150.051-116.364 85.547 0 155.152 69.585 155.152 155.152 0 33.687-10.802 65.862-30.293 91.811zM705.939 124.121c-80.853 0-152.204 41.425-193.939 104.204-41.736-62.778-113.086-104.204-193.939-104.204-128.33 0-232.727 104.378-232.727 232.727 0 50.657 16.194 98.948 47.806 140.897l328.766 402.133h100.189l329.716-403.355c30.662-40.727 46.856-89.018 46.856-139.675 0-128.349-104.398-232.727-232.727-232.727z"></path>
                    </svg>
                  </button>


                <img src={BASE_IMAGE_URL+item.related_images[0].image} width={400} height={300} alt="asdsa  " />

              </div>
              <div className="Ad-text-container">
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

           

        </div>

      </div>
    </div>
  )
}

export default HomePage