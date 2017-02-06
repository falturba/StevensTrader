/**
 * HOW TO USE :
 *  var fps = new FPS();
    var fpsOut = document.getElementById('fps');
    setInterval(function(){
        fpsOut.innerHTML = fps.getFPS() + " fps";
    },1000);
 */
export default class FPS{
    constructor () {
        this.defaultTimeInterval = 1000/30;
        this.filterStrength = 20;

        this.frameTime = 0;
        this.lastLoop = new Date();
        this.thisLoop;

        console.log('FPS is running...');
        setInterval( ()=>{
            var thisFrameTime = (this.thisLoop=new Date) - this.lastLoop;
            this.frameTime+= (thisFrameTime - this.frameTime) / this.filterStrength;
            this.lastLoop = this.thisLoop;
            if(this.callback){
                this.callback();
            }
        },this.defaultTimeInterval);
    }

    set callbackFunction(_callback){
        this.callback = _callback;
    }

    setDefaultTimeInterval(_fps){
        this.defaultTimeInterval = 1000/_fps;
    }

    getFPS(){
        return (1000/this.frameTime).toFixed(1);
    }
}