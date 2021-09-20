import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button } from 'antd';

const EditPostForm = ({ post }) => {
  return (
    <Form
      style={{ margin: '10px 0 20px' }}
      encType="multipart/form-data"
      //onFinish={onSubmit}
    >
      <Input.TextArea
        //value={text}
        //onChange={onChangeText}
        maxLength={140}
        placeholder={post.content}
      />
      <div>
        <input
          type="file"
          name="image"
          multiple
          hidden
          //ref={imageInput}
          //onChange={onChangeImages}
        />
        <Button
        //onClick={onClickImageUpload}
        >
          이미지 업로드
        </Button>
        <Button
          type="primary"
          style={{ float: 'right' }}
          htmlType="submit"
          //</div>loading={
          //addPostLoading
          //}
        >
          짹짹
        </Button>
      </div>
      <div>
        {imagePaths.map((v, i) => (
          <div key={v} style={{ display: 'inline-block' }}>
            <img
              src={`http://localhost:3065/${v}`}
              style={{ width: '200px' }}
              alt={v}
            />
            <div>
              <Button
              //</div>onClick={
              //onRemoveImage(i)
              //}
              >
                제거
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Form>
  );
};

EditPostForm.propTypes = {
  post: PropTypes.object.isRequired,
};

export default EditPostForm;
