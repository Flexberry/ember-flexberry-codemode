const defSource = 'ember-flexberry-data';
const predicateSource = defSource + '/query/predicate';

const mappings = [
  {
    global: 'Projection',
    source: defSource,
    locals: new Map([
      [
        'StoreMixin',
        {
          source: defSource + '/mixins/store',
        },
      ],
      [
        'AdapterMixin',
        {
          source: defSource + '/mixins/adapter',
        },
      ],
      [
        'Model',
        {
          source: defSource + '/models/model',
          rename: 'EmberFlexberryDataModel',
        },
      ],
      [
        'create',
        {
          source: defSource + '/utils/create',
        },
      ],
      [
        'attr',
        {
          source: defSource + '/utils/attributes',
          local: true,
        },
      ],
      [
        'belongsTo',
        {
          source: defSource + '/utils/attributes',
          local: true,
        },
      ],
      [
        'hasMany',
        {
          source: defSource + '/utils/attributes',
          local: true,
        },
      ],
      [
        'OnlineStore',
        {
          source: defSource + '/stores/online-store',
        },
      ],
    ]),
  },
  {
    global: 'Offline',
    source: defSource,
    locals: new Map([
      [
        'Store',
        {
          source: defSource + '/stores/base-store',
          rename: 'BaseStore',
        },
      ],
      [
        'LocalStore',
        {
          source: defSource + '/stores/local-store',
          rename: 'OfflineStore',
        },
      ],
      [
        'Model',
        {
          source: defSource + '/models/offline-model',
          rename: 'OfflineModel',
        },
      ],
      [
        'ModelMixin',
        {
          source: defSource + '/mixins/offline-model',
          rename: 'OfflineModelMixin',
        },
      ],
      [
        'OfflineGlobalsService',
        {
          source: defSource + '/services/offline-globals',
        },
      ],
      [
        'Syncer',
        {
          source: defSource + '/services/syncer',
        },
      ],
      [
        'DexieService',
        {
          source: defSource + '/services/dexie',
        },
      ],
    ]),
  },
  {
    global: 'Adapter',
    source: defSource,
    locals: new Map([
      [
        'Offline',
        {
          source: defSource + '/adapters/offline',
          rename: 'OfflineAdapter',
        },
      ],
      [
        'Odata',
        {
          source: defSource + '/adapters/odata',
          rename: 'OdataAdapter',
        },
      ],
    ]),
  },
  {
    global: 'Serializer',
    source: defSource,
    locals: new Map([
      [
        'Offline',
        {
          source: defSource + '/serializers/offline',
          rename: 'OfflineSerializer',
        },
      ],
      [
        'Base',
        {
          source: defSource + '/serializers/base',
          rename: 'BaseSerializer',
        },
      ],
      [
        'Odata',
        {
          source: defSource + '/serializers/odata',
          rename: 'OdataSerializer',
        },
      ],
    ]),
  },
  {
    global: 'Query',
    source: defSource,
    locals: new Map([
      [
        'BaseAdapter',
        {
          source: defSource + '/query/base-adapter',
        },
      ],
      [
        'BaseBuilder',
        {
          source: defSource + '/query/base-builder',
        },
      ],
      [
        'Builder',
        {
          source: defSource + '/query/builder',
          rename: 'QueryBuilder',
        },
      ],
      [
        'Condition',
        {
          source: defSource + '/query/condition',
        },
      ],
      [
        'FilterOperator',
        {
          source: defSource + '/query/filter-operator',
        },
      ],
      [
        'IndexedDbAdapter',
        {
          source: defSource + '/query/indexeddb-adapter',
        },
      ],
      [
        'JsAdapter',
        {
          source: defSource + '/query/js-adapter',
        },
      ],
      [
        'OdataAdapter',
        {
          source: defSource + '/query/odata-adapter',
          rename: 'QueryOdataAdapter',
        },
      ],
      [
        'OrderByClause',
        {
          source: defSource + '/query/order-by-clause',
        },
      ],
      [
        'QueryObject',
        {
          source: defSource + '/query/query-object',
        },
      ],
      [
        'BasePredicate',
        {
          source: predicateSource,
          local: true,
        },
      ],
      [
        'SimplePredicate',
        {
          source: predicateSource,
          local: true,
        },
      ],
      [
        'DatePredicate',
        {
          source: predicateSource,
          local: true,
        },
      ],
      [
        'ComplexPredicate',
        {
          source: predicateSource,
          local: true,
        },
      ],
      [
        'StringPredicate',
        {
          source: predicateSource,
          local: true,
        },
      ],
      [
        'DetailPredicate',
        {
          source: predicateSource,
          local: true,
        },
      ],
      [
        'GeographyPredicate',
        {
          source: predicateSource,
          local: true,
        },
      ],
      [
        'GeometryPredicate',
        {
          source: predicateSource,
          local: true,
        },
      ],
      [
        'NotPredicate',
        {
          source: predicateSource,
          local: true,
        },
      ],
      [
        'IsOfPredicate',
        {
          source: predicateSource,
          local: true,
        },
      ],
      [
        'createPredicate',
        {
          source: predicateSource,
          local: true,
        },
      ],
      [
        'stringToPredicate',
        {
          source: predicateSource,
          local: true,
        },
      ],
    ]),
  },
  {
    global: 'Utils',
    source: defSource,
    locals: new Map([
      [
        'Information',
        {
          source: defSource + '/utils/information',
        },
      ],
    ]),
  },
  {
    global: 'Security',
    source: defSource,
    locals: new Map([
      [
        'UserService',
        {
          source: defSource + '/services/user',
        },
      ],
    ]),
  },
  {
    global: 'Audit',
    source: defSource,
    locals: new Map([
      [
        'ModelMixin',
        {
          source: defSource + '/mixins/audit-model',
          rename: 'AuditModelMixin',
        },
      ],
    ]),
  },
];

module.exports = mappings;
