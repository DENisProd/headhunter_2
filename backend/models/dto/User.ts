import {BaseEntity} from "../BaseEntity";

export interface User{
    email: string
    password: string
    confirmHash: string
}