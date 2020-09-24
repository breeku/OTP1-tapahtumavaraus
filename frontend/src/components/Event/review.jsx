import React from 'react'
import Rating from '@material-ui/lab/Rating'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

const Review = () => {
    const [rating, setRating] = React.useState(2)

    return (
        <>
            <div>
                <Box component="fieldset" mb={3} borderColor="transparent">
                    <Typography component="legend">Arvostele</Typography>
                    <Rating
                        data-cy="arvosteluTahdet"
                        name="Arvostelun tähdet"
                        value={rating}
                        onChange={(event, newValue) => {
                            setRating(newValue)
                        }}
                    />
                </Box>
            </div>
        </>
    )
}

export default Review
