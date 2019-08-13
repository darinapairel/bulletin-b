import React from 'react'
import Advertisement from './Advertisement';

export default class FavouriteAdverticement extends React.Component{
    state = {products:[]}
    componentWillMount = () => {
        this.setState( { products: { ...localStorage } } )
    }
    renderFavAdv = () => {
        return Object.keys(localStorage).map(k => <Advertisement product={JSON.parse(localStorage.getItem(k))}/>)
    }
    render(){
        return  <div>{this.renderFavAdv()}</div>
        
    }
}