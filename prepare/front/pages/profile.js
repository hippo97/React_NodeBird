import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import Router from 'next/router';
import { END } from 'redux-saga';
import axios from 'axios';
import useSWR from 'swr';

import AppLayout from '../Components/AppLayout';
import NickNameEditForm from '../Components/NickNameEditForm';
import FollowList from '../Components/FollowList';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import wrapper from '../store/configureStore';

const fetcher = (url) =>
  axios
    .get(url, { withCredentials: true })
    .then((result) => result.data);

const Profile = () => {
  const { me } = useSelector((state) => state.user);
  const [followersLimit, setFollowersLimit] = useState(3);
  const [followingsLimit, setFollowingsLimit] = useState(3);

  const { data: followersData, error: followersError } =
    useSWR(
      `http://localhost:3065/user/followers?limit=${followersLimit}`,
      fetcher
    );
  const { data: followingsData, error: followingsError } =
    useSWR(
      `http://localhost:3065/user/followings?limit=${followingsLimit}`,
      fetcher
    );

  useEffect(() => {
    if (!(me && me.id)) {
      Router.push('/');
    }
  }, [me && me.id]);

  const loadMoreFollowings = useCallback(() => {
    setFollowingsLimit((prev) => prev + 3);
  }, []);
  const loadMoreFollowers = useCallback(() => {
    setFollowersLimit((prev) => prev + 3);
  }, []);

  if (!me) {
    return '내 정보 로딩중...';
  }

  if (followersError || followingsError) {
    console.error(followersError || followingsError);
    return (
      <div>팔로잉/팔로워 로딩 중 에러가 발생했습니다.</div>
    );
  }

  return (
    <>
      <Head>
        <title>내 프로필 | NodeBird</title>
      </Head>
      <AppLayout>
        <NickNameEditForm />
        <FollowList
          header="팔로잉 목록"
          data={followingsData}
          onClickMore={loadMoreFollowings}
          loading={!followingsData && !followingsError}
        />
        <FollowList
          header="팔로워 목록"
          data={followersData}
          onClickMore={loadMoreFollowers}
          loading={!followersData && !followersError}
        />
      </AppLayout>
    </>
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
    context.store.dispatch(END);
    console.log('getServerSideProps end');
    await context.store.sagaTask.toPromise();
  });

export default Profile;
