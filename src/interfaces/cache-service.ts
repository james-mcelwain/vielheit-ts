interface ICacheService {
    get(key: string): Promise<string | Error>
    set(key: string, value: string): Promise<boolean | Error>
    onBootstrap(): any
}

export default ICacheService