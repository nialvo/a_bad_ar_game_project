
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
