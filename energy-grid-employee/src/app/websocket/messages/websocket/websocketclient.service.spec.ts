import { TestBed } from '@angular/core/testing';

import { WebsocketclientService } from './websocketclient.service';

describe('WebsocketclientService', () => {
  let service: WebsocketclientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebsocketclientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
