import {Request} from "restify";

interface IReq extends Request {
  start: Number,
  uuid: string,
  body: any,
  method: string,
  url: string,
}

type HTTPMethod = 'POST' | 'OPTIONS' |  'GET' | 'POST' | 'PUT' | 'PATCH' | 'HEAD'

export default IReq