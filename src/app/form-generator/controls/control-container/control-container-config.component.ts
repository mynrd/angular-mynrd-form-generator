import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormControlModel, ValueText } from '../../models/form-control.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export class ControlContainerTemp {
    public containerList: ControlContainerTemp[];
}

@Component({
    selector: 'app-control-container-config',
    templateUrl: './control-container-config.component.html',
})
export class ControlContainerConfigComponent implements OnInit {


    constructor(
        public dialogRef: MatDialogRef<ControlContainerConfigComponent>,
        @Inject(MAT_DIALOG_DATA) public data: FormControlModel) {

    }

    ngOnInit() {
    }

    saveConfig(): void {

        this.dialogRef.close();
    }
}
