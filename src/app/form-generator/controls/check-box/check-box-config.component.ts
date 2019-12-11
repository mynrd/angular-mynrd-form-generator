import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormControlModel } from '../../models/form-control.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TextBoxConfigComponent } from '../text-box/text-box-config.component';

@Component({
  selector: 'app-check-box-config',
  templateUrl: './check-box-config.component.html',
})
export class CheckBoxConfigComponent implements OnInit {

  tempItem: {
    controlName?: string,
    label?: string
  };

  constructor(
    public dialogRef: MatDialogRef<TextBoxConfigComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FormControlModel) {

    this.tempItem = {
      controlName: this.data.controlName,
      label: this.data.label,
    };

  }

  ngOnInit() {
  }

  saveConfig(): void {
    this.data.controlName = this.tempItem.controlName;
    this.data.label = this.tempItem.label;
    this.dialogRef.close();
  }
}
