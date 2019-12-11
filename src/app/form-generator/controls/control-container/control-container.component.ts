import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControlModel, ConfigControlContainer } from '../../models/form-control.model';
import { MatDialog } from '@angular/material/dialog';
import { ControlContainerConfigComponent } from './control-container-config.component';

@Component({
  selector: 'app-control-container',
  templateUrl: './control-container.component.html',
  styleUrls: ['./control-container.component.scss']
})
export class ControlContainerComponent implements OnInit {
  @Input() data: FormControlModel;
  @Input() actualControl: boolean;
  @Input() controlList: FormControlModel[];
  @Output() addControl = new EventEmitter<FormControlModel[]>();
  @Output() public deleteControl: EventEmitter<any> = new EventEmitter();

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openSettings(): void {
    const dialogRef = this.dialog.open(ControlContainerConfigComponent, {
      width: '500px',
      data: this.data
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  onAddControl(controls: FormControlModel[]): void {
    this.addControl.emit(controls);
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
    if (this.data.controlContainers == undefined)
      this.data.controlContainers = [];

    this.data.controlContainers.push(container);
  }

}
