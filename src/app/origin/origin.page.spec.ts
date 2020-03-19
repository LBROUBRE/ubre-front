import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OriginPage } from './origin.page';

describe('OriginPage', () => {
  let component: OriginPage;
  let fixture: ComponentFixture<OriginPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OriginPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OriginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
