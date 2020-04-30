import React from 'react';
import {Badge} from 'antd';
import { connect } from 'react-redux';
import Icon from './Icon';
import {showCart} from '../actions/userActions'
import { useState } from 'react';

export const Cart = (props) => {
    return (
        <div className="cart-ico" onClick={props.showCart}>
                <Badge count={props.book.length}>
                    <Icon name="la-shopping-cart" />
                </Badge>
        </div>
    )
}

const mapStateToProps = state => ({
    ...state
   })

const mapDispatchToProps = dispatch => ({
    showCart: () => {dispatch(showCart())}
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart);