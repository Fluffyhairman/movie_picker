document.addEventListener("DOMContentLoaded", function() {
    // Initialize an empty array to store movie titles
    let movies = [];

    // Select the HTML elements
    const selectButton = document.getElementById("selectButton");
    const result = document.getElementById("result");

    // Function to fetch and load movie data from a file
    const loadMovies = async () => {
        try {
            // Fetch the movie data file (adjust the path accordingly)
            const response = await fetch("movie.txt");
            
            if (!response.ok) {
                throw new Error("Failed to load movie data.");
            }

            // Read the response as text
            const data = await response.text();

            // Split the data into an array of movies (assuming each line is a movie title)
            movies = data.split("\n").filter(movie => movie.trim() !== "");

            // Enable the button once the data is loaded
            selectButton.disabled = false;
        } catch (error) {
            console.error(error);
        }
    };

    // Function to select a random movie, ensuring "Lord of the Rings" movies are always the first ones
    const selectRandomMovie = async () => {
        if (movies.length === 0) {
            result.textContent = "Movie data not loaded. Please refresh the page.";
            return;
        }

        // Filter out "Lord of the Rings" movies
        const lordOfTheRingsMovies = movies.filter(movie => movie.startsWith("The Lord of the Rings"));

        // Check if there are any "Lord of the Rings" movies
        if (lordOfTheRingsMovies.length > 0) {
            // Choose the first "Lord of the Rings" movie
            const selectedMovie = lordOfTheRingsMovies[0];
            result.textContent = `The chosen movie is: ${selectedMovie}`;
            
            // Remove the selected movie from the movies array
            movies = movies.filter(movie => movie !== selectedMovie);

            // Update the "movie.txt" file with the remaining movies
            try {
                const updatedData = movies.join("\n");
                await fetch("movie.txt", {
                    method: "PUT",
                    body: updatedData
                });
            } catch (error) {
                console.error("Failed to update movie data in the file.", error);
            }
        } else {
            // No "Lord of the Rings" movies found, select a random movie from the entire list
            const randomIndex = Math.floor(Math.random() * movies.length);
            const selectedMovie = movies[randomIndex];
            result.textContent = `The chosen movie is: ${selectedMovie}`;
        }
    };

    // Call the loadMovies function to fetch movie data
    loadMovies();

    // Event listener for the "Select a Movie" button
    selectButton.addEventListener("click", selectRandomMovie);
});
