import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import config from 'management-frontend/config/environment';

export default class MemberService extends Service {
  @tracked members = [];
  @tracked member = null;
  @tracked alertMessage = null;
  @tracked alertMessageCode = null;

  async fetchMembers() {
    try {
      const response = await fetch(config.PROXY_URL + '/api/members?filter={"include": "teams"}');
      const data = await response.json();
      this.members = data;
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  }

  async fetchMemberById(memberId, isReadOnly, isEdit) {
    try {
      const response = await fetch(
        `${config.PROXY_URL}/api/members/${memberId}?filter={"include": "teams"}`
      );
      const responseTeams = await fetch(config.PROXY_URL + '/api/teams');
      const dataTeams = await responseTeams.json();
      const data = await response.json();
      data.isReadOnly = isReadOnly;
      data.isEdit = isEdit;
      data.teams = dataTeams;
      this.member = data;
    } catch (error) {
      console.error('Error fetching member by ID:', error);
    }
  }

  clearAlert() {
    this.alertMessage = null;
  }

  async addMember(member) {
    try {
      const response = await fetch(config.PROXY_URL + '/api/members', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(member),
      });
      const data = await response.json();
      this.members = [...this.members, data];
      this.alertMessage = `Member "${data.name}" has been successfully added!`;
    } catch (error) {
      console.error('Error adding member:', error);
    }
  }

  async updateMember(member) {
    try {
      const response = await fetch(
        `${config.PROXY_URL}/api/members/${member.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(member),
        }
      );
      const data = await response.json();
      this.members = this.members.map((m) => (m.id === data.id ? data : m));
      this.alertMessage = `Member "${data.name}" has been successfully updated!`;
    } catch (error) {
      console.error('Error updating member:', error);
    }
  }

  async deleteMember(memberId) {
    try {
      const response = await fetch(
        `${config.PROXY_URL}/api/members/${memberId}`,
        {
          method: 'DELETE',
        }
      );
      if (response.status === 204 || response.status === 200) {
        this.members = this.members.filter((member) => member.id !== memberId);
        this.alertMessage = 'Member has been successfully deleted!';
      }
    } catch (error) {
      console.error('Error deleting member:', error);
    }
  }
}
