import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'

import Header from './Header'

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
    <Wrapper>
      <Column>
        <Main>
          {
            loaded &&
            <Header
              attributes={airline.data.attributes}
              reviews={airline.included}
            />
          }
        </Main>
        <div className="reviews"></div>
      </Column>
      <Column>
        <div className="review-form"></div>
      </Column>
    </Wrapper>
  )
}

export default Airline
