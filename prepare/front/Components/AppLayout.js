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
        <Col xs={24} md={6}>
          <LeftSideNavigation />
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <RightSideTab />
        </Col>
      </Row>
    </Container>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
