import { Button, Card, Popover, Avatar } from "antd";
import React from "react";
import PropTypes from "prop-types";
import {
  EllipsisOutlined,
  HeartOutlined,
  MessageOutlined,
  RetweetOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import PostImages from "./PostImages";

const PostCard = ({ post }) => {
  const { me } = useSelector((state) => state.user); //== const id = useSelector((state) => state.user.me?.id)
  const id = me?.id; // == me && me.id
  return (
    <div style={{ marginBottom: 20 }}>
      <Card
        cover={
          post.Images[0] && (
            <PostImages images={post.Images} />
          )
        }
        actions={[
          <RetweetOutlined key="retweet" />,
          <HeartOutlined key="heart" />,
          <MessageOutlined key="comment" />,
          <Popover
            key="more"
            content={
              <Button.Group>
                {id && post.User.id === id ? (
                  <>
                    <Button>수정</Button>
                    <Button type="danger">삭제</Button>
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
      >
        <Card.Meta
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
          title={post.User.nickname}
          description={post.content}
        />
      </Card>
      {/*<CommentForm />
      <Comments />*/}
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    createdAt: PropTypes.object,
    Comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default PostCard;
