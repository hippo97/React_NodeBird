export const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: "hippo",
      },
      content: "첫 번째 게시글 #해시태그 #익스프레스",
      Images: [
        {
          src: "https://cdn.pixabay.com/photo/2021/08/22/12/24/mountains-6564997_960_720.jpg",
        },
        {
          src: "https://cdn.pixabay.com/photo/2021/07/28/19/28/bee-6503344_960_720.jpg",
        },
        {
          src: "https://cdn.pixabay.com/photo/2021/08/22/15/39/kid-6565461_960_720.jpg",
        },
      ],
      Comments: [
        {
          User: {
            nickname: "Doch",
          },
          content: "첫 댓글",
        },
        {
          User: {
            nickname: "Peer",
          },
          content: "두번째 댓글",
        },
      ],
    },
  ],
  imagePaths: [],
  postAdded: false,
};

const ADD_POST = "ADD_POST";
export const addPost = {
  type: ADD_POST,
};

const dummyPost = {
  id: 2,
  content: "더미데이터",
  User: {
    id: 1,
    nickname: "kokoa",
  },
  Images: [],
  Comments: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts], //새로 추가할 post를 앞에써줘야(여기서는 dummyPost) 최신 게시글이 밑으로 생기는게 아니라 최신 게시글이 위에 생기게 하는 효과
        postAdded: true,
      };
    default:
      return state;
  }
};

export default reducer;
