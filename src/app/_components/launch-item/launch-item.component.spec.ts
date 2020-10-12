import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ILaunch } from 'src/app/_interfaces';

import { LaunchItemComponent } from './launch-item.component';

describe('LaunchItemComponent', () => {
  let component: LaunchItemComponent;
  let fixture: ComponentFixture<LaunchItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaunchItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaunchItemComponent);
    component = fixture.componentInstance;
    component.launch = {
      tbd: false,
      launch_date_utc: null,
    } as ILaunch;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('showHideContent', () => {
    beforeEach(() => {
      component.isVisible = false;
    });

    it('should isVisible false when it is true', () => {
      // arrange
      component.isVisible = true;

      // act
      component.showHideContent();

      // assert
      expect(component.isVisible).toBeFalsy();
    });

    it('should isVisible true when it is false', () => {
      // arrange
      component.isVisible = false;

      // act
      component.showHideContent();

      // assert
      expect(component.isVisible).toBeTruthy();
    });
  });

  describe('launchDate', () => {
    beforeEach(() => {
      component.launch = {
        tbd: false,
        launch_date_utc: null
      } as ILaunch;
    });

    it('should return tbd when tbd is true', () => {
      // arrange
      component.launch.tbd = true;

      // act
      const result = component.launchDate();

      // assert
      expect(result).toEqual(component.TBD);
    });

    it('should return tbd when launch_date_utc is null', () => {
      // arrange
      component.launch.tbd = false;
      component.launch.launch_date_utc = null;

      // act
      const result = component.launchDate();

      // assert
      expect(result).toEqual(component.TBD);
    });

    it('should return future computeDate if launch_date_utc is in the future', () => {
      // arrange
      component.launch.tbd = false;
      const futureStamp = new Date().getTime() + 10000000;
      component.launch.launch_date_utc = new Date(futureStamp).toISOString();
      const computeDateSpy = spyOn(component, 'computeDate')
        .and.callThrough();

      // act
      const result = component.launchDate();

      // assert
      expect(result).not.toEqual(component.TBD);
      expect(computeDateSpy).toHaveBeenCalledTimes(1);
      expect(computeDateSpy).toHaveBeenCalledWith(jasmine.anything(), jasmine.anything(), false);
    });

    it('should return past computeDate if launch_date_utc is in the past', () => {
      // arrange
      component.launch.tbd = false;
      const pastStamp = new Date().getTime() - 10000000;
      component.launch.launch_date_utc = new Date(pastStamp).toISOString();
      const computeDateSpy = spyOn(component, 'computeDate')
        .and.callThrough();

      // act
      const result = component.launchDate();

      // assert
      expect(result).not.toEqual(component.TBD);
      expect(computeDateSpy).toHaveBeenCalledTimes(1);
      expect(computeDateSpy).toHaveBeenCalledWith(jasmine.anything(), jasmine.anything(), true);
    });
  });
});
