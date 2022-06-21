const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
    server: {
      apiKey: "9B1PUuRZU5szyFE6HZGRHi19f03aWIql",
      nodes: [
        {
          host: "typesense.acdh-dev.oeaw.ac.at",
          port: "443",
          protocol: "https",
        },
      ],
      cacheSearchResultsForSeconds: 2 * 60
    },
    additionalSearchParameters: {
      query_by: "full_text"
    },
  });


const searchClient = typesenseInstantsearchAdapter.searchClient;
const search = instantsearch({
    indexName: 'cfts',
    searchClient,
});

search.addWidgets([
    instantsearch.widgets.searchBox({
        container: '#searchbox',
        cssClasses: {
          form: 'form-inline',
          input: 'form-control col-md-11',
          submit: 'btn btn-primary',
          reset: 'btn btn-primary'
        },
    }),

    instantsearch.widgets.hits({
        container: '#hits',
        templates: {
            empty: 'No results',
            item: `
                <h3> {{ rec_id }}</h3>
                <h4><a href="{{ id }}.html">{{ title }}</a></h4>
                <h5>{{ project }}</h5>
                <p>{{#helpers.snippet}}{ "attribute": "full_text" }{{/helpers.snippet}}</p>
            `
        }
    }),

    instantsearch.widgets.stats({
        container: '#stats-container'
    }),

    instantsearch.widgets.refinementList({
        container: '#refinement-list-places',
        attribute: 'places',
        searchable: true,
        cssClasses: {
          searchableInput: 'form-control form-control-sm mb-2 border-light-2',
          searchableSubmit: 'd-none',
          searchableReset: 'd-none',
          showMore: 'btn btn-secondary btn-sm align-content-center',
          list: 'list-unstyled',
          count: 'badge badge-light bg-light-2 ml-2',
          label: 'd-flex align-items-center text-capitalize',
          checkbox: 'mr-2',
        }
    }),

    instantsearch.widgets.refinementList({
        container: '#refinement-list-persons',
        attribute: 'persons',
        searchable: true,
        cssClasses: {
          searchableInput: 'form-control form-control-sm mb-2 border-light-2',
          searchableSubmit: 'd-none',
          searchableReset: 'd-none',
          showMore: 'btn btn-secondary btn-sm align-content-center',
          list: 'list-unstyled',
          count: 'badge badge-light bg-light-2 ml-2',
          label: 'd-flex align-items-center text-capitalize',
          checkbox: 'mr-2',
        }
    }),

    instantsearch.widgets.refinementList({
        container: '#refinement-list-works',
        attribute: 'works',
        searchable: true,
        cssClasses: {
          searchableInput: 'form-control form-control-sm mb-2 border-light-2',
          searchableSubmit: 'd-none',
          searchableReset: 'd-none',
          showMore: 'btn btn-secondary btn-sm align-content-center',
          list: 'list-unstyled',
          count: 'badge badge-light bg-light-2 ml-2',
          label: 'd-flex align-items-center text-capitalize',
          checkbox: 'mr-2',
        }
    }),
    
    instantsearch.widgets.rangeInput({
        container: "#range-input",
        attribute: "year",
        cssClasses: {
          form: 'form-inline',
          input: 'form-control',
          submit: 'btn btn-primary'
        }
      }),

    instantsearch.widgets.pagination({
        container: '#pagination',
        padding: 2,
        cssClasses: {
          list: 'pagination',
          item: 'page-item',
          link: 'page-link'
        }
    }),
    instantsearch.widgets.clearRefinements({
        container: '#clear-refinements',
        cssClasses: {
          button: 'btn btn-primary'
        }
    }),

    	

    instantsearch.widgets.currentRefinements({
      container: '#current-refinements',
      cssClasses: {
        delete: 'btn btn-primary',
        label: 'badge'
      }
    })
]);



search.addWidgets([
    instantsearch.widgets.configure({
        attributesToSnippet: ['full_text'],
    })
]);

search.addWidgets([
    instantsearch.widgets.sortBy({
      container: "#sort-by",
      items: [
        { label: "Tag (aufsteigend)", value: "stb/sort/date:asc" },
        { label: "Tag (absteigend)", value: "stb/sort/date:desc" },
        { label: "Jahr (aufsteigend)", value: "stb/sort/year:asc" },
        { label: "Jahr (absteigend)", value: "stb/sort/year:desc" },
      ],
      cssClasses: {
        select: 'custom-select'
      }
    }),
  ]);


search.start();