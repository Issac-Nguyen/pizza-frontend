import React , {useState} from 'react';
import {Row, Col, Select, Button} from 'antd';
import { connect } from 'react-redux';
import {bookAction} from '../actions/orderActions'
import PropTypes from 'prop-types';
import Currency from './currency'

export const PizzaItem = (props) => {
    const addPizza = (e) => {
        const pizzaInfo = {
            id: props.id,
            name: props.name,
            url: props.url,
            price: props.price,
            priceEUR: props.priceEUR
        }
        props.book(pizzaInfo);
    }
    
    return (
        <Col span={5} className="item" id={props.id}>
            <div className="item-img">
                <img src={props.url} />
            </div>
            <div className="item-des">
                <div className="name">
                    {props.name}
                </div>
                <div className="price">
                    <Currency usd={props.price} eur={props.priceEUR}/>
                </div>
                <Button className="add-cart" type="danger" onClick={addPizza}>Add to cart</Button>
            </div>
        </Col>
    )
}

PizzaItem.propTypes = {
    id: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    priceEUR: PropTypes.number.isRequired
}

  
   const mapDispatchToProps = dispatch => ({
    book: (pizza) => {dispatch(bookAction(pizza))}
   })

export default connect(undefined, mapDispatchToProps)(PizzaItem);