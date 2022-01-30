//jako że coockie to string zwiekszam jego dlugosc o 1 co odswiezenie strony.
//tlo jest co 5te odswiezenie. Coockie automatycznie znikaja po wylaczeniu karty

function background() {
  document.cookie = document.cookie + 1;
  if (document.cookie.length % 5 == 0) {
    document.getElementById('Kolorowy').style.backgroundColor = 'red';
  } else {
    document.getElementById('Kolorowy').style.backgroundColor = '';
  }
}
