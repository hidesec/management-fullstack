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

  @action
  async deleteTeam(teamId) {
    if (confirm('Are you sure you want to delete this team?')) {
      await this.teamService.deleteTeam(teamId);
      await this.teamService.fetchTeams();
      this.refreshTable();
    }
  }

  @action
  refreshTable() {
    let table = $('#teamsTable').DataTable();
    let formattedData = this.teamService.teams.map((team) => [
      team.id,
      team.name,
      team.description,
      `<a href="/view-team/${team.id}" class="btn btn-primary btn-sm"><i class="bi bi-eye"></i> view</a>` +
        `<a href="#" class="btn btn-warning btn-sm"><i class="bi bi-pencil-square"></i> edit</a>` +
        `<a class="btn btn-danger btn-sm" data-team-id="${team.id}"><i class="bi bi-trash"></i> delete</a>`,
    ]);
    table.clear().rows.add(formattedData).draw();

    // Attach the delete event handler
    $('#teamsTable').on('click', '.btn-danger', (event) => {
      event.preventDefault();
      let teamId = $(event.currentTarget).data('team-id');
      this.deleteTeam(teamId);
    });
  }

  get teams() {
    return this.args.data || [];
  }
}
