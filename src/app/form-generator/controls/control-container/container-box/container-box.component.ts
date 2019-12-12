import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ConfigControlContainer, FormControlModel } from '../../../../form-generator/models/form-control.model';
import { FormService } from '../../../../form-generator/form-service.p';
import { AvailableFormControlModel } from '../../../../form-generator/models/form-control-static';

@Component({
  selector: 'app-container-box',
  templateUrl: './container-box.component.html',
  styleUrls: ['./container-box.component.scss']
})
export class ContainerBoxComponent implements OnInit {
  @Input() data: ConfigControlContainer;
  @Input() actualControl: boolean;
  @Output() addControl = new EventEmitter<FormControlModel[]>();
  @Output() deleteControl = new EventEmitter<any>();

  controls: any = {
    textbox: AvailableFormControlModel,
    checkbox: AvailableFormControlModel,
    dropdownlist: AvailableFormControlModel,
    textContainer: AvailableFormControlModel,
    controlContainer: AvailableFormControlModel,
  }

  constructor(public formService: FormService) {
    this.controls = this.formService.getStaticControls();
  }

  ngOnInit() {
  }

  onAddControl(): void {
    this.addControl.emit(this.data.controlList);
  }

  onDeleteControl(data: {
    controlList: FormControlModel[],
    control: FormControlModel
  }): void {
    this.deleteControl.emit(data);
  }

}
