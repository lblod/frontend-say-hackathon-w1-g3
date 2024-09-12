import Controller from '@ember/controller';
import { service } from '@ember/service';

export default class ApplicationController extends Controller {
  @service session;
  @service currentSession;

  get userInfo() {
    return `${this.currentSession.user.firstName} ${this.currentSession.user.lastName}`;
  }

  logout = () => {
    this.session.invalidate();
  };
}
