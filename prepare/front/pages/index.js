import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../Components/AppLayout';
import PostCard from '../Components/PostCard';
import PostForm from '../Components/PostForm';
import { LOAD_POSTS_REQUEST } from '../reducers/post';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';

const Home = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const {
    mainPosts,
    hasMorePosts,
    loadPostsLoading,
    retweetError,
  } = useSelector((state) => state.post);
  // const mainPosts = useSelector((state) => state.post.mainPosts);처럼 해도 됨

  useEffect(() => {
    if (retweetError) {
      alert(retweetError);
    }
  }, [retweetError]);

  useEffect(() => {
    dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
    dispatch({
      type: LOAD_POSTS_REQUEST,
    });
  }, []);

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
      {me && <PostForm />}
      {mainPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppLayout>
  );
};

export default Home;
