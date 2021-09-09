import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from "react-responsive-carousel"
import "../style.css"
import StarRatings from "react-star-ratings"
import 'font-awesome/css/font-awesome.min.css'

import * as advericementAction from '../actions/advericementAction'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'

const numPrettier = (num) => new Intl.NumberFormat().format(num) 

class Advertisement extends React.Component{
  state={btnClass:''}

  setFavourite = (e) => {
    this.props.addToFavourite(this.props.product.id)
  }
  render(){

    const {product, favourites} = this.props
    const btnClass = favourites.includes(product.id) ? 'btn-floating-favourite' : ''

    return(
        <article className="adverisements_advertisement advertisement row">
          <div className="col s12">
            <div className="card ">
              <div className="card-image">
                <Carousel  showThumbs={false}>{product.pictures.map((picture, i)=><img src={picture} key={i}/>)}</Carousel>
                <span className="advertisement_title card-title">{product.title}</span>
                <button className="btn-floating halfway-fab waves-effect waves-light " onClick={this.setFavourite} id={this.props.product.id} ><i className={`fa fa-heart ${btnClass}`}></i></button>
              </div>
              <div className="card-content">
                <StarRatings rating={product.seller_rating} starRatedColor="gold" numberOfStars={5} name='rating'/>         
                <div className="advertisement_price">{numPrettier(product.price)}₽</div>
                <div className="advertisement_name">{product.seller_name}</div>
              </div>
            </div>           
          </div>
        </article>
    )
  }
}


function mapStateToProps(state) {
  return {
      favourites: state.advList.favourites
  }
}

function mapDispatchToProps (dispatch) {
  return {
      addToFavourite: bindActionCreators(advericementAction.addToFavourite, dispatch)
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Advertisement)