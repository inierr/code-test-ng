import { ILaunchSiteFailureDetails } from './ilaunch-failure-details';
import { ILaunchSite } from './ilaunch-site';
import { ILaunchTimeline } from './ilaunch-timeline';
import { ILink } from './ilink';
import { IRocket } from './irocket';
import { ITelemetry } from './itelemetry';

export interface ILaunch {
  'flight_number': number;
  'mission_name': string;
  'mission_id': any[];
  'upcoming': boolean;
  'launch_year': string;
  'launch_date_unix': number;
  'launch_date_utc': string;
  'launch_date_local': string;
  'is_tentative': boolean;
  'tentative_max_precision': string;
  'tbd': boolean;
  'launch_window': number;
  'rocket': IRocket;
  'ships': any[];
  'telemetry': ITelemetry;
  'launch_site': ILaunchSite;
  'launch_success': boolean;
  'launch_failure_details': ILaunchSiteFailureDetails;
  'links': ILink;
  'details': string;
  'static_fire_date_utc': string;
  'static_fire_date_unix': number;
  'timeline': ILaunchTimeline;
}
