import { Component, OnInit, Inject } from '@angular/core';
import { FormControlWidget } from '../models/form-control-widget';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pop-up-add-control',
  templateUrl: './pop-up-add-control.component.html',
  styleUrls: ['./pop-up-add-control.component.scss']
})
export class PopUpAddControlComponent implements OnInit {

  availableControls: FormControlWidget[];

  constructor(@Inject(MAT_DIALOG_DATA) data: FormControlWidget[]) {
    this.availableControls = data;
  }

  ngOnInit() {
  }

}
