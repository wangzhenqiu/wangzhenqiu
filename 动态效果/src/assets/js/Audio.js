export default function Audio(src,queue,type='bg'){
    this.type = type;//音乐类型
    this.queue = queue;

    this.src = src;//音乐地址


    this.playState = false;
    this._playControlHtml()
}


Audio.prototype._playControlHtml = function (){
        
            let ctrl = document.createElement('div');
            ctrl.style.position = 'fixed';
            ctrl.style.right = '20px';
            ctrl.style.top = '20px';
            ctrl.style.zIndex = 1000;
            ctrl.className = 'audio';

            let ctrlBtn = document.createElement('span');
            ctrlBtn.style.display = 'block';
            ctrlBtn.style.width = '30px';
            ctrlBtn.style.height = '30px';
            ctrlBtn.style.background = "url('+ this.quque.getResult('audio_btn_on') no-repeat";
            ctrlBtn.style.backgroundSize = '100% 100%';
            ctrlBtn.style.backgroundPosition = 'center center';

            ctrl.appendChild(ctrlBtn);

            document.body.appendChild(this.ctrl);
}




Audio.prototype.play = function(){
    if(this.playState = false){
        let param ={};
        if(this.type = 'bg'){
            param = {loop:-1};
        }
        createjs.Sound.play(this.src,param);
        this.playState = true;
    }
}


Audio.prototype.stop = function(){
    if(this.playState = true){
        createjs.Sound.stop();
        this.playState = false;
    }
}