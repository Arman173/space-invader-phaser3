/* IMPORTS */
import { PlayerConfig } from '../configs/playerConfig.mjs';

/* PLAYER CLASS */
export class Player extends Phaser.Physics.Arcade.Sprite {

    constructor( scene, x, y, texture ) {
        super( scene, x, y, texture, 1 );

        scene.physics.add.existing(this);
        scene.add.existing(this);

        this.create();
    }

    create() {
        this.setScale(2);
        this.setState('undefined');
        this.setCollideWorldBounds(true);
        this.speed = Phaser.Math.GetSpeed(200, 1);

        this.scene.anims.create(PlayerConfig.animationsConfig.idle);
        this.scene.anims.create(PlayerConfig.animationsConfig.rigth);
        this.scene.anims.create(PlayerConfig.animationsConfig.left);
    }

    movement( cursors, delta ) {
        if (cursors.left.isDown)
        {
            this.x -= this.speed * delta;
            this.anims.play('left');
        }
        else if (cursors.right.isDown)
        {
            this.x += this.speed * delta;
            this.anims.play('right');
        }
        else {
            this.anims.play('idle');
        }
    }
}