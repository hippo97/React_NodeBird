import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Menu } from 'antd';
import styled from 'styled-components';

import { useSelector } from 'react-redux';
import LeftSideNavigation from './LeftSideNavigation';
import RightSideTab from './RightSideTab';

const Container = styled.div`
  background-color: white;
`;

const AppLayout = ({ children }) => {
  const { me } = useSelector((state) => state.user);

  return (
    <Container>
      <Row gutter={8}>
        <Col xs={12} md={3} />
        <Col xs={14} md={4} style={{ padding: '0' }}>
          <LeftSideNavigation />
        </Col>
        <Col xs={20} md={10} style={{ padding: '0' }}>
          {children}
        </Col>
        <Col xs={14} md={4} style={{ padding: '0' }}>
          <RightSideTab />
        </Col>
        <Col xs={12} md={3} />
      </Row>
    </Container>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
