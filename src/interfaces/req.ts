import {Request} from "restify";

interface IReq extends Request {
  start: Number,
  uuid: String,
  body: any,
  method: String,
  url: String,
}

type HTTPMethod = 'POST' | 'OPTIONS' |  'GET' | 'POST' | 'PUT' | 'PATCH' | 'HEAD'

export default IReq