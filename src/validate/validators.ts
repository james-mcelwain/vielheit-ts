import {IsLength, IsEmail, IsInt} from 'validator.ts/decorator/Validation'
import {IUser} from '../interfaces'

class UsersController_authenticate {
    @IsEmail()
    email: string = '' // TODO: It sucks to have to initialize these

    @IsLength(6, 20)
    password: string = ''
}

class UsersController_create implements IUser {
  @IsLength(3, 20)
  fname: string = ''

  @IsLength(3, 20)
  lname: string = ''

  @IsLength(6, 20)
  username: string = ''

  @IsLength(6, 20)
  password: string = ''

  @IsEmail()
  email: string = ''
}


const _validators = {
  UsersController_authenticate, 
  UsersController_create,
}

const validators = new Proxy(_validators, {
  get(target: any, name: string) {
    return name in target? 
      target[name] : new Error(`Validator ${name} not found!`);
  }
})

export default validators