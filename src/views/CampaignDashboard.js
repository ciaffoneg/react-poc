import React, { Component } from 'react';
import axios from 'axios';
import Table from '../components/table.js';
import {Link} from 'react-router-dom';
import '../App.css';

export default class CampaignDashboard extends Component {
    constructor(props) {
        super(props);
      this.state = {
        campaigns: [],
        head: ["name","creation","skus","dailyBudget","totalSpent","totalClicks","status","delete"]
      };
    }

    loadCampaignsFromServer() {
        var self = this;
        axios.get(`http://localhost:3004/campaigns`)
        .then(res => {
            self.setState({campaigns: res.data});
        });
    }

    componentDidMount() {
        this.loadCampaignsFromServer();
    }

    render() {
        return (
            <div>
            <Link to='newCampaign'>New campaign</Link>
            <Table data={this.state.campaigns} model="campaigns" head={this.state.head}/>
            </div>
        )
    }

}
