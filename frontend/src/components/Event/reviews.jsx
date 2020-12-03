import React from 'react'

import Rating from '@material-ui/lab/Rating'
import PropTypes from 'prop-types'

// Item for rendering a review

/**
 * Arvostelujen komponentti
 *
 * @component
 * @category Tapahtuma
 */

const Reviews = ({ data }) => {
    return (
        <ul>
            {data.map(review => (
                <div data-cy='arvosteluLista' key={data.id}>
                    <h1>{review.header}</h1>
                    <p>{review.User.username}</p>
                    <p>{review.content}</p>
                    <Rating name='simple-controlled' value={review.rating} readOnly />
                </div>
            ))}
        </ul>
    )
}



Reviews.propTypes = {
     data: PropTypes.arrayOf(
            PropTypes.shape({   
                header: PropTypes.string,
                id: PropTypes.string,
                content: PropTypes.string,
                User: PropTypes.shape({
                    username: PropTypes.string,
                }),
            }),      
        ).isRequired,
}



export default Reviews
