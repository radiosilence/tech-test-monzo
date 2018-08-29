import * as React from 'react'
import { connect } from 'react-redux'
import { RootState } from '../interfaces'

import { appsFetch } from '../actions'
import { getLoading } from '../selectors'

export interface AppsProps {}
export interface AppsComponentProps extends AppsProps {
    appsFetch: () => void
}

class AppsComponent extends React.Component<AppsComponentProps> {
    public componentWillMount() {
        this.props.appsFetch()
    }
    public render() {
        return <div>a list of apps</div>
    }
}

export const mapStateToProps = (state: RootState) => ({
    loading: getLoading(state, 'apps'),
})

export const mapDispatchToProps = {
    appsFetch,
}

export const Apps = connect(mapStateToProps, mapDispatchToProps)(AppsComponent)
