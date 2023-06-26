import { Dispatch, SetStateAction, useState } from 'react'
import './sidebar.css'
function MobileSidebar(props:{SetFilter:Dispatch<SetStateAction<string>>}) {

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
                                <input type="checkbox" id="iphone"  checked={active == 'Iphone' ? true : false} onChange={e=>{SetActive('Iphone');props.SetFilter('brand=iPhone')}}  />
                                <label htmlFor="iphone">Iphone</label>
                            </div>
    
                            <div className="col-12 d-flex brand-checkbox mt-2">
                                <input type="checkbox" id="samsung"  checked={active == 'Samsung' ? true : false} onChange={e=>{SetActive('Samsung');props.SetFilter('brand=Samsung')}}  />
                                <label htmlFor="samsung">Samsung</label>
                            </div>
    
                            <div className="col-12 d-flex brand-checkbox mt-2">
                                <input type="checkbox" id="Oppo"  checked={active == 'Oppo' ? true : false} onChange={e=>{SetActive('Oppo');props.SetFilter('brand=Oppo')}}  />
                                <label htmlFor="Oppo">Oppo</label>
                            </div>

                            <div className="col-12 d-flex brand-checkbox mt-2">
                                <input type="checkbox" id="realme"  checked={active == 'Realme' ? true : false} onChange={e=>{SetActive('Realme');props.SetFilter('brand=Realme')}}  />
                                <label htmlFor="realme">Realme</label>
                            </div>
                            <div className="col-12 d-flex brand-checkbox mt-2">
                                <input type="checkbox" id="vivo"  checked={active == 'Vivo' ? true : false} onChange={e=>{SetActive('Vivo');props.SetFilter('brand=Vivo')}}  />
                                <label htmlFor="vivo">Vivo</label>
                            </div>

                        </div>

                    </div>
                                    
                </div>
            </div>

        </div>
    </div>
  )
}

export default MobileSidebar