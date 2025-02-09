// Get references
const container = document.querySelector(".container");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
const confirmButton = document.getElementById("confirmBooking");
const viewTicketButton = document.getElementById("viewTicket");

let ticketPrice = +movieSelect.value;

// Load sold seats on page load
function loadSoldSeats() {
  const soldIndices = JSON.parse(localStorage.getItem("soldSeats")) || [];
  const allSeats = document.querySelectorAll(".row .seat");
  soldIndices.forEach(index => allSeats[index]?.classList.add("sold"));
}

function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  count.innerText = selectedSeats.length;
  total.innerText = selectedSeats.length * ticketPrice;
}

// Toggle seat selection
container.addEventListener("click", (e) => {
  if (e.target.classList.contains("seat") && !e.target.classList.contains("sold")) {
    e.target.classList.toggle("selected");
    updateSelectedCount();
  }
});

// Confirm Booking
confirmButton.addEventListener("click", () => {
  if (confirm("Confirm your booking?")) {
    const selectedSeats = document.querySelectorAll(".row .seat.selected");
    const allSeats = document.querySelectorAll(".row .seat");
    let soldIndices = JSON.parse(localStorage.getItem("soldSeats")) || [];

    selectedSeats.forEach(seat => {
      seat.classList.add("sold");
      seat.classList.remove("selected");
      soldIndices.push([...allSeats].indexOf(seat));
    });

    localStorage.setItem("soldSeats", JSON.stringify(soldIndices));
    localStorage.setItem("bookingData", JSON.stringify({
      movieName: movieSelect.options[movieSelect.selectedIndex].text,
      seatCount: selectedSeats.length,
      totalPrice: selectedSeats.length * ticketPrice
    }));

    updateSelectedCount();
    alert("Seats booked successfully!");
  }
});

// View Ticket
viewTicketButton.addEventListener("click", () => {
  window.location.href = "ticket.html"; // Redirect to ticket page
});

document.addEventListener("DOMContentLoaded", () => {
  loadSoldSeats();
  updateSelectedCount();
});