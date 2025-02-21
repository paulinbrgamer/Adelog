import React from 'react'
import styled from 'styled-components'
import Skeleton from './styled/LoadingSkeleton'
const Cardstyle = styled.div`
    display: grid;
    box-sizing: border-box;
    width: 300px;
    height: 140px;
    box-shadow: rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.04) 0px 6px 6px -3px, rgba(14, 63, 126, 0.04) 0px 12px 12px -6px, rgba(14, 63, 126, 0.04) 0px 24px 24px -12px;
    border-radius: 10px;
    grid-template-rows: 2fr 1fr 2fr;
    padding: 18px 24px;
    background-color: white;
    align-items: center;
`
function Card({title,data,Icon,Feching}) {
  return (

    <Cardstyle>
        {Icon}
        <p style={{color:"gray",fontSize:"11pt",fontWeight:"600"}}>{title}</p>
        {Feching?<Skeleton />:<h3 style={{fontWeight:'500'}}>{data}</h3>}
        </Cardstyle>
  )
}

export default Card