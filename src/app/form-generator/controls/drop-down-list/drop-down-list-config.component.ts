import { Component, OnInit, Input, Inject, AfterContentInit, OnDestroy } from '@angular/core';
import { FormControlModel, ValueText } from '../../models/form-control.model';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, of, Subscription, BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-drop-down-list-config',
    templateUrl: './drop-down-list-config.component.html',
    styles: [`.mat-form-field{width:100%}`]
})
export class DropDownListConfigComponent implements OnInit, OnDestroy {

    displayedColumns: string[] = ["value", "text", "action"];
    observableSource: Observable<ValueText[]> = new Observable<ValueText[]>();
    messageInfo: string = "";
    tempItem: {
        controlName?: string,
        required?: boolean,
        label?: string
        dataSource: ValueText[],
        useApiUrl: boolean
        apiUrl: string
    };

    dataSource?: MatTableDataSource<ValueText>;

    constructor(
        public dialogRef: MatDialogRef<DropDownListConfigComponent>,
        @Inject(MAT_DIALOG_DATA) public data: FormControlModel
    ) {
        this.tempItem = {
            controlName: this.data.controlName || "",
            label: this.data.label || "",
            required: this.data.configDropDownList.required || false,
            dataSource: (this.data.configDropDownList.dataSource || []).slice(),
            apiUrl: this.data.configDropDownList.apiUrl || "",
            useApiUrl: this.data.configDropDownList.useApiUrl || false
        };
    }

    ngOnDestroy() {
    }

    ngOnInit() {
        this.dataSource = new MatTableDataSource<ValueText>(this.tempItem.dataSource);
    }

    saveConfig(): void {

        this.tempItem.dataSource.forEach(element => {
            if (this.tempItem.dataSource.filter(f => f.value === element.value).length > 1) {
                this.messageInfo = "Please check datasource for any duplicate data";
            }
        });
        if (this.messageInfo !== "") {
            return;
        }

        this.data.controlName = this.tempItem.controlName;
        this.data.label = this.tempItem.label;
        this.data.configDropDownList.required = this.tempItem.required;
        this.data.configDropDownList.useApiUrl = this.tempItem.useApiUrl;
        if (this.data.configDropDownList.useApiUrl) {
            this.data.configDropDownList.dataSource = undefined;
        } else {
            this.data.configDropDownList.dataSource = this.tempItem.dataSource;
            this.data.configDropDownList.apiUrl = "";
        }

        this.dialogRef.close();
    }

    addNewRow(): void {

        let vt: ValueText = new ValueText({
            value: "val_" + this.makeid(5), text: "text"
        });
        this.tempItem.dataSource.push(vt);
        this.dataSource = new MatTableDataSource<ValueText>(this.tempItem.dataSource);
    }

    private makeid(length: number) {
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
}

