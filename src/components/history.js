import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux'
import MustLogin from './mustLogin';
import {startOfDay, endOfDay} from 'date-fns'
import getHistoryService from '../services/getHistoryService';
import {format} from 'date-fns'
import {Row, Col, Collapse, List, message, DatePicker, Divider, Alert, Spin } from 'antd'
import * as _ from 'lodash'
import moment from 'moment';
import {logout} from '../actions/userActions'

const { Panel } = Collapse;

export const History = (props) => {
    let [result, setResult] = useState([])
    let [dateFilter, setDateFilter] = useState(new Date().getTime())
    let [sending, setSending] = useState(false)
    let arrayPanel  = [];
    let resArr = [];

    useEffect(() => {
        if(!props.login)
            return;
        setSending(true)
        getHistoryService(startOfDay(new Date(dateFilter)).getTime(), endOfDay(new Date(dateFilter)).getTime())
        .then(res => {
            
            setSending(false)
            if(!res.data.success) {
                message.error(res.data.msg)
                if(res.data.msg == 'Session timeout. Please re-login') {
                    props.logout();
                }
            } else {
                // console.log(res.data.data)
                resArr = res.data.data;
                let orders = _.groupBy(res.data.data, o => (format(new Date(o.created_at), 'yyyy/MM/dd')));

                _.forEach(orders, (vl, k) => {
                    const vlUniq = _.uniqBy(vl, 'order_id')
                    arrayPanel.push(<Panel header={k} key={k} className="day-header">
                        <Collapse>
                            {vlUniq.map((e, index) => renderNest(index, e))}
                        </Collapse>
                    </Panel>)
                })

                setResult(arrayPanel);
            }
        })
        .catch(err => {
        })
    }, [dateFilter, props.login, props.order])

    

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
        const orderItems = resArr.filter(i => i.order_id == order.order_id);
        return (
            <Collapse key={id}>
                <Panel header={header} key="1" className="order-items-panel">
                    {renderOrderItem(orderItems)}
                </Panel>
            </Collapse>
        )
    }

    const disabledDate = (current) => {
        return current < moment().startOf('day');
    }

    const onChangeDate = (date, dateString) => {
        setDateFilter(date.valueOf())
    }

    return (
        <div>
            {!props.login && <MustLogin/>}
            {props.login && <>
            <Row justify="center">
                <Col span="20">
                <Row style={{marginTop: '1rem'}}>
                    <Col span={6}>Choose date history</Col>
                    <Col span={18}>
                    <DatePicker format="YYYY/MM/DD"
                            showToday defaultValue={moment()}
                            onChange={onChangeDate}/>
                    </Col>
                        
                    </Row>
                    <Divider>Your history</Divider>
                    {!!sending && <Spin spinning={sending}/>}
                    {result.length == 0 && 
                    <>
                        <Alert type="info" message={"You don't have any order on " + format(new Date(dateFilter), 'yyyy/MM/dd') }/>
                    </>}
                    {result.length > 0 &&    <Collapse>
                    {result}
                    </Collapse>
                    }
                </Col>
            </Row>
            
            </>}
        </div>
    )
}

const mapStateToProps = state => ({
    login: state.login,
    order: state.order,
    rate: state.rate
})

const mapDispatchToProps = dispatch => ({
    logout: () => {dispatch(logout())}
})

export default connect(mapStateToProps, mapDispatchToProps)(History);