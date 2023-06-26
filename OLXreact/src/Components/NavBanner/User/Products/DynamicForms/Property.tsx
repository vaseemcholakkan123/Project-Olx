import { useEffect, useState } from "react"
import './sellForm.css'
import CommonAd from "./CommonAd"
import { form_child } from "../Validators"
import { useLocation } from "react-router-dom"

const   building_types = ['Apartments' , 'Builder Floors' , 'Farm Houses' , 'Houses & Villas']
const looper = [1,2,3,4]

function Property(props:form_child) {

  const [selectedBuildingType,setBuildingType] = useState<string|null>(null)
  const [BathroomCount,setBathroomCount] = useState<number|null>(null)
  const [BedroomCount,setBedroomCount] = useState<number|null>(null)
  const RouterState = useLocation()


  useEffect(()=>{
    if (RouterState.state){
        setBuildingType(props.product_form.building_type ? props.product_form.building_type : null)
        setBedroomCount(props.product_form.bedrooms ? props.product_form.bedrooms : null)
        setBathroomCount(props.product_form.bathrooms ? props.product_form.bathrooms : null)
    }
  })

  return (
    <div className='ps-3'>
        <p className="my-form-label">Type*</p>
        <p className="m-1 ms-3 form-error">{props.form_errors?.building_type_error ? props.form_errors.building_type_error : null }</p>
        <div className="typeContain m-2 ps-3 row gap-2">
            {
                building_types.map(item=>{
                    return(
                        <div key={item} className={selectedBuildingType == item ? 'type active_item' : "type"} onClick={(e)=>{setBuildingType(item);props.MaintainForm({...props.product_form,building_type:item})}}>
                            <p>{item}</p>
                        </div>
                    )
                })
            }
        </div>

        <p className="my-form-label mt-2">Bedrooms*</p>
        <p className="m-1 ms-3 form-error">{props.form_errors?.bedroom_count_error ? props.form_errors.bedroom_count_error : null }</p>

        <div className="typeContain extra-p m-2 ps-3 row gap-2">

            {
                looper.map((i)=>{
                    return(
                        <div key={i} className={BedroomCount == i ? 'type active_item' : 'type'} onClick={()=>{setBedroomCount(i);props.MaintainForm({...props.product_form,bedrooms:i})}}>
                            <p>{i}</p>
                        </div>
                    )
                })
            }

            <div className={BedroomCount == 5 ? 'type active_item' : 'type'} onClick={()=>{setBedroomCount(5);props.MaintainForm({...props.product_form,bedrooms:5})}}>
                <p>4 +</p>
            </div>
            
        </div>

        <p className="my-form-label mt-2">Bathrooms*</p>
        <p className="m-1 ms-3 form-error">{props.form_errors?.bathroom_count_error ? props.form_errors.bathroom_count_error : null }</p>

        <div className="typeContain extra-p m-2 ps-3 row gap-2">

            {
                looper.map((i)=>{
                    return(
                        <div key={i} className={BathroomCount == i ? 'type active_item' : 'type'} onClick={()=>{setBathroomCount(i);props.MaintainForm({...props.product_form,bathrooms:i})}}>
                            <p>{i}</p>
                        </div>
                    )
                })
            }

            <div className={BathroomCount == 5 ? 'type active_item' : 'type'} onClick={()=>{setBathroomCount(5);props.MaintainForm({...props.product_form,bathrooms:5})}}>
                <p>4 +</p>
            </div>
            
        </div>


    </div>
  )
}

export default Property