import { Dispatch, SetStateAction, useState } from 'react'
import './sidebar.css'
function ScooterSidebar(props:{SetFilter:Dispatch<SetStateAction<string>>}) {

    const [active,SetActive] = useState('')

  return (
    <div>
        <div className="sidebar-container row">
            <div className="d-flex a-center">
                <h4 className='text-secondary p-1 ps-0'>Filters</h4>
                <p className="f-small ms-auto rm-filter" onClick={e=>{props.SetFilter('');SetActive('')}}>clear filters</p>

            </div>
            <div className="d-flex a-center"  data-bs-toggle="collapse" data-bs-target="#brandsCollapse" role="button" aria-expanded="false" aria-controls="collapseExample">
                <p className="filter-text">BRAND</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="down ms-auto" viewBox="0 0 16 16"><path fillRule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"></path></svg>
            </div>
            <div className="collapse bottom-border" id="brandsCollapse">
                <div>
                    <div className='row'>
                        <div className="others-holder2">
                            <div className="col-12 d-flex brand-checkbox mt-2">
                                <input type="checkbox" checked={active == 'Bajaj' ? true : false} onChange={e=>{SetActive('Bajaj');props.SetFilter('brand=Bajaj')}} name="hyundai" id="bajaj" />
                                <label htmlFor="bajaj">Bajaj</label>
                            </div>
    
                            <div className="col-12 d-flex brand-checkbox mt-2">
                                <input type="checkbox" id="hero" checked={active == 'Hero' ? true : false} onChange={e=>{SetActive('Hero');props.SetFilter('brand=Hero')}} />
                                <label htmlFor="hero">Hero</label>
                            </div>
    
                            <div className="col-12 d-flex brand-checkbox mt-2">
                                <input type="checkbox" id="honda" checked={active == 'Honda' ? true : false} onChange={e=>{SetActive('Honda');props.SetFilter('brand=Honda')}} />
                                <label htmlFor="honda">Honda</label>
                            </div>

                            <div className="col-12 d-flex brand-checkbox mt-2">
                                <input type="checkbox" id="mahindra" checked={active == 'Mahindra' ? true : false} onChange={e=>{SetActive('Mahindra');props.SetFilter('brand=Mahindra')}} />
                                <label htmlFor="mahindra">Mahindra</label>
                            </div>
                            <div className="col-12 d-flex brand-checkbox mt-2">
                                <input type="checkbox" id="Suzuki" checked={active == 'Suzuki' ? true : false} onChange={e=>{SetActive('Suzuki');props.SetFilter('brand=Suzuki')}} />
                                <label htmlFor="Suzuki">Suzuki</label>
                            </div>
                            <div className="col-12 d-flex brand-checkbox mt-2">
                                <input type="checkbox" id="tvs" checked={active == 'TVS' ? true : false} onChange={e=>{SetActive('TVS');props.SetFilter('brand=TVS')}} />
                                <label htmlFor="tvs">TVS</label>
                            </div>
                        </div>

                    </div>
                                    
                </div>
            </div>

            
            <div className="d-flex a-center"  data-bs-toggle="collapse" data-bs-target="#kmCollapse" role="button" aria-expanded="false" aria-controls="collapseExample">
                <p className="filter-text">KM DRIVEN</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="down ms-auto" viewBox="0 0 16 16"><path fillRule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"></path></svg>
            </div>

            <div className="collapse bottom-border" id="kmCollapse">
                <div>
                    <div className='row'>
                        <div>
                            <p className='text-secondary f-medium mt-2 mb-2'>Choose options from below</p>

                            <div className={active == 'km_1' ? 'border1 years-txt active_item' : 'border1 years-txt'} onClick={e=>{SetActive('km_1');props.SetFilter('km_driven=blw25000-abo0')}}>
                                <p>Below 25000Km</p>
                            </div>

                            <div className={active == 'km_2' ? 'border1 years-txt active_item' : 'border1 years-txt'} onClick={e=>{SetActive('km_2');props.SetFilter('km_driven=blw50000-abo25000')}}>
                                <p>25000 - 50000 Km</p>
                            </div>

                            <div className={active == 'km_3' ? 'border1 years-txt active_item' : 'border1 years-txt'} onClick={e=>{SetActive('km_3');props.SetFilter('km_driven=blw100000-abo50000')}}>
                                <p>50000 - 100000Km</p>
                            </div>
                            <div className={active == 'km_4' ? 'border1 years-txt active_item' : 'border1 years-txt'} onClick={e=>{SetActive('km_4');props.SetFilter('km_driven=blw10000000-abo100000')}}>
                                <p>100000Km and Above</p>
                            </div>
                        </div>

                    </div>
                                    
                </div>
            </div>



            <div className="d-flex a-center"  data-bs-toggle="collapse" data-bs-target="#yearsCollapse" role="button" aria-expanded="false" aria-controls="collapseExample">
                <p className="filter-text">YEAR</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="down ms-auto" viewBox="0 0 16 16"><path fillRule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"></path></svg>
            </div>

            <div className="collapse bottom-border" id="yearsCollapse">
                <div>
                    <div className='row'>
                        <div>
                            <p className='text-secondary f-medium mt-2 mb-2'>Choose options from below</p>

                            <div className={active == 'yr_1' ? 'border1 years-txt active_item' : 'border1 years-txt'} onClick={e=>{SetActive('yr_1');props.SetFilter('year=3')}}>
                                <p>Under 3 years</p>
                            </div>

                            <div className={active == 'yr_2' ? 'border1 years-txt active_item' : 'border1 years-txt'} onClick={e=>{SetActive('yr_2');props.SetFilter('year=5')}}>
                                <p>Under 5 years</p>
                            </div>

                            <div className={active == 'yr_3' ? 'border1 years-txt active_item' : 'border1 years-txt'} onClick={e=>{SetActive('yr_3');props.SetFilter('year=7')}}>
                                <p>7 Years and Above</p>
                            </div>
                        </div>

                    </div>
                                    
                </div>
            </div>




        </div>
    </div>
  )
}

export default ScooterSidebar