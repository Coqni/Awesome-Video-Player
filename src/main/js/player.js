document.addEventListener("DOMContentLoaded", function() { startVideoPlayer(); }, false);
var videoPlayer;

function startVideoPlayer() {
    videoPlayer = document.getElementById('video-player');
    videoPlayer.controls = false;
}

function playVideo() {
    videoPlayer.play();
}

function pauseVideo() {
    videoPlayer.pause();
}

function stopVideo() {
    videoPlayer.pause();
    videoPlayer.currentTime = 0;
}

function changeVolume() {
    videoPlayer.volume = document.getElementById("change-volume").value;
}