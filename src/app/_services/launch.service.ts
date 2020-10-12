import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ILaunch } from '../_interfaces';

@Injectable({
  providedIn: 'root'
})
export class LaunchService {
  readonly getAllLaunchesURL = environment.spaceXAllLaunch;
  readonly numberOfItems = 10;
  readonly sort = 'flight_number';
  readonly order = 'desc';
  private launches: ILaunch[] = new Array<ILaunch>();
  private isLoaded = false;
  private launches$: Subject<ILaunch[]>;
  private isLoaded$: Subject<boolean>;
  private currentPage: number;

  constructor(
    private http: HttpClient,
  ) {
    this.currentPage = 1;
    this.isLoaded$ = new BehaviorSubject(this.isLoaded);
    this.launches$ = new BehaviorSubject([]);
  }

  getLoaded(): Observable<boolean> {
    return this.isLoaded$;
  }

  getAllLaunches(): Observable<ILaunch[]> {
    return this.launches$;
  }

  getInitLaunches(): void {
    this.currentPage = 1;
    const params = this.setHttpParams(this.currentPage);
    this.http.get<ILaunch[]>(this.getAllLaunchesURL, { params })
      .subscribe((launches) => {
        this.launches = launches;
        this.launches$.next(this.launches);
        return launches;
      });
  }

  getNextLaunches(): void {
    this.currentPage += 1;
    const params = this.setHttpParams(this.currentPage);
    if (this.isLoaded) {
      return;
    }

    this.http.get<ILaunch[]>(this.getAllLaunchesURL, { params })
      .subscribe((launches) => {

        if (launches.length === 0) {
          this.isLoaded = true;
          this.isLoaded$.next(this.isLoaded);
          return;
        }
        this.launches.push(...launches);
        this.launches$.next(this.launches);
      });
  }

  filterLaunches(keyword: string): void {
    if (!keyword) {
      this.launches$.next(this.launches);
      return;
    }

    const filteredLaunches = this.launches
      .filter((launch) => launch.mission_name.toLowerCase().includes(keyword.toLowerCase()));

    this.launches$.next(filteredLaunches);
  }

  private setHttpParams(page: number): HttpParams {
    const sort = this.sort;
    const order = this.order;
    const limit = this.numberOfItems;
    const offset = (page - 1) * limit;
    const httpParams = new HttpParams()
      .set('sort', sort)
      .set('order', order)
      .set('limit', String(limit))
      .set('offset', String(offset));

    return httpParams;
  }
}
