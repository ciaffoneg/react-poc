import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import Table from '../components/table.js';

export default class CampaignNew extends Component {

    constructor(props) {
        super(props);

        this.state = {
            sponsored: [],
            selecteds: [],
            name: 'Default Name',
            dailyBudget: 250,
            head:["name","sku","price","stock","cpc"]
        };

        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeDailyBudget = this.handleChangeDailyBudget.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeName(event) {
       this.setState({name: event.target.value});
     }

     handleChangeDailyBudget(event) {
        this.setState({dailyBudget: event.target.value});
      }

     handleSubmit(event) {
         var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1;
        var yyyy = today.getFullYear();

        if(dd<10) {
            dd='0'+dd
        }

        if(mm<10) {
            mm='0'+mm
        }
        today = yyyy+'-'+mm+'-'+dd;
        var self = this;
         axios.post('http://localhost:3004/campaigns', {
                 name: self.state.name,
                 dailyBudget: self.state.dailyBudget,
                 status:"active",
                 selecteds: self.state.selecteds,
                 creation:today,
                 skus:self.state.selecteds.length,
                 totalSpent:0,
                 totalClicks:0
             })
         .then(res => {
             self.setState({name: res.data.name});
             self.setState({dailyBudget: res.data.dailyBudget});
             self.props.history.push('CampaignDashboard');
         });
       event.preventDefault();
     }

    loadSponsoredFromServer() {
        var self = this;
        axios.get(`http://localhost:3004/sponsoreds`,{headers : {
            'Content-Type': 'text/plain'
        }})
        .then(res => {
            self.setState({sponsored: res.data});
        });
    }

    componentDidMount() {
        this.loadSponsoredFromServer();
    }

    render() {
        return (
            <div>
            <form onSubmit={this.handleSubmit}>
                <label>
                  Name:
                  <input type="text" value={this.state.name} onChange={this.handleChangeName} />
                </label>
                <label>
                  Daily Budget:
                  <input type="text" value={this.state.dailyBudget} onChange={this.handleChangeDailyBudget} />
                </label>
                <input type="submit" value="send"/>
              </form>
            <Table data={this.state.sponsored} model="sponsored" selecteds={this.state.selecteds} head={this.state.head} readonly={false}/>
            </div>
        )
    }

}
