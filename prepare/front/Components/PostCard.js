import {
  Button,
  Card,
  Popover,
  Avatar,
  Comment,
  List,
} from 'antd';
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  EllipsisOutlined,
  HeartOutlined,
  HeartTwoTone,
  MessageOutlined,
  RetweetOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import moment from 'moment';
import styled from 'styled-components';

import PostImages from './PostImages';
import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';
import {
  LIKE_POST_REQUEST,
  REMOVE_POST_REQUEST,
  UNLIKE_POST_REQUEST,
  RETWEET_REQUEST,
} from '../reducers/post';
import FollowButton from './FollowButton';

moment.locale('ko');

const LinkItem = styled.a`
  color: black;
`;

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const [commentFormOpened, setCommentFormOpened] =
    useState(false);
  const { me } = useSelector((state) => state.user);
  const id = me?.id; // == me && me.id
  const { loadPostLoading, removePostLoading } =
    useSelector((state) => state.post);
  /* == const id = useSelector( */
  /*                (state) => state.user.me?.id) */

  const onLike = useCallback(() => {
    if (!id) {
      return alert('로그인을 해주세요.');
    }
    return dispatch({
      type: LIKE_POST_REQUEST,
      data: post.id,
    });
  }, [id]);
  const onUnLike = useCallback(() => {
    if (!id) {
      return alert('로그인을 해주세요.');
    }
    return dispatch({
      type: UNLIKE_POST_REQUEST,
      data: post.id,
    });
  }, [id]);

  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, []);
  const onRemovePost = useCallback(() => {
    if (!id) {
      return alert('로그인을 해주세요.');
    }
    return dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id,
    });
  }, [id]);

  const onRetweet = useCallback(() => {
    if (!id) {
      return alert('로그인을 해주세요.');
    }
    return dispatch({
      type: RETWEET_REQUEST,
      data: post.id,
    });
  }, []);

  const liked = post.Likers.find((v) => v.id === id);
  return (
    <div style={{ marginBottom: 20 }}>
      <Card
        loading={loadPostLoading}
        actions={[
          <RetweetOutlined
            key="retweet"
            onClick={onRetweet}
          />,
          liked ? (
            <HeartTwoTone
              twoToneColor="#eb2f96"
              key="heart"
              onClick={onUnLike}
            />
          ) : (
            <HeartOutlined key="heart" onClick={onLike} />
          ),
          <MessageOutlined
            key="comment"
            onClick={onToggleComment}
          />,
          <Popover
            key="more"
            content={
              <Button.Group>
                {id && post.User.id === id ? (
                  <>
                    <Button>
                      <Link href={`/editpost/${post.id}`}>
                        <a>수정</a>
                      </Link>
                    </Button>
                    <Button
                      type="danger"
                      loading={removePostLoading}
                      onClick={onRemovePost}
                    >
                      삭제
                    </Button>
                  </>
                ) : (
                  <Button>신고</Button>
                )}
              </Button.Group>
            }
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
        title={
          post.RetweetId
            ? `${post.User.nickname}님이 리트윗하셨습니다.`
            : null
        }
        extra={id && <FollowButton post={post} />}
      >
        {post.RetweetId && post.Retweet ? (
          <Card>
            <div style={{ float: 'right' }}>
              {moment(post.createdAt).format('YYYY.MM.DD')}
            </div>
            <Card.Meta
              avatar={
                <Link
                  href={`/user/${post.Retweet.User.id}`}
                >
                  <LinkItem>
                    <Avatar>
                      {post.Retweet.User.nickname[0]}
                    </Avatar>
                  </LinkItem>
                </Link>
              }
              title={
                <>
                  <Link
                    href={`/user/${post.Retweet.User.id}`}
                  >
                    <LinkItem>
                      {post.Retweet.User.nickname}
                    </LinkItem>
                  </Link>
                </>
              }
              description={
                <>
                  {post.Retweet.Images[0] && (
                    <PostImages
                      images={post.Retweet.Images}
                    />
                  )}
                  <PostCardContent
                    postData={post.Retweet.content}
                  />
                </>
              }
            />
          </Card>
        ) : (
          <>
            <div style={{ float: 'right' }}>
              {moment(post.createdAt).format('YYYY.MM.DD')}
            </div>
            <Card.Meta
              avatar={
                <Link href={`/user/${post.User.id}`}>
                  <LinkItem>
                    <Avatar>{post.User.nickname[0]}</Avatar>
                  </LinkItem>
                </Link>
              }
              title={
                <>
                  <Link href={`/user/${post.User.id}`}>
                    <LinkItem>
                      {post.User.nickname}
                    </LinkItem>
                  </Link>
                </>
              }
              description={
                <>
                  {post.Images[0] && (
                    <PostImages images={post.Images} />
                  )}
                  <PostCardContent
                    postData={post.content}
                  />
                </>
              }
            />
          </>
        )}
      </Card>
      {commentFormOpened && (
        <div>
          <CommentForm post={post} />
          <List
            header={`${post.Comments.length}개의 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments}
            renderItem={(item) => (
              <li>
                <Comment
                  author={item.User.nickname}
                  avatar={
                    <Link href={`/user/${item.User.id}`}>
                      <LinkItem>
                        <Avatar>
                          {item.User.nickname[0]}
                        </Avatar>
                      </LinkItem>
                    </Link>
                  }
                  content={item.content}
                />
              </li>
            )}
          />
        </div>
      )}
      {/*<CommentForm />
      <Comments />*/}
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    UserId: PropTypes.number,
    content: PropTypes.string,
    createdAt: PropTypes.string,
    Comments: PropTypes.arrayOf(PropTypes.any),
    Images: PropTypes.arrayOf(PropTypes.any),
    Likers: PropTypes.arrayOf(PropTypes.object),
    retweetId: PropTypes.number,
    Retweet: PropTypes.objectOf(PropTypes.any),
  }).isRequired,
};

export default PostCard;
