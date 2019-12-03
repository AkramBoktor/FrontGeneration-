import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { Constants } from 'app/shared/config/constants';
import { GridColumnOptions, GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered } from 'app/shared/models/controls/interfaces';
import { LookupModel } from 'app/shared/models/controls/lookup.model';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { LookupEditComponent } from '../lookup-edit/lookup-edit.component';
import { LookupNewComponent } from '../lookup-new/lookup-new.component';
import { LookupViewComponent } from '../lookup-view/lookup-view.component';
import { LookupService } from '../lookup.service';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { MaterialDialogService } from 'app/shared/components/material-controls/material-dialog.service';

@Component({
  selector: 'app-lookup-list',
  templateUrl: './lookup-list.component.html',
  styleUrls: ['./lookup-list.component.scss']
})
export class LookupListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;


  @Input() lookupServiceName: string; // Type<any>
  @Input() lookupLabel: string;

  instanceService: LookupService;


  columnOptions = [];

  gridHeaderOptions = new GridHeaderOptions({
    actionColumn: true,
    viewDialogClassType: LookupViewComponent,
    editDialogClassType: LookupEditComponent,
    newDialogClassType: LookupNewComponent,
  });


  constructor(injector: Injector,
    private dialogService: MaterialDialogService) {
    super(injector);
  }

  ngOnInit() {
    // Check Inputs from route data
    const lookupServiceName = this.activatedRoute.snapshot.data.lookupServiceName;
    const lookupLabel = this.activatedRoute.snapshot.data.lookupLabel;
    if (lookupServiceName) {
      this.lookupServiceName = lookupServiceName;
      this.lookupLabel = lookupLabel;
    }
    // ----
    this.columnOptions = [
      new GridColumnOptions({ headerName: 'كود ' + this.lookupLabel, field: 'code' }),
      new GridColumnOptions({ headerName: 'الأسم ' + this.lookupLabel, field: 'name' }),
    ];

    // this.instanceService = new this.lookupService(this.http);
    this.instanceService = new LookupService(this.lookupServiceName, this.http);
    this.searchForm = this.formBuilder.group({
      code: [],
      name: []
    });
  }

  getLookupPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<LookupModel[]> => {
    return this.instanceService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.instanceService.delete(param.data.id)
      .pipe(take(1))
      .subscribe(() => this.grid.refreshData());
  }

  onBeginSearch(): void {
    this.grid.beginSearch(this.searchForm.value);
  }

  onCreate(): void {
    const dialogRef = this.dialogService.openDialog(this.gridHeaderOptions.newDialogClassType, {
      data: { ...this.activatedRoute.snapshot.data }, actionType: 'create'
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe(result => {
      if (result) {
        this.grid.refreshData();
      }
    });
    // this.router.navigate(['new'], { relativeTo: this.activatedRoute });
  }

  getControls(name: string) {
    return this.searchForm.get(name);
  }

}

