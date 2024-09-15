document.addEventListener("wheel", (event) => {
  // Check if a video is currently playing
  const video = document.querySelector("video");
  if (video) {
    // Check if the event is horizontal scroll
    if (event.deltaX > 0) {
      // Scroll right - skip forward 10 seconds
      video.currentTime += 10;
    } else if (event.deltaX < 0) {
      // Scroll left - skip backward 10 seconds
      video.currentTime -= 10;
    }
  }
});
