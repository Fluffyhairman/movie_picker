document.addEventListener("DOMContentLoaded", function() {
    const wheel = document.getElementById("wheel");
    const wheelInner = document.getElementById("wheel-inner");
    const movieListInput = document.getElementById("movieListInput");
    const result = document.getElementById("result");

    wheel.addEventListener("click", function() {
        const movieListText = movieListInput.value.trim();
        if (!movieListText) {
            result.textContent = "Please paste a list of movie titles.";
            return;
        }

        const movieTitles = movieListText.split('\n').filter(title => title.trim() !== '');

        if (movieTitles.length === 0) {
            result.textContent = "No valid movie titles found.";
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
    });
});
