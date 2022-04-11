import { Routes as Switch, Route as Routing } from "react-router-dom";
import Home from '../Components/Home/Home'
import Login from '../Components/login/login';
import Signup from "../Components/Signup";

const Routesr =()=>{
    return(
        <>
        <Switch>
        <Routing exact path="/" element={<Home/>} />
        <Routing exact path="/login" element={<Login/>}/>
        <Routing exact path="/signup" element={<Signup/>}/>

        </Switch>
        </>
    )
}
export default Routesr;
