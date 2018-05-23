import G from './gloable';
export default function Screen5(stage,queue){
	this.stage = stage;
	this.queue = queue;
	this.container = new createjs.Container();
	this.girlAnimate = G.girlAnimate;
	this.stage.addChild(this.container);
	this._init()
}

Screen5.prototype._init = function(){
		G.screenLocked = 5;
        this._bg()
        .then(()=>{
            this._girllights()

            let timmer = setTimeout(()=>{
                this._showText();
                clearTimeout(timmer)
            },1000)
        })
        this._showMeteor();
}

Screen5.prototype._bg = function(){
        this.bg = new createjs.Bitmap(this.queue.getResult('06_bg'));
        this.bg.y = 1810;
        this.container.addChild(this.bg);

        return new Promise ((resolve,reject)=>{
            G.girlAnimate.x = 0;
            G.girlAnimate.y = 2250;
            G.girlAnimate.gotoAndPlay('run');
            createjs.Tween.get(G.girlAnimate)
            .to({
                x: 600
            },5500)
            .call(()=>{
                G.girlAnimate.gotoAndPlay('stand');
                resolve()
            });
            this.container.addChild(G.girlAnimate)
        })

}



Screen5.prototype._girllights = function(){
        let girllights = new createjs.SpriteSheet({
            images:[this.queue.getResult('06_girllights')],
            frames:{
                width: 180,
                height: 150,
                count: 30
             },
             animations:{
                shining:[0,29]
             }

        });
        this.girllightsAnimate = new createjs.Sprite(girllights,'shining');
        this.girllightsAnimate.x = 500;
        this.girllightsAnimate.y = 2200;

        this.container.addChild(this.girllightsAnimate)

}


Screen5.prototype._showText = function(){
    this.text01 = new createjs.Bitmap(this.queue.getResult('06_text01'));
    this.text01.x = 304;
    this.text01.y = 1980;
    this.text01.alpha = 0;
    createjs.Tween.get(this.text01)
    .to({
        y: 2000,
        alpha: 1
    },1000);

    this.text02 = new createjs.Bitmap(this.queue.getResult('06_text02'));
    this.text02.x = 525;
    this.text02.y = 2100;
    this.text02.alpha = 0;
    createjs.Tween.get(this.text02)
    .to({
        y: 2120,
        alpha: 1
    },1000);

    this.container.addChild(this.text01, this.text02);
}


Screen5.prototype._showMeteor = function(){

    //位置
    var meteorPath = [
        [360,0],
        [600,0],
        [1180,0],
        [1400,100]
    ];
    
    //消失位置
    var path = [
        [0,360],
        [240,370],
        [860,330],
        [1150,200]

    ]
    
    
}