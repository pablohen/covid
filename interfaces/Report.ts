export default interface Report {
  city: string;
  city_ibge_code: number;
  confirmed: number;
  confirmed_per_100k_inhabitants: number;
  date: Date;
  death_rate: number;
  deaths: number;
  estimated_population: number;
  estimated_population_2019: number;
  is_last: Boolean;
  order_for_place: number;
  place_type: string;
  state: string;
}
