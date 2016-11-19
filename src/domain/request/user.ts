import IServiceReq from "./service-request";

export interface IAuthenticateUserReq extends IServiceReq{
    email: string
    password: string
}

export interface IAddUserReq extends IServiceReq {
    username: string
    fname: string
    lname: string
    email: string
    password: string
}

