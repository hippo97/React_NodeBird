import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu, Row, Col } from 'antd';
import styled from 'styled-components';
//import styled, {
//  createGlobalStyle,
//} from 'styled-components';
import { useSelector } from 'react-redux';

import UserProfile from './UserProfile';

/*const Global = createGlobalStyle`
  .ant-row{
    margin-right:0 !important;
    margin-left:0 !important;
  }

  .ant-col:first-child{
    padding-left: 0 !important;
  }

  .ant-col:last-child{
    padding-right:0 !important;
  }
`;
*/

const Container = styled.div`
  background-color: white;
`;

const AppLayout = ({ children }) => {
  const { me } = useSelector((state) => state.user);

  return (
    <Container>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {me ? <UserProfile /> : null}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a
            href="#"
            target="_blank"
            rel="_noreferrer noopener"
          ></a>
        </Col>
      </Row>
    </Container>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
