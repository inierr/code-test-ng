import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ILaunch } from './_interfaces';
import { LaunchService } from './_services/launch.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('launchAnimation', [
      transition(':enter', [
        style({
          opacity: 0
        }),
        animate('500ms ease-in', style({
          opacity: 1
        }))
      ]),
      transition(':leave', [
        animate('500ms ease-out', style({
          opacity: 0
        }))
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  readonly scrollDistance = 2;
  readonly scrollThrottle = 2000;
  isLoaded: Observable<boolean>;
  launches: Observable<ILaunch[]>;
  searchControl: FormControl;
  hasFiltered = false;

  constructor(
    private launchService: LaunchService,
  ) {

  }

  ngOnInit(): void {
    this.searchControl = new FormControl('');
    this.launches = this.launchService.getAllLaunches();

    this.isLoaded = this.launchService.getLoaded();
    this.launchService.getInitLaunches();
    this.searchControl.valueChanges.subscribe((value) => {
      this.launchService.filterLaunches(value);
      this.hasFiltered = !!value;
    });
  }

  onScroll(): void {
    const { value } = this.searchControl;

    if (!!value) {
      return;
    }
    this.launchService.getNextLaunches();
  }
}
