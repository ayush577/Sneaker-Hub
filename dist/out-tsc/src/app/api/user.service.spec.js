import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
describe('UserService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));
    it('should be created', () => {
        const service = TestBed.get(UserService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=user.service.spec.js.map