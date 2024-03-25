import React from 'react'
import { List } from './common/List'
import { useState } from 'react';
import { useEffect } from 'react';
import Axios from 'axios';
import { backend } from '../constants';

// page to list the products
function GalleryPage() {

  // store products from server
  const [highlightCategories, setHighlightCategories] = useState([])
  const [total, setTotal] = useState(0)

  useEffect(()=>{
    // get product lists from server
    Axios.get(backend+'/api/gallery/Shoes').then(res=>{
      setHighlightCategories(res.data)
    })


    Axios.get(backend+'/api/gallery/Shoes').then(res=>{
      console.log(res.data)
    })

    
    Axios.post(backend+'/api/gallery/Shoes').then(res=>{
      setTotal(res.data)
    })
  },[])
  return (
    <>
    {
      highlightCategories && 
      <>
        {highlightCategories.map((category) => (
          <List title={category.category} link={category.category} items={category.data}/>
        ))}
      </>
    }
    </>
  )
}

export default GalleryPage