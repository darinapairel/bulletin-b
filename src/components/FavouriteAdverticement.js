import React from 'react'
import Advertisement from './Advertisement'
import { Link } from 'react-router-dom'
import * as advericementAction from '../actions/advericementAction'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class FavouriteAdverticement extends React.Component{
    state = {products:[]}
    componentWillMount = () => {
        this.setState( { products: { ...localStorage } } )
    }
    renderFavAdv = () => {
        let favourites = this.props.products.filter(p => this.props.favourites.includes(p.id))
    
        return favourites.map((f, i) => { return <Advertisement key={i} btnClass="btn-floating-favourite" product={f} /> })
    }
    render(){
        return  <div>
            <Link to={process.env.PUBLIC_URL}><i className="fa fa-home"></i></Link>
            {this.renderFavAdv()}
        </div>
        
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


export default connect(mapStateToProps, mapDispatchToProps)(FavouriteAdverticement)