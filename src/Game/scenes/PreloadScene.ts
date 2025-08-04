import bgImg from "./../../../public/assets/bg.png"
import arrowImg from "../../../public/assets/arrow2.png"
import ballonImg from "../../../public/assets/ballon2.png"

export class PreloadScene extends Phaser.Scene {
    constructor() {
        super("PreloadScene")
    }

    preload() {
        this.load.image("bg", bgImg)
        this.load.image("arrow", arrowImg)
        this.load.image("ballon", ballonImg)
    }

    create(): void {
        this.scene.start("MainScene")
    }
}
