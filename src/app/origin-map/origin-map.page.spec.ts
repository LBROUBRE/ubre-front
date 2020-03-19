import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OriginMapPage } from './origin-map.page';

describe('OriginMapPage', () => {
  let component: OriginMapPage;
  let fixture: ComponentFixture<OriginMapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OriginMapPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OriginMapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
