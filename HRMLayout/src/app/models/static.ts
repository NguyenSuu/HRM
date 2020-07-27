
export interface Department{
    id:number,
    description?:string,
    name?:string,
}
export interface Employee{
    id?:number,
    name?:string,
    code?:string,
    skype?:string,
    phone?:string,
    experience?:number,
    employeeAndProjects?:EmployeeAndProjects,
    department?:Department,
    preventive_role?:string,
}
export interface EmployeeAndProjects {
    id_employee?:number,
    id_project?:number,
    role_project?:Role,
    joinAt?:string,
    out?:boolean
}
export interface Project {
    id?:number,
    code?:string,
    name?:string,
    department?:Department,
    level?:LevelProject,
    status?:StatusProject,  
    numberOfMember?:number,
    technology?:Technology,
    plan?:Plan,
    notes?:string,
    employee?:[]
}

export interface LevelProject{
    id?:number,
    name?:string
}
export interface StatusProject{
    id:number,
    name?:string
}
export interface Technology{
    id:number,
    name?:string
}
export interface Plan{
    id?:number,
    expected_start_date:Date,
    expected_end_date:Date
}
export interface Role{
    id:number,
    name?:string
}
