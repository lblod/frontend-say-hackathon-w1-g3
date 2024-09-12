import Service, { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class CurrentSessionService extends Service {
  @service session;
  @service store;

  @tracked account;
  @tracked user;
  @tracked group;
  @tracked groupClassification;
  @tracked _roles = [];

  async load() {
    if (this.session.isAuthenticated) {
      let accountId =
        this.session.data.authenticated.relationships.account.data.id;

      this.account = await this.store.findRecord('account', accountId, {
        include: 'gebruiker.bestuurseenheden.classificatie',
      });

      this.user = this.account.user;
      this._roles = this.session.data.authenticated.data.attributes.roles;

      // We need to do an extra API call here because ACM/IDM users don't seem to have a "bestuurseenheden" relationship in the DB.
      // By fetching the record directly we bypass that issue
      const groupId =
        this.session.data.authenticated.relationships.group.data.id;
      this.group = await this.store.findRecord('administrative-unit', groupId, {
        reload: true,
      });
    }
  }

  canAccess(role) {
    return this._roles.includes(role);
  }
}
