class VideoPlayer {

    constructor(videoUrl, videoPlayerId, width, height) {
        this.videoUrl = videoUrl;
        this.videoPlayerId = videoPlayerId;
        this.width = width;
        this.height = height;

        // generate a new instance of a video player

        this.videoPlayerElement = getHtmlElement();
        processAttributes();

        appendVideoPlayer();
    }

    getHtmlElement() {

        let players = document.querySelectorAll(".player");
        let resultingPlayer;

        for (let i = 0; i < players.length; i++) {

            if (players[i].getAttribute("player-id") == this.videoPlayerId) {

                return resultingPlayer;
            }
        }
    }

    processAttributes() {
        if (!this.videoPlayerElement.getAttribute("player-id")) {

            console.log("Error: No attribute \"player-id\" set in the HTML for the player with the id " + this.videoPlayerId);
            return;
        }
        if (this.videoPlayerElement.getAttribute("player-src")) {

            this.videoUrl = this.videoPlayerElement.getAttribute("player-src");
        } else {

            console.log("Error: No attribute \"player-src\" set for the player with the id " + this.videoPlayerId);
        }
    }

    appendVideoPlayer() {
        this.videoPlayerElement.setAttribute("class", "wrapper");
        let playerWrapper = document.createElement("div");
        playerWrapper.setAttribute("class", "player-wrapper");
        let videoPlayerHtml = document.createElement("video");
        videoPlayerHtml.setAttribute("class", "video-player");
        let videoPlayerSource = document.createElement("source");
        videoPlayerSource.setAttribute("src", this.videoUrl);
        videoPlayerSource.setAttribute("type", "video/mp4");
        videoPlayerHtml.appendChild(videoPlayerSource);
        playerWrapper.appendChild(videoPlayerHtml);

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