import { inject, TestBed } from '@angular/core/testing';
import { HttpClientModule, HttpHandler, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BASE_URL } from './url.service';
import { UsersService } from './users.service';
import { ConnectionBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { User } from '../../models/User';

describe('UsersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
      ],
      providers: [
        UsersService,
        {provide: BASE_URL, useValue: 'http://localhost:3000'},
        HttpHandler,
        { provide: ConnectionBackend, useClass: MockBackend }
      ]
    });
  });

  it('should be created', inject([UsersService], (service: UsersService) => {
    expect(service).toBeDefined();
  }));

  it('should return a user', inject([UsersService, ConnectionBackend], (service: UsersService, mockBackend) => {
    const mockResponse = {
      id: 2,
      name: 'Pasha',
      age: '19',
      password: '1111',
      dateOfBirth: '2011-10-05T00:00:00.000Z',
      dateOfFirstLogin: '2011-10-05T14:48:00.000Z',
      dateOfNextNotif: '2011-10-05T14:48:00.000Z',
      information: 'meaw',
      role: 'user'
    };

    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(new HttpResponse({
        body: mockResponse
      }));
    });

    service.getUser().subscribe((response) => {
      expect((response.body as User).id).toBe(2);
    });
}));

});
