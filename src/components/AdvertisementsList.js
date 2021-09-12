import React from 'react'
import Advertisement from './Advertisement';
import { Link } from 'react-router-dom'
import M from 'materialize-css/dist/js/materialize.min.js'
import 'materialize-css/dist/css/materialize.min.css'
import noUiSlider from 'materialize-css/extras/noUiSlider/nouislider.js'
import 'materialize-css/extras/noUiSlider/nouislider.css'

class AdvertisementsList extends React.Component {

   state={
       prices:[0, 1000000],
       selectedCategory: 'any',
       selectedSort: 'price',
    }

    componentDidMount(){
        const elems = document.querySelectorAll('select')
        const options = document.querySelectorAll('option')
        let instances = M.FormSelect.init(elems, options)
         
        const slider = document.getElementById('priceSlider')
        let sliderValues =[ 
            document.getElementById('lower-price'),
            document.getElementById('upper-price')
        ]
        noUiSlider.create(slider, {
            start: [0, 100000],
            connect: true,
            step: 100,
            tooltips: false,
            range: {
                'min': 0,
                'max': 100000
            }
        })
        slider.noUiSlider.on('change', (values,handle)=>{
            var prices = this.state.prices
            prices[handle] = values[handle]
            sliderValues[handle].innerHTML = values[handle]
            this.setState({...prices})

        })
    }

    categoryOnChange = (e) => {
        this.setState({selectedCategory: e.target.value})
    }

    sortOnChange = (e) => {
        this.setState({selectedSort: e.target.value})
    }

    mapAdv = () => {

        let {products} = this.props
        let {prices} = this.state

        products = products.filter(p => {
            let price = p.price || ''
            return price>=prices[0] && price<=prices[1]
        })
        if (this.state.selectedSort === 'price')
            products = products.sort((a,b) => {
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

        return products.map((product, key)=><Advertisement /*addToFavourite = {this.props.addToFavourite}*/ product={product} key={key}/>)
   }

   render(){
    return <section>
        <Link to='/favourite'><i className="fa fa-heart"></i></Link>
        <header className="filter row">
            <form className="col s12"> 
            <div className="input-field col s12 l6" style={{marginTop: "3.7rem"}}>  
                <label style={{position: "absolute", top: "-68px"}}>Цена</label>
                <div id="priceSlider"></div> 

                <div className="col s3 l2 left-align">
                    <span id="lower-price"></span>
                </div>
                <div className="col s3 l2 offset-l8 offset-s6 right-align">
                    <span id="upper-price"></span> 
                </div> 
            </div> 

            <div className="input-field col l3 s12">
   <select name="category" 
        value={this.state.selectedCategory} 
        ref={node=>{this.select = node}} 
        onChange={this.categoryOnChange}>
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
        </header>
        <section className="advertisements container">
            {this.mapAdv()}
        </section>
    </section>
   }
}


export default AdvertisementsList
