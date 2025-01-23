import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class MemberTableRoute extends Route {
  @service memberService;

  queryParams = {
    view: {
      refreshModel: true,
    },
    edit: {
      refreshModel: true,
    },
  };

  async model(params) {
    const memberId = params.member_id;
    const isReadOnly = params.view === 'readonly';
    await this.memberService.fetchMemberById(memberId, isReadOnly, params.edit);
    return this.memberService.member;
  }
}
