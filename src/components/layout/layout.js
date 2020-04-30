import React, {useState, useRef, forwardRef} from 'react';
import {Drawer, Row, Col, Modal} from 'antd'
import "./layout.css";
import {connect} from 'react-redux'
import {
    Link
  } from "react-router-dom";
import AuthenForm from '../authenForm';
import DrawerCart from '../drawerCart';
import {showAuthenForm, closeAuthenForm, logout} from '../../actions/userActions';
import authenLib from '../../lib/auth';

 const BaseLayout = (props) => {

    const showModal = (e) => {
        e.preventDefault();
        props.showAuthenForm();
    }

    const onCancel=(e) => {
        props.closeAuthenForm();
    }

    const logout = e => {
        e.preventDefault();
        authenLib.removeToken();
        props.logout();
    }
    
    return (
        <div className="main-layout">
        <header className="header">
            <Row justify="center">
                <Col span={20}>
                    <Row>
                        <Col span={6} className="logo">
                            <h1>P</h1>
                        </Col>
                        <Col span={14} className="navigation">
                            <ul>
                                <li className="nav-item">
                                    <Link to="/">Our Pizza</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/history">History</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/order">Order</Link>
                                </li>
                                {!props.login && <li className="nav-item">
                                    <a href="/" onClick={showModal}>Register/Login</a>
                                </li>}
                            </ul>
                        </Col>
                        {props.login && (<>
                        <Col span={2} className="user-info">
                            <span>{`Hi ${props.user}`}</span>
                        </Col>
                        <Col span={2} className="user-logout">
                            <a href="/" onClick={logout}>Logout</a>
                        </Col></>)}
                    </Row>
                </Col>
            </Row>
        </header>
        <main>
            {props.children}
        </main>
        <Modal
          title="Register/Login"
          centered
          visible={props.authenForm}
          onCancel={onCancel}
          footer={null}
        >
          <AuthenForm/>
        </Modal>
        <DrawerCart />
        </div>
    )
}

const mapStateToProps = state => ({
    login: state.login,
    authenForm: state.showAuthenForm,
    user: state.user
})

const mapDispatchToProps = dispatch => ({
    showAuthenForm: () => {dispatch(showAuthenForm())},
    closeAuthenForm: () => {dispatch(closeAuthenForm())},
    logout: () => {dispatch(logout())}
});

export default connect(mapStateToProps, mapDispatchToProps)(BaseLayout);