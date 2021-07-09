import {
  SimplePredicate,
  ComplexPredicate,
  StringPredicate,
  DetailPredicate,
  GeographyPredicate,
  GeometryPredicate,
} from 'ember-flexberry-data/query/predicate';

const example = new ComplexPredicate(Or,
  new SimplePredicate('id', Ge, 'id'),
  new StringPredicate(),
  new DetailPredicate(),
  new GeographyPredicate(),
  new GeometryPredicate()
);
