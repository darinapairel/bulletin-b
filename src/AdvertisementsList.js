import React from 'react'
import Advertisement from './Advertisement';
import { Link } from 'react-router-dom'
import M from 'materialize-css/dist/js/materialize.min.js'
import 'materialize-css/dist/css/materialize.min.css'
import noUiSlider from 'materialize-css/extras/noUiSlider/nouislider.js'
import 'materialize-css/extras/noUiSlider/nouislider.css'

class AdvertisementsList extends React.Component {
   state={
       firstPrice:0,
       secondPrice:900000000,
       selectedCategory: 'any',
       selectedSort: 'price'

    }
    
    componentDidMount(){
        const elems = document.querySelectorAll('select')
        const options = document.querySelectorAll('option')
        let instances = M.FormSelect.init(elems, options)
         
        const slider = document.getElementById('priceSlider')
        noUiSlider.create(slider, {
            start: [0, 1000000],
            connect: true,
            step: 1000,
            range: {
                'min': 0,
                'max': 9000000
                
            }

        })
    }

    firstPrice = (e) => {
        this.setState({firstPrice: e.target.value})
    }
    secondPrice = (e) => {
        this.setState({secondPrice: e.target.value})
    }
    categoryOnChange = (e) => {
        this.setState({selectedCategory: e.target.value})
    }
    sortOnChange = (e) => {
        this.setState({selectedSort: e.target.value})
    }
    mapAdv = () => {
        let {products, sellers} = this.props
        let {firstPrice, secondPrice} = this.state

        products = products.filter(p => {
            let price = p.price || ''
            return price>=firstPrice && price<=secondPrice
        })
        if (this.state.selectedSort === 'price')
            products = products.sort((a,b)=>{
                if (a.price > b.price)
                    return 1

                if (a.price < b.price)
                    return -1

                return 0
            })
        else if (this.state.selectedSort === 'rating')
        products = products.sort((a,b)=>{
            if( a.seller_rating < b.seller_rating )
                return 1
            if ( a.seller_rating > b.seller_rating )
                return -1
            return 0
        }) 
        
        if (this.state.selectedCategory !== "any"){
            products = products.filter(p=>{
                let category = p.category
                return category === this.state.selectedCategory
            })
        }

        return products.map((product, key)=><Advertisement product={product} key={key}/>)
   }

   render(){
    return <section>
        <Link to='/favourite'><i className="fa fa-heart"></i></Link>
        <article className="filter row">
            <form className="col s12"> 

            <div className="input-field col s12 l6">   
                <div id="priceSlider"></div>            
                {/* <input type="text" className="search" value={this.state.firstPrice} onChange={this.firstPrice} />
                <input type="text" className="search" value={this.state.secondPrice} onChange={this.secondPrice} /> */}
            </div> 

            <div className="input-field col l3 s12">
                <select name="category" value={this.state.selectedCategory} onChange={this.categoryOnChange}>
                    <option value="any">любая категория</option>
                    <option value="immovable">недвижимость</option>
                    <option value="cameras">камеры</option>
                    <option value="auto">автомобили</option>
                    <option value="laptops">ноутбуки</option>
                </select>
                <label>Категория</label>
            </div>   

            <div className="input-field col s12 l3">
                <select name="sort" value={this.state.selectedSort} onChange={this.sortOnChange}>
                    <option value="rating">по популярности</option>
                    <option value="price">по возрастанию цены</option>
                </select>
                <label>Сортировка</label>
            </div>
            </form>
        </article>
        <article className="advertisements">
            {this.mapAdv()}
        </article>
    </section>
   }
}

export default AdvertisementsList