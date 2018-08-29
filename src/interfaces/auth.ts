export interface AuthState {
    initialized: boolean
    expiry?: number
    token?: string
    email?: string
    form: AuthFormState
}

export interface AuthFormState {
    email: string
    password: string
    submitted: boolean
    dirty: boolean
    error?: string
}
