
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { GasAppliancesData } from 'app/shared/models/gas-appliances-data';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { GasAppliancesDataEditComponent } from '../gas-appliances-data-edit/gas-appliances-data-edit.component';
import { GasAppliancesDataNewComponent } from '../gas-appliances-data-new/gas-appliances-data-new.component';
import { GasAppliancesDataViewComponent } from '../gas-appliances-data-view/gas-appliances-data-view.component';
import { GasAppliancesDataService } from '../shared/gas-appliances-data.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-gas-appliances-data-list',
  templateUrl: './gas-appliances-data-list.component.html',
  styleUrls: ['./gas-appliances-data-list.component.scss'],
  providers: []
})

export class GasAppliancesDataListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedGasAppliancesData: GasAppliancesData;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود المبنى', field: 'buildingCode' }),
	new GridColumnOptions({ headerName: 'عدد مصادر التغذيه  بالغاز', field: 'gasFeedingSourcesNumber' }),
	new GridColumnOptions({ headerName: 'الملحق', field: 'extenstion' }),
	new GridColumnOptions({ headerName: 'الدور', field: 'floor' }),
	new GridColumnOptions({ headerName: 'اسم الفراغ', field: 'spaceName' }),
	new GridColumnOptions({ headerName: 'هل يوجد غاز بالمدرسه', field: 'isThereGasInSchool' }),
	new GridColumnOptions({ headerName: 'نوعيه الجهاز', field: 'deviceQuality' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: GasAppliancesDataViewComponent,
    editDialogClassType: GasAppliancesDataEditComponent,
    newDialogClassType: GasAppliancesDataNewComponent,
  });
    constructor(
        injector: Injector,
        public gasAppliancesDataService: GasAppliancesDataService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedGasAppliancesData = new GasAppliancesData();

    

    this.searchForm = this.formBuilder.group({
     	buildingCode : []
    });

     
  }

  getGasAppliancesDataPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<GasAppliancesData[]> => {
    return this.gasAppliancesDataService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.gasAppliancesDataService.delete(param.data.id)
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

