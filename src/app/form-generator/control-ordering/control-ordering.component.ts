import { Component, Input, Inject, Output, EventEmitter } from '@angular/core';
import { FormControlModel } from '../models/form-control.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-control-ordering',
  templateUrl: './control-ordering.component.html',
  styleUrls: ['./control-ordering.component.scss']
})
export class ControlOrderingComponent {

  @Input() controlList: FormControlModel[];
  @Output() doneUpdatingOrder = new EventEmitter<any>();

  constructor() {

  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.controlList, event.previousIndex, event.currentIndex);
  }

  onDoneUpdatingOrder(): void {
    this.doneUpdatingOrder.emit({
      update: true, controlList: this.controlList
    });
  }

  onCancelUpdatingOrder(): void {
    this.doneUpdatingOrder.emit({
      update: false, controlList: null
    });
  }

}
