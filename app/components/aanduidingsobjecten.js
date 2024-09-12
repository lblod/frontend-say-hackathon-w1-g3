import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class Aanduidingsobjecten extends Component {
  @tracked aanduidingsobjecten = [];

  onNameInputChange = async (event) => {
    const input = event.target.value;
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
    this.aanduidingsobjecten = data;
  };

  onStraatChange = async (event) => {
    const input = event.target.value;
    if (input === '') {
      this.aanduidingsobjecten = [];
      return;
    }

    const url = new URL(
      'https://inventaris.onroerenderfgoed.be/aanduidingsobjecten',
    );
    url.searchParams.append('straat', input);

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
