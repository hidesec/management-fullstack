import EmberRouter from '@ember/routing/router';
import config from 'management-frontend/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('index', { path: '/' });
  this.route('create-team');
  this.route('members-table', { path: '/members' });
  this.route('create-member');
  this.route('view-team', { path: '/view-team/:team_id' });
});
