import { Component, OnInit, Input, Inject, AfterContentInit, OnDestroy } from '@angular/core';
import { FormControlModel, ValueText } from '../../models/form-control.model';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, of, Subscription, BehaviorSubject } from 'rxjs';

const CONTAINER_TYPE: ValueText[] = [
    new ValueText({ value: "html", text: "Html" }),
    new ValueText({ value: "mat-label", text: "Label" }),
    new ValueText({ value: "h1", text: "Header 1" }),
    new ValueText({ value: "h2", text: "Header 2" }),
    new ValueText({ value: "h3", text: "Header 3" }),
    new ValueText({ value: "h4", text: "Header 4" }),
    new ValueText({ value: "h5", text: "Header 5" }),
];

@Component({
    selector: 'app-text-container-config',
    templateUrl: './text-container-config.component.html',
    styles: [`.mat-form-field{width:100%}`]
})
export class TextContainerConfigComponent {

    tempItem: {
        containerType: string,
        content: string,
    };

    containerTypeSource: ValueText[] = CONTAINER_TYPE;

    constructor(
        public dialogRef: MatDialogRef<TextContainerConfigComponent>,
        @Inject(MAT_DIALOG_DATA) public data: FormControlModel
    ) {
        this.tempItem = {
            containerType: this.data.configTextContainer.containerType,
            content: this.data.configTextContainer.content,
        };
    }

    saveConfig(): void {
        this.data.configTextContainer.containerType = this.tempItem.containerType;
        this.data.configTextContainer.content = this.tempItem.content;
        this.dialogRef.close();
    }

}

