import { setupTest } from 'frontend/tests/helpers';
import { module, test } from 'qunit';

module('Unit | Model | immovable heritage', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    const store = this.owner.lookup('service:store');
    const model = store.createRecord('immovable-heritage', {});
    assert.ok(model, 'model exists');
  });
});
