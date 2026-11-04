import React from 'react'

function NextIcon({reverse}) {
  return (
    <>
        <h1 style={{
          transform: reverse ? 'rotate(180deg)' : 'rotate(0deg)',
        }}> {'>'} </h1>
    </>
  )
}

export default NextIcon