import React from 'react'
import {connect} from 'react-redux'
import {Row, Col, Collapse, List, Divider, Alert} from 'antd'
import * as _ from 'lodash'
import {format} from 'date-fns'
import Currency from './currency'

const { Panel } = Collapse;

export const Order = (props) => {
    let orders = _.groupBy(props.order, o => (format(new Date(o.created_at), 'yyyy/MM/dd')));

    const renderOrderItem = (orderItems) => {
        let items = _.uniqBy(orderItems, 'id');
        items = items.map(i => {
            const item = {...i};
            const length = orderItems.filter(j => j.id === i.id).length;
            item.number = length;
            return item;
        })
        return (
            <List
                header={<div>Booked pizzas</div>}
                footer={<div></div>}
                bordered
                dataSource={items}
                renderItem={item => (
                    <Row className="order-order-item">
                        <Col span={6} className="order-order-img"><img src={item.url} /></Col>
                        <Col span={6}>{item.name}</Col>
                        <Col span={6}>{`${item.number} pizza${item.number > 1 ? 's' : ''}`}</Col>
                        <Col span={6}><Currency usd={item.number * item.price} eur={item.number * item.priceEUR} showCurrency={props.showCurrency} showFull={true} /></Col>
                    </Row>
                )}
    />
        )
    }

    const renderNest = (id, order) => {
        const header = <Row>
            <Col span={5}>
                {order.customer_name}
            </Col>
            <Col span={5}>
                {order.customer_address}
            </Col>
            <Col span={5}>
                {order.customer_phone}
            </Col>
            <Col span={5}>
                Delivery: {order.schedule}
            </Col>
            <Col span={4}>
            Total: &nbsp; <Currency usd={order.totalUSD} eur={order.totalEUR} showCurrency={props.showCurrency} showFull={true} />
            </Col>
        </Row>

        return (
            <Collapse key={id}>
                <Panel header={header} key="1" className="order-items-panel">
                    {renderOrderItem(order.order_items)}
                </Panel>
            </Collapse>
        )
    }

    let arrayPanel  = [];
    _.forEach(orders, (vl, k) => {
        arrayPanel.push(<Panel header={k} key={k}>
            <Collapse>
                {vl.map((e, index) => renderNest(index, e))}
            </Collapse>
        </Panel>)
    })
        
    return (
        <Row>
            <Col span={24}>
            <Divider>Your orders:</Divider>
            
                {arrayPanel.length > 0 && (
                    <Collapse>
                    {arrayPanel}
                </Collapse>
                )}
               {arrayPanel.length == 0 && (
                <Row justify="center">
                    <Alert message="You don't have any order today. Please book our pizzas" type="error" />
                </Row>
               )}
                </Col>
               </Row>
    )
}

const mapStateToProps = state => ({
    login: state.login,
    order: state.order,
    showCurrency: state.showCurrency
})
export default connect(mapStateToProps)(Order);