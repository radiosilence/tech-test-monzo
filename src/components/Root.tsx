import * as React from 'react'
import { Provider } from 'react-redux'
import './Root.css'

import createStore from '../create-store'
import { AuthProvider } from './AuthProvider'
import { Apps } from './Apps'

export class Root extends React.Component {
    public render() {
        return (
            <Provider store={createStore()}>
                <AuthProvider>
                    <header>
                        <div className="header-container">
                            <h1 className="app-title">
                                monzo developer portal
                            </h1>
                        </div>
                    </header>
                    <main>
                        <div className="container">
                            <h1>apps</h1>
                            <Apps />
                        </div>
                    </main>
                </AuthProvider>
            </Provider>
        )
    }
}
