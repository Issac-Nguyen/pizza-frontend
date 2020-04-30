import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import {Row, Col, message, Spin, Pagination} from 'antd';
import './App.css';
import PizzaList from '../pizzaList';
import Cart from '../cart';
import getAllPizzasService from '../../services/getAllPizzasService'

function App() {

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
  ...state
 })


export default connect(mapStateToProps) (App);
