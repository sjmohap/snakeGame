import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: {
    '(document:keydown)': 'handleKeyboardEvents($event)'
  }
})
export class AppComponent {
  title = 'snakeGame';
  board: number[];
  x: any=0;
  y: any=0;
  size: any = 3;
  velX: number = 1;
  velY: number = 0;
  boardSize: any = 100;
  fruitX: number;
  fruitY: number;
  fruitSize: number = 2;
  score = 0;
  snakeSize: number = 1;
  snakeArray = [];
  ngOnInit() {
    this.generateBoard(this.boardSize);
    this.generateFruit();
    setInterval(()=>{this.snakeMovement()},10);
  }
  generateBoard(number) {
    this.board = Array(number).fill(0);
    const x = this.x;
    const y = this.y;
    this.snakeArray.push([x,y]);
  }
  generateFruit() {
    this.fruitX = Math.floor((Math.random() * this.boardSize) + 1);
    this.fruitY = Math.floor((Math.random() * this.boardSize) + 1);
  }

  isFruit(i, j) {
    if(this.cubeCondition(i,j, this.fruitX, this.fruitY, this.fruitSize)){
      return true;
    }
    return false;
  }

  isSnake(i, j) {
    if(this.cubeCondition(i,j, this.x, this.y, this.size)) {
      return true;
    } else{
      return false;
    }
  }

  cubeCondition(i, j, x, y, size) {
    if(x <= i && i <= x + size) {
      if(y <= j && j <= y + size) {
        return true;
    }
    return false;
  }
  return false;
  }

  snakeMovement() {
    this.x = this.x + this.velX;
    this.y = this.y + this.velY;
    this.handleBoundaryCases();
    this.handleAfterFruit();
  }


  handleBoundaryCases(): any {
    if(this.x >= this.board.length) {
      this.x = 0
    } else if ( this.x < 0) {
      this.x = this.board.length -1;
    }

    if(this.y >= this.board.length) {
      this.y = 0
    } else if ( this.y < 0) {
      this.y = this.board.length -1;
    }
  }
  handleKeyboardEvents(event) {
    if(event.keyCode === 38){
      this.velX = -1;
      this.velY = 0;
    } else if(event.keyCode === 39){
      this.velX = 0;
      this.velY = 1;
    } else if(event.keyCode === 40){
      this.velX = 1;
      this.velY = 0;
    } else if(event.keyCode === 37){
      this.velX = 0;
      this.velY = -1;
    }
  }

  handleAfterFruit() {
    if(this.cubeCondition(this.x,this.y,this.fruitX,this.fruitY,this.fruitSize)){
      this.generateFruit();
      this.score = this.calculateScore(this.score, this.fruitSize, this.velX, 1,0)
      this.snakeSize +=1;
    }
  }

  calculateScore(
    prevScore,
    fruitSize, 
    velocity, 
    currentLength, 
    bonusTimeRemaining?) {
   return prevScore +
          fruitSize + 
          velocity*(currentLength+bonusTimeRemaining);
}
  

}
