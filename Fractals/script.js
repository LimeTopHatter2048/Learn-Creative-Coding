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
    let scale = 0.6; // big, small
    let spread = 0.8; //rotate()
    let color = 'hsl('+ Math.random() * 360 +', 100%, 50%)';
    let lineWidth = Math.floor(Math.random() * 10 + 5); // ctx.value

    // controls
    const RandomizeButton = document.getElementById('randomizeButton');
    const resetButton = document.getElementById('resetButton');
    const slider_spread = document.getElementById('spread');
    const label_spread = document.querySelector('[for ="spread"]');
    slider_spread.addEventListener('change', function(e){
        spread = e.target.value;
        updateSliders()
        drawFractal();
    });

    slider_sides = document.getElementById('sides');
    label_sides = document.querySelector('[for ="sides"]');
    slider_sides.addEventListener('change', function(e){
        sides = e.target.value;
        updateSliders()
        drawFractal();
    });  

    function drawBranch(level){
        if(level > maxLevel) return;
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(size -5, 0);
        ctx.stroke();
        for (let i = 0; i < branches; i++){
            ctx.save();
            ctx.translate(size- (size/branches) * i, -1);
            ctx.scale(scale,scale);

            // positive  
            ctx.save();
            ctx.rotate(spread);
            drawBranch(level +1);
            ctx.restore();

            ctx.restore();
        }
        ctx.beginPath();
        ctx.arc(0,size, size * 0.1, 0, Math.PI * 2);
        ctx.fill();
    }

    function drawFractal(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.save();
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.translate(canvas.width/2,canvas.height/2);

        for (let i = 0; i< sides; i++){
            ctx.rotate((Math.PI * 2)/sides);
            drawBranch(0);
        }
        ctx.restore();
        RandomizeButton.style.backgroundColor = color;
    }
    drawFractal();

    function randomizeFractal(){
        sides = Math.floor(Math.random() * 7 + 2);
        scale = Math.random() * 0.2 + 0.4; // big, small
        spread = Math.random() * 2.9 + 0.1; //rotate()
        color = 'hsl('+ Math.random() * 360 +', 100%, 50%)';
        lineWidth = Math.floor(Math.random() * 20 + 10); // ctx.value
        RandomizeButton.style.backgroundColor = color;
    }
    RandomizeButton.addEventListener('click', function(){
        updateSliders()
        randomizeFractal()
        drawFractal();
    });

    function resetFractal(){
        sides = 5;
        scale = 0.5; // big, small
        spread = 0.7; //rotate()
        color = 'hsl('+ Math.random() * 360 +', 100%, 50%)';
        lineWidth = 15; // ctx.value
    }
    resetButton.addEventListener('click', function(){
        resetFractal();
        updateSliders();
        drawFractal();
    });

    function updateSliders(){
        slider_spread.value = spread;
        label_spread.innerText = 'Spread: ' + Number(spread).toFixed(1);
        slider_sides.value = sides;
        label_sides.innerText = 'Sides :' + sides;
    }
    updateSliders();

    window.addEventListener('resize', function(){
        canvas.width = window.innerWidth * 0.8;
        canvas.height = window.innerHeight * 0.8;
        size = canvas.width < canvas.height ? canvas.width * 0.3: canvas.height * 0.3;
        ctx.shadowColor = 'rgba(0,0,0,0.7)';
        ctx.shadowOffsetX = 10;
        ctx.shadowOffsetY = 5;
        ctx.shadowBlur = 10;
        drawFractal();

        // Resize controls dynamically
        const controls = document.getElementById('controls');
        controls.style.width = (window.innerWidth * 0.25) + 'px'; // 25% of window
        const buttons = controls.querySelectorAll('button');
        buttons.forEach(btn => {
            btn.style.fontSize = (window.innerWidth * 0.01 + 10) + 'px';
        });
        // Resize input sliders dynamically
        const sliders = document.querySelectorAll('#controls input[type="range"]');
        sliders.forEach(slider => {
            slider.style.width = (window.innerWidth * 0.2) + 'px';  // e.g., 20% of screen
        });
    });
});