import { useLocation, useNavigate } from 'react-router-dom'
import './category.css'
import CatorBread from '../../NavItems/CatorBread'
import { BASE_IMAGE_URL } from '../../../../../Config/ConstAPI'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { detailType } from '../../UserApp'
import { ad } from '../HomePage'
import olxAxios from '../../../../../Config/AxiosConfig'
import CarsSideBar from './DynamicSidebars/CarsSideBar'
import PropertySidebar from './DynamicSidebars/PropertySidebar'
import MobileSidebar from './DynamicSidebars/MobileSidebar'
import ScooterSidebar from './DynamicSidebars/ScooterSidebar'
import Accessorysidebar from './DynamicSidebars/AccessorySidebar'


function CategoryPanel(props:{ShowDetails:Dispatch<SetStateAction<detailType>>}) {
    const RouterState = useLocation()
    const url = useNavigate()
    const [categoryAds,setAds] = useState<ad[]>([])
    const [filter,SetFilter] = useState('')
    const [sort_by,SetSortby] = useState('-date_created')

    useEffect(()=>{

      olxAxios.get(`/ads-${RouterState.state.category}/?${filter}&sort_by=${sort_by}`)
      .then(res=>{
        let lis: Array<ad> = [...res.data]
        setAds(lis)
        
      })
      .catch(err=>{
        console.log(err);
        
      })


    },[filter,sort_by])

  return (
    <div>
        <CatorBread noBanner={true} />
        <div className="category-container row">
            <h3 className='title'>{RouterState.state.category}</h3>
            <div className="col-3">
              {
              RouterState.state.category =='Car' ? <CarsSideBar SetFilter={SetFilter} />
               : RouterState.state.category == 'Property' ? <PropertySidebar SetFilter={SetFilter} />
               : RouterState.state.category == 'Scooter' ? <ScooterSidebar SetFilter={SetFilter} />
               : RouterState.state.category == 'Mobile' ? <MobileSidebar SetFilter={SetFilter} /> 
               : RouterState.state.category == 'Accessory' ? <Accessorysidebar SetFilter={SetFilter} /> 
               : null

              }
            </div>

            <div className="col-9">
              <div className="ads-container row gy-3 gx-2">
                <div className="d-flex a-center">
                  <p>Total {categoryAds.length} ads</p>
                  <p className='sort-txt ms-auto'>SORT BY:</p>

                  <div className="dropdown">
                    <button className="drop-btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {sort_by == '-date_created' ? 'Published Date' : sort_by == 'lowtohigh' ? 'Price Low to High' : sort_by ==  'hightolow'? 'Price High to Low' : null  }
                    </button>
                    <ul className="dropdown-menu">
                    <li><a className="dropdown-item" onClick={e=>{SetSortby('-date_created')}}>Published Date</a></li>
                    <li><a className="dropdown-item" onClick={e=>{SetSortby('lowtohigh')}} >Price Low to High</a></li>
                    <li><a className="dropdown-item" onClick={e=>{SetSortby('hightolow')}}>Price High to Low</a></li>
                    </ul>
                  </div>
                </div>
              {
                  categoryAds.map(item=>{
                  return(
                    <div key={item.title} className="Ad-card col-md-4 col-lg-4" onClick={()=>{ url(`/details/${item.title}`); props.ShowDetails({Ad_category:item.category , Ad_id : item.id}) }}>
                      <div className="Ad-image-container">

                          <button type="button" className="wish-icon rui-3a8k1 _29mJd favoriteOff" role="button" tabIndex={0} data-aut-id="btnFav" title="Favourite">
                            <svg width="24px" height="24px" viewBox="0 0 1024 1024" data-aut-id="icon" className="" fillRule="evenodd"><path className="rui-w4DG7" d="M830.798 448.659l-318.798 389.915-317.828-388.693c-20.461-27.171-31.263-59.345-31.263-93.033 0-85.566 69.605-155.152 155.152-155.152 72.126 0 132.752 49.552 150.051 116.364h87.777c17.299-66.812 77.905-116.364 150.051-116.364 85.547 0 155.152 69.585 155.152 155.152 0 33.687-10.802 65.862-30.293 91.811zM705.939 124.121c-80.853 0-152.204 41.425-193.939 104.204-41.736-62.778-113.086-104.204-193.939-104.204-128.33 0-232.727 104.378-232.727 232.727 0 50.657 16.194 98.948 47.806 140.897l328.766 402.133h100.189l329.716-403.355c30.662-40.727 46.856-89.018 46.856-139.675 0-128.349-104.398-232.727-232.727-232.727z"></path>
                            </svg>
                          </button>


                        <img src={item.related_images[0].image} width={400} height={300} alt="related" />

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

                {
                  categoryAds.length == 0 ? 
                  <div className='p-4'><h5>No data</h5></div>
                  :
                  null
                }

            

          </div>
            </div>
        </div>
    </div>
  )
}

export default CategoryPanel