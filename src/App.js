import React from 'react'
import './App.css'
import 'materialize-css'
import 'materialize-css/dist/css/materialize.min.css'
import AdvertisementsList from './AdvertisementsList.js'
import FavouriteAdverticement from './FavouriteAdverticement.js'
import { Link, Route, BrowserRouter } from 'react-router-dom'
import 'font-awesome/css/font-awesome.min.css'


class App extends React.Component {
  state = {
    products:[],
    sellers:[]
  }

  componentWillMount(){
    Promise.all(['https://avito.dump.academy/sellers/', 'https://avito.dump.academy/products'].map(url => fetch(url).then(j => j.json()) )) 
    .then(data=>{
      
      let sellers = data[0].data
      let products = data[1].data
      console.log(data)
      products = products.map(p => {
        let seller = sellers.find(s => s.id === p.relationships.seller) || {name: '', rating: 0}
        return {...p, seller_name: seller.name, seller_rating: seller.rating}
      })

      this.setState({...this.state, products, sellers})

    })
}
  render(){
    const advList = () => <AdvertisementsList sellers={this.state.sellers} products={this.state.products}/>
    const favAdv = () => <FavouriteAdverticement/>
  return (
    <div className="App container">
      <BrowserRouter>
      <div>
        <Route exact path="/" component={advList}/>
        <Route exact path='/favourite' component={favAdv}/>        
      </div>
      </BrowserRouter> 
    </div>
  );
}
}

export default App;
