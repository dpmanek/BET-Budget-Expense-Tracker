
import styles from "./styles.module.css";
import { useState, useEffect} from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


const Login =() =>{
    const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");
	axios.defaults.withCredentials = true;
	let navigate = useNavigate();
	const redirectRoute = (path) => {
		navigate(path);
	  };

	const[loginStatus, setLoginStatus] = useState("");
	
	useEffect( () => { // used to check if user is logged in to be used on all pages
		axios.get("http://localhost:8080/users/auth").then((res) =>{
		if(res.data.loggedIn == true){
			setLoginStatus(res.data.user.email);
			console.log(loginStatus);
			redirectRoute("/dashboard");
		}

		})
	 }, []);
	

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8080/users/auth";
			const { data: res } = await axios.post(url, data);
			redirectRoute("/dashboard");
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

	return (
		<div className={styles.login_container}>
			<div className={styles.login_form_container}>
				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Login to Your Account</h1>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>
						{error && <div className={styles.error_msg}>{error}</div>}
						<button type="submit" className={styles.green_btn}>
							Login
						</button>
					</form>
				</div>
				<div className={styles.right}>
					<h1>New Here ?</h1>
					<Link to="/signup">
						<button type="button" className={styles.white_btn}>
							Sign Up
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;