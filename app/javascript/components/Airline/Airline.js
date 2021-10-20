import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Header from './Header'

const Airline = (props) => {
  const [airline, setAirline] = useState({})
  const [review, setReview] = useState({})
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    axios.get(`/api/v1/airlines/${props.match.params.slug}`)
    .then( resp => {
      setAirline(resp.data)
      setLoaded(true)
    })
    .catch( resp => console.log(resp) )
  }, [])

  return (
    <div className="wrapper">
      <div className="column">
        {
          loaded &&
          <Header
            attributes={airline.data.attributes}
            reviews={airline.included}
          />
        }
        <div className="reviews"></div>
      </div>
      <div className="column">
        <div className="review-form"></div>
      </div>
    </div>
  )
}

export default Airline
