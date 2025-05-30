import './Carousel.css'
import Carousel from 'react-bootstrap/Carousel';

export const CarouselHome = () => {
    return (
        <Carousel data-bs-theme="dark">
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/images/img-carrossel-1.png"
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/images/img-carrossel-2.png"
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/images/img-carrossel-3.png"
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
      );
}