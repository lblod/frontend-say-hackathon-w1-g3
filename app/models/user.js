import Model, { attr, hasMany } from '@ember-data/model';

export default class UserModel extends Model {
  @attr firstName;
  @attr lastName;

  @hasMany('account', { async: false, inverse: 'user' }) account;

  @hasMany('administrative-unit', {
    async: false,
    inverse: null,
  })
  groups;

  get group() {
    return this.groups.at(0);
  }
}
