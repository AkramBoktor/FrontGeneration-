import { Type } from '@angular/core';

export class GridHeaderOptions {
    constructor(arg?: GridHeaderOptions) {
        let initialValue: GridHeaderOptions = {
            actionColumn: true,
            enableRtl: true,
            rowModelType: 'clientSide',
            pagination: true,
            suppressPaginationPanel: false,
            domLayout: 'autoHeight',
            rowSelection: 'single',
            enableCellTextSelection: true,
            pageSize: 20,
            defaultColDef: {
                sortable: true,
                resizable: true,
                filter: false
            },
            localeText: {
                page: 'الصفحة',
                more: 'المزيد',
                to: 'إلي',
                of: 'من',
                next: 'التالي',
                last: 'الأخير',
                first: 'الأول',
                previous: 'السابق',
                loadingOoo: '...جاري التحميل...',
            }
        };
        initialValue = { ...initialValue, ...arg };
        for (const property in initialValue) {
            if (initialValue.hasOwnProperty(property)) { (this as any)[property] = (initialValue as any)[property]; }
        }
    }

    viewDialogClassType?: Type<any>;
    editDialogClassType?: Type<any>;
    newDialogClassType?: Type<any>;
    pagination?: boolean;
    pageSize?: number;
    actionColumn?: boolean;
    enableRtl?: boolean;
    rowModelType?: 'clientSide' | 'infinite';
    localeText?: any;
    suppressPaginationPanel?: boolean;
    defaultColDef?: any;
    domLayout?: 'normal' | 'autoHeight' | 'print';
    enableCellTextSelection?: boolean;
    rowSelection?: 'single' | 'multiple';
}

export class GridColumnOptions {
    constructor(arg?: GridColumnOptions) {
        let initialValue: GridColumnOptions = {
            resizable: true,
            sortable: true,
            minWidth: 140
        };
        initialValue = { ...initialValue, ...arg };
        for (const property in initialValue) {
            if (initialValue.hasOwnProperty(property)) { (this as any)[property] = (initialValue as any)[property]; }
        }
    }
    hide?: boolean;
    maxWidth?: number;
    minWidth?: number;
    headerName?: string;
    field?: string;
    resizable?: boolean;
    sortable?: boolean;
}
