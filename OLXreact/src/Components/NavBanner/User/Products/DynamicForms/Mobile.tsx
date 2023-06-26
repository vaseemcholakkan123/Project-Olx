import { useLocation } from 'react-router-dom'
import { form_child } from '../Validators'
import CommonAd from './CommonAd'
import './sellForm.css'
import { useEffect, useRef } from 'react'

const brands = ['iPhone','Samsung','Oppo','Realme','Vivo']


function Mobile(props:form_child) {
    const RouterState = useLocation()
    const brand_select = useRef<HTMLSelectElement>(null)
    const model_name = useRef<HTMLInputElement>(null)
    const battery_health = useRef<HTMLInputElement>(null)
    const years_used = useRef<HTMLInputElement>(null)

    useEffect(()=>{
        if(RouterState.state){
            brand_select.current ? brand_select.current.value = props.product_form.brand ? props.product_form.brand : '' : null 
            model_name.current ? model_name.current.value = props.product_form.model_name ? props.product_form.model_name : '' : null 
            years_used.current ? years_used.current.value = props.product_form.years_used ? String(props.product_form.years_used) : '' : null 
            battery_health.current ? battery_health.current.value = props.product_form.battery_health ? String(props.product_form.battery_health) : '' : null 
        }
    })
  return (
    <div className='ps-2'>
        <p className="my-form-label">Brand*</p>

        <div className="m-3 mt-2">
            <p className="ms-3 form-error">{props.form_errors?.brand_error ? props.form_errors.brand_error : null }</p>

            <select ref={brand_select} onChange={e => props.MaintainForm({...props.product_form,brand:e.target.value})} name="cars" id="cars" className='select-form'>
                    <option>Select</option>
            {
                brands.map(item=>{
                    return(
                        <option key={item}>{item}</option>
                    )
                })
            }
            </select>
        </div>

        <p className="my-form-label">Model Name*</p>
        <p className="ms-3 form-error">{props.form_errors?.model_name_error ? props.form_errors.model_name_error : null }</p>

        <div className="m-3 mt-2">
            <input ref={model_name} type="text" onChange={e => {props.MaintainForm({...props.product_form,model_name:e.target.value});}} className='my-form-input' placeholder='note 9'/>
        </div>

        <p className="my-form-label mt-3">Battery Health*</p>
        <p className="ms-3 form-error">{props.form_errors?.battery_health_error ? props.form_errors.battery_health_error : null }</p>


        <div className="battery-health">
            <input ref={battery_health} type="number" min={1} onChange={e => props.MaintainForm({...props.product_form,battery_health:Number(e.target.value)})} placeholder='81' />
            <p className='p-percent'>%</p>
        </div>

        <p className="my-form-label mt-3">Years Used*</p>
        <p className="ms-3 form-error">{props.form_errors?.years_used_error ? props.form_errors.years_used_error : null }</p>

        <div className="battery-health">
            <input ref={years_used} type="number" min={1} onChange={e => props.MaintainForm({...props.product_form,years_used:Number(e.target.value)})} placeholder='2' />
            <p className='p-percent'>Yrs</p>
        </div>

 
    </div>
  )
}

export default Mobile