import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { ShoppingcartComponent } from './shoppingcart.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ShoppingcartService } from '../service/shoppingcart.service';


describe('ShoppingcartComponent', () => {
  let component: ShoppingcartComponent;
  let fixture: ComponentFixture<ShoppingcartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingcartComponent ],
      imports : [HttpClientTestingModule],
      providers : [ShoppingcartService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingcartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('expects service to fetch list of server details',
  inject([HttpTestingController, ShoppingcartService],
    (httpMock: HttpTestingController, service: ShoppingcartService) => {
      // We call the service
      service.getServers().subscribe(data => {
        expect(data.pageInfo.totalRecordCount).toBe(486);
        expect(data.pageInfo.pageNumber).toBe(0);
        expect(data.data.length).toBe(486);
      });
      // We set the expectations for the HttpClient mock
      const req = httpMock.expectOne('http://api.candidate.lsw.hs1.nl:4300/api/servers');
      expect(req.request.method).toEqual('GET');
      req.flush({data: {}});
      
    })
    
);

afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
  httpMock.verify();
}));



});
