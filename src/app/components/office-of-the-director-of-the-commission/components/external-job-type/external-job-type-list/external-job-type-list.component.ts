
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions, GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { FormControlError, GridPaginatedSortedFiltered } from 'app/shared/models/controls/interfaces';
import { ExternalJobType } from 'app/shared/models/external-job-type';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ExternalJobTypeEditComponent } from '../external-job-type-edit/external-job-type-edit.component';
import { ExternalJobTypeNewComponent } from '../external-job-type-new/external-job-type-new.component';
import { ExternalJobTypeViewComponent } from '../external-job-type-view/external-job-type-view.component';
import { ExternalJobTypeService } from '../shared/external-job-type.service';

@Component({
  selector: 'app-external-job-type-list',
  templateUrl: './external-job-type-list.component.html',
  styleUrls: ['./external-job-type-list.component.scss'],
  providers: []
})

export class ExternalJobTypeListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedExternalJobType: ExternalJobType;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود الوظيفة الخارجية', field: 'eexternaljobcode' }),
	new GridColumnOptions({ headerName: 'اسم الوظيفة الخارجية', field: 'externaljobname' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: ExternalJobTypeViewComponent,
    editDialogClassType: ExternalJobTypeEditComponent,
    newDialogClassType: ExternalJobTypeNewComponent,
  });
    constructor(
        injector: Injector,
        public externalJobTypeService: ExternalJobTypeService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedExternalJobType = new ExternalJobType();

    

    this.searchForm = this.formBuilder.group({
     	eexternaljobcode : [],
	externaljobname : []
    });

     
  }

  getExternalJobTypesPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<ExternalJobType[]> => {
    return this.externalJobTypeService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.externalJobTypeService.delete(param.data.id)
      .pipe(take(1))
      .subscribe(() => this.grid.refreshData());
  }

  onBeginSearch(): void {
    this.grid.beginSearch(this.searchForm.value);
  }

  onCreate(): void {
    this.router.navigate(['new'], {relativeTo: this.activatedRoute});
  }

  getControls(name: string) {
    return this.searchForm.get(name);
  }

  initializeLookupServices() {
    
  }
}

