window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.8;

    // canvas settings
    ctx.fillStyle = 'green';
    ctx.strokeStyle = 'gold';
    
    ctx.lineCap = 'round';
    ctx.shadowColor = 'rgba(0,0,0,0.7)';
    ctx.shadowOffsetX = 10;
    ctx.shadowOffsetY = 5;
    ctx.shadowBlur = 10;

    // effect settings
    let size = canvas.width < canvas.height ? canvas.width * 0.3: canvas.height * 0.3;
    const maxLevel = 4; // how many drawBranch()
    const branches = 2; //translate()


    let sides = 5;
    let scale = 0.5; // big, small
    let spread = 0.8; //rotate()
    let color = 'hsl('+ Math.random() * 360 +', 100%, 50%)';
    let lineWidth = Math.floor(Math.random() * 20 + 10); // ctx.value

    // controls
    const RandomizeButton = document.getElementById('randomizeButton');

    function drawBranch(level){
        if(level > maxLevel) return;
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(size, 0);
        ctx.stroke();
        for (let i = 0; i < branches; i++){
            ctx.save();
            ctx.translate(size- (size/branches) * i, 0);
            ctx.scale(scale,scale);

            // positive  
            ctx.save();
            ctx.rotate(spread);
            drawBranch(level +1);
            ctx.restore();

            // negative
            ctx.save();
            ctx.rotate(-spread);
            ctx.scale(scale,scale);
            drawBranch(level +1);
            ctx.restore();

            ctx.restore();
        }
        
    }

    function drawFractal(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.strokeStyle = color;
        ctx.save();
        ctx.lineWidth = lineWidth;
        ctx.translate(canvas.width/2,canvas.height/2);
        ctx.scale(scale,scale);
        ctx.rotate(0);
        for (let i = 0; i< sides; i++){
            ctx.rotate((Math.PI * 2)/sides);
            drawBranch(0);
        }
        ctx.restore();
    }
    drawFractal();

    function randomizeFractal(){
        sides = Math.floor(Math.random() * 7 + 2);
        scale = Math.random() * 0.2 + 0.4; // big, small
        spread = Math.random() * 2.9 + 0.1; //rotate()
        color = 'hsl('+ Math.random() * 360 +', 100%, 50%)';
        lineWidth = Math.floor(Math.random() * 20 + 10); // ctx.value
    }
    RandomizeButton.addEventListener('click', function(){
        randomizeFractal()
        drawFractal();
    });
});