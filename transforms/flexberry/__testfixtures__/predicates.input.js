import { Query } from 'ember-flexberry-data';

const {
  SimplePredicate,
  ComplexPredicate,
  StringPredicate,
  DetailPredicate,
  GeographyPredicate,
  GeometryPredicate
} = Query;

const example = new ComplexPredicate(Or,
  new SimplePredicate('id', Ge, 'id'),
  new StringPredicate(),
  new DetailPredicate(),
  new GeographyPredicate(),
  new GeometryPredicate()
);
