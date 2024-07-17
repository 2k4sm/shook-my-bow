import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/loaderSlice";
import { getShowById } from "../calls/shows";
import { useNavigate, useParams } from "react-router-dom";
import { message, Card, Row, Col, Button } from "antd";
import moment from "moment";
import { bookShow, makePayment } from "../calls/bookings";
import StripeCheckout from "react-stripe-checkout";

const BookShow = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [show, setShow] = useState();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const getData = async () => {
    try {
      dispatch(showLoading());
      const response = await getShowById({ showId: params.id });
      if (response.success) {
        setShow(response.data);
        console.log(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(hideLoading());
    } catch (err) {
      message.error(err.message);
      dispatch(hideLoading());
    }
  };

  const getSeats = () => {
    let columns = 12;
    let totalSeats = show.totalSeats;
    let rows = Math.ceil(totalSeats / columns);

    return (
      <div className="flex flex-col items-center">
        <div className="w-full max-w-2xl mx-auto mb-6">
          <p className="text-center mb-3">
            Screen this side, you will be watching in this direction
          </p>
          <div className="bg-gray-200 h-2 w-full mb-4"></div>
        </div>
        <ul className="flex flex-wrap justify-center items-center w-[50%] gap-2">
          {Array.from(Array(rows).keys()).map((row) => {
            return Array.from(Array(columns).keys()).map((column) => {
              let seatNumber = row * columns + column + 1;

              let seatClass = "bg-gray-200 border border-gray-400 w-10 h-9 text-center text-sm cursor-pointer";

              if (selectedSeats.includes(seatNumber)) {
                seatClass += " bg-green-500 text-white border-green-500";
              }
              if (show.bookedSeats.includes(seatNumber)) {
                seatClass += " bg-gray-400 text-gray-600 border-gray-400 cursor-not-allowed";
              }

              if (seatNumber <= totalSeats)
                return (
                  <li key={seatNumber}>
                    <button
                      onClick={() => {
                        if (selectedSeats.includes(seatNumber)) {
                          setSelectedSeats(
                            selectedSeats.filter(
                              (curSeatNumber) => curSeatNumber !== seatNumber
                            )
                          );
                        } else {
                          setSelectedSeats([...selectedSeats, seatNumber]);
                        }
                      }}
                      className={seatClass}
                    >
                      {seatNumber}
                    </button>
                  </li>
                );
            });
          })}
        </ul>

        <div className="flex justify-between w-full max-w-2xl mx-auto mt-3 mb-6 p-4 border rounded shadow">
          <div className="flex-1">
            Selected Seats: <span>{selectedSeats.join(", ")}</span>
          </div>
          <div className="flex-shrink-0 ml-3">
            Total Price: <span>Rs. {selectedSeats.length * show.ticketPrice}</span>
          </div>
        </div>
      </div>
    );
  };

  const book = async (transactionId) => {
    try {
      dispatch(showLoading());
      const response = await bookShow({
        show: params.id,
        transactionId,
        seats: selectedSeats,
        user: user._id,
      });
      if (response.success) {
        message.success("Show Booking done!");
        navigate("/profile");
      } else {
        message.error(response.message);
      }
      dispatch(hideLoading());
    } catch (err) {
      message.error(err.message);
      dispatch(hideLoading());
    }
  };

  const onToken = async (token) => {
    try {
      dispatch(showLoading());
      const response = await makePayment(
        token,
        selectedSeats.length * show.ticketPrice * 100
      );
      if (response.success) {
        message.success(response.message);
        book(response.data);
        console.log(response);
      } else {
        message.error(response.message);
      }
      dispatch(hideLoading());
    } catch (err) {
      message.error(err.message);
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {show && (
        <Row gutter={24}>
          <Col span={24}>
            <Card
              title={
                <div className="mb-4">
                  <h1 className="text-xl font-bold">{show.movie.title}</h1>
                  <p className="mb-2">
                    Theatre: {show.theatre.name}, {show.theatre.address}
                  </p>
                </div>
              }
              extra={
                <div className="space-y-2">
                  <h3>
                    <span className="font-semibold">Show Name:</span> {show.name}
                  </h3>
                  <h3>
                    <span className="font-semibold">Date & Time:</span>{" "}
                    {moment(show.date).format("MMM Do YYYY")} at{" "}
                    {moment(show.time, "HH:mm").format("hh:mm A")}
                  </h3>
                  <h3>
                    <span className="font-semibold">Ticket Price:</span> Rs. {show.ticketPrice}/-
                  </h3>
                  <h3>
                    <span className="font-semibold">Total Seats:</span> {show.totalSeats}
                    <span> &nbsp;|&nbsp; Available Seats:</span>{" "}
                    {show.totalSeats - show.bookedSeats.length}
                  </h3>
                </div>
              }
              style={{ width: "100%" }}
            >
              {getSeats()}

              {selectedSeats.length > 0 && (
                <StripeCheckout
                  token={onToken}
                  amount={selectedSeats.length * show.ticketPrice * 100}
                  stripeKey="pk_test_51JKPQWSJULHQ0FL7VOkMrOMFh0AHMoCFit29EgNlVRSvFkDxSoIuY771mqGczvd6bdTHU1EkhJpojOflzoIFGmj300Uj4ALqXa"
                >
                  <div className="max-w-2xl mx-auto mt-4">
                    <Button type="primary" shape="round" size="large" block>
                      Pay Now
                    </Button>
                  </div>
                </StripeCheckout>
              )}
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default BookShow;
