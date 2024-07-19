import { Injectable } from '@nestjs/common';

@Injectable()
export class TokenService {
    private blacklist: Set<string> = new Set();

    addToBlacklist(token: string) {
        this.blacklist.add(token);
    }

    isBlacklisted(token: string): boolean {
        return this.blacklist.has(token);
    }
}