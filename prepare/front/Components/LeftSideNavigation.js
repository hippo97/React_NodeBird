import React from 'react';
import { Button, Menu } from 'antd';
import styled from 'styled-components';

const ShareButton = styled(Button)`
  margin-top: 10px;
`;

const LeftSideNavigation = () => {
  return (
    <>
      <Menu>
        <Menu.Item>홈 로고</Menu.Item>
        <Menu.Item>홈</Menu.Item>
        <Menu.Item>프로필</Menu.Item>
        <Menu.Item>검색</Menu.Item>
        <Menu.Item>알림</Menu.Item>
        <Menu.Item>쪽지</Menu.Item>
        <Menu.Item>북마크</Menu.Item>
        <Menu.Item>리스트</Menu.Item>
        <Menu.Item>더보기</Menu.Item>
      </Menu>
      <ShareButton
        type="primary"
        size="large"
        shape="round"
      >
        공유하기
      </ShareButton>
    </>
  );
};

export default LeftSideNavigation;
