import { FormControlModel, ValueText, ConfigTextContainer } from './models/form-control.model';
import { FormControlWidget } from './models/form-control-widget';
import { FormControlStatic, AvailableFormControlModel } from './models/form-control-static';

export class FormService {
    private availableControls: FormControlWidget[] = [];
    private controlList: FormControlModel[] = [];

    constructor() {
        this.availableControls.push(this.convertToFormControlWidget(FormControlStatic.CheckBox));
        this.availableControls.push(this.convertToFormControlWidget(FormControlStatic.TextBox));
        this.availableControls.push(this.convertToFormControlWidget(FormControlStatic.DropDownList));
        this.availableControls.push(this.convertToFormControlWidget(FormControlStatic.TextContainer));
        this.availableControls.push(this.convertToFormControlWidget(FormControlStatic.ControlContainer));
    }

    private convertToFormControlWidget(data: AvailableFormControlModel): FormControlWidget {
        return new FormControlWidget(data.name, data.description);
    }

    public getAvailableControls(): FormControlWidget[] {
        return this.availableControls.slice();
    }

    public get getControlList(): FormControlModel[] {
        return this.controlList;
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

    public addControl(widget: FormControlWidget): FormControlModel {
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
        };
    }
}
