interface IUser {
    username: string
    fname: string
    lname: string
    email: string
    isAuthenticated(): boolean
    setAuth(auth: boolean): void
}

export default IUser