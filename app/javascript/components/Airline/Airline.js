import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import styled from 'styled-components'

import Header from './Header'
import ReviewForm from './ReviewForm'

const Wrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
`

const Column = styled.div`
  background: #fff;
  max-width: 50%;
  width: 50%;
  float: left;
  height: 100vh;
  overflow-x: scroll;
  overflow-y: scroll;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  &:last-child {
    background: black;
    border-top: 1px solid rgba(255,255,255,0.5);
  }
`

const Main = styled.div`
  padding-left: 60px;
`

const Airline = (props) => {
  const [airline, setAirline] = useState({})
  const [review, setReview] = useState({title: '', description: ''})
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    axios.get(`/api/v1/airlines/${props.match.params.slug}`)
    .then( resp => {
      setAirline(resp.data)
      setLoaded(true)
    })
    .catch( resp => console.log(resp) )
  }, [])

  const handleChange = (e) => {
    e.preventDefault();
    const newReviewParams = Object.assign({}, review, {[e.target.name]: e.target.value})
    setReview(newReviewParams)
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const airline_id = airline.data.id

    axios.post('/api/v1/reviews', {review, airline_id})
    .then( resp => {
      const included = [...airline.included, resp.data.data]
      setAirline({...airline, included})
      setReview({title: '', description: '', score: 0})
    })
    .catch( resp => console.log(resp) )
  }

  const setRating = (score, e) => {
    // e.preventDefault();
    setReview({...review, score: score})
    console.log(review);
  }

  return (
    <Wrapper>
      {
        loaded &&
        <Fragment>
          <Column>
            <Main>
              <Header
                attributes={airline.data.attributes}
                reviews={airline.included}
              />
            </Main>
            <div className="reviews"></div>
          </Column>
          <Column>
            <ReviewForm
              review={review}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              setRating={setRating}
              attributes={airline.data.attributes}
            />
          </Column>
        </Fragment>
      }
    </Wrapper>
  )
}

export default Airline
