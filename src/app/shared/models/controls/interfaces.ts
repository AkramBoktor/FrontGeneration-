export interface FormControlError {
    errorName: string;
    errorMessage: string;
}

export interface GridPaginatedSortedFiltered {
    startRow: number;
    endRow: number;
    sortModel: GridSortModel[];
    filterModel: any;
}

export interface GridSortModel {
    colId: string;
    sort: 'asc' | 'desc';
}

export interface AutoCompleteWithCode {
    id: number;
    code: string;
    name: string;
}

export interface Attachment {
    id: number;
    name: string;
    size: number;
    file: string | File;
}


