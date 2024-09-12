import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class AppRoute extends Route {
  @service session;
  @service currentSession;

  beforeModel(transition) {
    if (this.session.requireAuthentication(transition, 'login')) {
      return this.currentSession.load();
    }
  }
}
