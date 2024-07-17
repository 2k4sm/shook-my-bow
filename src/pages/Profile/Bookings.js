import { Button, Card, Col, Row, message } from "antd";
import { useEffect, useState } from "react";
import { hideLoading, showLoading } from "../../redux/loaderSlice";
import { getAllBookings } from "../../calls/bookings";
import { useDispatch } from "react-redux";
import moment from 'moment';
import { Link } from "react-router-dom";

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const dispatch = useDispatch(); 

    const getData = async () => {
        try{
            dispatch(showLoading());
            const response = await getAllBookings();
            if(response.success){
                setBookings(response.data);
                 console.log(response.data);
            }else{
                message.error(response.message);
            }

            dispatch(hideLoading());
        }catch(err){
            message.error(err.message);
            dispatch(hideLoading());
        }
    }

    useEffect(() => {
        getData();
    }, []);


    return(
        <>
            {bookings.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {bookings.map(booking => (
                        <div key={booking._id} className="mb-3">
                            <div className="border p-4 rounded shadow">
                                <div className="flex flex-col lg:flex-row items-start lg:items-center">
                                    <div className="flex-shrink-0 mb-4 lg:mb-0">
                                        <img src={booking.show.movie.poster} className="w-24" alt="Movie Poster"/>
                                    </div>
                                    <div className="flex-1 lg:ml-4">
                                        <h3 className="text-xl font-bold mb-2">{booking.show.movie.title}</h3>
                                        <p className="mb-1">Theatre: <b>{booking.show.theatre.name}</b></p>
                                        <p className="mb-1">Seats: <b>{booking.seats.join(", ")}</b></p>
                                        <p className="mb-1">Date & Time: <b>{moment(booking.show.date).format("MMM Do YYYY")} {moment(booking.show.time, "HH:mm").format("hh:mm A")}</b></p>
                                        <p className="mb-1">Amount: <b>Rs.{booking.seats.length * booking.show.ticketPrice}</b></p>
                                        <p className="mb-1">Booking ID: <b>{booking.transactionId}</b></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center pt-3">
                    <h1 className="text-2xl mb-4">You've not booked any show yet!</h1>
                    <Link to="/">
                        <Button type="primary">Start Booking</Button>
                    </Link>
                </div>
            )}
        </>
    );
};

export default Bookings;
