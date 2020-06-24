import React, { Component } from 'react'
import {storeProducts, detailProduct} from './data'

const ProductContext = React.createContext()
//Provider
//Consumer

class ProductProvider extends Component {

    state={
        products:[],
        detailProduct:detailProduct
    }


    //We are doing this because our core data is array of objects
    //When we are passing object we are acctually passing reference...
    //every time when we change inChart for example than our core data
    //will be affected and corrupted, (it suppose to stay default data)
    //at least for this project...
    //There could be easier and different solution than this one cant be bothered right now
    
    setProducts = () => {
        let products = []
        storeProducts.forEach(item =>{
            const singleItem = {...item};
            products = [...products,singleItem];
        })

        this.setState({products})
    }

    componentDidMount(){
        this.setProducts()
    }

    getItem = (id) =>{
        const product = this.state.products.find(item => item.id === id)
        return product;
    }

    handleDetail = (id) =>{
        const product = this.getItem(id)
        this.setState({detailProduct:product})
    }

    addToCart = (id) =>{
        console.log('hello cart id:',id)
    }

    render() {
        return (
            <ProductContext.Provider value={{
                    ...this.state,
                    handleDetail:this.handleDetail,
                    addToCart:this.addToCart
                }}>
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}


const ProductConsumer = ProductContext.Consumer

export {ProductProvider, ProductConsumer}