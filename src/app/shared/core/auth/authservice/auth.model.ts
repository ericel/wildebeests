

export interface Roles {
    user?: boolean;
    dealer?: boolean;
    contentcreator?: boolean;
    admin?: boolean;
}

export interface Verified {
    links?: any;
    facebook?: boolean;
    twitter?: boolean;
    email?: boolean;
    phone?: boolean;
}

export interface Local {
    uid: string;
    country: string;
    city: string;
    lat_long: string;
    region: string;
    internetOrg: string;
    ip: string;
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
    verified?: Verified;
    bio?: string;
}