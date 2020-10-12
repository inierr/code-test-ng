import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { LaunchItemComponent } from './_components/launch-item/launch-item.component';
import { SpinnerComponent } from './_components/spinner/spinner.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { LaunchService } from './_services/launch.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { ILaunch } from './_interfaces';

describe('AppComponent', () => {
  let component: AppComponent;
  let launchService: LaunchService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        LaunchItemComponent,
        SpinnerComponent
      ],
      imports: [
        HttpClientTestingModule,
        InfiniteScrollModule,
        BrowserAnimationsModule,
        ReactiveFormsModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    const fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
    launchService = fixture.debugElement.injector.get(LaunchService);
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    beforeEach(() => {
      component.searchControl = null;
      component.launches = null;
      component.isLoaded = null;
    });

    it('should initiate props', () => {
      // arrange
      const launches = [];
      const isLoaded = false;
      const launchesObservable = new BehaviorSubject<ILaunch[]>(launches);
      const loadedObservable = new BehaviorSubject<boolean>(isLoaded);
      const isLoadedObservable = new Subject();
      const getAllLaunches = spyOn(launchService, 'getAllLaunches')
        .and.callThrough()
        .and.returnValue(launchesObservable);
      const getLoaded = spyOn(launchService, 'getLoaded')
        .and.callThrough()
        .and.returnValue(loadedObservable);
      const getInitLaunchesSpy = spyOn(launchService, 'getInitLaunches')
        .and.callThrough();

      // act
      component.ngOnInit();

      // assert
      expect(component.searchControl).not.toBeNull();
      component.launches.subscribe((value) => expect(value).toEqual(launches));
      component.isLoaded.subscribe((value) => expect(value).toEqual(isLoaded));
      expect(getAllLaunches).toHaveBeenCalledTimes(1);
      expect(getLoaded).toHaveBeenCalledTimes(1);
      expect(getInitLaunchesSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('onScroll', () => {
    beforeEach(() => {
      component.searchControl = new FormControl('');
    });

    it('should not get next launches when there is value on search control', () => {
      // arrange
      const value = 'some value';
      const getNextLaunchesSpy = spyOn(launchService, 'getNextLaunches')
        .and.callThrough();
      component.searchControl.setValue(value);

      // act
      component.onScroll();

      // assert
      expect(getNextLaunchesSpy).not.toHaveBeenCalled();
    });

    it('should get next launches when there is no value on search control', () => {
      // arrange
      const value = '';
      const getNextLaunchesSpy = spyOn(launchService, 'getNextLaunches')
        .and.callThrough();
      component.searchControl.setValue(value);

      // act
      component.onScroll();

      // assert
      expect(getNextLaunchesSpy).toHaveBeenCalledTimes(1);
    });
  });
});
