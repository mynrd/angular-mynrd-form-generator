export class FormControlModel {

    public configTextBox: ConfigTextBox;
    public configDropDownList: ConfigDropDownList;
    public configTextContainer: ConfigTextContainer;
    public controlContainers: ConfigControlContainer[];
    public configRadioButton: ConfigRadioButton;

    public controlDescription: string;

    constructor(public controlType: string,
        public controlName: string,
        public label: string) {
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
    public controlContainerId: string;
    public controlList: FormControlModel[];
    public wrappedWith: string;
    public panelTitle: string;
    public panelDescription: string;
    public panelExpanded: boolean;

    constructor() {
        this.wrappedWith = "div";
        this.controlList = [];
    }

    public addControlItem(control: FormControlModel) {
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

export class ConfigRadioButton {
    public buttons: ValueText[] = [];
    public displayType: string = "";
    public description: string = "";
    public required?: boolean;
    public labelType: string;
    public buttonsInline: boolean;

    constructor() {
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