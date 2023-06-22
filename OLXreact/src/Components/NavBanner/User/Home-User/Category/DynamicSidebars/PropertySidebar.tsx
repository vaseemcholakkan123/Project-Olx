import { Dispatch, SetStateAction, useState } from 'react'
import './sidebar.css'

function PropertySidebar(props:{SetFilter:Dispatch<SetStateAction<string>>}) {

    const [active,SetActive] = useState('')
  return (
    <div>
    <div className="sidebar-container row">
        <div className="d-flex a-center">
            <h4 className='text-secondary p-1 ps-0'>Filters</h4>
            <p className="f-small ms-auto rm-filter" onClick={e=>{SetActive('');props.SetFilter('')}}>clear filters</p>

        </div>
        <div className="d-flex a-center"  data-bs-toggle="collapse" data-bs-target="#propertyCollapse" role="button" aria-expanded="false" aria-controls="collapseExample">
            <p className="filter-text">Type</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="down ms-auto" viewBox="0 0 16 16"><path fillRule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"></path></svg>
        </div>
        <div className="collapse bottom-border" id="propertyCollapse">
            <div>
                <div className='row'>
                    <div className="others-holder">
                        <div className="col-12 d-flex brand-checkbox mt-2">
                            <input type="checkbox" id="HV" checked={active == 'HV' ? true : false} onChange={e=>{SetActive('HV');props.SetFilter('building_type=HV')}}  />
                            <label htmlFor="HV">Houses & Villas</label>
                        </div>
                        <div className="col-12 d-flex brand-checkbox mt-2">
                            <input type="checkbox" name="hyundai" id="apartments" checked={active == 'Apartments' ? true : false} onChange={e=>{SetActive('Apartments');props.SetFilter('building_type=Apartments')}}  />
                            <label htmlFor="apartments">Apartment</label>
                        </div>

                        <div className="col-12 d-flex brand-checkbox mt-2">
                            <input type="checkbox" id="bfloors" checked={active == 'BF' ? true : false} onChange={e=>{SetActive('BF');props.SetFilter('building_type=BF')}}  />
                            <label htmlFor="bfloors">Builder Floors</label>
                        </div>

                        <div className="col-12 d-flex brand-checkbox mt-2">
                            <input type="checkbox" id="Farm" checked={active == 'FH' ? true : false} onChange={e=>{SetActive('FH');props.SetFilter('building_type=FH')}}  />
                            <label htmlFor="Farm">Farm Houses</label>
                        </div>

                    </div>

                </div>
                                
            </div>
        </div>

        <div className="d-flex a-center"  data-bs-toggle="collapse" data-bs-target="#bedroomsCollapse" role="button" aria-expanded="false" aria-controls="collapseExample">
                <p className="filter-text">BEDROOMS</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="down ms-auto" viewBox="0 0 16 16"><path fillRule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"></path></svg>
        </div>

        <div className="collapse bottom-border" id="bedroomsCollapse">
            <div>
                <div className='row'>
                    <div>
                        <p className='text-secondary f-medium mt-2 mb-2'>Choose options from below</p>

                        <div className={active == 'bm_1' ? 'border1 years-txt active_item' : 'border1 years-txt'} onClick={e=>{SetActive('bm_1');props.SetFilter('bedrooms=2')}}>
                            <p>1+ bedroom</p>
                        </div>

                        <div className={active == 'bm_2' ? 'border1 years-txt active_item' : 'border1 years-txt'} onClick={e=>{SetActive('bm_2');props.SetFilter('bedrooms=3')}}>
                            <p>2+ bedrooms</p>
                        </div>

                        <div className={active == 'bm_3' ? 'border1 years-txt active_item' : 'border1 years-txt'} onClick={e=>{SetActive('bm_3');props.SetFilter('bedrooms=4')}}>
                            <p>3+ bedrooms</p>
                        </div>

                        <div className={active == 'bm_4' ? 'border1 years-txt active_item' : 'border1 years-txt'} onClick={e=>{SetActive('bm_4');props.SetFilter('bedrooms=5')}}>
                            <p>4+ bedroom</p>
                        </div>

                    </div>

                </div>
                                
            </div>
        </div>

        <div className="d-flex a-center"  data-bs-toggle="collapse" data-bs-target="#bathroomsCollapse" role="button" aria-expanded="false" aria-controls="collapseExample">
                <p className="filter-text">BATHROOMS</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="down ms-auto" viewBox="0 0 16 16"><path fillRule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"></path></svg>
        </div>

        <div className="collapse bottom-border" id="bathroomsCollapse">
            <div>
                <div className='row'>
                    <div>
                        <p className='text-secondary f-medium mt-2 mb-2'>Choose options from below</p>

                        <div className={active == 'br_1' ? 'border1 years-txt active_item' : 'border1 years-txt'} onClick={e=>{SetActive('br_1');props.SetFilter('bathrooms=2')}}>
                            <p>1+ bathrooms</p>
                        </div>

                        <div className={active == 'br_2' ? 'border1 years-txt active_item' : 'border1 years-txt'} onClick={e=>{SetActive('br_2');props.SetFilter('bathrooms=3')}}>
                            <p>2+ bathrooms</p>
                        </div>

                        <div className={active == 'br_3' ? 'border1 years-txt active_item' : 'border1 years-txt'} onClick={e=>{SetActive('br_3');props.SetFilter('bathrooms=4')}}>
                            <p>3+ bathrooms</p>
                        </div>

                        <div className={active == 'br_4' ? 'border1 years-txt active_item' : 'border1 years-txt'} onClick={e=>{SetActive('br_4');props.SetFilter('bathrooms=5')}}>
                            <p>4+ bathrooms</p>
                        </div>

                    </div>

                </div>
                                
            </div>
        </div>


    </div>
</div>
  )
}

export default PropertySidebar