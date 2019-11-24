import { FuseNavigation } from '@fuse/types';

export const listMenuConfig: ListMenuConfig = {

	'home': [],
	'vacation': [
		{
			id: 'Vacation',
			title: 'برنامج شئون عاملين -اجازة',
			type: 'group',
			icon: 'app',
			children: [
				{
					id: 'Vacation  Config',
					title: 'الأعدادات',
					type: 'collapsable',
					icon: 'build',
					children: [{
						id: 'centraldepartments',
						title: 'الادارات المركزية',
						type: 'item',
						url: '/lookup/centraldepartments',
						exactMatch: true
					},
					{
						id: 'subdepartments',
						title: 'الادارات الفرعية',
						type: 'item',
						url: '/lookup/subdepartments',
						exactMatch: true
					},
					{
						id: 'vacationtypes',
						title: 'انواع الاجازات',
						type: 'item',
						url: '/lookup/vacationtypes',
						exactMatch: true
					},
					{
						id: 'vacationbalancetypes',
						title: 'نوع رصيد الاجازة',
						type: 'item',
						url: '/lookup/vacationbalancetypes',
						exactMatch: true
					}]
				},
				{
					id: 'Vacation  Program',
					title: 'البرامج',
					type: 'collapsable',
					icon: 'apps',
					children: [
						{
							id: 'vacation employee',
							title: 'حساب اجازه معين',
							type: 'item',
							url: '/vacation/vacation-employee',
							exactMatch: true
						},
						{
							id: 'vacation contract',
							title: 'حساب اجازه متعاقد',
							type: 'item',
							url: '/vacation/vacation-contract',
							exactMatch: true
						},
						{
							id: 'Vacations Balance',
							title: 'رصيد الاجازات',
							type: 'item',
							url: '/vacation/vacations-balance',
							exactMatch: true
						}
					]
				},
				{
					id: 'Vacation  Report',
					title: 'التقارير',
					type: 'collapsable',
					icon: 'assignment',
					children: []
				}
			]
		}
	],
	'employee': [
		{
			id: 'employee',
			title: 'برنامج شئون عاملين - موظف',
			type: 'group',
			icon: 'app',
			children: [
				{
					id: 'Employee Config',
					title: 'الأعدادات',
					type: 'collapsable',
					icon: 'build',
					children: [
						{
							id: 'relationshiptypes',
							title: 'نوع القرابة',
							type: 'item',
							url: '/lookup/relationshiptypes',
							exactMatch: true
						},
						{
							id: 'leavingservicereasons',
							title: 'سبب انهاء الخدمة',
							type: 'item',
							url: '/lookup/leavingservicereasons',
							exactMatch: true
						},
						{
							id: 'functionalgroups',
							title: 'المجوعات الوظيفية',
							type: 'item',
							url: '/lookup/functionalgroups',
							exactMatch: true
						},
						{
							id: 'jobtypes',
							title: 'انواع الوظائف',
							type: 'item',
							url: '/lookup/jobtypes',
							exactMatch: true
						},
						{
							id: 'financialdegrees',
							title: 'الدرجة المالية',
							type: 'item',
							url: '/lookup/financialdegrees',
							exactMatch: true
						},
						{
							id: 'overallappreciations',
							title: 'التقدير العام‎',
							type: 'item',
							url: '/lookup/overallappreciations',
							exactMatch: true
						},
						{
							id: 'financialcrisisadoptions',
							title: 'اقرار الزمة المالية‎',
							type: 'item',
							url: '/lookup/financialcrisisadoptions',
							exactMatch: true
						},
						{
							id: 'centraldepartments',
							title: 'الادارات المركزية',
							type: 'item',
							url: '/lookup/centraldepartments',
							exactMatch: true
						},
						{
							id: 'subdepartments',
							title: 'الادارات الفرعية',
							type: 'item',
							url: '/lookup/subdepartments',
							exactMatch: true
						},
						{
							id: 'positionrecruitments',
							title: 'موقف التجنيد‎',
							type: 'item',
							url: '/lookup/positionrecruitments',
							exactMatch: true
						},
						{
							id: 'employeestatuses',
							title: 'حالة الموظف‎',
							type: 'item',
							url: '/lookup/employeestatuses',
							exactMatch: true
						},
						{
							id: 'appointmenttypes',
							title: 'نوع التعين‎',
							type: 'item',
							url: '/lookup/appointmenttypes',
							exactMatch: true
						},
						{
							id: 'specializations',
							title: 'التخصص الدقيق',
							type: 'item',
							url: '/lookup/specializations',
							exactMatch: true
						},
						{
							id: 'socialstatuses',
							title: 'الحالة الاجتماعية',
							type: 'item',
							url: '/lookup/socialstatuses',
							exactMatch: true
						},
						{
							id: 'governorates',
							title: 'المحافظة',
							type: 'item',
							url: '/lookup/governorates',
							exactMatch: true
						},
						{
							id: 'sectionsorcenters',
							title: 'مركز/القسم‎',
							type: 'item',
							url: '/lookup/sectionsorcenters',
							exactMatch: true
						},
						{
							id: 'religions',
							title: 'الديانة‎',
							type: 'item',
							url: '/lookup/religions',
							exactMatch: true
						},
						{
							id: 'nationalities',
							title: 'الجنسية‎',
							type: 'item',
							url: '/lookup/nationalities',
							exactMatch: true
						},
						{
							id: 'genders',
							title: 'النوع‎',
							type: 'item',
							url: '/lookup/genders',
							exactMatch: true
						},
						{
							id: 'idtypes',
							title: 'نوع البطاقة',
							type: 'item',
							url: '/lookup/idtypes',
							exactMatch: true
						},
						{
							id: 'qualifications',
							title: 'المؤهل‎',
							type: 'item',
							url: '/lookup/qualifications',
							exactMatch: true
						},
						{
							id: 'qualificationgrantsites',
							title: 'جهة منح المؤهل',
							type: 'item',
							url: '/lookup/qualificationgrantsites',
							exactMatch: true
						},
						{
							id: 'deathcodes',
							title: 'كود منح الوفاة',
							type: 'item',
							url: '/lookup/deathcodes',
							exactMatch: true
						},
						{
							id: 'experienceperiodtypes',
							title: 'كود مدة الخبرة',
							type: 'item',
							url: '/lookup/experienceperiodtypes',
							exactMatch: true
						},
						{
							id: 'renewaltypes',
							title: 'نوع التجديد',
							type: 'item',
							url: '/lookup/renewaltypes',
							exactMatch: true
						}
					]
				},
				{
					id: 'Employee Program',
					title: 'البرامج',
					type: 'collapsable',
					icon: 'apps',
					children: [
						{
							id: 'Disclaimer',
							title: 'اخلاء طرف',
							type: 'item',
							url: '/employee/disclaimer',
							exactMatch: true
						},
						{
							id: 'Dependent Name',
							title: 'اسماء من يعولهم',
							type: 'item',
							url: '/employee/dependent-name',
							exactMatch: true
						},
						{
							id: 'Retirement',
							title: 'انهاء خدمة',
							type: 'item',
							url: '/employee/retirement',
							exactMatch: true
						},
						{
							id: 'Incentive Bonus',
							title: 'العلاوه التشجيعيه',
							type: 'item',
							url: '/employee/incentive-bonus',
							exactMatch: true
						},
						{
							id: 'Adequacy',
							title: 'الكفاية',
							type: 'item',
							url: '/employee/adequacy',
							exactMatch: true
						},
						{
							id: 'Financial Disclosure Statement',
							title: 'بيانات اقرار الذمه الماليه',
							type: 'item',
							url: '/employee/financial-disclosure-statement',
							exactMatch: true
						},
						{
							id: 'Recruitment',
							title: 'تجنيد',
							type: 'item',
							url: '/employee/recruitment',
							exactMatch: true
						},
						{
							id: 'Employee data',
							title: 'بيانات موظف',
							type: 'item',
							url: '/employee/employee-data',
							exactMatch: true
						},
						{
							id: 'Transfer contracted employee from administration to administration',
							title: 'نقل موظف متعاقد من اداره لاداره',
							type: 'item',
							url: '/employee/transfer-contracted-employee',
							exactMatch: true
						},
						{
							id: 'Contract Termination',
							title: 'فسخ التعاقد',
							type: 'item',
							url: '/employee/contract-termination',
							exactMatch: true
						},
						{
							id: 'Employee educational qualifications',
							title: 'المؤهلات العلمية للموظف',
							type: 'item',
							url: '/employee/employee-educational-qualifications',
							exactMatch: true
						},
						{
							id: 'Sanctions Fund',
							title: 'صندوق الجزاءات',
							type: 'item',
							url: '/employee/sanctions-fund',
							exactMatch: true
						},
						{
							id: 'Employee Status',
							title: 'حالة الموظف',
							type: 'item',
							url: '/employee/employee-status',
							exactMatch: true
						},
						{
							id: 'Employee experience',
							title: 'خبرات الموظف',
							type: 'item',
							url: '/employee/employee-experience',
							exactMatch: true
						},
						{
							id: 'monthly completion of consultant contract period',
							title: ' مقرر الانجاز الشهري  لفتره تعاقد الاستشاري',
							type: 'item',
							url: '/employee/monthly-completion-of-consultant-contract-period',
							exactMatch: true
						},
						{
							id: 'employee contract renewal data',
							title: 'بيانات تجديد عقد موظف',
							type: 'item',
							url: '/employee/employee-contract-renewal-data',
							exactMatch: true
						},
						{
							id: 'Contracted Employee Data First Time',
							title: 'البيانات الاساسيه وبيانات التعاقد لموظف متعاقد اول مره',
							type: 'item',
							url: '/employee/contracted-employee-data-first-time',
							exactMatch: true
						},
						{
							id: 'Promotion',
							title: 'ترقية',
							type: 'item',
							url: '/employee/promotion',
							exactMatch: true
						}
					]
				},
				{
					id: 'Employee Report',
					title: 'التقارير',
					type: 'collapsable',
					icon: 'assignment',
					children: []
				}
			]
		}
	],
	'cooperative-society': [
		{
			id: 'cooperative-society',
			title: 'برنامج جمعيه التعاونيه',
			type: 'group',
			icon: 'app',
			children: [
				{
					id: 'Cooperative Society Config',
					title: 'الأعدادات',
					type: 'collapsable',
					icon: 'build',
					children: []
				},
				{
					id: 'Cooperative Society Program',
					title: 'البرامج',
					type: 'collapsable',
					icon: 'apps',
					children: [
						{
							id: 'membership data',
							title: 'بيانات العضويه ',
							type: 'item',
							url: '/cooperative-society/membership-data',
							exactMatch: true
						}
					]
				},
				{
					id: 'Cooperative Society Report',
					title: 'التقارير',
					type: 'collapsable',
					icon: 'assignment',
					children: []
				}
			]
		}
	],
	'social-security': [
		{
			id: 'social-security',
			title: 'برنامج شئون عاملين -تامينات اجتماعية ',
			type: 'group',
			icon: 'app',
			children: [
				{
					id: 'SocialSecurity Config',
					title: 'الأعدادات',
					type: 'collapsable',
					icon: 'build',
					children: [
						{
							id: 'relationshiptypes',
							title: 'نوع القرابة',
							type: 'item',
							url: '/lookup/relationshiptypes',
							exactMatch: true
						},
						{
							id: 'sectorcodes',
							title: 'اكواد القطاع',
							type: 'item',
							url: '/lookup/sectorcodes',
							exactMatch: true
						},
						{
							id: 'departmentssections',
							title: 'أقسام الادارات',
							type: 'item',
							url: '/lookup/departmentssections',
							exactMatch: true
						}
					]
				},
				{
					id: 'SocialSecurity Program',
					title: 'البرامج',
					type: 'collapsable',
					icon: 'apps',
					children: [
						{
							id: 'Social Security For Employee Family',
							title: 'تامينات اجتماعية لعائلة الموظف',
							type: 'item',
							url: '/social-security/social-security-for-employee-family',
							exactMatch: true
						},
						{
							id: 'Organization',
							title: 'المنشأة',
							type: 'item',
							url: '/social-security/organization',
							exactMatch: true
						},
						{
							id: 'Employee Insurance Number',
							title: 'الرقم التاميني للموظف',
							type: 'item',
							url: '/social-security/employee-insurance-number',
							exactMatch: true
						},
						{
							id: 'Employee Previous Insurance Data',
							title: 'بيانات الموظف التامينيه السابقه',
							type: 'item',
							url: '/social-security/employee-previous-insurance-data',
							exactMatch: true
						}
					]
				},
				{
					id: 'SocialSecurity Report',
					title: 'التقارير',
					type: 'collapsable',
					icon: 'assignment',
					children: []
				}
			]
		}
	],
	'case': [
		{
			id: 'case',
			title: 'برنامج قضايا',
			type: 'group',
			icon: 'app',
			children: [
				{
					id: 'Case Config',
					title: 'الأعدادات',
					type: 'collapsable',
					icon: 'build',
					children: [
						{
							id: 'branchcodes',
							title: 'كود الفرع',
							type: 'item',
							url: '/lookup/branchcodes',
							exactMatch: true
						},
						{
							id: 'entitytype',
							title: 'نوع الجهة',
							type: 'item',
							url: '/lookup/entitytype',
							exactMatch: true
						},
						{
							id: 'entitycodes',
							title: 'كود الجهة',
							type: 'item',
							url: '/lookup/entitycodes',
							exactMatch: true
						},
						{
							id: 'bodyattributes',
							title: 'صفة الهيئة',
							type: 'item',
							url: '/lookup/bodyattributes',
							exactMatch: true
						},
						{
							id: 'advocacypositions',
							title: 'موقف الدعوي',
							type: 'item',
							url: '/lookup/advocacypositions',
							exactMatch: true
						},
						{
							id: 'issuecodeissues',
							title: 'كود موضوع القضية',
							type: 'item',
							url: '/lookup/issuecodeissues',
							exactMatch: true
						},
						{
							id: 'courtcodes',
							title: 'أكواد المحاكــــم',
							type: 'item',
							url: '/lookup/courtcodes',
							exactMatch: true
						},
						{
							id: 'circuitcodes',
							title: 'أكواد الدوائر',
							type: 'item',
							url: '/lookup/circuitcodes',
							exactMatch: true
						},
						{
							id: 'litigationdegrees',
							title: 'درجة التقاضي',
							type: 'item',
							url: '/lookup/litigationdegrees',
							exactMatch: true
						},
						{
							id: 'documentcodes',
							title: 'أكواد المستندات',
							type: 'item',
							url: '/lookup/documentcodes',
							exactMatch: true
						},
						{
							id: 'judgmentresults',
							title: 'نتيجة الحكم',
							type: 'item',
							url: '/lookup/judgmentresults',
							exactMatch: true
						},
						{
							id: 'terminationofattorneyattorneyreasons',
							title: 'سبب انهاء اسناد محامي لقضية',
							type: 'item',
							url: '/lookup/terminationofattorneyattorneyreasons',
							exactMatch: true
						},
						{
							id: 'arbitrationclassifications',
							title: 'تصنيف التحكيم',
							type: 'item',
							url: '/lookup/arbitrationclassifications',
							exactMatch: true
						},
						{
							id: 'discounttypes',
							title: 'نوع الخصم',
							type: 'item',
							url: '/lookup/discounttypes',
							exactMatch: true
						},
						{
							id: 'discountcodes',
							title: 'كود الخصم',
							type: 'item',
							url: '/lookup/discountcodes',
							exactMatch: true
						},
						{
							id: 'arbitrationtopiccodes',
							title: 'اكواد موضوعات التحكيم',
							type: 'item',
							url: '/lookup/arbitrationtopiccodes',
							exactMatch: true
						},
						{
							id: 'arbitrators',
							title: 'المحكم',
							type: 'item',
							url: '/lookup/arbitrators',
							exactMatch: true
						},
						{
							id: 'technicalmembers',
							title: 'العضو الفني',
							type: 'item',
							url: '/lookup/technicalmembers',
							exactMatch: true
						},
						{
							id: 'legalmember',
							title: 'العضو القانوني',
							type: 'item',
							url: '/lookup/legalmember',
							exactMatch: true
						}
					]
				},
				{
					id: 'Case Program',
					title: 'البرامج',
					type: 'collapsable',
					icon: 'apps',
					children: [
						{
							id: 'lawsuit data',
							title: 'بيانات الدعوي',
							type: 'item',
							url: '/case/lawsuit-data',
							exactMatch: true
						},
						{
							id: 'Followup sessions',
							title: 'متابعة جلسات',
							type: 'item',
							url: '/case/followup-sessions',
							exactMatch: true
						},
						{
							id: 'Documents folder',
							title: 'حافظة المستندات',
							type: 'item',
							url: '/case/documents-folder',
							exactMatch: true
						},
						{
							id: 'operative sentence',
							title: 'منطوق الحكم',
							type: 'item',
							url: '/case/operative-sentence',
							exactMatch: true
						},
						{
							id: 'Third party codes',
							title: 'اكواد الجهات الخارجية ',
							type: 'item',
							url: '/case/third-party-codes',
							exactMatch: true
						},
						{
							id: 'Arbitration Topics',
							title: 'اكواد موضوعات التحكيم',
							type: 'item',
							url: '/case/arbitration-topics',
							exactMatch: true
						},
						{
							id: 'Codes of reason for termination of attorney attorney case',
							title: 'اكواد سبب انهاء اسناد محامي لقضية',
							type: 'item',
							url: '/case/codes-of-reason-for-termination',
							exactMatch: true
						},
						{
							id: 'Ending the assignment of the case to the lawyer',
							title: 'انهاء اسناد القضية للمحامي',
							type: 'item',
							url: '/case/ending-the-assignment-of-the-case-to-the-lawyer',
							exactMatch: true
						},
						{
							id: 'Assigning the case to a new lawyer',
							title: 'اسناد القضية لمحامي جديد',
							type: 'item',
							url: '/case/assigning-the-case-to-a-new-lawyer',
							exactMatch: true
						},
						{
							id: 'what happened in the session',
							title: 'ماتم في الجلسة',
							type: 'item',
							url: '/case/what-happened-in-the-session',
							exactMatch: true
						},
						{
							id: 'lawsuit sessions arbitration',
							title: 'جلسات دعوي (تحكيم) ',
							type: 'item',
							url: '/case/lawsuit-sessions-arbitration',
							exactMatch: true
						}
					]
				},
				{
					id: 'Case Report',
					title: 'التقارير',
					type: 'collapsable',
					icon: 'assignment',
					children: []
				}
			]
		}
	],
	'public-relations': [
		{
			id: 'public-relations',
			title: 'برنامج العلاقات العامة',
			type: 'group',
			icon: 'app',
			children: [
				{
					id: 'Public relations Config',
					title: 'الأعدادات',
					type: 'collapsable',
					icon: 'build',
					children: [
						{
							id: 'publishingauthorities',
							title: 'جهة النشر',
							type: 'item',
							url: '/lookup/publishingauthorities',
							exactMatch: true
						},
						{
							id: 'publishingplaces',
							title: 'مكان النشر',
							type: 'item',
							url: '/lookup/publishingplaces',
							exactMatch: true
						},
						{
							id: 'entitytype',
							title: 'نوع الجهة',
							type: 'item',
							url: '/lookup/entitytype',
							exactMatch: true
						},
						{
							id: 'subdepartments',
							title: 'الادارات الفرعية',
							type: 'item',
							url: '/lookup/subdepartments',
							exactMatch: true
						},
						{
							id: 'displaytypes',
							title: 'نوع العرض',
							type: 'item',
							url: '/lookup/displaytypes',
							exactMatch: true
						},
						{
							id: 'centraldepartments',
							title: 'الادارات المركزية',
							type: 'item',
							url: '/lookup/centraldepartments',
							exactMatch: true
						},
						{
							id: 'displayresults',
							title: 'نتيجة العرض',
							type: 'item',
							url: '/lookup/displayresults',
							exactMatch: true
						},
						{
							id: 'applicationstypes',
							title: 'انواع الطلبات',
							type: 'item',
							url: '/lookup/applicationstypes',
							exactMatch: true
						},
						{
							id: 'replytypes',
							title: 'نوع الرد',
							type: 'item',
							url: '/lookup/replytypes',
							exactMatch: true
						}
					]
				},
				{
					id: 'Public relations Program',
					title: 'البرامج',
					type: 'collapsable',
					icon: 'apps',
					children: [
						{
							id: 'Basic Data Logging',
							title: 'البيانات الاساسية ',
							type: 'item',
							url: '/public-relations/basic-data-logging',
							exactMatch: true
						},
						{
							id: 'Chairman visa',
							title: 'تاشيرة رئيس الهيئة',
							type: 'item',
							url: '/public-relations/chairman-visa',
							exactMatch: true
						},
						{
							id: 'followup request to new agency',
							title: 'طلب متابعة خبر لجهة',
							type: 'item',
							url: '/public-relations/followup-request-to-new-agency',
							exactMatch: true
						},
						{
							id: 'Respond to visa',
							title: 'رد الجهة علي التاشيرة',
							type: 'item',
							url: '/public-relations/respond-to-visa',
							exactMatch: true
						},
						{
							id: 'Authority response to newspaper',
							title: 'رد الهيئة علي الجريدة',
							type: 'item',
							url: '/public-relations/authority-response-to-newspaper',
							exactMatch: true
						}
					]
				},
				{
					id: 'Public relations Report',
					title: 'التقارير',
					type: 'collapsable',
					icon: 'assignment',
					children: []
				}
			]
		}
	],
	'followup-project': [
		{
			id: 'followup-project',
			title: 'برنامج متابعة المشروعات',
			type: 'group',
			icon: 'app',
			children: [
				{
					id: 'Followup project Config',
					title: 'الأعدادات',
					type: 'collapsable',
					icon: 'build',
					children: [
						{
							id: 'constructiontypes',
							title: 'انواع الانشاء',
							type: 'item',
							url: '/lookup/constructiontypes',
							exactMatch: true
						},
						{
							id: 'deliverytypes',
							title: 'نوع التسليم',
							type: 'item',
							url: '/lookup/deliverytypes',
							exactMatch: true
						},
						{
							id: 'branchcodes',
							title: 'كود الفرع',
							type: 'item',
							url: '/lookup/branchcodes',
							exactMatch: true
						}
					]
				},
				{
					id: 'Followup project Program',
					title: 'البرامج',
					type: 'collapsable',
					icon: 'apps',
					children: [
						{
							id: 'Primary and final delivery date',
							title: 'تاريخ التسليم الابتدائي والنهائي',
							type: 'item',
							url: '/followup-project/primary-and-final-delivery-date',
							exactMatch: true
						},
						{
							id: 'Number of school classes in operation',
							title: 'عدد فصول المدارس جاري العمل بها',
							type: 'item',
							url: '/followup-project/number-of-school-classes-in-operation',
							exactMatch: true
						},
						{
							id: 'project',
							title: 'مشروع',
							type: 'item',
							url: '/followup-project/project',
							exactMatch: true
						}
					]
				},
				{
					id: 'Followup project Report',
					title: 'التقارير',
					type: 'collapsable',
					icon: 'assignment',
					children: []
				}
			]
		}
	],
	'organization-and-management-training': [
		{
			id: 'organization-and-management-training',
			title: 'برنامج تنظيم واداره - تدريب',
			type: 'group',
			icon: 'app',
			children: [
				{
					id: 'Organization and management  training Config',
					title: 'الأعدادات',
					type: 'collapsable',
					icon: 'build',
					children: [
						{
							id: 'departmentssections',
							title: 'أقسام الادارات',
							type: 'item',
							url: '/lookup/departmentssections',
							exactMatch: true
						},
						{
							id: 'majorclassifications',
							title: 'تصنيف رئيسي',
							type: 'item',
							url: '/lookup/majorclassifications',
							exactMatch: true
						},
						{
							id: 'subclassifications',
							title: 'تصنيف فرعي',
							type: 'item',
							url: '/lookup/subclassifications',
							exactMatch: true
						},
						{
							id: 'unitdurationsessions',
							title: 'وحدة مدة الدورة',
							type: 'item',
							url: '/lookup/unitdurationsessions',
							exactMatch: true
						},
						{
							id: 'circuitcodes',
							title: 'أكواد الدوائر',
							type: 'item',
							url: '/lookup/circuitcodes',
							exactMatch: true
						},
						{
							id: 'sessiondestinationcodes',
							title: 'كود جهة الدورة',
							type: 'item',
							url: '/lookup/sessiondestinationcodes',
							exactMatch: true
						},
						{
							id: 'sessionserials',
							title: 'مسلسل الدورة',
							type: 'item',
							url: '/lookup/sessionserials',
							exactMatch: true
						},
						{
							id: 'areas',
							title: 'مناطق',
							type: 'item',
							url: '/lookup/areas',
							exactMatch: true
						},
						{
							id: 'serialforms',
							title: 'مسلسل الاستمارة',
							type: 'item',
							url: '/lookup/serialforms',
							exactMatch: true
						},
						{
							id: 'formsources',
							title: 'مصدر الاستمارة',
							type: 'item',
							url: '/lookup/formsources',
							exactMatch: true
						},
						{
							id: 'entitytype',
							title: 'نوع الجهة',
							type: 'item',
							url: '/lookup/entitytype',
							exactMatch: true
						},
						{
							id: 'entitycodes',
							title: 'كود الجهة',
							type: 'item',
							url: '/lookup/entitycodes',
							exactMatch: true
						},
						{
							id: 'offeringtypes',
							title: 'انواع الطرح',
							type: 'item',
							url: '/lookup/offeringtypes',
							exactMatch: true
						},
						{
							id: 'bankcodes',
							title: 'اكواد البنوك',
							type: 'item',
							url: '/lookup/bankcodes',
							exactMatch: true
						},
						{
							id: 'sectionsorcenters',
							title: 'مركز/القسم‎',
							type: 'item',
							url: '/lookup/sectionsorcenters',
							exactMatch: true
						},
						{
							id: 'commissionchairmandecisions',
							title: 'قرار رئيس الهيئة',
							type: 'item',
							url: '/lookup/commissionchairmandecisions',
							exactMatch: true
						}
					]
				},
				{
					id: 'Organization and management  training Program',
					title: 'البرامج',
					type: 'collapsable',
					icon: 'apps',
					children: [
						{
							id: 'Holder of course',
							title: 'الحاصلين ع الدورات',
							type: 'item',
							url: '/organization-and-management-training/holder-of-course',
							exactMatch: true
						},
						{
							id: 'Different form added but not extracted',
							title: ' استماره مختلفه اضافه غير مستخلصه',
							type: 'item',
							url: '/organization-and-management-training/different-form-added-but-not-extracted',
							exactMatch: true
						},
						{
							id: 'SessionSub Codes',
							title: '(اكواد الدوره (الفرعيه',
							type: 'item',
							url: '/organization-and-management-training/sessionsub-codes',
							exactMatch: true
						},
						{
							id: 'Annual Plan',
							title: 'الخطه السنويه',
							type: 'item',
							url: '/organization-and-management-training/annual-plan',
							exactMatch: true
						},
						{
							id: 'Training destination',
							title: 'جهه التدريب',
							type: 'item',
							url: '/organization-and-management-training/training-destination',
							exactMatch: true
						},
						{
							id: 'Courses code',
							title: 'اكواد الدوره',
							type: 'item',
							url: '/organization-and-management-training/courses-code',
							exactMatch: true
						}
					]
				},
				{
					id: 'Organization and management  training Report',
					title: 'التقارير',
					type: 'collapsable',
					icon: 'assignment',
					children: []
				}
			]
		}
	],
	'investigations': [
		{
			id: 'investigations',
			title: 'تحقيقات',
			type: 'group',
			icon: 'app',
			children: [
				{
					id: 'Investigations Config',
					title: 'الأعدادات',
					type: 'collapsable',
					icon: 'build',
					children: [
						{
							id: 'branchcodes',
							title: 'كود الفرع',
							type: 'item',
							url: '/lookup/branchcodes',
							exactMatch: true
						},
						{
							id: 'procedurescodes',
							title: 'اكواد الاجراءات',
							type: 'item',
							url: '/lookup/procedurescodes',
							exactMatch: true
						},
						{
							id: 'departmentssections',
							title: 'أقسام الادارات',
							type: 'item',
							url: '/lookup/departmentssections',
							exactMatch: true
						},
						{
							id: 'violations',
							title: 'المخالفات',
							type: 'item',
							url: '/lookup/violations',
							exactMatch: true
						},
						{
							id: 'classificationinstructioncodes',
							title: 'أكود تصنيف التعليمات',
							type: 'item',
							url: '/lookup/classificationinstructioncodes',
							exactMatch: true
						},
						{
							id: 'statuscodes',
							title: 'كود الحالة',
							type: 'item',
							url: '/lookup/statuscodes',
							exactMatch: true
						},
						{
							id: 'penalties',
							title: 'العقوبات',
							type: 'item',
							url: '/lookup/penalties',
							exactMatch: true
						},
						{
							id: 'commissionchairmandecisions',
							title: 'قرار رئيس الهيئة',
							type: 'item',
							url: '/lookup/commissionchairmandecisions',
							exactMatch: true
						},
						{
							id: 'sanctionsandtheircauses',
							title: 'جزاءات واسبابها ',
							type: 'item',
							url: '/lookup/sanctionsandtheircauses',
							exactMatch: true
						}
					]
				},
				{
					id: 'Investigations Program',
					title: 'البرامج',
					type: 'collapsable',
					icon: 'apps',
					children: [
						{
							id: 'Internal Investigations',
							title: 'التحقيقات الداخليه',
							type: 'item',
							url: '/investigations/internal-investigations',
							exactMatch: true
						},
						{
							id: 'External Investigations',
							title: 'التحقيقات الخارجيه',
							type: 'item',
							url: '/investigations/external-investigations',
							exactMatch: true
						},
						{
							id: 'Oral investigations',
							title: 'التحقيقات الشفوية',
							type: 'item',
							url: '/investigations/oral-investigations',
							exactMatch: true
						},
						{
							id: 'Grievances',
							title: 'التظلمات',
							type: 'item',
							url: '/investigations/grievances',
							exactMatch: true
						}
					]
				},
				{
					id: 'Investigations Report',
					title: 'التقارير',
					type: 'collapsable',
					icon: 'assignment',
					children: []
				}
			]
		}
	],
	'time-management': [
		{
			id: 'time-management',
			title: 'برنامج ضبط مراقبة الوقت و دوام العامل',
			type: 'group',
			icon: 'app',
			children: [
				{
					id: 'Time Management Config',
					title: 'الأعدادات',
					type: 'collapsable',
					icon: 'build',
					children: [
						{
							id: 'eventcodes',
							title: 'اكواد الحدث',
							type: 'item',
							url: '/lookup/eventcodes',
							exactMatch: true
						},
						{
							id: 'mamoriyasides',
							title: 'جهة المامورية',
							type: 'item',
							url: '/lookup/mamoriyasides',
							exactMatch: true
						},
						{
							id: 'centraldepartments',
							title: 'الادارات المركزية',
							type: 'item',
							url: '/lookup/centraldepartments',
							exactMatch: true
						},
						{
							id: 'subdepartments',
							title: 'الادارات الفرعية',
							type: 'item',
							url: '/lookup/subdepartments',
							exactMatch: true
						}
					]
				},
				{
					id: 'Time Management Program',
					title: 'البرامج',
					type: 'collapsable',
					icon: 'apps',
					children: [
						{
							id: 'occasion',
							title: 'الحدث',
							type: 'item',
							url: '/time-management/occasion',
							exactMatch: true
						},
						{
							id: 'Daily Print Error Data',
							title: 'بيانات البصمه الخطأ اليومي',
							type: 'item',
							url: '/time-management/daily-print-error-data',
							exactMatch: true
						},
						{
							id: 'Feeding Hour',
							title: 'ساعة رضاعة',
							type: 'item',
							url: '/time-management/feeding-hour',
							exactMatch: true
						},
						{
							id: 'Continuity data for Authority employee',
							title: 'بيانات الاستمرار للعاملين بالهيئة',
							type: 'item',
							url: '/time-management/continuity-data-for-authority-employee',
							exactMatch: true
						},
						{
							id: 'Additional Mission',
							title: 'اضافه مامورية',
							type: 'item',
							url: '/time-management/additional-mission',
							exactMatch: true
						}
					]
				},
				{
					id: 'Time Management Report',
					title: 'التقارير',
					type: 'collapsable',
					icon: 'assignment',
					children: []
				}
			]
		}
	],
	'time-control': [
		{
			id: 'time-control',
			title: 'مراقبه الوقت ControlSystem',
			type: 'group',
			icon: 'app',
			children: [
				{
					id: 'Time control Config',
					title: 'الأعدادات',
					type: 'collapsable',
					icon: 'build',
					children: [
						{
							id: 'branchcodes',
							title: 'كود الفرع',
							type: 'item',
							url: '/lookup/branchcodes',
							exactMatch: true
						},
						{
							id: 'employeestatuses',
							title: 'حالة الموظف‎',
							type: 'item',
							url: '/lookup/employeestatuses',
							exactMatch: true
						},
						{
							id: 'cardemissions',
							title: 'اصدار الكارت',
							type: 'item',
							url: '/lookup/cardemissions',
							exactMatch: true
						},
						{
							id: 'cardcodes',
							title: 'كود الكارت',
							type: 'item',
							url: '/lookup/cardcodes',
							exactMatch: true
						}
					]
				},
				{
					id: 'Time control Program',
					title: 'البرامج',
					type: 'collapsable',
					icon: 'apps',
					children: [
						{
							id: 'The definition of a card employee of the main building and branches',
							title: 'تعريف كارت موظف مبني رئيسي وفروع',
							type: 'item',
							url: '/time-control/employee-card-definition',
							exactMatch: true
						},
						{
							id: 'Extraction of temporary card code for the branch and regions',
							title: 'استخراج كود الكارت المؤقت للفرع والمناطق',
							type: 'item',
							url: '/time-control/extraction-of-temporary-card-code',
							exactMatch: true
						}
					]
				},
				{
					id: 'Time control Report',
					title: 'التقارير',
					type: 'collapsable',
					icon: 'assignment',
					children: []
				}
			]
		}
	],
	'ministry-of-solidarity': [
		{
			id: 'ministry-of-solidarity',
			title: 'وزارة التضامن',
			type: 'group',
			icon: 'app',
			children: [
				{
					id: 'Ministry of solidarity Config',
					title: 'الأعدادات',
					type: 'collapsable',
					icon: 'build',
					children: [
						{
							id: 'ministries',
							title: 'وزارات',
							type: 'item',
							url: '/lookup/ministries',
							exactMatch: true
						},
						{
							id: 'modules',
							title: 'وحدات',
							type: 'item',
							url: '/lookup/modules',
							exactMatch: true
						},
						{
							id: 'governorates',
							title: 'المحافظة',
							type: 'item',
							url: '/lookup/governorates',
							exactMatch: true
						},
						{
							id: 'sectionsorcenters',
							title: 'مركز/القسم‎',
							type: 'item',
							url: '/lookup/sectionsorcenters',
							exactMatch: true
						},
						{
							id: 'villages',
							title: 'قري',
							type: 'item',
							url: '/lookup/villages',
							exactMatch: true
						},
						{
							id: 'followers',
							title: 'تابع',
							type: 'item',
							url: '/lookup/followers',
							exactMatch: true
						},
						{
							id: 'headquarterstypes',
							title: 'نوع المقر',
							type: 'item',
							url: '/lookup/headquarterstypes',
							exactMatch: true
						},
						{
							id: 'officetypes',
							title: 'نوع المكتب',
							type: 'item',
							url: '/lookup/officetypes',
							exactMatch: true
						}
					]
				},
				{
					id: 'Ministry of solidarity Program',
					title: 'البرامج',
					type: 'collapsable',
					icon: 'apps',
					children: [
						{
							id: 'Ministry of solidarity and communications',
							title: 'وزارة التضامن و الاتصالات',
							type: 'item',
							url: '/ministry-of-solidarity/ministry-of-solidarity-and-communications',
							exactMatch: true
						}
					]
				},
				{
					id: 'Ministry of solidarity Report',
					title: 'التقارير',
					type: 'collapsable',
					icon: 'assignment',
					children: []
				}
			]
		}
	],
	'post-offices': [
		{
			id: 'post-offices',
			title: 'مكاتب البريد',
			type: 'group',
			icon: 'app',
			children: [
				{
					id: 'Post offices Config',
					title: 'الأعدادات',
					type: 'collapsable',
					icon: 'build',
					children: [
						{
							id: 'governorates',
							title: 'المحافظة',
							type: 'item',
							url: '/lookup/governorates',
							exactMatch: true
						},
						{
							id: 'villages',
							title: 'قري',
							type: 'item',
							url: '/lookup/villages',
							exactMatch: true
						}
					]
				},
				{
					id: 'Post offices Program',
					title: 'البرامج',
					type: 'collapsable',
					icon: 'apps',
					children: [
						{
							id: 'Post offices',
							title: 'مكاتب البريد',
							type: 'item',
							url: '/post-offices/post-offices',
							exactMatch: true
						}
					]
				},
				{
					id: 'Post offices Report',
					title: 'التقارير',
					type: 'collapsable',
					icon: 'assignment',
					children: []
				}
			]
		}
	],
	'international-cooperation': [
		{
			id: 'international-cooperation',
			title: 'برنامج التعاون الدولي ',
			type: 'group',
			icon: 'app',
			children: [
				{
					id: 'International cooperation Config',
					title: 'الأعدادات',
					type: 'collapsable',
					icon: 'build',
					children: [
						{
							id: 'offeringtypes',
							title: 'انواع الطرح',
							type: 'item',
							url: '/lookup/offeringtypes',
							exactMatch: true
						}
					]
				},
				{
					id: 'International cooperation Program',
					title: 'البرامج',
					type: 'collapsable',
					icon: 'apps',
					children: [
						{
							id: 'Grant Codes',
							title: 'اكواد المنحه ',
							type: 'item',
							url: '/international-cooperation/grant-codes',
							exactMatch: true
						},
						{
							id: 'Grant Information',
							title: 'بيانات المنحة',
							type: 'item',
							url: '/international-cooperation/grant-information',
							exactMatch: true
						}
					]
				},
				{
					id: 'International cooperation Report',
					title: 'التقارير',
					type: 'collapsable',
					icon: 'assignment',
					children: []
				}
			]
		}
	],
	'office-of-the-director-of-the-commission': [
		{
			id: 'office-of-the-director-of-the-commission',
			title: 'برنامج مكتب مدير الهيئه',
			type: 'group',
			icon: 'app',
			children: [
				{
					id: 'Office of the Director of the Commission Config',
					title: 'الأعدادات',
					type: 'collapsable',
					icon: 'build',
					children: [
						{
							id: 'jobtypes',
							title: 'انواع الوظائف',
							type: 'item',
							url: '/lookup/jobtypes',
							exactMatch: true
						},
						{
							id: 'subdepartments',
							title: 'الادارات الفرعية',
							type: 'item',
							url: '/lookup/subdepartments',
							exactMatch: true
						}
					]
				},
				{
					id: 'Office of the Director of the Commission Program',
					title: 'البرامج',
					type: 'collapsable',
					icon: 'apps',
					children: [
						{
							id: 'Agenda Internal',
							title: 'الاجنده داخلية',
							type: 'item',
							url: '/office-of-the-director-of-the-commission/agenda-internal',
							exactMatch: true
						},
						{
							id: 'Thirdparties',
							title: 'جهة خارجية',
							type: 'item',
							url: '/office-of-the-director-of-the-commission/thirdparties',
							exactMatch: true
						},
						{
							id: 'external job type',
							title: 'نوع الوظيفة الخارجية',
							type: 'item',
							url: '/office-of-the-director-of-the-commission/external-job-type',
							exactMatch: true
						},
						{
							id: 'Agenda External',
							title: 'الاجنده خارجية',
							type: 'item',
							url: '/office-of-the-director-of-the-commission/agenda-external',
							exactMatch: true
						}
					]
				},
				{
					id: 'Office of the Director of the Commission Report',
					title: 'التقارير',
					type: 'collapsable',
					icon: 'assignment',
					children: []
				}
			]
		}
	],
	'clinic': [
		{
			id: 'clinic',
			title: 'برنامج العياده',
			type: 'group',
			icon: 'app',
			children: [
				{
					id: 'Clinic Config',
					title: 'الأعدادات',
					type: 'collapsable',
					icon: 'build',
					children: [
						{
							id: 'diseasestypes',
							title: 'انواع الامراض',
							type: 'item',
							url: '/lookup/diseasestypes',
							exactMatch: true
						},
						{
							id: 'detectiontypes',
							title: 'نوع الكشف',
							type: 'item',
							url: '/lookup/detectiontypes',
							exactMatch: true
						}
					]
				},
				{
					id: 'Clinic Program',
					title: 'البرامج',
					type: 'collapsable',
					icon: 'apps',
					children: [
						{
							id: 'Period of work for the clinic',
							title: 'فتره عمل للعيادة',
							type: 'item',
							url: '/clinic/period-of-work-for-the-clinic',
							exactMatch: true
						},
						{
							id: 'Dispensing the patients medicine',
							title: 'صرف دواء المريض',
							type: 'item',
							url: '/clinic/dispensing-the-patients-medicine',
							exactMatch: true
						},
						{
							id: 'Medical Examination Form',
							title: 'استماره كشف طبي',
							type: 'item',
							url: '/clinic/medical-examination-form',
							exactMatch: true
						}
					]
				},
				{
					id: 'Clinic Report',
					title: 'التقارير',
					type: 'collapsable',
					icon: 'assignment',
					children: []
				}
			]
		}
	],
	'store': [
		{
			id: 'store',
			title: 'برنامج المخازن',
			type: 'group',
			icon: 'app',
			children: [
				{
					id: 'Store Config',
					title: 'الأعدادات',
					type: 'collapsable',
					icon: 'build',
					children: [
						{
							id: 'numbertypes',
							title: 'نوع الرقم',
							type: 'item',
							url: '/lookup/numbertypes',
							exactMatch: true
						},
						{
							id: 'itemtypes',
							title: 'نوع الصنف',
							type: 'item',
							url: '/lookup/itemtypes',
							exactMatch: true
						},
						{
							id: 'itemstatuses',
							title: 'حالة الصنف',
							type: 'item',
							url: '/lookup/itemstatuses',
							exactMatch: true
						},
						{
							id: 'measurementunits',
							title: 'وحدات القياس',
							type: 'item',
							url: '/lookup/measurementunits',
							exactMatch: true
						},
						{
							id: 'bondcodes',
							title: 'كود السند',
							type: 'item',
							url: '/lookup/bondcodes',
							exactMatch: true
						},
						{
							id: 'bondnumbers',
							title: 'رقم السند',
							type: 'item',
							url: '/lookup/bondnumbers',
							exactMatch: true
						},
						{
							id: 'genders',
							title: 'النوع‎',
							type: 'item',
							url: '/lookup/genders',
							exactMatch: true
						},
						{
							id: 'subdepartments',
							title: 'الادارات الفرعية',
							type: 'item',
							url: '/lookup/subdepartments',
							exactMatch: true
						},
						{
							id: 'powertypes',
							title: 'نوع السلطة',
							type: 'item',
							url: '/lookup/powertypes',
							exactMatch: true
						},
						{
							id: 'powercodes',
							title: 'كود السلطة',
							type: 'item',
							url: '/lookup/powercodes',
							exactMatch: true
						},
						{
							id: 'areas',
							title: 'مناطق',
							type: 'item',
							url: '/lookup/areas',
							exactMatch: true
						}
					]
				},
				{
					id: 'Store Program',
					title: 'البرامج',
					type: 'collapsable',
					icon: 'apps',
					children: [
						{
							id: 'Data Item',
							title: 'بيانات الصنف',
							type: 'item',
							url: '/store/data-item',
							exactMatch: true
						},
						{
							id: 'Data for an item containing other items',
							title: 'بيانات صنف مشتمل علي اصناف اخري',
							type: 'item',
							url: '/store/data-for-an-item-containing-other-items',
							exactMatch: true
						},
						{
							id: 'Data store',
							title: 'بيانات مخزن',
							type: 'item',
							url: '/store/data-store',
							exactMatch: true
						},
						{
							id: 'Add permission',
							title: 'اذن اضافة',
							type: 'item',
							url: '/store/add-permission',
							exactMatch: true
						},
						{
							id: 'Authorization exchange',
							title: 'اذن صرف',
							type: 'item',
							url: '/store/authorization-exchange',
							exactMatch: true
						},
						{
							id: 'Add cash to a store',
							title: 'اذن اضافة نقدية لمخزن',
							type: 'item',
							url: '/store/add-cash-to-a-store',
							exactMatch: true
						},
						{
							id: 'Return of custody of an employee',
							title: 'ارتجاع عهدة موظف',
							type: 'item',
							url: '/store/return-of-custody-of-an-employee',
							exactMatch: true
						},
						{
							id: 'Delivery and delivery of warehouses to the store keepers',
							title: 'تسليم وتسلم المخازن لامناء المخازن',
							type: 'item',
							url: '/store/delivery-warehouses-to-keepers',
							exactMatch: true
						},
						{
							id: 'Installation Record',
							title: 'محضر تركيب',
							type: 'item',
							url: '/store/installation-record',
							exactMatch: true
						},
						{
							id: 'Releasing Custody By The Authority',
							title: 'اسقاط العهدة بامر السلطة المختصة',
							type: 'item',
							url: '/store/releasing-custody-by-the-authority',
							exactMatch: true
						},
						{
							id: 'Transfer his custody employee to another',
							title: 'نقل عهده موظف لاخر',
							type: 'item',
							url: '/store/transfer-his-custody-employee-to-another',
							exactMatch: true
						},
						{
							id: 'Specialization data',
							title: 'بيانات التخصص',
							type: 'item',
							url: '/store/specialization-data',
							exactMatch: true
						}
					]
				},
				{
					id: 'Store Report',
					title: 'التقارير',
					type: 'collapsable',
					icon: 'assignment',
					children: []
				}
			]
		}
	],
	'pharmacy': [
		{
			id: 'pharmacy',
			title: 'برنامج الصيدلية',
			type: 'group',
			icon: 'app',
			children: [
				{
					id: 'Pharmacy Config',
					title: 'الأعدادات',
					type: 'collapsable',
					icon: 'build',
					children: []
				},
				{
					id: 'Pharmacy Program',
					title: 'البرامج',
					type: 'collapsable',
					icon: 'apps',
					children: [
						{
							id: 'Drugs Information',
							title: 'بيانات الادوية',
							type: 'item',
							url: '/pharmacy/drugs-information-',
							exactMatch: true
						},
						{
							id: 'Period of work for the pharmacy',
							title: 'فترة عمل الصيدلية',
							type: 'item',
							url: '/pharmacy/period-of-work-for-the-pharmacy',
							exactMatch: true
						},
						{
							id: 'Dispensing medication to a patient',
							title: 'صرف دواء لمريض',
							type: 'item',
							url: '/pharmacy/dispensing-medication-to-a-patient',
							exactMatch: true
						}
					]
				},
				{
					id: 'Pharmacy Report',
					title: 'التقارير',
					type: 'collapsable',
					icon: 'assignment',
					children: []
				}
			]
		}
	],
	'library': [
		{
			id: 'library',
			title: 'برنامج المكتبه',
			type: 'group',
			icon: 'app',
			children: [
				{
					id: 'Library Config',
					title: 'الأعدادات',
					type: 'collapsable',
					icon: 'build',
					children: [
						{
							id: 'subdepartments',
							title: 'الادارات الفرعية',
							type: 'item',
							url: '/lookup/subdepartments',
							exactMatch: true
						},
						{
							id: 'jobtypes',
							title: 'انواع الوظائف',
							type: 'item',
							url: '/lookup/jobtypes',
							exactMatch: true
						},
						{
							id: 'bookstatuses',
							title: 'حالة الكتاب',
							type: 'item',
							url: '/lookup/bookstatuses',
							exactMatch: true
						},
						{
							id: 'documenttypes',
							title: 'نوع الوثيقة',
							type: 'item',
							url: '/lookup/documenttypes',
							exactMatch: true
						},
						{
							id: 'documentsources',
							title: 'مصدر الوثيقة',
							type: 'item',
							url: '/lookup/documentsources',
							exactMatch: true
						},
						{
							id: 'documentstatuses',
							title: 'حالة الوثيقة',
							type: 'item',
							url: '/lookup/documentstatuses',
							exactMatch: true
						},
						{
							id: 'documentlanguages',
							title: 'لغة الوثيقة',
							type: 'item',
							url: '/lookup/documentlanguages',
							exactMatch: true
						},
						{
							id: 'publishercodes',
							title: 'كود الناشر',
							type: 'item',
							url: '/lookup/publishercodes',
							exactMatch: true
						},
						{
							id: 'publishingplaces',
							title: 'مكان النشر',
							type: 'item',
							url: '/lookup/publishingplaces',
							exactMatch: true
						},
						{
							id: 'insighttypes',
							title: 'نوع التبصره',
							type: 'item',
							url: '/lookup/insighttypes',
							exactMatch: true
						},
						{
							id: 'insightcodes',
							title: 'كود التبصره',
							type: 'item',
							url: '/lookup/insightcodes',
							exactMatch: true
						}
					]
				},
				{
					id: 'Library Program',
					title: 'البرامج',
					type: 'collapsable',
					icon: 'apps',
					children: [
						{
							id: 'Return document book with borrower number',
							title: 'ارجاع وثيقه(كتاب) برقم مستعير',
							type: 'item',
							url: '/library/return-document-book-with-borrower-number',
							exactMatch: true
						},
						{
							id: 'permission Flashback book to the body store',
							title: ' اذن ارتجاع الكتاب لمخزن الهيئه',
							type: 'item',
							url: '/library/permission-flashback-book-to-the-body-store',
							exactMatch: true
						},
						{
							id: 'Borrow an employee to a book or document',
							title: 'استعاره موظف لكتاب او وثيقه ',
							type: 'item',
							url: '/library/borrow-an-employee-to-a-book-or-document',
							exactMatch: true
						},
						{
							id: 'Data for document',
							title: ' البيانات للوثيقه',
							type: 'item',
							url: '/library/data-for-document',
							exactMatch: true
						},
						{
							id: 'Smooth data',
							title: 'بيانات السلسه',
							type: 'item',
							url: '/library/smooth-data',
							exactMatch: true
						}
					]
				},
				{
					id: 'Library Report',
					title: 'التقارير',
					type: 'collapsable',
					icon: 'assignment',
					children: []
				}
			]
		}
	],
	'services-association': [
		{
			id: 'services-association',
			title: 'برنامج جمعية الخدمات',
			type: 'group',
			icon: 'app',
			children: [
				{
					id: 'Services Association Config',
					title: 'الأعدادات',
					type: 'collapsable',
					icon: 'build',
					children: [
						{
							id: 'statuscodes',
							title: 'كود الحالة',
							type: 'item',
							url: '/lookup/statuscodes',
							exactMatch: true
						},
						{
							id: 'departmentssections',
							title: 'أقسام الادارات',
							type: 'item',
							url: '/lookup/departmentssections',
							exactMatch: true
						},
						{
							id: 'employeestatuses',
							title: 'حالة الموظف‎',
							type: 'item',
							url: '/lookup/employeestatuses',
							exactMatch: true
						},
						{
							id: 'paymenttypes',
							title: 'نوع السداد',
							type: 'item',
							url: '/lookup/paymenttypes',
							exactMatch: true
						},
						{
							id: 'traveltypes',
							title: 'نوع السفر',
							type: 'item',
							url: '/lookup/traveltypes',
							exactMatch: true
						}
					]
				},
				{
					id: 'Services Association Program',
					title: 'البرامج',
					type: 'collapsable',
					icon: 'apps',
					children: [
						{
							id: 'Introducing social grants to participants of association',
							title: 'ادخال المنح الاجتماعية للمشتركين بالجمعية',
							type: 'item',
							url: '/services-association/introducing-social-grants-to-participants-of-association',
							exactMatch: true
						},
						{
							id: 'Enter the telephone bill',
							title: 'ادخال فاتورة خطوط التليفون',
							type: 'item',
							url: '/services-association/enter-the-telephone-bill',
							exactMatch: true
						},
						{
							id: 'Record the value of telephone bill',
							title: 'تسجيل قيمة فاتورة خطوط التليفون',
							type: 'item',
							url: '/services-association/record-the-value-of-telephone-bill',
							exactMatch: true
						},
						{
							id: 'subscribers data in services association',
							title: 'بيانات المشتركين بجمعية الخدمات',
							type: 'item',
							url: '/services-association/subscribers-data-in-services-association',
							exactMatch: true
						},
						{
							id: 'Introducing Hajj and Umrah grants',
							title: 'ادخال منح الحج والعمرة',
							type: 'item',
							url: '/services-association/introducing-hajj-and-umrah-grants',
							exactMatch: true
						},
						{
							id: 'Entering resort data',
							title: 'ادخال بيانات المصايف',
							type: 'item',
							url: '/services-association/entering-resort-data',
							exactMatch: true
						}
					]
				},
				{
					id: 'Services Association Report',
					title: 'التقارير',
					type: 'collapsable',
					icon: 'assignment',
					children: []
				}
			]
		}
	],
	'contracts': [
		{
			id: 'contracts',
			title: 'عقود',
			type: 'group',
			icon: 'app',
			children: [
				{
					id: 'Contracts Config',
					title: 'الأعدادات',
					type: 'collapsable',
					icon: 'build',
					children: [
						{
							id: 'branchcodes',
							title: 'كود الفرع',
							type: 'item',
							url: '/lookup/branchcodes',
							exactMatch: true
						},
						{
							id: 'offeringtypes',
							title: 'انواع الطرح',
							type: 'item',
							url: '/lookup/offeringtypes',
							exactMatch: true
						}
					]
				},
				{
					id: 'Contracts Program',
					title: 'البرامج',
					type: 'collapsable',
					icon: 'apps',
					children: [
						{
							id: 'Construction Contracts Project',
							title: 'عقود المقاولات(مشروع)',
							type: 'item',
							url: '/contracts/construction-contracts-project',
							exactMatch: true
						},
						{
							id: 'Contracting Contracts Consolidated Tender',
							title: 'عقود المقاولات (مناقصة مجمعة)',
							type: 'item',
							url: '/contracts/contracting-contracts-consolidated-tender',
							exactMatch: true
						},
						{
							id: 'Contracting Contracts Post Offices',
							title: 'عقود المقاولات (مكاتب بريد)',
							type: 'item',
							url: '/contracts/contracting-contracts-post-offices',
							exactMatch: true
						},
						{
							id: 'Contract engineering body and the national agreement',
							title: 'عقد اتفاق هيئة هندسية وهيئة وطنية',
							type: 'item',
							url: '/contracts/contract-engineering-body-and-the-national-agreement',
							exactMatch: true
						}
					]
				},
				{
					id: 'Contracts Report',
					title: 'التقارير',
					type: 'collapsable',
					icon: 'assignment',
					children: []
				}
			]
		}
	],
	'social-solidarity-fund': [
		{
			id: 'social-solidarity-fund',
			title: 'برنامج صندوق التكافل الاجتماعي',
			type: 'group',
			icon: 'app',
			children: [
				{
					id: 'Social Solidarity Fund Config',
					title: 'الأعدادات',
					type: 'collapsable',
					icon: 'build',
					children: [
						{
							id: 'boxcodes',
							title: 'كود الصندوق',
							type: 'item',
							url: '/lookup/boxcodes',
							exactMatch: true
						},
						{
							id: 'departmentssections',
							title: 'أقسام الادارات',
							type: 'item',
							url: '/lookup/departmentssections',
							exactMatch: true
						},
						{
							id: 'employeestatuses',
							title: 'حالة الموظف‎',
							type: 'item',
							url: '/lookup/employeestatuses',
							exactMatch: true
						},
						{
							id: 'bankcodes',
							title: 'اكواد البنوك',
							type: 'item',
							url: '/lookup/bankcodes',
							exactMatch: true
						}
					]
				},
				{
					id: 'Social Solidarity Fund Program',
					title: 'البرامج',
					type: 'collapsable',
					icon: 'apps',
					children: [
						{
							id: 'Social Solidarity Fund Codes',
							title: 'كود صندوق التكافل الاجتماعي',
							type: 'item',
							url: '/social-solidarity-fund/social-solidarity-fund-codes',
							exactMatch: true
						},
						{
							id: 'Deduction of amount to an employee of the Fund',
							title: 'خصم مبلغ لموظف بالصندوق',
							type: 'item',
							url: '/social-solidarity-fund/deduction-of-amount-to-an-employee-of-the-fund',
							exactMatch: true
						}
					]
				},
				{
					id: 'Social Solidarity Fund Report',
					title: 'التقارير',
					type: 'collapsable',
					icon: 'assignment',
					children: []
				}
			]
		}
	],
	'timing-and-pricing': [
		{
			id: 'timing-and-pricing',
			title: 'برنامج التسعير و المدد',
			type: 'group',
			icon: 'app',
			children: [
				{
					id: 'Timing And Pricing Config',
					title: 'الأعدادات',
					type: 'collapsable',
					icon: 'build',
					children: [
						{
							id: 'governorates',
							title: 'المحافظة',
							type: 'item',
							url: '/lookup/governorates',
							exactMatch: true
						},
						{
							id: 'offeringtypes',
							title: 'انواع الطرح',
							type: 'item',
							url: '/lookup/offeringtypes',
							exactMatch: true
						},
						{
							id: 'constructiontypes',
							title: 'انواع الانشاء',
							type: 'item',
							url: '/lookup/constructiontypes',
							exactMatch: true
						},
						{
							id: 'extracttypes',
							title: 'نوع المستخلص',
							type: 'item',
							url: '/lookup/extracttypes',
							exactMatch: true
						},
						{
							id: 'contractortidereasons',
							title: 'اسباب المد للمقاول',
							type: 'item',
							url: '/lookup/contractortidereasons',
							exactMatch: true
						},
						{
							id: 'supporttypes',
							title: 'نوع الاسناد',
							type: 'item',
							url: '/lookup/supporttypes',
							exactMatch: true
						},
						{
							id: 'implementationpositions  ',
							title: 'موقف التنفيذ',
							type: 'item',
							url: '/lookup/implementationpositions  ',
							exactMatch: true
						}
					]
				},
				{
					id: 'Timing And Pricing Program',
					title: 'البرامج',
					type: 'collapsable',
					icon: 'apps',
					children: [
						{
							id: 'Final Clearance Cycle',
							title: 'دورة المستخلص الختامي',
							type: 'item',
							url: '/timing-and-pricing/final-clearance-cycle',
							exactMatch: true
						},
						{
							id: 'Project Periods',
							title: 'المدد للمشروعات',
							type: 'item',
							url: '/timing-and-pricing/project-periods',
							exactMatch: true
						},
						{
							id: 'Contractor Durations',
							title: 'مدد مقاول',
							type: 'item',
							url: '/timing-and-pricing/contractor-durations',
							exactMatch: true
						},
						{
							id: 'obstacles and measures taken',
							title: 'المعوقات والاجرأت اللي تم اتخاذها',
							type: 'item',
							url: '/timing-and-pricing/obstacles-and-measures-taken',
							exactMatch: true
						}
					]
				},
				{
					id: 'Timing And Pricing Report',
					title: 'التقارير',
					type: 'collapsable',
					icon: 'assignment',
					children: []
				}
			]
		}
	],
	'expropriation': [
		{
			id: 'expropriation',
			title: 'برنامج نزع الملكية',
			type: 'group',
			icon: 'app',
			children: [
				{
					id: 'Expropriation Config',
					title: 'الأعدادات',
					type: 'collapsable',
					icon: 'build',
					children: [
						{
							id: 'branchcodes',
							title: 'كود الفرع',
							type: 'item',
							url: '/lookup/branchcodes',
							exactMatch: true
						},
						{
							id: 'removaltypes',
							title: 'نوع النزع',
							type: 'item',
							url: '/lookup/removaltypes',
							exactMatch: true
						},
						{
							id: 'removalapplicants',
							title: 'جهة الطالبة للنزع',
							type: 'item',
							url: '/lookup/removalapplicants',
							exactMatch: true
						},
						{
							id: 'decisionnumbers',
							title: 'رقم القرار',
							type: 'item',
							url: '/lookup/decisionnumbers',
							exactMatch: true
						},
						{
							id: 'modeltypes',
							title: 'نوع الاستمارة',
							type: 'item',
							url: '/lookup/modeltypes',
							exactMatch: true
						}
					]
				},
				{
					id: 'Expropriation Program',
					title: 'البرامج',
					type: 'collapsable',
					icon: 'apps',
					children: [
						{
							id: 'Expropriation before decision',
							title: 'بيانات نزع الملكية قبل قرار رئيس الوزراء',
							type: 'item',
							url: '/expropriation/expropriation-before-decision',
							exactMatch: true
						},
						{
							id: 'People Assembly Approval',
							title: 'موافقة المجلس الشعبي',
							type: 'item',
							url: '/expropriation/people-assembly-approval',
							exactMatch: true
						},
						{
							id: 'Expropriation after decision',
							title: 'بيانات نزع الملكية بعد قرار رئيس الوزراء',
							type: 'item',
							url: '/expropriation/expropriation-after-decision',
							exactMatch: true
						},
						{
							id: 'Sales Forms',
							title: 'استمارات البيع',
							type: 'item',
							url: '/expropriation/sales-forms',
							exactMatch: true
						},
						{
							id: 'Business cost checks',
							title: 'شيكات تكاليف الاعمال',
							type: 'item',
							url: '/expropriation/business-cost-checks',
							exactMatch: true
						},
						{
							id: 'Temporary seizure data',
							title: 'بيانات الاستيلاء المؤقت',
							type: 'item',
							url: '/expropriation/temporary-seizure-data',
							exactMatch: true
						}
					]
				},
				{
					id: 'Expropriation Report',
					title: 'التقارير',
					type: 'collapsable',
					icon: 'assignment',
					children: []
				}
			]
		}
	],
	'pooled-decimal': [
		{
			id: 'pooled-decimal',
			title: 'برنامج المجمعة العشرية',
			type: 'group',
			icon: 'app',
			children: [
				{
					id: 'Pooled Decimal Config',
					title: 'الأعدادات',
					type: 'collapsable',
					icon: 'build',
					children: []
				},
				{
					id: 'Pooled Decimal Program',
					title: 'البرامج',
					type: 'collapsable',
					icon: 'apps',
					children: [
						{
							id: 'Registration of schools in the insurance company',
							title: 'تسجيل المدارس في شركة التامين',
							type: 'item',
							url: '/pooled-decimal/registration-of-schools-in-the-insurance-company',
							exactMatch: true
						},
						{
							id: 'Schools do not need insurance',
							title: 'مدارس لا تحتاج الي وثيقة تامين',
							type: 'item',
							url: '/pooled-decimal/schools-do-not-need-insurance',
							exactMatch: true
						},
						{
							id: 'Employee Performance Evaluation',
							title: 'تقويم اداء موظف',
							type: 'item',
							url: '/pooled-decimal/employee-performance-evaluation',
							exactMatch: true
						},
						{
							id: 'Complete insurance data on a school',
							title: 'استكمال بيانات التامين علي مدرسة',
							type: 'item',
							url: '/pooled-decimal/complete-insurance-data-on-a-school',
							exactMatch: true
						},
						{
							id: 'Schools currently extracting insurance',
							title: 'ادخال المدارس الجارى استخراج وثائق تامنية لها',
							type: 'item',
							url: '/pooled-decimal/schools-currently-extracting-insurance',
							exactMatch: true
						},
						{
							id: 'extension Insurance policy data',
							title: 'ادخال بيانات ملحق وثيقة التامين',
							type: 'item',
							url: '/pooled-decimal/extension-insurance-policy-data',
							exactMatch: true
						},
						{
							id: 'Insurance Companies Codes',
							title: 'اكواد شركات التامين',
							type: 'item',
							url: '/pooled-decimal/insurance-companies-codes',
							exactMatch: true
						},
						{
							id: 'Insurance policy data',
							title: 'بيانات وثيقه التامين',
							type: 'item',
							url: '/pooled-decimal/insurance-policy-data',
							exactMatch: true
						}
					]
				},
				{
					id: 'Pooled Decimal Report',
					title: 'التقارير',
					type: 'collapsable',
					icon: 'assignment',
					children: []
				}
			]
		}
	],
	'purchase': [
		{
			id: 'purchase',
			title: 'برنامج مشتريات',
			type: 'group',
			icon: 'app',
			children: [
				{
					id: 'Purchase Config',
					title: 'الأعدادات',
					type: 'collapsable',
					icon: 'build',
					children: [
						{
							id: 'offeringtypes',
							title: 'انواع الطرح',
							type: 'item',
							url: '/lookup/offeringtypes',
							exactMatch: true
						},
						{
							id: 'buildingtypes',
							title: 'نوع المبني',
							type: 'item',
							url: '/lookup/buildingtypes',
							exactMatch: true
						},
						{
							id: 'areas',
							title: 'مناطق',
							type: 'item',
							url: '/lookup/areas',
							exactMatch: true
						},
						{
							id: 'maintenancestatuses ',
							title: 'حالة الصيانه ',
							type: 'item',
							url: '/lookup/maintenancestatuses ',
							exactMatch: true
						},
						{
							id: 'constructiontypes',
							title: 'انواع الانشاء',
							type: 'item',
							url: '/lookup/constructiontypes',
							exactMatch: true
						},
						{
							id: 'paymentmethods',
							title: 'طريقة السداد',
							type: 'item',
							url: '/lookup/paymentmethods',
							exactMatch: true
						},
						{
							id: 'governorates',
							title: 'المحافظة',
							type: 'item',
							url: '/lookup/governorates',
							exactMatch: true
						},
						{
							id: 'members',
							title: 'الاعضــاء',
							type: 'item',
							url: '/lookup/members',
							exactMatch: true
						},
						{
							id: 'classificationfieldcodes',
							title: 'كود مجال التصنيف',
							type: 'item',
							url: '/lookup/classificationfieldcodes',
							exactMatch: true
						},
						{
							id: 'classificationvaluecodes',
							title: 'كود قيمة التصنيف',
							type: 'item',
							url: '/lookup/classificationvaluecodes',
							exactMatch: true
						},
						{
							id: 'classificationdecisions',
							title: 'قرار التصنيف',
							type: 'item',
							url: '/lookup/classificationdecisions',
							exactMatch: true
						},
						{
							id: 'classificationdegrees',
							title: 'درجه التصنيف',
							type: 'item',
							url: '/lookup/classificationdegrees',
							exactMatch: true
						},
						{
							id: 'commissionerrequirements ',
							title: 'اشتراطات بعد المفاوضة',
							type: 'item',
							url: '/lookup/commissionerrequirements ',
							exactMatch: true
						},
						{
							id: 'supplierclassifications',
							title: 'تصنيف  مورد',
							type: 'item',
							url: '/lookup/supplierclassifications',
							exactMatch: true
						},
						{
							id: 'suppliertypes',
							title: 'نوع المورد',
							type: 'item',
							url: '/lookup/suppliertypes',
							exactMatch: true
						},
						{
							id: 'sectionsorcenters',
							title: 'مركز/القسم‎',
							type: 'item',
							url: '/lookup/sectionsorcenters',
							exactMatch: true
						},
						{
							id: 'supplierrecordtypes',
							title: 'نوع السجل للمورد',
							type: 'item',
							url: '/lookup/supplierrecordtypes',
							exactMatch: true
						},
						{
							id: 'taxdescriptions',
							title: 'توصيف الضريبة',
							type: 'item',
							url: '/lookup/taxdescriptions',
							exactMatch: true
						},
						{
							id: 'gearstatuses',
							title: 'حاله الترسية',
							type: 'item',
							url: '/lookup/gearstatuses',
							exactMatch: true
						},
						{
							id: 'extracttypes',
							title: 'نوع المستخلص',
							type: 'item',
							url: '/lookup/extracttypes',
							exactMatch: true
						}
					]
				},
				{
					id: 'Purchase Program',
					title: 'البرامج',
					type: 'collapsable',
					icon: 'apps',
					children: [
						{
							id: 'Canceled Tender',
							title: 'عطاء مستبعد',
							type: 'item',
							url: '/purchase/canceled-tender',
							exactMatch: true
						},
						{
							id: 'Group Details Data',
							title: 'بيانات اجزاء مجموعة',
							type: 'item',
							url: '/purchase/group-details-data',
							exactMatch: true
						},
						{
							id: 'Bid Parts Data',
							title: 'بيانات اجزاء مناقصة',
							type: 'item',
							url: '/purchase/bid-parts-data',
							exactMatch: true
						},
						{
							id: 'Examination Committee Member Data',
							title: 'بيانات اعضاء لجنة البت',
							type: 'item',
							url: '/purchase/examination-committee-member-data',
							exactMatch: true
						},
						{
							id: 'Envelopes Opennig Commety Members Data',
							title: 'بيانات اعضاء لجنة فتح الظاريف',
							type: 'item',
							url: '/purchase/envelopes-opennig-commety-members-data',
							exactMatch: true
						},
						{
							id: 'Assignment Data',
							title: 'بيانات الاحالة',
							type: 'item',
							url: '/purchase/assignment-data',
							exactMatch: true
						},
						{
							id: 'Contractor Ranking Data',
							title: 'بيانات التصنيف للمقاول',
							type: 'item',
							url: '/purchase/contractor-ranking-data',
							exactMatch: true
						},
						{
							id: 'Statements of Supplementary Record of Decision Committee',
							title: 'بيانات المحضر التكميلي للجنة البت',
							type: 'item',
							url: '/purchase/supplementary-record',
							exactMatch: true
						},
						{
							id: 'Contractor Data',
							title: 'بيانات مقاول',
							type: 'item',
							url: '/purchase/contractor-data',
							exactMatch: true
						},
						{
							id: 'Publishing data',
							title: 'بيانات النشر',
							type: 'item',
							url: '/purchase/publishing-data',
							exactMatch: true
						},
						{
							id: 'Job Data',
							title: 'بيانات الشغل',
							type: 'item',
							url: '/purchase/job-data',
							exactMatch: true
						},
						{
							id: 'Tender Data',
							title: 'بيانات عطاء',
							type: 'item',
							url: '/purchase/tender-data',
							exactMatch: true
						},
						{
							id: 'Examination CommitteeDate Data',
							title: 'بيانات لجنة البت',
							type: 'item',
							url: '/purchase/examination-committee-date-data',
							exactMatch: true
						},
						{
							id: 'Envelopes Opennig Commety Data',
							title: 'بيانات لجنة فتح الظاريف',
							type: 'item',
							url: '/purchase/envelopes-opennig-commety-data',
							exactMatch: true
						},
						{
							id: 'Invoice 50',
							title: 'بيانات مستخلص (استمارة 50)',
							type: 'item',
							url: '/purchase/invoice-50',
							exactMatch: true
						},
						{
							id: 'Conditions Notebook Data',
							title: 'بيانات كراسة الشروط',
							type: 'item',
							url: '/purchase/conditions-notebook-data',
							exactMatch: true
						}
					]
				},
				{
					id: 'Purchase Report',
					title: 'التقارير',
					type: 'collapsable',
					icon: 'assignment',
					children: []
				}
			]
		}
	],
	'school-map': [
		{
			id: 'school-map',
			title: 'برنامج الخريطة المدرسية',
			type: 'group',
			icon: 'app',
			children: [
				{
					id: 'School Map Config',
					title: 'الأعدادات',
					type: 'collapsable',
					icon: 'build',
					children: [
						{
							id: 'governorates',
							title: 'المحافظة',
							type: 'item',
							url: '/lookup/governorates',
							exactMatch: true
						},
						{
							id: 'sectionsorcenters',
							title: 'مركز/القسم‎',
							type: 'item',
							url: '/lookup/sectionsorcenters',
							exactMatch: true
						},
						{
							id: 'villages',
							title: 'قري',
							type: 'item',
							url: '/lookup/villages',
							exactMatch: true
						},
						{
							id: 'areas',
							title: 'مناطق',
							type: 'item',
							url: '/lookup/areas',
							exactMatch: true
						},
						{
							id: 'regionalcentercodes',
							title: 'كود المركز الاقليمي',
							type: 'item',
							url: '/lookup/regionalcentercodes',
							exactMatch: true
						},
						{
							id: 'branchcodes',
							title: 'كود الفرع',
							type: 'item',
							url: '/lookup/branchcodes',
							exactMatch: true
						},
						{
							id: 'purposeofconstructions',
							title: 'الغرض الأساسي لانشاء المبنى',
							type: 'item',
							url: '/lookup/purposeofconstructions',
							exactMatch: true
						},
						{
							id: 'usebuildingpositions',
							title: 'موقف استخدام المبنى',
							type: 'item',
							url: '/lookup/usebuildingpositions',
							exactMatch: true
						},
						{
							id: 'landownerships',
							title: 'ملكية ارض',
							type: 'item',
							url: '/lookup/landownerships',
							exactMatch: true
						},
						{
							id: 'buildingownerships',
							title: 'ملكية مبني',
							type: 'item',
							url: '/lookup/buildingownerships',
							exactMatch: true
						},
						{
							id: 'constructiontypes',
							title: 'انواع الانشاء',
							type: 'item',
							url: '/lookup/constructiontypes',
							exactMatch: true
						},
						{
							id: 'effecttypecodes',
							title: 'كود نوع المؤثر\t',
							type: 'item',
							url: '/lookup/effecttypecodes',
							exactMatch: true
						},
						{
							id: 'effectcodes',
							title: 'كود المؤثر',
							type: 'item',
							url: '/lookup/effectcodes',
							exactMatch: true
						},
						{
							id: 'dependencycodes',
							title: 'كود التبعية',
							type: 'item',
							url: '/lookup/dependencycodes',
							exactMatch: true
						},
						{
							id: 'educationallevels',
							title: 'المرحلة التعليمية',
							type: 'item',
							url: '/lookup/educationallevels',
							exactMatch: true
						},
						{
							id: 'educationtypes',
							title: 'نوعية التعليم',
							type: 'item',
							url: '/lookup/educationtypes',
							exactMatch: true
						},
						{
							id: 'usageperiodnumbers',
							title: 'عدد فترات الاستخدام',
							type: 'item',
							url: '/lookup/usageperiodnumbers',
							exactMatch: true
						},
						{
							id: 'playgroundtypes',
							title: 'نوع الملعب',
							type: 'item',
							url: '/lookup/playgroundtypes',
							exactMatch: true
						},
						{
							id: 'landtypes',
							title: 'نوع الارض',
							type: 'item',
							url: '/lookup/landtypes',
							exactMatch: true
						},
						{
							id: 'statuscodes',
							title: 'كود الحالة',
							type: 'item',
							url: '/lookup/statuscodes',
							exactMatch: true
						},
						{
							id: 'gatesqualitycodes',
							title: 'كود نوعية البوابات',
							type: 'item',
							url: '/lookup/gatesqualitycodes',
							exactMatch: true
						},
						{
							id: 'periodnumbers',
							title: 'رقم الفترة',
							type: 'item',
							url: '/lookup/periodnumbers',
							exactMatch: true
						},
						{
							id: 'pupilstypes',
							title: 'نوع التلاميذ',
							type: 'item',
							url: '/lookup/pupilstypes',
							exactMatch: true
						},
						{
							id: 'extensionstructurestatuscodes',
							title: 'كود حالة هيكل الملحق',
							type: 'item',
							url: '/lookup/extensionstructurestatuscodes',
							exactMatch: true
						},
						{
							id: 'interiorfinishesstatuscodes',
							title: 'كود حالة التشطيبات الداخلية',
							type: 'item',
							url: '/lookup/interiorfinishesstatuscodes',
							exactMatch: true
						},
						{
							id: 'sanitationstatuscodes',
							title: 'كود حالة الاعمال الصحية',
							type: 'item',
							url: '/lookup/sanitationstatuscodes',
							exactMatch: true
						},
						{
							id: 'electricalworksstatuscodes',
							title: 'كود حالة الاعمال الكهربائية',
							type: 'item',
							url: '/lookup/electricalworksstatuscodes',
							exactMatch: true
						},
						{
							id: 'extensionabilityforrampingcodes',
							title: 'كود قابلة الملحق للتعلية',
							type: 'item',
							url: '/lookup/extensionabilityforrampingcodes',
							exactMatch: true
						},
						{
							id: 'extensionconstructionsystemcodes',
							title: 'كود نظام انشاء الملحق',
							type: 'item',
							url: '/lookup/extensionconstructionsystemcodes',
							exactMatch: true
						},
						{
							id: 'extensionwallconstructionmaterialscodes',
							title: 'كود مواد بناء حوائط الملحق',
							type: 'item',
							url: '/lookup/extensionwallconstructionmaterialscodes',
							exactMatch: true
						},
						{
							id: 'roofingmaterialscodes',
							title: 'كود مواد بناء الاسقف',
							type: 'item',
							url: '/lookup/roofingmaterialscodes',
							exactMatch: true
						},
						{
							id: 'classfloorsfinishingcodes',
							title: 'كود تشطيبات ارضيات الفصول',
							type: 'item',
							url: '/lookup/classfloorsfinishingcodes',
							exactMatch: true
						},
						{
							id: 'corridorsfloorfinishingcodes',
							title: 'كود تشطيبات ارضيات الطرقات',
							type: 'item',
							url: '/lookup/corridorsfloorfinishingcodes',
							exactMatch: true
						},
						{
							id: 'bathroomsfloorfinishingcodes',
							title: 'كود تشطيبات ارضيات دورات مياة',
							type: 'item',
							url: '/lookup/bathroomsfloorfinishingcodes',
							exactMatch: true
						},
						{
							id: 'labsfloorfinishingcodes',
							title: 'كود تشطيبات ارضيات معامل',
							type: 'item',
							url: '/lookup/labsfloorfinishingcodes',
							exactMatch: true
						},
						{
							id: 'otherfloorfinishingcodes',
							title: 'كود تشطيبات ارضيات اخري',
							type: 'item',
							url: '/lookup/otherfloorfinishingcodes',
							exactMatch: true
						},
						{
							id: 'classwallsfinishingcodes',
							title: 'كود تشطيبات حوائط الفصول',
							type: 'item',
							url: '/lookup/classwallsfinishingcodes',
							exactMatch: true
						},
						{
							id: 'corridorswallsfinishingcodes',
							title: 'كود تشطيبات حوائط الطرقات',
							type: 'item',
							url: '/lookup/corridorswallsfinishingcodes',
							exactMatch: true
						},
						{
							id: 'bathroomswallsfinishingcodes',
							title: 'كود تشطيبات حوائط دورات',
							type: 'item',
							url: '/lookup/bathroomswallsfinishingcodes',
							exactMatch: true
						},
						{
							id: 'labswallsfinishingcodes',
							title: 'كود تشطيبات حوائط معامل',
							type: 'item',
							url: '/lookup/labswallsfinishingcodes',
							exactMatch: true
						},
						{
							id: 'otherwallsfinishingcodes',
							title: 'كود تشطيبات حوائط اخري',
							type: 'item',
							url: '/lookup/otherwallsfinishingcodes',
							exactMatch: true
						},
						{
							id: 'classceilingsfinishingcodes',
							title: 'كود تشطيبات اسقف الفصول',
							type: 'item',
							url: '/lookup/classceilingsfinishingcodes',
							exactMatch: true
						},
						{
							id: 'corridorsceilingsfinishingcodes',
							title: 'كود تشطيبات اسقف الطرقات',
							type: 'item',
							url: '/lookup/corridorsceilingsfinishingcodes',
							exactMatch: true
						},
						{
							id: 'bathroomsceilingsfinishingcodes',
							title: 'كود تشطيبات اسقف مياه',
							type: 'item',
							url: '/lookup/bathroomsceilingsfinishingcodes',
							exactMatch: true
						},
						{
							id: 'labsceilingsfinishingcodes',
							title: 'كود تشطيبات اسقف معامل',
							type: 'item',
							url: '/lookup/labsceilingsfinishingcodes',
							exactMatch: true
						},
						{
							id: 'otherceilingsfinishingcodes',
							title: 'كود تشطيبات اسقف اخرى',
							type: 'item',
							url: '/lookup/otherceilingsfinishingcodes',
							exactMatch: true
						},
						{
							id: 'exteriorfinishingcodes',
							title: 'كود تشطيب الواجاهات الخارجية',
							type: 'item',
							url: '/lookup/exteriorfinishingcodes',
							exactMatch: true
						},
						{
							id: 'extensionconstructionwaycodes',
							title: 'كود طريقة انشاء الملحق',
							type: 'item',
							url: '/lookup/extensionconstructionwaycodes',
							exactMatch: true
						},
						{
							id: 'mainroadtypecodes',
							title: 'كود نوع الطريق الرئيسي',
							type: 'item',
							url: '/lookup/mainroadtypecodes',
							exactMatch: true
						},
						{
							id: 'directionstatuscodes',
							title: 'كود حالة الطريق الرئيسي',
							type: 'item',
							url: '/lookup/directionstatuscodes',
							exactMatch: true
						},
						{
							id: 'directioncodes',
							title: 'كود الاتجاه',
							type: 'item',
							url: '/lookup/directioncodes',
							exactMatch: true
						},
						{
							id: 'educationalspaces',
							title: 'الفراغات التعليمية',
							type: 'item',
							url: '/lookup/educationalspaces',
							exactMatch: true
						},
						{
							id: 'processingtypes',
							title: 'نوع التجهيز',
							type: 'item',
							url: '/lookup/processingtypes',
							exactMatch: true
						},
						{
							id: 'processingstates',
							title: 'الحاله للتجهيز',
							type: 'item',
							url: '/lookup/processingstates',
							exactMatch: true
						},
						{
							id: 'neighborstates',
							title: 'حاله الجار الملاصق',
							type: 'item',
							url: '/lookup/neighborstates',
							exactMatch: true
						},
						{
							id: 'hostingreasons',
							title: 'أسباب الاستضافة',
							type: 'item',
							url: '/lookup/hostingreasons',
							exactMatch: true
						},
						{
							id: 'fencestatuscodes',
							title: 'كود حالة السور',
							type: 'item',
							url: '/lookup/fencestatuscodes',
							exactMatch: true
						},
						{
							id: 'constructionmaterials',
							title: 'مادة البناء',
							type: 'item',
							url: '/lookup/constructionmaterials',
							exactMatch: true
						},
						{
							id: 'studyreasons',
							title: 'سبب الدراسة',
							type: 'item',
							url: '/lookup/studyreasons',
							exactMatch: true
						},
						{
							id: 'regionpopulationdensities',
							title: 'الكثافة السكانية للمنطقة',
							type: 'item',
							url: '/lookup/regionpopulationdensities',
							exactMatch: true
						},
						{
							id: 'regionadministrativeclassifications',
							title: 'التصنيف الاداري للمنطقة',
							type: 'item',
							url: '/lookup/regionadministrativeclassifications',
							exactMatch: true
						},
						{
							id: 'educationalneedattitudes',
							title: 'موقف الاحتياج التربوي',
							type: 'item',
							url: '/lookup/educationalneedattitudes',
							exactMatch: true
						},
						{
							id: 'schoolsurroundingimpacts',
							title: 'التاثير علي المدارس المحيطة',
							type: 'item',
							url: '/lookup/schoolsurroundingimpacts',
							exactMatch: true
						},
						{
							id: 'secondperioddepartmentlocalizations',
							title: 'الفترة الثانية لدائرة التوطين',
							type: 'item',
							url: '/lookup/secondperioddepartmentlocalizations',
							exactMatch: true
						},
						{
							id: 'positionareaneeds',
							title: 'موقف منطقة الاحتياج',
							type: 'item',
							url: '/lookup/positionareaneeds',
							exactMatch: true
						}
					]
				},
				{
					id: 'School Map Program',
					title: 'البرامج',
					type: 'collapsable',
					icon: 'apps',
					children: [
						{
							id: 'Private Center Data',
							title: 'بيانات المراكز الخاصة',
							type: 'item',
							url: '/school-map/private-center-data',
							exactMatch: true
						},
						{
							id: 'Educational Building Data',
							title: 'بيانات المبني التعليمي',
							type: 'item',
							url: '/school-map/educational-building-data',
							exactMatch: true
						},
						{
							id: 'Influential ocean',
							title: 'المحيطات المؤثرة',
							type: 'item',
							url: '/school-map/influential-ocean',
							exactMatch: true
						},
						{
							id: 'School Data',
							title: 'بيانات المدرسة ',
							type: 'item',
							url: '/school-map/school-data',
							exactMatch: true
						},
						{
							id: 'Area',
							title: 'المساحة',
							type: 'item',
							url: '/school-map/area',
							exactMatch: true
						},
						{
							id: 'Playground Data',
							title: 'بيانات الملعب',
							type: 'item',
							url: '/school-map/playground-data',
							exactMatch: true
						},
						{
							id: 'Gate',
							title: 'البوابة',
							type: 'item',
							url: '/school-map/gate',
							exactMatch: true
						},
						{
							id: 'School Period',
							title: 'الفتره المدرسية ',
							type: 'item',
							url: '/school-map/school-period',
							exactMatch: true
						},
						{
							id: 'Extension',
							title: 'الملحق',
							type: 'item',
							url: '/school-map/extension',
							exactMatch: true
						},
						{
							id: 'Level',
							title: 'منسوب',
							type: 'item',
							url: '/school-map/level',
							exactMatch: true
						},
						{
							id: 'General Site',
							title: 'الموقع العام ',
							type: 'item',
							url: '/school-map/general-site',
							exactMatch: true
						},
						{
							id: 'Processing',
							title: 'التجهيز',
							type: 'item',
							url: '/school-map/processing',
							exactMatch: true
						},
						{
							id: 'Boundaries of the public site',
							title: 'حدود الموقع العام',
							type: 'item',
							url: '/school-map/boundaries-of-the-public-site',
							exactMatch: true
						},
						{
							id: 'Public water network',
							title: 'شبكة عمومية للمياه',
							type: 'item',
							url: '/school-map/public-water-network',
							exactMatch: true
						},
						{
							id: 'Hosted School',
							title: 'مدرسة مستضافة',
							type: 'item',
							url: '/school-map/hosted-school',
							exactMatch: true
						},
						{
							id: 'Fence File',
							title: 'ملف السور',
							type: 'item',
							url: '/school-map/fence-file',
							exactMatch: true
						},
						{
							id: 'General Location',
							title: 'الموقع العام ',
							type: 'item',
							url: '/school-map/general-location',
							exactMatch: true
						},
						{
							id: 'Educational Studies',
							title: 'الدراسات التربوية',
							type: 'item',
							url: '/school-map/educational-studies',
							exactMatch: true
						}
					]
				},
				{
					id: 'School Map Report',
					title: 'التقارير',
					type: 'collapsable',
					icon: 'assignment',
					children: []
				},


				{
					id: 'assay',
					title: 'برنامج المقايسة',
					type: 'group',
					icon: 'app',
					children: [
						{
							id: 'Assay Config',
							title: 'الأعدادات',
							type: 'collapsable',
							icon: 'build',
							children: [
								{
									id: 'offeringtypes',
									title: 'انواع الطرح',
									type: 'item',
									url: '/lookup/offeringtypes',
									exactMatch: true
								},
								{
									id: 'constructiontypes',
									title: 'انواع الانشاء',
									type: 'item',
									url: '/lookup/constructiontypes',
									exactMatch: true
								},
								{
									id: 'itemcodes',
									title: 'كود البند',
									type: 'item',
									url: '/lookup/itemcodes',
									exactMatch: true
								},
								{
									id: 'branchcodes',
									title: 'كود الفرع',
									type: 'item',
									url: '/lookup/branchcodes',
									exactMatch: true
								},
								{
									id: 'areas',
									title: 'مناطق',
									type: 'item',
									url: '/lookup/areas',
									exactMatch: true
								},
								{
									id: 'modelcodes',
									title: 'كود النموذج',
									type: 'item',
									url: '/lookup/modelcodes',
									exactMatch: true
								},
								{
									id: 'worktypes',
									title: 'نوع العمل',
									type: 'item',
									url: '/lookup/worktypes',
									exactMatch: true
								}
							]
						},
						{
							id: 'Assay Program',
							title: 'البرامج',
							type: 'collapsable',
							icon: 'apps',
							children: [
								{
									id: 'Memoirs of Transgression',
									title: 'مذكرات التجاوز اعمال الغير',
									type: 'item',
									url: '/assay/memoirs-of-transgression',
									exactMatch: true
								},
								{
									id: 'Add Extensions On Construction Plan',
									title: 'اضافة ملاحق على خطة الإنشاء',
									type: 'item',
									url: '/assay/add-extensions-on-construction-plan',
									exactMatch: true
								},
								{
									id: 'Indexation Opening',
									title: 'فتح مقايسة',
									type: 'item',
									url: '/assay/indexation-opening',
									exactMatch: true
								},
								{
									id: 'Add assay data according to arithmetic coefficient',
									title: 'اضافه بيانات مقايسه وفقا  لمعامل حسابي',
									type: 'item',
									url: '/assay/add-assay-data-according-to-arithmetic-coefficient',
									exactMatch: true
								},
								{
									id: 'Modify the prices of schools for pricing 2018',
									title: 'تعديل اسعار مدارس لتسعير 2018',
									type: 'item',
									url: '/assay/modify-the-prices-of-schools-for-pricing-2018',
									exactMatch: true
								},
								{
									id: 'Adjust the position of projects',
									title: 'تعديل موقف المشروعات  ',
									type: 'item',
									url: '/assay/adjust-the-position-of-projects',
									exactMatch: true
								}
							]
						},
						{
							id: 'Assay Report',
							title: 'التقارير',
							type: 'collapsable',
							icon: 'assignment',
							children: []
						}
					]
				}
			]
		}

	],
	'probes': [
		{
			id: 'probes',
			title: 'الجسات',
			type: 'group',
			icon: 'app',
			children: [
				{
					id: 'Probes Config',
					title: 'الأعدادات',
					type: 'collapsable',
					icon: 'build',
					children: [
						{
							id: 'governorates',
							title: 'المحافظة',
							type: 'item',
							url: '/lookup/governorates',
							exactMatch: true
						},
						{
							id: 'firstlevelcodes',
							title: 'كود المستوي الاول',
							type: 'item',
							url: '/lookup/firstlevelcodes',
							exactMatch: true
						}
					]
				},
				{
					id: 'Probes Program',
					title: 'البرامج',
					type: 'collapsable',
					icon: 'apps',
					children: [
						{
							id: 'General data on the probes',
							title: 'بيانات عامه عن الجسات',
							type: 'item',
							url: '/probes/general-data-on-the-probes',
							exactMatch: true
						},
						{
							id: 'Coordinates Sensors',
							title: 'احداثيات الجسات',
							type: 'item',
							url: '/probes/coordinates-sensors',
							exactMatch: true
						},
						{
							id: 'Analysis value',
							title: 'قيم التحليل',
							type: 'item',
							url: '/probes/analysis-value',
							exactMatch: true
						},
						{
							id: 'Statements of Sensors',
							title: 'بيانات توصيات الجسات',
							type: 'item',
							url: '/probes/statements-of-sensors',
							exactMatch: true
						}
					]
				},
				{
					id: 'Probes Report',
					title: 'التقارير',
					type: 'collapsable',
					icon: 'assignment',
					children: []
				}
			]
		}
	]


};





export interface ListMenuConfig {
	[key: string]: FuseNavigation[];
}
