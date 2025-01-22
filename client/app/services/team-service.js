import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import config from 'management-frontend/config/environment';

export default class TeamService extends Service {
  @tracked teams = [];
  @tracked alertMessage = null;

  async fetchTeams() {
    try {
      const response = await fetch(config.PROXY_URL + '/api/teams');
      const data = await response.json();
      this.teams = data;
    } catch (error) {
      console.error('Error fetching teams:', error);
    }
  }

  clearAlert() {
    this.alertMessage = null;
  }

  async addTeam(team) {
    try {
      const response = await fetch(config.PROXY_URL + '/api/teams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(team),
      });
      const data = await response.json();
      this.teams = [...this.teams, data];
      this.alertMessage = `Team "${data.name}" has been successfully added!`;
    } catch (error) {
      console.error('Error adding team:', error);
    }
  }
}
