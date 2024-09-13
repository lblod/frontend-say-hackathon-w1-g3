import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';

import { task, timeout } from 'ember-concurrency';

export const SEARCH_TIMEOUT = 500;

export default class Aanduidingsobjecten extends Component {
  @service store;

  @tracked aanduidingsobjecten = [];
  @tracked addressSuggestion;

  // search
  search = task({ keepLatest: true }, async (searchData) => {
    await timeout(SEARCH_TIMEOUT);

    const input = searchData.trim();

    if (input === '') {
      this.aanduidingsobjecten = [];
      return;
    }

    const url = new URL(
      'https://inventaris.onroerenderfgoed.be/aanduidingsobjecten',
    );
    url.searchParams.append('tekst', input);

    const response = await fetch(url, {
      headers: {
        Accept: 'application/json',
      },
    });
    // TODO add error handling
    const data = await response.json();
    return data.map((aanduidingsobject) => ({
      id: aanduidingsobject.id,
      uri: aanduidingsobject.uri,
      name: aanduidingsobject.naam,
      location: aanduidingsobject.locatie_samenvatting,
    }));
  });

  // selectSuggestion
  selectSuggestion = task(async (addressSuggestion) => {
    this.addressSuggestion = addressSuggestion;
  });

  handleSave = async (event) => {
    event.preventDefault();
    // event.target.value
    const newImmovableHeritage = this.store.createRecord('immovable-heritage', {
      name: this.addressSuggestion.name,
      uri: this.addressSuggestion.id,
    });
    await newImmovableHeritage.save();
  };
}
