export interface User {
    id: string;
    userName: string;
    email: string;
    onlineAt: string;
}

export interface UserTableState {
    page: number;
    pageSize: number;
    filters: {
        username: string;
        phone: string;
    };
}