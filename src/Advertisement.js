import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from "react-responsive-carousel"
import StarRatings from "react-star-ratings"
import 'font-awesome/css/font-awesome.min.css'

const numPrettier = (num)=>{
  if (num){ 
    num = String(num)
    if(Number.isInteger(num.length/3)){
      return num.split(/(\d{3})/).join(" ")
    }else{
      let j = num.length
      j = num.length > 3 ? j % 3 : 0 
      
      return j ? num.substr(0, j) + " " : "" + num.substr(j).replace(/(\d{3})(?=\d)/g, " ")
    }
  }else{
    return null
  }  
}

class Advertisement extends React.Component{
  setFavourite = (e) => {
    let favouriteProduct = JSON.stringify(this.props.product)
    localStorage.setItem(this.props.product.id, favouriteProduct)
  }
  render(){
    const {product} = this.props
    return(
        <article className="adverisements_advertisement advertisement">
          <h1 className="advertisement_title">{product.title}</h1>
          <span className="advertisement_name">{product.seller_name}</span>
          <StarRatings rating={product.seller_rating} starRatedColor="gold" numberOfStars={5} name='rating'/>         
          <Carousel width="500px" showThumbs={false}>{product.pictures.map((picture, i)=><img src={picture} key={i}/>)}</Carousel>
          <span className="advertisement_price">{numPrettier(product.price)}₽</span>
          <button onClick={this.setFavourite} id={this.props.product.id} ><i className="fa fa-heart"></i></button>
        </article>
    )
  }
}
export default Advertisement