import { useContext } from "react"

import { ProductsContext } from "../../contexts/products.contex"
import ProductCard from "../../product-card/product-card.component"

import './shop.styles.scss'

const Shop =()=>{

    const {products}=useContext(ProductsContext)
    // const {id}=product
    return(
        <div className="products-container">
        {products.map((product)=>(
            <ProductCard key={product.id} product={product}/>
        ))}
        </div>
    )

}

export default Shop