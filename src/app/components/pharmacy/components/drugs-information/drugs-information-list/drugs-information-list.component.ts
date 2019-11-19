
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions, GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { FormControlError, GridPaginatedSortedFiltered } from 'app/shared/models/controls/interfaces';
import { DrugsInformation } from 'app/shared/models/drugs-information';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { DrugsInformationEditComponent } from '../drugs-information-edit/drugs-information-edit.component';
import { DrugsInformationNewComponent } from '../drugs-information-new/drugs-information-new.component';
import { DrugsInformationViewComponent } from '../drugs-information-view/drugs-information-view.component';
import { DrugsInformationService } from '../shared/drugs-information.service';

@Component({
  selector: 'app-drugs-information-list',
  templateUrl: './drugs-information-list.component.html',
  styleUrls: ['./drugs-information-list.component.scss'],
  providers: []
})

export class DrugsInformationListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedDrugsInformation: DrugsInformation;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'اسم الدواء', field: 'drugName' }),
	new GridColumnOptions({ headerName: 'كود الدواء', field: 'drugCode' }),
	new GridColumnOptions({ headerName: 'الكميه', field: 'quantity' }),
	new GridColumnOptions({ headerName: 'جهه المورد', field: 'supplier' }),
	new GridColumnOptions({ headerName: 'مكان التخزين', field: 'storagePlace' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: DrugsInformationViewComponent,
    editDialogClassType: DrugsInformationEditComponent,
    newDialogClassType: DrugsInformationNewComponent,
  });
    constructor(
        injector: Injector,
        public drugsInformationService: DrugsInformationService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedDrugsInformation = new DrugsInformation();

    

    this.searchForm = this.formBuilder.group({
     	drugName : [],
	drugCode : [],
	quantity : [],
	supplier : [],
	storagePlace : []
    });

     
  }

  getDrugsInformationPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<DrugsInformation[]> => {
    return this.drugsInformationService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.drugsInformationService.delete(param.data.id)
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

