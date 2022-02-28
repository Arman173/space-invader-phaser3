
/* PROJECTILE CLASS */
export class Projectile extends Phaser.Physics.Arcade.Sprite {
    constructor( scene, x, y, texture, speed ) {
        super( scene, x, y, texture );
        this.speed = speed;
        
        scene.physics.add.existing(this);
        scene.add.existing(this);

        this.create();
    }

    create() {
        this.setScale(2);
        this.speed = Phaser.Math.GetSpeed(this.speed, 1);
    }

    preUpdate( time, delta ) {
        this.y -= this.speed * delta;
        if ( this.y < -50 ) {
            this.setActive(false);
            this.setVisible(false);
        }
    }
}