import React, { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import {
  faEnvelope,
  faBookmark,
  faListAlt,
} from '@fortawesome/free-regular-svg-icons';
import {
  faHome,
  faEllipsisH,
  faSearch,
  faUserTag,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const Container = styled.div`
  width: 100%;
  margin: 0px 0px;
  padding: 0px;
`;

const LeftContainerParent = styled.div`
  width: 250px;
  @media (max-width: 768px) {
    display: none;
  }
`;

const LeftContainer = styled.div`
  width: 280px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: fixed;
  box-sizing: border-box;
  padding-top: 5px;
  padding-bottom: 15px;
  border-right: 1px solid #eee;
`;

const MenuContainer = styled.div``;

const MenuImage = styled.div`
  margin-left: 5px;
  margin-bottom: 15px;
  width: 30px;
  display: inline-block;
`;

const MenuNav = styled.ul``;

const MenuListSpan = styled.span`
  margin-bottom: 8px;
  display: inline-block;
  margin-right: 50px;
  align-items: center;
  padding: 12px 15px;
  padding-right: 25px;
  border-radius: 50px;
  box-sizing: border-box;
  cursor: pointer;
  &:link {
    color: inherit;
  }
  &:visited {
    color: inherit;
  }
  &:hover {
    background-color: #eeeeee;
  }
`;

const MenuList = styled(Link)`
  margin-bottom: 8px;
  display: inline-block;
  margin-right: 50px;
  align-items: center;
  padding: 12px 15px;
  padding-right: 25px;
  border-radius: 50px;
  box-sizing: border-box;
  cursor: pointer;
  &:link {
    color: inherit;
  }
  &:visited {
    color: inherit;
  }
  &:hover {
    background-color: #eeeeee;
  }
`;

const IconContainer = styled(FontAwesomeIcon)`
  width: 30px !important;
  display: inline-block;
  font-size: 24px;
`;

const IconText = styled.span`
  display: inline-block;
  font-size: 20px;
  margin-left: 20px;
`;

const MenuButton = styled.button`
  margin-top: 15px;
  padding: 17px 80px;
  background-color: var(--twitter-color);
  color: white;
  border-radius: 30px;
  font-size: 17px;
  font-weight: bold;
  &:hover {
    background-color: var(--twitter-dark-color);
  }
`;

const UserContainerLink = styled(Link)`
  color: inherit;
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  border-radius: 50px;
  padding: 8px 10px;
  cursor: pointer;
  &:hover {
    background-color: #eeeeee;
  }
`;

const UserPhoto = styled.img`
  flex: 1;
  width: 46px;
  height: 46px;
  border-radius: 50%;
`;

const UserInfo = styled.div`
  flex: 8;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 12px;
`;

const UserName = styled.div`
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 5px;
`;

const UserEmail = styled.div`
  font-size: 17px;
  color: #989898;
`;

const IconUserEtcContainer = styled(FontAwesomeIcon)`
  flex: 1;
  font-size: 18px;
  cursor: pointer;
  padding-right: 10px;
`;

const LeftSideNavigation = () => {
  const { me } = useSelector((state) => state.user);
  const twitterSearch = useRef();

  const onFocusTwitterSearch = (event) => {
    twitterSearch.current.focus();
  };
  const handleMember = async (email) => {};

  return (
    <Container>
      <LeftContainerParent>
        <LeftContainer>
          <MenuContainer>
            <MenuImage>
              <Link href="/">
                <a>
                  <IconContainer icon={faTwitter} />
                </a>
              </Link>
            </MenuImage>
            <MenuNav>
              <MenuList href="/">
                <a>
                  <div>
                    <IconContainer icon={faHome} />
                    <IconText>홈</IconText>
                  </div>
                </a>
              </MenuList>
              <MenuList href="/profile">
                <a>
                  <div>
                    <IconContainer icon={faUser} />
                    <IconText>프로필</IconText>
                  </div>
                </a>
              </MenuList>
              <MenuListSpan onClick={onFocusTwitterSearch}>
                <IconContainer icon={faSearch} />
                <IconText>검색</IconText>
              </MenuListSpan>
              <MenuListSpan onClick={handleMember}>
                <IconContainer icon={faUserTag} />
                <IconText>팔로우</IconText>
              </MenuListSpan>
              <MenuListSpan>
                <IconContainer icon={faEnvelope} />
                <IconText>쪽지</IconText>
              </MenuListSpan>
              <MenuListSpan>
                <IconContainer icon={faBookmark} />
                <IconText>북마크</IconText>
              </MenuListSpan>
              <MenuListSpan>
                <IconContainer icon={faListAlt} />
                <IconText>리스트</IconText>
              </MenuListSpan>
              <MenuListSpan>
                <IconContainer icon={faEllipsisH} />
                <IconText>더보기</IconText>
              </MenuListSpan>
            </MenuNav>
            <MenuButton type="button">공유하기</MenuButton>
          </MenuContainer>
          <UserContainerLink
            href={me === null ? '/' : '/profile'}
          >
            <a>
              <div>
                <UserContainer>
                  <UserPhoto />
                  <UserInfo>
                    <UserName>
                      {me?.nickname ? me.nickname : '유저'}
                    </UserName>
                    <UserEmail>
                      {me?.id ? me.id : '로그인 안됨'}
                    </UserEmail>
                  </UserInfo>
                  <IconUserEtcContainer
                    icon={faEllipsisH}
                  />
                </UserContainer>
              </div>
            </a>
          </UserContainerLink>
        </LeftContainer>
      </LeftContainerParent>
    </Container>
  );
};

export default LeftSideNavigation;
