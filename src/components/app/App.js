import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import {Row, Col, message, Spin, Pagination, Select} from 'antd';
import './App.css';
import PizzaList from '../pizzaList';
import Cart from '../cart';
import {changeCurrency} from '../../actions/userActions'
import getAllPizzasService from '../../services/getAllPizzasService'

const { Option } = Select;

const App = (props) => {

  let [pizzas, setPizzas] = useState([]); 
  let [sending, setSending] = useState(false);
  let [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    setSending(true)
    getAllPizzasService(1)
    .then(res => {
      setSending(false)
      if(!res.data.success) {
        message.error(res.data.msg)
      } else {
        setPizzas(res.data.data.pizzas)
        setTotalPage(res.data.data.totalItems)
      }
    })
  }, [])

  const onChangePage = (page) => {
    setSending(true)
    getAllPizzasService(page)
    .then(res => {
      setSending(false)
      if(!res.data.success) {
        message.error(res.data.msg)
      } else {
        setPizzas(res.data.data.pizzas)
        setTotalPage(res.data.data.totalItems)
      }
    })
  }

  return (
    <div>
      <Cart />
      <Row justify="center" className="main">
        <Col span={20}>
          <Row justify="center" className="loading-area">
            <Spin spinning={sending}/>
          </Row>
          <Row justify="end" className="show-currency">
          Change currency: <Select defaultValue="usd" value={props.showCurrency} style={{ width: 120, margin: '0 1rem' }} onChange={props.changeCurrency}>
            <Option value="usd">USD</Option>
            <Option value="eur">EUR</Option>
          </Select>
          </Row>
            <PizzaList pizzas={pizzas}/>
         
          <Row justify={"end"}>
            <Pagination defaultCurrent={1} total={totalPage} pageSize={8} onChange={onChangePage}/>
        </Row>
        </Col>
      </Row>
      
    </div>
  );
}

const mapStateToProps = state => ({
  showCurrency: state.showCurrency
 })

const mapDispatchToProps = dispatch => ({
  changeCurrency: curr => {dispatch(changeCurrency(curr))}
})


export default connect(mapStateToProps, mapDispatchToProps) (App);
