import * as React from 'react'
import { connect } from 'react-redux'
import { RootState } from '../interfaces'

import { getLoading } from '../selectors'
import { Loader } from './Loader'

export interface AppUsersProps {
    id: string
}
export interface AppUsersComponentProps extends AppUsersProps {
    loading: boolean
}

class AppUsersComponent extends React.Component<AppUsersComponentProps> {
    public componentWillMount() {}
    public render() {
        return this.props.loading ? <Loader /> : <div>a list of AppUsers</div>
    }
}

export const mapStateToProps = (state: RootState, ownProps: AppUsersProps) => ({
    loading: getLoading(state, `users:${ownProps.id}`),
})

export const mapDispatchToProps = {}

export const AppUsers = connect(mapStateToProps, mapDispatchToProps)(
    AppUsersComponent,
)
