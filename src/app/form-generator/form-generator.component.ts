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

  onAddControlItem(controlList: FormControlModel[]): void {
    this.formService.addControl(controlList);
  }

  onDeleteControl(data: {
    controlList: FormControlModel[],
    control: FormControlModel
  }): void {
    this.formService.deleteControl(data.control, data.controlList);
  }

}
