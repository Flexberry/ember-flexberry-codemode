import DS from 'ember-data';
import { Projection, Adapter } from 'ember-flexberry-data';

export default Adapter.Odata.extend(Projection.AdapterMixin, {
});

export const Model = Mixin.create({
  stringAttr: DS.attr('string'),
  belongsToRel: DS.belongsTo('model', { inverse: null, async: false, }),
  hasManyRel: DS.hasMany('model', { inverse: 'detail', async: false, }),
});

export const defineProjections = function (modelClass) {
  modelClass.defineProjection('AuditView', 'model', {
    stringAttr: Projection.attr('', { index: 0, }),
    belongsToRel: Projection.belongsTo('model', '', {

    }, { index: 1, }),
    hasManyRel: Projection.hasMany('model', '', {
      data: Projection.attr('', { index: 2, }),
    }, { index: 3, }),
  });
};
