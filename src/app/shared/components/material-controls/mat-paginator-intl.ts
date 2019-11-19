import { MatPaginatorIntl } from '@angular/material';

const arabicRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) { return `0 من ${length ? length : '0'}`; }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;

    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex = startIndex < length ?
        Math.min(startIndex + pageSize, length) :
        startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} من ${length}`;
};


export function getArabicPaginatorIntl() {
    const paginatorIntl = new MatPaginatorIntl();

    paginatorIntl.itemsPerPageLabel = 'عدد السطور';
    paginatorIntl.nextPageLabel = 'التالي';
    paginatorIntl.previousPageLabel = 'السابق';
    paginatorIntl.getRangeLabel = arabicRangeLabel;

    return paginatorIntl;
}
