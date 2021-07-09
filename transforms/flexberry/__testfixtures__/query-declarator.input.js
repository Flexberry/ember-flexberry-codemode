import { Query } from 'ember-flexberry-data';

const {
  Builder,
  Condition: { Or, And, },
  FilterOperator,
  IndexedDbAdapter,
  JsAdapter,
  OdataAdapter
} = Query;

let x = new ComplexPredicare(Or, new SimplePredicate('id', FilterOperator.Ge, 'id'), new SimplePredicate('id', FilterOperator.Geq, 'id'));
let y = new ComplexPredicare(And, new SimplePredicate('id', FilterOperator.Ge, 'id'), new SimplePredicate('id', FilterOperator.Geq, 'id'));
let builder = new Builder(this.store);

export const adapter = OdataAdapter.extend({});
export const indexAdapter = IndexedDbAdapter.extend({});
export const jsAdapter = JsAdapter.extend({});
