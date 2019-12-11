import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormControlModel, ValueText, ConfigTextBox } from '../../models/form-control.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-text-box-config',
    templateUrl: './text-box-config.component.html',
})
export class TextBoxConfigComponent implements OnInit {

    inputTypeList: ValueText[] = [
        new ValueText({ value: "", text: "---" }),
        new ValueText({ value: "text", text: "Text" }),
        new ValueText({ value: "password", text: "Password" }),
        new ValueText({ value: "email", text: "email" }),
        new ValueText({ value: "hidden", text: "Hidden" }),
    ];

    tempItem: {
        controlName?: string,
        placeholder?: string,
        required?: boolean,
        label?: string,
        inputType?: string
    };

    constructor(
        public dialogRef: MatDialogRef<TextBoxConfigComponent>,
        @Inject(MAT_DIALOG_DATA) public data: FormControlModel) {

        if (this.data.configTextBox == null)
            this.data.configTextBox = new ConfigTextBox();

        this.tempItem = {
            controlName: this.data.controlName || "",
            label: this.data.label || "",
            required: this.data.configTextBox.required || false,
            placeholder: this.data.configTextBox.placeholder || "",
            inputType: this.data.configTextBox.inputType || "text",
        };
    }

    ngOnInit() {
    }

    saveConfig(): void {
        this.data.controlName = this.tempItem.controlName;
        this.data.label = this.tempItem.label;
        this.data.configTextBox.required = this.tempItem.required;
        this.data.configTextBox.placeholder = this.tempItem.placeholder;
        this.data.configTextBox.inputType = this.tempItem.inputType;
        this.dialogRef.close();
    }
}
