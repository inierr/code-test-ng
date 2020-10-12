export interface IRocket {
  'rocket_id': string;
  'rocket_name': string;
  'rocket_type': string;
  'first_stage': IFirstStage;
  'second_stage': ISecondStage;
  'fairings': IFairings;
}

export interface IFairings {
  'reused': boolean;
  'recovery_attempt': boolean;
  'recovered': boolean;
  'ship': any;
}

export interface IFirstStage {
  'cores': IStageCore[];
}

export interface ISecondStage {
  'block': number;
  'payloads': IStagePayload;
}

export interface IStageCore {
  'core_serial': string;
  'flight': number;
  'block': string;
  'gridfins': boolean;
  'legs': boolean;
  'reused': boolean;
  'land_success': string;
  'landing_intent': boolean;
  'landing_type': string;
  'landing_vehicle': string;
}

export interface IStagePayload {
  'payload_id': string;
  'norad_id': any[];
  'reused': boolean;
  'customers': string[];
  'nationality': string;
  'manufacturer': string;
  'payload_type': string;
  'payload_mass_kg': number;
  'payload_mass_lbs': number;
  'orbit': string;
  'orbit_params': IOrbitParams;
}

export interface IOrbitParams {
  'reference_system': string;
  'regime': string;
  'longitude'?: number;
  'semi_major_axis_km'?: number;
  'eccentricity'?: number;
  'periapsis_km'?: number;
  'apoapsis_km'?: number;
  'inclination_deg'?: number;
  'period_min'?: number;
  'lifespan_years'?: number;
  'epoch'?: number;
  'mean_motion'?: number;
  'raan'?: any;
  'arg_of_pericenter'?: any;
  'mean_anomaly'?: number;
}
