// Song Type
type Song = {
    id: number;
    title: string;
    artist: string;
    album: string;
    genre: string;
    duration: string;
    favorite: boolean;
    playCount: number;
};

// Playlist Type
type Playlist = {
    name: string;
    createdDate: Date;
    songs: Song[];
    songCount: number;
};

// 🎵 Same Music Logo for all songs
const musicLogo = "https://cdn-icons-png.flaticon.com/512/727/727218.png";

// More Songs (12+)
let songs: Song[] = [
    { id: 1, title: "Shape of You", artist: "Ed Sheeran", album: "Divide", genre: "Pop", duration: "3:50", favorite: false, playCount: 0 },
    { id: 2, title: "Blinding Lights", artist: "The Weeknd", album: "After Hours", genre: "Pop", duration: "3:20", favorite: false, playCount: 0 },
    { id: 3, title: "Believer", artist: "Imagine Dragons", album: "Evolve", genre: "Rock", duration: "3:24", favorite: false, playCount: 0 },
    { id: 4, title: "Thunder", artist: "Imagine Dragons", album: "Evolve", genre: "Rock", duration: "3:07", favorite: false, playCount: 0 },
    { id: 5, title: "Levitating", artist: "Dua Lipa", album: "Future Nostalgia", genre: "Pop", duration: "3:23", favorite: false, playCount: 0 },
    { id: 6, title: "Perfect", artist: "Ed Sheeran", album: "Divide", genre: "Pop", duration: "4:23", favorite: false, playCount: 0 },
    { id: 7, title: "Radioactive", artist: "Imagine Dragons", album: "Night Visions", genre: "Rock", duration: "3:06", favorite: false, playCount: 0 },
    { id: 8, title: "Counting Stars", artist: "OneRepublic", album: "Native", genre: "Pop", duration: "4:17", favorite: false, playCount: 0 },
    { id: 9, title: "Faded", artist: "Alan Walker", album: "Different World", genre: "Pop", duration: "3:32", favorite: false, playCount: 0 },
    { id: 10, title: "Numb", artist: "Linkin Park", album: "Meteora", genre: "Rock", duration: "3:07", favorite: false, playCount: 0 },
    { id: 11, title: "Closer", artist: "Chainsmokers", album: "Collage", genre: "Pop", duration: "4:04", favorite: false, playCount: 0 },
    { id: 12, title: "Demons", artist: "Imagine Dragons", album: "Night Visions", genre: "Rock", duration: "2:57", favorite: false, playCount: 0 }
];

// Playlist
let playlist: Playlist = {
    name: "My Playlist",
    createdDate: new Date(),
    songs: songs,
    songCount: songs.length
};

// Recently Played
let recentlyPlayed: [Song?, Song?, Song?, Song?, Song?] = [];

// Display Songs
function displaySongs(songList: Song[]) {
    const container = document.getElementById("playlist")!;
    container.innerHTML = "";

    songList.forEach(song => {
        const div = document.createElement("div");
        div.className = "card";

        div.innerHTML = `
            <img src="${musicLogo}">
            <h3>${song.title}</h3>
            <p>${song.artist}</p>
            <p>${song.album}</p>
            <p>${song.duration}</p>
            <button class="fav-btn">${song.favorite ? "❤️" : "🤍"}</button>
        `;

        div.onclick = () => playSong(song);

        const favBtn = div.querySelector(".fav-btn")!;
        favBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            song.favorite = !song.favorite;
            displaySongs(songList);
        });

        container.appendChild(div);
    });
}

// Play Song
function playSong(song: Song) {
    document.getElementById("currentSong")!.textContent =
        `${song.title} - ${song.artist}`;

    song.playCount++;

    recentlyPlayed.unshift(song);
    if (recentlyPlayed.length > 5) recentlyPlayed.pop();

    updateRecentUI();
}

// Update Recent
function updateRecentUI() {
    const list = document.getElementById("recentList")!;
    list.innerHTML = "";

    recentlyPlayed.forEach(song => {
        if (song) {
            const li = document.createElement("li");
            li.textContent = song.title;
            list.appendChild(li);
        }
    });
}

// Filters
function filterByGenre(genre: string) {
    return genre === "all" ? songs : songs.filter(s => s.genre === genre);
}

function filterByArtist(artist: string) {
    return artist === "all" ? songs : songs.filter(s => s.artist === artist);
}

// Sort
function sortBy(key: keyof Song) {
    return [...songs].sort((a, b) => (a[key] > b[key] ? 1 : -1));
}

// Search
function searchSongs(query: string) {
    return songs.filter(s =>
        s.title.toLowerCase().includes(query.toLowerCase())
    );
}

// Events
document.getElementById("genreFilter")!.addEventListener("change", (e: any) => {
    displaySongs(filterByGenre(e.target.value));
});

document.getElementById("artistFilter")!.addEventListener("change", (e: any) => {
    displaySongs(filterByArtist(e.target.value));
});

document.getElementById("search")!.addEventListener("input", (e: any) => {
    displaySongs(searchSongs(e.target.value));
});

// Init
displaySongs(songs);

// Populate Artist Dropdown
const artistSet = new Set(songs.map(s => s.artist));
const artistDropdown = document.getElementById("artistFilter")!;

artistSet.forEach(artist => {
    const option = document.createElement("option");
    option.value = artist;
    option.textContent = artist;
    artistDropdown.appendChild(option);
});
