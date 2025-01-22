import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class TeamsFormComponent extends Component {
  @service teamService;
  @service router;

  @action
  async submitForm(event) {
    event.preventDefault();
    const form = event.target;
    const team = {
      name: form.team_name.value,
      description: form.description.value,
    };
    await this.teamService.addTeam(team);
    form.reset();
    this.router.transitionTo('/');
  }

  get isNotReadOnly() {
    return !this.args?.team?.isReadOnly ?? false;
  }
}
