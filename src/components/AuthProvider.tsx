import * as React from 'react'
import { connect } from 'react-redux'
import { RootState } from '../interfaces'
import { getAuthenticated, getAuthInitialized } from '../selectors'
import { Login } from './Login'
import { authAuthenticated, authInitialize } from '../actions'

export interface AuthProviderProps {}
export interface AuthProviderComponentProps extends AuthProviderProps {
    authenticated: boolean
    initialized: boolean
    authInitialize: () => void
    authAuthenticated: (a: string) => void
}

class AuthProviderComponent extends React.Component<
    AuthProviderComponentProps
> {
    public componentWillMount() {
        const token = localStorage.getItem('accessToken')
        this.props.authInitialize()
        if (token) this.props.authAuthenticated(token)
    }
    public render() {
        if (!this.props.initialized) return null
        return this.props.authenticated ? this.props.children : <Login />
    }
}

export const mapStateToProps = (state: RootState) => ({
    authenticated: getAuthenticated(state),
    initialized: getAuthInitialized(state),
})

export const mapDispatchToProps = {
    authInitialize,
    authAuthenticated,
}

export const AuthProvider = connect(mapStateToProps, mapDispatchToProps)(
    AuthProviderComponent,
)
