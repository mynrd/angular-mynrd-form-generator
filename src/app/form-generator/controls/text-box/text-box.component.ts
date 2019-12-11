import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControlModel } from '../../models/form-control.model';
import { MatDialog } from '@angular/material/dialog';
import { TextBoxConfigComponent } from './text-box-config.component';
import { FormControlStatic } from '../../models/form-control-static';

@Component({
  selector: 'app-text-box',
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.scss']
})
export class TextBoxComponent implements OnInit {
  @Input() data: FormControlModel;
  @Input() controlList: FormControlModel[];
  @Input() actualControl: boolean;
  @Output() public deleteControl: EventEmitter<any> = new EventEmitter();

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openSettings(): void {
    const dialogRef = this.dialog.open(TextBoxConfigComponent, {
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
