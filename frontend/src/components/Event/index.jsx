import React, { useEffect } from 'react'

import { useLocation } from 'react-router-dom'

import { getEvent } from '../../services/events'

export default function Event() {
    const location = useLocation()
    const event = location && location.state

    useEffect(() => {
        const getData = async () => {
            const { data } = await getEvent(event.id)
            console.log(data)
        }
        if (event) getData()
    }, [event])
    return (
        <>
            {event && (
                <h1>
                    {event.name.fi || event.name.en || event.name.sv || event.name.zh}
                </h1>
            )}
        </>
    )
}
