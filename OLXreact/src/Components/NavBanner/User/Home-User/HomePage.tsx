import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import CatorBread from '../NavItems/CatorBread'
import './homepage.css'
import olxAxios from '../../../../Config/AxiosConfig'
import { BASE_IMAGE_URL } from '../../../../Config/ConstAPI'
import { detailType } from '../UserApp'
import { useNavigate } from 'react-router-dom'
import { handleWishlist, handleWishlistDelete } from '../Helper'
import AdCard from './AdCard'
import NoData from '../NoData'




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
    is_wishlisted:boolean,
    related_images:[{image:string}],
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
    
    let fetchurl = props.query ? `lsads/?location=${props.location}&query=${props.query}` : `lsads/?location=${props.location}`
    
    olxAxios.get(fetchurl).then(res=>{
      let lis: Array<ad> = [...res.data.Cars , ...res.data.Scooter , ...res.data.Mobile , ...res.data.Accessory , ...res.data.Property]
      SetAdList(lis)
      console.table(lis)
      
    })
    .catch(err=>{
      console.log(err);
      
    })
  },[props.location,props.query])


  const [Ads,SetAdList] = useState<ad[]>([])

  


  return (
    <div>
      <CatorBread />
{/*       
      <div className="p-2 bg-primary">
        <p>sell</p>
      </div> */}

      <div className="user-home-container">

        <h4>Fresh recommendations</h4>

        <div className="ads-container row gy-4 gx-2">
            {
              Ads.map((item,i)=>{
                return(<AdCard key={item.description + String(i)} Ad={item} showDetails={props.ShowDetails} />)
              })
            }   

            {
              Ads.length == 0 ? 
                  <NoData />
              :
              null
          
              }

        <div className='position-fixed d-md-none' style={{bottom:'45px'}}>
          <div className="sell d-flex d-md-none">
            <svg
              width="104"
              height="48"
              viewBox="0 0 1603 768"
              className="_20oLV"
            >
              <g>
                <path
                  className="_32cGm _3Vwmt"
                  d="M434.442 16.944h718.82c202.72 0 367.057 164.337 367.057 367.058s-164.337 367.057-367.057 367.057h-718.82c-202.721 0-367.058-164.337-367.058-367.058s164.337-367.058 367.058-367.058z"
                ></path>
                <path
                  className="_32cGm _3XfCS"
                  d="M427.241 669.489c-80.917 0-158.59-25.926-218.705-73.004l-0.016-0.014c-69.113-54.119-108.754-131.557-108.754-212.474 0-41.070 9.776-80.712 29.081-117.797 25.058-48.139 64.933-89.278 115.333-118.966l-52.379-67.581c-64.73 38.122-115.955 90.98-148.159 152.845-24.842 47.745-37.441 98.726-37.441 151.499 0 104.027 50.962 203.61 139.799 273.175h0.016c77.312 60.535 177.193 93.887 281.22 93.887h299.699l25.138-40.783-25.138-40.783h-299.698z"
                ></path>
                <path
                  className="_32cGm _1DrSr"
                  d="M1318.522 38.596v0c-45.72-14.369-93.752-21.658-142.762-21.658h-748.511c-84.346 0-165.764 21.683-235.441 62.713l3.118 51.726 49.245 15.865c54.16-31.895 117.452-48.739 183.073-48.739h748.511c38.159 0 75.52 5.657 111.029 16.829v0c44.91 14.111 86.594 37.205 120.526 66.792l66.163-57.68c-43.616-38.010-97.197-67.703-154.957-85.852z"
                ></path>
                <path
                  className="_32cGm HKswn"
                  d="M1473.479 124.453l-55.855 9.91-10.307 47.76c61.844 53.929 95.92 125.617 95.92 201.88 0 25.235-3.772 50.26-11.214 74.363-38.348 124.311-168.398 211.129-316.262 211.129h-448.812l25.121 40.783-25.121 40.783h448.812c190.107 0 357.303-111.638 406.613-271.498 9.572-31.009 14.423-63.162 14.423-95.559 0-98.044-43.805-190.216-123.317-259.551z"
                ></path>
              </g>
            </svg>
            <div className="sell_btn">Sell</div>
          </div>
        </div>



        </div>

      </div>
    </div>
  )
}

export default HomePage