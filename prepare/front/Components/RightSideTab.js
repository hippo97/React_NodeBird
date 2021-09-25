import React from 'react';
import { Button, Col, Menu, Row } from 'antd';
import styled from 'styled-components';

const TrandWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  border: solid 1px;
  margin: 20px 10px 20px 10px;
`;

const FollowWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  border: solid 1px;
  margin: 0px 10px 20px 10px;
`;

const RightSideTab = () => {
  return (
    <>
      <Menu>
        <Menu.Item>
          <Button
            size="middle"
            type="primary"
            shape="round"
          >
            로그아웃
          </Button>
          <Button
            size="middle"
            shape="round"
            style={{ backgroundColor: 'gray' }}
          >
            로그아웃
          </Button>
          <Button
            size="middle"
            shape="round"
            style={{ backgroundColor: '#999999' }}
          >
            로그아웃
          </Button>
        </Menu.Item>
      </Menu>
      <Row>
        <Col span={24}>
          <TrandWrapper>트렌드</TrandWrapper>
        </Col>
        <Col span={24}>
          <FollowWrapper>팔로우 목록</FollowWrapper>
        </Col>
      </Row>
    </>
  );
};

export default RightSideTab;
