import DS from 'ember-data';
import AdapterMixin from 'ember-flexberry-data/mixins/adapter';
import { attr, belongsTo, hasMany } from 'ember-flexberry-data/utils/attributes';
import OdataAdapter from 'ember-flexberry-data/adapters/odata';

export default OdataAdapter.extend(AdapterMixin, {
});

export const Model = Mixin.create({
  stringAttr: DS.attr('string'),
  belongsToRel: DS.belongsTo('model', { inverse: null, async: false, }),
  hasManyRel: DS.hasMany('model', { inverse: 'detail', async: false, }),
});

export const defineProjections = function (modelClass) {
  modelClass.defineProjection('AuditView', 'model', {
    stringAttr: attr('', { index: 0, }),
    belongsToRel: belongsTo('model', '', {

    }, { index: 1, }),
    hasManyRel: hasMany('model', '', {
      data: attr('', { index: 2, }),
    }, { index: 3, }),
  });
};
