// Get references
const container = document.querySelector(".container");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
const confirmButton = document.getElementById("confirmBooking");
const viewTicketButton = document.getElementById("viewTicket");

// Stack for selected seats (LIFO)
let selectedSeatsStack = [];

// Queue for confirmed bookings (FIFO)
let confirmedSeatsQueue = [];

let ticketPrice = +movieSelect.value;

// Load sold seats on page load
function loadSoldSeats() {
  const soldIndices = JSON.parse(localStorage.getItem("soldSeats")) || [];
  const allSeats = document.querySelectorAll(".row .seat");
  soldIndices.forEach(index => allSeats[index]?.classList.add("sold"));
}

// Update selected seat count
function updateSelectedCount() {
  count.innerText = selectedSeatsStack.length;
  total.innerText = selectedSeatsStack.length * ticketPrice;
}

// Toggle seat selection using Stack (LIFO)
container.addEventListener("click", (e) => {
  if (e.target.classList.contains("seat") && !e.target.classList.contains("sold")) {
    if (e.target.classList.contains("selected")) {
      // Remove last selected seat (Undo using Stack)
      selectedSeatsStack.pop();
      e.target.classList.remove("selected");
    } else {
      // Push newly selected seat onto Stack
      selectedSeatsStack.push(e.target);
      e.target.classList.add("selected");
    }
    updateSelectedCount();
  }
});

// Confirm Booking using Queue (FIFO)
confirmButton.addEventListener("click", () => {
  if (selectedSeatsStack.length === 0) {
    alert("No seats selected!");
    return;
  }

  if (confirm("Confirm your booking?")) {
    let soldIndices = JSON.parse(localStorage.getItem("soldSeats")) || [];
    const allSeats = document.querySelectorAll(".row .seat");

    // Process stack and add to queue
    while (selectedSeatsStack.length > 0) {
      let seat = selectedSeatsStack.pop(); // LIFO (removes last added)
      seat.classList.add("sold");
      seat.classList.remove("selected");

      // Add seat index to sold list
      let seatIndex = [...allSeats].indexOf(seat);
      soldIndices.push(seatIndex);

      // Enqueue to confirmed queue (FIFO)
      confirmedSeatsQueue.push(seatIndex);
    }

    localStorage.setItem("soldSeats", JSON.stringify(soldIndices));
    localStorage.setItem("bookingData", JSON.stringify({
      movieName: movieSelect.options[movieSelect.selectedIndex].text,
      seatCount: confirmedSeatsQueue.length,
      totalPrice: confirmedSeatsQueue.length * ticketPrice
    }));

    updateSelectedCount();
    alert("Seats booked successfully!");
  }
});

// View Ticket
viewTicketButton.addEventListener("click", () => {
  window.location.href = "ticket.html"; // Redirect to ticket page
});

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  loadSoldSeats();
  updateSelectedCount();
});
