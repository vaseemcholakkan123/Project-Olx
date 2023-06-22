import { useState } from 'react'
import './sellForm.css'
import CommonAd from './CommonAd'
import { form_child } from '../Validators'

const brands = ['Maruti Suzuki','Hyundai','Tata','Mahindra','Toyota','Honda','Audi','Bmw','Lexus','Porsche']
const transmission_types = ['Automatic','Manual']
const fuel_types = ['CNG & Hybrids','Diesel','Electric' , 'LPG' , 'Petrol']
const looper = [1,2,3,4]

function Car(props:form_child) {

    const [selectedTransmissionType,setTransmissionType] = useState<string|null>(null)
    const [fuel_type,setFuelType] = useState<string|null>(null)
    const [ownerCount,setOwnerCount] = useState<number|null>(null)

  return (
    <div className='ps-2'>
        <p className="my-form-label">Brand*</p>
        <p className="m-1 ms-3 form-error">{props.form_errors?.brand_error ? props.form_errors.brand_error : null }</p>


        <div className="m-3 mt-2">
            <select name="cars" id="cars" onChange={e => {props.MaintainForm({...props.product_form,brand:e.target.value});console.log(e.target.value);
            }} className='select-form'>
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
            <input type="text" onChange={e => {props.MaintainForm({...props.product_form,model_name:e.target.value})}} className='my-form-input' placeholder='Alto 800'/>
        </div>

        <p className="my-form-label mt-3">Kilometers Driven*</p>
        <p className="m-1 ms-3 form-error">{props.form_errors?.km_driven_error ? props.form_errors.km_driven_error : null }</p>

        <div className="battery-health fuel">
            <input type="number" min={1} onChange={e => props.MaintainForm({...props.product_form,km_driven:Number(e.target.value)})} placeholder='50001' />
            <p className='p-percent'>Kms</p>
        </div>

        <p className="my-form-label mt-3">Transmission*</p>
        <p className="m-1 ms-3 form-error">{props.form_errors?.transmission_type_error ? props.form_errors.transmission_type_error : null }</p>
        
        <div className="typeContain m-2 ps-3 row gap-2">
            {
                transmission_types.map(item=>{
                    return(
                        <div key={item} className={selectedTransmissionType == item ? 'type active_item' : "type"} onClick={()=>{setTransmissionType(item);props.MaintainForm({...props.product_form,transmission_type:item})}}>
                            <p>{item}</p>
                        </div>
                    )
                })
            }
        </div>

        <p className="my-form-label mt-3">Fuel Type*</p>
        <p className="m-1 ms-3 form-error">{props.form_errors?.fuel_type_error ? props.form_errors.fuel_type_error : null }</p>

            <div className="typeContain m-2 ps-3 row gap-2">
            {
                fuel_types.map(item=>{
                    return(
                        <div key={item} className={fuel_type == item ? 'type active_item' : "type"} onClick={()=>{setFuelType(item);props.MaintainForm({...props.product_form,fuel_type:item})}}>
                            <p>{item}</p>
                        </div>
                    )
                })
            }
        </div>

        <p className="my-form-label">No. of Owners*</p>
        <p className="m-1 ms-3 form-error">{props.form_errors?.no_of_owners_error ? props.form_errors.no_of_owners_error : null }</p>

         <div className="typeContain extra-p m-2 ps-3 row gap-2">

            {
                looper.map((i)=>{
                    return(
                        <div key={i} className={ownerCount == i ? 'type active_item' : 'type'} onClick={()=>{setOwnerCount(i);props.MaintainForm({...props.product_form,no_of_owners:i})}}>
                            <p>{i}</p>
                        </div>
                    )
                })
            }

            <div className={ownerCount == 5 ? 'type active_item' : 'type'} onClick={()=>{setOwnerCount(5);props.MaintainForm({...props.product_form,no_of_owners:5})}}>
                <p>4 +</p>
            </div>
            
        </div>

        
    </div>
  )
}

export default Car