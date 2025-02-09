const songs = [
    { title: "Recognize", artist: "PARTYNEXYDOOR", cover: "./images/Recognize.jpg", duration: "5:15", tags: ['top-international'] },
    { title: "Erase Me - Main", artist: "Kid Cudi, Kanye West", cover: "./images/EraseMe.jpg", duration: "3:12", tags: ['top-international', 'top-alltime'] },
    { title: "Soundtrack 2 My Life", artist: "Kid Cudi", cover: "./images/Soundtrack.jpg", duration: "3:56", tags: ['top-international', 'top-alltime'] },
    { title: "Power Trip (feat. Miguel)", artist: "J. Cole, Miguel", cover: "./images/PowerTrip.jpg", duration: "4:01", tags: ['top-alltime'] },
    { title: "4X4", artist: "Travis Scott", cover: "./images/4X4.jpg", duration: "4:26", tags: ['top-international'] },
    { title: "Candy Shop (feat. Olivia)", artist: "Travis Scott", cover: "./images/CandyShop.jpg", duration: "3:29", tags: ['top-international'] },
    { title: "Butterfly", artist: "BTS", cover: "./images/Butterfly.jpg", duration: "3:59", tags: ['top-international'] },
    { title: "Trust Issues", artist: "Drake", cover: "./images/TrustIssues.jpg", duration: "4:42", tags: ['top-international'] },
    { title: "As It Was", artist: "Harry Styles", cover: "./images/As-It-Was.jpg", duration: "2:47", tags: ['top-international'] },
    { title: "Anti-Hero", artist: "Taylor Swift", cover: "./images/AntiHero.jpg", duration: "3:20", tags: ['top-international', 'top-alltime'] },
    { title: "Flowers", artist: "Miley Cyrus", cover: "./images/flowers-miley-cyrus.jpg", duration: "3:21", tags: ['top-alltime'] },
    { title: "Kill Bill", artist: "SZA", cover: "./images/kill-bill-sza.jpg", duration: "2:33", tags: ['top-international'] },
    { title: "Die For You", artist: "The Weeknd", cover: "./images/DieForYou.jpg", duration: "4:20", tags: ['top-alltime'] },
    { title: "Creepin'", artist: "Metro Boomin", cover: "./images/creepin.jpg", duration: "3:42", tags: ['top-international'] },
    { title: "Blinding Lights", artist: "The Weeknd", cover: "./images/BlindingLights.jpg", duration: "3:20", tags: ['top-international'] },
    { title: "Levitating", artist: "Dua Lipa", cover: "./images/Levitating.jpg", duration: "3:24", tags: ['top-alltime'] },
    { title: "Shape of You", artist: "Ed Sheeran", cover: "./images/ShapeOfYou.png", duration: "3:53", tags: ['top-international', 'top-alltime'] },
    { title: "Bad Habits", artist: "Ed Sheeran", cover: "./images/BadHabits.jpg", duration: "3:50", tags: ['top-international'] },
    { title: "Stay", artist: "The Kid LAROI & Justin Bieber", cover: "./images/Stay.jpg", duration: "2:21", tags: ['top-international'] },
    { title: "Senorita", artist: "Shawn Mendes & Camila Cabello", cover: "./images/Senorita.png", duration: "3:10", tags: ['top-international'] },

];

const playlists = [
    { name: "Pop Hits", songs: [0, 1, 2, 5] },
    { name: "Late Night Jams", songs: [3, 4] }
];


const elements = {
    albumGrid: document.querySelector('.album-grid'),
    searchInput: document.querySelector('#search-input'),
    searchOptions: document.querySelector('.search-options'),
    playlistItems: document.querySelector('.playlist-items'),
    playPauseBtn: document.querySelector('.play-pause'),
    progressBar: document.querySelector('.progress'),
    songTitle: document.querySelector('.song-details h3'),
    artistName: document.querySelector('.song-details p'),
    coverImage: document.querySelector('.song-info img'),
    prevBtn: document.querySelector('.prev'),
    nextBtn: document.querySelector('.next'),
    homeButton: document.querySelector('nav li:first-child')
};

let state = {
    isPlaying: false,
    currentSongIndex: 0,
    currentFilter: null
};


function init() {
    renderAlbums(songs);
    renderPlaylists();
    setupEventListeners();
}


function renderAlbums(songsArray) {
    elements.albumGrid.innerHTML = songsArray.map((song, index) => `
        <div class="album-card" data-index="${index}">
            <img src="${song.cover}" alt="${song.title}">
            <h4>${song.title}</h4>
            <p>${song.artist}</p>
        </div>
    `).join('');
}

function renderPlaylists() {
    elements.playlistItems.innerHTML = playlists.map(playlist => `
        <li>${playlist.name}</li>
    `).join('');
}


function handleSearchInput() {
    const searchTerm = elements.searchInput.value.toLowerCase();
    const filteredSongs = songs.filter(song => 
        song.title.toLowerCase().includes(searchTerm) ||
        song.artist.toLowerCase().includes(searchTerm)
    );
    renderAlbums(filteredSongs);
}

function handleSearchOptionClick(filter) {
    elements.searchOptions.classList.remove('active');
    state.currentFilter = filter;
    const filteredSongs = songs.filter(song => song.tags?.includes(filter));
    renderAlbums(filteredSongs);
}

function handlePlaylistClick(index) {
    const playlistSongs = playlists[index].songs.map(i => songs[i]);
    renderAlbums(playlistSongs);
}

function handleAlbumClick(index) {
    state.currentSongIndex = index;
    updatePlayerInfo();
    if (!state.isPlaying) togglePlayPause();
}

function togglePlayPause() {
    state.isPlaying = !state.isPlaying;
    elements.playPauseBtn.innerHTML = state.isPlaying ? 
        '<i class="fas fa-pause"></i>' : 
        '<i class="fas fa-play"></i>';
}

function updatePlayerInfo() {
    const currentSong = songs[state.currentSongIndex];
    elements.songTitle.textContent = currentSong.title;
    elements.artistName.textContent = currentSong.artist;
    elements.coverImage.src = currentSong.cover;
}

function resetToHomeScreen() {
    state.currentFilter = null;
    elements.searchInput.value = '';
    renderAlbums(songs);
    document.querySelectorAll('nav li').forEach(li => li.classList.remove('active'));
    elements.homeButton.classList.add('active');
}


function setupEventListeners() {

    elements.searchInput.addEventListener('focus', () => {
        elements.searchOptions.classList.add('active');
    });
    
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) {
            elements.searchOptions.classList.remove('active');
        }
    });

    document.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', () => {
            handleSearchOptionClick(option.dataset.filter);
        });
    });


    elements.playlistItems.addEventListener('click', (e) => {
        const index = Array.from(e.target.parentNode.children).indexOf(e.target);
        if (index >= 0) handlePlaylistClick(index);
    });


    elements.albumGrid.addEventListener('click', (e) => {
        const card = e.target.closest('.album-card');
        if (card) handleAlbumClick(parseInt(card.dataset.index));
    });


    elements.playPauseBtn.addEventListener('click', togglePlayPause);
    elements.prevBtn.addEventListener('click', () => {
        state.currentSongIndex = (state.currentSongIndex - 1 + songs.length) % songs.length;
        updatePlayerInfo();
    });
    elements.nextBtn.addEventListener('click', () => {
        state.currentSongIndex = (state.currentSongIndex + 1) % songs.length;
        updatePlayerInfo();
    });


    elements.homeButton.addEventListener('click', resetToHomeScreen);


    document.querySelectorAll('nav li').forEach((item, index) => {
        item.addEventListener('click', () => {
            if(index !== 0) { // Home is index 0
                document.querySelectorAll('nav li').forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');
            }
        });
    });
}


setInterval(() => {
    if (state.isPlaying) {
        const currentWidth = parseFloat(elements.progressBar.style.width) || 0;
        elements.progressBar.style.width = `${(currentWidth + 0.1) % 100}%`;
    }
}, 1000);


init();
updatePlayerInfo();
