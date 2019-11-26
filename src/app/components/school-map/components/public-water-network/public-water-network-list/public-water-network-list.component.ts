
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { PublicWaterNetwork } from 'app/shared/models/public-water-network';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { PublicWaterNetworkEditComponent } from '../public-water-network-edit/public-water-network-edit.component';
import { PublicWaterNetworkNewComponent } from '../public-water-network-new/public-water-network-new.component';
import { PublicWaterNetworkViewComponent } from '../public-water-network-view/public-water-network-view.component';
import { PublicWaterNetworkService } from '../shared/public-water-network.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-public-water-network-list',
  templateUrl: './public-water-network-list.component.html',
  styleUrls: ['./public-water-network-list.component.scss'],
  providers: []
})

export class PublicWaterNetworkListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedPublicWaterNetwork: PublicWaterNetwork;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود المبنى', field: 'buildingCode' }),
	new GridColumnOptions({ headerName: 'قطر الشبكه العموميه', field: 'publicNetworkDiameter' }),
	new GridColumnOptions({ headerName: 'بعد الشبكه عن المبنى', field: 'distance' }),
	new GridColumnOptions({ headerName: 'كود المركز الاقليمي', field: 'regionalCenterCode' }),
	new GridColumnOptions({ headerName: 'كود الفرع', field: 'branchCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: PublicWaterNetworkViewComponent,
    editDialogClassType: PublicWaterNetworkEditComponent,
    newDialogClassType: PublicWaterNetworkNewComponent,
  });
    constructor(
        injector: Injector,
        public publicWaterNetworkService: PublicWaterNetworkService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedPublicWaterNetwork = new PublicWaterNetwork();

    

    this.searchForm = this.formBuilder.group({
     	buildingCode : [],
	publicNetworkDiameter : [],
	distance : []
    });

     
  }

  getPublicWaterNetworksPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<PublicWaterNetwork[]> => {
    return this.publicWaterNetworkService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.publicWaterNetworkService.delete(param.data.id)
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

