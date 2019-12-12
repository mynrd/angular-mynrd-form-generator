import { Component, OnInit, Input, } from '@angular/core';
import { ConfigControlContainer, FormControlModel } from '../../../../form-generator/models/form-control.model';
import { FormService } from '../../../../form-generator/form-service.p';
import { AvailableFormControlModel } from '../../../../form-generator/models/form-control-static';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { PopUpAddControlComponent } from 'src/app/form-generator/pop-up-add-control/pop-up-add-control.component';
import { ContainerBoxConfigComponent } from './container-box-config.component';

@Component({
  selector: 'app-container-box',
  templateUrl: './container-box.component.html',
  styleUrls: ['./container-box.component.scss']
})
export class ContainerBoxComponent {
  @Input() data: ConfigControlContainer;
  @Input() actualControl: boolean;
  enableReorderControl: boolean = false;
  temporaryControlForOrdering: FormControlModel[];

  controls: any = {
    textbox: AvailableFormControlModel,
    checkbox: AvailableFormControlModel,
    dropdownlist: AvailableFormControlModel,
    textContainer: AvailableFormControlModel,
    controlContainer: AvailableFormControlModel,
  }

  constructor(public formService: FormService, public dialog: MatDialog) {
    this.controls = this.formService.getStaticControls();
  }

  onAddControlItem(): void {
    this.formService.addControl(this.data.controlList);
  }

  onDeleteControl(data: {
    controlList: FormControlModel[],
    control: FormControlModel
  }): void {
    this.formService.deleteControl(data.control, data.controlList);
  }

  reorderControls() {
    this.temporaryControlForOrdering = this.data.controlList.slice();
    this.enableReorderControl = true;
  }

  openSetting() {
    const dialogRef = this.dialog.open(ContainerBoxConfigComponent, {
      width: '500px',
      data: this.data
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  onDoneUpdatingOrder(data: {
    update: boolean, controlList: FormControlModel[]
  }) {
    if (data.update) {
      this.data.controlList = data.controlList;
    }
    this.enableReorderControl = false;
  }

}

@Component({
  selector: 'app-container-box-control',
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
  `,
  styleUrls: []
})
export class ContainerBoxControlComponent {

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