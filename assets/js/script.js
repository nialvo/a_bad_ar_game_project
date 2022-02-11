
const X = document.getElementById("x");
const Y = document.getElementById("y");
const Z = document.getElementById("z");


let acl = new Accelerometer({frequency: 30});


acl.addEventListener('reading', () => {
    X.textContent= acl.x;
    Y.textContent= acl.y;
    Z.textContent= acl.z;
  
});

acl.start();
