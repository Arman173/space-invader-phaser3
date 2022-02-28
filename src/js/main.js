import { MenuScene } from "./scenes/menuScene.mjs";
import { GameScene } from "./scenes/gameScene.mjs";
import { PauseScene } from "./scenes/pauseScene.mjs";
import { GameoverScene } from "./scenes/gameoverScene.mjs";

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene: [ /* MenuScene */ GameScene, PauseScene, GameoverScene ]
};

const game = new Phaser.Game(config);