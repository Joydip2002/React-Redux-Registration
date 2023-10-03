import React, { useState } from 'react';
import { useApi } from '../../context/ApiContext';
import './Card.css';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../redux/CartSlice';
import axios from 'axios';
const baseURL = 'http://127.0.0.1:8000/api';
import { toast } from 'react-toastify';


function Card() {
    const { getData } = useApi();
    const dispatch = useDispatch();
    const [page, setPage] = useState(1)
    const addToCart = async (id) => {
        try {
            const res = await axios.get(`${baseURL}/posts/${id}`);
            console.log(res);
            dispatch(addItemToCart(res.data?.post));
            if(res.status == 200){
                toast.success("Added Successfull!", {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
            else{
                toast.failed("Something Went Wrong!!😒", {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    }

    const pageSelectFunc = (pageNumber) => {
        setPage(pageNumber);
    }
    const prevFunc = () => {
        if ((page - 1) > 0) { setPage(page - 1) }
        else {
            setPage(Math.floor(getData.length / 10))
        }
    };
    const nextFunc = () => {
        if ((page + 1) <= getData.length / 10) { setPage(page + 1) }
        else {
            setPage(1);
        }
    };
    return (
        <>
            <div className="card__container container my-3">
                <div className='pagination__container w-100'>
                    {
                        getData.length > 0 && (
                            <>
                                <div className='pagination'>
                                    <span onClick={prevFunc}>◀️</span>
                                    {
                                        [...Array(Math.floor((getData.length) / 10))].map((_, index) => {
                                            return <span className={page == index + 1 ? 'selectedPage' : ''} onClick={() => pageSelectFunc(index + 1)} key={index}>{index + 1}</span>
                                        })
                                    }
                                    <span onClick={nextFunc}>▶️</span>
                                </div>
                            </>
                        )
                    }
                </div>
                {getData ?
                    getData.slice(page * 9 - 9, page * 9).map((data, index) => {
                        return (
                            <div className="border mt-3 shadow-lg cardcontainer" style={{ width: '20rem' }} key={index}>
                                <div className='text-center' style={{ backgroundColor: '#d9d9d9' }}>
                                    <img
                                        src={data.thumbnail}
                                        className="img-thumbnail img-fluid"
                                        style={{ width: '100%', height: '150px' }}
                                        alt={data.thumbnail}
                                    />
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">{data.title}</h5>
                                    <h5 className="card-title">₹{data.price}</h5>
                                    <p className="card-text" style={{ maxHeight: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{data.description}</p>
                                    <button className='btn btn-danger' onClick={() => addToCart(data.id)}>Add To Cart</button>
                                </div>
                            </div>
                        )
                    })
                    : (<p>Loading...</p>)}
            </div>
        </>
    )
}
export default Card;