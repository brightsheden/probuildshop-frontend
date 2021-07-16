// @flow strict

import React,{useEffect,useState} from 'react';
import {Col,Row,} from 'react-bootstrap'
//import products from '../products'
import Product from '../components/Products'
import { useDispatch,useSelector } from "react-redux";
import { listProducts } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';


function HomeScreen() {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const {error,loading,products} = productList
    

    useEffect(()=>{
        dispatch(listProducts())
        
       
 

    },[])
  


    return (
        <div>
            <h1>latest Products</h1>
            {loading ? <Loader/> :
            error ? <Message variant='danger'>{error}</Message>:
            <Row>
                {products.map(product => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product}/>
                </Col>
                ))}
        
            </Row>
             }
            
        </div>
    );
};

export default HomeScreen;