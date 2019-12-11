import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControlModel } from '../../models/form-control.model';
import { TextBoxConfigComponent } from '../text-box/text-box-config.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-control-action-button',
  templateUrl: './control-action-button.component.html',
  styleUrls: ['./control-action-button.component.scss']
})
export class ControlActionButtonComponent implements OnInit {

  @Input() data: FormControlModel;
  @Input() hideDelete: boolean = false;
  @Input() hideSetting: boolean = false;
  @Output() public openSettings: EventEmitter<any> = new EventEmitter();
  @Output() public deleteControl: EventEmitter<FormControlModel> = new EventEmitter();

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  onOpenSettings(): void {
    this.openSettings.emit();
  }

  onDeleteControl(): void {
    this.deleteControl.emit(this.data);
  }

}
