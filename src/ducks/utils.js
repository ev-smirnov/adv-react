import { OrderedMap, Map } from 'immutable';

export const fbDataToEntities = (data, RecordModel = Map) =>
  (new OrderedMap(data)).mapEntries(([uid, value]) => (
    [uid, (new RecordModel(value)).set('uid', uid)]
  ));
