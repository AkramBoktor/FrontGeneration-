export class LookupModel {
    id?: number;
    name?: string;
    code?: string;
}

export class LookupModelAutoComplete {
    id?: number;
    name?: string;
    code?: string;
    fields?: string[];
    database?: string;
    table?: string;
    codeField?: string;
    nameField?: string;
}
