import styled from 'styled-components';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Container = styled.div`
  padding-left: 10px;
  padding-right: 0px;
`;

export const LogOutButton = styled.button`
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

export const RightTabWrapper = styled.div`
  padding: 20px 10px 10px;
  position: fixed;
  height: 100vh;
`;

export const RightTabItem = styled.div`
  margin-bottom: 15px;
`;

export const TrandWrapper = styled.div`
  display: inline-block;
  background-color: #f8f8f8;
  border-radius: 20px;
`;

export const TrandTitleItem = styled.div`
  display: flex;
  justify-content: space-between;
  width: 320px;
  padding: 10px 17px;

  @media (max-width: 768px) {
    display: none;
  }
`;
export const TrandItem = styled.div`
  padding: 10px 0px;

  &:hover {
    background-color: #eeeeee;
  }
`;
export const TrandTitle = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

export const TrandHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0px 17px;
`;
export const TrandHeaderContent = styled.span`
  font-size: 14px;
  font-weight: bold;
  color: gray;
`;
export const TrandContent = styled.div`
  padding: 0px 17px;
`;
export const TrandContentText = styled.span`
  font-size: 18px;
  font-weight: 600;
`;

export const IconTrandContainer = styled(FontAwesomeIcon)`
  font-size: 18px;
  cursor: pointer;
  padding-right: 0px;
  width: 20px;
`;

export const SItem = styled.a`
  color: black;
`;

export const TrandMoreContent = styled.div`
  padding: 10px 17px;
  float: left;
`;
export const MoreContent = styled.div`
  padding: 10px 0px;
  float: left;
`;
export const MoreContentWrapper = styled.div`
  display: flex;
`;

export const FollowWrapper = styled.div`
  background-color: #f8f8f8;
  border-radius: 20px;

  padding: 10px 17px;
`;

export const FollowHeader = styled.span`
  font-size: 18px;
  font-weight: bold;
`;
export const FollowContent = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: #eeeeee;
  }
`;
export const FollowItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 7px 0px;
  width: 100%;
  color: inherits;
`;
export const FollowImage = styled.img`
  width: 47px;
  height: 47px;
  border-radius: 50%;
`;
export const FollowInfo = styled.div`
  margin-left: 10px;
  margin-right: 10px;
`;
export const FollowInfoTitle = styled.div`
  font-weight: bold;
  font-size: 18px;
`;
export const FollowInfoDesc = styled.div`
  font-size: 15px;
  color: gray;
  margin: 0px;
`;
export const FollowButton = styled.span`
  color: white;
  padding: 7px 15px;
  border-radius: 50px;
  font-size: 14px;
  font-weight: bold;
  background-color: #303030;
  margin-left: auto;
`;
