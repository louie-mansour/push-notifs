import { User } from '../domain/User'

export class AppInfoUseCase {
    public appInfo(userId?: string): AppInfo {
        if (userId) {
            return {
                isLoggedIn: true,
                userId: userId,
            }
        }
        return {
            isLoggedIn: false,
            userId: User.ANONYMOUS,
        }
    }
}

export interface AppInfo {
    isLoggedIn: boolean;
    userId: string | typeof User.ANONYMOUS;
}