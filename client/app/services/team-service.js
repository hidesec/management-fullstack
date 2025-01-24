import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import config from 'management-frontend/config/environment';

export default class TeamService extends Service {
  @tracked teams = [];
  @tracked team = null;
  @tracked alertMessage = null;
  @tracked alertMessageCode = null;

  async fetchTeams() {
    try {
      const response = await fetch(config.PROXY_URL + '/api/teams');
      const data = await response.json();
      console.log('data', data);
      this.teams = data;
    } catch (error) {
      console.error('Error fetching teams:', error);
    }
  }

  async fetchTeamById(teamId, isReadOnly, isEdit) {
    try {
      const response = await fetch(`${config.PROXY_URL}/api/teams/${teamId}`);
      const data = await response.json();
      data.isReadOnly = isReadOnly;
      data.isEdit = isEdit;
      this.team = data;
    } catch (error) {
      console.error('Error fetching team by ID:', error);
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
          Accept: 'application/json',
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

  async updateTeam(team) {
    try {
      const response = await fetch(`${config.PROXY_URL}/api/teams/${team.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(team),
      });
      const data = await response.json();
      this.team = data;
      this.alertMessage = `Team "${data.name}" has been successfully updated!`;
      this.alertMessageCode = 200;
    } catch (error) {
      console.error('Error updating team:', error);
    }
  }

  async deleteTeam(teamId) {
    try {
      const deleteUser = await fetch(
        `${config.PROXY_URL}/api/teams/${teamId}`,
        {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
          },
        }
      );
      this.teams = this.teams.filter((team) => team.id !== teamId);
      if (deleteUser.status === 200) {
        this.alertMessageCode = 200;
        this.alertMessage = `Team has been successfully deleted!`;
      } else {
        this.alertMessageCode = 500;
        this.alertMessage = `Team has been not successfully deleted! Please check members relation!`;
      }
    } catch (error) {
      console.error('Error deleting team:', error);
    }
  }
}
