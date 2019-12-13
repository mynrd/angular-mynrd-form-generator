import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ValueText, FormControlModel } from '../../models/form-control.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormService } from '../../form-service.p';

@Component({
    selector: 'app-radio-button-config',
    templateUrl: 'radio-button-config.component.html',
    styles: [`.mat-form-field{width:100%}`]
})
export class RadioButtonConfigComponent implements OnInit, OnDestroy {

    displayedColumns: string[] = ["value", "text", "action"];
    observableSource: Observable<ValueText[]> = new Observable<ValueText[]>();
    messageInfo: string = "";

    tempItem: {
        controlName?: string,
        required?: boolean,
        label?: string
        buttons: ValueText[],
        description: string,
        displayType: string,
        labelType: string,
        buttonsInline: boolean
    };

    dataSource?: MatTableDataSource<ValueText>;

    constructor(
        public formService: FormService,
        public dialogRef: MatDialogRef<RadioButtonConfigComponent>,
        @Inject(MAT_DIALOG_DATA) public data: FormControlModel
    ) {
        this.tempItem = {
            controlName: this.data.controlName || "",
            label: this.data.label || "",
            required: this.data.configRadioButton.required || false,
            buttons: (this.data.configRadioButton.buttons || []).slice(),
            description: this.data.configRadioButton.description,
            displayType: this.data.configRadioButton.displayType,
            labelType: this.data.configRadioButton.labelType,
            buttonsInline: this.data.configRadioButton.buttonsInline,
        };
    }

    ngOnDestroy() {
    }

    ngOnInit() {
        this.dataSource = new MatTableDataSource<ValueText>(this.tempItem.buttons);
    }

    saveConfig(): void {

        this.tempItem.buttons.forEach(element => {
            if (this.tempItem.buttons.filter(f => f.value === element.value).length > 1) {
                this.messageInfo = "Please check datasource for any duplicate data";
            }
        });
        if (this.messageInfo !== "") {
            return;
        }

        this.data.controlName = this.tempItem.controlName;
        this.data.label = this.tempItem.label;
        this.data.configRadioButton.required = this.tempItem.required;
        this.data.configRadioButton.displayType = this.tempItem.displayType;
        this.data.configRadioButton.description = this.tempItem.description;
        this.data.label = this.tempItem.label;
        this.data.configRadioButton.required = this.tempItem.required;
        this.data.configRadioButton.buttons = this.tempItem.buttons;
        this.data.configRadioButton.labelType = this.tempItem.labelType;
        this.data.configRadioButton.buttonsInline = this.tempItem.buttonsInline;

        this.dialogRef.close();
    }

    addNewRow(): void {
        let vt: ValueText = new ValueText({
            value: "val_" + this.formService.makeid(5), text: "text"
        });
        this.tempItem.buttons.push(vt);
        this.dataSource = new MatTableDataSource<ValueText>(this.tempItem.buttons);
    }

}