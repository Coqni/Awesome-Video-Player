document.addEventListener("DOMContentLoaded", function() { startVideoPlayer(); }, false);
var videoPlayer;
var preview = 0;

function startVideoPlayer() {
    videoPlayer = document.getElementById('video-player');
    videoPlayer.controls = false;
    videoPlayer.currentTime = 1;

}

function playVideo() {
    preview = 1;
    videoPlayer.play();
}

function pauseVideo() {
    videoPlayer.pause();
}

function stopVideo() {
    preview = 0;
    videoPlayer.pause();
    videoPlayer.currentTime = 1;
}

function changeVolume() {
    videoPlayer.volume = document.getElementById("change-volume").value;
}