import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import CampaignDashboard from './views/CampaignDashboard.js';
import CampaignNew from './views/CampaignNew.js';
import CampaignDetail from './views/CampaignDetail.js';

ReactDOM.render(
    <Router>
        <div>
        <Route name="campaignDashboard" path="/campaignDashboard" component={CampaignDashboard} />
        <Route name="newCampaign" path="/newCampaign" component={CampaignNew} />
        <Route name="CampaignDetail" path="/campaign/:id" component={CampaignDetail} />
        </div>
  </Router>,
  document.getElementById('root')
);
