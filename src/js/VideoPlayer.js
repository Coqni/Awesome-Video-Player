class VideoPlayer {

    width;
    height;
    videoPlayerId;
    tmpVolume;
    play;
    pause;
    stop;
    isPaused;

    constructor(videoPlayerId, width, height) {

        if (videoPlayerId == undefined) {
            console.log("Error: No attribute \"player-id\" set in the HTML");
            return;
        }

        this.width = width;
        this.height = height;
        this.videoPlayerId = videoPlayerId.toString();
        this.isPaused = true;

        // generate a new instance of a video player

        this.videoPlayerElement;
        this.getHtmlElement();
        this.processAttributes();
        this.preview;
        
        this.appendVideoPlayer();
        
        this.prepareVideoPlayer();
        this.setSelectors();
    }

    setSelectors() {
        this.play = document.querySelector("#play-button");
        this.pause = document.querySelector("#pause-button");
        this.stop = document.querySelector("#stop-button");
        this.fullScreen = document.querySelector("#fullscreen-button");
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
            console.log("width updated");
        }

        if (this.videoPlayerElement.getAttribute("player-height")) {

            this.height = this.videoPlayerElement.getAttribute("player-height");
        } else {

            this.height = 200;
        }

        console.log(this.width + ", " + this.height);
    }

    appendVideoPlayer() {
        this.videoPlayerElement.setAttribute("class", "wrapper");
        let playerWrapper = document.createElement("div");
        playerWrapper.setAttribute("class", "player-wrapper");
        let videoPlayerHtml = document.createElement("video");
        videoPlayerHtml.setAttribute("class", "video-player");
        
        this.videoPlayer = videoPlayerHtml;
        
        this.videoPlayer.style.margin = "auto";
        let videoPlayerSource = document.createElement("source");

        
        videoPlayerSource.setAttribute("src", this.videoUrl);
        videoPlayerSource.setAttribute("type", "video/mp4");
        
        videoPlayerHtml.appendChild(videoPlayerSource);
        playerWrapper.appendChild(videoPlayerHtml);
        playerWrapper.insertAdjacentHTML("beforeend", "\
        <div id=\'player-controls\'>\
        <input type=\"image\" src=\"../img/play.png\" onclick=\"get(" + this.videoPlayerId + ").playVideo(" + this.videoPlayerId + ")\" id=\"play-button\">\
        <input type=\"image\" src=\"../img/pause.png\" onclick=\"get(" + this.videoPlayerId + ").pauseVideo(" + this.videoPlayerId + ")\" id=\"pause-button\">\
        <input type=\"image\" src=\"../img/stop.png\" onclick=\"get(" + this.videoPlayerId + ").stopVideo(" + this.videoPlayerId + ")\" id=\"stop-button\">\
        <img src=\"../img/volume.png\" id=\"vol-img\" class=\"vol-" + this.videoPlayerId + "\" onclick=\"get(" + this.videoPlayerId + ").mute()\">\
        <input type=\"range\" id=\"change-volume-" + this.videoPlayerId + "\" onchange=\"get(" + this.videoPlayerId + ").changeVolume(" + this.videoPlayerId + ")\" step=\"0.05\" min=\"0\" max=\"1\" value=\"1\">\
        <input type=\"image\" src=\"../img/fullscreen.png\" onclick=\"changePlayerSize()\" id=\"fullscreen-button\">\
        </div>\
        ");
        
        this.videoPlayerElement.append(playerWrapper);
    }

    playVideo() {
        this.preview = 1;
        this.videoPlayer.play();
        this.isPaused = false;
    }

    prepareVideoPlayer() {
        this.videoPlayer.controls = false;
        this.videoPlayer.currentTime = 1;
    }

    pauseVideo() {
        this.videoPlayer.pause();
        this.isPaused = true;
    }

    stopVideo() {
        this.preview = 0;
        this.videoPlayer.pause();
        this.videoPlayer.currentTime = 1;
        this.isPaused = true;
    }

    changeVolume() {
        this.videoPlayer.volume = document.getElementById("change-volume-" + this.videoPlayerId).value;
    }

    mute() {
        this.tmpVolume = this.videoPlayer.volume;
        document.getElementById("change-volume-" + this.videoPlayerId).value = 0;
        this.changeVolume();
    }

    unmute() {
        document.getElementById("change-volume-" + this.videoPlayerId).value = this.tmpVolume;
        this.changeVolume();
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

}

let PLAYER = videoPlayerObjects[0];

function get(videoPlayerId) {

    for (let i = 0; i < videoPlayerObjects.length; i++) {

        if (videoPlayerObjects[i].videoPlayerId == videoPlayerId) {
            return videoPlayerObjects[i];
        }
    }
}

let maximized = false;
let muted = false;
let defaultBackgroundColor = "white";
let tmpVolume = 1;

function maximize() {
    document.querySelectorAll(".player-wrapper")[0].style.width = "100%";
    document.querySelectorAll(".wrapper")[0].style.width = "100%";
    document.querySelectorAll(".video-player")[0].style.width = "100%";
    document.querySelectorAll(".player-wrapper")[0].style.height = "100%";
    document.querySelectorAll(".wrapper")[0].style.height = "100%";
    document.querySelectorAll(".video-player")[0].style.height = "100%";
    document.querySelector("body").style.background = "black";
    document.querySelector("#player-controls").style.top = "98%";

    maximized = true;
}

function minimize() {
    document.querySelectorAll(".player-wrapper")[0].style.width = "600px";
    document.querySelectorAll(".wrapper")[0].style.width = "600px";
    document.querySelectorAll(".video-player")[0].style.width = "600px";
    document.querySelectorAll(".player-wrapper")[0].style.height = "auto";
    document.querySelectorAll(".wrapper")[0].style.height = "auto";
    document.querySelectorAll(".video-player")[0].style.height = "auto";
    document.querySelector("body").style.background = defaultBackgroundColor;
    document.querySelector("#player-controls").style.top = "90%";

    maximized = false;
}

function changePlayerSize() {
    maximized ? minimize() : maximize();
}

document.addEventListener("keydown", function(e) {
    console.log(e.key);
    if((e.key == "Escape" || e.key == "f") && maximized) {
        e.preventDefault();
        minimize();
    } else if(e.key == "f" && !maximized) {
        e.preventDefault();
        maximize();
    } else if(e.key == "m") {
        if(muted) {
            PLAYER.unmute();
            muted = false;
        } else {
            PLAYER.mute();
            muted = true;
        }
    } else if(e.key == " ") {
        if(PLAYER.isPaused) {
            PLAYER.playVideo();
        } else {
            PLAYER.pauseVideo();
        }
    }
});