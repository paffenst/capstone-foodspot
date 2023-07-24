export type User = {
    username: string
    password: string
    email: string
    firstname: string
    lastname: string
}
export type UserLoginRequest = {
    username: string,
    password: string
}