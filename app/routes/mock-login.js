import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class MockLoginRoute extends Route {
  @service session;

  beforeModel() {
    this.session.prohibitAuthentication('app');
  }

  setupController(controller) {
    super.setupController(...arguments);

    controller.setup();
  }
}
