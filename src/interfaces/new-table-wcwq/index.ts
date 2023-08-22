import { GetQueryInterface } from 'interfaces';

export interface NewTableWcwqInterface {
  id?: string;
  created_at?: any;
  updated_at?: any;

  _count?: {};
}

export interface NewTableWcwqGetQueryInterface extends GetQueryInterface {
  id?: string;
}
