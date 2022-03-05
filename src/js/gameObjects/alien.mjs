/* ALIEN CLASS */
export class Alien extends Phaser.Physics.Arcade.Sprite {
    constructor( scene, x, y, texture, points = 100 ) {
        super( scene, x, y, texture );
        this.points = points;
        
        scene.physics.add.existing(this);
        scene.add.existing(this);

        this.create();
    }

    create() {
        this.setScale(2);
        this.setState('alive')
        this.setCollideWorldBounds(true);
        this.anims.play( this.texture );
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
    }

    bringBack() {
        this.setState('alive');
        this.setActive(true);
        this.setVisible(true);
    }

    collided() {
        this.setState('dead');
        this.setActive(false);
        this.setVisible(false);
    }
}