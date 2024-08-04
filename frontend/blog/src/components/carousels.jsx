import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage from '../assets/img3.jpg';
import ExampleCarouselImage2 from '../assets/img30.jpg';
import ExampleCarouselImage3 from '../assets/img26.jpg';
import ExampleCarouselImage4 from '../assets/img25.jpg';

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  // Add custom styles to the Carousel component
  const carouselStyles = {
    display: 'flex',
    justifyContent: 'center',
    padding: '5%' // Set the desired height
  };

  const imageStyles = {
    objectFit: 'cover',
    width: '100%',
    height: '500px',
  };

  return (
    <Carousel
      activeIndex={index}
      onSelect={handleSelect}
      style={carouselStyles} // Apply the custom styles
    >
      <Carousel.Item>
        <img
          src={ExampleCarouselImage}
          alt="First slide"
          style={imageStyles} // Apply the image styles
        />
        <Carousel.Caption>
          <h3>"It does not matter how slowly you go as long as you do not stop."</h3>
          <p>- Confucius</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          src={ExampleCarouselImage2}
          alt="Second slide"
          style={imageStyles}
        />
        <Carousel.Caption>
          <h3>"The purpose of our lives is to be happy."</h3>
          <p>- Dalai Lama</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          src={ExampleCarouselImage3}
          alt="Third slide"
          style={imageStyles}
        />
        <Carousel.Caption>
          <h3>"Believe you can and you're halfway there."</h3>
          <p>- Theodore Roosevelt</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          src={ExampleCarouselImage4}
          alt="Fourth slide"
          style={imageStyles}
        />
        <Carousel.Caption>
          <h3>"Impossible is just an opinion."</h3>
          <p> - Paulo Coelho</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default ControlledCarousel;