/* IMPORTS */
import { PlayerConfig } from '../configs/playerConfig.mjs';
import { Player } from '../gameObjects/player.mjs';
import { Alien } from '../gameObjects/alien.mjs';
import { Projectile } from '../gameObjects/projectile.mjs';

/* GLOBAL VARIABLES */
let background, cursors, song;
let player, score, lifes;
let bullets = [], delay = 0;
let aliens = [], alienSpeed, alienDistance = 0, alienDir = 1;

/* GAME SCENE CLASS */
export class GameScene extends Phaser.Scene
{
    constructor() {
        super({ key: 'GameScene', active: false });
    }

    preload() {
        /* ASSETS GAME SCENE */
        console.log("Loading GameScene...");

        // audio
        this.load.audio('arrival', '/src/assets/audio/themes/arrival.wav');
        // images
        this.load.image('space', '/src/assets/ui/space-bg.png');
        this.load.image('square', '/src/assets/images/square.png');
        // sprites
        this.load.spritesheet(PlayerConfig.key, PlayerConfig.url, PlayerConfig.config);
        this.load.spritesheet(
            'alan',
            '/src/assets/sprites/enemies/alan.png',
            {
                frameWidth: 16, frameHeight: 16
            }
        );
        this.load.spritesheet(
            'bon',
            '/src/assets/sprites/enemies/bon.png',
            {
                frameWidth: 16, frameHeight: 16
            }
        );
        this.load.spritesheet(
            'lips',
            '/src/assets/sprites/enemies/lips.png',
            {
                frameWidth: 16, frameHeight: 16
            }
        );
        this.load.spritesheet(
            'charged_beam',
            '/src/assets/sprites/projectiles/player-charged-beam.png',
            {
                frameWidth: 16, frameHeight: 16
            }
        );
    }

    create() {
        console.log('GameScene Loaded!');

        /* GAME DESIGN */
        background = this.add.group([
            this.add.image(0, 300, 'space').setFlipX(true).setOrigin(0, 0.5),
            this.add.image(960, 300, 'space').setFlipX(true).setOrigin(0, 0.5)
        ]);

        /* ANIMATIONS */
        this.anims.create({
            key: 'alan',
            frames: this.anims.generateFrameNumbers('alan', {
                frames: [0, 0, 1, 2, 3, 4, 5, 0, 0]
            }),
            repeat: -1,
            frameRate: 10
        });
        this.anims.create({
            key: 'bon',
            frames: this.anims.generateFrameNumbers('bon', {
                frames: [0, 0, 1, 2, 3, 0, 0]
            }),
            repeat: -1,
            frameRate: 10
        });
        this.anims.create({
            key: 'lips',
            frames: this.anims.generateFrameNumbers('lips', {
                frames: [0, 0, 1, 2, 3, 4, 0, 0]
            }),
            repeat: -1,
            frameRate: 10
        });
        this.anims.create({
            key: 'charged_beam',
            frames: this.anims.generateFrameNumbers('charged_beam', {
                start: 0, end: 1
            }),
            repeat: -1,
            frameRate: 10
        });

        /* GAME OBJECTS */
        // input
        cursors = this.input.keyboard.createCursorKeys();
        // player
        player = new Player(this, 400, 550, PlayerConfig.key);
        // aliens
        alienSpeed = Phaser.Math.GetSpeed(alienDistance, 1);
        aliens = this.physics.add.group();
        for (let i = 0; i < 6; i++) {
            const key = ['alan', 'bon', 'bon', 'lips', 'lips', 'lips'];
            for (let j = 1; j <= 10; j++) {
                aliens.add(new Alien(this, 50 * j, -300 + 35 * i, key[i]));
            }
        }
        this.timeline = this.tweens.timeline({
            tweens: [
                {
                    targets: aliens.getChildren().reverse(),
                    y: '+= 400',
                    duration: 1000,
                    delay: this.tweens.stagger(100)
                },
                {
                    targets: aliens.getChildren(),
                    y: '-=15',
                    duration: 500,
                    delay: this.tweens.stagger(10),
                    repeat: 2,
                    yoyo: true,
                    repeatDelay: 1000,
                    onStart: this.Counter,
                    onComplete: this.StartGame
                }
            ]
        });
        // bullets
        bullets = this.physics.add.group();
        for (let i = 1; i <= 1; i++) {
            bullets.add(new Projectile(this, 50 * i + 50, 480, 'charged_beam', -250));
        }
    
        song = this.sound.add('arrival');
        song.play();

        /* COLLIDERS */
        this.physics.add.overlap(bullets, aliens, this.alienHit,null, this);
    }

    update( time, delta ) {
        
        this.background();

        if ( player.state === 'alive' ) {
            player.movement( cursors, delta );
            // shot logic
            if ( cursors.space.isDown && time > delay ) {
                this.shoot();
                delay = time + 400;
            }
        }
    
        /* ALIEN MOVEMENT */
        this.alienMove( delta );
    }

    Counter() {
        console.log('Count...');
    }

    StartGame() {
        console.log('Start Game!');
        alienDistance = 10;
        alienSpeed = Phaser.Math.GetSpeed(alienDistance, 1);
        player.setState('alive');
    }

    /* Background move */
    background() {
        background.getChildren().forEach(space => {
            space.x -= 0.1;
            if ( space.x < -960 ) {
                console.log( space );
                space.x += 1920;
            }
        });
    }

    /* PLAYER SHOOT */
    shoot() {
        // buscamos si existe una bala que no se haya disparado
        const bullet = bullets.getChildren().find(bullet => !bullet.fired);
        if ( !bullet ) return;
            bullet.setPosition(player.x, player.y -15).shoot();
    }

    /* ALIEN MOVEMENT */
    alienMove( delta ) {
        // logica del movimiento del alien
        aliens.getChildren().forEach(alien => {
            // no se hacemos nada si el alien esta muerto
            if ( alien.state === 'dead' ) return;
                alien.x += alienSpeed * alienDir * delta;
                if ( alien.x < 50 || alien.x > 750 ) {
                    this.changeAlienDir();
                    aliens.getChildren().forEach(alien => alien.y += 30);
                    alien.x += alienSpeed * alienDir * delta;
                };
        });
    }

    // change alien direction
    changeAlienDir() {
        alienDir *= -1;
    }

    alienHit(bullet, alien) {
        if ( alien.state === 'dead' || !bullet.fired ) return;
            bullet.collided();
            alien.collided();
            alienDistance += 1.5;
            alienSpeed = Phaser.Math.GetSpeed(alienDistance, 1);
            console.log('hit!');
    }
}