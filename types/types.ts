export interface dataType {
    info:info,
    results:results
}

type info = {
    page:number,
    results:number,
    seed:string,
    version:string
}

type results = {
    cell:string,
    dob:{
        age:number,
        date:Date
    }
    email:string,
    gender:string,
    id:{
        name:string,
        value:number
    }
    location:{
        city:string,
        country:string,
        postcode:number,
        state:string,
        street:{
            name:string,
            number:string
        }
        
    }
    name:{
        first:string,
        last:string,
        title:string
    }
    phone:number,
    picture:{
        medium:string,
        thumbnail:string
    }
}[]