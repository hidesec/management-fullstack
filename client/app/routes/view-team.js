import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ViewTeamRoute extends Route {
  @service teamService;

  async model(params) {
    const teamId = params.team_id;
    await this.teamService.fetchTeamById(teamId, true);
    return this.teamService.team;
  }
}
