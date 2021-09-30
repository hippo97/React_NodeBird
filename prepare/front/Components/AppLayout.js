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

const AppLayout = ({ children, twitterSearch }) => {
  const { me } = useSelector((state) => state.user);

  return (
    <Container>
      <Row gutter={8} style={{ margin: 0 }}>
        <Col
          xs={12}
          md={3}
          style={{
            padding: '0',
          }}
        />
        <Col
          xs={15}
          md={5}
          style={{
            padding: '0',
          }}
        >
          <LeftSideNavigation
            twitterSearch={twitterSearch}
          />
        </Col>
        <Col
          xs={18}
          md={8}
          style={{
            padding: '0',
          }}
        >
          {children}
        </Col>
        <Col
          xs={15}
          md={5}
          style={{
            padding: '0',
          }}
        >
          <RightSideTab />
        </Col>
        <Col
          xs={12}
          md={3}
          style={{
            padding: '0',
          }}
        />
      </Row>
    </Container>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
  twitterSearch: PropTypes.object.isRequired,
};

export default AppLayout;
