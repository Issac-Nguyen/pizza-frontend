import React from 'react';
import {Row, Col} from 'antd';
import Pizza from './pizza';

const PizzaList = (props) => {
    const allPizzas = props.pizzas?.map(i => <Pizza key={i.id} {...i} />);

    return (
        <Row className="pizza-area">
            {allPizzas}
        </Row>
    )
}

export default PizzaList;