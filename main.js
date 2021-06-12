music = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;


scoreLeftWrist = 0;
scorerighttWrist = 0;

volume = 0;
speed = 0;

function preload() {
    music = loadSound("music.mp3");

}

function setup() {
    canvas = createCanvas(550, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video, ModelLoaded);
    posenet.on('pose', gotResults);

}

function ModelLoaded() {
    console.log("Posenet is initialized!");
}

function draw() {
    image(video, 0, 0, 550, 500);

    fill("#ff0000");
    stroke("#ff0000");

    if (scoreLeftWrist > 0.2) {

        circle(leftWristX, leftWristY, 20);
        leftWristYNO = Number(leftWristY);
        leftwristyfloored = floor(leftWristYNO);
        volume = leftwristyfloored / 500;
        music.setVolume(volume);
        document.getElementById("volume_display").innerHTML = "volume - " + volume;
    }


    if (scorerighttWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);


        if (rightWristY > 0 && rightWristY <= 100) {
            music.rate(0.5);
            document.getElementById("speed_display").innerHTML = "Speed = 0.5x";
        } else if (rightWristY > 100 && rightWristY <= 200) {
            music.rate(1);
            document.getElementById("speed_display").innerHTML = "Speed = 1x";
        } else if (rightWristY > 200 && rightWristY <= 300) {
            music.rate(1.5);
            document.getElementById("speed_display").innerHTML = "Speed = 1.5x";
        } else if (rightWristY > 300 && rightWristY <= 400) {
            music.rate(2);
            document.getElementById("speed_display").innerHTML = "Speed = 2x";
        } else {
            music.rate(2.5);
            document.getElementById("speed_display").innerHTML = "Speed = 2.5x";
        }
    }
}

function play() {
    music.play()
    music.setVolume(1);
    music.rate(1);
}

function stop() {
    music.stop();
}

function pause() {
    music.pause();
}



function gotResults(results) {

    if (results.length > 0) {
        console.log(results);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;


        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scorerighttWrist = results[0].pose.keypoints[10].score;

        console.log("Left Wrist X = " + leftWristX + ", Left Wrist Y = " + leftWristY);
        console.log("Right Wrist X = " + rightWristX + ", Right Wrist Y = " + rightWristY);

        console.log("Left Wrist score is " + scoreLeftWrist);
        console.log("Right WRist Score is " + scorerighttWrist);

    }

}