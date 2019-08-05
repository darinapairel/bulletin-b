import React, { useState } from 'react'
import Advertisement from './Advertisement';



class AdvertisementsList extends React.Component {
   state={
       firstPrice:'',
       secondPrice:'',

    }
   firstPrice = (e) => {
       this.setState({firstPrice: e.target.value})
   }
   firstPrice = (e) => {
    this.setState({secondPrice: e.target.value})
}
   mapAdv = ()=> {
       
    let {products, sellers} = this.props
       let {firstPrice} = this.state

       products = products.filter(p => {
           let price = p.price || ''
           return price.toString().indexOf(firstPrice) > -1 
           //select html
           // secondPrice
        })
       return products.map((product, key)=><Advertisement product={product} sellers={sellers} key={key}/>)
   }

   render(){
    return <section>
        <article className="filter">
            <input type="text" className="search" value={this.state.firstPrice} onChange={this.firstPrice} />
            <input type="text" className="search" value={this.state.firstPrice} onChange={this.getAdv} />
        </article>
        <article className="advertisements">
            {this.mapAdv()}
        </article>
    </section>
   }
}

export default AdvertisementsList