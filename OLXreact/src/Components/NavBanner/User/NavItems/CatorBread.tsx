import { Link, useNavigate } from 'react-router-dom';
import './Nav-Cat.css'
import carimage from './type_car.png'
import bikeimage from './type_bike.png'
import propertyimage from './type_property.png'
import mobileimage from './type_mobile.png'
import accessoryimage from './type_accessory.png'
import { Dispatch, SetStateAction, useContext, useRef } from 'react';
import { userContext } from '../UserApp';

type breadprops = {
    context ?: {
      category ?: string | null
      title ?: string
    },
    noBanner?:boolean,
}


function CatorBread(props:breadprops) {
  const url = useNavigate()
  const {setSearchQuery} = useContext(userContext)

  const searchinp = useRef<HTMLInputElement>(null)

    function handleSearch(){
      if (searchinp.current?.value == '') return
      setSearchQuery ? setSearchQuery(searchinp.current?.value ? searchinp.current.value : null) : null
    }
    
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

    <div id="searchbar2" className='d-md-none ms-1 me-1 mt-1 mb-2'>
        <input type="text" ref={searchinp} className='w-100' placeholder='Find Cars, Mobile Phones and more...' />

        <div className="search-icon-div ms-auto" >

            <svg width="24px" onClick={e=>{url('/');handleSearch();}} height="24px" viewBox="0 0 1024 1024" data-aut-id="icon" fillRule="evenodd"><path className="rui-2lrc2" d="M448 725.333c-152.917 0-277.333-124.416-277.333-277.333s124.416-277.333 277.333-277.333c152.917 0 277.333 124.416 277.333 277.333s-124.416 277.333-277.333 277.333v0zM884.437 824.107v0.021l-151.915-151.936c48.768-61.781 78.144-139.541 78.144-224.192 0-199.979-162.688-362.667-362.667-362.667s-362.667 162.688-362.667 362.667c0 199.979 162.688 362.667 362.667 362.667 84.629 0 162.411-29.376 224.171-78.144l206.144 206.144h60.352v-60.331l-54.229-54.229z">
            </path>
            </svg>

        </div>

    </div>
    <div id='breadcrumbsdiv'>
        <div className='text-center' onClick={e=>{url('/category/mobiles',{state:{'category':'Mobile'}})}}>
          <img className='d-sm-none' src={mobileimage} width={48} height={48} alt="" />
          <p className="breadcrumb-text f-small" >Mobiles</p>
        </div>

        <div className='text-center' onClick={e=>url('/category/cars',{state:{'category':'Car'}})}>
          <img className='d-sm-none' src={carimage} width={48} height={48} alt="" />
          <p className="breadcrumb-text f-small" >Cars</p>
        </div>

        <div className='text-center' onClick={e=>url('/category/scooters',{state:{'category':'Scooter'}})}>
          <img className='d-sm-none' src={bikeimage} width={48} height={48} alt="" />
          <p className="breadcrumb-text f-small" >Scooter</p>
        </div>
        <div className='text-center' onClick={e=>url('/category/Properties',{state:{'category':'Property'}})}>
          <img className='d-sm-none' src={propertyimage} width={48} height={48} alt="" />
          <p className="breadcrumb-text f-small" >Properties</p>
        </div>
        <div className='text-center' onClick={e=>url('/category/accessories',{state:{'category':'Accessory'}})}>
          <img className='d-sm-none' src={accessoryimage} width={48} height={48} alt="" />
          <p className="breadcrumb-text f-small">Accessories</p>
        </div>

        {/* <a className="breadcrumb-text" onClick={e=>url('/category/motorcycles',{state:{'category':'Scooter'}})}>MotorCycles</a> */}

    </div>

    {
      props.noBanner ? null :
      <img className='d-none d-md-block' src="https://statics.olx.in/olxin/banners/hero_bg_in_v4@1x.png" alt="" id="banner" />
    }
    </div>
    

  )
}

export default CatorBread