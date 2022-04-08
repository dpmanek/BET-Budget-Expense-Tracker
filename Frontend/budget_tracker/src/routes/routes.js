import { Routes as Switch, Route as Routing } from "react-router-dom";
import Home from '../Components/Home/Home'
import Login from '../Components/login/login';

const Routesr =()=>{
    return(
        <>
        <Switch>
        <Routing exact path="/" element={<Home/>} />
        <Routing exact path="/login" element={<Login/>}/>
        </Switch>
        </>
    )
}
export default Routesr;
