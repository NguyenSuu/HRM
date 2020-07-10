export interface Department{
    id:number,
    name:string,
    code:string
}
export interface Employee{
    id:number,
    name:string,
    code:string,
    skype:string,
    phone:string,
    experience:number
}
export interface Project {
    id:number,
    name:string,
    department:string,
    level:string,
    status:string,  
    numberOfMember:number,
    language:string,
    startDate:string,
    endDate:string
}

export interface LevelProject{
    id:number,
    name:string
}
export interface StatusProject{
    id:number,
    name:string
}