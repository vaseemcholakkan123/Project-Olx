import { form_child } from '../Validators'
import './sellForm.css'


function CommonAd(props:form_child) {
  return (
    <div className='m-2 mt-2'>
        <p className="my-form-label">Ad Title*</p>
        <p className="ms-3 form-error">{props.form_errors?.title ? props.form_errors.title : null }</p>
        <input type="text" placeholder='Super Product' onChange={e => {props.MaintainForm({...props.product_form,title:e.target.value})}} className="my-form-input m-2" />

        <p className="my-form-label mt-2">Ad Description*</p>
        <p className="ms-3 form-error">{props.form_errors?.description ? props.form_errors.description : null }</p>
        <textarea rows={3} cols={50} onChange={e => {props.MaintainForm({...props.product_form,description:e.target.value})}} className="my-form-input m-2" placeholder="It's a super product.." />
    </div>
  )
}

export default CommonAd