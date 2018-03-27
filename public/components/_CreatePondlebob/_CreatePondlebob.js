import React from 'react';//react library via npm
import SwipableViews from 'react-swipeable-views';//swipeable component via npm



//custom components
import SingleInput from '../_SingleInput/_SingleInput.js';//text,email,number,password input

//custom views
import DrawPondlebob from '../../react_views/DrawPondlebob/DrawPondlebob.js';//draw pondlebob view
import AttributeGame from '../_AttributeGame/_AttributeGame.js';//attribute game view
import CreateMove from '../_CreateMove/_CreateMove.js';//create move view

//test styles
const styles = {

  slide: {
    padding: 15,
    minHeight: 100,
    color: '#fff',
  },
  slide1: {
    backgroundColor: '#FEA900',
  },
  slide2: {
    backgroundColor: '#B3DC4A',
    color: '#0c0c0c'
  },
  slide3: {
    backgroundColor: '#6AC0FF',
  },
};



export default class CreatePondlebob extends React.Component{
    constructor(props){
        super(props);

        this.handleInput = this.handleInput.bind(this);
        this.handlePost = this.handlePost.bind(this);
        this.goBack = this.goBack.bind(this);
        this.goForward = this.goForward.bind(this);
        this.handleChangeIndex = this.handleChangeIndex.bind(this);

        this.state = {
            formSection: 0,
            moveNames:null,
            disableSwipe: true


        };

        this.getMoves = this.getMoves.bind(this);
        this.swipeOff = this.swipeOff.bind(this);
        this.swipeOn = this.swipeOn.bind(this);

        this.getMoves();
    }

    //CLASS METHODS

    //fetch moves and animations
    getMoves(){
        var self = this;
         fetch("api/create-pondlebob", {
                    method: "GET",
                    headers: {
                    bearer: this.props.token            }
                })
                .then(function(res){ return res.json(); })
                .then(function(data){
                    console.log(data);
                    self.setState({moveNames: data.moves, moveAnimations: data.animations});

                });
    }
    //go back a swipeable view
    goBack(){
        this.setState({formSection: --this.state.formSection});
    }
    //go forward a swipeable view
    goForward(){
        this.setState({formSection: ++this.state.formSection});
    }
    //sync up index change with button press or swipe for swipeable view
    handleChangeIndex(formSection){
        this.setState({
          formSection
        });
    };

    //handle user input for form fields
    /*
        @param {Event} - event from user input
    */
    handleInput(e){
    console.log(e);
        var target = e.currentTarget;
        var val = target.value;
        var name = target.name;
        var obj = {};
//        var id = target.getAttribute('data-triggerbutton');
//        if(id){
//            if(val.length > 0) {
//                this.state.showButtonNext[id] = true;
//                this.setState(this.state);
//            } else {
//                this.state.showButtonNext[id] = false;
//                this.setState(this.state);
//            }
//        }

        obj[name] = val;

        this.setState(obj);

    }

    //handle post when pondlebob is finally created
    /*
        @param {Event} - event from user input on form post
    */
    handlePost(e){

        e.preventDefault();

        console.log(this.props.token)
        var postBody = {};
        postBody.name = this.state.name;
        postBody.nickName = this.state.nickname;
        console.log(postBody)
        fetch('home/api/pondlebob', {
          method: 'post',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            bearer: this.props.token
          },
          body: JSON.stringify(postBody)


        }).then(res=>res.json())
          .then(res => console.log(res));
    }

    //turn on the swipe for swipeable views
    swipeOn(){
        console.log('SWIPE AWAY')
        this.setState({disableSwipe: false});
    }
    //turn off the swipe for swipeable views
    swipeOff(){
        console.log('CANNOT SWIPE')
        this.setState({disableSwipe: true});
    }

    //render the view
    render(){
        return(
            <form action="/lineup" method="post" name="addpondlebob" id="addpondlebob">



                <SwipableViews index={this.state.formSection}
                               onChangeIndex={this.handleChangeIndex}
                               enableMouseEvents
                               disabled={this.state.disableSwipe}
                               resistance={true}>
                    <div style={Object.assign({}, styles.slide, styles.slide1)}>
                        <DrawPondlebob swipeOff={this.swipeOff} swipeOn={this.swipeOn}/>
                    </div>

                    <div style={Object.assign({}, styles.slide, styles.slide1)}>
                        <div className="row">
                            <div className="col-sm-6">
                                <SingleInput name="pondlebobName"
                                             placeholder="name..."
                                             label="Pondlebob Name"
                                             inputType="text"
                                             required={true}
                                             value=""
                                             controlFunc={this.handleInput}/>
                            </div>


                            <div className="col-sm-6">
                                <SingleInput name="nickname"
                                             placeholder="nickname..."
                                             label="Nickname"
                                             inputType="text"
                                             required={false}
                                             value=""
                                             controlFunc={this.handleInput}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <button type="button" className="btn float-right" onClick={this.goForward}> Next </button>
                            </div>
                        </div>
                    </div>

                    <div style={Object.assign({}, styles.slide, styles.slide2)}>
                        <div className="row">
                            <div className="col-sm-6">
                                <p>Let's determine how many Attribute Points you get to give to {this.state.name}</p>
                                <p>You get 3 numbers from 1-5.  Try to stop the button on the highest number</p>
                            </div>

                        </div>
                        <div className="row">
                            <div className="col-12">
                                <AttributeGame/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                               <button className="btn" type="button" onClick={this.goBack}> Prev </button>
                            </div>
                        </div>


                    </div>

                    <div style={Object.assign({}, styles.slide, styles.slide1)}>
                        <div className="row">
                            <div className="col-12">
                                <CreateMove moveNames={this.state.moveNames} id="moveOne"/>
                            </div>
                        </div>
                    </div>
                </SwipableViews>


                <pre>App State: <br /><br/>{JSON.stringify(this.state,0,2)}</pre>

                <button id="addNew" onClick={this.handlePost}>
                    Submit Pondlebob
                </button>
            </form>


        );
    }

}


