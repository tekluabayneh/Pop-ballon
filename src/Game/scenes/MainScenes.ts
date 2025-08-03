
const size ={
    width:500,
    height:500
}

export class MainScene extends Phaser.Scene {
    public player!: Phaser.Physics.Arcade.Image
    public cursor!: Phaser.Types.Input.Keyboard.CursorKeys
    public playSpeed:number
    public target! :Phaser.Physics.Arcade.Image
    public balloons!: Phaser.Physics.Arcade.Group;
    public TextScore!:Phaser.GameObjects.Text
    public Score!: number 
    public IsGameOver!: boolean
    public Remaningtime!:number
    public RemaningtimeText!: Phaser.GameObjects.Text

    constructor(playSpeed:number) {
        super("MainScene")
        this.playSpeed = playSpeed+500
        this.Score = 0
        this.IsGameOver= false
        this.Remaningtime = 50
    }

create(): void {
    this.Score = 0;
    this.IsGameOver = false;
    this.Remaningtime = 50;

    const bg = this.add.image(0, 0, "bg").setOrigin(0, 0);
    bg.setDisplaySize(this.scale.width, this.scale.height);

    this.player = this.physics.add.image(200, size.height - 100, "arrow").setOrigin(0, 0).setScale(0.5);
    this.player.setImmovable(true);
    (this.player.body as Phaser.Physics.Arcade.Body).allowGravity = false;
    this.player.setCollideWorldBounds(true);

    this.cursor = this.input.keyboard?.createCursorKeys();
    this.balloons = this.physics.add.group();

    this.TextScore = this.add.text(10, 10, "Score: 0", { fontSize: "20px" });
    this.RemaningtimeText = this.add.text(10, 30, `Remaining time: ${this.Remaningtime}`, { fontSize: "20px" });

    this.physics.add.overlap(this.player, this.balloons, (arrow, balloon) => {
        balloon.destroy();
        this.Score++;
        this.TextScore.setText(`Score: ${this.Score}`);
    });

    // Balloon spawn
    this.time.addEvent({
        delay: 400,
        callback: this.spawnBalloon,
        callbackScope: this,
        loop: true,
    });

    this.time.addEvent({
        delay: 1000,
        callback: () => {
            if (this.Remaningtime > 0) {
                this.Remaningtime--;
                this.RemaningtimeText.setText(`Remaining time: ${this.Remaningtime}`);
            }

            if (this.Remaningtime === 0 && !this.IsGameOver) {
                this.GameOver();
            }
        },
        callbackScope: this,
        loop: true,
    });
}


    spawnBalloon() {
        const balloon = this.balloons.create( Phaser.Math.Between(50, 800), 0, "ballon") as Phaser.Physics.Arcade.Image;
        balloon.setScale(0.5);
        balloon.setVelocityY(100);

    }



    update() :void{

        const {left,right} = this.cursor
        this.RemaningtimeText.setText(`Remaningtime: ${this.Remaningtime}`)
        if(left.isDown){
            this.player.setVelocityX(-this.playSpeed)
            return 
        }else if(right.isDown){
            this.player.setVelocityX(this.playSpeed)
            return 
        }else{ 
            this.player.setVelocityX(0)
        }
    }



GameOver(): void {
    this.IsGameOver = true;

    // pause the game
    this.physics.pause();
    this.tweens.killAll();

    const message = this.Score > 50 ? "🎉 You Win!" : "💀 Game Over";
    this.add.text(150, 200, message, {
        fontSize: "48px",
        color: "#ffffff",
        fontFamily: "Arial",
        backgroundColor: "#222",
        padding: { x: 20, y: 10 },
        align: "center"
    });

    this.add.text(160, 270, "Restarting...", {
        fontSize: "24px",
        color: "#333"
    });

    // Restart after delay
    this.time.delayedCall(1000, () => {
        this.scene.restart();
    });
}
}
