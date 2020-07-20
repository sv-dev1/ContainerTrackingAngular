export class Notifications {
  id: Int16Array;
  user_id: Int16Array;
  userid: string;
  con_add_sts: Int16Array;
  con_add_time: Int16Array;
  dep_change_sts: Int16Array;
  dep_change_time: Int16Array;
  arr_change_sts: Int16Array;
  arr_change_time: Int16Array;
  con_del_sts: Int16Array;
  con_del_time: Int16Array;
  created_at: Date;
  updated_at: Date;
  con_add_emails: string;
  dep_change_emails: string;
  arr_change_emails: string;
  con_del_emails: string;
}
