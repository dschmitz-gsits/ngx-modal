import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModalModule } from 'projects/ngx-modal/src/public-api';
import { Sample2Component } from './sample2.component';
import { SimpleRouterModalComponent } from './simple-router-modal.component';
import { NoCloseButtonModalComponent } from './no-close-button-modal.component';
import { NoSimpleCloseModalComponent } from './no-simple-close-modal.component';

export const routes: Routes = [
    { path: '', component: Sample2Component, pathMatch: 'full' },
    { path: 'simple-modal', component: SimpleRouterModalComponent },
    { path: 'no-close-button-modal', component: NoCloseButtonModalComponent },
    { path: 'no-simple-close-modal', component: NoSimpleCloseModalComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        ModalModule
    ],
    declarations: [
        Sample2Component,
        SimpleRouterModalComponent,
        NoCloseButtonModalComponent,
        NoSimpleCloseModalComponent
    ]
})
export class Sample2Module { }
