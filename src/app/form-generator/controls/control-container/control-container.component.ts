import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControlModel, ConfigControlContainer } from '../../models/form-control.model';
import { MatDialog } from '@angular/material/dialog';
import { ControlContainerConfigComponent } from './control-container-config.component';
import { FormService } from '../../form-service.p';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-control-container',
  templateUrl: './control-container.component.html',
  styleUrls: ['./control-container.component.scss']
})
export class ControlContainerComponent  {
  @Input() data: FormControlModel;
  @Input() actualControl: boolean;
  @Input() controlList: FormControlModel[];
  @Output() public deleteControl: EventEmitter<any> = new EventEmitter();

  constructor(public dialog: MatDialog, public formService: FormService) { }

  openSettings(): void {
    const dialogRef = this.dialog.open(ControlContainerConfigComponent, {
      width: '500px',
      data: this.data
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  onDeleteControl(control: FormControlModel): void {
    let data: any = {
      controlList: this.controlList,
      control: control
    };
    this.deleteControl.emit(data);
  }

  onDeleteChildControl(data: {
    controlList: FormControlModel[],
    control: FormControlModel
  }): void {
    this.deleteControl.emit(data);
  }

  addColumn(): void {
    let container = new ConfigControlContainer();
    container.controlList = [];
    container.controlContainerId = "container_" + this.formService.makeid(10);
    if (this.data.controlContainers == undefined)
      this.data.controlContainers = [];

    this.data.controlContainers.push(container);
  }

}
