import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopUpAddControlComponent } from './pop-up-add-control/pop-up-add-control.component';
import { FormControlModel, ValueText, ConfigTextContainer } from './models/form-control.model';
import { FormControlStatic, AvailableFormControlModel } from './models/form-control-static';
import { FormService } from './form-service.p';
import { DialogModel, DialogMessageComponent } from '../shared/dialog-confirmation/dialog-message.component';

@Component({
  selector: 'app-form-generator',
  templateUrl: './form-generator.component.html',
  styleUrls: ['./form-generator.component.scss']
})
export class FormGeneratorComponent implements OnInit {

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

  ngOnInit() {
  }

  onAddControl(controlList: FormControlModel[]): void {
    const dialogRef = this.dialog.open(PopUpAddControlComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        let data = this.formService.addControl(result);
        controlList.push(data);
      }
    });
  }

  onDeleteControl(data: {
    controlList: FormControlModel[],
    control: FormControlModel
  }): void {
    let message = new DialogModel("Confirmation", "Continue Delete?");

    const dialogRef = this.dialog.open(DialogMessageComponent, {
      width: '500px',
      data: message
    });

    dialogRef.afterClosed().subscribe(result => {
      const index = data.controlList.indexOf(data.control);
      data.controlList.splice(index, 1);
    });

  }

}
