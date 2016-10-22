import {IsLength, IsEmail} from "validator.ts/decorator/Validation";
import IUser from "../interfaces/user";

class UsersController_authenticate {
    @IsEmail()
    email: String = ''; // TODO: It sucks to have to initialize these

    @IsLength(6, 20)
    password: String = '';
}

class UsersController_create implements IUser {
  @IsLength(3, 20)
  fname: String = '';

  @IsLength(3, 20)
  lname: String = '';

  @IsLength(6, 20)
  username: String = '';

  @IsLength(6, 20)
  password: String = '';

  @IsEmail()
  email: String = '';
}


const _validators = {
  UsersController_authenticate, 
  UsersController_create,
}

const validators = new Proxy(_validators, {
  get(target: any, name: String) {
    return name in target? 
      target[name] : new Error(`Validator ${name} not found!`);
  }
});

export default validators