import { dataType } from "./types/types";


function wypisanie() {
    getData()
}

function getData() {

    $.ajax({
        url: 'https://randomuser.me/api/',
        dataType: 'json',
        success: function (data: dataType) {
            console.log(data);
        },
        error: function (error) {
            console.log(error)
        }
    });
}
