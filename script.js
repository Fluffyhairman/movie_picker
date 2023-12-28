document.addEventListener("DOMContentLoaded", function() {
    let movies = [];

    const selectButton = document.getElementById("selectButton");
    const addButton = document.getElementById("addButton");
    const overwriteButton = document.getElementById("overwriteButton");
    const viewAllButton = document.getElementById("viewAllButton");
    const result = document.getElementById("result");
    const movieList = document.getElementById("movieList");

    const loadMovies = async () => {
        try {
            const response = await fetch("movie.txt");
            
            if (!response.ok) {
                throw new Error("Failed to load movie data.");
            }

            const data = await response.text();
            movies = data.split("\n").filter(movie => movie.trim() !== "");
            enableButtons();
        } catch (error) {
            console.error(error);
        }
    };

    const enableButtons = () => {
        selectButton.disabled = false;
        addButton.disabled = false;
        overwriteButton.disabled = false;
        viewAllButton.disabled = false;
    };

    const selectRandomMovie = async () => {
        if (movies.length === 0) {
            result.textContent = "Movie data not loaded. Please refresh the page.";
            return;
        }

        const lordOfTheRingsMovies = movies.filter(movie => movie.startsWith("The Lord of the Rings"));

        if (lordOfTheRingsMovies.length > 0) {
            const selectedMovie = lordOfTheRingsMovies[0];
            result.textContent = `The chosen movie is: ${selectedMovie}`;
            movies = movies.filter(movie => movie !== selectedMovie);
            await updateMovieFile();
        } else {
            const randomIndex = Math.floor(Math.random() * movies.length);
            const selectedMovie = movies[randomIndex];
            result.textContent = `The chosen movie is: ${selectedMovie}`;
            movies.splice(randomIndex, 1);
            await updateMovieFile();
        }
    };

    const updateMovieFile = async () => {
        try {
            const updatedData = movies.join("\n");
            await fetch("movie.txt", {
                method: "PUT",
                body: updatedData
            });
        } catch (error) {
            console.error("Failed to update movie data in the file.", error);
        }
    };

    const addMovie = () => {
        const newMovie = prompt("Enter the name of the movie:");
        if (newMovie) {
            movies.push(newMovie);
            updateMovieFile();
        }
    };

    const overwriteMovies = () => {
        const newMovieData = prompt("Enter the new batch of movies (separated by line breaks):");
        if (newMovieData) {
            movies = newMovieData.split("\n").filter(movie => movie.trim() !== "");
            updateMovieFile();
        }
    };

    const viewAllMovies = () => {
        movieList.innerHTML = "";
        movies.forEach(movie => {
            const listItem = document.createElement("li");
            listItem.textContent = movie;
            movieList.appendChild(listItem);
        });
    };

    loadMovies();

    selectButton.addEventListener("click", selectRandomMovie);
    addButton.addEventListener("click", addMovie);
    overwriteButton.addEventListener("click", overwriteMovies);
    viewAllButton.addEventListener("click", viewAllMovies);
});
