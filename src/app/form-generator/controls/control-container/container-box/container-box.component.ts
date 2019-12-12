import { Component, OnInit, Input, } from '@angular/core';
import { ConfigControlContainer, FormControlModel } from '../../../../form-generator/models/form-control.model';
import { FormService } from '../../../../form-generator/form-service.p';
import { AvailableFormControlModel } from '../../../../form-generator/models/form-control-static';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { PopUpAddControlComponent } from 'src/app/form-generator/pop-up-add-control/pop-up-add-control.component';

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

  onDoneUpdatingOrder(data: {
    update: boolean, controlList: FormControlModel[]
  }) {
    if (data.update) {
      this.data.controlList = data.controlList;
    }
    this.enableReorderControl = false;
  }

}
