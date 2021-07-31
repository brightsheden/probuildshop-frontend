// @flow strict

import React,{useEffect} from 'react';
import {Col,Pagination,Row,} from 'react-bootstrap'
//import products from '../products'
import Product from '../components/Products'
import { useDispatch,useSelector } from "react-redux";
import { listProducts } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Parginate from '../components/Parginate';
import ProductCarosel from '../components/ProductCarosel';


function HomeScreen({history}) {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const {error,loading,products,page,pages} = productList
    
    let keyword = history.location.search
    useEffect(()=>{
        dispatch(listProducts(keyword))
        
       
 

    },[dispatch,keyword])
  


    return (
        <div>
            {!keyword &&  <ProductCarosel/>}
            
            <h1>latest Products</h1>
            {loading ? <Loader/> :
            error ? <Message variant='danger'>{error}</Message>:
        <div>
            <Row>
                {products.map(product => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product}/>
                </Col>
                ))}
        
            </Row>
            <Parginate page={page} pages={pages} keyword={keyword}/>
        </div>
             }
            
        </div>
    );
};

export default HomeScreen;