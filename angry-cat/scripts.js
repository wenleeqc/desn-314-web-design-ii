/*
cat can catch other animals
- bird
- bug
    - spider
    - fly
- furball, string, dustball
- human hand
- yarn ball
- squirrel
- laser pointer
- spider
*/


window.addEventListener('load', () => {
    const canvas = document.querySelector('#canvas');
    const context = canvas.getContext('2d');
    // canvas.width = 900;
    // canvas.height = 600;
    canvas.width = 1920;
    canvas.height = 1080;

    const catPaw = document.querySelector('.paw');
    const bird = document.querySelector('.bird');
    const birdInactive = document.querySelector('.bird-inactive');
    const fly = document.querySelector('.fly');
    const flyInactive = document.querySelector('.fly-inactive');
    const hand = document.querySelector('.hand');
    const handInactive = document.querySelector('.hand-inactive');
    const mouseRight = document.querySelector('.mouse-right');
    const mouseRightInactive = document.querySelector('.mouse-right-inactive');
    const mouseLeft = document.querySelector('.mouse-left');
    const mouseLeftInactive = document.querySelector('.mouse-left-inactive');
    const mousePop = document.querySelector('.mouse-pop-1');
    const mousePopInactive = document.querySelector('.mouse-pop-1-inactive');
    const mousePop2 = document.querySelector('.mouse-pop-2');
    const mousePop2Inactive = document.querySelector('.mouse-pop-2-inactive');
    const squirrel = document.querySelector('.squirrel');
    const squirrelInactive = document.querySelector('.squirrel-inactive');
    const spider = document.querySelector('.spider');
    const spiderInactive = document.querySelector('.spider-inactive');
    const hole = document.querySelector('.hole');
    const holeBottom = document.querySelector('.hole-bottom');
    const wallRightFront = document.querySelector('.wall-right-front');
    const wallRightBack = document.querySelector('.wall-right-back');
    const wallRightHole = document.querySelector('.wall-right-hole');
    const catFood = document.querySelector('.cat-food');
    const planter = document.querySelector('.planter');
    const lamp = document.querySelector('.lamp');
    const vase = document.querySelector('.vase');
    const sofa = document.querySelector('.sofa');
    const background = document.querySelector('.background');

    class InputHandler {
        constructor(game) {
            this.game = game;
            window.addEventListener('keydown', (event) => {
                console.log(event.key);
            });
        }
    }

    class Paw {
        constructor(game) {
            this.game = game;
            this.width = 155;
            this.height = 150;
            this.x = 0;
            this.y = 0;
            // this.imageWidth = 50;
            // this.imageHeight = 500;
            // this.xOffset = 100;
            // this.yOffset = 100;
            // this.hitBox = [];
            //this.speedY = 0;
            // canvas.addEventListener('mousemove', (event) => {
            //     //console.log(event.clientX);
            //     console.log(event.offsetX, event.offsetY);
            //     // this.x = event.offsetX;
            //     this.x = event.offsetX;
            //     this.y = event.offsetY;
            // });
        }

        draw(context) {
            //console.log('draw', this.x, this.y);
            context.fillRect(this.x, this.y, this.width, this.height);
            //context.drawImage(catPaw, this.x - this.xOffset, this.y - this.yOffset, 271, 600);
            context.drawImage(catPaw, this.x, this.y, 157, 1100);

            //console.log(`width: ${this.x - this.xOffset} - ${this.x - this.xOffset + this.width}`);
            //console.log(`height: ${this.y - this.yOffset} - ${this.y - this.yOffset + this.height}`);
        }
    }

    class Enemy {
        constructor(game, xStart, yStart, xEnd, yEnd, width, height, interval, waitTime, stepX, stepY) {
            this.game = game;
            this.width = width;
            this.height = height;
            this.xStart = xStart;
            this.yStart = yStart;
            this.xEnd = xEnd;
            this.yEnd = yEnd;
            this.xCurrent = xStart;
            this.yCurrent = yStart;
            this.xRate = stepX;
            this.yRate = stepY;
            this.stepX = stepX;
            this.stepY = stepY;
            this.timer = 0;
            this.interval = interval;
            this.waitTimer = 0;
            this.waitTime = waitTime;
            this.isActive = false;
        }

        draw(context, img, imgInactive, imgWidth, imgHeight, xOffset=0, yOffset=0) {
            context.fillRect(this.xCurrent, this.yCurrent, this.width, this.height);
            if(this.isActive) {
                context.drawImage(img, this.xCurrent - xOffset, this.yCurrent - yOffset, imgWidth, imgHeight);
            } else {
                context.drawImage(imgInactive, this.xCurrent - xOffset, this.yCurrent - yOffset, imgWidth, imgHeight);
            }
            
        }

        update() {
            //console.log(this.isActive, this.xCurrent, this.yCurrent)

            // interval timer
            // wait time before object is active
            if(!this.isActive && this.start()) {
                //console.log('start timer',this.timer);
                if(this.timer < this.interval) {
                    this.timer += 10;
                } else {
                    //console.log('turn true')
                    this.timer = 0;
                    this.stepX = this.xRate;
                    this.stepY = this.yRate;
                    this.isActive = true;
                }
            }

            // hold timer
            // wait time before moving back to start position
            if(this.wait()) {
                if(this.waitTimer <= this.waitTime) {
                    //console.log('check timer');
                    this.waitTimer += 5;
                } else {
                    //this.isMovingForward = false;
                    this.waitTimer = 0;
                    this.stepX = this.xRate * 3;
                    this.stepY = this.yRate * 3;
                    this.isActive = false;
                    //console.log('is not active', this.isActive);
                }
            }

            /*
            start < end: moving right or moving down
            end < start: moving left or moving up
            */
            if(this.isActive) {
                this.moveLong(this.xEnd);
                this.moveLat(this.yEnd);
            } else {
                this.moveLong(this.xStart);
                this.moveLat(this.yStart);
            }
            //console.log('active? ', this.isActive, 'x curr: ', this.xCurrent, 'y curr', this.yCurrent, 'wait timer', this.waitTimer, 'interval timer', this.timer, 'x step', this.stepX);
        }

        start() {
            let xHold = false;
            let yHold = false;

            if(this.xStart < this.xEnd) {
                //console.log('here')
                if(this.xCurrent <= this.xEnd) {
                    xHold = true;
                }
            } else {
                //console.log('here 2')
                if(this.xCurrent >= this.xEnd) {
                    xHold = true;
                }
            }

            if(this.yStart < this.yEnd) {
                if(this.yCurrent <= this.yEnd) {
                    yHold = true;
                }
            } else {
                if(this.yCurrent >= this.yEnd) {
                    yHold = true;
                }
            }

            if(xHold && yHold) {
                return true;
            } else {
                return false;
            }
        }

        wait() {
            let xHold = false;
            let yHold = false;

            if(this.xStart < this.xEnd) {
                if(this.xCurrent >= this.xEnd) {
                    xHold = true;
                }
            } else {
                if(this.xCurrent <= this.xEnd) {
                    xHold = true;
                }
            }

            if(this.yStart < this.yEnd) {
                if(this.yCurrent >= this.yEnd) {
                    yHold = true;
                }
            } else {
                if(this.yCurrent <= this.yEnd) {
                    yHold = true;
                }
            }

            if(xHold && yHold) {
                return true;
            } else {
                return false;
            }
        }

        moveLong(destination) {
            if(this.xCurrent < destination) {
                this.xCurrent += this.stepX;
            }

            if(this.xCurrent > destination) {
                this.xCurrent -= this.stepX;
            }
        }

        moveLat(destination) {
            if(this.yCurrent < destination) {
                this.yCurrent += this.stepY;
            }

            if(this.yCurrent > destination) {
                this.yCurrent -= this.stepY;
            }
        }
    }

    class UI {
        constructor(game) {
            this.game = game;
            this.fontSize = 100;
            this.fontFamily = 'Arial';
            this.color = 'white';
        }

        draw(context) {
            context.save();

            context.fillStyle = this.color;
            context.shadowOffsetX = 5;
            context.shadowOffsetY = 5;
            context.shadowBlur = 5;

            // score
            context.shadowColor = 'black';
            context.font = this.fontSize + 'px ' + this.fontFamily;
            context.fillText('Score: ' + this.game.score, 820, 140);

            // time
            //const time = (this.game.gameTime * 0.001).toFixed(0);
            const time = Math.ceil((this.game.gameTime * 0.001));

            if(time > 3) {
                context.fillStyle = 'yellow';
            } else {
                context.fillStyle = 'red';
            }
            
            context.fillText('Timer: ' + time, 100, 140);

            if(this.game.gameOver) {
                context.textAlign = 'center';
                context.font = 200 + 'px ' + this.fontFamily;
                context.fillText('Game Over!', this.game.width * 0.5, this.game.height * 0.5);
            }

            context.restore();
        }
    }



    class Game {
        constructor(width, height) {
            this.width = width; 
            this.height = height;
            this.x = 0;
            this.y = 0;
            this.ui = new UI(this);
            this.paw = new Paw(this);
            // (game, xStart, yStart, xEnd, yEnd, width, height, interval, waitTime, stepX, stepY)
            this.bird = new Enemy(this, 500, 120, 640, 120, 100, 230, 600, 900, 10, 10);
            this.fly = new Enemy(this, 400, 970, 455, 970, 30, 30, 300, 1500, 1, 1); 
            this.hand = new Enemy(this, 1920, -220, 1200, 500, 250, 250, 1000, 1000, 15, 15);
            this.mouse1 = new Enemy(this, 30, 500, 200, 500, 100, 100, 800, 800, 5, 5);
            this.mouse2 = new Enemy(this, 800, 830, 800, 670, 100, 100, 700, 500, 6, 6);
            this.mouse3 = new Enemy(this, 1550, 990, 1550, 840, 110, 100, 500, 300, 7, 7);
            this.mouse4 = new Enemy(this, 1800, 500, 1500, 500, 100, 90, 1400, 900, 5, 5);
            this.spider = new Enemy(this, 1080, -40, 1080, 40, 50, 50, 900, 600, 4, 4);
            this.squirrel = new Enemy(this, 1600, 170, 1300, 170, 180, 250, 900, 1100, 10, 10);
            this.enemies = [this.mouse1, this.mouse2, this.mouse3, this.mouse4, this.fly, this.bird, this.hand, this.spider, this.squirrel];
            this.score = 0;
            this.gameOver = false;
            this.gameTime = 10000;


            canvas.addEventListener('mousemove', (event) => {
                const xPosOffset = canvas.width / canvas.offsetWidth;
                const yPosOffset = canvas.height / canvas.offsetHeight;
                //console.log(event.clientX);
                console.log(event.offsetX, event.offsetY);
                // this.x = event.offsetX;
                this.paw.x = event.offsetX * xPosOffset;
                this.paw.y = event.offsetY * yPosOffset;
            });

            window.addEventListener('click', (event) => {
                // const xPosOffset = canvas.width / canvas.offsetWidth;
                // const yPosOffset = canvas.height / canvas.offsetHeight;
                // console.log('adjusted x', this.paw.x * xPosOffset);
                // console.log('adjusted y', this.paw.y * yPosOffset);
                // this.paw.x = this.paw.x * xPosOffset;
                // this.paw.y = this.paw.y * yPosOffset;

                console.log(`clicked: ${this.paw.x}, ${this.paw.y}`);
                console.log(canvas.getBoundingClientRect());
                console.log('offset width', canvas.offsetWidth);
                console.log('offset height', canvas.offsetHeight);
                console.log('client x', event.clientX - canvas.getBoundingClientRect().left);
                // console.log('x offset', xPosOffset);
                // console.log('y offset', yPosOffset);
                // console.log('adjusted x', this.paw.x * xPosOffset);
                // console.log('adjusted y', this.paw.y * yPosOffset);
                this.enemies.forEach( (enemy) => {
                    if(enemy.isActive) {
                        //console.log(this.checkHit(this.paw, enemy), enemy);
                        // if hit toggle to not active
                        if(this.checkHit(this.paw, enemy)) {
                            enemy.stepX = enemy.xRate * 3;
                            enemy.stepY = enemy.yRate * 3;
                            // enemy.yCurrent = enemy.yStart;
                            enemy.isActive = false;
                            enemy.waitTimer = 0;
                            if(!this.gameOver) {
                                this.score++;
                            }
                            console.log('score', this.score);
                        }
                    }
                });
            });
        }

        checkHit(rect1, rect2) {
            return (
                rect1.x < rect2.xCurrent + rect2.width &&
                rect1.x  + rect1.width > rect2.xCurrent &&
                rect1.y  < rect2.yCurrent + rect2.height &&
                rect1.height + rect1.y > rect2.yCurrent
            )
        }

        update(deltaTime) {
            if(!this.gameOver) {
                this.gameTime -= deltaTime;
            }

            if(this.gameTime <= 0) {
                this.gameOver = true;
            }
    
            this.mouse1.update();
            this.mouse2.update();
            this.mouse3.update();
            this.mouse4.update();
            this.fly.update();
            this.bird.update();
            this.hand.update();
            this.spider.update();
            this.squirrel.update();            
        }

        draw(context) {
            context.drawImage(wallRightHole, 133, 460);
            context.drawImage(wallRightBack, 193, -1038);
            this.mouse1.draw(context, mouseLeft, mouseLeftInactive, 298, 150, 200);
            context.drawImage(wallRightFront, -600, -750);

            context.drawImage(background, 600, -165, 1010, 517);
            
            this.bird.draw(context, bird, birdInactive, 202, 270, 100); // 300, 269 
            this.squirrel.draw(context, squirrel, squirrelInactive, 500, 380, 0, 130); // 600, 455

            // back wall
            context.save();
            context.fillStyle = 'yellow';
            context.fillRect(350, 350, 2000, 142);
            context.fillRect(350, 0, 250, 490);
            context.fillRect(1600, 0, 350, 490);
            context.restore();

            // window border
            context.save();
            context.fillStyle = "#DBD500";
            context.fillRect(590, 0, 10, 350);
            context.fillRect(1600, 0, 10, 350);
            context.fillRect(580, 350, 1040, 15);
            context.restore();

            this.spider.draw(context, spider, spiderInactive, 60, 329, 5, 270);

             // lamp shadow
             context.save()
             context.fillStyle = '#0000ce';
             context.beginPath();
             context.ellipse(500, 560, 170, 35, 0, 60, 100);
             context.fill();
             context.closePath();
             context.restore();

            context.drawImage(lamp, 350, -250);
            
            this.mouse4.draw(context, mouseRight, mouseRightInactive, 251, 90);

            // sofa shadow
            context.save();
            context.fillStyle = "#0000ce";
            context.beginPath();
            context.moveTo(1600,630);
            context.lineTo(1800,530);
            context.lineTo(2400,1000);
            context.lineTo(2360,1100);
            context.fill();
            context.closePath();
            context.restore();
            context.drawImage(sofa, 1550, 200);

            context.drawImage(hole, 700, 750);
            this.mouse2.draw(context, mousePop, mousePopInactive, 159, 240, 25);
            context.drawImage(holeBottom, 705, 790);

            context.drawImage(hole, 1450, 900);
            this.mouse3.draw(context, mousePop2, mousePop2Inactive, 123, 200, 8);
            context.drawImage(holeBottom, 1455, 940);

            // planter shadow
            context.save()
            context.fillStyle = '#0000ce';
            context.beginPath();
            context.ellipse(259, 1000, 230, 60, 0, 60, 100);
            context.fill();
            context.closePath();
            context.restore();
            
            this.fly.draw(context, fly, flyInactive, 60, 41, 30);
            context.drawImage(planter, 50, 650, 424, 400);
            
            // cat food shadow
            context.save()
            context.fillStyle = '#0000ce';
            context.beginPath();
            context.ellipse(1331, 780, 110, 35, 0, 60, 100);
            context.fill();
            context.closePath();
            context.restore();

            context.drawImage(catFood, 1230, 560, 200, 241);
            this.hand.draw(context, hand, handInactive, 1200, 1400, 100, 1070);
            this.paw.draw(context);

            //this.ui.draw(context);
        }
    }

    const game = new Game(canvas.width, canvas.height);
    // console.log('canvas bounding box', canvas.getBoundingClientRect());
    let prevTime = 0;
    let start = false;

    function animate(timeStamp) {
        const deltaTime = timeStamp - prevTime;
        prevTime = timeStamp;
        context.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(context);

        // if(!game.gameOver) {
        //     window.requestAnimationFrame(animate);
        // }
        window.requestAnimationFrame(animate);

        // if(game.gameOver) {
        //     //context.clearRect(0, 0, canvas.width, canvas.height);
        //     this.ui.draw(context);
        // }
    }
        animate(0);
});