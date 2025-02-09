const container = document.querySelector(".container");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
const confirmButton = document.getElementById("confirmBooking");
const viewTicketButton = document.getElementById("viewTicket");

let selectedSeatsStack = [];
let confirmedSeatsQueue = [];
let ticketPrice = +movieSelect.value;

function showModal(message, showResultButton = false) {
  document.getElementById("modalMessage").innerText = message;
  document.getElementById("confirmationModal").style.display = "block";

  if (showResultButton) {
    document.getElementById("viewResultButton").style.display = "inline-block";
  } else {
    document.getElementById("viewResultButton").style.display = "none";
  }
}

function closeModal() {
  document.getElementById("confirmationModal").style.display = "none";
}

function loadSoldSeats() {
  const soldIndices = JSON.parse(localStorage.getItem("soldSeats")) || [];
  const allSeats = document.querySelectorAll(".row .seat");
  soldIndices.forEach(index => allSeats[index]?.classList.add("sold"));
}

function updateSelectedCount() {
  count.innerText = selectedSeatsStack.length;
  total.innerText = selectedSeatsStack.length * ticketPrice;
}

container.addEventListener("click", (e) => {
  if (e.target.classList.contains("seat") && !e.target.classList.contains("sold")) {
    if (e.target.classList.contains("selected")) {
      selectedSeatsStack.pop();
      e.target.classList.remove("selected");
    } else {
      selectedSeatsStack.push(e.target);
      e.target.classList.add("selected");
    }
    updateSelectedCount();
  }
});

confirmButton.addEventListener("click", () => {
  if (selectedSeatsStack.length === 0) {
    showModal("No seats selected!");
    return;
  }

  let confirmBooking = confirm(`Confirm booking for ${selectedSeatsStack.length} seat(s)?`);
  if (!confirmBooking) return;

  let soldIndices = JSON.parse(localStorage.getItem("soldSeats")) || [];
  const allSeats = document.querySelectorAll(".row .seat");

  while (selectedSeatsStack.length > 0) {
    let seat = selectedSeatsStack.pop();
    seat.classList.add("sold");
    seat.classList.remove("selected");

    let seatIndex = [...allSeats].indexOf(seat);
    soldIndices.push(seatIndex);
    confirmedSeatsQueue.push(seatIndex);
  }

  localStorage.setItem("soldSeats", JSON.stringify(soldIndices));
  localStorage.setItem("bookingData", JSON.stringify({
    movieName: movieSelect.options[movieSelect.selectedIndex].text,
    seatCount: confirmedSeatsQueue.length,
    totalPrice: confirmedSeatsQueue.length * ticketPrice
  }));

  updateSelectedCount();
  showModal("Seats booked successfully!", true);
});

function showConfirmedSeats() {
  const confirmedSeatsContainer = document.getElementById("confirmedSeatsContainer");
  const confirmedSeatsList = document.getElementById("confirmedSeatsList");

  confirmedSeatsList.innerHTML = "";
  confirmedSeatsQueue.forEach(seatIndex => {
    const li = document.createElement("li");
    li.textContent = `Seat Number: ${seatIndex + 1}`;
    confirmedSeatsList.appendChild(li);
  });

  confirmedSeatsContainer.style.display = "block";
  closeModal();
}

function hideConfirmedSeats() {
  document.getElementById("confirmedSeatsContainer").style.display = "none";
}

viewTicketButton.addEventListener("click", () => {
  window.location.href = "ticket.html";
});

document.addEventListener("DOMContentLoaded", () => {
  loadSoldSeats();
  updateSelectedCount();
});

movieSelect.addEventListener("change", () => {
  ticketPrice = +movieSelect.value;
  updateSelectedCount();
});