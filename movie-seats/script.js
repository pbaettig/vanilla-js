const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
let ticketPrice = +movieSelect.value; // or parseInt()

function storeSelectedSeats(selectedSeats) {
  const allSeats = [...seats];
  const selectedSeatsIndex = [...selectedSeats].map(s => allSeats.indexOf(s));
  localStorage.setItem('selectedSeats', JSON.stringify(selectedSeatsIndex));
}

function storeMovieDetails(selectedOption) {
  localStorage.setItem('selectedMovieIndex', selectedOption.index);
  localStorage.setItem('selectedMoviePrice', +selectedOption.value);
}

function loadSelectedSeats() {
  const selectedSeatsIndex = JSON.parse(localStorage.getItem('selectedSeats'));
  if (selectedSeatsIndex === null || selectedSeatsIndex.length == 0) {
    return;
  }

  [...selectedSeatsIndex].map(si => {
    seats[si].classList.add('selected');
  });
}

function loadMovieDetails() {
  mi = localStorage.getItem('selectedMovieIndex');
  if (mi === null) {
    return;
  }
  movieSelect.selectedIndex = mi;
  mp = localStorage.getItem('selectedMoviePrice');
}

function updateTotals(selectedSeats) {
  count.innerText = selectedSeats.length;
  total.innerText = ticketPrice * selectedSeats.length;
}

function getSelectedSeats() {
  return document.querySelectorAll('.row .seat.selected');
}

// Load data from local storage
loadMovieDetails();
loadSelectedSeats();
updateTotals(getSelectedSeats());

// Movie Selection Change listener
movieSelect.addEventListener('change', e => {
  ticketPrice = +movieSelect.value;
  updateTotals(getSelectedSeats());
  storeMovieDetails(e.target.selectedOptions[0]);
});

// Seat selection event listener
container.addEventListener('click', e => {
  if (!e.target.classList.contains('seat')) {
    return;
  }
  if (e.target.classList.contains('occupied')) {
    return;
  }

  e.target.classList.toggle('selected');

  const selectedSeats = getSelectedSeats();
  storeSelectedSeats(selectedSeats);
  updateTotals(selectedSeats);
});
