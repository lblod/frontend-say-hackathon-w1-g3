import Model from '@ember-data/model';
import { attr } from '@ember-data/model';

export default class AddressesModel extends Model {
  @attr fullAddress;
}
