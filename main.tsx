import { dataType, results } from "./types/types";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
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
function zrobcos() {
    /*
        let ctx = document.getElementById('myChart') as HTMLCanvasElement
        const data = {
            labels: ['20-30', '30-40'],
            datasets: [{
                label: 'My First dataset',
                data: [0, 10],
                //   backgroundColor: 'rgb(255, 99, 132)',
                //  borderColor: 'rgb(255, 99, 132)',
            }]
        };
        const config: any = {
            type: 'bar',
            data,
            options: {}
        };
        //let ctx = canvas.getContext('2d')
        new Chart(ctx, config);
        */
    var canva = document.getElementById("myChart") as HTMLCanvasElement
    var ctx = canva.getContext('2d')
    var data: any = {
        labels: ["Group 1", "Group 2", "Group 3"],
        datasets: [{
            label: "Group",
            data: [12, 19, 3]
        }],
        arguments: {}
    };

    var myNewChart = new Chart(ctx!, data);
}



function tabela(data: dataType) {
    const arrmax = data.results.map((user) => {
        return (user.dob.age)
    })
    const max = Math.max(...arrmax)
    let newArr = data.results.filter((user) => {
        return user.dob.age === max
    })
    let i = 1
    if (newArr.length < 10) {
        while (newArr.length < 10) {
            let newarr2 = data.results.filter((user) => {
                return user.dob.age === max - i
            })
            newArr = newArr.concat(newarr2)
            i = i + 1
        }
    }
    let finalArr = newArr.slice(0, 10)
    return finalArr
}

function lista(data: results) {
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
    document.getElementById("loading")!.innerHTML = `<img class="gif" src="./styles/spinner.gif"/>`
    let data: any
    try {
        data = await getData()
        const starzy = tabela(data)
        lista(starzy)
        zrobcos()


    }
    catch (error) {
        console.log(error)
    }
    document.getElementById("loading")!.innerHTML = ""

}
