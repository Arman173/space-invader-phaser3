/* IMPORTS */
import { PlayerConfig } from '../configs/playerConfig.mjs';
import { ProjectilesConfig } from '../configs/projectilesConfig.mjs';
import { Player } from '../gameObjects/player.mjs';
import { Projectile } from '../gameObjects/projectile.mjs';

/* GLOBAL VARIABLES */
let background, cursors, song;
let player, score, lifes, bullet;
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
        // sprites
        this.load.spritesheet(PlayerConfig.key, PlayerConfig.url, PlayerConfig.config);
        this.load.spritesheet('beam', '/src/assets/sprites/projectiles/player-beam.png', { frameWidth: 16, frameHeight: 16 });
    }

    create() {
        /* GAME DESIGN */
        background = this.add.group([
            this.add.image(0, 300, 'space').setFlipX(true).setOrigin(0, 0.5),
            this.add.image(960, 300, 'space').setFlipX(true).setOrigin(0, 0.5)
        ]);

        /* GAME OBJECTS */
        cursors = this.input.keyboard.createCursorKeys();

        player = new Player(this, 400, 525, PlayerConfig.key);

        bullet = new Projectile(this, 400, 500, 'beam', 200);
        
        this.anims.create({
            key: 'beam',
            frames: [ { key: 'beam', frame: 1 } ],
            frameRate: 20
        });
    
        song = this.sound.add('arrival');
        song.play();
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
    }
}