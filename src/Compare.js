import React from 'react'

class Compare extends React.Component {
    constructor(props) {
        super(props)
        // this.state={
        //     value:this.props.location.state,
        // }
        if (this.props.location) {
            console.log(this.props.location)
        } else {
            console.log('no state')
        }
    }
    // alertMessage(){
    //     console.log(this.props.location.state.id);
    // }
    render() {
        return (<div>hi</div>)
        // return (
        //     <>
        //     hi
        //     {/* the below is the id we are accessing */}

        //     hay! I am detail no {this.props.location.state.id} and my name is 
        //     {this.props.location.state.name}

        //     <br/>
        //     <br/>

        //     {/* press me to see the log in your browser console */}
        //     <button onClick={()=>{this.alertMessage()}}>click me to see log</button>

        //     </>
        // )
    }
}

export default Compare
