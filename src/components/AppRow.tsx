import * as React from 'react'
import { connect } from 'react-redux'
import {
    setVisible,
    appStartUpdating,
    appCancelUpdating,
    appPatchBuffer,
    appSave,
} from '../actions'
import { RootState, AppModel } from '../interfaces'

import { getApp, getVisible, getAppBuffer, getLoading } from '../selectors'

import './AppRow.css'
import { AppUsers } from './AppUsers'

export interface AppRowProps {
    id: string
}
export interface AppRowComponentProps extends AppRowProps {
    app: AppModel
    buffer?: AppModel
    expanded: boolean
    saving: boolean
    setVisible: (a: string, b: boolean) => void
    appStartUpdating: (a: string) => void
    appPatchBuffer: (a: string, b: Partial<AppModel>) => void
    appCancelUpdating: (a: string) => void
    appSave: (a: string, b: AppModel) => void
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
        return this.props.buffer ? (
            <input
                type="text"
                onChange={this.handleAppChangeName}
                value={this.props.buffer.name}
            />
        ) : (
            this.props.app.name
        )
    }
    private appEdit() {
        const { saving, buffer } = this.props
        return buffer ? (
            <span>
                <button disabled={saving} onClick={this.handleSave}>
                    Save
                </button>{' '}
                <button
                    disabled={saving}
                    className="cancel"
                    onClick={this.handleCancelEdit}>
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
            return <AppUsers id={this.props.id} />
        }
        return undefined
    }

    private handleAppEdit = () => {
        this.props.appStartUpdating(this.props.id)
    }
    private handleAppChangeName = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        this.props.appPatchBuffer(this.props.id, {
            name: event.currentTarget.value,
        })
    }
    private handleCancelEdit = () => {
        this.props.appCancelUpdating(this.props.id)
    }
    private handleExpand = () => {
        this.props.setVisible(`app:${this.props.id}`, true)
    }
    private handleCollapse = () => {
        this.props.setVisible(`app:${this.props.id}`, false)
    }

    private handleSave = () => {
        const { appSave, buffer, id } = this.props
        if (buffer !== undefined) appSave(id, buffer)
    }
}

export const mapStateToProps = (state: RootState, ownProps: AppRowProps) => ({
    ...ownProps,
    app: getApp(state, ownProps.id),
    buffer: getAppBuffer(state, ownProps.id),
    expanded: getVisible(state, `app:${ownProps.id}`),
    saving: getLoading(state, `app:${ownProps.id}`),
})

export const mapDispatchToProps = {
    setVisible,
    appStartUpdating,
    appCancelUpdating,
    appPatchBuffer,
    appSave,
}

export const AppRow = connect(mapStateToProps, mapDispatchToProps)(
    AppRowComponent,
)
