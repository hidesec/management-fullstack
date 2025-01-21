import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class MembersTableComponent extends Component {
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
}
