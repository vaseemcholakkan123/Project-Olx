import { form_child } from '../Validators'
import CommonAd from './CommonAd'
import './sellForm.css'

const brands = ['Bajaj','Hero','Honda','Mahindra','Suzuki','TVS']

function Scooter(props:form_child) {
  return (
     <div className='ps-2'>
        <p className="my-form-label">Brand*</p>
        <p className="m-1 ms-3 form-error">{props.form_errors?.brand_error ? props.form_errors.brand_error : null }</p>


        <div className="m-3 mt-2">
            <select name="cars" id="cars" onChange={e => {props.MaintainForm({...props.product_form,brand:e.target.value})}} className='select-form'>
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
            <input type="text" onChange={e => props.MaintainForm({...props.product_form,model_name:e.target.value})} className='my-form-input' placeholder='Passion plus'/>
        </div>

        <p className="my-form-label mt-3">Kilometers Driven*</p>
        <p className="m-1 ms-3 form-error">{props.form_errors?.km_driven_error ? props.form_errors.km_driven_error : null }</p>
        
        <div className="battery-health fuel">
            <input min={1} type="number" onChange={e => props.MaintainForm({...props.product_form,km_driven:Number(e.target.value)})} placeholder='81' />
            <p className='p-percent'>Kms</p>
        </div>

        <p className="my-form-label mt-3">Year*</p>
        <p className="m-1 ms-3 form-error">{props.form_errors?.year_error ? props.form_errors.year_error : null }</p>

        <div className="battery-health fuel">
            <input type="number" min={1} onChange={e => props.MaintainForm({...props.product_form,year:Number(e.target.value)})} placeholder='2000' />
            <p className='p-percent'>Yr</p>
        </div>

    </div>
  )
}

export default Scooter