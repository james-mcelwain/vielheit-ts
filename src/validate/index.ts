import {Validator} from 'validator.ts/Validator'
import {InternalServerError, BadRequestError} from 'restify-errors'
import IReq from '../interfaces/req'
import validators from './validators'


export default function Valdiate(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) {
  const validatorName = `${target.constructor.toString().match(/class ([\w|_]+)/)[1]}_${propertyKey}`;
  const ValidationClass = Reflect.get(validators, validatorName);
  
  const method = descriptor.value
  
  descriptor.value = function(...args: Array<any>) {
    const req = args[0];
    const next = args.pop();
  
    try {
      const validationRequest = getValidationRequest(ValidationClass, req);
      
      const validator = new Validator()   
      validator.validateOrThrow(validationRequest);
      method(...args)
    } catch (e) {
      if (e.name === 'ValidationError') {
        return next(new BadRequestError(e))
      }

      next(new InternalServerError(e))
    }
  }
}

interface Newable {
  new(): any;
}

function getValidationRequest(Klass: Newable, req: IReq) { 
  const instance = new Klass();
  for (let key in req.body) {
    const val = String(req.body[key])
    Reflect.set(instance, key, val); 
  }

  return instance
}