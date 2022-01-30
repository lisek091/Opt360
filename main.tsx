import { dataType, results } from "./types/types";
import { Chart, registerables, ScatterDataPoint } from 'chart.js';
Chart.register(...registerables);
//Pobieranie danych z API
function getData() {
    return new Promise((resolve) => {
        const params = new URLSearchParams({
            nat: "FR",
            gender: "male",
            results: "1000"
        })
        $.ajax({
            url: `https://randomuser.me/api/?${params}`,
            dataType: 'json',
            success: function (data: dataType) {
                resolve(data)
            }
        });


    })
}
//Rysowanie wykresu
function zrobcos(data: dataType) {
    let ageArray = [0, 0, 0, 0, 0, 0]
    data.results.map((user) => {
        if (user.dob.age >= 20 && user.dob.age < 30) { ageArray[0] = ageArray[0] + 1 }
        if (user.dob.age >= 30 && user.dob.age < 40) { ageArray[1] = ageArray[1] + 1 }
        if (user.dob.age >= 40 && user.dob.age < 50) { ageArray[2] = ageArray[2] + 1 }
        if (user.dob.age >= 50 && user.dob.age < 60) { ageArray[3] = ageArray[3] + 1 }
        if (user.dob.age >= 60 && user.dob.age < 70) { ageArray[4] = ageArray[4] + 1 }
        if (user.dob.age >= 70 && user.dob.age < 80) { ageArray[5] = ageArray[5] + 1 }
    })

    var ctx = document.getElementById("myChart").getContext('2d')
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['20-29', '30-39', '40-49', '50-59', '60-69', '70-79'],
            datasets: [{
                label: 'Osób w wieku',
                data: [ageArray[0], ageArray[1], ageArray[2], ageArray[3], ageArray[4], ageArray[5]],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(255, 159, 64, 0.5)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 400
                }
            }
        }
    });



}

//Wybieranie 10 najstarszych osob
function tabela(data: dataType) {
    //najpierw wybieram tabele wiekow i sprawdzam najstarszy wiek
    const arrmax = data.results.map((user) => {
        return (user.dob.age)
    })
    const max = Math.max(...arrmax)
    // wybieram wszystkich ktorzy sa w tym wieku
    let newArr = data.results.filter((user) => {
        return user.dob.age === max
    })
    let i = 1
    // jesli jest mniej niz 10 to zmniejszam wiek o 1 i biore wszystkich kolejnych. Jesli nadal nie ma 10 to zmniejsza dalej o 1
    // Uwzglednia to przypadek skrajny gdzie api poda samych 20 latkow 
    if (newArr.length < 10) {
        while (newArr.length < 10) {
            let newarr2 = data.results.filter((user) => {
                return user.dob.age === max - i
            })
            newArr = newArr.concat(newarr2)
            i = i + 1
        }
    }
    //zwraca 10 najstarszych osob
    let finalArr = newArr.slice(0, 10)
    return finalArr
}

function lista(data: results) {
    //zwracanie tabeli osob jako string do html
    let dataRows: string = ""
    data.map((user) => {
        dataRows = dataRows + `
        <tr>
        <th>${user.name.first}</th>
        <th>${user.name.last}</th>
        <th>${user.dob.age}</th>
        <th>${user.location.city}</th>
        <th>${user.location.street.name}</th>
        <th>${user.phone}</th>
        <th>${user.email}</th>
        </tr >
        `
    })

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
    `
    let combinedTable = firstRow + dataRows!
    document.getElementById('mainTab')!.innerHTML = combinedTable
}
async function wypisanie() {
    // ladowanie 
    document.getElementById("loading")!.innerHTML = `<img class="gif" src="./styles/spinner.gif"/>`
    let data: any
    try {
        data = await getData()
        const starzy = tabela(data)
        lista(starzy)
        zrobcos(data)
    }
    catch (error) {
        console.log(error)
    }

    document.getElementById("loading")!.innerHTML = ""

}
