import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleComponent } from './card.component';

describe('CircleComponent', () => {
    let component: CircleComponent;
    let fixture: ComponentFixture<CircleComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CircleComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(CircleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
