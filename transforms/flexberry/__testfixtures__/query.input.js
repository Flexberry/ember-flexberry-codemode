import { Query } from 'ember-flexberry-data';

let x = new ComplexPredicate(Query.Condition.Or, new SimplePredicate('id', Query.FilterOperator.Ge, 'id'), new SimplePredicate('id', Query.FilterOperator.Geq, 'id'));
let y = new ComplexPredicate(Query.Condition.And, new SimplePredicate('id', Query.FilterOperator.Ge, 'id'), new SimplePredicate('id', Query.FilterOperator.Geq, 'id'));
let builder = new Query.Builder(this.store);

export const adapter = Query.OdataAdapter.extend({});
export const indexAdapter = Query.IndexedDbAdapter.extend({});
export const jsAdapter = Query.JsAdapter.extend({});
