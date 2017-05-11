import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';



export default class Campaign extends Component {
    constructor(props) {
        super(props);
        this.state = {
        status: 'active'
      };
      this.handleDelete = this.handleDelete.bind(this);
      this.handleChangeChk = this.handleChangeChk.bind(this);
    }
    handleChangeChk () {
        var nextStatus = this.state.status === 'active' ? 'pause' : 'active';
        var self = this,
            currentUrl = 'http://localhost:3004/campaigns/'+this.props.campaign.id;
        axios.put(currentUrl, {
                name: self.props.campaign.name,
                status: nextStatus
            })
        .then(res => {
            self.setState({status: nextStatus})
        });
    }

    handleDelete() {
    var self = this,
        currentUrl = 'http://localhost:3004/campaigns/'+this.props.campaign.id;
    axios.put(currentUrl, {
            name: self.props.campaign.name,
            status: 'deleted'
        })
    .then(res => {
        self.setState({status: 'deleted'})
    });

  }

    render() {
        if (this.state.status==='deleted' || this.props.campaign.status === 'deleted') return null;
        else return (
          <tr className={ `row-status-${this.state.status}` }>
            <td><Link to={'/campaign/'+this.props.campaign.id }>{this.props.campaign.name}</Link></td>
            <td>{this.props.campaign.creation}</td>
            <td>{this.props.campaign.skus}</td>
            <td>{this.props.campaign.dailyBudget}</td>
            <td>{this.props.campaign.totalSpent}</td>
            <td>{this.props.campaign.totalClicks}</td>
            <td>
                {this.state.status} <input type="checkbox"  checked={this.state.status === 'active'} onChange={this.handleChangeChk}/>
            </td>
            <td>
                <button className="btn btn-info" onClick={this.handleDelete}>Delete</button>
            </td>
          </tr>);
      }
};
