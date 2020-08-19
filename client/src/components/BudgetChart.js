import React from 'react';
import { Chart } from 'react-google-charts';

const BudgetChart = () => {

    return (
<Chart
  width={'500px'}
  height={'300px'}
  chartType="PieChart"
  loader={<div>Loading Chart</div>}
  data={[
    ['Task', 'Hours per Day'],
    ['Work', 100.00],
    ['Eat', 34.56],
    ['Commute', 2.34],
    ['Watch TV', 98],
    ['Sleep', 7],
  ]}
  options={{
    title: 'Budget division',
  }}
  rootProps={{ 'data-testid': '1' }}
/>

    )
}

export default BudgetChart;
