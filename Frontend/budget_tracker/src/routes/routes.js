import { Routes as Switch, Route as Routing } from "react-router-dom";
import Home from '../Components/Home/Home'
import Login from '../Components/login/login';
import Signup from "../Components/Signup";
import Skeleton from "../Components/Skeleton/Skeleton";

const Routesr =()=>{
    return(
        <>
        <Switch>
        <Routing exact path="/" element={<Home/>} />
        <Routing exact path="/login" element={<Login/>}/>
        <Routing exact path="/signup" element={<Signup/>}/>
        <Routing exact path="/skeleton" element={<Skeleton/>}/>
        {/* <Routing exact path="/about" element={<About/>}/> */}

        </Switch>
        </>
    )
}
export default Routesr;
