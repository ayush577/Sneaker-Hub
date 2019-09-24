import { TestBed } from '@angular/core/testing';
import { NetworkService } from './network.service';
describe('NetworkService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));
    it('should be created', () => {
        const service = TestBed.get(NetworkService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=network.service.spec.js.map