import React from 'react'
import PropTypes from 'prop-types'
import { Paper } from '@material-ui/core'

import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

/**
 * Tapahtumien listakomponentti
 *
 * @component
 * @category Tapahtumat
 * @subcategory frontend
 */

const EventsList = ({ events, classes, language, tags }) => {
    const { t } = useTranslation()

    return (
        <div>
            <h1 className={classes.text_center}>{t('Tapahtumat')}</h1>

            {events && tags.length > 0 && (
                <>
                    {events.data.map(event => {
                        const startDay = new Date(event.event_dates.starting_day).getDay()
                        const startMonth = new Date(
                            event.event_dates.starting_day,
                        ).getMonth()
                        const startYear = new Date(
                            event.event_dates.starting_day,
                        ).getFullYear()
                        const startHour = new Date(
                            event.event_dates.starting_day,
                        ).getHours()
                        const startMinutes = new Date(
                            event.event_dates.starting_day,
                        ).getMinutes()

                        return (
                            <Link
                                className={classes.link}
                                to={{ pathname: `/events/${event.id}`, state: event }}>
                                <Paper
                                    data-cy='tapahtumaLista'
                                    elevation={3}
                                    className={classes.paper}>
                                    <div className={classes.event}>
                                        <p className={classes.text_center}>
                                            <h1>{event.name[language]}</h1>
                                            <br />
                                            {event.description.intro}
                                            <br />
                                            {startDay}.{startMonth}.{startYear},{' '}
                                            {startHour}.{startMinutes} --{'>'}
                                            {event.event_dates.ending_day}
                                            <br />
                                            {event.location.address.locality},{' '}
                                            {event.location.address.street_address}
                                        </p>
                                        {event.description.images[0] && (
                                            <img
                                                alt={event.description.intro}
                                                className={classes.eventImage}
                                                src={event.description.images[0].url}
                                            />
                                        )}
                                    </div>
                                </Paper>
                            </Link>
                        )
                    })}
                </>
            )}
        </div>
    )
}

EventsList.propTypes = {
    events: PropTypes.shape({
        data: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string,

                name: PropTypes.shape({
                    fi: PropTypes.string,
                    en: PropTypes.string,
                    sv: PropTypes.string,
                    zh: PropTypes.string,
                }),

                event_dates: PropTypes.shape({
                    starting_day: PropTypes.string,
                }),

                description: PropTypes.shape({
                    intro: PropTypes.string,
                    images: PropTypes.arrayOf(PropTypes.shape({ url: PropTypes.string })),
                }),

                location: PropTypes.shape({
                    address: PropTypes.shape({
                        locality: PropTypes.string,
                        street_address: PropTypes.string,
                    }),
                }),
            }),
        ),
    }).isRequired,

    classes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,

    language: PropTypes.string.isRequired,

    tags: PropTypes.arrayOf(PropTypes.shape({ length: PropTypes.number })).isRequired,
}

export default EventsList
