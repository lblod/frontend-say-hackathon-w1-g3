import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class AppRoute extends Route {
  @service session;

  beforeModel(transition) {
    if (this.session.requireAuthentication(transition, 'login')) {
      // TODO; load the current user's data
    }
  }
}
