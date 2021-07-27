import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { listProductsDetails , updateProduct} from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
//import { getUserDetails, updateUser } from '../actions/userActions'



function ProductEditScreen({ match, history }) {

    const productId = match.params.id

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInstock, setCountInstock] = useState('')
    const [description, setDescription] = useState('')



    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { error, loading, product } = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const { error:errorUpdate, loading:loaadingUpdate,success:successUpdate } = productDetails



    useEffect(() => {

        if(successUpdate){
            dispatch({type:PRODUCT_UPDATE_RESET})
            history.push("/admin/productlist")
        }else{
            if (!product.name || product._id !== Number(productId)) {
                dispatch(listProductsDetails(productId))
            } else {
                setName(product.name)
                setPrice(product.price)
                setBrand(product.brand)
                setImage(product.image)
                setCategory(product.category)
                setCountInstock(product.countInstock)
                setDescription(product.description)
        }

        }
        
   
           
    }, [dispatch, product, productId,history,successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct(
            {
                _id:  product._id,
                name,
                price,
                image,
                brand,
                category,
                countInstock,
                description
            }
        ))
        console.log("updated")
        history.push('/admin/productlist')
       //dispatch(updateUsers ({ _id: user._id, name, email, isAdmin }))
    }

    return (
        <div>
            <Link to='/admin/productlist'>
                Go Back
            </Link>

            <FormContainer>
                <h1>Edit Product</h1>
                        {loaadingUpdate && <Loader/>}
                        {errorUpdate && <Message variant="danger">{error}</Message>}

                        {loading? (<Loader/>): error? (<Message variant="danger">{error}</Message>)
                            :
                            (
                                <Form onSubmit={submitHandler}>

                            <Form.Group controlId='name'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control

                                    type='name'
                                    placeholder='Enter name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            

                            <Form.Group controlId='price'>
                                <Form.Label>price</Form.Label>
                                <Form.Control

                                    type='number'
                                    placeholder='Enter price'
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='brand'>
                                <Form.Label>brand</Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder='brand'
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='image'>
                                <Form.Label>Image</Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder='Enter image'
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='category'>
                                <Form.Label>category</Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder='Ente category'
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='countInstock'>
                                <Form.Label>countInstock</Form.Label>
                                <Form.Control

                                    type='number'
                                    placeholder='Enter countInstock'
                                    value={countInstock}
                                    onChange={(e) => setCountInstock(e.target.value)}

                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='description'>
                                <Form.Label>description</Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder='Enter description here'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                           

                            <Button type='submit' variant='primary'>
                                Update
                        </Button>

                        </Form>
                    
                            )}        
                    
                        

            </FormContainer >
        </div>

    )
}

export default ProductEditScreen