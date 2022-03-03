/* IMPORTS */
import { PlayerConfig } from '../configs/playerConfig.mjs';
import { Player } from '../gameObjects/player.mjs';
import { Projectile } from '../gameObjects/projectile.mjs';

/* GLOBAL VARIABLES */
let background, cursors, song;
let player, score, lifes;
let bullets = [], delay = 0;
let aliens = [], aliensAlive = [];


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
            key: 'charged_beam',
            frames: this.anims.generateFrameNumbers('charged_beam', {
                start: 0,
                end: 1
            }),
            repeat: -1,
            frameRate: 10
        });

        /* GAME OBJECTS */
        // input
        cursors = this.input.keyboard.createCursorKeys();
        // player
        player = new Player(this, 400, 550, PlayerConfig.key);
        // bullets
        bullets = this.physics.add.group();
        for (let i = 1; i <= 5; i++) {
            bullets.add(new Projectile(this, 50 * i + 50, 480, 'charged_beam', -100));
        }
    
        song = this.sound.add('arrival');
        song.play();

        /* COLLIDERS */
    }

    update( time, delta ) {
        /* Background move */
        background.getChildren().forEach(space => {
            space.x -= 0.1;
            if ( space.x < -960 ) {
                console.log( space );
                space.x += 1920;
            }
        });

        /* PLAYER MOVEMENT */
        player.movement( cursors, delta );

        /* SHOT LOGIC */
        if ( cursors.space.isDown && time > delay ) {
            this.shoot();
            delay = time + 400;
        }
    }

    shoot() {
        // buscamos si existe una bala que no se haya disparado
        const bullet = bullets.getChildren().find(bullet => !bullet.fired);
        if ( !bullet ) return;
            bullet.setPosition(player.x, player.y -15).shoot();
    }
}