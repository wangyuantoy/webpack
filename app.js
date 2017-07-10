import React, {Component} from 'react'
import {render} from 'react-dom';
import './src/css.css';

class Greet extends Component {
    render (){
        return (
            <p>
              hello world!
            </p>
        )
    }
}
function component() {
    var element = document.createElement('div');
    element.id = 'root';
    return element;
}

document.body.appendChild(component());
render(<Greet />, document.getElementById('root'));