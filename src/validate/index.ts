import kernel from '../config/di-config'

export default function Valdiate(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const validatorName = target.constructor.toString().match(/class ([\w|_]+)/)[1]

  target[propertyKey] = function(req: any, res: any, next: any) {
    try {

    } catch (e) {
      
    }
  }
}

function constructValidationObject(Klass: Object, req: any) {
  const instance = new Klass()
  
  for (let key in req.body) {
    instance[key] = req.body[key]
  }
  
  return instance
}