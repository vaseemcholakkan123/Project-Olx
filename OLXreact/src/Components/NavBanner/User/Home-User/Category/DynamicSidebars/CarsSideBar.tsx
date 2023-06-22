
import './sidebar.css'
import toyota from '../../../../../../assets/toyota_3x.webp'
import tata from '../../../../../../assets/tata_3x.webp'
import maruti from '../../../../../../assets/maruti-suzuki_3x.webp'
import honda from '../../../../../../assets/honda_3x.webp'
import { Dispatch, SetStateAction, useState } from 'react'


function CarsSideBar(props:{SetFilter:Dispatch<SetStateAction<string>>}) {
    const [active,SetActive] = useState('')

  return (
    <div>
        <div className="sidebar-container row">
            <div className="d-flex a-center">
                <h4 className='text-secondary p-1 ps-0'>Filters</h4>
                <p className="f-small ms-auto rm-filter" onClick={e=>{SetActive('');props.SetFilter('')}}>clear filters</p>

            </div>
            <div className="d-flex a-center"  data-bs-toggle="collapse" data-bs-target="#brandsCollapse" role="button" aria-expanded="false" aria-controls="collapseExample">
                <p className="filter-text">BRAND</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="down ms-auto" viewBox="0 0 16 16"><path fillRule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"></path></svg>
            </div>
            <div className="collapse bottom-border" id="brandsCollapse">
                <div>
                    <div className='row'>
                        <div className={active=='tata' ? "col-5 brand-img border1 active_item" : "col-5 brand-img border1"} onClick={e=>{SetActive('tata');props.SetFilter('brand=Tata')}}>
                            <img src={tata} width={80} height={45} alt="" />
                        </div>
                        <div className={active=='maruti' ? "col-5 brand-img border1 active_item" : "col-5 brand-img border1"} onClick={e=>{SetActive('maruti');props.SetFilter('brand=Maruti')}}>
                            <img src={maruti} width={80} height={45} alt="" />
                        </div>
                        <div className={active=='honda' ? "col-5 brand-img border1 active_item" : "col-5 brand-img border1"} onClick={e=>{SetActive('honda');props.SetFilter('brand=Honda')}}>
                            <img src={honda} width={80} height={45} alt="" />
                        </div>
                        <div className={active=='toyota' ? "col-5 brand-img border1 active_item" : "col-5 brand-img border1"} onClick={e=>{SetActive('toyota');props.SetFilter('brand=Toyota')}}>
                            <img src={toyota} width={80} height={45} alt="" />
                        </div>

                        <div className="others-holder">
                            <div className="col-12 d-flex brand-checkbox mt-2">
                                <input type="checkbox" name="hyundai" id="hyundai" checked={active == 'hyu' ? true : false} onChange={e=>{SetActive('hyu');props.SetFilter('brand=Hyundai')}}  />
                                <label htmlFor="hyundai">Hyundai</label>
                            </div>
    
                            <div className="col-12 d-flex brand-checkbox mt-2">
                                <input type="checkbox" id="mahindra" checked={active == 'mahindra' ? true : false} onChange={e=>{SetActive('mahindra');props.SetFilter('brand=Mahindra')}}  />
                                <label htmlFor="mahindra">Mahindra</label>
                            </div>
    
                            <div className="col-12 d-flex brand-checkbox mt-2">
                                <input type="checkbox" id="audi" checked={active == 'audi' ? true : false} onChange={e=>{SetActive('audi');props.SetFilter('brand=Audi')}}  />
                                <label htmlFor="audi">Audi</label>
                            </div>

                            <div className="col-12 d-flex brand-checkbox mt-2">
                                <input type="checkbox" id="bmw" checked={active == 'bm' ? true : false} onChange={e=>{SetActive('bm');props.SetFilter('brand=Bmw')}}  />
                                <label htmlFor="bmw">BMW</label>
                            </div>
                            <div className="col-12 d-flex brand-checkbox mt-2">
                                <input type="checkbox" id="porsche" checked={active == 'porsche' ? true : false} onChange={e=>{SetActive('porsche');props.SetFilter('brand=Porsche')}}  />
                                <label htmlFor="porsche">Porsche</label>
                            </div>
                            <div className="col-12 d-flex brand-checkbox mt-2">
                                <input type="checkbox" id="lexus" checked={active == 'lexus' ? true : false} onChange={e=>{SetActive('lexus');props.SetFilter('brand=Lexus')}}  />
                                <label htmlFor="lexus">Lexus</label>
                            </div>
                        </div>

                    </div>
                                    
                </div>
            </div>



            <div className="d-flex a-center"  data-bs-toggle="collapse" data-bs-target="#no.ofCollapse" role="button" aria-expanded="false" aria-controls="collapseExample">
                <p className="filter-text">NO. OF Owners</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="down ms-auto" viewBox="0 0 16 16"><path fillRule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"></path></svg>
            </div>

            <div className="collapse bottom-border" id="no.ofCollapse">
                <div>
                    <div className='row'>
                        <div className="others-holder2">
                            <div className="col-12 d-flex brand-checkbox mt-2">
                                <input type="checkbox" id="first" checked={active == '1' ? true : false} onChange={e=>{SetActive('1');props.SetFilter('no_of_owners=1')}}   />
                                <label htmlFor="first">First</label>
                            </div>
    
                            <div className="col-12 d-flex brand-checkbox mt-2">
                                <input type="checkbox" id="second" checked={active == '2' ? true : false} onChange={e=>{SetActive('2');props.SetFilter('no_of_owners=2')}} />
                                <label htmlFor="second">Second</label>
                            </div>
    
                            <div className="col-12 d-flex brand-checkbox mt-2">
                                <input type="checkbox" id="third" checked={active == '3' ? true : false} onChange={e=>{SetActive('3');props.SetFilter('no_of_owners=3')}} />
                                <label htmlFor="third">Third</label>
                            </div>

                            <div className="col-12 d-flex brand-checkbox mt-2">
                                <input type="checkbox" id="fourth" checked={active == '4' ? true : false} onChange={e=>{SetActive('4');props.SetFilter('no_of_owners=4')}} />
                                <label htmlFor="fourth">Fourth</label>
                            </div>
                            <div className="col-12 d-flex brand-checkbox mt-2">
                                <input type="checkbox" id="mfour" checked={active == '5' ? true : false} onChange={e=>{SetActive('5');props.SetFilter('no_of_owners=5')}} />
                                <label htmlFor="mfour">More than Four</label>
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

            <div className="d-flex a-center"  data-bs-toggle="collapse" data-bs-target="#fuelCollapse" role="button" aria-expanded="false" aria-controls="collapseExample">
                <p className="filter-text">FUEL TYPE</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="down ms-auto" viewBox="0 0 16 16"><path fillRule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"></path></svg>
            </div>

            <div className="collapse bottom-border" id="fuelCollapse">
                <div>
                    <div className='row'>
                        <div className="others-holder2">
                            <div className="col-12 d-flex brand-checkbox mt-2">
                                <input type="checkbox" name="hyundai" id="petrol" checked={active == 'petrol' ? true : false} onChange={e=>{SetActive('petrol');props.SetFilter('fuel_type=Petrol')}} />
                                <label htmlFor="petrol">Petrol</label>
                            </div>
    
                            <div className="col-12 d-flex brand-checkbox mt-2">
                                <input type="checkbox" id="diesel" checked={active == 'diesel' ? true : false} onChange={e=>{SetActive('diesel');props.SetFilter('fuel_type=Diesel')}} />
                                <label htmlFor="diesel">Diesel</label>
                            </div>
    
                            <div className="col-12 d-flex brand-checkbox mt-2">
                                <input type="checkbox" id="lpg" checked={active == 'LPG' ? true : false} onChange={e=>{SetActive('LPG');props.SetFilter('fuel_type=LPG')}} />
                                <label htmlFor="lpg">LPG</label>
                            </div>

                            <div className="col-12 d-flex brand-checkbox mt-2">
                                <input type="checkbox" id="cn" checked={active == 'cn' ? true : false} onChange={e=>{SetActive('cn');props.SetFilter('fuel_type=cn')}} />
                                <label htmlFor="cn">CNG & Hybrids</label>
                            </div>
                            <div className="col-12 d-flex brand-checkbox mt-2">
                                <input type="checkbox" id="electric" checked={active == 'electric' ? true : false} onChange={e=>{SetActive('electric');props.SetFilter('fuel_type=Electric')}} />
                                <label htmlFor="electric">Electric</label>
                            </div>

                        </div>

                    </div>
                                    
                </div>
            </div>


            <div className="d-flex a-center"  data-bs-toggle="collapse" data-bs-target="#transmissionCollapse" role="button" aria-expanded="false" aria-controls="collapseExample">
                <p className="filter-text">TRANSMISSION</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="down ms-auto" viewBox="0 0 16 16"><path fillRule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"></path></svg>
            </div>

            <div className="collapse bottom-border" id="transmissionCollapse">
                <div>
                    <div className='row'>
                        <div>
                            <p className='text-secondary f-medium mt-2 mb-2'>Choose options from below</p>

                            <div className={active == 'automatic' ? 'border1 years-txt active_item' : 'border1 years-txt'} onClick={e=>{SetActive('automatic');props.SetFilter('transmission=Automatic')}}>
                                <p>Automatic</p>
                            </div>

                            <div className={active == 'manual' ? 'border1 years-txt active_item' : 'border1 years-txt'} onClick={e=>{SetActive('manual');props.SetFilter('transmission=Manual')}}>
                                <p>Manual</p>
                            </div>

                        </div>

                    </div>
                                    
                </div>
            </div>

        </div>
    </div>
  )
}

export default CarsSideBar