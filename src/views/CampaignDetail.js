import React, { Component } from 'react';
import axios from 'axios';
import Table from '../components/table.js';
import {Link} from 'react-router-dom';
import '../App.css';

export default class CampaignDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selecteds: [],
            name: "",
            dailyBudget: "",
            status: "",
            head: ["name","sku","price","stock","cpc"]
      };
    }

    loadCampaignsFromServer() {
        var self = this,
            url = `http://localhost:3004/campaigns/` + this.props.match.params.id;
        axios.get(url)
        .then(res => {
            self.setState({selecteds: res.data.selecteds});
            self.setState({name: res.data.name});
            self.setState({dailyBudget: res.data.dailyBudget});
            self.setState({status: res.data.status});
        });
    }

    componentDidMount() {
        this.loadCampaignsFromServer();
    }

    render() {
        return (
            <div>
                <p>Name: {this.state.name}</p>
                <p>Daily Budget: {this.state.dailyBudget}</p>
                <p>Status: {this.state.status}</p>
                <Table data={this.state.selecteds} model="sponsored" head={this.state.head} readonly={true}/>
                <Link to='/campaignDashboard'>Go back</Link>
            </div>
        )
    }

}
