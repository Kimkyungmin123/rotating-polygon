const PI2 = Math.PI * 2;


export class Polygon {
    constructor(x, y, radius, sides){
        this.x=x;
        this.y=y;
        this.radius = radius;
        this.sides = sides;
        this.rotate = 0;

    }

    animate(ctx, moveX){
        ctx.save();
        ctx.fillStyle = "#0F135F";
        ctx.beginPath(); // here1

        const angle = PI2 / this.sides;
        
        ctx.translate(this.x, this.y);

        this.rotate -= moveX * 0.008;   // +하면 돌리는 쪽으로 돌아가고, -하면 돌리는 반대 방향으로 돌아감
        ctx.rotate(this.rotate);

        for(let i =0; i < this.sides; i++){
            const x = this.radius * Math.cos(angle * i);
            const y = this.radius * Math.sin(angle * i);



            (i==0)? ctx.moveTo(x,y) : ctx.lineTo(x,y);   // here1

           //  ctx.beginPath();    // here2 
           //  ctx.arc(x, y, 30, 0, PI2, false);   // here2
            // ctx.fill();     // here2
        }
        
        ctx.fill();  // here1
        ctx.closePath(); // here1
        ctx.restore();

    }
}

// here1 주석달고 here2 코드생성하면 다각형대신 각각의 꼭짓점 위치에 점으로 표시됨 
