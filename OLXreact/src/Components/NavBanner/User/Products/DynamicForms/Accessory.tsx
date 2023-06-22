import { useState } from 'react'
import './sellForm.css'
import CommonAd from './CommonAd'
import { form_child } from '../Validators'

const types = ['Mobile' , 'Tablet']

function Accessory(props:form_child) {

    const [selectedAccessoryType,setAccessoryType] = useState<string|null>(null)
  return (
    <div className='ps-2'>
        <p className="my-form-label">Type*</p>
        <p className="m-1 ms-3 form-error">{props.form_errors?.accessory_type_error ? props.form_errors.accessory_type_error : null }</p>

        <div className="typeContain m-2 ps-3 row gap-2">
            {
                types.map(item=>{
                    return(
                        <div key={item} className={selectedAccessoryType == item ? 'type active_item' : "type"} onClick={()=>{setAccessoryType(item);props.MaintainForm({...props.product_form,accessory_type:item})}}>
                            <p>{item}</p>
                        </div>
                    )
                })
            }
        </div>

    </div>
  )
}

export default Accessory