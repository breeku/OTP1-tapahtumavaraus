import React from 'react'
import ReactDOM from 'react-dom'

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

import { App } from './App'
import './i18n'
import './root.css'

const theme = createMuiTheme({
    text_center: {
        textAlign: 'center',
    },
    rootElement: {
        background:
            'url("https://upload.wikimedia.org/wikipedia/commons/b/b8/The_Stairs_Paola_Italy_Black_And_White_Street_Photography_%28233602113%29.jpeg") no-repeat center center fixed',
        backgroundSize: 'cover',
        height: '80%',
        margin: '0',
        padding: '3%',
        position: 'relative',
        minHeight: '100vh',
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
