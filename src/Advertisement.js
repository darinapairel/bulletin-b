import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import StarRatings from 'react-star-ratings';
 

const numPrettier = (num)=>{
  if (num){ 
    num = String(num)
    if(Number.isInteger(num.length/3)){
      return num.split(/(\d{3})/).join(" ")
    }else{
      return num.split().reverse().join("").split(/(\d{3})/).reverse().join(" ")
    }
  }else{
    return null
  }  
}

class Advertisement extends React.Component{
  render(){
    const {product} = this.props
    return(
        <article className="adverisements_advertisement advertisement">
          <h1 className="advertisement_title">{product.title}</h1>
          <span className="advertisement_name">{product.seller_name}</span>
          <StarRatings rating={product.seller_rating} starRatedColor="gold" numberOfStars={5} name='rating'/>         
          <Carousel width="500px" showThumbs={false}>{product.pictures.map((picture, i)=><img src={picture} key={i}/>)}</Carousel>
          <span className="advertisement_price">{numPrettier(product.price)}₽</span>
        </article>
    )
  }
}
export default Advertisement