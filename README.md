# BestOfCode-Video-Player
Video Player developed by BestOfCode

## Setup
1. Clone the repository and insert the files into your project. Alternatively you can import the javascript source and it will automatically initialize the video player.

### OR

2. You can add the javascript by adding the following to your html:
`<script src="https://www.bestofcode.net/video-player/VideoPlayer.js">`

3. You also have to add the css:
`<link rel="stylesheet" href="https://www.bestofcode.net/video-player/VideoPlayer.js">`

4. Add a div to your project and add the class `player`.

5. Add `player-src` to the div and give the video url as value.

The document should look like this:

`
<html>
  <head>
      <link rel="stylesheet" href="https://www.bestofcode.net/video-player/VideoPlayer.js">
      <title>Video Player Demo</title>
  </head>
  <body>
      <div class="player" player-src="../videos/sample.mp4"></div>
  </body>
  <script src="https://www.bestofcode.net/video-player/VideoPlayer.js">
</html>`
