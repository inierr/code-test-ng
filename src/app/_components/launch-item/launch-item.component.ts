import { Component, Input, OnInit } from '@angular/core';
import { ILaunch } from 'src/app/_interfaces';

@Component({
  selector: 'app-launch-item',
  templateUrl: './launch-item.component.html',
  styleUrls: ['./launch-item.component.scss']
})
export class LaunchItemComponent implements OnInit {
  readonly VIEW = 'VIEW';
  readonly HIDE = 'HIDE';
  readonly UPCOMING = 'upcoming';
  readonly SUCCESS = 'success';
  readonly FAILED = 'failed';
  readonly TBD = 'TBD';
  @Input() launch: ILaunch;
  isVisible = false;

  constructor() { }

  ngOnInit() {
  }

  showHideContent(): void {
    this.isVisible = !this.isVisible;
  }

  launchDate(): string {
    const isTBD = this.launch.tbd;
    const launchDateUTC = this.launch.launch_date_utc;

    if (isTBD || !launchDateUTC) {
      return this.TBD;
    }

    const launchDateStamp = new Date(launchDateUTC).getTime();
    const nowDateStamp = new Date().getTime();

    if (launchDateStamp >= nowDateStamp) {
      // future
      return this.computeDate(nowDateStamp, launchDateStamp, false);
    }

    // past
    return this.computeDate(launchDateStamp, nowDateStamp, true);
  }

  computeDate(fromStamp: number, toStamp: number, isPast: boolean): string {
    const difference = Math.round((toStamp - fromStamp) / 1000);

    const year = Math.floor(difference / (365 * 24 * 60 * 60));
    const month = Math.floor(difference / (30 * 24 * 60 * 60));
    const day = Math.floor(difference / (24 * 60 * 60));
    const hour = Math.floor(difference / (60 * 60));
    const minute = Math.floor(difference / (60));

    if (year === 1) {
      return isPast
        ? 'a year ago'
        : 'in a year';
    }

    if (year > 0) {
      return isPast
        ? `${year} years ago`
        : `in ${year} years`;
    }

    if (month === 1) {
      return isPast
        ? 'a month ago'
        : 'in a month';
    }

    if (month > 0) {
      return isPast
        ? `${month} months ago`
        : `in ${month} months`;
    }

    if (day === 1) {
      return isPast
        ? 'a day ago'
        : 'in a day';
    }

    if (day > 0) {
      return isPast
        ? `${day} days ago`
        : `in ${day} days`;
    }

    if (hour === 1) {
      return isPast
        ? 'a hour ago'
        : 'in an hour';
    }

    if (hour > 0) {
      return isPast
        ? `${hour} hours ago`
        : `in ${hour} hours`;
    }

    if (minute === 1) {
      return isPast
        ? 'a minute ago'
        : 'in a minute';
    }

    if (minute > 0) {
      return isPast
        ? `${minute} minutes ago`
        : `in ${minute} minutes`;
    }

    return isPast
      ? 'a few seconds ago'
      : 'in a few seconds';
  }
}
