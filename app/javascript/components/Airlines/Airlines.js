import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'

const Airlines = () => {
  const [airlines, setAirlines] = useState([])

  useEffect(() => {
    axios.get('/api/v1/airlines')
    .then( resp => {
      setAirlines(resp.data.data)

    })
    .catch( resp => console.log(resp) )
  }, [])

  const list = airlines.map( item => {
    return (<li key={item.attributes.name}>{item.attributes.name}</li>)
  })

  return (
    <Fragment>
      <div>Airlines index</div>
      <ul>{list}</ul>
    </Fragment>
  )
}

export default Airlines
