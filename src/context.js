import React, { Component } from 'react'
import {storeProducts, detailProduct} from './data'
import { ThemeConsumer } from 'styled-components'

const ProductContext = React.createContext()
//Provider
//Consumer

class ProductProvider extends Component {

    state={
        products:[],
        detailProduct:detailProduct,
        cart:storeProducts,
        modalOpen:false,
        modalProduct:detailProduct,
        cartSubTotal:0,
        cartTax:0,
        cartTotal:0
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
        let tempProducts = [...this.state.products]
        const index = tempProducts.indexOf(this.getItem(id))
        const product = tempProducts[index]
        product.inCart = true
        product.count = 1
        product.total = product.price

        this.setState({tempProducts, cart:[...this.state.cart, product]})
    }

    openModal = id =>{
        const product = this.getItem(id)
        this.setState({modalProduct:product, modalOpen:true})
    }

    closeModal = () =>{
        this.setState({modalOpen:false})
    }

    increment = (id) =>{
        console.log('this is increment method')
    }

    decrement = (id) =>{
        console.log('this is decrement method')
    }

    removeItem = (id) =>{
        console.log('remove item!')
    }

    clearCart = () =>{
        console.log('clear cart!')
    }



    render() {
        return (
            <ProductContext.Provider value={{
                    ...this.state,
                    handleDetail:this.handleDetail,
                    addToCart:this.addToCart,
                    openModal:this.openModal,
                    closeModal:this.closeModal,
                    increment:this.increment,
                    decrement:this.decrement,
                    removeItem:this.removeItem,
                    clearCart:this.clearCart
                }}>
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}


const ProductConsumer = ProductContext.Consumer

export {ProductProvider, ProductConsumer}