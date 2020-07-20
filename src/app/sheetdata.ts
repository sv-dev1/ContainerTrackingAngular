export class Sheetdata {
  id: Int16Array;
  container_id: Int16Array;
  sheet_id: string;
  row_id: string;
  po_no: string;
  origin: string;
  container_type: string;
  destination: string;
  container_number: string;
  departure: Date;
  arrival: Date;
  shipping_line: string;
  status: string;
  early_delay: string;
  created_at: Date;
  from_country: string;
  to_country: string;
  transit_time: string;
  first_eta: string;
  bl_reference_no: string;
  transit_ports: string;
  getout_date: Date;
  empty_return_date: Date;
  shipment_by: string;
}
