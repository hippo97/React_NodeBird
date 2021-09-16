import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import useSWR from 'swr';
import { END } from 'redux-saga';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';

const EditPost = ({ postId }) => {
  const { me } = useSelector((state) => state.user);
  const fetcher = (url) =>
    axios
      .get(url, { withCredentials: true })
      .then((result) => result.data);

  const { data: postData, error: postError } = useSWR(
    `http://localhost:3065/post/${postId}`,
    fetcher
  );

  useEffect(() => {
    if (!(me && me.id)) {
      Router.push('/');
    }
  }, [me && me.id]);
};

EditPost.propTypes = {
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

export default EditPost;
