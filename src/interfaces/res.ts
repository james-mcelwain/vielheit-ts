import { Response } from 'restify'
import { ServerResponse } from 'http'

interface IRes extends Response, ServerResponse {
  
}

export default IRes