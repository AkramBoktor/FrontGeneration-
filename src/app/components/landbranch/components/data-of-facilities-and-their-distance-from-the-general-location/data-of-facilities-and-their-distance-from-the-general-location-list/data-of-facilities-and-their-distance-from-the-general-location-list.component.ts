
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { DataOfFacilitiesAndTheirDistanceFromTheGeneralLocation } from 'app/shared/models/data-of-facilities-and-their-distance-from-the-general-location';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { DataOfFacilitiesAndTheirDistanceFromTheGeneralLocationEditComponent } from '../data-of-facilities-and-their-distance-from-the-general-location-edit/data-of-facilities-and-their-distance-from-the-general-location-edit.component';
import { DataOfFacilitiesAndTheirDistanceFromTheGeneralLocationNewComponent } from '../data-of-facilities-and-their-distance-from-the-general-location-new/data-of-facilities-and-their-distance-from-the-general-location-new.component';
import { DataOfFacilitiesAndTheirDistanceFromTheGeneralLocationViewComponent } from '../data-of-facilities-and-their-distance-from-the-general-location-view/data-of-facilities-and-their-distance-from-the-general-location-view.component';
import { DataOfFacilitiesAndTheirDistanceFromTheGeneralLocationService } from '../shared/data-of-facilities-and-their-distance-from-the-general-location.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-data-of-facilities-and-their-distance-from-the-general-location-list',
  templateUrl: './data-of-facilities-and-their-distance-from-the-general-location-list.component.html',
  styleUrls: ['./data-of-facilities-and-their-distance-from-the-general-location-list.component.scss'],
  providers: []
})

export class DataOfFacilitiesAndTheirDistanceFromTheGeneralLocationListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedDataOfFacilitiesAndTheirDistanceFromTheGeneralLocation: DataOfFacilitiesAndTheirDistanceFromTheGeneralLocation;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود قطعة الارض', field: 'landCode' }),
	new GridColumnOptions({ headerName: 'كود المرفق', field: 'facilityCode' }),
	new GridColumnOptions({ headerName: 'مسمى المرفق', field: 'facilityName' }),
	new GridColumnOptions({ headerName: 'بعد المرفق', field: 'facilityDimension' }),
	new GridColumnOptions({ headerName: 'ملاحظات', field: 'notes' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: DataOfFacilitiesAndTheirDistanceFromTheGeneralLocationViewComponent,
    editDialogClassType: DataOfFacilitiesAndTheirDistanceFromTheGeneralLocationEditComponent,
    newDialogClassType: DataOfFacilitiesAndTheirDistanceFromTheGeneralLocationNewComponent,
  });
    constructor(
        injector: Injector,
        public dataOfFacilitiesAndTheirDistanceFromTheGeneralLocationService: DataOfFacilitiesAndTheirDistanceFromTheGeneralLocationService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedDataOfFacilitiesAndTheirDistanceFromTheGeneralLocation = new DataOfFacilitiesAndTheirDistanceFromTheGeneralLocation();

    

    this.searchForm = this.formBuilder.group({
     	landCode : [],
	facilityCode : [],
	facilityName : [],
	facilityDimension : []
    });

     
  }

  getDataOfFacilitiesAndTheirDistanceFromTheGeneralLocationPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<DataOfFacilitiesAndTheirDistanceFromTheGeneralLocation[]> => {
    return this.dataOfFacilitiesAndTheirDistanceFromTheGeneralLocationService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.dataOfFacilitiesAndTheirDistanceFromTheGeneralLocationService.delete(param.data.id)
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

