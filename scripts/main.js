"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function wypisanie() {
    getData();
}
function getData() {
    $.ajax({
        url: 'https://randomuser.me/api/',
        dataType: 'json',
        success: function (data) {
            console.log(data);
        },
        error: function (error) {
            console.log(error);
        }
    });
}
