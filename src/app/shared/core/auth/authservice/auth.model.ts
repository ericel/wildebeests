

export interface Roles {
    user?: boolean;
    dealer?: boolean;
    contentcreator?: boolean;
    admin?: boolean;
}

export interface User {
    uid: string;
    username: string;
    email: string;
    photoURL?: string;
    accountType?: string;
    displayName?: string;
    favoriteColor?: string;
    createdAt?: any;
    updatedAt?: any;
    catchPhrase?: string;
    status?: string;
    roles?: Roles;
}