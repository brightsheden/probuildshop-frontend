// @flow strict

import React, { useEffect } from 'react';
import { LinkContainer } from "react-router-bootstrap";
import { Table,Button } from "react-bootstrap";
import {useSelector, useDispatch} from 'react-redux'
import {listUsers,deleteUsers} from '../actions/userAction'
import Message from '../components/Message';
import Loader from '../components/Loader';

function UserListScreen({history}) {
    const dispatch= useDispatch()
    const userList = useSelector(state=> state.usersList)
    const {loading,error,users} = userList

    const userLogin = useSelector(state=> state.userLogin)
    const {userInfo} = userLogin

    const userDelete = useSelector(state=> state.userDelete)
    const {success:successDelete} = userDelete

    useEffect(()=>{
        if(userInfo && userInfo.isAdmin){
            dispatch(listUsers())
        }else{
            history.push('/login')
        }
        
    },[dispatch,history,successDelete])

    const deleteHandler= (id)=>{
        if(window.confirm(`Are you sure you want to delete user`))
        {
            dispatch(deleteUsers(id))
        }
        
    }

    return (
        <div>
            <h1>Users</h1>
            {loading ? (<Loader/>) :
            error ? (<Message variant="danger">{error}</Message>):
            (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>ADMIN</th>

                        </tr>
                     
                        
                    </thead>
                    <tbody>
                        {users.map(user=>(
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.isAdmin ? (
                                    <i className="fa fa-check" style={{color: "green"}} ></i>
                                ):
                                (<i className="fa fa-check" style={{color: "red"}}></i>)}</td>
                                <td>
                                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                        <Button variant="light">
                                            <i className="fa fa-edit"></i>
                                        </Button>
                                    </LinkContainer>
                                    <Button variant="danger" onClick={()=> deleteHandler(user._id)}>
                                            <i className="fa fa-trash"></i>
                                        </Button>
                                </td>
                                
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
            
        </div>
    );
};

export default UserListScreen;