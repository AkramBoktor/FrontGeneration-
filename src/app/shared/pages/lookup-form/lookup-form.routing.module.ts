import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LookupListComponent } from './lookup-list/lookup-list.component';
import { LookupGuard } from './lookup.guard';
import { LookupNewComponent } from './lookup-new/lookup-new.component';


const routes: Routes = [
  {
    path: 'advocacypositions',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'advocacypositions',
      lookupLabel: 'موقف الدعوي'
    }
  },
  {
    path: 'agencyimplementingtypes',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'agencyimplementingtypes',
      lookupLabel: 'نوع الجهة المنفذه'
    }
  },
  {
    path: 'applicationstypes',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'applicationstypes',
      lookupLabel: 'انواع الطلبات'
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
    path: 'appreciationperiods',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'appreciationperiods',
      lookupLabel: 'فترة التقدير'
    }
  },
  {
    path: 'approvalpositions',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'approvalpositions',
      lookupLabel: 'موقف الموافقه'
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
    path: 'arbitrators',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'arbitrators',
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
    path: 'bondcodes',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'bondcodes',
      lookupLabel: 'كود السند'
    }
  },
  {
    path: 'bondnumbers',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'bondnumbers',
      lookupLabel: 'رقم السند'
    }
  },
  {
    path: 'bookstatuses',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'bookstatuses',
      lookupLabel: 'حالة الكتاب'
    }
  },
  {
    path: 'boxcodes',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'boxcodes',
      lookupLabel: 'كود الصندوق'
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
    path: 'budgetfundingsourcecodes',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'budgetfundingsourcecodes',
      lookupLabel: 'كود مصدر تمويل للموزانه'
    }
  },
  {
    path: 'buildingownerships',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'buildingownerships',
      lookupLabel: 'ملكية مبني'
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
    path: 'cardcodes',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'cardcodes',
      lookupLabel: 'كود الكارت'
    }
  },
  {
    path: 'cardemissions',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'cardemissions',
      lookupLabel: 'اصدار الكارت'
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
    path: 'classificationdecisions',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'classificationdecisions',
      lookupLabel: 'قرار التصنيف'
    }
  },
  {
    path: 'classificationdegrees',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'classificationdegrees',
      lookupLabel: 'درجه التصنيف'
    }
  },
  {
    path: 'classificationfieldcodes',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'classificationfieldcodes',
      lookupLabel: 'كود مجال التصنيف'
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
    path: 'classificationvaluecodes',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'classificationvaluecodes',
      lookupLabel: 'كود قيمة التصنيف'
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
    path: 'commissionerbonuses',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'commissionerbonuses',
      lookupLabel: 'العلاوة التي انتهت اليها المفوضة'
    }
  },
  {
    path: 'commissionerrequirements',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'commissionerrequirements',
      lookupLabel: 'اشتراطات بعد المفاوضة'
    }
  },
  {
    path: 'componentcodes',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'componentcodes',
      lookupLabel: 'رمز المكون'
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
    path: 'currentsourcecodes',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'currentsourcecodes',
      lookupLabel: 'كود مصدر التيار'
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
    path: 'decisionnumbers',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'decisionnumbers',
      lookupLabel: 'رقم القرار'
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
    path: 'dependencycodes',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'dependencycodes',
      lookupLabel: 'كود التبعية'
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
    path: 'displayresults',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'displayresults',
      lookupLabel: 'نتيجة العرض'
    }
  },
  {
    path: 'displaytypes',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'displaytypes',
      lookupLabel: 'نوع العرض'
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
    path: 'documentlanguages',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'documentlanguages',
      lookupLabel: 'لغة الوثيقة'
    }
  },
  {
    path: 'documentsources',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'documentsources',
      lookupLabel: 'مصدر الوثيقة'
    }
  },
  {
    path: 'documentstatuses',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'documentstatuses',
      lookupLabel: 'حالة الوثيقة'
    }
  },
  {
    path: 'documenttypes',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'documenttypes',
      lookupLabel: 'نوع الوثيقة'
    }
  },
  {
    path: 'educationallevels',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'educationallevels',
      lookupLabel: 'المرحلة التعليمية'
    }
  },
  {
    path: 'educationalneedattitudes',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'educationalneedattitudes',
      lookupLabel: 'موقف الاحتياج التربوي'
    }
  },
  {
    path: 'educationalspaces',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'educationalspaces',
      lookupLabel: 'الفراغات التعليمية'
    }
  },
  {
    path: 'educationtypes',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'educationtypes',
      lookupLabel: 'نوعية التعليم'
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
    path: 'entitytypes',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'entitytypes',
      lookupLabel: 'نوع الجهة'
    }
  },
  {
    path: 'eventcodes',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'eventcodes',
      lookupLabel: 'اكواد الحدث'
    }
  },
  {
    path: 'exclusionreasons',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'exclusionreasons',
      lookupLabel: 'سبب الاستبعاد'
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
    path: 'fencestatuses',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'fencestatuses',
      lookupLabel: 'حالة السور'
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
    path: 'firstlevelcodes',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'firstlevelcodes',
      lookupLabel: 'كود المستوي الاول'
    }
  },
  {
    path: 'followers',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'followers',
      lookupLabel: 'تابع'
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
    path: 'formtypes',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'formtypes',
      lookupLabel: 'نوع النموذج'
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
    path: 'gearstatuses',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'gearstatuses',
      lookupLabel: 'حاله الترسية'
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
    path: 'headquarterstypes',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'headquarterstypes',
      lookupLabel: 'نوع المقر'
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
    path: 'insightcodes',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'insightcodes',
      lookupLabel: 'كود التبصره'
    }
  },
  {
    path: 'insighttypes',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'insighttypes',
      lookupLabel: 'نوع التبصره'
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
    path: 'itembalanceadjustmentreasons',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'itembalanceadjustmentreasons',
      lookupLabel: 'سبب التعديل رصيد صنف'
    }
  },
  {
    path: 'itemmethods',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'itemmethods',
      lookupLabel: 'طرق الصنف'
    }
  },
  {
    path: 'itemstatuses',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'itemstatuses',
      lookupLabel: 'حالة الصنف'
    }
  },
  {
    path: 'itemtypes',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'itemtypes',
      lookupLabel: 'نوع الصنف'
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
    path: 'landownerships',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'landownerships',
      lookupLabel: 'ملكية ارض'
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
    path: 'legalmembers',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'legalmembers',
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
    path: 'maintenanceconstructionstypes',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'maintenanceconstructionstypes',
      lookupLabel: 'انواع الانشاءات فى الصيانة'
    }
  },
  {
    path: 'maintenancestatuses',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'maintenancestatuses',
      lookupLabel: 'حالة الصيانه '
    }
  },
  {
    path: 'maintenancetypes',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'maintenancetypes',
      lookupLabel: 'نوع الصيانه'
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
    path: 'mamoriyasides',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'mamoriyasides',
      lookupLabel: 'جهة المامورية'
    }
  },
  {
    path: 'measurementunits',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'measurementunits',
      lookupLabel: 'وحدات القياس'
    }
  },
  {
    path: 'members',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'members',
      lookupLabel: 'الاعضــاء'
    }
  },
  {
    path: 'ministries',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'ministries',
      lookupLabel: 'وزارات'
    }
  },
  {
    path: 'modelcodes',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'modelcodes',
      lookupLabel: 'كود النموذج'
    }
  },
  {
    path: 'modeltypes',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'modeltypes',
      lookupLabel: 'نوع الاستمارة'
    }
  },
  {
    path: 'modules',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'modules',
      lookupLabel: 'وحدات'
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
    path: 'negotiationdestinations',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'negotiationdestinations',
      lookupLabel: 'جهة التفاوض'
    }
  },
  {
    path: 'numbertypes',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'numbertypes',
      lookupLabel: 'نوع الرقم'
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
    path: 'officetypes',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'officetypes',
      lookupLabel: 'نوع المكتب'
    }
  },
  {
    path: 'operationtypes',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'operationtypes',
      lookupLabel: 'نوع التشغيل'
    }
  },
  {
    path: 'organizationcodefortrainingandhousings',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'organizationcodefortrainingandhousings',
      lookupLabel: 'كود الجهة لتدريب و تسكين'
    }
  },
  {
    path: 'organizationtypefortrainingandhousings',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'organizationtypefortrainingandhousings',
      lookupLabel: 'نوع الجهة لتدريب و تسكين'
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
    path: 'paymentmethods',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'paymentmethods',
      lookupLabel: 'طريقة السداد'
    }
  },
  {
    path: 'paymenttypes',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'paymenttypes',
      lookupLabel: 'نوع السداد'
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
    path: 'performancetypes',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'performancetypes',
      lookupLabel: 'نوع الاداء'
    }
  },
  {
    path: 'planfundingsourcecodes',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'planfundingsourcecodes',
      lookupLabel: 'كود مصدر تمويل للخطة'
    }
  },
  {
    path: 'positionareaneeds',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'positionareaneeds',
      lookupLabel: 'موقف منطقة الاحتياج'
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
    path: 'powercodes',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'powercodes',
      lookupLabel: 'كود السلطة'
    }
  },
  {
    path: 'powertypes',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'powertypes',
      lookupLabel: 'نوع السلطة'
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
    path: 'projectpartstatuses',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'projectpartstatuses',
      lookupLabel: 'حالة اجزاء المشروع'
    }
  },
  {
    path: 'projectstatuses',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'projectstatuses',
      lookupLabel: 'حالة المشروع '
    }
  },
  {
    path: 'projecttypes',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'projecttypes',
      lookupLabel: 'نوع المشروع'
    }
  },
  {
    path: 'publicrelationtypes',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'publicrelationtypes',
      lookupLabel: 'نوع الجهة لعلاقات عامة'
    }
  },
  {
    path: 'publishercodes',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'publishercodes',
      lookupLabel: 'كود الناشر'
    }
  },
  {
    path: 'publisherplaces',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'publisherplaces',
      lookupLabel: 'مكان الناشر'
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
    path: 'publishingplaces',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'publishingplaces',
      lookupLabel: 'مكان النشر'
    }
  },
  {
    path: 'pupilstypes',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'pupilstypes',
      lookupLabel: 'نوع التلاميذ'
    }
  },
  {
    path: 'pupilstypes',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'pupilstypes',
      lookupLabel: 'نوع تلاميذ'
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
    path: 'raytechnicalusers',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'raytechnicalusers',
      lookupLabel: 'راي العضو الفني'
    }
  },
  {
    path: 'regionadministrativeclassifications',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'regionadministrativeclassifications',
      lookupLabel: 'التصنيف الاداري للمنطقة'
    }
  },
  {
    path: 'regionpopulationdensities',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'regionpopulationdensities',
      lookupLabel: 'الكثافة السكانية للمنطقة'
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
    path: 'removalapplicants',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'removalapplicants',
      lookupLabel: 'جهة الطالبة للنزع'
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
    path: 'replytypes',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'replytypes',
      lookupLabel: 'نوع الرد'
    }
  },
  {
    path: 'salenegotiations',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'salenegotiations',
      lookupLabel: 'مفاوضات البيع'
    }
  },
  {
    path: 'sanctionsandtheircauses',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'sanctionsandtheircauses',
      lookupLabel: 'جزاءات واسبابها '
    }
  },
  {
    path: 'schoolsurroundingimpacts',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'schoolsurroundingimpacts',
      lookupLabel: 'التاثير علي المدارس المحيطة'
    }
  },
  {
    path: 'secondlevelcodes',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'secondlevelcodes',
      lookupLabel: 'كود  المستوي التاني'
    }
  },
  {
    path: 'secondperioddepartmentlocalizations',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'secondperioddepartmentlocalizations',
      lookupLabel: 'الفترة الثانية لدائرة التوطين'
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
    path: 'structuretypes',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'structuretypes',
      lookupLabel: 'نوع الكيان'
    }
  },
  {
    path: 'studyreasons',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'studyreasons',
      lookupLabel: 'سبب الدراسة'
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
    path: 'subjecttypes',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'subjecttypes',
      lookupLabel: 'نوع الموضوع'
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
    path: 'supplierclassifications',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'supplierclassifications',
      lookupLabel: 'تصنيف  مورد'
    }
  },
  {
    path: 'supplierrecordtypes',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'supplierrecordtypes',
      lookupLabel: 'نوع السجل للمورد'
    }
  },
  {
    path: 'suppliertypes',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'suppliertypes',
      lookupLabel: 'نوع المورد'
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
    path: 'taxdescriptions',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'taxdescriptions',
      lookupLabel: 'توصيف الضريبة'
    }
  },
  {
    path: 'technicalmembers',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'technicalmembers',
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
    path: 'thirdlevelcodes',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'thirdlevelcodes',
      lookupLabel: 'كود  المستوي الثالث'
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
    path: 'toiletcodes',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'toiletcodes',
      lookupLabel: 'كود دورة المياه'
    }
  },
  {
    path: 'traveltypes',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'traveltypes',
      lookupLabel: 'نوع السفر'
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
    path: 'usageperiodnumbers',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'usageperiodnumbers',
      lookupLabel: 'عدد فترات الاستخدام'
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
    path: 'villages',
    component: LookupListComponent,
    data: {
      lookupServiceName: 'villages',
      lookupLabel: 'قري'
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
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class LookupFormRoutingModule {
}
