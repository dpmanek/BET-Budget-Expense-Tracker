import React from 'react';
import { useState, useEffect} from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import AuthService from '../../services/auth.service';

const Signup = () => {
	const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
	const [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const navigate = useNavigate();
	
	//redirect user to dashboard if already logged in
	useEffect(() => { //checks only if current user is there major checking on dashboard
		var currentUser = AuthService.getCurrentUser()
		if(currentUser){
			navigate('/dashboard');
		}
		
	  }, []);


	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setMessage("");
    	setSuccessful(false);
    	//form.current.validateAll();
  //  if (checkBtn.current.context._errors.length === 0) {
      AuthService.signup(data.firstName,data.lastName,data.email,data.password).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
		  navigate("/login");
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setMessage(resMessage);
          setSuccessful(false);
        }
      );
	// }
  };
	return (
		<div className={styles.signup_container}>
			<div className={styles.signup_form_container}>
				<div className={styles.left}>
					<h1>Welcome Back</h1>
					<Link to="/login">
						<button type="button" className={styles.white_btn}>
							Login
						</button>
					</Link>
				</div>
				<div className={styles.right}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Create Account</h1>
						<label htmlFor="firstName">First Name</label>
						<input
						id="firstName"
							type="text"
							placeholder="First Name"
							name="firstName"
							onChange={handleChange}
							value={data.firstName}
							required
							className={styles.input}
						/>
						<label htmlFor="lastName">Last Name</label>
						<input
						id="lastName"
							type="text"
							placeholder="Last Name"
							name="lastName"
							onChange={handleChange}
							value={data.lastName}
							required
							className={styles.input}
						/>
						<label htmlFor="email">Email</label>
						<input
						id="email"
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>
						<label htmlFor="password">Password</label>
						<input
						id="password"
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
							Sign Up
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Signup;