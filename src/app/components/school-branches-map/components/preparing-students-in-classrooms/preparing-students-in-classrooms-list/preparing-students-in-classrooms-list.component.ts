
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { PreparingStudentsInClassrooms } from 'app/shared/models/preparing-students-in-classrooms';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { PreparingStudentsInClassroomsEditComponent } from '../preparing-students-in-classrooms-edit/preparing-students-in-classrooms-edit.component';
import { PreparingStudentsInClassroomsNewComponent } from '../preparing-students-in-classrooms-new/preparing-students-in-classrooms-new.component';
import { PreparingStudentsInClassroomsViewComponent } from '../preparing-students-in-classrooms-view/preparing-students-in-classrooms-view.component';
import { PreparingStudentsInClassroomsService } from '../shared/preparing-students-in-classrooms.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-preparing-students-in-classrooms-list',
  templateUrl: './preparing-students-in-classrooms-list.component.html',
  styleUrls: ['./preparing-students-in-classrooms-list.component.scss'],
  providers: []
})

export class PreparingStudentsInClassroomsListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedPreparingStudentsInClassrooms: PreparingStudentsInClassrooms;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود المبنى', field: 'buildingCode' }),
	new GridColumnOptions({ headerName: 'رقم الفتره', field: 'periodNumber' }),
	new GridColumnOptions({ headerName: 'عدد االفرق', field: 'teamsNumber' }),
	new GridColumnOptions({ headerName: 'عدد البنات', field: 'girlsNumber' }),
	new GridColumnOptions({ headerName: 'عدد البنين', field: 'boysNumber' }),
	new GridColumnOptions({ headerName: 'اجمالي', field: 'total' }),
	new GridColumnOptions({ headerName: 'اجمالي المسجل', field: 'totalRecorded' }),
	new GridColumnOptions({ headerName: 'المرحله', field: 'stage' }),
	new GridColumnOptions({ headerName: 'الصف الدراسي', field: 'classroom' }),
	new GridColumnOptions({ headerName: 'نوعيه الطلبه', field: 'studentsKind' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: PreparingStudentsInClassroomsViewComponent,
    editDialogClassType: PreparingStudentsInClassroomsEditComponent,
    newDialogClassType: PreparingStudentsInClassroomsNewComponent,
  });
    constructor(
        injector: Injector,
        public preparingStudentsInClassroomsService: PreparingStudentsInClassroomsService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedPreparingStudentsInClassrooms = new PreparingStudentsInClassrooms();

    

    this.searchForm = this.formBuilder.group({
     	buildingCode : [],
	periodNumber : []
    });

     
  }

  getPreparingStudentsInClassroomsPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<PreparingStudentsInClassrooms[]> => {
    return this.preparingStudentsInClassroomsService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.preparingStudentsInClassroomsService.delete(param.data.id)
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

