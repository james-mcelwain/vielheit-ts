interface ISessionService {
    getSession(): string
    setSession(token: string): void
    clearSession(): boolean
    hasSession(): boolean
}

export default ISessionService;