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
        cart:[],
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

        this.setState({tempProducts, cart:[...this.state.cart, product]},this.addTotals)
    }

    openModal = id =>{
        const product = this.getItem(id)
        this.setState({modalProduct:product, modalOpen:true})
    }

    closeModal = () =>{
        this.setState({modalOpen:false})
    }

    increment = (id) =>{
        const item = this.getItem(id)
        item.count++
        item.total = item.count * item.price

        this.addTotals()

        let cart = this.state.cart
        this.setState({cart:[...cart]})
    }

    decrement = (id) =>{
        const item = this.getItem(id)
        if(item.count != 1){
            item.count--
        }
        item.total = item.count * item.price

        this.addTotals()

        let cart = this.state.cart
        this.setState({cart:[...cart]})
    }

    removeItem = (id) =>{
        let tempProducts = [...this.state.products]
        let tempCart = [...this.state.cart]

        tempCart = tempCart.filter(item=>item.id !== id)

        const index = tempProducts.indexOf(this.getItem(id))
        let removedProduct = tempProducts[index]
        removedProduct.inCart = false
        removedProduct.count = 0
        removedProduct.total = 0

        this.setState(
            () => {
                return {
                    cart:[...tempCart],
                    products:[...tempProducts]
                }
            }, () => {this.addTotals()}
        )
    }

    clearCart = () =>{
        this.setProducts()

        this.setState({cart:[], cartSubTotal:0,cartTotal:0,cartTax:0})
    }

    addTotals = () =>{
        let subTotal = 0;
        this.state.cart.map(item => (subTotal += item.total))

        const tempTax = subTotal * 0.1;
        const tax = parseFloat(tempTax.toFixed(2))

        const total = subTotal + tax

        this.setState({cartSubTotal:subTotal,cartTax:tax,cartTotal:total})
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