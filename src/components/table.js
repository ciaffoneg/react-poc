import React, { Component } from 'react';
import Campaign from '../components/campaign.js';
import Sponsored from '../components/sponsored.js';

export default class Table extends Component {
    render() {
        var rows = [],
            headTable = [],
            that = this;
            this.props.head.forEach(function(head) {
              headTable.push(<th key={head}>{head}</th>);
            });
        if (this.props.model === "campaigns") {
            this.props.data.forEach(function(data) {
              rows.push(<Campaign campaign={data} key={data.id}/>);
            });
        } else if (this.props.model === "sponsored") {
            this.props.data.forEach(function(data) {
              rows.push(<Sponsored sponsored={data} key={data.id} array={that.props.selecteds} readonly={that.props.readonly}/>);
            } );
        }

        return (
            <div className="container">
            <table className="table table-striped">
              <thead>
                <tr>
                  {headTable}
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </table>
          </div>);
      }
};
