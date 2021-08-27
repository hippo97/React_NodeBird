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
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default reducer;
