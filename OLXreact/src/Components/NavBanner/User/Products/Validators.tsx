import { Dispatch, SetStateAction } from "react"


export type baseform_error_type = {
    has_no_error ?: boolean|null,
    title ?: null|string,
    description ?: string|null,
    category_error ?: null|string,
    price_error ?: null|string,
    photo_error ?: null|string,
    location_error ?:null|string,
    accessory_type_error ?: null|string
    brand_error ?: null|string,

    building_type_error ?: null|string,
    bathroom_count_error ?: null|string,
    bedroom_count_error ?: null|string,

    transmission_type_error ?: null|string,
    fuel_type_error ?: null|string,
    model_name_error ?: null|string,
    km_driven_error ?: null|string,
    no_of_owners_error ?: null|string,

    year_error ?: null|string, 
    battery_health_error ?: null|string,
    years_used_error ?: null|string 

} 

export type productform =
    {
        title : string|null,
        description : string|null,
        category : string|null,
        price : number|null,
        related_images : File[],
        ad_location : string|null,
        brand ?: string|null,
        accessory_type ?: string|null,
        building_type ?: string | null,
        transmission_type ?: string|null,
        fuel_type ?: string|null,
        no_of_owners ?: number|null,
        km_driven ?: number|null,
        model_name ?: string|null,
        battery_health ?: number|null,
        years_used ?: number|null,
        bedrooms ?: number|null,
        bathrooms ?: number|null,
        year ?: number|null,
        posted_user ?: number|string|null

    }


type base_form = {
    appendBaseFormErr : Dispatch<SetStateAction<baseform_error_type>>,
    form : productform,
    errors: baseform_error_type,
}


export type form_child ={
    product_form : productform,
    MaintainForm : Dispatch<SetStateAction<productform>>,
    form_errors ?: baseform_error_type
}













export function validate_base_form(p:base_form){
    p.appendBaseFormErr({})

    if (!p.form.category) return p.appendBaseFormErr({category_error : 'err'})
    if(p.form.category == 'Accessory'){
        if(!p.form.accessory_type) return p.appendBaseFormErr({accessory_type_error:'Select a Type'})
    }
    if(p.form.category == 'Car'){
        if(!p.form.brand) return p.appendBaseFormErr({brand_error:'Select a Brand'})
        if(!p.form.model_name || p.form.model_name == '')return p.appendBaseFormErr({model_name_error:"Enter a model name"})
        if(!p.form.km_driven)return p.appendBaseFormErr({km_driven_error:'Enter kilometers Driven'})
        if(p.form.km_driven < 1) return p.appendBaseFormErr({year_error:"Provide the Valid Info"})     
        if(!p.form.transmission_type) return p.appendBaseFormErr({transmission_type_error:"Select a Transmission type"})
        if(!p.form.fuel_type) return p.appendBaseFormErr({fuel_type_error:'Select a Fuel type'})
        if(!p.form.no_of_owners) return p.appendBaseFormErr({no_of_owners_error:'Please select ownership type'})
    }
    if(p.form.category == 'Mobile'){
        if(!p.form.brand) return p.appendBaseFormErr({brand_error:'Select a Brand'})
        if(!p.form.model_name || p.form.model_name == '')return p.appendBaseFormErr({model_name_error:"Enter a model name"})
        if(!p.form.battery_health) return p.appendBaseFormErr({battery_health_error:"Provide the battery health"})
        if(p.form.battery_health < 1) return p.appendBaseFormErr({year_error:"Provide the Valid Battery Health"})     
        if(!p.form.years_used || p.form.years_used == 0) return p.appendBaseFormErr({years_used_error:'Enter Used Years'})
        if(p.form.years_used < 1) return p.appendBaseFormErr({years_used_error:"Provide the Valid Used Years"})     

    }
    if(p.form.category == 'Property'){
        if(!p.form.building_type) return p.appendBaseFormErr({building_type_error:"Select the building type"})
        if(!p.form.bedrooms) return p.appendBaseFormErr({bedroom_count_error:"Select count of bedroom"})
        if(!p.form.bathrooms) return p.appendBaseFormErr({bathroom_count_error:"Select count of bathroom"})
    }
    if(p.form.category == 'Scooter'){
        if(!p.form.brand) return p.appendBaseFormErr({brand_error:'Select a Brand'})
        if(!p.form.model_name || p.form.model_name == '') return p.appendBaseFormErr({model_name_error:"Enter a model name"})
        if(!p.form.km_driven) return p.appendBaseFormErr({km_driven_error:'Enter kilometers Driven'})
        if(p.form.km_driven < 1) return p.appendBaseFormErr({km_driven_error:'Enter Valid kilometers Driven'})

        if(!p.form.year) return p.appendBaseFormErr({year_error:"Provide the Vehicle Year"})  
        if(p.form.year < 1) return p.appendBaseFormErr({year_error:"Provide the Valid Vehicle Year"})     

    }


    if (!p.form.title) return p.appendBaseFormErr({title:'Provide a Title'})
    if (!p.form.description) return p.appendBaseFormErr({description:'Provide a Description'})

    if (!p.form.price) return p.appendBaseFormErr({price_error : 'Provide a Price'})
    if (p.form.price < 1) return p.appendBaseFormErr({price_error : 'Provide a Valid Price'})
    if (!p.form.related_images[2]) return p.appendBaseFormErr({photo_error : 'Please provide 3 images'})
    
    if (!p.form.ad_location) return p.appendBaseFormErr({location_error : 'Select a Location'})

    p.errors.has_no_error = true

}

