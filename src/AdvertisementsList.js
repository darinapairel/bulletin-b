import React from 'react'
import Advertisement from './Advertisement';

const AdvertisementsList = (props) => {
    const {products, sellers} = props
    return <section className="advertisements">
        {products.map((product, key)=><Advertisement product={product} sellers={sellers} key={key}/>)
            }
    </section>
}



export default AdvertisementsList