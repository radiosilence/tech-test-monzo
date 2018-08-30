import * as React from 'react'
import { connect } from 'react-redux'
import { RootState, UserModel } from '../interfaces'

import { getLoading, getAppUsers } from '../selectors'
import { Loader } from './Loader'
import { appFetchUsers } from '../actions'

import './AppUsers.css'

export interface AppUsersProps {
    id: string
}
export interface AppUsersComponentProps extends AppUsersProps {
    loading: boolean
    appFetchUsers: (a: string, b?: number, c?: number) => void
    users: UserModel[]
}

class AppUsersComponent extends React.Component<AppUsersComponentProps> {
    public componentWillMount() {
        this.loadMoreUsers()
    }
    public render() {
        return (
            <div className="app-users">
                <ol className="app-users-list">
                    {this.props.users.map((user) => (
                        <User key={user.id} user={user} />
                    ))}
                </ol>
                {this.props.loading ? <Loader /> : null}
                <button
                    disabled={this.props.loading}
                    onClick={this.loadMoreUsers}>
                    Load more...
                </button>
            </div>
        )
    }
    private loadMoreUsers = () => {
        const { id, users, appFetchUsers } = this.props
        appFetchUsers(id, 5, users.length)
    }
}

export const User = ({ user }: { user: UserModel }) => (
    <li className="app-user-row">
        <div className="app-row-primary">
            <span className="app-user-avatar">
                <img src={user.avatar} />
            </span>
            <span className="app-user-details">
                <span className="app-user-name">{user.name}</span>
            </span>
        </div>
    </li>
)

export const mapStateToProps = (state: RootState, ownProps: AppUsersProps) => ({
    loading: getLoading(state, `users:${ownProps.id}`),
    users: getAppUsers(state, ownProps.id),
})

export const mapDispatchToProps = {
    appFetchUsers,
}

export const AppUsers = connect(mapStateToProps, mapDispatchToProps)(
    AppUsersComponent,
)
