import * as React from 'react'
import { Provider } from 'react-redux'
import './App.css'

import logo from '../logo.svg'
import createStore from '../create-store'
import { AuthProvider } from './AuthProvider'

class App extends React.Component {
    public render() {
        return (
            <Provider store={createStore()}>
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <h1 className="App-title">Welcome to React</h1>
                    </header>
                    <AuthProvider>
                        <p className="App-intro">
                            To get started, edit <code>src/App.tsx</code> and
                            save to reload.
                        </p>
                    </AuthProvider>
                </div>
            </Provider>
        )
    }
}

export default App
