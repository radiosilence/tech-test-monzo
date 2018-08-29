import * as React from 'react'
import { connect } from 'react-redux'
import { RootState } from '../interfaces'
import { getAuthenticated } from '../selectors'
import { Login } from './Login'

export interface AuthProviderProps {}
export interface AuthProviderComponentProps extends AuthProviderProps {
    authenticated: boolean
}

export class AuthProviderComponent extends React.Component<
    AuthProviderComponentProps
> {
    public render() {
        return this.props.authenticated ? this.props.children : <Login />
    }
}

export const mapStateToProps = (state: RootState) => ({
    authenticated: getAuthenticated(state),
})

export const mapDispatchToProps = {}

export const AuthProvider = connect(mapStateToProps, mapDispatchToProps)(
    AuthProviderComponent,
)
