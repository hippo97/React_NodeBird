import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Slick from 'react-slick';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import {
  CloseBtn,
  CloseIcon,
  Global,
  Header,
  ImgWrapper,
  Indicator,
  Overlay,
  SlickWrapper,
} from './styles';

const ImagesZoom = ({ images, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  return (
    <Overlay>
      <Global />
      <Header>
        <CloseBtn onClick={onClose}>
          <CloseIcon icon={faTimesCircle} />
        </CloseBtn>
      </Header>
      <SlickWrapper>
        <div>
          <Slick
            initialSlide={0}
            beforeChange={(slide) => setCurrentSlide(slide)}
            infinite
            arrows={false}
            slidesToShow={1}
            slidesToScroll={1}
          >
            {images.map((v) => (
              <ImgWrapper key={v.src}>
                <img
                  src={`http://localhost:3065/${v.src}`}
                  alt={v.src}
                  width="60%"
                  height="60%"
                />
              </ImgWrapper>
            ))}
          </Slick>
          <Indicator>
            <div>
              {currentSlide + 1}
              {'  '}/{'  '}
              {images.length}
            </div>
          </Indicator>
        </div>
      </SlickWrapper>
    </Overlay>
  );
};

ImagesZoom.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ImagesZoom;
