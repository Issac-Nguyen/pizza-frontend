import React from 'react'
import {connect} from 'react-redux'
import {Row, Col, Collapse, List, Divider, Alert} from 'antd'
import * as _ from 'lodash'
import {format} from 'date-fns'

const { Panel } = Collapse;

export const Order = (props) => {
    let orders = _.groupBy(props.order, o => (format(new Date(o.created_at), 'yyyy/MM/dd')));

    const renderOrderItem = (orderItems) => {
        return (
            <List
                header={<div>Booked pizzas</div>}
                footer={<div></div>}
                bordered
                dataSource={orderItems}
                renderItem={item => (
                    <Row className="order-order-item">
                        <Col span={6} className="order-order-img"><img src={item.url} /></Col>
                        <Col span={6}>{item.name}</Col>
                        <Col span={6}>${item.price}</Col>
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
            {`Total: $${order.total} (Eur ${(order.total * props.rate).toFixed(2)})`}
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
    rate: state.rate
})
export default connect(mapStateToProps)(Order);