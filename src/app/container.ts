export class Container {
  id: Int16Array;
  user_id: Int16Array;
  po_no: string;
  origin: string;
  container_type: string;
  destination: string;
  container_no: string;
  departure: Date;
  arrival: Date;
  first_arrival: Date;
  shipping_line: string;
  status: string;
  is_deleted: Int16Array;
  shipsgo_id: string;
  early_delay: string;
  created_at: Date;
  updated_at: Date;
  eta: string;
  from_country: string;
  to_country: string;
  transit_time: string;
  first_eta: Date;
  bl_reference_no: string;
  transit_ports: string;
  getout_date: Date;
  empty_return_date: Date;
  shipment_by: string;
  company_name: string;
}
