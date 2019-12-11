import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControlModel } from '../../models/form-control.model';
import { MatDialog } from '@angular/material/dialog';
import { TextContainerConfigComponent } from './text-container-config.component';

@Component({
  selector: 'app-text-container',
  templateUrl: './text-container.component.html',
  styleUrls: ['./text-container.component.scss']
})
export class TextContainerComponent implements OnInit {
  @Input() data: FormControlModel;
  @Input() controlList: FormControlModel[];
  @Input() actualControl: boolean;
  @Output() public deleteControl: EventEmitter<any> = new EventEmitter();

  constructor(public dialog: MatDialog) {
  }

  ngOnInit() {
  }

  openSettings(): void {
    const dialogRef = this.dialog.open(TextContainerConfigComponent, {
      width: '500px',
      data: this.data
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }


  onDeleteControl(control: FormControlModel): void {
    let data: any = {
      controlList: this.controlList,
      control: control
    };
    this.deleteControl.emit(data);
  }

  public isContentType(contentType: string): boolean {
    return this.data.configTextContainer.containerType === contentType;
  }
}
