import React, { useCallback } from 'react';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import Link from 'next/link';

import {
  Container,
  FollowButton,
  FollowContent,
  FollowHeader,
  FollowImage,
  FollowInfo,
  FollowInfoDesc,
  FollowInfoTitle,
  FollowItem,
  FollowWrapper,
  IconTrandContainer,
  LogOutButton,
  MoreContent,
  MoreContentWrapper,
  RightTabItem,
  RightTabWrapper,
  SItem,
  TrandContent,
  TrandContentText,
  TrandHeader,
  TrandHeaderContent,
  TrandItem,
  TrandMoreContent,
  TrandTitle,
  TrandTitleItem,
  TrandWrapper,
} from './styles';
import { logoutRequestAction } from '../../reducers/user';
import naverLogo from '../../assets/images/naver-logo.png';
import appleLogo from '../../assets/images/apple-logo.png';
import facebookLogo from '../../assets/images/facebook-logo.png';
import googleLogo from '../../assets/images/google-logo.png';

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
                      구글, 네이버에서 트랜드 중
                    </TrandHeaderContent>
                    <IconTrandContainer icon={faCog} />
                  </TrandHeader>
                  <TrandContent>
                    <TrandContentText>
                      Go, AI, React
                    </TrandContentText>
                  </TrandContent>
                </TrandItem>
              </SItem>
            </Link>
            <MoreContentWrapper>
              <TrandMoreContent>
                <Link href="">
                  <a>더 보기</a>
                </Link>
              </TrandMoreContent>
            </MoreContentWrapper>
          </TrandWrapper>
        </RightTabItem>
        <RightTabItem>
          <FollowWrapper>
            <FollowHeader>팔로우 추천</FollowHeader>
            <FollowContent>
              <FollowItem>
                <FollowImage src={naverLogo} />
                <FollowInfo>
                  <FollowInfoTitle>Naver</FollowInfoTitle>
                  <FollowInfoDesc>@Naver</FollowInfoDesc>
                </FollowInfo>
                <FollowButton>팔로우</FollowButton>
              </FollowItem>
            </FollowContent>
            <FollowContent>
              <FollowItem>
                <FollowImage src={appleLogo} />
                <FollowInfo>
                  <FollowInfoTitle>Apple</FollowInfoTitle>
                  <FollowInfoDesc>@Apple</FollowInfoDesc>
                </FollowInfo>
                <FollowButton>팔로우</FollowButton>
              </FollowItem>
            </FollowContent>
            <FollowContent>
              <FollowItem>
                <FollowImage src={facebookLogo} />
                <FollowInfo>
                  <FollowInfoTitle>
                    FaceBook
                  </FollowInfoTitle>
                  <FollowInfoDesc>@FaceBook</FollowInfoDesc>
                </FollowInfo>
                <FollowButton>팔로우</FollowButton>
              </FollowItem>
            </FollowContent>
            <FollowContent>
              <FollowItem>
                <FollowImage src={googleLogo} />
                <FollowInfo>
                  <FollowInfoTitle>Google</FollowInfoTitle>
                  <FollowInfoDesc>@Google</FollowInfoDesc>
                </FollowInfo>
                <FollowButton>팔로우</FollowButton>
              </FollowItem>
            </FollowContent>
            <MoreContentWrapper>
              <MoreContent>
                <Link href="">
                  <a>더 보기</a>
                </Link>
              </MoreContent>
            </MoreContentWrapper>
          </FollowWrapper>
        </RightTabItem>
      </RightTabWrapper>
    </Container>
  );
};

export default RightSideTab;
