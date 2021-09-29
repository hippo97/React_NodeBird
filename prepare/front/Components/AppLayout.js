import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import styled from 'styled-components';

import { useSelector } from 'react-redux';
import LeftSideNavigation from './LeftSideNavigation';
import RightSideTab from './RightSideTab';

const Container = styled.div`
  background-color: white;
  margin: 0;
  padding: 0;
`;

const AppLayout = ({ children }) => {
  const { me } = useSelector((state) => state.user);

  return (
    <Container>
      <Row gutter={8}>
        <Col
          xs={12}
          md={3}
          style={{
            padding: '0',
            border: '1px solid green',
          }}
        />
        <Col
          xs={14}
          md={4}
          style={{
            padding: '0',
            border: '1px solid purple',
          }}
        >
          <LeftSideNavigation />
        </Col>
        <Col
          xs={20}
          md={10}
          style={{
            padding: '0',
            border: '1px solid red',
          }}
        >
          {children}
        </Col>
        <Col
          xs={14}
          md={4}
          style={{
            padding: '0',
            border: '1px solid yellow',
          }}
        >
          <RightSideTab />
        </Col>
        <Col
          xs={12}
          md={3}
          style={{
            padding: '0',
            border: '1px solid blue',
          }}
        />
      </Row>
    </Container>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
