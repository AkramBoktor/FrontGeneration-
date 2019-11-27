
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { BoundariesOfThePublicSite } from 'app/shared/models/boundaries-of-the-public-site';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { BoundariesOfThePublicSiteEditComponent } from '../boundaries-of-the-public-site-edit/boundaries-of-the-public-site-edit.component';
import { BoundariesOfThePublicSiteNewComponent } from '../boundaries-of-the-public-site-new/boundaries-of-the-public-site-new.component';
import { BoundariesOfThePublicSiteViewComponent } from '../boundaries-of-the-public-site-view/boundaries-of-the-public-site-view.component';
import { BoundariesOfThePublicSiteService } from '../shared/boundaries-of-the-public-site.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-boundaries-of-the-public-site-list',
  templateUrl: './boundaries-of-the-public-site-list.component.html',
  styleUrls: ['./boundaries-of-the-public-site-list.component.scss'],
  providers: []
})

export class BoundariesOfThePublicSiteListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedBoundariesOfThePublicSite: BoundariesOfThePublicSite;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود المبنى', field: 'buildingCode' }),
	new GridColumnOptions({ headerName: 'طول الحد', field: 'length' }),
	new GridColumnOptions({ headerName: 'زاويه ميل الحد', field: 'slope' }),
	new GridColumnOptions({ headerName: 'وصف الحد', field: 'description' }),
	new GridColumnOptions({ headerName: 'كود المركز الاقليمي', field: 'regionalCenterCode' }),
	new GridColumnOptions({ headerName: 'كود الفرع', field: 'branchCode' }),
	new GridColumnOptions({ headerName: 'أتجاه الحد', field: 'direction' }),
	new GridColumnOptions({ headerName: 'حاله الجار الملاصق', field: 'neighborState' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: BoundariesOfThePublicSiteViewComponent,
    editDialogClassType: BoundariesOfThePublicSiteEditComponent,
    newDialogClassType: BoundariesOfThePublicSiteNewComponent,
  });
    constructor(
        injector: Injector,
        public boundariesOfThePublicSiteService: BoundariesOfThePublicSiteService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedBoundariesOfThePublicSite = new BoundariesOfThePublicSite();

    

    this.searchForm = this.formBuilder.group({
     	buildingCode : [],
	length : [],
	slope : [],
	description : []
    });

     
  }

  getBoundariesOfThePublicSitesPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<BoundariesOfThePublicSite[]> => {
    return this.boundariesOfThePublicSiteService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.boundariesOfThePublicSiteService.delete(param.data.id)
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

