import React, { Component } from 'react';

export default class Sponsored extends Component {

    constructor(props) {
        super(props);
        this.handleChangeChk = this.handleChangeChk.bind(this);
    }

    handleChangeChk (event) {
        if (event.target.checked) {
            this.props.array.push(this.props.sponsored);
        } else {
            var index = this.props.array.indexOf(this.props.sponsored);
            if (index > -1) {
                this.props.array.splice(index, 1);
            }
        }
    }

    render() {
        if (this.props.readonly === true) {
            return(<tr>
                    <td>{this.props.sponsored.name}</td>
                    <td>{this.props.sponsored.sku}</td>
                    <td>{this.props.sponsored.price}</td>
                    <td>{this.props.sponsored.stock}</td>
                    <td>{this.props.sponsored.cpc}</td>
                  </tr>);
        } else {
            return(<tr>
                    <td><input type="checkbox" onChange={this.handleChangeChk}/></td>
                    <td>{this.props.sponsored.name}</td>
                    <td>{this.props.sponsored.sku}</td>
                    <td>{this.props.sponsored.price}</td>
                    <td>{this.props.sponsored.stock}</td>
                    <td>{this.props.sponsored.cpc}</td>
                  </tr>);
        }

  }
};
