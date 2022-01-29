"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getData() {
    return new Promise((resolve) => {
        const params = new URLSearchParams({
            nat: "FR",
            gender: "male",
            results: "1000"
        });
        $.ajax({
            url: `https://randomuser.me/api/?${params}`,
            dataType: 'json',
            success: function (data) {
                resolve(data);
            }
        });
    });
}
async function wypisanie() {
    document.getElementById("loading").innerHTML = `<img class="gif" src="./styles/spinner.gif"/>`;
    let data;
    try {
        data = await getData();
        const starzy = tabela(data);
        lista(starzy);
    }
    catch (error) {
        console.log(error);
    }
    document.getElementById("loading").innerHTML = "";
}
function tabela(data) {
    const arrmax = data.results.map((user) => {
        return (user.dob.age);
    });
    const max = Math.max(...arrmax);
    let newArr = data.results.filter((user) => {
        return user.dob.age === max;
    });
    let i = 1;
    if (newArr.length < 10) {
        while (newArr.length < 10) {
            let newarr2 = data.results.filter((user) => {
                return user.dob.age === max - i;
            });
            newArr = newArr.concat(newarr2);
            i = i + 1;
        }
    }
    let finalArr = newArr.slice(0, 10);
    console.log(finalArr);
    return finalArr;
}
function lista(data) {
    let dataRows;
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
exports.default = wypisanie;
