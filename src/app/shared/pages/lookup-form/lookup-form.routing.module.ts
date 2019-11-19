import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LookupListComponent } from './lookup-list/lookup-list.component';
import { LookupGuard } from './lookup.guard';
import { LookupNewComponent } from './lookup-new/lookup-new.component';


const routes: Routes = [
  {
    path: '',
    canActivate: [LookupGuard],
    children: [
      {
        path: '',
        component: LookupListComponent,
      },
      {
        path: 'advocacypositions',
        component: LookupListComponent,
        data: {
          lookupServiceName: 'advocacypositions',
          lookupLabel: 'موقف الدعوي'
        }
      },
      {
        path: 'appointmenttypes',
        component: LookupListComponent,
        data: {
          lookupServiceName: 'appointmenttypes',
          lookupLabel: 'نوع التعين‎'
        }
      },
      {
        path: 'arbitrationclassifications',
        component: LookupListComponent,
        data: {
          lookupServiceName: 'arbitrationclassifications',
          lookupLabel: 'تصنيف التحكيم'
        }
      },
      {
        path: 'arbitrationtopiccodes',
        component: LookupListComponent,
        data: {
          lookupServiceName: 'arbitrationtopiccodes',
          lookupLabel: 'اكواد موضوعات التحكيم'
        }
      },
      {
        path: 'arbitrator',
        component: LookupListComponent,
        data: {
          lookupServiceName: 'arbitrator',
          lookupLabel: 'المحكم'
        }
      },
      {
        path: 'areas',
        component: LookupListComponent,
        data: {
          lookupServiceName: 'areas',
          lookupLabel: 'مناطق'
        }
      },
      {
        path: 'bankcodes',
        component: LookupListComponent,
        data: {
          lookupServiceName: 'bankcodes',
          lookupLabel: 'اكواد البنوك'
        }
      },
      {
        path: 'bodyattributes',
        component: LookupListComponent,
        data: {
          lookupServiceName: 'bodyattributes',
          lookupLabel: 'صفة الهيئة'
        }
      },
      {
        path: 'branchcodes',
        component: LookupListComponent,
        data: {
          lookupServiceName: 'branchcodes',
          lookupLabel: 'كود الفرع'
        }
      },
      {
        path: 'buildingtypes',
        component: LookupListComponent,
        data: {
          lookupServiceName: 'buildingtypes',
          lookupLabel: 'نوع المبني'
        }
      },
      {
        path: 'centraldepartments',
        component: LookupListComponent,
        data: {
          lookupServiceName: 'centraldepartments',
          lookupLabel: 'الادارات المركزية'
        }
      },
      {
        path: 'circuitcodes',
        component: LookupListComponent,
        data: {
          lookupServiceName: 'circuitcodes',
          lookupLabel: 'أكواد الدوائر'
        }
      },
      {
        path: 'classificationinstructioncodes',
        component: LookupListComponent,
        data: {
          lookupServiceName: 'classificationinstructioncodes',
          lookupLabel: 'أكود تصنيف التعليمات'
        }
      },
      {
        path: 'commissionchairmandecisions',
        component: LookupListComponent,
        data: {
          lookupServiceName: 'commissionchairmandecisions',
          lookupLabel: 'قرار رئيس الهيئة'
        }
      },
      {
        path: 'constructiontypes',
        component: LookupListComponent,
        data: {
          lookupServiceName: 'constructiontypes',
          lookupLabel: 'انواع الانشاء'
        }
      },
      {
        path: 'contractortidereasons',
        component: LookupListComponent,
        data: {
          lookupServiceName: 'contractortidereasons',
          lookupLabel: 'اسباب المد للمقاول'
        }
      },
      {
        path: 'courtcodes',
        component: LookupListComponent,
        data: {
          lookupServiceName: 'courtcodes',
          lookupLabel: 'أكواد المحاكــــم'
        }
      },
      {
        path: 'deathcodes',
        component: LookupListComponent,
        data: {
          lookupServiceName: 'deathcodes',
          lookupLabel: 'كود منح الوفاة'
        }
      },
      {
        path: 'deliverytypes',
        component: LookupListComponent,
        data: {
          lookupServiceName: 'deliverytypes',
          lookupLabel: 'نوع التسليم'
        }
      },
      {
        path: 'departmentssections',
        component: LookupListComponent,
        data: {
          lookupServiceName: 'departmentssections',
          lookupLabel: 'أقسام الادارات'
        }
      },
      {
        path: 'detectiontypes',
        component: LookupListComponent,
        data: {
          lookupServiceName: 'detectiontypes',
          lookupLabel: 'نوع الكشف'
        }
      },
      {
        path: 'discountcodes',
        component: LookupListComponent,
        data: {
          lookupServiceName: 'discountcodes',
          lookupLabel: 'كود الخصم'
        }
      },
      {
        path: 'discounttypes',
        component: LookupListComponent,
        data: {
          lookupServiceName: 'discounttypes',
          lookupLabel: 'نوع الخصم'
        }
      },
      {
        path: 'diseasestypes',
        component: LookupListComponent,
        data: {
          lookupServiceName: 'diseasestypes',
          lookupLabel: 'انواع الامراض'
        }
      },
      {
        path: 'documentcodes',
        component: LookupListComponent,
        data: {
          lookupServiceName: 'documentcodes',
          lookupLabel: 'أكواد المستندات'
        }
      },
      {
        path: 'employeestatuses',
        component: LookupListComponent,
        data: {
          lookupServiceName: 'employeestatuses',
          lookupLabel: 'حالة الموظف‎'
        }
      },
      {
        path: 'endingsupervisionreasons',
        component: LookupListComponent,
        data: {
          lookupServiceName: 'endingsupervisionreasons',
          lookupLabel: 'كود سبب انهاء اشراف'
        }
      },
      {
        path: 'entitycodes',
        component: LookupListComponent,
        data: {
          lookupServiceName: 'entitycodes',
          lookupLabel: 'كود الجهة'
        }
      },
      {
        path: 'entitytype',
        component: LookupListComponent,
        data: {
          lookupServiceName: 'entitytype',
          lookupLabel: 'نوع الجهة'
        }
      },
      {
        path: 'experienceperiodtypes',
        component: LookupListComponent,
        data: {
          lookupServiceName: 'experienceperiodtypes',
          lookupLabel: 'كود مدة الخبرة'
        }
      },
      {
        path: 'extracttypes',
        component: LookupListComponent,
        data: {
          lookupServiceName: 'extracttypes',
          lookupLabel: 'نوع المستخلص'
        }
      },
      {
        path: 'financialcrisisadoptions',
        component: LookupListComponent,
        data: {
          lookupServiceName: 'financialcrisisadoptions',
          lookupLabel: 'اقرار الزمة المالية‎'
        }
      },
      {
        path: 'financialdegrees',
        component: LookupListComponent,
        data: {
          lookupServiceName: 'financialdegrees',
          lookupLabel: 'الدرجة المالية'
        }
      },
      {
        path: 'formsources',
        component: LookupListComponent,
        data: {
          lookupServiceName: 'formsources',
          lookupLabel: 'مصدر الاستمارة'
        }
      },
      {
        path: 'functionalgroups',
        component: LookupListComponent,
        data: {
          lookupServiceName: 'functionalgroups',
          lookupLabel: 'المجوعات الوظيفية'
        }
      },
      {
        path: 'genders',
        component: LookupListComponent,
        data: {
          lookupServiceName: 'genders',
          lookupLabel: 'النوع‎'
        }
      },
      {
        path: 'governorates',
        component: LookupListComponent,
        data: {
          lookupServiceName: 'governorates',
          lookupLabel: 'المحافظة'
        }
      },
      {
        path: 'idtypes',
        component: LookupListComponent,
        data: {
          lookupServiceName: 'idtypes',
          lookupLabel: 'نوع البطاقة'
        }
      },
      {
        path: 'implementationpositions',
        component: LookupListComponent,
        data: {
          lookupServiceName: 'implementationpositions',
          lookupLabel: 'موقف التنفيذ'
        }
      },
      {
        path: 'issuecodeissues',
        component: LookupListComponent,
        data: {
          lookupServiceName: 'issuecodeissues',
          lookupLabel: 'كود موضوع القضية'
        }
      },
      {
        path: 'jobtypes',
        component: LookupListComponent,
        data: {
          lookupServiceName: 'jobtypes',
          lookupLabel: 'انواع الوظائف'
        }
      },
      {
        path: 'judgmentresults',
        component: LookupListComponent,
        data: {
          lookupServiceName: 'judgmentresults',
          lookupLabel: 'نتيجة الحكم'
        }
      },
      {
        path: 'leavingservicereasons',
        component: LookupListComponent,
        data: {
          lookupServiceName: 'leavingservicereasons',
          lookupLabel: 'سبب انهاء الخدمة'
        }
      },
      {
        path: 'legalmember',
        component: LookupListComponent,
        data: {
          lookupServiceName: 'legalmember',
          lookupLabel: 'العضو القانوني'
        }
      },
      {
        path: 'litigationdegrees',
        component: LookupListComponent,
        data: {
          lookupServiceName: 'litigationdegrees',
          lookupLabel: 'درجة التقاضي'
        }
      },
      {
        path: 'majorclassifications',
        component: LookupListComponent,
        data: {
          lookupServiceName: 'majorclassifications',
          lookupLabel: 'تصنيف رئيسي'
        }
      },
      {
        path: 'nationalities',
        component: LookupListComponent,
        data: {
          lookupServiceName: 'nationalities',
          lookupLabel: 'الجنسية‎'
        }
      },
      {
        path: 'offeringtypes',
        component: LookupListComponent,
        data: {
          lookupServiceName: 'offeringtypes',
          lookupLabel: 'انواع الطرح'
        }
      },
      {
        path: 'organizationcodefortrainingandhousing',
        component: LookupListComponent,
        data: {
          lookupServiceName: 'organizationcodefortrainingandhousing',
          lookupLabel: 'كود الجهة لتدريب و تسكين'
        }
      },
      {
        path: 'organizationtypefortrainingandhousings',
        component: LookupListComponent,
        data: {
          lookupServiceName: 'organizationtypefortrainingandhousings',
          lookupLabel: 'كود الجهة لتدريب و تسكين'
        }
      },
      {
        path: 'overallappreciations',
        component: LookupListComponent,
        data: {
          lookupServiceName: 'overallappreciations',
          lookupLabel: 'التقدير العام‎'
        }
      },
      {
        path: 'penalties',
        component: LookupListComponent,
        data: {
          lookupServiceName: 'penalties',
          lookupLabel: 'العقوبات'
        }
      },
      {
        path: 'positionrecruitments',
        component: LookupListComponent,
        data: {
          lookupServiceName: 'positionrecruitments',
          lookupLabel: 'موقف التجنيد‎'
        }
      },
      {
        path: 'procedurescodes',
        component: LookupListComponent,
        data: {
          lookupServiceName: 'procedurescodes',
          lookupLabel: 'اكواد الاجراءات'
        }
      },
      {
        path: 'publishingauthorities',
        component: LookupListComponent,
        data: {
          lookupServiceName: 'publishingauthorities',
          lookupLabel: 'جهة النشر'
        }
      },
      {
        path: 'qualificationgrantsites',
        component: LookupListComponent,
        data: {
          lookupServiceName: 'qualificationgrantsites',
          lookupLabel: 'جهة منح المؤهل'
        }
      },
      {
        path: 'qualifications',
        component: LookupListComponent,
        data: {
          lookupServiceName: 'qualifications',
          lookupLabel: 'المؤهل‎'
        }
      },
      {
        path: 'relationshiptypes',
        component: LookupListComponent,
        data: {
          lookupServiceName: 'relationshiptypes',
          lookupLabel: 'نوع القرابة'
        }
      },
      {
        path: 'religions',
        component: LookupListComponent,
        data: {
          lookupServiceName: 'religions',
          lookupLabel: 'الديانة‎'
        }
      },
      {
        path: 'removaltypes',
        component: LookupListComponent,
        data: {
          lookupServiceName: 'removaltypes',
          lookupLabel: 'نوع النزع'
        }
      },
      {
        path: 'renewaltypes',
        component: LookupListComponent,
        data: {
          lookupServiceName: 'renewaltypes',
          lookupLabel: 'نوع التجديد'
        }
      },
      {
        path: 'sanctionsandtheircauses',
        component: LookupListComponent,
        data: {
          lookupServiceName: 'sanctionsandtheircauses',
          lookupLabel: 'جزاءات واسبابها'
        }
      },
      {
        path: 'sectionsorcenters',
        component: LookupListComponent,
        data: {
          lookupServiceName: 'sectionsorcenters',
          lookupLabel: 'مركز/القسم‎'
        }
      },
      {
        path: 'sectorcodes',
        component: LookupListComponent,
        data: {
          lookupServiceName: 'sectorcodes',
          lookupLabel: 'اكواد القطاع'
        }
      },
      {
        path: 'serialforms',
        component: LookupListComponent,
        data: {
          lookupServiceName: 'serialforms',
          lookupLabel: 'مسلسل الاستمارة'
        }
      },
      {
        path: 'sessiondestinationcodes',
        component: LookupListComponent,
        data: {
          lookupServiceName: 'sessiondestinationcodes',
          lookupLabel: 'كود جهة الدورة'
        }
      },
      {
        path: 'sessionserials',
        component: LookupListComponent,
        data: {
          lookupServiceName: 'sessionserials',
          lookupLabel: 'مسلسل الدورة'
        }
      },
      {
        path: 'socialstatuses',
        component: LookupListComponent,
        data: {
          lookupServiceName: 'socialstatuses',
          lookupLabel: 'الحالة الاجتماعية'
        }
      },
      {
        path: 'specializations',
        component: LookupListComponent,
        data: {
          lookupServiceName: 'specializations',
          lookupLabel: 'التخصص الدقيق'
        }
      },
      {
        path: 'statuscodes',
        component: LookupListComponent,
        data: {
          lookupServiceName: 'statuscodes',
          lookupLabel: 'كود الحالة'
        }
      },
      {
        path: 'subclassifications',
        component: LookupListComponent,
        data: {
          lookupServiceName: 'subclassifications',
          lookupLabel: 'تصنيف فرعي'
        }
      },
      {
        path: 'subdepartments',
        component: LookupListComponent,
        data: {
          lookupServiceName: 'subdepartments',
          lookupLabel: 'الادارات الفرعية'
        }
      },
      {
        path: 'supervisingauthorities',
        component: LookupListComponent,
        data: {
          lookupServiceName: 'supervisingauthorities',
          lookupLabel: 'جهة الاشراف'
        }
      },
      {
        path: 'supporttypes',
        component: LookupListComponent,
        data: {
          lookupServiceName: 'supporttypes',
          lookupLabel: 'نوع الاسناد'
        }
      },
      {
        path: 'technicalmember',
        component: LookupListComponent,
        data: {
          lookupServiceName: 'technicalmember',
          lookupLabel: 'العضو الفني'
        }
      },
      {
        path: 'terminationofattorneyattorneyreasons',
        component: LookupListComponent,
        data: {
          lookupServiceName: 'terminationofattorneyattorneyreasons',
          lookupLabel: 'سبب انهاء اسناد محامي لقضية'
        }
      },
      {
        path: 'thirdpartycodes',
        component: LookupListComponent,
        data: {
          lookupServiceName: 'thirdpartycodes',
          lookupLabel: 'اكواد جهة خارجية'
        }
      },
      {
        path: 'unitdurationsessions',
        component: LookupListComponent,
        data: {
          lookupServiceName: 'unitdurationsessions',
          lookupLabel: 'وحدة مدة الدورة'
        }
      },
      {
        path: 'vacationbalancetypes',
        component: LookupListComponent,
        data: {
          lookupServiceName: 'vacationbalancetypes',
          lookupLabel: 'نوع رصيد الاجازة'
        }
      },
      {
        path: 'vacationtypes',
        component: LookupListComponent,
        data: {
          lookupServiceName: 'vacationtypes',
          lookupLabel: 'انواع الاجازات'
        }
      },
      {
        path: 'violations',
        component: LookupListComponent,
        data: {
          lookupServiceName: 'violations',
          lookupLabel: 'المخالفات'
        }
      }
    ]
  },

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class LookupFormRoutingModule {
}
