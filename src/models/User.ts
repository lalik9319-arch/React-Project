export interface User {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'customer' | 'agent';
    password?: string;
    isActive?: boolean;
    createdAt?: string;
}
export interface Createser {
    id?:number
    name: string;
    email: string;
    role: 'admin' | 'customer' | 'agent';
    password: string;
}
export interface AuthResponse {
    token: string;
    user: {
        id: number;
        name: string;
        email: string;
        role: 'admin' | 'customer' | 'agent';
    };
}

export interface LoginProps {
    email: string;
    password: string;
}
export interface RegisterProps {
    name: string;
    email: string;
    password: string;
}
