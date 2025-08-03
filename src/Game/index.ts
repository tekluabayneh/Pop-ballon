import Phaser from "phaser"
import { MainScene } from "./scenes/MainScenes"
import { PreloadScene } from "./scenes/PreloadScene"

const size ={
width:750,
height:500
}



const config:Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: size.width,
  height: size.height,
   parent:"app",
  scene: [PreloadScene, new MainScene(200)],
  physics: { 
    default: "arcade",
    arcade: {
      gravity: { y: 300},
      // debug: true
    }
  }
};

function CreateGame (){
  return new Phaser.Game(config)
}
export default CreateGame



