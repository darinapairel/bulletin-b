import React from 'react'
import Advertisement from './Advertisement'
import { Link } from 'react-router-dom'


export default class FavouriteAdverticement extends React.Component{
    state = {products:[]}
    componentWillMount = () => {
        this.setState( { products: { ...localStorage } } )
    }
    renderFavAdv = () => {
        return Object.keys(localStorage).map((k,i) => <Advertisement key={i} btnClass="btn-floating-favourite" product={JSON.parse(localStorage.getItem(k))}/>)
    }
    render(){
        return  <div>
            <Link to="/"><i className="fa fa-home"></i></Link>
            {this.renderFavAdv()}
        </div>
        
    }
}