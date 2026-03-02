import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import NextIcon from './NextIcon';

const CarouselComponent = () => {
  const images = ['/carousel.png', '/carousel2.png', '/carousel3.png', '/carousel.png'];

  return (
    <Carousel
    NextIcon={<NextIcon />}
    PrevIcon={<NextIcon reverse/>}
    >
      {images.map((imageUrl, index) => (
        <Paper key={index} style={{borderBottomLeftRadius: '40px',borderBottomRightRadius: '40px'}}>
          <img src={imageUrl} alt="" style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderBottomLeftRadius: '40px',borderBottomRightRadius: '40px'
          
          }}/>
        </Paper>
      ))}
    </Carousel>
  );
};

export default CarouselComponent;
