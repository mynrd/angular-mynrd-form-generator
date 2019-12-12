import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormControlModel, ValueText } from '../../models/form-control.model';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, of, Subscription, BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-radio-button-config',
    template: `

    <h1 mat-dialog-title>Radio Button Configuration</h1>
    <div mat-dialog-content>
    
        <mat-tab-group>
            <mat-tab label="General">
                <p>
                    <mat-form-field>
                        <mat-label>Display Type</mat-label>
                        <mat-select [(ngModel)]="tempItem.displayType">
                            <mat-option value='standard'>Standard</mat-option>
                            <mat-option value='standard'>Horizontal</mat-option>
                        </mat-select>
                    </mat-form-field>
                </p>
                <p>
                    <mat-form-field appearance="legacy">
                        <mat-label>Description</mat-label>
                        <input matInput
                               [(ngModel)]="tempItem.description">
                    </mat-form-field>
                </p>
    
                <p>
                    <mat-form-field appearance="legacy">
                        <mat-label>Label</mat-label>
                        <input matInput
                               [(ngModel)]="tempItem.label">
                    </mat-form-field>
                </p>
                <p>
                    <mat-checkbox [(ngModel)]="tempItem.required">Required?</mat-checkbox>
                </p>
            </mat-tab>
    
            <mat-tab label="Button List">
                <p>Update Buttons</p>
    
                <button mat-raised-button
                        (click)="addNewRow()"> Insert Row </button>
                <br />
                <br />
                <table mat-table
                       [dataSource]="dataSource"
                       class="mat-elevation-z8"
                       style="width:100%">
                    <ng-container matColumnDef="value">
                        <th mat-header-cell
                            *matHeaderCellDef>Value</th>
                        <td mat-cell
                            *matCellDef="let element">
                            <mat-form-field>
                                <input matInput
                                       [(ngModel)]="element.value">
                            </mat-form-field>
                        </td>
                    </ng-container>
    
                    <ng-container matColumnDef="text">
                        <th mat-header-cell
                            *matHeaderCellDef>Text</th>
                        <td mat-cell
                            *matCellDef="let element">
                            <mat-form-field>
                                <input matInput
                                       [(ngModel)]="element.text">
                            </mat-form-field>
                        </td>
                    </ng-container>
    
                    <ng-container matColumnDef="action">
                        <th mat-header-cell
                            *matHeaderCellDef></th>
                        <td mat-cell
                            *matCellDef="let element"
                            style="padding-right: 0;">
                            <button mat-icon-button>
                                <mat-icon>delete</mat-icon>
                            </button>
                        </td>
                    </ng-container>
    
                    <tr mat-header-row
                        *matHeaderRowDef="displayedColumns"></tr>
                    <tr mat-row
                        *matRowDef="let row; columns: displayedColumns;"></tr>
    
                </table>
    
            </mat-tab>
        </mat-tab-group>
    </div>
    <div mat-dialog-actions>
        <button mat-button
                (click)="saveConfig()"
                cdkFocusInitial>Save Configuration</button>
        <p *ngIf="messageInfo!== ''"
           style="color: red;">
            {{messageInfo}}
        </p>
    </div>
    

    `,
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
    };

    dataSource?: MatTableDataSource<ValueText>;

    constructor(
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


        this.dialogRef.close();
    }

    addNewRow(): void {

        let vt: ValueText = new ValueText({
            value: "val_" + this.makeid(5), text: "text"
        });
        this.tempItem.buttons.push(vt);
        this.dataSource = new MatTableDataSource<ValueText>(this.tempItem.buttons);
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

