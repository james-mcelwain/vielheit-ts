interface ISessionService {
    getSession(): string
    setSession(token: string): void
    clearSession(): void
    hasSession(): boolean
}

export default ISessionService;