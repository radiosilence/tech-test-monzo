import * as React from 'react'
import { connect } from 'react-redux'
import { RootState } from '../interfaces'

import { appsFetch } from '../actions'
import { getLoading, getAppIds } from '../selectors'
import { Loader } from './Loader'
import { AppRow } from './AppRow'

import './Apps.css'

export interface AppsProps {}
export interface AppsComponentProps extends AppsProps {
    appsFetch: () => void
    loading: boolean
    appIds: string[]
}

class AppsComponent extends React.Component<AppsComponentProps> {
    public componentWillMount() {
        this.props.appsFetch()
    }
    public render() {
        return this.props.loading ? (
            <Loader />
        ) : (
            <ol className="apps">
                {this.props.appIds.map((id) => <AppRow key={id} id={id} />)}
            </ol>
        )
    }
}

export const mapStateToProps = (state: RootState) => ({
    loading: getLoading(state, 'apps'),
    appIds: getAppIds(state),
})

export const mapDispatchToProps = {
    appsFetch,
}

export const Apps = connect(mapStateToProps, mapDispatchToProps)(AppsComponent)
