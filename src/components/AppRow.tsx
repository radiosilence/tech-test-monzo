import * as React from 'react'
import { connect } from 'react-redux'
import { setVisible } from '../actions'
import { RootState, AppModel } from '../interfaces'

import { getApp, getVisible } from '../selectors'

import './AppRow.css'

export interface AppRowProps {
    id: string
}
export interface AppRowComponentProps extends AppRowProps {
    app: AppModel
    editing: boolean
    expanded: boolean
    setVisible: (a: string, b: boolean) => void
}

class AppRowComponent extends React.Component<AppRowComponentProps> {
    public componentWillMount() {}
    public render() {
        const { logo } = this.props.app
        return (
            <li className="app-row">
                <div className="app-row-primary">
                    <span className="app-logo">
                        <img src={logo} />
                    </span>
                    <span className="app-details">
                        <span className="app-name">{this.appName()}</span>
                        <span className="app-edit">{this.appEdit()}</span>
                        <span className="app-expand">{this.appExpand()}</span>
                    </span>
                </div>
                {this.users()}
            </li>
        )
    }

    private appName() {
        return this.props.editing ? (
            <input type="text" value={this.props.app.name} />
        ) : (
            this.props.app.name
        )
    }
    private appEdit() {
        return this.props.editing ? (
            <span>
                <button>Save</button>{' '}
                <button className="cancel" onClick={this.handleCancelEdit}>
                    Cancel
                </button>
            </span>
        ) : (
            <button onClick={this.handleAppEdit}>Edit</button>
        )
    }
    private appExpand() {
        return this.props.expanded ? (
            <a onClick={this.handleCollapse}>-</a>
        ) : (
            <a onClick={this.handleExpand}>+</a>
        )
    }

    private users() {
        if (this.props.expanded) {
            return <div>users</div>
        }
        return undefined
    }

    private handleAppEdit = () => {
        this.props.setVisible(`app:${this.props.id}:editing`, true)
    }
    private handleCancelEdit = () => {
        this.props.setVisible(`app:${this.props.id}:editing`, false)
    }
    private handleExpand = () => {
        this.props.setVisible(`app:${this.props.id}:expanded`, true)
    }
    private handleCollapse = () => {
        this.props.setVisible(`app:${this.props.id}:expanded`, false)
    }
}

export const mapStateToProps = (state: RootState, ownProps: AppRowProps) => ({
    ...ownProps,
    app: getApp(state, ownProps.id),
    editing: getVisible(state, `app:${ownProps.id}:editing`),
    expanded: getVisible(state, `app:${ownProps.id}:expanded`),
})

export const mapDispatchToProps = {
    setVisible,
}

export const AppRow = connect(mapStateToProps, mapDispatchToProps)(
    AppRowComponent,
)
