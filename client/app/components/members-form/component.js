import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class MembersFormComponent extends Component {
  @service memberService;
  @service router;

  @action
  async submitMemberForm(event) {
    event.preventDefault();
    const form = event.target;
    const member = {
      name: form.member_name.value,
      role: form.role.value,
      teamId: form.name_teams.value,
    };
    await this.memberService.addMember(member);
    form.reset();
    this.router.transitionTo('/members');
  }

  @action
  async updateMemberForm(event) {
    event.preventDefault();
    const form = event.target;
    const member = {
      id: this.args.member.id,
      name: form.member_name.value,
      role: form.role.value,
      teamId: form.name_teams.value,
    };
    await this.memberService.updateMember(member);
    form.reset();
    this.router.transitionTo('/members');
  }

  get isNotReadOnly() {
    return !this.args?.member?.isReadOnly ?? false;
  }

  get isEdit() {
    return this.args?.member?.isEdit ?? false;
  }
}
