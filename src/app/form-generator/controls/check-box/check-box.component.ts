import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControlModel } from '../../models/form-control.model';
import { MatDialog } from '@angular/material/dialog';
import { CheckBoxConfigComponent } from './check-box-config.component';

@Component({
  selector: 'app-check-box',
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.scss']
})
export class CheckBoxComponent implements OnInit {

  @Input() data: FormControlModel;
  @Input() actualControl: boolean;
  @Input() controlList: FormControlModel[];
  @Output() public deleteControl: EventEmitter<any> = new EventEmitter();

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openSettings(): void {
    const dialogRef = this.dialog.open(CheckBoxConfigComponent, {
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

}
