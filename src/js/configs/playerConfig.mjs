export const PlayerConfig = {
    key: 'ship',
    url: '/src/assets/sprites/ship/player-ship.png',
    config: {
        frameWidth: 16,
        frameHeight: 16
    },
    animationsConfig: {
        idle: {
            key: 'idle',
            frames: [ { key: 'ship', frame: 1 } ],
            frameRate: 20
        },
        rigth: {
            key: 'right',
            frames: [ { key: 'ship', frame: 2 } ],
            frameRate: 20
        },
        left: {
            key: 'left',
            frames: [ { key: 'ship', frame: 0 } ],
            frameRate: 20
        }
    }
}