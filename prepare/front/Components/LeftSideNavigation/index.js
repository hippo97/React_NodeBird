import React from 'react';
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
import { useSelector } from 'react-redux';

import {
  Container,
  LeftContainerParent,
  LeftContainer,
  LinkItem,
  IconUserEtcContainer,
  IconContainer,
  IconText,
  MenuHome,
  MenuContainer,
  MenuNav,
  MenuListSpan,
  MenuButton,
  UserContainer,
  UserPhoto,
  UserInfo,
  UserName,
  UserContainerLink,
  UserEmail,
} from './styles';
import userImage from '../../assets/images/user.png';

const LeftSideNavigation = ({ twitterSearch }) => {
  const { me } = useSelector((state) => state.user);

  const onFocusTwitterSearch = (event) => {
    twitterSearch.current.focus();
  };
  const handleMember = async (email) => {};

  return (
    <Container>
      <LeftContainerParent>
        <LeftContainer>
          <MenuContainer>
            {/* <MenuImage>
              <Link href="/">
                <a>
                  <IconTwitterContainer icon={faTwitter}>
                    Dwitter
                  </IconTwitterContainer>
                </a>
              </Link>
            </MenuImage> */}
            <MenuNav>
              <MenuHome>Dwitter</MenuHome>
              <MenuListSpan>
                <Link href="/">
                  <LinkItem>
                    <IconContainer icon={faHome} />
                    <IconText>홈</IconText>
                  </LinkItem>
                </Link>
              </MenuListSpan>
              <MenuListSpan>
                <Link href="/profile">
                  <LinkItem>
                    <IconContainer icon={faUser} />
                    <IconText>프로필</IconText>
                  </LinkItem>
                </Link>
              </MenuListSpan>
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
              <UserContainer>
                <UserPhoto src={userImage} />
                <UserInfo>
                  <UserName>
                    {me?.nickname ? me.nickname : '유저'}
                  </UserName>
                  <UserEmail>
                    {me?.email ? me.email : '로그인 안됨'}
                  </UserEmail>
                </UserInfo>
                <IconUserEtcContainer icon={faEllipsisH} />
              </UserContainer>
            </a>
          </UserContainerLink>
        </LeftContainer>
      </LeftContainerParent>
    </Container>
  );
};

export default LeftSideNavigation;
