interface ICacheService {
    get(key: string): Promise<String| Error>
    set(key: string, value: String): Promise<Boolean | Error>
    onBootstrap(): any
}

export default ICacheService