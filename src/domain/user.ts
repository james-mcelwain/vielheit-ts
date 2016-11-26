interface IUser {
    username: string
    fname: string
    lname: string
    email: string
    isAuthenticated(): boolean
    setAuth(auth: boolean): void
    serialize(): ISerializableUser
}

export interface ISerializableUser {
    username: string
    fname: string
    lname: string
    email: string
}

export default IUser