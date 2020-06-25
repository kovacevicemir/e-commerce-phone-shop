import React from 'react'

const CartItem = ({item,value}) => {
    const {title,count,id,img,price,total} = item
    const {increment,decrement,removeItem,clearCart} = value

    return (
        <div className="row my-1 text-capitalize text-center">
            <div className="col-10 mx-auto col-lg-2">
                <img src={img} style={{width:'5rem',height:'5rem'}} className='img-fluid' alt={title} />
            </div>
            <div className="col-10 mx-auto col-lg-2">
                <p className="lead">{title}</p>
            </div>
            <div className="col-10 mx-auto col-lg-2">
                <h5>${price}</h5>
            </div>

            <div className="col-10 mx-auto col-lg-2 my-2 my-lg-0">
                <div className="d-flex justify-content-center">
                    <div>
                        <span className="btn btn-black mx-1" onClick={() =>decrement(id)}>
                            -
                       </span>
                        <span className="btn btn-black mx-1" >
                            {count}
                       </span>
                        <span className="btn btn-black mx-1" onClick={() =>increment(id)}>
                            +
                       </span>
                    </div>
                </div>
            </div>

            <div className="col-10 mx-auto col-lg-2">
                <i onClick={() =>removeItem(id)} className='trash alternate icon cart-custom large'></i>
            </div>
            <div className="col-10 mx-auto col-lg-2">
                <strong>item total: ${total}</strong>
            </div>
        </div>
    )
}

export default CartItem
