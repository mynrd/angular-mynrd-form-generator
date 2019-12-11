import { Component, OnInit } from '@angular/core';
import { FormService } from '../form-service.p';
import { FormControlModel } from '../models/form-control.model';
import { FormControlWidget } from '../models/form-control-widget';

@Component({
  selector: 'app-pop-up-add-control',
  templateUrl: './pop-up-add-control.component.html',
  styleUrls: ['./pop-up-add-control.component.scss']
})
export class PopUpAddControlComponent implements OnInit {

  availableControl: FormControlWidget[] = [];
  data: {
    message: string
  }

  constructor(formService: FormService) {
    this.availableControl = formService.getAvailableControls();
  }

  ngOnInit() {
  }

}
