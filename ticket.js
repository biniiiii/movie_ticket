function loadTicketDetails() {
    const bookingData = JSON.parse(localStorage.getItem("bookingData"));
    if (bookingData) {
      document.getElementById("ticket-movie").innerText = bookingData.movieName;
      document.getElementById("ticket-seatCount").innerText = bookingData.seatCount + " seat(s)";
      document.getElementById("ticket-totalPrice").innerText = bookingData.totalPrice;
    } else {
      document.querySelector(".ticket").innerHTML = "<p>No booking data found.</p>";
    }
  }

  function goHome() {
    // Do not clear sold seats data so booked seats remain white.
    // If you want to remove bookingData only:
    localStorage.removeItem("bookingData");
    window.location.href = "index.html";
  }

  loadTicketDetails();