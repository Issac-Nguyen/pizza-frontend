import React from 'react';
import {Row, Col} from 'antd'

export default () => {
    return (
        <Row justify="center">
            <Col span={24}>
                <h1 style={{textAlign: 'center'}}>No pizza here!</h1>
            </Col>
        </Row>
    )
}