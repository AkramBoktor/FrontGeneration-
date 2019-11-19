import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { DataService } from 'app/shared/async-services/data.service';
import { Attachment } from 'app/shared/models/controls/interfaces';
import { FileUploader } from 'ng2-file-upload';

@Component({
    selector: 'app-multi-file-upload',
    templateUrl: './multi-file-upload.component.html',
    styleUrls: ['./multi-file-upload.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => MultiFileUploadComponent),
        multi: true
    }]
})
export class MultiFileUploadComponent implements OnInit, ControlValueAccessor {
    public uploader = new FileUploader({ url: undefined });
    public hasBaseDropZoneOver = false;
    private _dataSourceUploaded: Attachment[] = [];
    private _dataSourcePending: Attachment[] = [];

    public progress = 0;

    public dataSource: MatTableDataSource<Attachment> = new MatTableDataSource();

    set dataSourceUploaded(data: Attachment[]) {
        this._dataSourceUploaded = data;
        this.dataSource = new MatTableDataSource([...this._dataSourceUploaded, ...this._dataSourcePending]);
    }
    get dataSourceUploaded() {
        return this._dataSourceUploaded;
    }

    set dataSourcePending(data: Attachment[]) {
        this._dataSourcePending = data;
        this.dataSource = new MatTableDataSource([...this._dataSourceUploaded, ...this._dataSourcePending]);
    }
    get dataSourcePending() {
        return this._dataSourcePending;
    }

    @Input() service: DataService<any>;
    @Input() id: number;
    @Input() disabled = false;

    public progressBar = false;
    constructor() { }
    ngOnInit(): void {
        this.service.getAttachmentsById(this.id)
            .subscribe(x => {
                this.dataSourceUploaded = x;
            });
    }
    public fileOverBase(e: any) {
        this.hasBaseDropZoneOver = e;
    }
    public fileDrop(files: any) {
        const arr: File[] = Object.keys(files).map((k) => files[k]);
        const attachments = arr.map(x => ({ id: null, name: x.name, size: x.size, file: x }));
        this.dataSourcePending = [...this.dataSourcePending, ...attachments];
        this.propagateChange(this.dataSourcePending);
    }

    uploadfile(fileItems: Attachment[]) {
        const attachments: Attachment[] = [];
        this.progressBar = true;
        this.service.postAttachments(this.id, fileItems)
            .subscribe(x => {
                if (Array.isArray(x)) {
                    this.progressBar = false;
                    const data = this.dataSourcePending;
                    const temp = [...fileItems];
                    for (const f of temp) {
                        data.splice(data.indexOf(f), 1);
                        this.dataSourcePending = data;
                    }
                    for (const a of x) {
                        attachments.push({ id: a.id, name: a.name, size: a.size, file: null });
                    }
                    this.dataSourcePending = data;
                    this.dataSourceUploaded = [...this.dataSourceUploaded, ...attachments];
                } else {
                    if (x) {
                        this.progressBar = true;
                        this.progress = x.message;
                    }
                }
            });
    }

    downloadfile(id: number, name: string) {
        this.service.downloadAttachments(id, name).subscribe();
    }

    onPostDelete(attachment: Attachment) {
        this.service.deleteAttachments(attachment.id).subscribe(x => {
            const data = this.dataSourceUploaded;
            data.splice(data.indexOf(attachment), 1);
            this.dataSourceUploaded = data;
        });
    }

    onPendingDelete(files: Attachment[]) {
        const temp = [...files];
        const data = this.dataSourcePending;
        for (const f of temp) {
            data.splice(data.indexOf(f), 1);
            this.dataSourcePending = data;
        }
        this.propagateChange(data);
        this.dataSourcePending = data;
    }
    private propagateChange = (_: any) => { };
    private propagateTouched = () => { };

    writeValue(): void {
    }
    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }
    registerOnTouched(fn: any): void {
        this.propagateTouched = fn;
    }
    setDisabledState?(isDisabled: boolean): void {
    }
}
