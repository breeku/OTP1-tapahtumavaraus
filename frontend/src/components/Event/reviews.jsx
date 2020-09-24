import React from 'react'

import Rating from '@material-ui/lab/Rating'

const Reviews = ({ data }) => {
    return (
        <ul>
            {data.map(review => (
                <div data-cy="arvosteluLista" key={data.id}>
                    <h1>{review.header}</h1>
                    <p>{review.User.name}</p>
                    <p>{review.content}</p>
                    <Rating name="simple-controlled" value={review.rating} readOnly />
                </div>
            ))}
        </ul>
    )
}

export default Reviews
