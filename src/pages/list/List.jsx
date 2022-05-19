import "./list.css";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";

const List = () => {
    const { state } = useLocation();

    const [destination, setDestination] = useState(state.destination);
    const [date, setDate] = useState(state.date);
    const [openDate, setOpenDate] = useState(false);
    const [options, setOptions] = useState(state.options);
    const [min, setMin] = useState(null);
    const [max, setMax] = useState(null);


    const { data, loading, error, reFetch } = useFetch(
        `${process.env.REACT_APP_API}/hotels?city=${destination}&max=${max || 999}&min=${min | 0}`
    );

    const handleSearchClick = e => {
        reFetch();
    }

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
                                        className="lsOptionInput"
                                        onChange={e => setMin(prev => e.target.value)}
                                    />
                                </div>
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">
                                        Max Price <small>per night</small>
                                    </span>
                                    <input
                                        type="number"
                                        className="lsOptionInput"
                                        onChange={e => setMax(prev => e.target.value)}
                                    />
                                </div>
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">Adult</span>
                                    <input
                                        type="number"
                                        className="lsOptionInput"
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
                                        className="lsOptionInput"
                                        placeholder={options.children}
                                        min={0}
                                    />
                                </div>
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">Room</span>
                                    <input
                                        type="number"
                                        className="lsOptionInput"
                                        placeholder={options.room}
                                        min={1}
                                    />
                                </div>
                            </div>
                        </div>
                        <button onClick={handleSearchClick}> Search </button>
                    </div>
                    <div className="listResult">
                        {loading
                            ? "loading"
                            : data.map(item => (
                                  <SearchItem item={item} key={item._id} />
                              ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default List;
