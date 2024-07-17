import { useEffect, useState } from "react";
import { hideLoading, showLoading } from "../redux/loaderSlice";
import { useDispatch, useSelector } from "react-redux";
import { getAllMovies } from "../calls/movies";
import { message, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";

const Home = () => {
  const [movies, setMovies] = useState(null);
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const getData = async () => {
    try {
      dispatch(showLoading());
      const response = await getAllMovies();
      if (response.success) {
        setMovies(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(hideLoading());
    } catch (err) {
      message.error(err.message);
      dispatch(hideLoading());
    }
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (user && user.role) {
      if (user.role === "admin") {
        navigate("/admin");
      } else if (user.role === "partner") {
        navigate("/partner");
      }
    }
  }, [user, navigate]);

  return (
    <>
      <div className="w-full pb-5 h-full">
        <Input
          placeholder="Type here to search for movies"
          onChange={handleSearch}
          prefix={<SearchOutlined />}
          className="w-full p-2 mb-4"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
        {movies &&
          movies
            .filter((movie) =>
              movie.title.toLowerCase().includes(searchText.toLowerCase())
            )
            .map((movie) => (
              <div key={movie._id} className="text-center border rounded-lg shadow-md w-52">
                <img
                  onClick={() => {
                    navigate(
                      `/movie/${movie._id}?date=${moment().format(
                        "YYYY-MM-DD"
                      )}`
                    );
                  }}
                  className="cursor-pointer h-80 w-full object-cover rounded-md"
                  src={movie.poster}
                  alt="Movie Poster"
                />
                <h3
                  onClick={() => {
                    navigate(
                      `/movie/${movie._id}?date=${moment().format(
                        "YYYY-MM-DD"
                      )}`
                    );
                  }}
                  className="cursor-pointer mt-4 text-lg font-bold"
                >
                  {movie.title}
                </h3>
              </div>
            ))}
      </div>
    </>
  );
};

export default Home;
