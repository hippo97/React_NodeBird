import React, {
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { END } from 'redux-saga';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
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

  display: flex;
  justify-content: space-between;
`;

const CountTwitSpan = styled.span`
  vertical-align: middle;
  padding-left: 5px;
  font-family: 'Segoe UI', sans-serif;
  font-size: 28px;
  font-weight: 900;
`;

const SearchInput = styled.input`
  vertical-align: middle;
  width: 250px;
  float: right;
  border-radius: 30px;
  border: none;
  outline: none;
  box-sizing: border-box;
  font-size: 15px;
  border: 1px solid transparent;
  background-color: #f8f8f8;
  padding: 10px 12px;
  padding-left: 50px;
  padding-right: 30px;
  color: #989898;
  font-size: 15px;

  &:focus {
    border: 1px solid #00aff0;
    background-color: #f8f8f8;
  }

  &::placeholder {
    color: #989898;
  }

  @media (max-width: 768px) {
    width: 130px;
  }
`;

const PostWrapper = styled.div``;
const CenterContents = styled.div`
  width: 100%;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 0 auto;
`;

const IconContentFormContainer = styled(FontAwesomeIcon)`
  font-size: 15px;
  cursor: pointer;
  color: black;
  position: absolute;
  top: 50%;
  left: 22px;
  transform: translateY(-50%);
`;

const SearchForm = styled.form`
  position: relative;
`;

const SearchContent = styled.div`
  display: inline-box;
`;

const CountTwitWrapper = styled.div`
  float: left;
`;

const Home = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const twitterSearch = useRef();

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
    router.push(`/hashtag/${searchInput}`);
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
    <AppLayout twitterSearch={twitterSearch}>
      <Container>
        <CenterContents>
          <SearchWrapper>
            <CountTwitWrapper>
              <CountTwitSpan>
                전체 트윗(
                {me && me.Posts.length})
              </CountTwitSpan>
            </CountTwitWrapper>
            <SearchContent>
              <SearchForm onSubmit={onSearch}>
                <SearchInput
                  enterButton
                  type="text"
                  placeholder="트위터 검색"
                  value={searchInput}
                  onChange={onChangeSearchInput}
                  ref={twitterSearch}
                />
                <IconContentFormContainer icon={faSearch} />
              </SearchForm>
            </SearchContent>
          </SearchWrapper>
          <PostWrapper>
            {me && <PostForm />}
            {mainPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </PostWrapper>
        </CenterContents>
      </Container>
    </AppLayout>
  );
};

export const getServerSideProps =
  wrapper.getServerSideProps(async (context) => {
    //console.log('getServerSideProps start');
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
    context.store.dispatch({
      type: LOAD_POSTS_REQUEST,
    });
    context.store.dispatch(END);
    //console.log('getServerSideProps end');
    await context.store.sagaTask.toPromise();
  });

export default Home;
