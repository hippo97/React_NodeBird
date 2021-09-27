import { END } from 'redux-saga';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import axios from 'axios';
import { Router, useRouter } from 'next/router';
import { Input } from 'antd';
import useInput from '../hooks/useInput';
import { LOAD_POSTS_REQUEST } from '../reducers/post';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';

import AppLayout from '../Components/AppLayout';
import PostCard from '../Components/PostCard';
import PostForm from '../Components/PostForm';
import wrapper from '../store/configureStore';

const SearchWrapper = styled.div`
  height: 70px;
  padding-top: 25px;
`;

const CountTwitSpan = styled.span`
  vertical-align: middle;
  padding-left: 5px;
  font-family: 'Segoe UI', sans-serif;
  font-weight: 900;
`;

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
  width: 250px;
  float: right;
  border-radius: 10px;
`;

const Home = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { me } = useSelector((state) => state.user);
  const {
    mainPosts,
    hasMorePosts,
    loadPostsLoading,
    retweetError,
  } = useSelector((state) => state.post);
  // const mainPosts = useSelector((state) => state.post.mainPosts);처럼 해도 됨

  const [searchInput, onChangeSearchInput] = useInput('');

  const onSearch = useCallback(() => {
    Router.push(`/hashtag/${searchInput}`);
  }, [searchInput]);

  useEffect(() => {
    if (!me) {
      router.replace('/login');
    }

    if (retweetError) {
      alert(retweetError);
    }
  }, [retweetError, me]);

  useEffect(() => {
    function onScroll() {
      // console.log(
      //   window.scrollY, // 얼마나 내렸는지
      //   document.documentElement.clientHeight, // 화면 보이는 길이
      //   document.documentElement.scrollHeight // 총 길이
      // );

      if (
        window.pageYOffset +
          document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMorePosts && !loadPostsLoading) {
          const lastId =
            mainPosts[mainPosts.length - 1]?.id;
          dispatch({
            type: LOAD_POSTS_REQUEST,
            lastId,
          });
        }
      }
    }
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      // return으로 remove해주지 않으면 메모리에 계속 쌓여있게됨
    };
  }, [hasMorePosts, loadPostsLoading, mainPosts]);

  return (
    <AppLayout>
      <SearchWrapper>
        <CountTwitSpan>
          전체 트윗(
          {me && me.Posts.length})
        </CountTwitSpan>
        <SearchInput
          enterButton
          value={searchInput}
          onChange={onChangeSearchInput}
          onSearch={onSearch}
        />
      </SearchWrapper>
      {me && <PostForm />}
      {mainPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppLayout>
  );
};

export const getServerSideProps =
  wrapper.getServerSideProps(async (context) => {
    console.log('getServerSideProps start');
    console.log(context.req.headers);
    const cookie = context.req
      ? context.req.headers.cookie
      : '';
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
    context.store.dispatch({
      type: LOAD_POSTS_REQUEST,
    });
    context.store.dispatch(END);
    console.log('getServerSideProps end');
    await context.store.sagaTask.toPromise();
  });

export default Home;
