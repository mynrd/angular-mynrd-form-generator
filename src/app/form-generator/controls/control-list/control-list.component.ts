import { Component, Input } from '@angular/core';
import { FormControlModel } from '../../models/form-control.model';
import { AvailableFormControlModel } from '../../models/form-control-static';
import { FormService } from '../../form-service.p';

@Component({
    selector: 'app-control-list',
    templateUrl: './control-list.component.html',
    styleUrls: []
})
export class ControlListComponent {

    @Input() item: FormControlModel;
    @Input() actualControl: boolean;
    @Input() controlList: FormControlModel[];

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

    onAddControlItem(): void {
        this.formService.addControl(this.controlList);
    }

    onDeleteControl(data: {
        controlList: FormControlModel[],
        control: FormControlModel
    }): void {
        this.formService.deleteControl(data.control, data.controlList);
    }
}