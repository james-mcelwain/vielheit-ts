import {Validator} from "validator.ts/Validator";
import {InternalServerError, BadRequestError} from "restify-errors";
import IReq from "../interfaces/req";
import validators from "./validators";

export default function Valdiate(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) {
    // Get the name of the valiator based on the contrller's constructor name and the method (route) we are accesing
    // Ie ControllerName_routeName
    const validatorName = `${target.constructor.toString().match(/class ([\w|_]+)/)[1]}_${propertyKey}`;
    
    // Try to get a validator class that we have declared
    // This uses a proxy, so it won't return undefined -- it will throw an error if the validator doesn't exist
    const ValidationClass = Reflect.get(validators, validatorName);

    // Store the original method, we're going to wrap it
    const method = descriptor.value;

    // We overwrite the route with our validation logic
    descriptor.value = function (...args: Array<any>) {
        // store references to req and next because we need to access them to serve a validation error
        const req = args[0];
        const next = args[args.length - 1];

        try {
            
            // construct the validation object (class)
            const validationRequest = getValidationRequest(ValidationClass, req);
            
            // init the validator (the thing that will check the validation)
            const validator = new Validator();
            
            // Validate or throw, we'll serve the error in the catch block
            validator.validateOrThrow(validationRequest);
   
            // if it passes validation, call the request with the original argmuents (i.e, req, res, next) -- 
            // proceed as normal            
            method.call(this, ...args)
        } catch (e) {
            // if we catch a vliadtion error, send it to the 400 error handler 
            if (e.name === 'ValidationError') {
                return next(new BadRequestError(e))
            }
            
            // something crazy happened, so serve a 500
            next(new InternalServerError(e))
        }
    }
}

interface Newable {
    new(): any;
}

function getValidationRequest(Klass: Newable, req: IReq) {
    const instance = new Klass();
    // there has to be a req body to validate...
    if (Reflect.get(req, 'body')) {
        
        // for the props in the body
        for (let key in req.body) {
            // don't write a null or undefined (i.e. prop exists w/o value)
            if (Reflect.get(req.body, key)) {
                const val = req.body[key];
                // set it on the validation class we're currently building
                Reflect.set(instance, key, String(val));
            }
        }
    }

    // return the validation class
    return instance
}