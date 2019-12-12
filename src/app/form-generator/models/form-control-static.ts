export class FormControlStatic {

    static get CheckBox(): AvailableFormControlModel {
        return new AvailableFormControlModel("checkbox", "Check box");
    }

    static get RadioButton(): AvailableFormControlModel {
        return new AvailableFormControlModel("radiobutton", "Radio Button");
    }

    static get TextBox(): AvailableFormControlModel {
        return new AvailableFormControlModel("textbox", "Text Box");
    }

    static get DropDownList(): AvailableFormControlModel {
        return new AvailableFormControlModel("dropdownlist", "Drop Down List");
    }

    static get TextContainer(): AvailableFormControlModel {
        return new AvailableFormControlModel("textcontainer", "Text Container");
    }

    static get ControlContainer(): AvailableFormControlModel {
        return new AvailableFormControlModel("controlcontainer", "Control Container");
    }
}

export class AvailableFormControlModel {
    constructor(public name: string, public description: string) {
    }
}

