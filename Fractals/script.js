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
    let sides = 5;
    let maxLevel = 4; // how many drawBranch()
    let scale = 0.5; // big, small
    let spread = 0.8; //rotate()
    let branches = 2; //translate()
    ctx.save();
    ctx.translate(canvas.width/2,canvas.height/2);
    ctx.scale(scale,scale);
    ctx.rotate(0);
    //ctx.fillRect(0,0,canvas.width,canvas.height);

    function drawBranch(level){
        if(level > maxLevel) return;
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(size, 0);
        ctx.stroke();
        for (let i = 0; i < branches; i++){
            ctx.save();
            ctx.translate(size- (size/branches) * i, 0);
            ctx.rotate(spread);
            ctx.scale(scale,scale);
            drawBranch(level +1);
            ctx.restore(scale, scale);

            ctx.save();
            ctx.translate(size- (size/branches) * i, 0);
            ctx.rotate(-spread);
            ctx.scale(scale,scale);
            drawBranch(level +1);
            ctx.restore(scale, scale);
        }
        
    }
    drawBranch(0);

/*     for (let i = 0; i< sides; i++){
        ctx.rotate((Math.PI * 2)/sides);
    } */
    
    ctx.restore();
});