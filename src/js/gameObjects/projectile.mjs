
/* PROJECTILE CLASS */
export class Projectile extends Phaser.Physics.Arcade.Sprite {
    constructor( scene, x, y, texture, speed = -100, fired = false ) {
        super( scene, x, y, texture );
        this.speed = speed;
        this.fired = fired;
        
        scene.physics.add.existing(this);
        scene.add.existing(this);

        this.create();
    }

    create() {
        this.setScale(2);
        this.fired ? this.shoot() : this.collided();
        this.speed < 0 ? this.setFlipY(false) : this.setFlipY(true);
        this.anims.play( this.texture );
    }

    preUpdate( time, delta ) {
        super.preUpdate( time, delta );

        if ( this.y < 20 || this.y > 580 ) {
            this.collided();
        }
    }

    shoot() {
        this.fired = true;
        this.setVelocityY(this.speed);
        this.setActive(true);
        this.setVisible(true);
    }

    collided() {
        this.fired = false;
        this.setVelocityY(0);
        this.setActive(false);
        this.setVisible(false);
    }
}