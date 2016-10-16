import { Request } from 'restify'

interface IReq extends Request { 
  start: number,
  uuid: string,
  body: any 
}

export default IReq