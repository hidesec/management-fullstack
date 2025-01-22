import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class TeamTableComponent extends Component {
  @service teamService;

  @action
  initializeTable(element) {
    $(element).DataTable({
      responsive: true,
      dom: '<"top"lf>rt<"bottom"ip><"clear">',
      language: {
        lengthMenu: 'Show _MENU_ entries',
        info: 'Showing _START_ to _END_ of _TOTAL_ entries',
        paginate: {
          first: 'First',
          last: 'Last',
          next: 'Next',
          previous: 'Previous',
        },
      },
    });
  }

  @action
  clearAlert() {
    this.teamService.clearAlert();
  }

  get teams() {
    return this.args.data || [];
  }
}
