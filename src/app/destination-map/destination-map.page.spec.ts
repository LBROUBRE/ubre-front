import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DestinationMapPage } from './destination-map.page';

describe('DestinationMapPage', () => {
  let component: DestinationMapPage;
  let fixture: ComponentFixture<DestinationMapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DestinationMapPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DestinationMapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
