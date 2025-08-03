

 export class PreloadScene extends Phaser.Scene {
    constructor() {
        super("PreloadScene")
    }

        preload(){
            this.load.image("bg", "/assets/bg.png")
            this.load.image("arrow", "/assets/arrow2.png")
            this.load.image("ballon", "/assets/ballon2.png")
        }

        create(): void{
            this.scene.start("MainScene")
    }
}


