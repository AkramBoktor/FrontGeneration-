
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { DefiningANewToilet } from 'app/shared/models/defining-a-new-toilet';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { DefiningANewToiletEditComponent } from '../defining-a-new-toilet-edit/defining-a-new-toilet-edit.component';
import { DefiningANewToiletNewComponent } from '../defining-a-new-toilet-new/defining-a-new-toilet-new.component';
import { DefiningANewToiletViewComponent } from '../defining-a-new-toilet-view/defining-a-new-toilet-view.component';
import { DefiningANewToiletService } from '../shared/defining-a-new-toilet.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-defining-a-new-toilet-list',
  templateUrl: './defining-a-new-toilet-list.component.html',
  styleUrls: ['./defining-a-new-toilet-list.component.scss'],
  providers: []
})

export class DefiningANewToiletListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedDefiningANewToilet: DefiningANewToilet;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: '  كود دوره المياه ', field: 'toiletCode' }),
	new GridColumnOptions({ headerName: ' نموج دوره المياه ', field: 'toiletModel' }),
	new GridColumnOptions({ headerName: ' تاريخ الصنع', field: 'productionDate' }),
	new GridColumnOptions({ headerName: ' كود الشركه المصنعة', field: 'manufacturerCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: DefiningANewToiletViewComponent,
    editDialogClassType: DefiningANewToiletEditComponent,
    newDialogClassType: DefiningANewToiletNewComponent,
  });
    constructor(
        injector: Injector,
        public definingANewToiletService: DefiningANewToiletService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedDefiningANewToilet = new DefiningANewToilet();

    

    this.searchForm = this.formBuilder.group({
     	toiletCode : [],
	toiletModel : [],
	productionDate : [],
	manufacturerCode : []
    });

     
  }

  getDefiningANewToiletPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<DefiningANewToilet[]> => {
    return this.definingANewToiletService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.definingANewToiletService.delete(param.data.id)
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

