import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

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

export default function Home() {
    const classes = useStyles()
    return (
        <div className={classes.rootElement}>
            <h1 className={classes.paper}>
                <h1 className={classes.text_center}>Koti</h1>
                <p className={classes.paragraph}>
                    Tervetuloa tapahtumavaraussivulle! Täältä löydät Helsingin seudun
                    tapahtumat yhteen koottuna ja kätevällä hakutoiminnallisuudella
                    varustettuna. Voit varata tapahtumiin lippuja, arvostella niitä, luoda
                    oman käyttäjätunnuksen ja tarkastella omaa tapahtumavierailu- ja
                    arvosteluhistoriaasi. Sivut toimivat Metropolian
                    ohjelmistotuotantoprojekti 1:n ja 2:n työnä.
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
