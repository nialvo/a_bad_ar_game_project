
//character position and rendering

const X = document.getElementById("x");
const Y = document.getElementById("y");
const Z = document.getElementById("z");
var x,y,z;

let acl = new Accelerometer({frequency: 30});


acl.addEventListener('reading', () => {

    x = Math.round(acl.x *10)/10;
    y = Math.round(acl.y *10)/10;
    z = Math.round(acl.z *10)/10;

    X.textContent= x;
    Y.textContent= y;
    Z.textContent= z;
  
});

acl.start();

//character rendering
const gangst = document.getElementById("imageLoader").children;
let i=0;

function draw(){

    //clear previous drawing
    ctx.clearRect(0,0,1280,720);

    //draw background
    ctx.drawImage(gangst[i],pos[i][0], pos[i][1]);

}



//video feed
const video = document.querySelector('video');

const constraints = { 
    audio: false,
    video: { 
        width: 1280, 
        height: 720 
    } 
};

navigator.mediaDevices.getUserMedia(constraints)
.then(function(mediaStream) {
  
  video.srcObject = mediaStream;
  video.onloadedmetadata = function(e) {
    video.play();
  };
})
.catch(function(err) { console.log("nooo"); }); 