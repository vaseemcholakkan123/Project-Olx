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
import AdCard from '../AdCard'
import NoData from '../../NoData'


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


    },[filter,sort_by,RouterState.state.category])

  return (
    <div>
        <CatorBread noBanner={true} />
        <div className="category-container row">
            <h3 className='title'>{RouterState.state.category}</h3>
            <div className="col-lg-3 dynamic-filter">
              {
              RouterState.state.category =='Car' ? <CarsSideBar SetFilter={SetFilter} />
               : RouterState.state.category == 'Property' ? <PropertySidebar SetFilter={SetFilter} />
               : RouterState.state.category == 'Scooter' ? <ScooterSidebar SetFilter={SetFilter} />
               : RouterState.state.category == 'Mobile' ? <MobileSidebar SetFilter={SetFilter} /> 
               : RouterState.state.category == 'Accessory' ? <Accessorysidebar SetFilter={SetFilter} /> 
               : null

              }
            </div>

            <div className="col-lg-9 col-12">
              <div className="ads-container row gy-3 gx-3">
                <div className="d-flex a-center">
                  <p>Total {categoryAds.length} ads</p>
                  <p className='sort-txt ms-auto dynamic-filter'>SORT BY:</p>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="filter2 ms-auto me-1 bi bi-filter" viewBox="0 0 16 16">
                    <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
                  </svg>
                  <p className="sort-txt filter2" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom">
                  Filters
                  </p>

                  <div className="offcanvas offcanvas-bottom filter2" tabIndex={-1} id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel">
                    <div className="offcanvas-header">
                      <h5 className="offcanvas-title" id="offcanvasBottomLabel">Filter Ads</h5>
                      <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body small">
                        {
                        RouterState.state.category =='Car' ? <CarsSideBar SetFilter={SetFilter} />
                        : RouterState.state.category == 'Property' ? <PropertySidebar SetFilter={SetFilter} />
                        : RouterState.state.category == 'Scooter' ? <ScooterSidebar SetFilter={SetFilter} />
                        : RouterState.state.category == 'Mobile' ? <MobileSidebar SetFilter={SetFilter} /> 
                        : RouterState.state.category == 'Accessory' ? <Accessorysidebar SetFilter={SetFilter} /> 
                        : null
                        }
                    </div>
                  </div>

                  <div className="dropdown dynamic-filter">
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
                return(<AdCard cat={true} key={item.title} Ad={item} showDetails={props.ShowDetails} />)
                  })

                }

                {
                  categoryAds.length == 0 ? 
                    <NoData />
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