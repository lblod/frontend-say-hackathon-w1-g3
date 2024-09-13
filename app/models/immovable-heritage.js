import Model from '@ember-data/model';
import { attr } from '@ember-data/model';
import { belongsTo } from '@ember-data/model';

export default class ImmovableHeritageModel extends Model {
  @attr uri;
  @attr name;

  @belongsTo('contact-address', {
    async: true,
    inverse: null,
  })
  contactAddress;
}
