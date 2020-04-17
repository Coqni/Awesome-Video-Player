document.addEventListener("DOMContentLoaded", function() { startVideoPlayer(); }, false);
var player;

function startVideoPlayer() {
    player = document.getElementById('video-player');
    player.controls = false;
}

function playVideo() {
    player.play();
}

function pauseVideo() {
    player.pause();
}

function stopVideo() {
    player.pause();
    player.currentTime = 0;
}

function changeVolume() {
    player.volume = document.getElementById("change-volume").value;
}