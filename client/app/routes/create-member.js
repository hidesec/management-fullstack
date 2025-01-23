import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class CreateMemberRoute extends Route {
  @service teamService;

  async model() {
    await this.teamService.fetchTeams();
    return this.teamService.teams;
  }
}
