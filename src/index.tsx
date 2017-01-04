import * as React from "react";
import * as ReactDOM from "react-dom";

class Test extends React.Component<any, undefined>{
    render(){
        return <h1>Hello </h1>
    }
}

ReactDOM.render(
    <Test compiler="Typescript" framework="React"/>,
    document.getElementById('test')
)