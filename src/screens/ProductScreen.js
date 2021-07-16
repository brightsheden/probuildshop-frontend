// @flow strict

import  React,{useState,useEffect} from 'react';
import {Link,} from 'react-router-dom'
import {Row,Col,Image,ListGroup,Button,Card,Form} from 'react-bootstrap'
import Rating from '../components/Rating';
//import products from '../products';
import { useDispatch,useSelector } from "react-redux";
import { listProductsDetails } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

function ProductScreen({match,history}) {
    //const product = products.find((p)=> p._id === match.params.id)
    const dispatch = useDispatch()
    const productDetails = useSelector(state=> state.productDetails)
    const {error,loading,product} = productDetails
    const [qty, setQty] = useState(1)

    useEffect(()=>{
        dispatch(listProductsDetails(match.params.id))


    },[dispatch,match])

    const addToCartHandler = ()=>{
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    

    
    return (
        <div>
            <Link to='/' className="btn btn-light my-3">Go Back</Link>
            {loading ? <Loader/> 
                : error ? <Message variant="danger">{error}</Message> : (
                    <Row>
                <Col md={6}>
                 <Image src={product.image} alt={product.name} fluid/>
                </Col>

                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'}/>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            Price: ${product.price}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            description: {product.description}
                        </ListGroup.Item>

                    </ListGroup>
                </Col>

                <Col md={3}>
                    <Card>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <Row>
                            <Col> Price:</Col>
                            <Col>${product.price}</Col>
                        </Row>

                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col> Status:</Col>
                            <Col>{product.countInstock ? "In Stock": 'Out of Stock'}</Col>
                        </Row>

                </ListGroup.Item>

                    {product.countInstock > 0 && (
                        <ListGroup.Item>
                            <Row>
                                <Col>Qty</Col>
                               <Col xs='auto' className='my-1'>
                                 <Form.Control
                                 as="select"
                                 value={qty}
                                 onChange={(e)=> setQty(e.target.value)}
                                 >
                                     {
                                         [...Array(product.countInstock).keys()].map((x)=>(
                                             <option key={x+1} value={x + 1}>
                                             {x + 1}    
                                             </option>
                                         ))
                                    }

                                 </Form.Control>
                               </Col>
                            </Row>
                        </ListGroup.Item>
                    )}

                <ListGroup.Item>
                    <Col>
                            <Button className="btn-block" type="button" disabled={product.countInStock === 0}
                            onClick={addToCartHandler}>Add to Cart</Button>
                            </Col>
                            
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
                )}
            
        </div>
    );
};

export default ProductScreen;