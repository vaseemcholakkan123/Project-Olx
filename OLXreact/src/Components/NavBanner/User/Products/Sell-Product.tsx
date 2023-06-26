import { useState,useContext, useEffect, useRef } from 'react'
import '../User/user.css'
import { location } from '../NavItems/Strict Navbar/Navbar'
import { useLocation, useNavigate } from 'react-router-dom'
import Mobile from './DynamicForms/Mobile'
import Property from './DynamicForms/Property'
import Car from './DynamicForms/Car'
import Scooter from './DynamicForms/Scooter'
import Accessory from './DynamicForms/Accessory'
import './DynamicForms/sellForm.css'
import { baseform_error_type, productform, validate_base_form } from './Validators'
import CommonAd from './DynamicForms/CommonAd'
import olxAxios from '../../../../Config/AxiosConfig'
import { userContext } from '../UserApp'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { NotifyUpdateSuccess } from '../Helper'


const category = [
    {
     'title' : 'Mobile',
     'svg' : <svg width="30px" height="30px" viewBox="0 0 1024 1024" data-aut-id="icon" className="no-m" fillRule="evenodd"><path className="rui-UJ1uk" d="M743.68 85.333l66.987 67.84v701.227l-63.573 84.267h-471.253l-62.507-85.333v-700.373l67.627-67.627h462.72zM708.053 170.667h-391.893l-17.493 17.707v637.653l20.053 27.307h385.92l21.333-27.52v-637.653l-17.92-17.493zM512 682.667c23.564 0 42.667 19.103 42.667 42.667s-19.103 42.667-42.667 42.667c-23.564 0-42.667-19.103-42.667-42.667s19.103-42.667 42.667-42.667z"></path></svg>
    },
    {
        'title' : 'Car',
        'svg' : <svg width="30px" height="30px" viewBox="0 0 1024 1024" data-aut-id="icon" className="no-m" fillRule="evenodd"><path className="rui-UJ1uk" d="M744.747 124.16l38.4 33.28 36.949 258.731 107.221 107.179 11.349 27.435v193.963l-38.827 38.784h-38.741v116.352h-77.568v-116.352h-543.061v116.352h-77.568v-116.352h-38.741l-38.827-38.827v-193.877l11.349-27.435 107.264-107.221 36.949-258.731 38.4-33.28h465.493zM768.555 474.325h-513.109l-92.544 92.501v139.093h698.197v-139.093l-92.544-92.501zM298.667 550.784c32.128 0 58.197 26.027 58.197 58.197 0 32.128-26.027 58.155-58.197 58.155-32.128 0-58.197-26.027-58.197-58.155s26.027-58.197 58.197-58.197zM725.333 550.784c32.128 0 58.197 26.027 58.197 58.197 0 32.128-26.027 58.155-58.197 58.155-32.128 0-58.197-26.027-58.197-58.155s26.027-58.197 58.197-58.197zM711.083 201.685h-398.165l-27.904 195.115h453.888l-27.861-195.072z"></path></svg>
    },
    {
        'title' : 'Accessory',
        'svg' : <svg width="30px" height="30px" viewBox="0 0 1024 1024" data-aut-id="icon" className="no-m" fillRule="evenodd"><path className="rui-UJ1uk" d="M777.049 133.012l69.146 7.353 48.548 49.856 5.553 69.297-95.903 93.421-60.089-6.386-24.218 23.781c19.044 29.22 29.447 63.633 29.447 98.728 0 84.059-57.645 154.894-135.469 175.074 2.028 12.791 3.050 25.676 3.050 38.544 0 138.711-112.843 251.535-251.535 251.535-187.504 0-327.75-206.226-205.791-403.793 74.207-77.997 153.737-106.060 231.734-97.893 16.941-82.279 89.952-144.318 177.158-144.318 24.407 0 48.093 4.794 70.397 14.231v0l4.301 2.141 22.285 12.98 21.602-21.223-0.568-0.587-5.553-69.335 95.903-93.402zM568.679 364.005c-57.948 0-105.057 47.128-105.057 105.057 0 1.346 0.114 2.69 0.208 4.017v0l3.393 56.469-51.808-15.291c-16.373-4.831-33.124-7.297-49.837-7.297-138.008 0-239.388 159.952-128.478 304.214 144.261 110.91 304.214 9.551 304.214-128.497 0-19.517-3.412-39.093-10.119-58.213v0l-18.324-52.206 57.626 1.914c56.109-0.057 103.237-47.185 103.237-105.113 0-15.386-3.544-30.034-9.779-43.603v0l-115.498 113.451-44.171-6.783-8.944-47.298 114.246-112.2-2.103-1.233c-12.317-4.907-25.354-7.391-38.809-7.391zM367.141 573.986c54.271 0 98.271 44 98.271 98.271s-44 98.252-98.271 98.252c-54.271 0-98.271-43.981-98.271-98.252s44-98.271 98.271-98.271zM804.43 212.125l-44.892 43.754 0.53 6.556 10.384 10.668 6.556 0.7 44.892-43.735-0.53-6.537-10.403-10.687-6.537-0.719z"></path></svg>
    },
    {
        'title'  : 'Property',
        'svg' : <svg width="30px" height="30px" viewBox="0 0 1024 1024" data-aut-id="icon" className="no-m" fillRule="evenodd"><path className="rui-UJ1uk" d="M356.848 85.333l271.515 179.315v174.318h248.824l61.479 60.925v377.85l-61.479 60.925h-730.376l-61.479-60.925v-613.093l271.515-179.315zM356.848 177.586l-193.939 128.192v540.060l16.097 15.952h100.267v-192.192h155.152v192.192h116.364v-556.012l-193.939-128.192zM844.994 515.844h-216.63v345.946h216.63l16.097-15.952v-314.042l-16.097-15.952zM783.316 640v85.333h-85.333v-85.333h85.333zM352 432c29.455 0 53.333 23.878 53.333 53.333s-23.878 53.333-53.333 53.333c-29.455 0-53.333-23.878-53.333-53.333s23.878-53.333 53.333-53.333z"></path></svg>
    },
    {
        'title' : 'Scooter',
        'svg' : <svg width="30px" height="30px" viewBox="0 0 1024 1024" data-aut-id="icon" className="no-m" fillRule="evenodd"><path className="rui-UJ1uk" d="M674.657 245.333l47.813 129.715 23.448-51.706h51.11l26.563 33.51v80.171h-78.406l26.746 72.064h9.892c75.576 0 136.843 60.253 136.843 134.579s-61.267 134.579-136.843 134.579c-59.691-0.227-112.346-38.479-130.112-94.523s3.455-116.947 52.44-150.495v0l2.931-1.982-28.578-78.189-77.49 225.74h-167.070v3.243c-19.579 65.476-85.893 106.172-154.3 94.693s-117.248-71.498-113.643-139.654c3.605-68.156 58.515-122.867 127.764-127.303s130.911 42.808 143.476 109.928v0 3.783h122.554l22.716-66.839h-121.455l-61.735-80.171h-197.662l-58.071 132.598-36.638 9.008-21.616-28.826 69.796-168.089h228.255l64.849-62.696h196.197l-16.304-44.319h-89.763v-68.821h136.294zM796.845 577.368l25.463 69.362-20.884 31.888-43.233-6.306-26.746-75.307-5.129 6.846v0.54c-17.559 23.523-17.878 55.449-0.79 79.306s47.76 34.314 76.196 25.976c28.435-8.338 48.277-33.608 49.289-62.772s-17.032-55.706-44.823-65.931v0l-9.343-3.603zM365.248 616.823c-12.157-27.922-41.767-44.432-72.372-40.354s-54.681 27.74-58.847 57.836c-4.166 30.096 12.603 59.227 40.986 71.201s61.403 3.848 80.707-19.861v0l5.862-7.387-85 0.18v-57.111l29.86-18.016 30.41 19.818h31.142zM627.943 413.233h-153.88l-31.142 33.568 32.791 46.432h128.233l23.998-80zM318.667 345.333v66.667h-133.333v-66.667h133.333z"></path></svg>
    }
]



const img_looper = [1,2,3]



function SellProduct() {
    const {userData} = useContext(userContext)
    const [productForm,MaintainForm] = useState<productform>(
        {
            title:null,
            description:null,
            related_images:[],
            category:null,
            price:null,
            ad_location:null
        }
    )
    const [form_errors,ValidateForm] = useState<baseform_error_type>({'has_no_error':null})
    const [loading,setLoading]=  useState(false)
    const [selectedCategory,selectCategory] = useState<string|null>(null)
    const [selectedLocation,selectLocation] = useState<string|null>(null)
    const url = useNavigate()
    const [images,setImages] = useState<string[]>([]) 
    const Routerstate = useLocation()
    const priceInp = useRef<HTMLInputElement>(null)
    // const [imagesList,SetImageList] = useState<{image:string,id:number}|null>(null)

    const NotifySuccess = () => toast.success("Ad Posted Successfully !",
                    { position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    progressStyle:{color:'red'},
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light", })

    const NotifyFailure = (err:any) => toast.error(err,
                    { position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    progressStyle:{color:'red'},
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light", })


    function handleSubmit(){

        if (Routerstate.state){

            validate_base_form({appendBaseFormErr:ValidateForm,form:productForm,errors:form_errors})
            if (!form_errors.has_no_error) return;
            setLoading(true)
            let cat_link = productForm.category == 'Properties' ? 'Property' : productForm.category  
            let submitUrl = `ads-${cat_link}/${Routerstate.state.editAd}/`
            productForm.posted_user = userData.user_id
            if (productForm.category == 'Property') productForm.category = 'Properties'
            

            olxAxios.put(submitUrl,
                    productForm,
                    {headers:{'Content-Type':'multipart/form-data'}})
            .then(res => {
                setLoading(false);
                NotifyUpdateSuccess()
                url('/')
            }
            ).catch(err => {
                console.log(err.response.data);
                
                let errs:any = Object.values(err.response?.data)[0]
                NotifyFailure(errs[0])
                setLoading(false)
            }
            )

        }else{
            validate_base_form({appendBaseFormErr:ValidateForm,form:productForm,errors:form_errors})
            if (!form_errors.has_no_error) return;
            setLoading(true)
            
            let submitUrl = `ads-${productForm.category}/`
            productForm.posted_user = userData.user_id
            if (productForm.category == 'Property') productForm.category = 'Properties'

            olxAxios.post(submitUrl,
                    productForm,
                    {headers:{'Content-Type':'multipart/form-data'}})
            .then(res => {
                setLoading(false);
                NotifySuccess()
                url('/')
            }
            ).catch(err => {
                let errs:any = Object.values(err.response?.data)[0]
                NotifyFailure(errs[0])
                setLoading(false)
            }
            )
        }

    }

    useEffect(()=>{
        if(Routerstate.state){
            
            let edit_category = Routerstate.state.category == 'Properties' ? 'Property' : Routerstate.state.category
             
           olxAxios.get(`ads-${edit_category}/${Routerstate.state.editAd}`)
           .then(res=>{
                let images = []
            
                for (let index = 0; index < 3; index++) images.push(res.data.related_images[index].image)

                MaintainForm(
                    {
                        title : res.data.title,
                        model_name : res.data.model_name ? res.data.model_name : null,
                        battery_health : res.data.battery_health ? res.data.battery_health : null,
                        years_used : res.data.years_used ? res.data.years_used : null,
                        brand : res.data.brand ? res.data.brand : null,
                        accessory_type : res.data.accessory_type ? res.data.accessory_type : null,
                        km_driven : res.data.km_driven ? res.data.km_driven : null,
                        year : res.data.year ? res.data.year : null,
                        transmission_type : res.data.transmission_type ? res.data.transmission_type : null,
                        fuel_type : res.data.fuel_type ? res.data.fuel_type : null,
                        no_of_owners : res.data.no_of_owners ? res.data.no_of_owners : null, 
                        price : res.data.price,
                        category : res.data.category,
                        building_type : res.data.building_type ? res.data.building_type : null,
                        bedrooms : res.data.bedrooms ? res.data.bedrooms : null,
                        bathrooms : res.data.bathrooms ? res.data.bathrooms : null,
                        description : res.data.description,
                        ad_location : res.data.ad_location,
                        related_images : images,
                    })
                selectCategory(res.data.category == 'Properties' ? 'Property' : res.data.category)
                setImages(images)
                priceInp.current ? priceInp.current.value = res.data.price : null
                selectLocation(res.data.ad_location)
           })
           .catch(err=>{
            NotifyFailure('Internal error,Pls try again later')
            url('/')
           })

        }
    },[])

  return (
    <div className='container-fluid'>
        <div className="main-body d-block">
        <h4 className='text-center m-2 mb-3'>POST YOUR AD</h4>
        <div className="form-el border-nobottom d-flex">
            <h4>SELECT A CATEGORY</h4>
            <p className="ms-3 form-error" style={{'alignSelf':'center'}}>{form_errors?.category_error ? 'select a category' : null }</p>
            {/* { !selectedCategory ? <p className="my-form-label ms-auto has-decor">change category</p> : null} */}
        </div>
        <div className="form-el border-noup border-nobottom">
            <div className="category-selection-post-ad-container row gx-3 gy-3">
            {
                category.map(cat=>{
                    return(
                            <div key={cat.title} className="category-selection-post-ad col-md-6 col-12" onClick={()=>{selectCategory(cat.title); MaintainForm({...productForm,category:cat.title})}}>
                                {cat.svg}
                                <p>{cat.title}</p>
                                <svg style={{'margin':'.5rem 0'}} version="1.1" id="Capa_1" width={40} height={40} xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 50 50" >
                                    <circle style={{'fill':selectedCategory === cat.title ? '#25AE88' : 'gray'}} cx="25" cy="25" r="25"/>
                                    <polyline style={{'fill':'none','stroke':'#FFFFFF','strokeWidth':2,'strokeLinecap':'round','strokeLinejoin':'round','strokeMiterlimit':10}} points="38,15 22,33 12,25 "/>
                                </svg>
                            </div>
                        
                    )
                })
            }
            </div>
        </div>
        <div className='form-el border-noup'>

            <h4>{!selectedCategory ? 'SELECT A CATEGORY' : 'INCLUDE SOME DETAILS' }</h4>

            {
                selectedCategory == 'Mobile' ? 

                <Mobile  MaintainForm={MaintainForm} form_errors={form_errors} product_form={productForm}/>  
                :
                selectedCategory == 'Car' ? 
                <Car  MaintainForm={MaintainForm} form_errors={form_errors} product_form={productForm}/>
                :
                selectedCategory == 'Scooter' ? 
                <Scooter  MaintainForm={MaintainForm} form_errors={form_errors} product_form={productForm}/>
                :
                selectedCategory == 'Accessory' ?
                <Accessory  MaintainForm={MaintainForm} form_errors={form_errors} product_form={productForm}/>
                :
                selectedCategory == 'Property' ?
                <Property MaintainForm={MaintainForm} form_errors={form_errors} product_form={productForm}/>
                :
                null
            }

            {selectedCategory ? <CommonAd product_form={productForm} MaintainForm={MaintainForm} form_errors={form_errors}/> : null}
        </div>
        <div className="form-el border-noup border-nobottom">
            <h4>SET A PRICE</h4>
            <p className="ms-3 form-error">{form_errors?.price_error ? form_errors.price_error : null }</p>

            <p className="my-form-label">Price*</p>
            <div className="price-input">
                <p>₹</p>
                <input ref={priceInp} type="number" min={1} placeholder='100' onChange={e=>{MaintainForm({...productForm,price:Number(e.target.value)})}} />
            </div>
        </div>
        <div className="form-el border-noup nopadding-formel-md border-nobottom">
            <h4 className='ms-2'>UPLOAD 3 related_images</h4>
            <p className="m-1 ms-3 form-error">{form_errors?.photo_error ? form_errors.photo_error : null }</p>

            <div className="images-container" id='addphotos'>
                {
                    img_looper.map((i,ind)=>{
                        
                        return (
                            images[ind]  ? 
                            <div key={ind} className='form-image-container' >
                                <img className='form-images'width={100} height={100} src={images[ind]} alt="" />

                                <svg onClick={()=>{
                                    images.splice(ind,1);
                                    setImages(images);
                                    productForm.related_images.splice(ind,1)
                                    MaintainForm({...productForm,related_images:productForm.related_images})
                                }}
                                 xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" className="form-svg bi bi-x-circle-fill" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                                </svg>
                            </div>
                            : 
                            <label key={ind+1} htmlFor="images">
                            <svg key={ind} width="36px" height="36px" viewBox="0 0 1024 1024" data-aut-id="icon" className="" fillRule="evenodd"><path className="rui-i1ika" d="M861.099 667.008v78.080h77.568v77.653h-77.568v77.141h-77.568v-77.184h-77.611v-77.611h77.611v-78.080h77.568zM617.515 124.16l38.784 116.437h165.973l38.827 38.827v271.659l-38.827 38.357-38.741-38.4v-232.832h-183.125l-38.784-116.48h-176.853l-38.784 116.48h-183.083v426.923h426.667l38.784 38.357-38.784 39.253h-465.493l-38.741-38.869v-504.491l38.784-38.827h165.973l38.827-116.437h288.597zM473.216 318.208c106.837 0 193.92 86.955 193.92 194.048 0 106.923-87.040 194.091-193.92 194.091s-193.963-87.168-193.963-194.091c0-107.093 87.083-194.048 193.963-194.048zM473.216 395.861c-64.213 0-116.352 52.181-116.352 116.395 0 64.256 52.139 116.437 116.352 116.437 64.171 0 116.352-52.181 116.352-116.437 0-64.213-52.181-116.437-116.352-116.437z"></path></svg>
                            </label>
                        )
                    })
                }
            </div>
            
            <input multiple onChange={(e)=>{
                let loc_img:File[] = []
                let loc_img_string = []
                if(e.target.files){
                
                    let len = e.target.files.length < 4 ? e.target.files.length : 3

                    for (let index = 0; index < len; index++) {
                        loc_img_string.push(URL.createObjectURL(e.target.files[index]))
                        loc_img.push(e.target.files[index])
                    }
                }

                setImages([...images,...loc_img_string])
                MaintainForm({...productForm,related_images:[...productForm.related_images,...loc_img]})
                
            }} type="file" accept="image/png, image/gif, image/jpeg ,image/webp" style={{display:'none'}} id='images' aria-labelledby='addphotos' />

        </div>
        <div className="form-el border-noup border-nobottom">
            <h4 className='mb-3'>SELECT LOCATION</h4>
            <p className="ms-3 form-error">{form_errors?.location_error ? form_errors.location_error : null }</p>

             <div className="category-selection-post-ad-container row gx-3 gy-3">
            {
                location.map(locat=>{
                    return(
                            <div key={locat} className="category-selection-post-ad col-md-6 col-12" onClick={()=>{selectLocation(locat); MaintainForm({...productForm,ad_location:locat})}}>
                                <p>{locat}</p>
                                <svg style={{'margin':'.5rem 0'}} version="1.1" id="Capa_1" width={40} height={40} xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 50 50" >
                                    <circle style={{'fill':selectedLocation === locat ? '#25AE88' : 'gray'}} cx="25" cy="25" r="25"/>
                                    <polyline style={{'fill':'none','stroke':'#FFFFFF','strokeWidth':2,'strokeLinecap':'round','strokeLinejoin':'round','strokeMiterlimit':10}} points="38,15 22,33 12,25 "/>
                                </svg>
                            </div>
                        
                    )
                })
            }
            </div>
        </div>


        <div className='form-el border-noup extra-p'>
            <button onClick={()=>{ alert('Changes will not be saved !');url('/')}} className='form-btn1'>Discard</button>
            <button className='form-btn2 post-btn' onClick={handleSubmit}>
                {loading ? <div className="loading loading2"></div> : 'Post Ad'}
            </button>
        </div>
        

        </div>
    </div>
  )
}

export default SellProduct