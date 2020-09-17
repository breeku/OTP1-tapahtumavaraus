import React from 'react'

import { useLocation } from 'react-router-dom'

export default function Event() {
    const location = useLocation()
    const event = location && location.state
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
