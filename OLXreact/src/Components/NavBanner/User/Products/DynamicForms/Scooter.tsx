import { useLocation } from 'react-router-dom'
import { form_child } from '../Validators'
import CommonAd from './CommonAd'
import './sellForm.css'
import { useEffect, useRef } from 'react'

const brands = ['Bajaj','Hero','Honda','Mahindra','Suzuki','TVS']

function Scooter(props:form_child) {

    const RouterState = useLocation()
    const model_name = useRef<HTMLInputElement>(null)
    const km_driven = useRef<HTMLInputElement>(null)
    const year = useRef<HTMLInputElement>(null)

    useEffect(()=>{
        if(RouterState.state){
            model_name.current ? model_name.current.value = props.product_form.model_name ? props.product_form.model_name : '' : null 
            km_driven.current ? km_driven.current.value = props.product_form.km_driven ? String(props.product_form.km_driven) : '' : null 
            year.current ? year.current.value = props.product_form.year ? String(props.product_form.year) : '' : null 
        
        }
    })

  return (
     <div className='ps-2'>
        <p className="my-form-label">Brand*</p>
        <p className="m-1 ms-3 form-error">{props.form_errors?.brand_error ? props.form_errors.brand_error : null }</p>


        <div className="m-3 mt-2">
            <select name="cars" id="cars" onChange={e => {props.MaintainForm({...props.product_form,brand:e.target.value})}} className='select-form'>
            <option>Select</option>

            {
                brands.map(item=>{
                    return(
                        <option key={item} value={item}>{item}</option>
                    )
                })
            }
            </select>
        </div>

        <p className="my-form-label">Model Name*</p>
        <p className="m-1 ms-3 form-error">{props.form_errors?.model_name_error ? props.form_errors.model_name_error : null }</p>

        <div className="m-3 mt-2">
            <input ref={model_name} type="text" onChange={e => props.MaintainForm({...props.product_form,model_name:e.target.value})} className='my-form-input' placeholder='Passion plus'/>
        </div>

        <p className="my-form-label mt-3">Kilometers Driven*</p>
        <p className="m-1 ms-3 form-error">{props.form_errors?.km_driven_error ? props.form_errors.km_driven_error : null }</p>
        
        <div className="battery-health fuel">
            <input ref={km_driven} min={1} type="number" onChange={e => props.MaintainForm({...props.product_form,km_driven:Number(e.target.value)})} placeholder='81' />
            <p className='p-percent'>Kms</p>
        </div>

        <p className="my-form-label mt-3">Year*</p>
        <p className="m-1 ms-3 form-error">{props.form_errors?.year_error ? props.form_errors.year_error : null }</p>

        <div className="battery-health fuel">
            <input ref={year} type="number" min={1} onChange={e => props.MaintainForm({...props.product_form,year:Number(e.target.value)})} placeholder='2000' />
            <p className='p-percent'>Yr</p>
        </div>

    </div>
  )
}

export default Scooter