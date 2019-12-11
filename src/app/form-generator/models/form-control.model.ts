import { ThrowStmt } from '@angular/compiler';

export class FormControlModel {

    public configTextBox: ConfigTextBox;
    public configDropDownList: ConfigDropDownList;
    public configTextContainer: ConfigTextContainer;
    public controlContainers: ConfigControlContainer[];

    public controlDescription: string;

    constructor(public controlType: string,
        public controlName: string,
        public label: string) {
        // this.configTextBox = new ConfigTextBox();
        // this.configDropDownList = new ConfigDropDownList();
        // this.configTextContainer = new ConfigTextContainer();
        // this.controlContainers = [];
    }
}

export class ConfigTextBox {
    public placeholder: string;
    public required?: boolean;
    public inputType?: string;
    constructor() {
    }
}

export class ConfigControlContainer {
    public controlList: FormControlModel[];
    constructor() {
        this.controlList = [];
    }

    public addControl(control: FormControlModel) {
        this.controlList.push(control);
    }
}

export class ConfigDropDownList {
    public dataSource: ValueText[] = []
    public useApi: boolean = false;
    public apiUrl: string = "";
    public required: boolean;
    public useApiUrl: boolean

    constructor() {
        this.required = false;
        this.useApiUrl = false;
    }
}

export class ConfigTextContainer {
    public containerType: string;
    public content: string;
    constructor(options?: {
        containerType: string,
        content: string
    }) {
        if (options != undefined) {
            this.containerType = options.containerType;
            this.content = options.content;
        }
    }
}

export class ValueText {
    public value: string;
    public text: string;
    public action: string;
    constructor(options?: {
        value: string,
        text: string,
        action?: string
    }) {

        if (options != undefined) {
            this.value = options.value;
            this.text = options.text;
            this.action = options.action;
        }
    }
}