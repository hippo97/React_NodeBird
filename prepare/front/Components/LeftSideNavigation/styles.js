import styled from 'styled-components';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Container = styled.div`
  width: 100%;
  margin: 0px 70px 0px;
  padding: 0px;
  padding-left: 30px;
  border-right: 1px solid red;
`;

export const LeftContainerParent = styled.div`
  width: 280px;
  @media (max-width: 768px) {
    display: none;
  }
`;

export const LeftContainer = styled.div`
  width: 280px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: fixed;
  box-sizing: border-box;
  padding-top: 5px;
  padding-bottom: 15px;
`;

export const LinkItem = styled.a`
  color: black;
`;

export const IconTwitterContainer = styled(FontAwesomeIcon)`
  width: 30px !important;
  display: inline-block;
  font-size: 60px;
  color: var(--twitter-color);
  cursor: pointer;
  border-radius: 50%;
  padding: 10px;
  margin-left: 50px;
  margin-top: 20px;
`;

export const IconContainer = styled(FontAwesomeIcon)`
  width: 30px !important;
  display: inline-block;
  font-size: 24px;
`;

export const IconUserEtcContainer = styled(FontAwesomeIcon)`
  flex: 1;
  font-size: 18px;
  cursor: pointer;
  padding-right: 0px;
`;

export const IconText = styled.span`
  display: inline-block;
  font-size: 20px;
  margin-left: 20px;
`;

export const MenuContainer = styled.div``;

export const MenuImage = styled.div`
  margin-left: 5px;
  margin-bottom: 15px;
  display: inline-block;
`;

export const MenuNav = styled.ul`
  width: 100%;
`;

export const MenuHome = styled.span`
  display: inline-block;
  margin-right: 50px;
  align-items: center;
  padding: 12px 15px;
  padding-right: 25px;
  border-radius: 50px;
  box-sizing: border-box;
  font-size: 34px;
  margin-top: 5px;
  color: #1da1f2;
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

export const MenuListSpan = styled.span`
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

export const MenuList = styled(Link)`
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

export const MenuButton = styled.button`
  margin-top: 15px;
  padding: 17px 70px;
  margin-left: 40px;
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

export const UserContainerLink = styled(Link)`
  color: inherit;
`;

export const UserContainer = styled.div`
  display: flex;
  align-items: center;
  border-radius: 50px;
  padding: 8px 10px;
  margin-left: 40px;
  cursor: pointer;
  &:hover {
    background-color: #eeeeee;
  }
`;

export const UserPhoto = styled.img`
  flex: 1;
  width: 46px;
  height: 46px;
  border-radius: 50%;
`;

export const UserInfo = styled.div`
  flex: 8;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 12px;
`;

export const UserName = styled.div`
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 5px;
`;

export const UserEmail = styled.div`
  font-size: 17px;
  color: #989898;
`;
