class VideoPlayer {

    constructor(videoUrl, videoPlayerId, width, height) {
        this.videoUrl = videoUrl;
        this.videoPlayerId = videoPlayerId;
        this.width = width;
        this.height = height;

        // generate a new instance of a video player

        this.videoPlayerElement = getHtmlElement();

        appendVideoPlayer();
    }

    getHtmlElement() {
        let players = document.querySelectorAll(".player");
        for (let i = 0; i < players.length; i++) {
            if (players[i].getAttribute("player-id") == this.videoPlayerId) {
                return players[i];
            }
        }
    }

    appendVideoPlayer() {
        this.videoPlayerElement.setAttribute("class", "wrapper");
        let playerWrapper = document.createElement("div");
        playerWrapper.setAttribute("class", "player-wrapper");
        let videoPlayerHtml = document.createElement("video");
        videoPlayerHtml.setAttribute("")
            //this.videoPlayerElement.append();
    }
}

document.addEventListener("DOMContentLoaded", function() { startVideoPlayer(); }, false);
var videoPlayer;
var preview = 0;

function startVideoPlayer() {
    videoPlayer = document.getElementsByClassName('video-player')[0];
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