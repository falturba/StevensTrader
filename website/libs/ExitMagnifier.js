export default class ExitMagnifier{
    constructor () {
        this.oldMaxRadius = 300;
        this.newMaxRadius = 350;
        this.newMagnitudeDiffRadius = this.newMaxRadius - this.oldMaxRadius;

        this.arcRatio = 0.6;
        this.restArcRatio = 1-this.arcRatio;
    }
    getPositionAndScale( objectCenterX, objectCenterY, mouseX, mouseY,i ){
            var returnObject = {};

            var oldDiffFromMouseX =  objectCenterX-mouseX;
            var oldDiffFromMouseY =  objectCenterY-mouseY;

            var oldC = Math.sqrt( oldDiffFromMouseX*oldDiffFromMouseX + oldDiffFromMouseY*oldDiffFromMouseY );
            var newC;

            if( oldC > this.oldMaxRadius ){
                //outside radius 

                newC = oldC + this.newMagnitudeDiffRadius;
                let newDiffFromMouseX = oldC ? oldDiffFromMouseX / oldC * newC : 0;
                let newDiffFromMouseY = oldC ? oldDiffFromMouseY / oldC * newC : 0;

                returnObject.x = newDiffFromMouseX - oldDiffFromMouseX;
                returnObject.y = newDiffFromMouseY - oldDiffFromMouseY;
                returnObject.isInRadius = false;
                returnObject.extraScale = 1;
              
            }else{
                //inside radius
                //---------------------------------------------------------------------------------------------------------
                // I convert the regular distance to angular distance (by ratio) 
                // then find regular distance from the projection of angular distance 
                //1. oldC :is the displacement (ระยะกระจัด) for x and y
                //2. oldC/this.oldMaxRadius : for find the ratio to max
                //3. * Math.PI/2 : for convert the regular distance to angular distance (PI/2 is 1/4 of PI which is full circle )
                //4. sin() : for converting back from angular distance to regular distance (that's already added the magifier).
                //5. this.arcRatio : for cut the arc off
                //6. this.restArcRatio and cos : devide by cos for compare to the max distance (that's already cut the arc)
                var scaleDiffX = Math.sin( oldC/this.oldMaxRadius * Math.PI/2* this.arcRatio ) / Math.cos( this.restArcRatio *Math.PI/2);
                //---------------------------------------------------------------------------------------------------------

                newC = this.newMaxRadius * scaleDiffX;
                let newDiffFromMouseX = oldC ? newC / oldC * oldDiffFromMouseX : 0;
                let newDiffFromMouseY = oldC ? newC / oldC * oldDiffFromMouseY : 0;

                returnObject.x = newDiffFromMouseX-oldDiffFromMouseX;
                returnObject.y = newDiffFromMouseY-oldDiffFromMouseY;
                returnObject.isInRadius = true;
                returnObject.extraScale = scaleDiffX;

            }
            return returnObject;
    }

    
}

/**************************
 ******** example *********
 **************************
 
this.exitMagnifier = new ExitMagnifier();

omponentDidMount(){
    this.skills.forEach( (obj,i)=>{
        this.skills[i].centerX = obj.child.offsetLeft+(obj.child.clientWidth/2);
        this.skills[i].centerY = obj.child.offsetTop+(obj.child.clientHeight/2);
    });
}
onMouseMove = (e)=>{
    //find mouse X Y
    var bounds = e.currentTarget.getBoundingClientRect();
    var mouseX = e.clientX - bounds.left;
    var mouseY = e.clientY - bounds.top;
    this.skills.forEach( (obj,i)=>{

        var animationObject = this.exitMagnifier.getPositionAndScale( obj.centerX, obj.centerY, mouseX, mouseY );
        if( animationObject.isInRadius ){
            this.state.styles[i].scale = 1 + (1-animationObject.extraScale)*.8;
        }else{
            this.state.styles[i].scale = 1;
        }
        this.state.styles[i].x = animationObject.x;
        this.state.styles[i].y = animationObject.y;
        this.setState(this.state);
    });

    //console.log(e.nativeEvent.offsetX);//current object position may be children
    // console.log(e.currentTarget);
    console.log("mouseMove");
}


 */