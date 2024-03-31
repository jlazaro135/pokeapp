import { HttpClientModule } from "@angular/common/http";
import { RequestService } from "./request.service";
import { TestBed } from "@angular/core/testing";

describe('RequestService', () => {
  let request: RequestService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
    }).compileComponents();
    request = TestBed.inject(RequestService)
  });

  it('should create', () => {
    expect(request).toBeTruthy();
  });
});
