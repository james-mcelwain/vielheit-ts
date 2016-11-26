interface ICacheService {
    get(key: string): Promise<string>
    set(key: string, value: string): Promise<boolean>
    del(key: string): Promise<boolean>
    onBootstrap(): any
}

export default ICacheService