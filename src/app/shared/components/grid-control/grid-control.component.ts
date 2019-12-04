import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { IDatasource } from 'ag-grid-community';
import { Constants } from 'app/shared/config/constants';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { GridHeaderOptions } from '../../models/controls/grid-control.model';
import { MaterialDialogService } from '../material-controls/material-dialog.service';
import { MaterialDialogComponent } from '../material-controls/material-dialog/material-dialog.component';
import { GridActionButtonsComponent } from './grid-action-buttons/grid-action-buttons.component';

@Component({
  selector: 'app-grid-control',
  templateUrl: './grid-control.component.html',
  styleUrls: ['./grid-control.component.scss'],
  providers: [MaterialDialogService],
})

export class GridControlComponent implements OnInit {
  private _searchFilter;
  public _rowCount;

  @Input() showToolBar = false;
  @Input() rowData: any[];
  @Input() rowDataService: (filterModel: any) => Observable<any[]>;
  @Input() columnOptions: any[];
  @Input() gridHeaderOptions: GridHeaderOptions;
  @Input() searchInput: any[];

  @Output() deleteRow: EventEmitter<{ rowIndex: number, data: any }> = new EventEmitter();
  @Output() viewRow: EventEmitter<{ rowIndex: number, data: any }> = new EventEmitter();
  @Output() editRow: EventEmitter<{ rowIndex: number, data: any }> = new EventEmitter();
  @Output() newRow: EventEmitter<any> = new EventEmitter();

  @ViewChild('agGrid', { static: true }) agGrid: AgGridAngular;
  @ViewChild('paginator', { static: true }) paginator: MatPaginator;

  dataSource: IDatasource;

  constructor(private dialogService: MaterialDialogService,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    if (this.gridHeaderOptions.actionColumn) {
      {
        this.columnOptions = [
          ...this.columnOptions,
          {
            headerName: '',
            cellClass: 'action-column',
            filter: false,
            sortable: false,
            minWidth: 140,
            cellRendererFramework: GridActionButtonsComponent,
            cellRendererParams: {
              delete: this.delete.bind(this),
              view: this.view.bind(this),
              edit: this.edit.bind(this)
            }
          }
        ];
      }
    }
  }

  onGridReady(params): void {
    this.agGrid.api = params.api;
    this.agGrid.columnApi = params.columnApi;
    this.agGrid.api.sizeColumnsToFit();
    window.addEventListener('resize', () => {
      setTimeout(() => {
        params.api.sizeColumnsToFit();
      });
    });
  }

  beginSearch(obj: any): void {
    this._searchFilter = obj;
    this.agGrid.api.showLoadingOverlay();
    this.rowDataService({filter: this._searchFilter}).subscribe(data => {
      this.rowData = data;
      this.paginator.length = data.length;
      this.agGrid.api.hideOverlay();
    });
  }

  refreshData(): void {
    this.beginSearch(this._searchFilter);
  }
  onPageEvent(e: PageEvent): void {
    const api = this.agGrid.api;
    api.paginationGoToPage(e.pageIndex);
    api.paginationSetPageSize(e.pageSize);
  }

  view(param): void {
    if (this.gridHeaderOptions.viewDialogClassType) {
      const dialogRef = this.dialogService.openDialog(this.gridHeaderOptions.viewDialogClassType,
        { data: { ...param.data, ...this.activatedRoute.snapshot.data }, actionType: 'view' });
      dialogRef.afterClosed().pipe(take(1)).subscribe(result => {
        if (result) {
          this.refreshData();
          this.viewRow.emit({ rowIndex: param.rowIndex, data: param.data });
        }
      });
    } else {
      this.viewRow.emit({ rowIndex: param.rowIndex, data: param.data });
    }
  }

  edit(param): void {
    if (this.gridHeaderOptions.editDialogClassType) {
      const dialogRef = this.dialogService.openDialog(this.gridHeaderOptions.editDialogClassType,
        { data: { ...param.data, ...this.activatedRoute.snapshot.data }, actionType: 'edit' });
      dialogRef.afterClosed().pipe(take(1)).subscribe(result => {
        if (result) {
          this.refreshData();
          this.editRow.emit({ rowIndex: param.rowIndex, data: param.data });
        }
      });
    } else {
      this.editRow.emit({ rowIndex: param.rowIndex, data: param.data });
    }
  }

  delete(param): void {
    const dialogRef = this.dialogService.openDialog(MaterialDialogComponent, {}, { minHeight: 100, minWidth: 200 });
    dialogRef.afterClosed().pipe(take(1)).subscribe(result => {
      if (result) {
        this.deleteRow.emit({ rowIndex: param.rowIndex, data: param.data });
      }
    });
  }

  create(): void {
    if (this.gridHeaderOptions.newDialogClassType) {
      const dialogRef = this.dialogService.openDialog(this.gridHeaderOptions.newDialogClassType, { actionType: 'create' });
      dialogRef.afterClosed().pipe(take(1)).subscribe(result => {
        if (result) {
          this.refreshData();
          this.newRow.emit();
        }
      });
    } else {
      this.editRow.emit();
    }
  }
}
