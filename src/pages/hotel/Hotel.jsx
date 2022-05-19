import "./hotel.css";

import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import MailList from "../../components/mailList/MailList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleArrowLeft,
    faCircleArrowRight,
    faCircleXmark,
    faLocationDot
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const Hotel = () => {
    const { id } = useParams();
    const [slideNumber, setSlideNumber] = useState(0);
    const [open, setOpen] = useState(false);

    

    const { data, loading, error } = useFetch(
        `${process.env.REACT_APP_API}/hotels/find/${id}`
    );

    return (
        <div>
            <Navbar />
            <Header type="list" />
            {loading ? (
                "loading"
            ) : (
                <div className="hotelContainer">
                    {open && (
                        <div className="slider">
                            <FontAwesomeIcon
                                icon={faCircleXmark}
                                className="close"
                                onClick={() => setOpen(prev => false)}
                            />
                            <FontAwesomeIcon
                                icon={faCircleArrowLeft}
                                className="arrow"
                                onClick={() =>
                                    setSlideNumber(prev =>
                                        prev === 0
                                            ? data.photos.length - 1
                                            : prev - 1
                                    )
                                }
                            />
                            <div className="sliderWrapper">
                                <img
                                    className="sliderImg"
                                    src={data.photos[slideNumber]}
                                    alt=""
                                />
                            </div>
                            <FontAwesomeIcon
                                icon={faCircleArrowRight}
                                className="arrow"
                                onClick={() =>
                                    setSlideNumber(prev =>
                                        prev === data.photos.length - 1
                                            ? 0
                                            : prev + 1
                                    )
                                }
                            />
                        </div>
                    )}
                    <div className="hotelWrapper">
                        <button className="bookNow">
                            Reserve or Book Now!
                        </button>
                        <h1 className="hotelTitle">{data.name}</h1>
                        <div className="hotelAddress">
                            <FontAwesomeIcon icon={faLocationDot} />
                            <span>{data.address}</span>
                        </div>
                        <span className="hotelDistance">
                            Excellent location - {data.distance}m from center
                        </span>
                        <span className="hotelPriceHighlight">
                            Book a stay over ${data.cheapestPrice} at this property and get a
                            free airport taxi
                        </span>
                        <div className="hotelImages">
                            {data.photos?.map((photo, index) => (
                                <div className="hotelImgWrapper" key={index}>
                                    <img
                                        className="hotelImg"
                                        src={photo}
                                        alt=""
                                        onClick={() => {
                                            setSlideNumber(prev => index);
                                            setOpen(prev => true);
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="hotelDetails">
                            <div className="hotelDetailsTexts">
                                <h1 className="hotelTitle">
                                    {data.title}
                                </h1>
                                <p className="hotelDesc">
                                    {data.desc}
                                </p>
                            </div>
                            <div className="hotelDetailsPrice">
                                <h1>Perfect for a 9-night stay!</h1>
                                <span>
                                    Located in the real heart of Krakow, this
                                    property has an excellent location score of
                                    9.8!
                                </span>
                                <h2>
                                    <b>$945</b> (9 nights)
                                </h2>
                                <button>Reserve or Book Now!</button>
                            </div>
                        </div>
                    </div>
                    <MailList />
                    <Footer />
                </div>
            )}
        </div>
    );
};

export default Hotel;
