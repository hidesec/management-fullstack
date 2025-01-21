import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
  @service teamTableService;

  async model() {
    await this.teamTableService.fetchTeams();
    return this.teamTableService.teams;
  }
}
