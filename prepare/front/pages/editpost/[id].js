import React, { useEffect } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import { END } from 'redux-saga';
import { Router, useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Head from 'next/head';

import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import wrapper from '../../store/configureStore';
import AppLayout from '../../Components/AppLayout';
import EditPostForm from '../../Components/EditPostForm';

const Editpost = () => {
  const { me } = useSelector((state) => state.user);
  const { editPostDone } = useSelector(
    (state) => state.post
  );
  const router = useRouter();
  const { id } = router.query;
  const fetcher = (url) =>
    axios
      .get(url, { withCredentials: true })
      .then((result) => result.data);

  console.log(id);
  const { data: postData, error: postError } = useSWR(
    `http://localhost:3065/post/${id}`,
    fetcher
  );

  useEffect(() => {
    if (!(me && me.id)) {
      Router.push('/');
    }
  }, [me && me.id]);

  if (editPostDone) {
    return Router.push(`/post/${id}`);
  }

  if (postError) {
    console.error(postError);
    return <div>로딩 중 에러가 발생했습니다.</div>;
  }
  if (!postData) return <div>loading...</div>;
  console.log('postData: ', postData);
  //console.log('postId: ', id);
  console.log('postData: ', postData);
  return (
    <>
      <Head>
        <title>게시글 수정 | NodeBird</title>
      </Head>
      <AppLayout>
        <EditPostForm post={postData} />
      </AppLayout>
    </>
  );
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
