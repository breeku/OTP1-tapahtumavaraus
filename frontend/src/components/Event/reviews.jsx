import React from 'react'

import Rating from '@material-ui/lab/Rating'

const Reviews = ({ data }) => {
    console.log(data)

    return (
        <ul>
            {data.map(review => (
                <div key={data.id}>
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
