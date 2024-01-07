document.addEventListener("DOMContentLoaded", function() {
    const movieListInput = document.getElementById("movieListInput");
    const selectMovieButton = document.getElementById("selectMovieButton");
    const viewListButton = document.getElementById("viewListButton");
    const result = document.getElementById("result");
    const movieList = document.getElementById("movieList");

    let originalMovieTitles = []; // Store the original movie titles entered by the user

    selectMovieButton.addEventListener("click", function() {
        const movieListText = movieListInput.value.trim();
        if (!movieListText) {
            result.textContent = "Please paste a list of movie titles.";
            return;
        }

        // Split the pasted text on line breaks and filter out empty titles
        originalMovieTitles = movieListText.split('\n').map(title => title.trim()).filter(title => title !== '');

        if (originalMovieTitles.length === 0) {
            result.textContent = "No valid movie titles found.";
        } else {
            // Display a randomly selected movie from the original list
            const randomIndex = Math.floor(Math.random() * originalMovieTitles.length);
            const selectedMovie = originalMovieTitles[randomIndex];
            result.textContent = `The chosen movie is: ${selectedMovie}`;

            // Remove the selected movie from the original list
            originalMovieTitles.splice(randomIndex, 1);

            if (originalMovieTitles.length === 0) {
                selectMovieButton.disabled = true; // Disable the "Select a Movie" button when all movies are selected
                viewListButton.disabled = false; // Enable the "View Movie List" button
            }
        }
    });

    viewListButton.addEventListener("click", function() {
        if (originalMovieTitles.length === 0) {
            result.textContent = "The movie list is empty.";
        } else {
            // Display the original movie list entered by the user
            movieList.innerHTML = "";
            originalMovieTitles.forEach(movie => {
                const listItem = document.createElement("li");
                listItem.textContent = movie;
                movieList.appendChild(listItem);
            });
            movieList.style.display = "block"; // Show the list
            result.textContent = "Original movie list displayed below.";
        }
    });
});
