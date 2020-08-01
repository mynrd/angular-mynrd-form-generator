import { Component, OnInit, Input, Inject, } from '@angular/core';
import { ConfigControlContainer, FormControlModel } from '../../../models/form-control.model';
import { FormService } from '../../../form-service.p';
import { AvailableFormControlModel } from '../../../models/form-control-static';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PopUpAddControlComponent } from 'src/app/form-generator/pop-up-add-control/pop-up-add-control.component';

@Component({
  selector: 'app-container-box-config',
  templateUrl: './container-box-config.component.html',
  styleUrls: []
})
export class ContainerBoxConfigComponent {

  tempItem: {
    wrappedWith: string,
    panelTitle: string,
    panelDescription: string,
    panelExpanded: boolean,
    controlName: string
  }

  constructor(
    public dialogRef: MatDialogRef<ContainerBoxConfigComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfigControlContainer
  ) {
    this.tempItem = {
      wrappedWith: data.wrappedWith,
      panelTitle: data.panelTitle,
      panelDescription: data.panelDescription,
      panelExpanded: data.panelExpanded,
      controlName: data.controlName,
    };
  }

  saveConfig(): void {
    this.data.wrappedWith = this.tempItem.wrappedWith;
    this.data.panelTitle = this.tempItem.panelTitle;
    this.data.panelDescription = this.tempItem.panelDescription;
    this.data.panelExpanded = this.tempItem.panelExpanded;
    this.data.controlName = this.tempItem.controlName;
    this.dialogRef.close();
  }

}
