import React from 'react'
import Advertisement from './Advertisement';



class AdvertisementsList extends React.Component {
   state={
       firstPrice:0,
       secondPrice:Number.MAX_SAFE_INTEGER,
       selectedCategory: 'any',
       selectedSort: 'price'

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

        return products.map((product, key)=><Advertisement product={product} sellers={sellers} key={key}/>)
   }

   render(){
    return <section>
        <article className="filter">
            
            <input type="text" className="search" value={this.state.firstPrice} onChange={this.firstPrice} />
            <input type="text" className="search" value={this.state.secondPrice} onChange={this.secondPrice} />
            
            <select name="category" value={this.state.selectedCategory} onChange={this.categoryOnChange}>
                <option value="any">любая категория</option>
                <option value="immovable">недвижимость</option>
                <option value="cameras">камеры</option>
                <option value="auto">автомобили</option>
                <option value="laptops">ноутбуки</option>
            </select>

            <select name="sort" value={this.state.selectedSort} onChange={this.sortOnChange}>
                <option value="rating">по популярности</option>
                <option value="price">по возрастанию цены</option>
            </select>

        </article>
        <article className="advertisements">
            {this.mapAdv()}
        </article>
    </section>
   }
}

export default AdvertisementsList