// import React, { Component } from 'react';
// import Highcharts from 'highcharts';
// import HighchartsReact from 'highcharts-react-official';
// import UserService from '../../services/user.service';
// export default class Pie extends Component {
// 	state = {
// 		data: [],
// 	};

// 	componentDidMount() {
// 		UserService.getPieChartData().then((response) => {
// 			if (response) {
// 				this.setState({ data: response.data });
// 				//	setdata(response.data);
// 			} else {
// 				console.log('No response', '=============');
// 			}
// 		});
// 	}
// 	componentDidUpdate() {
// 		UserService.getPieChartData().then((response) => {
// 			if (response) {
// 				this.setState({ data: response.data });
// 			} else {
// 				console.log('No response', '=============');
// 			}
// 		});
// 	}
// 	render() {
// 		const options = {
// 			chart: {
// 				plotBackgroundColor: null,
// 				plotBorderWidth: null,
// 				plotShadow: false,
// 				type: 'pie',
// 			},
// 			title: {
// 				text: 'Expense Structure',
// 			},
// 			tooltip: {
// 				pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
// 			},
// 			accessibility: {
// 				point: {
// 					valueSuffix: '%',
// 				},
// 			},
// 			plotOptions: {
// 				pie: {
// 					allowPointSelect: true,
// 					cursor: 'pointer',
// 					dataLabels: {
// 						enabled: true,
// 						format: '<b>{point.name}</b>: {point.percentage:.1f} %',
// 					},
// 				},
// 			},
// 			series: [
// 				{
// 					name: 'Expense',
// 					colorByPoint: true,
// 					data: this.state.data,
// 				},
// 			],
// 		};

// 		return (
// 			<>
// 				<div>
// 					<HighchartsReact highcharts={Highcharts} options={options} />
// 				</div>
// 			</>
// 		);
// 	}
// }

import React, { useState, useEffect } from 'react';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import UserService from '../../services/user.service';

const Pie = ({ reloader }) => {
	const [data, setdata] = useState([]);
	useEffect(() => {
		UserService.getPieChartData().then((response) => {
			if (response) {
				// console.log('@@@@@@@@@@@@@@@' + JSON.stringify(response));
				setdata(response.data);
			} else {
				console.log('No response', '=============');
			}
		});
	}, [reloader]);

	const options = {
		chart: {
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false,
			type: 'pie',
		},
		credits: {
			enabled: false,
		},
		title: {
			text: 'Expense Structure',
		},
		tooltip: {
			pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
		},
		accessibility: {
			point: {
				valueSuffix: '%',
			},
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				dataLabels: {
					enabled: true,
					format: '<b>{point.name}</b>: {point.percentage:.1f} %',
				},
			},
		},
		series: [
			{
				name: 'Expense',
				colorByPoint: true,
				data: data,
			},
		],
	};

	return (
		<div>
			<HighchartsReact highcharts={Highcharts} options={options} />
		</div>
	);
};

export default Pie;
