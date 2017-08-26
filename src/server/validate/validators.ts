import {IsLength, IsEmail} from "validator.ts/decorator/Validation";
import {IAddUserReq} from "../../domain/request/user";

class UsersController_authenticate {
    @IsEmail()
    email: string = ''; // TODO: It sucks to have to initialize these

    @IsLength(6, 20)
    password: string = '';
}

class UsersController_add implements IAddUserReq {
  @IsLength(3, 20)
  fname: string = '';

  @IsLength(3, 20)
  lname: string = '';

  @IsLength(6, 20)
  username: string = '';

  @IsLength(6, 20)
  password: string = '';

  @IsEmail()
  email: string = '';
}


const _validators = {
  UsersController_authenticate, 
  UsersController_add,
};

const validators = new Proxy(_validators, {
  // wrap the getter for any property on the _validators obj
  get(target: any, name: string) {
    
    // this is for the developers benefit mostly, if you spell shit wrong, we serve an error
    return name in target? 
      target[name] : new Error(`Validator ${name} not found!`);
  }
});

export default validators