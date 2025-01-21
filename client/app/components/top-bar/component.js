import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class TopBarComponent extends Component {
  @service router;

  @tracked pageTitle = 'Teams';

  constructor() {
    super(...arguments);

    // Subscribe to routeDidChange event
    this.router.on('routeDidChange', this.handleRouteChange);
    this.updateTitle(this.router.currentRoute);
  }

  @action
  handleRouteChange(transition) {
    this.updateTitle(transition.to);
  }

  updateTitle(route) {
    if (route && route.name === 'create-team') {
      this.pageTitle = 'Create Team';
    } else if (route && route.name === 'members-table') {
      this.pageTitle = 'Members';
    } else if (route && route.name === 'create-member') {
      this.pageTitle = 'Create Member';
    } else {
      this.pageTitle = 'Teams';
    }
  }
}
