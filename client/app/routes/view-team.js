import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ViewTeamRoute extends Route {
  @service teamService;

  queryParams = {
    view: {
      refreshModel: true,
    },
    edit: {
      refreshModel: true,
    },
  };

  async model(params) {
    const teamId = params.team_id;
    const isReadOnly = params.view === 'readonly';
    await this.teamService.fetchTeamById(teamId, isReadOnly, params.edit);
    return this.teamService.team;
  }
}
