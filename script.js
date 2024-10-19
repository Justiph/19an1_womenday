const heartContainer = document.querySelector('.floating-hearts');

function createHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.style.left = Math.random() * 100 + 'vw';  // Random horizontal position
  heart.style.animationDuration = Math.random() * 5 + 10 + 's'; // Random float duration
  heart.innerHTML = '❤️';
  heartContainer.appendChild(heart);

  // Remove the heart after it has floated out of view
  setTimeout(() => {
    heart.remove();
  }, 15000);  // Corresponds with the floatUp animation duration
}

// Create a new heart every 500ms
setInterval(createHeart, 500);


// const musicFiles = [
//   '/music/Anthony Lazaro  A Different Kind of Love Lyric Video.mp3',
//   '/music/Anthony Lazaro  Sarah Kang  Love Letter.mp3',
//   '/music/Anthony Lazaro  The Hamburg Song Official Video.mp3',
//   '/music/Faime  Love Drunk Official Audio.mp3',
//   '/music/For You  vietra  Lyrics.mp3',
//   '/music/I Love You So.mp3',
//   '/music/Make This Love Last by Ella Daniel.mp3',
//   '/music/Munn  Leave Out Of Love Lyric Video.mp3',
//   '/music/Vietra  In Love lyrics.mp3',
//   '/music/Stephen Dawes  Happiest Girl Lyric Video.mp3'
// ];
const musicFiles = [
  './music/Playlist.mp3'
]

const audioElement = document.getElementById('background-music');
const playMusicBtn = document.getElementById('play-music-btn');

let shuffledMusicFiles = [];
let currentTrackIndex = 0;

// Shuffle the music files and play the first track// Function to shuffle the music files
function shuffleMusic() {
  // Create a copy of the musicFiles array
  shuffledMusicFiles = [...musicFiles];
  // Shuffle the array
  for (let i = shuffledMusicFiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledMusicFiles[i], shuffledMusicFiles[j]] = [shuffledMusicFiles[j], shuffledMusicFiles[i]];
  }
}

// Function to play the next track
function playNextTrack() {
  if (currentTrackIndex < shuffledMusicFiles.length) {
    audioElement.src = shuffledMusicFiles[currentTrackIndex];
    currentTrackIndex++; // Move to the next track
    audioElement.play().catch(error => console.error('Playback error:', error)); // Play track and catch errors
    console.log('Playing track:', shuffledMusicFiles[currentTrackIndex - 1]); // Log the track that is playing
  } else {
    // Reset the index to loop through shuffled music files again
    currentTrackIndex = 0;
    playNextTrack(); // Start playing from the beginning
  }
}

// Play music when button is clicked
playMusicBtn.addEventListener('click', () => {
  shuffleMusic(); // Shuffle music and start playing
  playMusicBtn.style.display = 'none'; // Hide the button once the music starts
  currentTrackIndex = 0; // Reset index for new shuffle
  playNextTrack(); // Start playing the first track
  
  // Show the bubble
  const bubble = document.getElementById('music-bubble');
  bubble.style.opacity = '1'; // Make it visible
  bubble.style.animation = 'floatUp 5s forwards'; // Start the animation

  // Remove the bubble after the animation ends
  setTimeout(() => {
    bubble.style.opacity = '0'; // Fade out
    bubble.style.animation = ''; // Reset animation
  }, 5000); // Duration should match animation time
});

// Set up the event listener for when a song ends
audioElement.addEventListener('ended', playNextTrack);
