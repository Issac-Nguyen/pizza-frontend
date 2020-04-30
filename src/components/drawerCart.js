import React, {useState, useEffect} from 'react';
import {Row, Col, Tabs, Form, Input, Button, List, Switch, DatePicker, Typography, Divider, Drawer, Spin, message} from 'antd';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import Icon from './Icon'
import {closeCart, clearCart, addOrder} from '../actions/userActions';
import {removeBookAction} from '../actions/orderActions'
import * as _ from 'lodash'
import sendOrderService from '../services/sendOrderService';
import feeService from '../services/getFeeService';
import moment from 'moment'
import { set } from 'date-fns';

function range(start, end) {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}

export const PizzaBookItem = (props) => {
    return (
        <Row className="book-items">
            <Col span={6} className="img-list">
                <img src={props.url} />
            </Col>
            <Col span={5} className="name-list">
                {props.name}
            </Col>
            <Col span={5} className="size-list">
                {props.number} {props.number > 1 ? ' pizzas' : ' pizza'}
            </Col>
            <Col span={5} className="price-list">
                ${props.number * props.price}
            </Col>
            <Col span={3} className="remove-list">
                <Icon name="la-trash-alt" onClick={event => {props.removeAction(props.id)}}/>
            </Col>
        </Row>
    )
}

PizzaBookItem.propTypes = {
    id: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired
}

const layout = {
    labelCol: {
      span: 5,
    },
    wrapperCol: {
      span: 19,
    },
  };
  const tailLayout = {
    wrapperCol: {
      span: 24,
    },
  };

export const DrawerCart = (props) => {
    let [imme, setImme] = useState(true);
    let [sending, setSending] = useState(false);
    let [fee, setFee] = useState(0);
    let [gotFee, setGotFee] = useState(false)
    let [enableBtn, setEnableBtn] = useState({fee: true, order: false});
    
    let total = props.bookItems?.reduce((total, i) => (total + i.price), 0);
    total += fee;
    total = total.toFixed(2);
    const totalText = props.bookItems?.length > 0 ? '$' + total + '(' + 'Eur' + (total * props.rate).toFixed(2) + ')': '';

    useEffect(() => {
    //enable button
        if(sending) {
          setEnableBtn({fee: false, order: false})
          return;
        }
        const enableFee = gotFee ? false: true;
        const enableOrder = !enableFee ? props.bookItems?.length > 0 ? true : false : false;
        setEnableBtn({fee: enableFee, order: enableOrder})
    }, [props.bookItems?.length, gotFee, sending])

    const onGetFee = async () => {
      try {
        await form.validateFields();
        setSending(true)
        feeService({customer_address: form.getFieldValue('customer_address')}).then(res => {
          setSending(false)
          if(!res.data.success) {
            message.error(res.data.msg)
            return
          } else {
            setGotFee(true)
            setFee(parseFloat(res.data.data.fee));
            setEnableBtn({fee: false, order: props.bookItems?.length == 0 ? false : true})
          }
        })
      } catch (err) {
        setSending(false)
      }
    }

    const onFinish = async () => {
      try{
        await form.validateFields();
        const fieldsValue = form.getFieldsValue();
        const values = {
          ...fieldsValue,
          'schedule': fieldsValue['schedule'] ? fieldsValue['schedule'].format('YYYY-MM-DD HH:mm'): fieldsValue['sendimmediate'] ? 'immediately': '',
        };
        
        const bookItems = _.cloneDeep(props.bookItems).map(p => {delete p.bookId; return {...p, pizza_id: p.id}});

        const payload = {...values, email: props.user, order_items: bookItems, total, fee, created_at: new Date().getTime()};
        setSending(true)
        //send order request
        sendOrderService(payload).then(res => {
          setSending(false)
          if(!res.data.success) {
            message.error(res.data.msg)
          } else {
            form.resetFields();
            props.closeCart();
            props.clearCart();
            props.addOrder({...payload})
            setFee(0)
            message.success('Pizza ordered successfully')
          }
        })
      } catch(err) {
        setSending(false)
      }
      

      };

      const configSchedule = {
        rules: [
          {
            type: 'object',
            required: !imme,
            message: 'Please select time!',
          },
        ],
      };
      
    const bookItemsRender = _.groupBy(props.bookItems, 'id')
    const uniqBookItems = _.uniqBy(props.bookItems, 'id').map(p => {
      return {...p, number: bookItemsRender[p.id].length}
    });

    const footerList = (
      <div>
        <div className="fee-list">{'Fee ' + '$' + fee}</div>
        <div className="total-list">{'Total ' + totalText}</div>
      </div>
    )

    const disabledDate = (current) => {
      return current < moment().startOf('day');
  }
  
  const disabledTime = () => {
    return {
      disabledHours: () => range(0, 24).filter(v => v < (new Date().getHours() + 1) || v > 21)
    };
  }

    const [form] = Form.useForm();
    return (
        <Drawer
          title="Your pizza(s)"
          placement="right"
          width={720}
          closable={true}
          onClose={props.closeCart}
          visible={props.showCart}
        >
          <List
            size="small"
            header={<div>Booked Pizzas</div>}
                footer={footerList}
            bordered
            dataSource={uniqBookItems}
            renderItem={item => <PizzaBookItem {...item} removeAction={props.removeBook}/>}
            className="booked-items-list"
            />
            <Divider orientation="left">Order Information</Divider>
            <Form
      {...layout}
      form={form}
      name="orderForm"
      initialValues={{
        sendimmediate: true
      }}
    >
      <Form.Item
        label="Name"
        name="customer_name"
        rules={[
          {
            required: true,
            message: 'Please input your name!',
          },
          {
            whitespace: true,
            message: 'Password not valid'
          },
          {
            max: 50,
            message: 'Only 50 characters'
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Address"
        name="customer_address"
        rules={[
          {
            required: true,
            message: 'Please input your address!',
          },
          {
            whitespace: true,
            message: 'Password not valid'
          },
          {
            max: 50,
            message: 'Only 50 characters'
          }
        ]}
      >
        <Input onChange={evt => {setGotFee(false)}} />
      </Form.Item>

      <Form.Item
        label="Phone"
        name="customer_phone"
        rules={[
          {
            required: true,
            message: 'Please input your phone!',
          },
          {
            whitespace: true,
            message: 'Password not valid'
          },
          {
            max: 50,
            message: 'Only 50 characters'
          }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="sendimmediate" label="Send immediately">
        <Switch defaultChecked checked={imme} onChange={(vl) => {setImme(vl); setTimeout(() => {form.validateFields(['schedule'])}, 0) }}/>
      </Form.Item>
      <Form.Item name="schedule" label="Schedule" {...configSchedule}>
        <DatePicker showTime format="YYYY/MM/DD HH:mm" disabled={imme} disabledDate={disabledDate} disabledTime={disabledTime}/>
      </Form.Item>
      <Row justify="center">
        <Spin spinning={sending} />
      </Row>
      <Row>
        <Col span={12}>
          <Form.Item {...tailLayout}>
            <Button type="danger" htmlType="submit" id="fee-btn" disabled={!enableBtn.fee || sending} onClick={onGetFee}>
              Get Fee
            </Button>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item {...tailLayout}>
          <Button type="danger" htmlType="submit" id="order-btn" disabled={!enableBtn.order || sending} onClick={onFinish}>
            Order
          </Button>
        </Form.Item>
        </Col>
      </Row>
      
    </Form>
        </Drawer>
    
    )
}

const mapStateToProps = state => ({
    bookItems: state.book,
    showCart: state.showCart,
    user: state.user,
    rate: state.rate
});

const mapDispatchToProps = dispatch => ({
    closeCart: () => {dispatch(closeCart())},
    removeBook: id => {dispatch(removeBookAction(id))},
    clearCart: () => {dispatch(clearCart())},
    addOrder: (order) => {dispatch(addOrder(order))}
})

export default connect(mapStateToProps, mapDispatchToProps)(DrawerCart);