import Controller from '@ember/controller';

export default class MembersTableController extends Controller {
  members = [
    {
      memberName: 'John Doe',
      role: 'Backend Developer',
      nameTeam: 'Team 1',
    },
  ];
}
