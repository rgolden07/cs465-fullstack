export interface Trip {
  _id: string, // key for mongodb
  code: string,
  name: string,
  length: string,
  start: Date,
  resort: string,
  perPerson: string,
  image: string,
  description: string
}
