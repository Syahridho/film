import Carousel from "react-multi-carousel";
import Card from "../Card";

const CardListCarousel = (props: any) => {
  const { movies, title } = props;

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 8,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  return (
    <div className="my-0">
      <h1 className="ps-2 text-3xl font-semibold">{title}</h1>
      <Carousel responsive={responsive} className="mb-12">
        {movies.length > 0 &&
          movies.map((movie: any, index: any) => (
            <Card movie={movie} key={index} />
          ))}
      </Carousel>
    </div>
  );
};

export default CardListCarousel;