
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions, GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { FormControlError, GridPaginatedSortedFiltered } from 'app/shared/models/controls/interfaces';
import { Project } from 'app/shared/models/project';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ProjectEditComponent } from '../project-edit/project-edit.component';
import { ProjectNewComponent } from '../project-new/project-new.component';
import { ProjectViewComponent } from '../project-view/project-view.component';
import { ProjectService } from '../shared/project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  providers: []
})

export class ProjectListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedProject: Project;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود المشروع', field: 'projectCode' }),
	new GridColumnOptions({ headerName: 'وصف المشروع', field: 'projectDesc' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: ProjectViewComponent,
    editDialogClassType: ProjectEditComponent,
    newDialogClassType: ProjectNewComponent,
  });
    constructor(
        injector: Injector,
        public projectService: ProjectService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedProject = new Project();

    

    this.searchForm = this.formBuilder.group({
     	branchCode : [],
	projectCode : [],
	classesNumber : []
    });

     
  }

  getProjectsPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<Project[]> => {
    return this.projectService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.projectService.delete(param.data.id)
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

