// Get references
const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

let ticketPrice = +movieSelect.value;

// Movie selection change
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  updateSelectedCount();
});

// Seat click listener (only affect non-sold seats)
container.addEventListener("click", (e) => {
  if (e.target.classList.contains("seat") && !e.target.classList.contains("sold")) {
    e.target.classList.toggle("selected");
    updateSelectedCount();
  }
});

// Update selected count and total
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  count.innerText = selectedSeats.length;
  total.innerText = selectedSeats.length * ticketPrice;
}

// Finalize selection (turn selected into sold and save booking data)
function finalizeSelection() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const allSeats = document.querySelectorAll(".row .seat");
  const soldIndices = JSON.parse(localStorage.getItem("soldSeats")) || [];

  selectedSeats.forEach((seat) => {
    seat.classList.add("sold");
    seat.classList.remove("selected");
    const index = Array.from(allSeats).indexOf(seat);
    if (!soldIndices.includes(index)) {
      soldIndices.push(index);
    }
  });

  localStorage.setItem("soldSeats", JSON.stringify(soldIndices));

  const bookingData = {
    movieName: movieSelect.options[movieSelect.selectedIndex].text,
    seatCount: selectedSeats.length,
    totalPrice: selectedSeats.length * ticketPrice
  };
  localStorage.setItem("bookingData", JSON.stringify(bookingData));

  updateSelectedCount();
  alert("Seats booked successfully!");
}

// Undo last selection
function undoLastSelection() {
  const lastSelectedSeat = document.querySelector(".row .seat.selected:last-child");
  if (lastSelectedSeat) {
    lastSelectedSeat.classList.remove("selected");
    updateSelectedCount();
  }
}

// Attach event listeners
document.querySelector(".undo").addEventListener("click", undoLastSelection);
document.getElementById("confirmBooking").addEventListener("click", () => {
  finalizeSelection();
  window.location.href = "ticket.html"; // Redirect to ticket page
});

// Load sold seats on page load
function loadSoldSeats() {
  const soldIndices = JSON.parse(localStorage.getItem("soldSeats")) || [];
  const allSeats = document.querySelectorAll(".row .seat");
  soldIndices.forEach(index => {
    if (allSeats[index]) {
      allSeats[index].classList.add("sold");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadSoldSeats();
  updateSelectedCount();
});
