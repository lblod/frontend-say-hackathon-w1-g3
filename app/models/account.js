import Model, { attr, belongsTo } from '@ember-data/model';

export default class AccountModel extends Model {
  @attr voId;
  @attr provider;
  @attr roles;

  @belongsTo('user', {
    async: false,
    inverse: 'account',
  })
  user;
}
