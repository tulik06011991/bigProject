export declare class RedisService {
    private redisClient;
    constructor();
    set(key: string, value: string, expiration?: number): Promise<string>;
    get(key: string): Promise<string | null>;
    quit(): Promise<void>;
}
