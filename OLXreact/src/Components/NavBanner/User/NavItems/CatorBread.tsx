import { Link, useNavigate } from 'react-router-dom';
import './Nav-Cat.css'
type breadprops = {
    context ?: {
      category ?: string | null
      title ?: string
    },
    noBanner?:boolean
}

function CatorBread(props:breadprops) {
  const url = useNavigate()
  return (
    props.context?.title ? 


    <div className='d-flex bread-div a-center'>

      <Link className='p-1 link' to={'/'}>Home</Link>

      <p>{'>'}</p>

      <Link className='p-1 link' state={{'category':props.context?.category}} to={`/category/${props.context?.category}`}>{`${props.context?.category}`}</Link>

      <p className='f-medium m-0'>{`> ${props.context?.title}`}</p>

    </div>


    :

    <div>
    <div id='breadcrumbsdiv'>
        <a className="breadcrumb-text" onClick={e=>{url('/category/mobiles',{state:{'category':'Mobile'}})}}>Mobiles</a>
        <a className="breadcrumb-text" onClick={e=>url('/category/cars',{state:{'category':'Car'}})}>Cars</a>
        <a className="breadcrumb-text" onClick={e=>url('/category/accessories',{state:{'category':'Accessory'}})}>Accessories</a>
        {/* <a className="breadcrumb-text" onClick={e=>url('/category/motorcycles',{state:{'category':'Scooter'}})}>MotorCycles</a> */}
        <a className="breadcrumb-text" onClick={e=>url('/category/Properties',{state:{'category':'Property'}})}>Properties</a>
        <a className="breadcrumb-text" onClick={e=>url('/category/scooters',{state:{'category':'Scooter'}})}>Scooter</a>

    </div>

    {
      props.noBanner ? null :
      <img src="https://statics.olx.in/olxin/banners/hero_bg_in_v4@1x.png" alt="" id="banner" />
    }
    </div>
    

  )
}

export default CatorBread