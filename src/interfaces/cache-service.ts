interface ICacheService {
    get(key: string): Promise<string>
    set(key: string, value: string): Promise<boolean>
    onBootstrap(): any
}

export default ICacheService