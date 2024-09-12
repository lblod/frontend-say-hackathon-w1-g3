import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { task } from 'ember-concurrency';

export default class MockLoginController extends Controller {
  @service store;

  queryParams = ['page'];
  @tracked page = 0;
  size = 10;

  get accounts() {
    return this.queryStore.last.value || [];
  }

  @task
  *queryStore() {
    const filter = { provider: 'https://github.com/lblod/mock-login-service' };
    const accounts = yield this.store.query('account', {
      include: 'user.administrative-units',
      filter,
      page: { size: this.size, number: this.page },
      sort: 'user.first-name',
    });

    return accounts;
  }

  setup() {
    this.queryStore.perform();
  }
}
