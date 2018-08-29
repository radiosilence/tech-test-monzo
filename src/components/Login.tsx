import * as React from 'react'
import { connect } from 'react-redux'
import { RootState, AuthFormState } from '../interfaces'
import { authLogin, authUpdateForm } from '../actions'
import { getAuthForm } from '../selectors'

export interface LoginProps {}
export interface LoginComponentProps extends LoginProps {
    form: AuthFormState
    authLogin: (a: string, b: string) => void
    authUpdateForm: (a: AuthFormState) => void
}

export class LoginComponent extends React.Component<LoginComponentProps> {
    public render() {
        return (
            <main>
                <div className="container">
                    <h1>login</h1>
                    <form onSubmit={this.handleSubmit}>
                        <p>
                            <input
                                type="email"
                                onChange={this.handleChangeEmail}
                                placeholder="Email"
                                value={this.props.form.email}
                            />
                        </p>
                        <p>
                            <input
                                type="password"
                                onChange={this.handleChangePassword}
                                placeholder="Password"
                                value={this.props.form.password}
                            />
                        </p>
                        <p>
                            <button onClick={this.handleSubmit}>login</button>
                        </p>
                    </form>
                </div>
            </main>
        )
    }

    private handleChangeEmail = (event: React.FormEvent<HTMLInputElement>) => {
        event.preventDefault()
        const { authUpdateForm, form } = this.props
        console.log('email', event.currentTarget.value)
        authUpdateForm({
            ...form,
            email: event.currentTarget.value,
        })
    }

    private handleChangePassword = (
        event: React.FormEvent<HTMLInputElement>,
    ) => {
        event.preventDefault()
        const { authUpdateForm, form } = this.props
        authUpdateForm({
            ...form,
            password: event.currentTarget.value,
        })
    }

    private handleSubmit = (
        event:
            | React.FormEvent<HTMLFormElement>
            | React.MouseEvent<HTMLButtonElement>,
    ) => {
        event.preventDefault()
        const { email, password } = this.props.form
        this.props.authLogin(email, password)
    }
}

export const mapStateToProps = (state: RootState) => ({
    form: getAuthForm(state),
})

export const mapDispatchToProps = {
    authLogin,
    authUpdateForm,
}

export const Login = connect(mapStateToProps, mapDispatchToProps)(
    LoginComponent,
)
