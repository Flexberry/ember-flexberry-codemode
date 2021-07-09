import StoreMixin from 'ember-flexberry-data/mixins/store';
import OnlineStore from 'ember-flexberry-data/stores/online-store';
import BaseStore from 'ember-flexberry-data/stores/base-store';
import OfflineStore from 'ember-flexberry-data/stores/local-store';
import OfflineModelMixin from 'ember-flexberry-data/mixins/offline-model';

export const offlineStore = OfflineStore.extend(OfflineModelMixin, {
});

export const onineStore = OnlineStore.extend(StoreMixin, {
});

export const baseStore = BaseStore.extend(OfflineModelMixin, {
});
