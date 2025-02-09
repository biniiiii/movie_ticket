const movieDetails = {
    0: { name: "Men in Black", price: 220 },
    1: { name: "Palm Springs", price: 200 },
    2: { name: "Se7en", price: 250 }
};

function selectMovie(movieIndex) {
    if (movieDetails.hasOwnProperty(movieIndex)) { // Check if the movieIndex exists in movieDetails
        localStorage.setItem("selectedMovieIndex", movieIndex);
        localStorage.setItem("selectedMovieName", movieDetails[movieIndex].name);
        localStorage.setItem("selectedMoviePrice", movieDetails[movieIndex].price);

        // Redirect to booking page
        window.location.href = "booking.html";
    } else {
        alert("Invalid movie selection. Please try again."); // Error message if movieIndex doesn't exist
    }
}
