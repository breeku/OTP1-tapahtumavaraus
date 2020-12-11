import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles(theme => ({
    text_center: {
        color: 'white',
        textAlign: 'center',
        textShadow: '-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black',
    },
    rootElement: theme.rootElement,
    paper: {
        width: '40%',
        marginLeft: '23%',
        display: 'grid',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(44, 44, 44, 0.9)',
        padding: '4rem 8rem',
        border: '3px solid #ffffff',
        borderRadius: '2% 6% 5% 4% / 1% 1% 2% 4%',
        color: '#ffffff',
        marginTop: '0%',
    },
    paragraph: {
        fontSize: '70%',
        fontFamily: 'Serif',
    },
}))

/**
 * Kotisivun pääkomponentti
 *
 * @component
 * @category Koti
 * @subcategory frontend
 */

const Home = () => {
    const classes = useStyles()
    const { t } = useTranslation()

    return (
        <div className={classes.rootElement}>
            <h1 className={classes.paper}>
                <h1 className={classes.text_center}>{t('Koti')}</h1>
                <p className={classes.paragraph}>
                    {t('EtusivunTeksti')}
                    <br />
                    <br />
                    Matias Mäkelä
                    <br />
                    Samuel Ahjoniemi
                    <br />
                    Santeri Einola
                    <br />
                    Marko Mustonen
                </p>
            </h1>
        </div>
    )
}

export default Home
