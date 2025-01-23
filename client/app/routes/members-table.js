import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class MembersTableRoute extends Route {
  @service memberService;

  async model() {
    await this.memberService.fetchMembers();
    return this.memberService.members;
  }
}
