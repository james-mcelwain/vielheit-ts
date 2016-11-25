import {Request} from "restify";
import IUser from "../../domain/user";

interface IReq extends Request {
  user?: IUser
  start: Number,
  uuid: string,
  body: any,
  method: string,
  url: string,
}

type HTTPMethod = 'POST' | 'OPTIONS' |  'GET' | 'POST' | 'PUT' | 'PATCH' | 'HEAD'

export default IReq