import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class Aanduidingsobjecten extends Component {
  @tracked aanduidingsobjecten = [];

  constructor() {
    super(...arguments);
  }

  onGemeenteChange = async (event) => {
    const url = new URL(
      'https://inventaris.onroerenderfgoed.be/aanduidingsobjecten',
    );
    url.searchParams.append('tekst', event.target.value);

    const response = await fetch(url, {
      headers: {
        Accept: 'application/json',
      },
    });
    // TODO add error handling
    const data = await response.json();
    this.aanduidingsobjecten = data;
  };
}
