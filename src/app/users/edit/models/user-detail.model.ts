export interface Role {
    id: string;
    roleName: string;
}

export interface UserDetail {
    id: string;
    userName: string;
    phone: string;
    emailConfirmed: boolean;
    phoneConfirmed: boolean;
    email: string;
    roles: Role[];
    currentRoles: Role[];
    genderId: string;
}

export interface EditUserRequest {
    id: string;
    userName: string;
    phone: string;
    email: string;
    genderId: string;
    emailConfirmed: boolean;
    phoneConfirmed: boolean;
    currentRoles: Role[];
}