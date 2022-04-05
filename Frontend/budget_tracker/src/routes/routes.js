import { Routes as Switch, Route as Routing } from "react-router-dom";
import Home from '../Components/Home/Home'

const Routesr =()=>{
    return(
        <>
        <Switch>
        <Routing exact path="/" element={<Home/>} />
        </Switch>
        </>
    )
}
export default Routesr;
