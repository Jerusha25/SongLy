
const songs = [
  { id: 1, title: "Run", file: "1.html" },
  { id: 2, title: "Alive", file: "2.html" },
  { id: 3, title: "Where we Belong", file: "3.html" },
  { id: 4, title: "Running", file: "4.html" },
  { id: 5, title: "Mighty to Save", file: "5.html" },
  { id: 6, title: "Amazing Grace", file: "6.html" },
];

const list = document.getElementById("song-list"); 
const search = document.getElementById("search");
const sortToggle = document.getElementById("sort-toggle");

let sortBy = "number";

function showSongs(filter = "", letter = "") {
  const noResults = document.getElementById("no-results");
  list.innerHTML = "";

  const filteredSongs = songs.filter(song => {
    const titleLower = song.title.toLowerCase();
    const matchesSearch = filter
      ? titleLower.includes(filter.toLowerCase()) || String(song.id) === filter
      : true;
    const matchesLetter = letter
      ? titleLower.startsWith(letter.toLowerCase())
      : true;
    return matchesSearch && matchesLetter;
  });

  if (filteredSongs.length === 0) {
    noResults.style.display = "block";
  } else {
    noResults.style.display = "none";

    filteredSongs
      .sort((a, b) => {
        return sortBy === "title"
          ? a.title.localeCompare(b.title)
          : a.id - b.id;
      })
      .forEach(song => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="${song.file}">${song.id}. ${song.title}</a>`;
        list.appendChild(li);
      });
  }
}

search.addEventListener("input", e => {
  showSongs(e.target.value);
});

sortToggle.addEventListener("click", () => {
  sortBy = sortBy === "number" ? "title" : "number";
  sortToggle.textContent =
    sortBy === "number" ? "Sort by Title" : "Sort by Number";
  showSongs(search.value);
});

showSongs();
