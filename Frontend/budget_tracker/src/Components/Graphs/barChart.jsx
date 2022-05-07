import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import UserService from '../../services/user.service';

const BarChart = () => {
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
			},
			{
				name: 'Total Expenditure',
				data: data.TotalExpenditure,
			},
		],
	};

	return (
		<div>
			<HighchartsReact highcharts={Highcharts} options={options} />
		</div>
	);
};

export default BarChart;
