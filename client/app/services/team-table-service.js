import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import config from 'management-frontend/config/environment';

export default class TeamTableService extends Service {
  @tracked teams = [];

  async fetchTeams() {
    try {
      const response = await fetch(config.PROXY_URL + '/api/teams');
      const data = await response.json();
      this.teams = data;
    } catch (error) {
      console.error('Error fetching teams:', error);
    }
  }
}
