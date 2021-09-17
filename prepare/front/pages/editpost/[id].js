import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import useSWR from 'swr';
import { END } from 'redux-saga';
import { Router, useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Head from 'next/head';

import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import wrapper from '../../store/configureStore';
import AppLayout from '../../Components/AppLayout';

const Editpost = () => {
  const { me } = useSelector((state) => state.user);
  const router = useRouter();
  const { id } = router.query;
  const fetcher = (url) =>
    axios
      .get(url, { withCredentials: true })
      .then((result) => result.data);

  const { data: postData, error: postError } = useSWR(
    `http://localhost:3065/post/${id}`,
    fetcher
  );

  useEffect(() => {
    if (!(me && me.id)) {
      Router.push('/');
    }
  }, [me && me.id]);

  if (postError) {
    console.error(postError);
    return <div>로딩 중 에러가 발생했습니다.</div>;
  }
  //console.log('postData: ', postData);
  //console.log('postId: ', id);

  return (
    <>
      <Head>
        <title>게시글 수정 | NodeBird</title>
      </Head>
      <AppLayout>
        <div>{id}</div>
        <div>{postData.content}</div>
      </AppLayout>
    </>
  );
};

Editpost.propTypes = {
  postId: PropTypes.number.isRequired,
};

export const getServerSideProps =
  wrapper.getServerSideProps(async (context) => {
    console.log('getServerSideProps start');
    //console.log(context.req.headers);
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

export default Editpost;
