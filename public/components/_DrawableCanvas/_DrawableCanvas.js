import React from 'react';//react
import { SketchPicker } from 'react-color';


function getOffset(el) {
  el = el.getBoundingClientRect();
  return {
    left: el.left + window.scrollX,
    top: el.top + window.scrollY
  }
}




import CheckboxOrRadioGroup from '../_CheckboxOrRadioGroup/_CheckboxOrRadioGroup.js';

//TODO
/*
the issue was calculating offset was wrong.
Now that is fixed and I need to establish a way to change color
To change brush size
And add the bucket feature.
Add an undo feature.
I need to also as a feature where certain strokes can be of a different alpha.
Then I need to save this image as a png without a background.


*/

export default class extends React.Component{
  constructor(props){
        super(props);
        //
        //default styles
        this.canvasStyles = this.props.canvasStyles || {
            border: '1px solid black'
        };
        this.containerStyles = this.props.containerStyles || {
            width: '100%',
            height: '60vh',
            minHeight: '400px',
            display: 'inline-block',
            backgroundColor: 'white'
        };


//        this.paint = false;
//        this.clickX = new Array();
//        this.clickY = new Array();
//        this.clickDrag = new Array();
        this.canvas;
         this.state = {
            color: '#000000',
            lineWidth: 4,
            clickX: new Array(),
            clickY : new Array(),
            clickDrag : new Array(),
            paint: false,
            currentMoveSet: -1,
            moves: []
         };


//        this.current ={
//            x: null,
//            y: null,
//            color: '#000000'
//        };



        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.redraw = this.redraw.bind(this);
        this.addClick = this.addClick.bind(this);
        this.handleBrushSizeChange = this.handleBrushSizeChange.bind(this);
        this.clearCanvas = this.clearCanvas.bind(this);
        this.undoStroke = this.undoStroke.bind(this);
        this.changeBrushColor = this.changeBrushColor.bind(this);
        this.createMove = this.createMove.bind(this);
        this.addToMove = this.addToMove.bind(this);

  }

  createMove(myX, myY, c, w){
      var m = {
          currentPath: [
              {
                  x: myX,
                  y: myY
              }
          ],
          color: c,
          lineWidth: w
      }
      return m;
  }

  addClick(x, y, dragging){
        this.setState({
//            clickX: this.state.clickX.concat(x),
//            clickY: this.state.clickY.concat(y),
            moves: this.state.moves.concat(this.createMove(x, y, this.state.color, this.state.lineWidth)),
            clickDrag: this.state.clickDrag.concat(dragging),
            currentMoveSet: ++this.state.currentMoveSet
        }, function(){
            this.redraw();
        });

  }

  addToMove(newX, newY){

    var newState = Object.assign({}, this.state);
    newState.moves[this.state.currentMoveSet].currentPath.push({x: newX, y: newY});

    this.setState(newState, function(){
        console.log('STATE ', this.state);
        this.redraw();
    });

  }

  changeBrushColor(e){
    var hex = e.hex;
    this.setState({
        color: hex
    });
  }

  clearCanvas(e){
    e.preventDefault();
    this._context.clearRect(0, 0, this._context.canvas.width, this._context.canvas.height); // Clears the canvas
    this.setState({
        clickX: new Array(),
        clickY: new Array(),
        clickDrag: new Array(),
    });
  }

  componentDidMount(){

    this._context = document.getElementById(this.props.canvasId).getContext("2d");
    this.canvas = this._context.canvas;
    this.resizeCanvas();
    var that = this;
    window.addEventListener('resize', function(){
        that.resizeCanvas();
    });
    this.resizeCanvas();


  }

  handleBrushSizeChange(e){
    console.log('radio ', e);
    this.setState({lineWidth: parseInt(e.target.value)});
  }

  handleMouseDown(e){
     var mouseX = e.pageX - getOffset(this.canvas).left;
     var mouseY = e.pageY - getOffset(this.canvas).top;



     this.setState({
        paint: true
     }, function(){
        this.addClick(mouseX, mouseY);

     });

  }

  handleMouseEnter(){
    console.log('mouse enter')
    this.props.mouseE();
  }

  handleMouseLeave(){
    this.props.mouseL();
    console.log('mouse leave')
    this.setState({paint: false})
  }

  handleMouseMove(e){
       var mouseX = e.pageX - getOffset(this.canvas).left;
       var mouseY = e.pageY - getOffset(this.canvas).top;
    if(this.state.paint){
        this.addToMove(mouseX, mouseY);

    }
  }

  handleMouseUp(){
    console.log('mouse up')
    this.setState({paint: false});
  }

  redraw(){
    console.log('in redraw?')
    var cm = this.state.moves[this.state.currentMoveSet];


//      for(var i=0; i < cm.currentPath.length; i++) {
        var lg = cm.currentPath.length;
        this._context.beginPath();
        this._context.strokeStyle = cm.color;
        this._context.lineJoin = "round";
        this._context.lineWidth = cm.lineWidth

//        console.log('redraw ', cm)
        if(lg <= 1){
            this._context.moveTo(cm.currentPath[0].x, cm.currentPath[0].y);
        } else {
            this._context.moveTo(cm.currentPath[lg-2].x, cm.currentPath[lg-2].y);
        }
        this._context.lineTo(cm.currentPath[lg-1].x, cm.currentPath[lg-1].y);
        this._context.closePath();
        this._context.stroke();

        //TODO 1-5-18  add undo and redo



//      for(var i=0; i < this.state.clickX.length; i++) {
//        this._context.beginPath();
//        this._context.strokeStyle = this.state.color;
//        this._context.lineJoin = "round";
//        this._context.lineWidth = this.state.lineWidth
//
//        //for creating a dot or a line
//        if(this.state.clickDrag[i] && i){
//          this._context.moveTo(this.state.clickX[i-1], this.state.clickY[i-1]);
//        }else{
//          this._context.moveTo(this.state.clickX[i]-1, this.state.clickY[i]);
//        }
//
//         this._context.lineTo(this.state.clickX[i], this.state.clickY[i]);
//         this._context.closePath();
//         this._context.stroke();
//      }
    }

  resizeCanvas(){
    var width = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;

  //  var height = window.innerHeight
  //  || document.documentElement.clientHeight
  //  || document.body.clientHeight;

    if(width >767){
      this.canvas.height = 400;
      this.canvas.width = 400;
    } else {
      this.canvas.height = this.canvas.parentElement.clientHeight;
      this.canvas.width = this.canvas.parentElement.clientWidth;
    }
    }

  undoStroke(e){
      e.preventDefault();
      alert('Undo functionality coming soon...');

    }
//
//  drawLine(x0, y0, x1, y1, color){
//    console.log('in here');
//    console.log(x0 + ' '+ y0 + ' '+ x1 + ' ' + y1 + ' ' + color)
//      this._context.beginPath();
//      this._context.moveTo(x0, y0);
//      this._context.lineTo(x1, y1);
//      this._context.strokeStyle = color;
//      this._context.lineWidth = 2;
//      this._context.stroke();
//      this._context.closePath();
//  }



  render(){
  	return(
	    <div onMouseEnter={this.props.mouseE}
	         onMouseLeave={this.props.mouseL}>
		    <div style={this.containerStyles}>
		        <canvas style={this.canvasStyles}
                		id={this.props.canvasId}
                		onMouseMove={this.handleMouseMove}
                		onTouchMove={this.handleMouseMove}
                        onMouseEnter={this.handleMouseEnter}
                        onTouchCancel={this.handleMouseLeave}
                		onMouseLeave={this.handleMouseLeave}
                		onTouchEnd={this.handleMouseUp}
                		onMouseUp={this.handleMouseUp}
                		onTouchStart={this.handleMouseDown}
                		onMouseDown={this.handleMouseDown}>
                </canvas>
		    </div>
		    <div id={`colorpicker${this.props.canvasId}`} className="collapse">
		        <SketchPicker onChangeComplete={this.changeBrushColor}
		                      onChange={this.changeBrushColor}
		                      color={this.state.color}/>
		    </div>
    	    <div id={`brushsize${this.props.canvasId}`} className="collapse">
    	        <CheckboxOrRadioGroup showLegend={true}
    	                              legend="Select Brush Size"
    	                              setName="brushSize"
    	                              type="radio"
    	                              controlFunc={this.handleBrushSizeChange}
    	                              options={[1,2,3,4,5,6]}
    	                              selectedOptions={[this.state.lineWidth]}/>
    	    </div>
            <ul className="nav nav-fill">
                 <li className="nav-item">
                        <a className="nav-link" data-toggle="collapse" href={`#colorpicker${this.props.canvasId}`}>
                            <i className="fa fa-tint" aria-hidden="true"></i>
                            <span className="sr-only">
                                select color
                            </span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="collapse" href={`#brush${this.props.canvasId}`}>
                            <i className="fa fa-paint-brush" aria-hidden="true"></i>
                            <span className="sr-only">
                                select brush
                            </span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="collapse" href={`#brushsize${this.props.canvasId}`}>
                            <i className="fa fa-arrows-h" aria-hidden="true"></i>
                            <span className="sr-only">
                                select brush size
                            </span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" onClick={this.undoStroke} href={`#undo${this.props.canvasId}`}>
                            <i className="fa fa-undo" aria-hidden="true"></i>
                            <span className="sr-only">
                                undo
                            </span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link alert-danger" onClick={this.clearCanvas} href="#clearCanvas">
                            <i className="fa fa-trash-o" aria-hidden="true"></i>
                            <span className="sr-only">clear canvas</span>
                        </a>
                    </li>
            </ul>
	    </div>
    );
  }
}