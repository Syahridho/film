import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Home = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 8,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <div className="max-w-[1100px] py-24 mx-auto min-h-screen">
      <div className="flex justify-between py-6">
        <h1 className="font-bold text">Film Palas</h1>
        <ul className="flex gap-10">
          <li className="hover:underline">
            <Link to={"new"}>Terbaru</Link>
          </li>
          <li className="hover:underline">
            <Link to={"best"}>Terpopuler</Link>
          </li>
          <li className="hover:underline">
            <Link to={"top"}>Tertop</Link>
          </li>
        </ul>
      </div>
      <div className="w-full">
        <img src="src/assets/poster/images.jpg" className="w-full" alt="" />
      </div>
      <div className="flex justify-center my-12">
        <div className="w-40 p-2 hover:cursor-pointer">
          <img
            src="src/assets/poster/1.jpg"
            className="rounded shadow-inner"
            alt=""
          />
          <h1 className="truncate">The Raid</h1>
        </div>
        <div className="w-40 p-2 hover:cursor-pointer">
          <img
            src="src/assets/poster/1.jpg"
            className="rounded shadow-inner"
            alt=""
          />
          <h1 className="truncate">The Raid</h1>
        </div>
        <div className="w-40 p-2 hover:cursor-pointer">
          <img
            src="src/assets/poster/1.jpg"
            className="rounded shadow-inner"
            alt=""
          />
          <h1 className="truncate">The Raid</h1>
        </div>
        <div className="w-40 p-2 hover:cursor-pointer">
          <img
            src="src/assets/poster/1.jpg"
            className="rounded shadow-inner"
            alt=""
          />
          <h1 className="truncate">The Raid</h1>
        </div>
        <div className="w-40 p-2 hover:cursor-pointer">
          <img
            src="src/assets/poster/1.jpg"
            className="rounded shadow-inner"
            alt=""
          />
          <h1 className="truncate">The Raid</h1>
        </div>
        <div className="w-40 p-2 hover:cursor-pointer">
          <img
            src="src/assets/poster/1.jpg"
            className="rounded shadow-inner"
            alt=""
          />
          <h1 className="truncate">The Raid</h1>
        </div>
        <div className="w-40 p-2 hover:cursor-pointer">
          <img
            src="src/assets/poster/1.jpg"
            className="rounded shadow-inner"
            alt=""
          />
          <h1 className="truncate">The Raid</h1>
        </div>
      </div>
      <div className="bg-slate-200 text-neutral-950 p-12 mb-24 rounded-xl">
        <h1 className="text-xl font-semibold leading-10">Tentang Kami</h1>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium,
          aperiam explicabo quas facere itaque odio nisi id cum ut earum. Natus
          harum nobis voluptates ut tempore velit nisi labore modi.
        </p>
      </div>
      <Carousel responsive={responsive}>
        <div className="p-2 hover:cursor-pointer">
          <img
            src="src/assets/poster/1.jpg"
            className="rounded shadow-inner"
            alt=""
          />
          <h1 className="truncate">The Raid</h1>
        </div>
        <div className="p-2 hover:cursor-pointer">
          <img
            src="src/assets/poster/1.jpg"
            className="rounded shadow-inner"
            alt=""
          />
          <h1 className="truncate">The Raid</h1>
        </div>
        <div className="p-2 hover:cursor-pointer">
          <img
            src="src/assets/poster/1.jpg"
            className="rounded shadow-inner"
            alt=""
          />
          <h1 className="truncate">The Raid</h1>
        </div>
        <div className="p-2 hover:cursor-pointer">
          <img
            src="src/assets/poster/1.jpg"
            className="rounded shadow-inner"
            alt=""
          />
          <h1 className="truncate">The Raid</h1>
        </div>
        <div className="p-2 hover:cursor-pointer">
          <img
            src="src/assets/poster/1.jpg"
            className="rounded shadow-inner"
            alt=""
          />
          <h1 className="truncate">The Raid</h1>
        </div>
        <div className="p-2 hover:cursor-pointer">
          <img
            src="src/assets/poster/1.jpg"
            className="rounded shadow-inner"
            alt=""
          />
          <h1 className="truncate">The Raid</h1>
        </div>
        <div className="p-2 hover:cursor-pointer">
          <img
            src="src/assets/poster/1.jpg"
            className="rounded shadow-inner"
            alt=""
          />
          <h1 className="truncate">The Raid</h1>
        </div>
        <div className="p-2 hover:cursor-pointer">
          <img
            src="src/assets/poster/1.jpg"
            className="rounded shadow-inner"
            alt=""
          />
          <h1 className="truncate">The Raid</h1>
        </div>
      </Carousel>
    </div>
  );
};

export default Home;
