import { Component, Input } from '@angular/core';

/**
 * Circle shared component
 */
@Component({
    selector: 'app-circle',
    templateUrl: './circle.component.html',
    styleUrls: ['./circle.component.scss'],
})
export class CircleComponent {
    /**
     * Circle color input
     */
    @Input() public color: 'main' | 'secondary' = 'main';
    /**
     * Circle position input
     */
    @Input() public position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' = 'top-left';
}
