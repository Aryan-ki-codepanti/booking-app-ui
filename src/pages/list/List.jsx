import "./list.css";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";

const List = () => {
    const { state } = useLocation();

    const [destination, setDestination] = useState(state.destination);
    const [date, setDate] = useState(state.date);
    const [openDate, setOpenDate] = useState(false);
    const [options, setOptions] = useState(state.options);

    return (
        <div>
            <Navbar />
            <Header type="list" />
            <div className="listContainer">
                <div className="listWrapper">
                    <div className="listSearch">
                        <h1 className="lsTitle">Search</h1>
                        <div className="lsItem">
                            <label htmlFor="">Destination</label>
                            <input type="text" placeholder={destination} />
                        </div>
                        <div className="lsItem">
                            <label htmlFor="">Check-in Date</label>
                            <span onClick={e => setOpenDate(prev => !prev)}>
                                {`${format(
                                    date[0].startDate,
                                    "MM/dd/yyyy"
                                )} to ${format(date[0].endDate, "MM/dd/yyyy")}`}
                            </span>
                            {openDate && (
                                <DateRange
                                    onChange={item => setDate([item.selection])}
                                    minDate={new Date()}
                                    ranges={date}
                                />
                            )}
                        </div>
                        <div className="lsItem">
                            <label htmlFor="">Options</label>
                            <div className="lsOptions">
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">
                                        Min Price <small>per night</small>
                                    </span>
                                    <input
                                        type="number"
                                        class="lsOptionInput"
                                    />
                                </div>
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">
                                        Max Price <small>per night</small>
                                    </span>
                                    <input
                                        type="number"
                                        class="lsOptionInput"
                                    />
                                </div>
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">Adult</span>
                                    <input
                                        type="number"
                                        class="lsOptionInput"
                                        placeholder={options.adult}
                                        min={1}
                                    />
                                </div>
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">
                                        Children
                                    </span>
                                    <input
                                        type="number"
                                        class="lsOptionInput"
                                        placeholder={options.children}
                                        min={0}
                                    />
                                </div>
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">Room</span>
                                    <input
                                        type="number"
                                        class="lsOptionInput"
                                        placeholder={options.room}
                                        min={1}
                                    />
                                </div>
                            </div>
                        </div>
                        <button> Search </button>
                    </div>
                    <div className="listResult"></div>
                </div>
            </div>
        </div>
    );
};

export default List;
