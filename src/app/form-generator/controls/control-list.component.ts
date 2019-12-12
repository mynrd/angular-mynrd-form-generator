import { Component, Input } from '@angular/core';
import { FormControlModel } from '../models/form-control.model';
import { AvailableFormControlModel } from '../models/form-control-static';
import { FormService } from '../form-service.p';

@Component({
    selector: 'app-control-list',
    template: `
    <app-text-box *ngIf="item.controlType === controls.textbox.name"
                  [controlList]="controlList"
                  [actualControl]="actualControl"
                  (deleteControl)="onDeleteControl($event)"
                  [data]="item"></app-text-box>
    <app-check-box *ngIf="item.controlType === controls.checkbox.name"
                    [controlList]="controlList"
                    [actualControl]="actualControl"
                    (deleteControl)="onDeleteControl($event)"
                    [data]="item"></app-check-box>
    <app-drop-down-list *ngIf="item.controlType === controls.dropdownlist.name"
                        [controlList]="controlList"
                        [actualControl]="actualControl"
                        (deleteControl)="onDeleteControl($event)"
                        [data]="item"></app-drop-down-list>
    <app-text-container *ngIf="item.controlType === controls.textContainer.name"
                        [controlList]="controlList"
                        [actualControl]="actualControl"
                        (deleteControl)="onDeleteControl($event)"
                        [data]="item"></app-text-container>
    <app-control-container *ngIf="item.controlType === controls.controlContainer.name"
                            [controlList]="controlList"
                            [actualControl]="actualControl"
                            (deleteControl)="onDeleteControl($event)"
                            (addControlItem)="onAddControlItem($event)"
                            [data]="item"></app-control-container>
    <app-radio-button *ngIf="item.controlType === controls.radioButton.name"
                            [controlList]="controlList"
                            [actualControl]="actualControl"
                            (deleteControl)="onDeleteControl($event)"
                            [data]="item"></app-radio-button>
    `,
    styleUrls: []
})
export class ControlListComponent {

    @Input() item: FormControlModel;
    @Input() actualControl: boolean;
    @Input() controlList: FormControlModel[];

    controls: any = {
        textbox: AvailableFormControlModel,
        checkbox: AvailableFormControlModel,
        dropdownlist: AvailableFormControlModel,
        textContainer: AvailableFormControlModel,
        controlContainer: AvailableFormControlModel,
    }

    constructor(public formService: FormService) {
        this.controls = this.formService.getStaticControls();
    }

    onAddControlItem(): void {
        this.formService.addControl(this.controlList);
    }

    onDeleteControl(data: {
        controlList: FormControlModel[],
        control: FormControlModel
    }): void {
        this.formService.deleteControl(data.control, data.controlList);
    }
}