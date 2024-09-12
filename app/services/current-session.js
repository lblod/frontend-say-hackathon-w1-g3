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

  get isLoaded() {
    return Boolean(this.account && this.user);
  }

  async load() {
    if (this.session.isAuthenticated) {
      let accountId =
        this.session.data.authenticated.relationships.account.data.id;

      this.account = await this.store.findRecord('account', accountId, {
        include: 'user',
      });

      this.user = this.account.user;
      this._roles = this.session.data.authenticated.data.attributes.roles;
    }
  }

  canAccess(role) {
    return this._roles.includes(role);
  }
}
