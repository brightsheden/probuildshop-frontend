import React from 'react';
import Headers from './components/Headers';
import Footer from './components/Footer';
//import '../src/index.css'
import { Container} from "react-bootstrap";
import HomeScreen from './screens/HomeScreen'; 
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import {BrowserRouter as Router ,Route,Switch,} from 'react-router-dom'
import ProfileScreen from './screens/ProfileScreen';
import PlaceorderScreen from './screens/PlaceorderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';


function App() {
  return (
    <Router >
     <Headers/>
     <main className="py-3">
       <Container>
         <Route path='/' component={HomeScreen} exact/>
         <Route path='/product/:id' component={ProductScreen}/>
         <Route path='/cart/:id?' component={CartScreen}/>
         <Route path='/login' component={LoginScreen}/>
         <Route path='/register' component={RegisterScreen}/>
         <Route path='/profile' component={ProfileScreen}/>
         <Route path='/shipping' component={ShippingScreen}/>
         <Route path='/placeorder' component={PlaceorderScreen}/>
         <Route path='/order/:id' component={OrderScreen}/>
         <Route path='/payment' component={PaymentScreen}/>


         <Route path='/admin/userlist' component={UserListScreen}/>
         <Route path='/admin/user/:id/edit/' component={UserEditScreen}/>
       </Container>
       
     </main>
     <Footer/>
    </Router>
  );
}

export default App;
