class VideoPlayer {

    constructor(videoPlayerId, width, height) {

        if (videoPlayerId == undefined) {
            console.log("Error: No attribute \"player-id\" set in the HTML");
            return;
        }
        this.videoPlayerId = videoPlayerId.toString();

        // generate a new instance of a video player
        this.videoPlayer;

        this.videoPlayerElement;
        this.getHtmlElement();
        this.processAttributes();
        this.preview;

        this.appendVideoPlayer();

        this.prepareVideoPlayer();
    }

    getHtmlElement() {

        let players = document.getElementsByClassName("player");
        let resultingPlayer;

        for (let i = 0; i < players.length; i++) {

            if (players[i].getAttribute("player-id").localeCompare(this.videoPlayerId) == 0) {
                resultingPlayer = players[i];
            }
        }
        this.videoPlayerElement = resultingPlayer;
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

        if (this.videoPlayerElement.getAttribute("player-width")) {

            this.width = this.videoPlayerElement.getAttribute("player-width");
        } else {

            this.width = 200;
        }

        if (this.videoPlayerElement.getAttribute("player-height")) {

            this.height = this.videoPlayerElement.getAttribute("player-height");
        } else {

            this.height = 200;
        }
    }

    appendVideoPlayer() {
        this.videoPlayerElement.setAttribute("class", "wrapper");
        let playerWrapper = document.createElement("div");
        playerWrapper.setAttribute("class", "player-wrapper");
        let videoPlayerHtml = document.createElement("video");
        videoPlayerHtml.setAttribute("class", "video-player");

        this.videoPlayer = videoPlayerHtml;
        let videoPlayerSource = document.createElement("source");
        videoPlayerSource.setAttribute("src", this.videoUrl);
        videoPlayerSource.setAttribute("type", "video/mp4");
        videoPlayerHtml.appendChild(videoPlayerSource);
        playerWrapper.appendChild(videoPlayerHtml);
        playerWrapper.insertAdjacentHTML("beforeend", "\
            <div id=\'player-controls\'>\
                <input type=\"image\" src=\"../img/play.png\" onclick=\"get(" + get(this.videoPlayerId) + ").playVideo(" + this.videoPlayerId + ")\" id=\"play-button\">\
                <input type=\"image\" src=\"../img/pause.png\" onclick=\"get(" + get(this.videoPlayerId) + ").pauseVideo(" + this.videoPlayerId + ")\" id=\"pause-button\">\
                <input type=\"image\" src=\"../img/stop.png\" onclick=\"get(" + get(this.videoPlayerId) + ").stopVideo(" + this.videoPlayerId + ")\" id=\"stop-button\">\
                <img src=\"../img/volume.png\" id=\"vol-img\">\
                <input type=\"range\" id=\"change-volume-" + this.videoPlayerId + "\" onchange=\"get(" + this.videoPlayerId + ").changeVolume(" + this.videoPlayerId + ")\" step=\"0.05\" min=\"0\" max=\"1\" value=\"1\">\
            </div>\
        ");

        this.videoPlayerElement.append(playerWrapper);
    }

    playVideo() {
        this.preview = 1;
        this.videoPlayer.play();
    }

    prepareVideoPlayer() {
        this.videoPlayer.controls = false;
        this.videoPlayer.currentTime = 1;
    }

    pauseVideo() {
        this.videoPlayer.pause();
    }

    stopVideo() {
        this.preview = 0;
        this.videoPlayer.pause();
        this.videoPlayer.currentTime = 1;
    }

    changeVolume() {
        this.videoPlayer.volume = document.getElementById("change-volume-" + this.videoPlayerId).value;
    }
}
//document.addEventListener("DOMContentLoaded", function() { generateVideoPlayers(); }, false);
var videoPlayerRaws;
var videoPlayerObjects = [];

generateVideoPlayers();

function generateVideoPlayers() {
    videoPlayerRaws = document.getElementsByClassName('player');
    let tmpId = 0;
    for (let i = 0; i < videoPlayerRaws.length; i++) {
        tmpId = videoPlayerRaws[i].getAttribute("player-id");
        videoPlayerObjects.push(new VideoPlayer(tmpId));
    }
    videoPlayerObjects.push(new VideoPlayer());

}

function get(videoPlayerId) {

    for (let i = 0; i < videoPlayerObjects.length; i++) {

        if (videoPlayerObjects[i].videoPlayerId.localeCompare(i.toString()) == 0) {
            return videoPlayerObjects[i];
        }
    }
}
/*
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
}*/