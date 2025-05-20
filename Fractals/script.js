window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.8;

    // canvas settings
    ctx.fillStyle = 'green';
    ctx.strokeStyle = 'yellow';
    ctx.lineWidth = 30;
    ctx.lineCap = 'round';

    // effect settings
    let size = 200;
    let sides = 20;
    let maxLevel = 10;
    ctx.save();
    ctx.translate(canvas.width/2,canvas.height/2);
    ctx.scale(1, 1);
    ctx.rotate(0);
    //ctx.fillRect(0,0,canvas.width,canvas.height);

    function drawBranch(level){
        if(level > maxLevel) return;
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(size, 0);
        ctx.stroke();
        ctx.translate(100,0);
        ctx.rotate(0.6);
        ctx.scale(0.8, 0.8);

        drawBranch(level +1);
    }
    drawBranch(0);

/*     for (let i = 0; i< sides; i++){
        ctx.rotate((Math.PI * 2)/sides);
    } */
    
    ctx.restore();
});