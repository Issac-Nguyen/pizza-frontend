import React, {useState, useEffect} from 'react';
import {Row, Col, Tabs, Form, Input, Button, message, Spin} from 'antd';
import registerService from '../services/registerService';
import loginService from '../services/loginService'
import {connect} from 'react-redux'
import {closeAuthenForm, register, login} from '../actions/userActions';
import authLib from '../lib/auth';

const { TabPane } = Tabs;

const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

export const AuthenForm = (props, ref) => {
  let [sending, setSending] = useState(false);
  const [formRegiser] = Form.useForm();
  const [formLogin] = Form.useForm();
  
    const onFinishRegister = values => {
      setSending(true);
        const {email, password} = values;
        registerService({email, password}).then(res => {
          setSending(false);
          if(!res.data.success) {
            message.error(res.data.msg)
          } else {
            const token = res.data.data.token;
            if(token)
              authLib.saveToken(token)
            props.register(email);
            props.closeAuthenForm();
            formRegiser.resetFields();
          }
        }, err => {
          setSending(false);
        });
    };

    const onFinishLogin = values => {
      setSending(true);
        const {email, password} = values;
        loginService({email, password}).then(res => {
          setSending(false);
          if(!res.data.success) {
            message.error(res.data.msg)
          } else {
            const token = res.data.data.token;
            if(token)
              authLib.saveToken(token)
            props.login(email);
            props.closeAuthenForm();
            formLogin.resetFields();
          }
        }, err => {
          setSending(false);
        });
    }

    useEffect(() => {
      formRegiser.resetFields();
      formLogin.resetFields();
    }, [props.showAuthenForm])
    
    return (
    <Tabs defaultActiveKey="register">
        <TabPane tab="Register" key="register">
        <Form
        form={formRegiser}
            {...formItemLayout}
            name="register"
            onFinish={onFinishRegister}
            scrollToFirstError
            >
                <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
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
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
          {
            whitespace: true,
            message: 'Password not valid'
          },
          {
            max: 16,
            message: 'Only 16 characters'
          }
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject('The two passwords that you entered do not match!');
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Row justify="center">
        <Spin spinning={sending} />
      </Row>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" className="register-form-button" htmlType="submit" disabled={sending}>
          Register
        </Button>
      </Form.Item>
        </Form>
        </TabPane>
        <TabPane tab="Login" key="login">
        <Form
        form={formLogin}
        {...formItemLayout}
      name="normal_login"
      className="login-form"
      onFinish={onFinishLogin}
    >
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>
      <Row justify="center">
        <Spin spinning={sending} />
      </Row>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit" className="login-form-button" disabled={sending}>
          Log in
        </Button>
      </Form.Item>
    </Form>
        </TabPane>
  </Tabs>
    )
}

const mapStateToProps = state => ({
  showAuthenForm: state.showAuthenForm,
});

const mapDispathToProps = dispatch => ({
  closeAuthenForm: () => {dispatch(closeAuthenForm())},
  register: (email) => {dispatch(register({email}))},
  login: (email) => {dispatch(login({email}))}
})

export default connect(mapStateToProps, mapDispathToProps)(AuthenForm);