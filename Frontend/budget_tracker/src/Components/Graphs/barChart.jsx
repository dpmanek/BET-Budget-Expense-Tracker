import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import UserService from '../../services/user.service';
import AuthService from '../../services/auth.service';
import './Graph.css';

const BarChart = () => {
	const [accessToken, setAccessToken] = useState('');

	useEffect(() => {
		var data = AuthService.getCurrentUser();
		if (data) {
			setAccessToken(data.accessToken);
		} else {
			setAccessToken(undefined);
		}
	});
	const [data, setdata] = useState([]);
	useEffect(() => {
		UserService.getmonthlyComparision().then((response) => {
			if (response) {
				// console.log('@@@@@@@@@@@@@@@' + JSON.stringify(response));
				setdata(response.data);
			} else {
				console.log('No response', '=============');
			}
		});
	}, []);
	const options = {
		chart: {
			type: 'column',
		},
		credits: {
			enabled: false,
		},
		title: {
			text: 'Monthly Expense Comparision',
		},
		xAxis: {
			categories: [
				'Jan',
				'Feb',
				'Mar',
				'Apr',
				'May',
				'Jun',
				'Jul',
				'Aug',
				'Sep',
				'Oct',
				'Nov',
				'Dec',
			],
			crosshair: true,
		},
		yAxis: {
			min: 0,
			title: {
				text: 'Expense',
			},
		},
		tooltip: {
			headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
			pointFormat:
				'<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
				'<td style="padding:0"><b>{point.y:.1f}$ </b></td></tr>',
			footerFormat: '</table>',
			shared: true,
			useHTML: true,
		},
		plotOptions: {
			column: {
				pointPadding: 0.2,
				borderWidth: 0,
			},
		},
		series: [
			{
				name: 'Total Income',
				data: data.TotalIncome,
				color: '#007dbc',
			},
			{
				name: 'Total Expenditure',
				data: data.TotalExpenditure,
				color: '#434348',
			},
		],
	};

	return (
		<div>
			{accessToken !== undefined ? (
				<React.Fragment>
					<div>
						<HighchartsReact highcharts={Highcharts} options={options} />
					</div>
				</React.Fragment>
			) : (
				<React.Fragment>
					<div className="card posBP">
						<h1>Restricted area</h1>
						<h2>
							<a href="/login" className="a12">Sign In</a> to Access DashBoard
						</h2>
					</div>
				</React.Fragment>
			)}
		</div>
	);
};

export default BarChart;
