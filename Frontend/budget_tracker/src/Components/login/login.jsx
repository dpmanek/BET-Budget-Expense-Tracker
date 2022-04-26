import React from 'react';
import styles from "./styles.module.css";
import { useState, useEffect} from "react";
import { Link,useNavigate} from "react-router-dom";
import AuthService from '../../services/auth.service';


const Login =() =>{
    let navigate = useNavigate();
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("") //error checking
	
	//states for loading once login button is clicked
	const [loading, setLoading] = useState(false);
	//message for if its complete or no
  	const [message, setMessage] = useState("");

	  //redirect user to dashboard if already logged in
	  useEffect(() => { //checks only if current user is there major checking on dashboard
		var currentUser = AuthService.getCurrentUser()
		if(currentUser){
			navigate('/dashboard');
		}
		
	  }, []);


	const handleChange = ({ currentTarget: input }) => {
		//you can add dynamic front end checking here
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setMessage("");
		setLoading(true);
		//add form validation
		//if (checkBtn.current.context._errors.length === 0) {
		  AuthService.login(data.email, data.password).then(
			() => {
			  navigate("/dashboard");
			  window.location.reload();
			  
			},
			(error) => {
			  const resMessage =
				(error.response &&
				  error.response.data &&
				  error.response.data.message) ||
				error.message ||
				error.toString();
			  setLoading(false);
			  setMessage(resMessage);
			}
		  );
	//	} else {
		  setLoading(false);
		//}
	  };

	return (
		<div className={styles.login_container}>
			<div className={styles.login_form_container}>
				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Login to Your Account</h1>
						<label For="loginemail">Email</label>
						<input
						id="loginemail"
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>
						<label For="loginpassword">Password</label>
						<input
						id="loginpassword"
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>
						{error && <div className={styles.error_msg}>{error}</div>}
						<button className="btn btn-success btn-round-lg btn-lg " disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
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