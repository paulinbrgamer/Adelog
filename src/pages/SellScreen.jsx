import React from 'react'
import { useApp } from './AppProvider'
import ProductComponent from '../components/ProductComponent'
export default function SellScreen() {
  const {Cart} = useApp()
  return (
    <div>
      {Cart.map((item)=>
      <div>
        <ProductComponent key={item.id} data={item}/>
      </div>
      )}
    </div>
  )
}
