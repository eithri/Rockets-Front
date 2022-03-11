import React from "react";
import "./GeneralStatisticChart.css";
import { Bar } from 'react-chartjs-2';

export default function GeneralStatisticChart(props) {

  //destructuring of variables
  const { averageAll, averageMale, averageFemale, best, bestMale, bestFemale,
    worst, worstMale, worstFemale, quantity, quantityMale, quantityFemale,
    underAverage, underAverageMale, underAverageFemale, overAverage, overAverageMale, overAverageFemale } = props.data;

  //type of chart
  const options = {
    responsive: true,
    legend: {
      display: false
    },
    type: "bar"
  };

  //definition of data from table
  const data = {
    labels: ['Male', 'Female', 'General'],
    datasets: [
      /*  {
        label: 'Best',
        data: [bestMale, bestFemale, best],
         backgroundColor: [
           'rgb(54, 162, 235)',
           'rgb(255, 99, 132)',
           'rgb(75, 192, 192)',
          ]
        },*/
      {
        label: 'Over average',
        data: [overAverageMale, overAverageFemale, overAverage],
        backgroundColor: [
          'rgb(54, 162, 235)',
          'rgb(255, 99, 132)',
          'rgb(75, 192, 192)',
        ]
      },
      {
        label: 'Total',
        data: [quantityMale, quantity, quantityFemale],
        backgroundColor: [
          'rgb(54, 162, 235)',
          'rgb(255, 99, 132)',
          'rgb(75, 192, 192)',
        ]
      },
      /* {
        label: 'Average',
        data: [averageMale, averageFemale, averageAll],
        backgroundColor: [
          'rgb(54, 162, 235)',
          'rgb(255, 99, 132)',
          'rgb(75, 192, 192)',
        ]
      }, */
      {
        label: 'Under average',
        data: [underAverageMale, underAverageFemale, underAverage],
        backgroundColor: [
          'rgb(54, 162, 235)',
          'rgb(255, 99, 132)',
          'rgb(75, 192, 192)',
        ]
      },
      /*       {
              label: 'Worst',
              data: [worstMale, worstFemale, worst],
              backgroundColor: [
                'rgb(54, 162, 235)',
                'rgb(255, 99, 132)',
                'rgb(75, 192, 192)',
              ]
            }, */
    ],
  };

  return (
    <div className=" flex items-center w-1/2 pr-2">
      <Bar
        data={data}
        width={null}
        height={null}
        options={options}
      />
    </div>
  );
}