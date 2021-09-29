import React, { useCallback } from 'react';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Link from 'next/link';

import { logoutRequestAction } from '../reducers/user';

const Container = styled.div`
  padding-left: 10px;
  padding-right: 0px;
`;

const FollowWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  background-color: #f8f8f8;
  border-radius: 20px;
`;

const LogOutButton = styled.button`
  margin-top: 5px;
  width: 150px;
  height: 45px;
  flex: left;
  background-color: #1da1f2;
  color: white;
  border-radius: 30px;
  border: 1px solid #1da1f2;
  font-size: 17px;
  font-weight: bold;
  &:hover {
    background-color: #1db4ff;
  }
`;

const RightTabWrapper = styled.div`
  padding: 20px 10px 10px;
  position: fixed;
  height: 100vh;
`;

const RightTabItem = styled.div`
  margin-bottom: 15px;
`;

const TrandWrapper = styled.div`
  display: inline-block;
  background-color: #f8f8f8;
  border-radius: 20px;
`;

const TrandTitleItem = styled.div`
  display: flex;
  justify-content: space-between;
  width: 280px;
  padding: 10px;

  @media (max-width: 768px) {
    display: none;
  }
`;
const TrandItem = styled.div`
  padding: 10px 0px;

  &:hover {
    background-color: #eeeeee;
  }
`;
const TrandTitle = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

const TrandHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0px 10px;
`;
const TrandHeaderContent = styled.span`
  font-size: 14px;
  font-weight: bold;
  color: gray;
`;
const TrandContent = styled.div`
  padding: 0px 10px;
`;
const TrandContentText = styled.span`
  font-size: 18px;
  font-weight: 600;
`;

const IconTrandContainer = styled(FontAwesomeIcon)`
  font-size: 18px;
  cursor: pointer;
  padding-right: 0px;
  width: 20px;
`;

const SItem = styled.a`
  color: black;
`;

const MoreContent = styled.div`
  padding: 10px 0px 10px 10px;
  float: left;
`;

const RightSideTab = () => {
  const dispatch = useDispatch();

  const onLogOut = useCallback(() => {
    dispatch(logoutRequestAction());
  }, []);

  return (
    <Container>
      <RightTabWrapper>
        <RightTabItem>
          <LogOutButton
            size="middle"
            type="primary"
            shape="round"
            onClick={onLogOut}
          >
            로그아웃
          </LogOutButton>
        </RightTabItem>
        <RightTabItem>
          <TrandWrapper>
            <TrandTitleItem>
              <TrandTitle>나를 위한 트렌드</TrandTitle>
              <IconTrandContainer icon={faCog} />
            </TrandTitleItem>
            <Link href="">
              <SItem>
                <TrandItem>
                  <TrandHeader>
                    <TrandHeaderContent>
                      슬랙에서 트랜드 중
                    </TrandHeaderContent>
                    <IconTrandContainer icon={faCog} />
                  </TrandHeader>
                  <TrandContent>
                    <TrandContentText>
                      Next.js, Node.js
                    </TrandContentText>
                  </TrandContent>
                </TrandItem>
              </SItem>
            </Link>
            <Link href="">
              <SItem>
                <TrandItem>
                  <TrandHeader>
                    <TrandHeaderContent>
                      구글, 아마존에서 트랜드 중
                    </TrandHeaderContent>
                    <IconTrandContainer icon={faCog} />
                  </TrandHeader>
                  <TrandContent>
                    <TrandContentText>
                      Go, AWS
                    </TrandContentText>
                  </TrandContent>
                </TrandItem>
              </SItem>
            </Link>
            <MoreContent>
              <Link href="">
                <a>더 보기</a>
              </Link>
            </MoreContent>
          </TrandWrapper>
        </RightTabItem>
        <RightTabItem>
          <FollowWrapper>팔로우 목록</FollowWrapper>
        </RightTabItem>
      </RightTabWrapper>
    </Container>
  );
};

export default RightSideTab;
