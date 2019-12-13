import { FormControlModel, ValueText, ConfigTextContainer, ConfigControlContainer } from './models/form-control.model';
import { FormControlWidget } from './models/form-control-widget';
import { FormControlStatic, AvailableFormControlModel } from './models/form-control-static';
import { MatDialog } from '@angular/material/dialog';
import { DialogModel, DialogMessageComponent } from '../shared/dialog-confirmation/dialog-message.component';
import { PopUpAddControlComponent } from './pop-up-add-control/pop-up-add-control.component';
import { Injectable } from '@angular/core';
import { ControlOrderingComponent } from './control-ordering/control-ordering.component';

@Injectable({
    providedIn: 'root'
})
export class FormService {
    private availableControls: FormControlWidget[] = [];
    public controlList: FormControlModel[] = [];

    constructor(public dialog: MatDialog) {
        this.availableControls.push(this.convertToFormControlWidget(FormControlStatic.CheckBox));
        this.availableControls.push(this.convertToFormControlWidget(FormControlStatic.TextBox));
        this.availableControls.push(this.convertToFormControlWidget(FormControlStatic.DropDownList));
        this.availableControls.push(this.convertToFormControlWidget(FormControlStatic.TextContainer));
        this.availableControls.push(this.convertToFormControlWidget(FormControlStatic.RadioButton));
        this.availableControls.push(this.convertToFormControlWidget(FormControlStatic.ControlContainer));
    }

    private convertToFormControlWidget(data: AvailableFormControlModel): FormControlWidget {
        return new FormControlWidget(data.name, data.description);
    }

    public getAvailableControls(): FormControlWidget[] {
        return this.availableControls.slice();
    }


    public makeid(length: number): string {
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    public deleteControl(control: FormControlModel, controlList: FormControlModel[]): void {
        let message = new DialogModel("Confirmation", "Continue Delete?");

        const dialogRef = this.dialog.open(DialogMessageComponent, {
            width: '500px',
            data: message
        });

        dialogRef.afterClosed().subscribe(result => {
            const index = controlList.indexOf(control);
            controlList.splice(index, 1);
        });
    }

    public addControl(controlList: FormControlModel[]): void {
        let availableControl = this.getAvailableControls();
        const dialogRef = this.dialog.open(PopUpAddControlComponent, {
            width: '500px',
            data: availableControl
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result != undefined) {
                let data = this.createControl(result);
                controlList.push(data);
            }
        });
    }

    public createControl(widget: FormControlWidget): FormControlModel {
        if (widget === null || widget == undefined) {
            return;
        }
        var data = new FormControlModel(widget.controlType, widget.controlType + "_" + this.makeid(5), widget.controlType);

        switch (data.controlType) {
            case FormControlStatic.CheckBox.name:
                data.controlDescription = FormControlStatic.CheckBox.description;
                break;
            case FormControlStatic.TextBox.name:
                data.controlDescription = FormControlStatic.TextBox.description;
                break;
            case FormControlStatic.ControlContainer.name:
                data.controlDescription = FormControlStatic.ControlContainer.description;

                let container = new ConfigControlContainer();
                container.wrappedWith = "div";
                data.controlContainers = [];
                data.controlContainers.push(container);
                break;
            case FormControlStatic.RadioButton.name:
                data.controlDescription = FormControlStatic.RadioButton.description;

                data.configRadioButton = {
                    buttons: [
                        new ValueText({ value: "1", text: "One" }),
                        new ValueText({ value: "2", text: "Two" }),
                    ],
                    required: false,
                    displayType: "standard",
                    description: "",
                    labelType: "label",
                    buttonsInline: false,
                };

                break;
            case FormControlStatic.DropDownList.name:
                data.controlDescription = FormControlStatic.DropDownList.description;
                data.configDropDownList = {
                    dataSource: [
                        new ValueText({ value: "1", text: "One" }),
                        new ValueText({ value: "2", text: "Two" }),
                    ],
                    useApi: false,
                    apiUrl: "",
                    required: false,
                    useApiUrl: false,
                };

                break;
            case FormControlStatic.TextContainer.name:
                data.controlDescription = FormControlStatic.TextContainer.description;
                data.configTextContainer = new ConfigTextContainer({
                    containerType: "mat-label", content: "Content"
                });
                break;
            default: return null;
        }

        return data;
    }

    public getStaticControls(): any {
        return {
            textbox: FormControlStatic.TextBox,
            checkbox: FormControlStatic.CheckBox,
            dropdownlist: FormControlStatic.DropDownList,
            textContainer: FormControlStatic.TextContainer,
            controlContainer: FormControlStatic.ControlContainer,
            radioButton: FormControlStatic.RadioButton,
        };
    }
}
