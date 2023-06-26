import { useEffect, useRef } from 'react'
import { form_child } from '../Validators'
import './sellForm.css'
import { useLocation } from 'react-router-dom'


function CommonAd(props:form_child) {
  const RouterState = useLocation()
  const title = useRef<HTMLInputElement>(null)
  const description = useRef<HTMLTextAreaElement>(null)
  useEffect(()=>{
    if (RouterState.state){
      title.current ? title.current.value = props.product_form.title ? props.product_form.title : '' : null
      description.current ? description.current.value = props.product_form.description ? props.product_form.description : '' : null
    }
  })
  return (
    <div className='m-2 mt-2'>
        <p className="my-form-label">Ad Title*</p>
        <p className="ms-3 form-error">{props.form_errors?.title ? props.form_errors.title : null }</p>
        <input ref={title} type="text" placeholder='Super Product' onChange={e => {props.MaintainForm({...props.product_form,title:e.target.value})}} className="my-form-input m-2" />

        <p className="my-form-label mt-2">Ad Description*</p>
        <p className="ms-3 form-error">{props.form_errors?.description ? props.form_errors.description : null }</p>
        <textarea ref={description} rows={3} cols={50} onChange={e => {props.MaintainForm({...props.product_form,description:e.target.value})}} className="my-form-input m-2" placeholder="It's a super product.." />
    </div>
  )
}

export default CommonAd