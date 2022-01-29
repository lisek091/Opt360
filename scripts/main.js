'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const chart_js_1 = require('chart.js');
chart_js_1.Chart.register(...chart_js_1.registerables);
function getData() {
  return new Promise(resolve => {
    const params = new URLSearchParams({
      nat: 'FR',
      gender: 'male',
      results: '1000',
    });
    $.ajax({
      url: `https://randomuser.me/api/?${params}`,
      dataType: 'json',
      success: function (data) {
        resolve(data);
      },
    });
  });
}
function zrobcos(data) {
  let ageArray = [0, 0, 0, 0, 0, 0];
  data.results.map(user => {
    if (user.dob.age >= 20 && user.dob.age < 30) {
      ageArray[0] = ageArray[0] + 1;
    }
    if (user.dob.age >= 30 && user.dob.age < 40) {
      ageArray[1] = ageArray[1] + 1;
    }
    if (user.dob.age >= 40 && user.dob.age < 50) {
      ageArray[2] = ageArray[2] + 1;
    }
    if (user.dob.age >= 50 && user.dob.age < 60) {
      ageArray[3] = ageArray[3] + 1;
    }
    if (user.dob.age >= 60 && user.dob.age < 70) {
      ageArray[4] = ageArray[4] + 1;
    }
    if (user.dob.age >= 70 && user.dob.age < 80) {
      ageArray[5] = ageArray[5] + 1;
    }
  });
  var ctx = document.getElementById('myChart').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['20-29', '30-39', '40-49', '50-59', '60-69', '70-79'],
      datasets: [
        {
          label: 'Osób w wieku',
          data: [
            ageArray[0],
            ageArray[1],
            ageArray[2],
            ageArray[3],
            ageArray[4],
            ageArray[5],
          ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          max: 400,
        },
      },
    },
  });
}
function tabela(data) {
  const arrmax = data.results.map(user => {
    return user.dob.age;
  });
  const max = Math.max(...arrmax);
  let newArr = data.results.filter(user => {
    return user.dob.age === max;
  });
  let i = 1;
  if (newArr.length < 10) {
    while (newArr.length < 10) {
      let newarr2 = data.results.filter(user => {
        return user.dob.age === max - i;
      });
      newArr = newArr.concat(newarr2);
      i = i + 1;
    }
  }
  let finalArr = newArr.slice(0, 10);
  return finalArr;
}
function lista(data) {
  let dataRows = '';
  data.map(user => {
    dataRows =
      dataRows +
      `
        <tr>
        <th>${user.name.first}</th>
        <th>${user.name.last}</th>
        <th>${user.dob.age}</th>
        <th>${user.location.city}</th>
        <th>${user.location.street.name}</th>
        <th>${user.phone}</th>
        <th>${user.email}</th>
        </tr >
        `;
  });
  let firstRow = `
    <tr>
    <th>Imie</th>
    <th>Nazwisko</th>
    <th>Wiek</th>
    <th>Miasto</th>
    <th>Ulica</th>
    <th>Telefon</th>
    <th>Emial</th>
    </tr>
    `;
  let combinedTable = firstRow + dataRows;
  document.getElementById('mainTab').innerHTML = combinedTable;
}
async function wypisanie() {
  document.getElementById(
    'loading'
  ).innerHTML = `<img class="gif" src="./styles/spinner.gif"/>`;
  let data;
  try {
    data = await getData();
    const starzy = tabela(data);
    lista(starzy);
    zrobcos(data);
  } catch (error) {
    console.log(error);
  }
  document.getElementById('loading').innerHTML = '';
}
