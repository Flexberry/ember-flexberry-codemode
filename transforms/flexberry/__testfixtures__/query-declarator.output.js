import QueryBuilder from 'ember-flexberry-data/query/builder';
import Condition from 'ember-flexberry-data/query/condition';
import FilterOperator from 'ember-flexberry-data/query/filter-operator';
import IndexedDbAdapter from 'ember-flexberry-data/query/indexeddb-adapter';
import JsAdapter from 'ember-flexberry-data/query/js-adapter';
import QueryOdataAdapter from 'ember-flexberry-data/query/odata-adapter';

const {
  Or,
  And
} = Condition;

let x = new ComplexPredicare(Or, new SimplePredicate('id', FilterOperator.Ge, 'id'), new SimplePredicate('id', FilterOperator.Geq, 'id'));
let y = new ComplexPredicare(And, new SimplePredicate('id', FilterOperator.Ge, 'id'), new SimplePredicate('id', FilterOperator.Geq, 'id'));
let builder = new QueryBuilder(this.store);

export const adapter = QueryOdataAdapter.extend({});
export const indexAdapter = IndexedDbAdapter.extend({});
export const jsAdapter = JsAdapter.extend({});
