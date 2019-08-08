import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent, ModalHeaderComponent, ModalContentComponent, ModalFooterComponent } from './modal.component';
import { RouteModalComponent } from './router-modal.component';

@NgModule({
    imports: [ CommonModule ],
    declarations: [
        ModalComponent,
        RouteModalComponent,
        ModalHeaderComponent,
        ModalContentComponent,
        ModalFooterComponent,
    ],
    exports: [
        ModalComponent,
        RouteModalComponent,
        ModalHeaderComponent,
        ModalContentComponent,
        ModalFooterComponent,
    ],
})
export class ModalModule { }
