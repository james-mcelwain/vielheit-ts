import * as http from 'axios';
import {IAddUserReq} from "../server/interfaces/user-service";

export async function authenticateUser(addUserReq: IAddUserReq) {
    return http.post('/api/users/authenticate', addUserReq, {
        validateStatus: (status) => {
            return (status >= 200 && status < 300) || status === 400
        }
    })
}
