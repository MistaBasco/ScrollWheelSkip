document.addEventListener("DOMContentLoaded", () => {
  // Monitor the DOM for added video elements
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1) {
          // If the added node is a video or an iframe, initialize it
          if (node.tagName.toLowerCase() === "video") {
            // Direct video element
            initializeHTML5Video(node);
          } else if (node.tagName.toLowerCase() === "iframe") {
            // Potential YouTube or Vimeo iframe
            if (node.src.includes("youtube.com/embed")) {
              initializeYouTubePlayer(node);
            } else if (node.src.includes("vimeo.com")) {
              initializeVimeoPlayer(node);
            }
          } else {
            // Custom player case - check for video elements within
            const video = node.querySelector("video");
            if (video) {
              initializeHTML5Video(video);
            }
          }
        }
      });
    });
  });

  // Start observing the document body for changes
  observer.observe(document.body, { childList: true, subtree: true });

  // Function to handle HTML5 video elements
  function initializeHTML5Video(video) {
    document.addEventListener("wheel", (event) => {
      if (event.target === video || video.contains(event.target)) {
        handleHTML5VideoScroll(video, event);
      }
    });
  }

  // Handling YouTube player initialization
  function initializeYouTubePlayer(iframe) {
    const player = new YT.Player(iframe);
    document.addEventListener("wheel", (event) => {
      if (event.target === iframe || iframe.contains(event.target)) {
        handleYouTubeScroll(player, event);
      }
    });
  }

  // Handling Vimeo player initialization
  function initializeVimeoPlayer(iframe) {
    const player = new Vimeo.Player(iframe);
    document.addEventListener("wheel", (event) => {
      if (event.target === iframe || iframe.contains(event.target)) {
        handleVimeoScroll(player, event);
      }
    });
  }

  // Functions for scroll handling
  function handleHTML5VideoScroll(video, event) {
    if (event.deltaX > 0) {
      video.currentTime += 10;
    } else if (event.deltaX < 0) {
      video.currentTime -= 10;
    }
  }

  function handleYouTubeScroll(player, event) {
    if (event.deltaX > 0) {
      player.seekTo(player.getCurrentTime() + 10, true);
    } else if (event.deltaX < 0) {
      player.seekTo(player.getCurrentTime() - 10, true);
    }
  }

  function handleVimeoScroll(player, event) {
    player.getCurrentTime().then((currentTime) => {
      if (event.deltaX > 0) {
        player.setCurrentTime(currentTime + 10);
      } else if (event.deltaX < 0) {
        player.setCurrentTime(currentTime - 10);
      }
    });
  }
});
