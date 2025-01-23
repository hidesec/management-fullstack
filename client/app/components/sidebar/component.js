import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { equal, or } from '@ember/object/computed';

export default class SidebarComponent extends Component {
  @service router;

  @tracked currentRoute = '';

  constructor() {
    super(...arguments);

    // Subscribe to routeDidChange event
    this.router.on('routeDidChange', this.handleRouteChange);
    this.updateActiveLink(this.router.currentRoute);
  }

  @action
  handleRouteChange(transition) {
    this.updateActiveLink(transition.to);
  }

  updateActiveLink(route) {
    if (route) {
      this.currentRoute = route.name;
    }
  }

  @or('isIndexRoute', 'isCreateTeamRoute', 'isViewTeamRoute')
  isIndexOrCreateTeamRoute;
  @equal('currentRoute', 'index') isIndexRoute;
  @equal('currentRoute', 'create-team') isCreateTeamRoute;
  @equal('currentRoute', 'view-team') isViewTeamRoute;
  @or('isMembersRoute', 'isCreateMemberRoute', 'isViewMemberRoute')
  isMembersOrCreateMemberRoute;
  @equal('currentRoute', 'members-table') isMembersRoute;
  @equal('currentRoute', 'create-member') isCreateMemberRoute;
  @equal('currentRoute', 'view-member') isViewMemberRoute;
}
