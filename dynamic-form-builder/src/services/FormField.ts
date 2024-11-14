export class FormField {
  public id: string
  public label: string
  public validationRules: {
    [key: string]: string | boolean | number | undefined; // Explicitly allow undefined
  };
  public value: string | number | boolean

  constructor(id: string, label: string, validationRules: { [key: string]: string | boolean | number | undefined } = {}) {
    this.id = id
    this.label = label
    this.validationRules = validationRules
    this.value = ''
  }
}

export class TextField extends FormField {
  public type: string

  constructor(id: string, label: string, validationRules: { [key: string]: string | boolean | number | undefined }) {
    super(id, label, validationRules)
    this.type = 'text'
    this.value = ''
  }
}

export class NumberField extends FormField {
  public type: string

  constructor(id: string, label: string, validationRules: { [key: string]: string | boolean | number | undefined }) {
    super(id, label, validationRules)
    this.type = 'number'
    this.value = 0
  }
}

export class CheckboxField extends FormField {
  public type: string

  constructor(id: string, label: string, validationRules: { [key: string]: string | boolean | number | undefined }) {
    super(id, label, validationRules)
    this.type = 'checkbox'
    this.value = false
  }
}

export class DropdownField extends FormField {
  public type: string
  public options: string[]

  constructor(id: string, label: string, options: string[] = [], validationRules: { [key: string]: string | boolean | number | undefined }) {
    super(id, label, validationRules)
    this.type = 'dropdown'
    this.options = options
    this.value = ''
  }
}
