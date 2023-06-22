import { Dispatch, SetStateAction, useState } from 'react'
import './sidebar.css'

function Accessorysidebar(props:{SetFilter:Dispatch<SetStateAction<string>>}) {
  const [active,SetActive] = useState('')

  return (
    <div>
        <div className="sidebar-container row">
            <div className="d-flex a-center">
                <h4 className='text-secondary p-1 ps-0'>Filters</h4>
                <p className="f-small ms-auto">clear filters</p>

            </div>

            <div className="d-flex a-center"  data-bs-toggle="collapse" data-bs-target="#typeCollapse" role="button" aria-expanded="false" aria-controls="collapseExample">
                <p className="filter-text">TYPE</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="down ms-auto" viewBox="0 0 16 16"><path fillRule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"></path></svg>
            </div>

            <div className="collapse bottom-border" id="typeCollapse">
                <div>
                    <div className='row'>
                        <div>
                            <p className='text-secondary f-medium mt-2 mb-2'>Choose options from below</p>

                            <div onClick={e=>{props.SetFilter('type=Mobile');SetActive('Mobile')}} className={active=='Mobile' ? 'border1 years-txt active_item' : 'border1 years-txt'}>
                                <p>Mobile</p>
                            </div>

                            <div className={active=='Tablet' ? 'border1 years-txt active_item' : 'border1 years-txt'} onClick={e=>{props.SetFilter('type=Tablet');SetActive('Tablet')}}>
                                <p>Tablet</p>
                            </div>

                        </div>

                    </div>
                                    
                </div>
            </div>

        </div>
    </div>
  )
}

export default Accessorysidebar