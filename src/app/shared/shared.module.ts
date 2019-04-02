import { NgModule } from '@angular/core';
import { DropdownDirective } from './dropdown.directive';
import { CommonModule } from '@angular/common';

@NgModule({
    //put things you want share 
    declarations:[
        DropdownDirective
    ],
    //make it available outside the module
    exports: [
        /*components and directives need to be declared first
         *then to be exported
         *but modules can be directly exported
         */
        CommonModule,
        DropdownDirective
    ]
})

export class SharedModule {}