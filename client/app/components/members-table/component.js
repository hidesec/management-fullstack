import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class MembersTableComponent extends Component {
  @service memberService;

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
    this.memberService.clearAlert();
  }

  @action
  async deleteMember(memberId) {
    if (confirm('Are you sure you want to delete this member?')) {
      await this.memberService.deleteMember(memberId);
      await this.memberService.fetchMembers();
      this.refreshTable();
    }
  }

  @action
  refreshTable() {
    let table = $('#membersTable').DataTable();
    let formattedData = this.memberService.members.map((member, index) => [
      index + 1,
      member.name,
      member.role,
      member.teams.name,
      `<a href="/view-member/${member.id}" class="btn btn-primary btn-sm"><i class="bi bi-eye"></i> view</a>` +
        `<a href="/view-member/${member.id}?edit=true" class="btn btn-warning btn-sm"><i class="bi bi-pencil-square"></i> edit</a>` +
        `<a class="btn btn-danger btn-sm" data-member-id="${member.id}"><i class="bi bi-trash"></i> delete</a>`,
    ]);
    table.clear().rows.add(formattedData).draw();

    // Attach the delete event handler
    $('#membersTable').on('click', '.btn-danger', (event) => {
      event.preventDefault();
      let memberId = $(event.currentTarget).data('member-id');
      this.deleteMember(memberId);
    });
  }

  get members() {
    return this.args.data || [];
  }
}
