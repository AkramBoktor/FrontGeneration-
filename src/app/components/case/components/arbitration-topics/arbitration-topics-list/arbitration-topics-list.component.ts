
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { ArbitrationTopics } from 'app/shared/models/arbitration-topics';
import { GridColumnOptions, GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { FormControlError, GridPaginatedSortedFiltered } from 'app/shared/models/controls/interfaces';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ArbitrationTopicsEditComponent } from '../arbitration-topics-edit/arbitration-topics-edit.component';
import { ArbitrationTopicsNewComponent } from '../arbitration-topics-new/arbitration-topics-new.component';
import { ArbitrationTopicsViewComponent } from '../arbitration-topics-view/arbitration-topics-view.component';
import { ArbitrationTopicsService } from '../shared/arbitration-topics.service';

@Component({
  selector: 'app-arbitration-topics-list',
  templateUrl: './arbitration-topics-list.component.html',
  styleUrls: ['./arbitration-topics-list.component.scss'],
  providers: []
})

export class ArbitrationTopicsListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedArbitrationTopics: ArbitrationTopics;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'الكود', field: 'code' }),
	new GridColumnOptions({ headerName: 'الاسم', field: 'name' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: ArbitrationTopicsViewComponent,
    editDialogClassType: ArbitrationTopicsEditComponent,
    newDialogClassType: ArbitrationTopicsNewComponent,
  });
    constructor(
        injector: Injector,
        public arbitrationTopicsService: ArbitrationTopicsService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedArbitrationTopics = new ArbitrationTopics();

    

    this.searchForm = this.formBuilder.group({
     	code : [],
	name : []
    });

     
  }

  getArbitrationTopicsPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<ArbitrationTopics[]> => {
    return this.arbitrationTopicsService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.arbitrationTopicsService.delete(param.data.id)
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

