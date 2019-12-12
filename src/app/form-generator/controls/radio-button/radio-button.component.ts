import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControlModel } from '../../models/form-control.model';
import { MatDialog } from '@angular/material/dialog';
import { RadioButtonConfigComponent } from './radio-button-config.component';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss']
})
export class RadioButtonComponent implements OnInit {

  @Input() data: FormControlModel;
  @Input() controlList: FormControlModel[];
  @Input() actualControl: boolean;
  @Output() public deleteControl: EventEmitter<any> = new EventEmitter();

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    console.log(this.data);
  }

  openSettings(): void {

    const dialogRef = this.dialog.open(RadioButtonConfigComponent, {
      width: '600px',
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
