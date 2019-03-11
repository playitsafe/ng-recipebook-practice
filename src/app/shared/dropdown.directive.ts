import { Directive, OnInit, HostListener, HostBinding } from '@angular/core';

//add @ decorator to turn it into directive
@Directive({
    selector: '[appDropdown]'
})

export class DropdownDirective implements OnInit {
    constructor() {}
    ngOnInit() {}

    //@HostBinding('property of element that directive placed on')
    @HostBinding('class.open') isOpen = false;

    @HostListener('click') toggleOpen() {
        this.isOpen = !this.isOpen;
    }

}