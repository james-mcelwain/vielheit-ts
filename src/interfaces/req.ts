import { Request } from 'restify'

interface IReq extends Request { 
  start: number,
  uuid: string
}

export default IReq