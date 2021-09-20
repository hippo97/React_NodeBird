import React, {
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Input, Button } from 'antd';
import { useRouter } from 'next/router';

import useInput from '../hooks/useInput';
import {
  REMOVE_IMAGE,
  UPLOAD_IMAGES_REQUEST,
} from '../reducers/post';

const EditPostForm = ({ post }) => {
  const router = useRouter();
  const [text, onChangeText, setText] = useInput(
    post.content
  );
  const dispatch = useDispatch();
  const { editPostLoading, imagePaths } = useSelector(
    (state) => state.post
  );

  const imageInput = useRef();
  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onChangeImages = useCallback((e) => {
    console.log('images', e.target.files);
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append('image', f);
    });
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData,
    });
  });

  const onRemoveImage = useCallback((index) => () => {
    dispatch({
      type: REMOVE_IMAGE,
      data: index,
    });
  });

  return (
    <Form
      style={{ margin: '10px 0 20px' }}
      encType="multipart/form-data"
      //onFinish={onSubmit}
    >
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={140}
      />
      <div>
        <input
          type="file"
          name="image"
          multiple
          hidden
          ref={imageInput}
          onChange={onChangeImages}
        />
        <Button onClick={onClickImageUpload}>
          이미지 업로드
        </Button>
        <Button
          type="primary"
          style={{ float: 'right' }}
          danger
          onClick={() => router.push('../')}
        >
          취소하기
        </Button>
        <Button
          type="primary"
          style={{ float: 'right' }}
          htmlType="submit"
          loading={editPostLoading}
        >
          수정하기
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
              <Button onClick={onRemoveImage(i)}>
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
