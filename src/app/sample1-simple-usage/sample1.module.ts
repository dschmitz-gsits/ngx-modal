import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModalModule } from 'projects/ngx-modal/src/public-api';
import { Sample1Component } from './sample1.component';

export const routes: Routes = [
    { path: '', component: Sample1Component, pathMatch: 'full' }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        ModalModule
    ],
    declarations: [
        Sample1Component
    ]
})
export class Sample1Module { }