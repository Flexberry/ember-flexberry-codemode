import { Projection, Offline } from 'ember-flexberry-data';

export const offlineStore = Offline.LocalStore.extend(Offline.ModelMixin, {
});

export const onineStore = Projection.OnlineStore.extend(Projection.StoreMixin, {
});

export const baseStore = Offline.Store.extend(Offline.ModelMixin, {
});
