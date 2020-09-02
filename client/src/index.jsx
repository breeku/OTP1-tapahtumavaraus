import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'
import './root.css'

import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/core/styles'

const theme = createMuiTheme({
    text_center: {
        textAlign: 'center',
    },
})

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root'),
)
