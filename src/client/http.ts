import * as http from 'axios';
import {IAddUserReq, IAuthenticateUserReq} from "../domain/request/user";
import {IAddUserRes, IAuthenticateUserRes} from "../domain/response/user";

const httpOpts = {
    validateStatus: (status) => {
        return (status >= 200 && status < 300) || status === 400
    }
};

export async function authenticateUser(authenticateUserReq: IAuthenticateUserReq): Promise<IAuthenticateUserRes> {
    return http.post('/api/users/authenticate', authenticateUserReq, httpOpts)
}

export async function addUser(addUserReq: IAddUserReq): Promise<IAddUserRes> {
    return http.post('/api/users/add', addUserReq, httpOpts)
}
