import {Polygon} from './polygon.js';
class App{
    constructor(){
        this.canvas = document.createElement('canvas');  
        document.body.appendChild(this.canvas);   
        this.ctx = this.canvas.getContext('2d');         
        
        this.pixedRatio = window.devicePixelRatio > 1 ? 2 : 1;

        window.addEventListener('resize', this.resize.bind(this), false); 
        this.resize();

        this.isDown = false;
        this.moveX = 0;
        this.offsetX = 0;
        document.addEventListener('pointerdown', this.onDown.bind(this), false);
        document.addEventListener('pointermove',this.onMove.bind(this), false);
        document.addEventListener('pointerup',this.onUp.bind(this), false);

        window.requestAnimationFrame(this.animate.bind(this))
    }
    
    resize(){
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * this.pixedRatio;
        this.canvas.height = this.stageHeight * this.pixedRatio;
        this.ctx.scale(this.pixedRatio,this.pixedRatio);

        this.polygon = new Polygon(
            this.stageWidth / 2,

            // 도형의 절반형상만 브라우저 하단에 위치. line35~37 (part.02)
            // this.stageHeight + (this.stageHeight / 4),
            // this.stageHeight / 1.5,
            // 15

            // 꼭짓점이 원형을 띔 (도형이 정중간에 위치) line39~42 (part.01)
            this.stageHeight / 2,
            this.stageHeight / 3,   // 숫가 증가할 수 록 간격 좁아짐 (-> 도형 크기 감소) 
            5 // 각 개수

        );
    }

    animate(){
        window.requestAnimationFrame(this.animate.bind(this));

        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        this.moveX *= 0.92;
        this.polygon.animate(this.ctx, this.moveX);

    }

    onDown(e){
        this.isDown = true;
        this.moveX = 0;
        this.offsetX = e.clientX;

    }

    onMove(e){
        if(this.isDown){
            this.moveX = e.clientX - this.offsetX;
            this.offsetX = e.clientX;
        }
    }

    onUp(e){
        this.isDown = false;    
    }

}

window.onload = () =>{
    new App();
}

// part1 , pqrt2중 선택