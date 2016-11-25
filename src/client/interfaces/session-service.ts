interface ISessionService {
    getSession(): string
    setSession(token: string): void
    clearSession(): boolean
}

export default ISessionService;