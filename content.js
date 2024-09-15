// Initialize the players when the document is ready
function initializePlayers() {
  let youtubePlayer;
  let vimeoPlayer;
  let jwPlayerInstance;

  // YouTube Player Setup
  if (document.querySelector('iframe[src*="youtube.com/embed"]')) {
    const youtubeIframe = document.querySelector(
      'iframe[src*="youtube.com/embed"]'
    );
    if (youtubeIframe.id) {
      youtubePlayer = new YT.Player(youtubeIframe.id);
    } else {
      youtubeIframe.id = "youtube-player";
      youtubePlayer = new YT.Player("youtube-player");
    }
  }

  // Vimeo Player Setup
  if (document.querySelector('iframe[src*="vimeo.com"]')) {
    const vimeoIframe = document.querySelector('iframe[src*="vimeo.com"]');
    vimeoPlayer = new Vimeo.Player(vimeoIframe);
  }

  // JW Player Setup
  if (typeof jwplayer === "function") {
    jwPlayerInstance = jwplayer(); // Get the first available JW Player instance
  }

  // Event listener for wheel actions
  document.addEventListener("wheel", (event) => {
    let target = event.target;

    // Handle HTML5 Video Elements
    if (target.tagName.toLowerCase() === "video") {
      handleHTML5VideoScroll(target, event);
    }
    // Handle YouTube Player
    else if (youtubePlayer && youtubePlayer.getIframe() === target) {
      handleYouTubeScroll(youtubePlayer, event);
    }
    // Handle Vimeo Player
    else if (vimeoPlayer && vimeoPlayer.element === target) {
      handleVimeoScroll(vimeoPlayer, event);
    }
    // Handle JW Player
    else if (
      jwPlayerInstance &&
      jwPlayerInstance.getContainer() ===
        target.closest("#" + jwPlayerInstance.id)
    ) {
      handleJWPlayerScroll(jwPlayerInstance, event);
    }
  });
}

// Handling scrolling for YouTube player
function handleYouTubeScroll(player, event) {
  if (event.deltaX > 0) {
    player.seekTo(player.getCurrentTime() + 10, true);
  } else if (event.deltaX < 0) {
    player.seekTo(player.getCurrentTime() - 10, true);
  }
}

// Handling scrolling for Vimeo player
function handleVimeoScroll(player, event) {
  player.getCurrentTime().then((currentTime) => {
    if (event.deltaX > 0) {
      player.setCurrentTime(currentTime + 10);
    } else if (event.deltaX < 0) {
      player.setCurrentTime(currentTime - 10);
    }
  });
}

// Handling scrolling for JW Player
function handleJWPlayerScroll(player, event) {
  const currentTime = player.getPosition();
  if (event.deltaX > 0) {
    player.seek(currentTime + 10);
  } else if (event.deltaX < 0) {
    player.seek(currentTime - 10);
  }
}

// Handling scrolling for HTML5 video element
function handleHTML5VideoScroll(video, event) {
  if (event.deltaX > 0) {
    video.currentTime += 10;
  } else if (event.deltaX < 0) {
    video.currentTime -= 10;
  }
}

// Initialize players on document ready
document.addEventListener("DOMContentLoaded", initializePlayers);
