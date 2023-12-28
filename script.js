document.addEventListener("DOMContentLoaded", function() {
    const wheel = document.getElementById("wheel");
    const wheelInner = document.getElementById("wheel-inner");
    const movieListInput = document.getElementById("movieListInput");
    const continueButton = document.getElementById("continueButton");
    const viewListButton = document.getElementById("viewListButton");
    const result = document.getElementById("result");
    const movieList = document.getElementById("movieList");

    let movieTitles = []; // Store movie titles entered by the user

    continueButton.addEventListener("click", function() {
        const movieListText = movieListInput.value.trim();
        if (!movieListText) {
            result.textContent = "Please paste a list of movie titles.";
            return;
        }

        // Split the pasted text on line breaks and filter out empty titles
        movieTitles = movieListText.split('\n').map(title => title.trim()).filter(title => title !== '');

        if (movieTitles.length === 0) {
            result.textContent = "No valid movie titles found.";
        } else {
            result.textContent = "Movie titles are ready. Click the spinning wheel to select a movie.";
            wheel.style.visibility = "visible"; // Show the spinning wheel
            viewListButton.disabled = false; // Enable the "View Movie List" button
        }
    });

    viewListButton.addEventListener("click", function() {
        if (movieTitles.length === 0) {
            result.textContent = "The movie list is empty.";
        } else {
            // Display the movie list
            movieList.innerHTML = "";
            movieTitles.forEach(movie => {
                const listItem = document.createElement("li");
                listItem.textContent = movie;
                movieList.appendChild(listItem);
            });
            movieList.style.display = "block"; // Show the list
            result.textContent = "Movie list displayed below.";
        }
    });

    wheel.addEventListener("click", function() {
        if (movieTitles.length === 0) {
            result.textContent = "Please paste a list of movie titles and click 'Continue' first.";
            return;
        }

        const randomIndex = Math.floor(Math.random() * movieTitles.length);
        const selectedMovie = movieTitles[randomIndex];

        // Stop the wheel animation and display the chosen movie
        wheel.style.animation = "none";
        wheelInner.style.transform = `rotate(${randomIndex * (360 / movieTitles.length)}deg)`;
        setTimeout(() => {
            result.textContent = `The chosen movie is: ${selectedMovie}`;
        }, 1000); // Adjust the duration as needed

        // Remove the selected movie from the list
        movieTitles.splice(randomIndex, 1);
        if (movieTitles.length === 0) {
            wheel.style.visibility = "hidden"; // Hide the spinning wheel when all movies are selected
            viewListButton.disabled = true; // Disable the "View Movie List" button
        }
    });
});
