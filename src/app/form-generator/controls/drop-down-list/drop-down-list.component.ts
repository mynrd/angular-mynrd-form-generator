import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormControlModel } from '../../models/form-control.model';
import { MatDialog } from '@angular/material/dialog';
import { DropDownListConfigComponent } from './drop-down-list-config.component';

@Component({
  selector: 'app-drop-down-list',
  templateUrl: './drop-down-list.component.html',
  styleUrls: ['./drop-down-list.component.scss']
})
export class DropDownListComponent implements OnInit {

  @Input() data: FormControlModel;
  @Input() controlList: FormControlModel[];
  @Input() actualControl: boolean;
  @Output() public deleteControl: EventEmitter<any> = new EventEmitter();

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openSettings(): void {

    const dialogRef = this.dialog.open(DropDownListConfigComponent, {
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

