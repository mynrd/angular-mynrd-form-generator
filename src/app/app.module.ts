import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormGeneratorComponent } from './form-generator/form-generator.component';
import { MaterialModule } from './material-module';
import { PopUpAddControlComponent } from './form-generator/pop-up-add-control/pop-up-add-control.component';
import { FormService } from './form-generator/form-service.p';
import { TextBoxComponent } from './form-generator/controls/text-box/text-box.component';
import { CheckBoxComponent } from './form-generator/controls/check-box/check-box.component';
import { DropDownListComponent } from './form-generator/controls/drop-down-list/drop-down-list.component';
import { ControlActionButtonComponent } from './form-generator/controls/control-action-button/control-action-button.component';
import { TextBoxConfigComponent } from './form-generator/controls/text-box/text-box-config.component';
import { FormsModule } from '@angular/forms';
import { CheckBoxConfigComponent } from './form-generator/controls/check-box/check-box-config.component';
import { DropDownListConfigComponent } from './form-generator/controls/drop-down-list/drop-down-list-config.component';
import { DialogMessageComponent } from './shared/dialog-confirmation/dialog-message.component';

import { FlexLayoutModule } from "@angular/flex-layout";
import { TextContainerComponent } from './form-generator/controls/text-container/text-container.component';
import { TextContainerConfigComponent } from './form-generator/controls/text-container/text-container-config.component';
import { ControlContainerComponent } from './form-generator/controls/control-container/control-container.component';
import { ControlContainerConfigComponent } from './form-generator/controls/control-container/control-container-config.component';
import { ContainerBoxComponent } from './form-generator/controls/control-container/container-box/container-box.component';
import { ControlOrderingComponent } from './form-generator/control-ordering/control-ordering.component';

@NgModule({
  declarations: [
    AppComponent,
    FormGeneratorComponent,

    PopUpAddControlComponent,
    TextBoxConfigComponent,
    CheckBoxConfigComponent,
    DropDownListConfigComponent,
    TextContainerConfigComponent,
    ControlContainerConfigComponent,
    DialogMessageComponent,

    TextBoxComponent,
    CheckBoxComponent,
    DropDownListComponent,
    ControlActionButtonComponent,
    DialogMessageComponent,
    TextContainerComponent,
    ControlContainerComponent,
    ContainerBoxComponent,
    ControlOrderingComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule
  ],
  entryComponents: [
    DialogMessageComponent,
    PopUpAddControlComponent,
    TextBoxConfigComponent,
    CheckBoxConfigComponent,
    DropDownListConfigComponent,
    TextContainerConfigComponent,
    ControlContainerConfigComponent,
    ControlOrderingComponent
  ],
  providers: [FormService],
  bootstrap: [AppComponent]
})
export class AppModule { }
