export const widgetConfig: Widget[] = [
    {
        name: 'رئاسة الهيئة'
        , class: 'light-blue-fg'
        , icon: 'people'
        , widget: [{
            name: 'اداره الامن'
            , class: 'red-fg'
            , icon: 'access_time'
            , widget: [{
                name: 'مكتب الامن'
                , class: 'red-fg'
                , icon: 'access_time'
                , widget: []
            }]
        }, {
            name: 'اداره الملكية العقارية'
            , class: 'red-fg'
            , icon: 'access_time'
            , widget: [{
                name: 'مكتب الملكية العقارية'
                , class: 'red-fg'
                , icon: 'access_time'
                , widget: [{
                    name: 'برنامج المبانى المؤجرة'
                    , class: 'red-fg'
                    , icon: 'access_time'
                    , url: 'rented-buildings'
                }
                    , {
                    name: 'برنامج نزع الملكية'
                    , class: 'red-fg'
                    , icon: 'access_time'
                    , url: 'expropriation'
                }]
            }]
        }, {
            name: 'اداره مكتب مدير الهيئة'
            , class: 'red-fg'
            , icon: 'access_time'
            , widget: [{
                name: 'مكتب مدير الهيئة'
                , class: 'red-fg'
                , icon: 'access_time'
                , widget: [{
                    name: 'برنامج مكتب مدير الهيئه'
                    , class: 'red-fg'
                    , icon: 'access_time'
                    , url: 'office-of-the-director-of-the-commission'
                }]
            }]
        }, {
            name: 'اداره المتابعة الفنية و الادارية'
            , class: 'red-fg'
            , icon: 'access_time'
            , widget: [{
                name: 'مكتب المتابعة الفنية و الادارية'
                , class: 'red-fg'
                , icon: 'access_time'
                , widget: []
            }]
        }, {
            name: 'اداره الشئون القانونية'
            , class: 'red-fg'
            , icon: 'access_time'
            , widget: [{
                name: 'مكتب الشئون القانونية'
                , class: 'red-fg'
                , icon: 'access_time'
                , widget: [{
                    name: 'تحقيقات'
                    , class: 'red-fg'
                    , icon: 'access_time'
                    , url: 'investigations'
                }
                    , {
                    name: 'برنامج قضايا'
                    , class: 'red-fg'
                    , icon: 'access_time'
                    , url: 'case'
                }
                    , {
                    name: 'عقود'
                    , class: 'red-fg'
                    , icon: 'access_time'
                    , url: 'contracts'
                }]
            }]
        }]
    }
    , {
        name: 'المركزية لرئاسة شئون الهيئة'
        , class: 'light-blue-fg'
        , icon: 'people'
        , widget: [{
            name: 'اداره التعاون الدولي'
            , class: 'red-fg'
            , icon: 'access_time'
            , widget: [{
                name: 'مكتب التعاون الدولي'
                , class: 'red-fg'
                , icon: 'access_time'
                , widget: [{
                    name: 'برنامج التعاون الدولي '
                    , class: 'red-fg'
                    , icon: 'access_time'
                    , url: 'international-cooperation'
                }]
            }]
        }, {
            name: 'اداره التنظيم و الادارة'
            , class: 'red-fg'
            , icon: 'access_time'
            , widget: [{
                name: 'مكتب التنظيم و الادارة'
                , class: 'red-fg'
                , icon: 'access_time'
                , widget: [{
                    name: 'برنامج تنظيم واداره - تدريب'
                    , class: 'red-fg'
                    , icon: 'access_time'
                    , url: 'organization-and-management-training'
                }
                    , {
                    name: 'برنامج تنظيم واداره - تسكين'
                    , class: 'red-fg'
                    , icon: 'access_time'
                    , url: 'organization-and-management-housing'
                }]
            }]
        }, {
            name: 'اداره العمليات و المتابعة '
            , class: 'red-fg'
            , icon: 'access_time'
            , widget: [{
                name: 'مكتب العمليات و المتابعة '
                , class: 'red-fg'
                , icon: 'access_time'
                , widget: []
            }]
        }, {
            name: 'اداره العلاقات العامة'
            , class: 'red-fg'
            , icon: 'access_time'
            , widget: [{
                name: 'مكتب العلاقات العامة'
                , class: 'red-fg'
                , icon: 'access_time'
                , widget: [{
                    name: 'برنامج العلاقات العامة'
                    , class: 'red-fg'
                    , icon: 'access_time'
                    , url: 'public-relations'
                }]
            }]
        }, {
            name: 'اداره التخطيط و المتابعة'
            , class: 'red-fg'
            , icon: 'access_time'
            , widget: [{
                name: 'مكتب التخطيط و المتابعة'
                , class: 'red-fg'
                , icon: 'access_time'
                , widget: [{
                    name: 'برنامج متابعة المشروعات'
                    , class: 'red-fg'
                    , icon: 'access_time'
                    , url: 'follow-up-project'
                }
                    , {
                    name: 'برنامج التخطيط والمتابعة'
                    , class: 'red-fg'
                    , icon: 'access_time'
                    , url: 'planning-and-follow-up'
                }
                    , {
                    name: 'برنامج الاعمال المؤداه للغير'
                    , class: 'red-fg'
                    , icon: 'access_time'
                    , url: 'business-to-others'
                }]
            }]
        }, {
            name: 'اداره خدمة المواطنين'
            , class: 'red-fg'
            , icon: 'access_time'
            , widget: [{
                name: 'مكتب خدمة المواطنين'
                , class: 'red-fg'
                , icon: 'access_time'
                , widget: []
            }]
        }, {
            name: 'اداره التسعير و المدد'
            , class: 'red-fg'
            , icon: 'access_time'
            , widget: [{
                name: 'مكتب التسعير و المدد'
                , class: 'red-fg'
                , icon: 'access_time'
                , widget: [{
                    name: 'برنامج التسعير و المدد'
                    , class: 'red-fg'
                    , icon: 'access_time'
                    , url: 'timing-and-pricing'
                }
                    , {
                    name: 'برنامج مستخلص'
                    , class: 'red-fg'
                    , icon: 'access_time'
                    , url: 'extract'
                }]
            }]
        }]
    }
    , {
        name: 'المركزية للشئون المالية و الادارية'
        , class: 'light-blue-fg'
        , icon: 'people'
        , widget: [{
            name: 'اداره التشغيل الذاتي'
            , class: 'red-fg'
            , icon: 'access_time'
            , widget: [{
                name: 'مكتب التشغيل الذاتي'
                , class: 'red-fg'
                , icon: 'access_time'
                , widget: []
            }]
        }, {
            name: 'اداره شئون المقر'
            , class: 'red-fg'
            , icon: 'access_time'
            , widget: [{
                name: 'مكتب شئون المقر'
                , class: 'red-fg'
                , icon: 'access_time'
                , widget: []
            }]
        }, {
            name: 'اداره النجارة و الدهنات'
            , class: 'red-fg'
            , icon: 'access_time'
            , widget: [{
                name: 'مكتب النجارة و الدهنات'
                , class: 'red-fg'
                , icon: 'access_time'
                , widget: []
            }]
        }, {
            name: 'اداره صيانة الانظمة الفنية'
            , class: 'red-fg'
            , icon: 'access_time'
            , widget: [{
                name: 'مكتب صيانة الانظمة الفنية'
                , class: 'red-fg'
                , icon: 'access_time'
                , widget: [{
                    name: 'برنامج صيانة الآلات والمعدات'
                    , class: 'red-fg'
                    , icon: 'access_time'
                    , url: 'maintenance-of-machinery-and-equipment'
                }]
            }]
        }, {
            name: 'اداره النقل و الحركة'
            , class: 'red-fg'
            , icon: 'access_time'
            , widget: [{
                name: 'مكتب النقل و الحركة'
                , class: 'red-fg'
                , icon: 'access_time'
                , widget: [{
                    name: 'برنامج النقل والحركة'
                    , class: 'red-fg'
                    , icon: 'access_time'
                    , url: 'transport-and-movement'
                }]
            }]
        }, {
            name: 'اداره الاتصالات و الانظمة الفنية'
            , class: 'red-fg'
            , icon: 'access_time'
            , widget: [{
                name: 'مكتب الاتصالات و الانظمة الفنية'
                , class: 'red-fg'
                , icon: 'access_time'
                , widget: []
            }]
        }, {
            name: 'اداره السكارتارية و المحفوظات'
            , class: 'red-fg'
            , icon: 'access_time'
            , widget: [{
                name: 'مكتب السكارتارية و المحفوظات'
                , class: 'red-fg'
                , icon: 'access_time'
                , widget: [{
                    name: 'برنامج السكرتارية والمحفوظات'
                    , class: 'red-fg'
                    , icon: 'access_time'
                    , url: 'secretarial-and-archives-'
                }]
            }]
        }, {
            name: 'اداره الادارة الطبية'
            , class: 'red-fg'
            , icon: 'access_time'
            , widget: [{
                name: 'مكتب الادارة الطبية'
                , class: 'red-fg'
                , icon: 'access_time'
                , widget: [{
                    name: 'برنامج الصيدلية'
                    , class: 'red-fg'
                    , icon: 'access_time'
                    , url: 'pharmacy'
                }
                    , {
                    name: 'برنامج العياده'
                    , class: 'red-fg'
                    , icon: 'access_time'
                    , url: 'clinic'
                }]
            }]
        }, {
            name: 'اداره مراقبة الوقت'
            , class: 'red-fg'
            , icon: 'access_time'
            , widget: [{
                name: 'مكتب مراقبة الوقت'
                , class: 'red-fg'
                , icon: 'access_time'
                , widget: [{
                    name: 'برنامج ضبط مراقبة الوقت و دوام العامل'
                    , class: 'red-fg'
                    , icon: 'access_time'
                    , url: 'time-management'
                }]
            }]
        }, {
            name: 'اداره المطبعة'
            , class: 'red-fg'
            , icon: 'access_time'
            , widget: [{
                name: 'مكتب المطبعة'
                , class: 'red-fg'
                , icon: 'access_time'
                , widget: []
            }]
        }, {
            name: 'اداره الشئون المالية'
            , class: 'red-fg'
            , icon: 'access_time'
            , widget: [{
                name: 'مكتب الشئون المالية'
                , class: 'red-fg'
                , icon: 'access_time'
                , widget: [{
                    name: 'برنامج حسابات'
                    , class: 'red-fg'
                    , icon: 'access_time'
                    , url: 'accounts'
                }
                    , {
                    name: 'برنامج الموازنة'
                    , class: 'red-fg'
                    , icon: 'access_time'
                    , url: 'budget'
                }
                    , {
                    name: 'موازنة - باب سادس'
                    , class: 'red-fg'
                    , icon: 'access_time'
                    , url: 'balancing-part-6'
                }
                    , {
                    name: 'موازنة - باب اول'
                    , class: 'red-fg'
                    , icon: 'access_time'
                    , url: 'balancing-part-1'
                }
                    , {
                    name: 'موازنة - باب ثاني'
                    , class: 'red-fg'
                    , icon: 'access_time'
                    , url: 'balancing-part-2'
                }]
            }]
        }, {
            name: 'اداره المشتريات و المخازن'
            , class: 'red-fg'
            , icon: 'access_time'
            , widget: [{
                name: 'مكتب المشتريات و المخازن'
                , class: 'red-fg'
                , icon: 'access_time'
                , widget: [{
                    name: 'برنامج مشتريات'
                    , class: 'red-fg'
                    , icon: 'access_time'
                    , url: 'purchase'
                }
                    , {
                    name: 'برنامج المخازن'
                    , class: 'red-fg'
                    , icon: 'access_time'
                    , url: 'store'
                }]
            }]
        }, {
            name: 'اداره شئون العاملين'
            , class: 'red-fg'
            , icon: 'access_time'
            , widget: [{
                name: 'مكتب شئون العاملين'
                , class: 'red-fg'
                , icon: 'access_time'
                , widget: [{
                    name: 'برنامج شئون عاملين -اجازة'
                    , class: 'red-fg'
                    , icon: 'access_time'
                    , url: 'vacation'
                }
                    , {
                    name: 'برنامج شئون عاملين - بيانات موظف'
                    , class: 'red-fg'
                    , icon: 'access_time'
                    , url: 'employee'
                }
                    , {
                    name: 'برنامج شئون عاملين -تامينات اجتماعية '
                    , class: 'red-fg'
                    , icon: 'access_time'
                    , url: 'social-security'
                }
                    , {
                    name: 'برنامج شئون عاملين -حساب المرتب'
                    , class: 'red-fg'
                    , icon: 'access_time'
                    , url: 'salary-calculation'
                }
                    , {
                    name: 'برنامج المسابقات شئون العاملين'
                    , class: 'red-fg'
                    , icon: 'access_time'
                    , url: 'competitions-personnel-affairs'
                }]
            }]
        }]
    }
    , {
        name: 'المركزية للبحوث و الدراسات و المعلومات'
        , class: 'light-blue-fg'
        , icon: 'people'
        , widget: [{
            name: 'اداره البحوث و الدراسات '
            , class: 'red-fg'
            , icon: 'access_time'
            , widget: [{
                name: 'مكتب البحوث و الدراسات '
                , class: 'red-fg'
                , icon: 'access_time'
                , widget: [{
                    name: 'برنامج البحوث والدراسات'
                    , class: 'red-fg'
                    , icon: 'access_time'
                    , url: 'research-and-studies'
                }]
            }]
        }, {
            name: 'اداره ضبط الجودة'
            , class: 'red-fg'
            , icon: 'access_time'
            , widget: [{
                name: 'مكتب ضبط الجودة'
                , class: 'red-fg'
                , icon: 'access_time'
                , widget: [{
                    name: 'برنامج ادارة الجوده'
                    , class: 'red-fg'
                    , icon: 'access_time'
                    , url: 'quality-management'
                }]
            }]
        }, {
            name: 'اداره تطوير النظم'
            , class: 'red-fg'
            , icon: 'access_time'
            , widget: [{
                name: 'مكتب تطوير النظم'
                , class: 'red-fg'
                , icon: 'access_time'
                , widget: [{
                    name: 'برنامج الاستعلام الحر للنشرة الاحصائية'
                    , class: 'red-fg'
                    , icon: 'access_time'
                    , url: 'free-query-for-statistical-bulletin'
                }
                    , {
                    name: 'برنامج نموذج  النمو السكاني'
                    , class: 'red-fg'
                    , icon: 'access_time'
                    , url: 'population-growth-model'
                }
                    , {
                    name: 'برنامج المناطق   المحرومة من التعليم'
                    , class: 'red-fg'
                    , icon: 'access_time'
                    , url: 'education-deprived-areas'
                }
                    , {
                    name: 'برنامج (الاحتياجات من الفصول( الخطة '
                    , class: 'red-fg'
                    , icon: 'access_time'
                    , url: 'classroom-requirements'
                }]
            }]
        }, {
            name: 'اداره الخريطة المدرسية'
            , class: 'red-fg'
            , icon: 'access_time'
            , widget: [{
                name: 'مكتب الخريطة المدرسية'
                , class: 'red-fg'
                , icon: 'access_time'
                , widget: [{
                    name: 'برنامج الخريطة المدرسية'
                    , class: 'red-fg'
                    , icon: 'access_time'
                    , url: 'school-map'
                }
                    , {
                    name: 'برنامج الاراضى'
                    , class: 'red-fg'
                    , icon: 'access_time'
                    , url: 'land'
                }
                    , {
                    name: 'برنامج الدراسة التربوية'
                    , class: 'red-fg'
                    , icon: 'access_time'
                    , url: 'educational-study'
                }
                    , {
                    name: 'برنامج الخريطه المدرسيه فروع'
                    , class: 'red-fg'
                    , icon: 'access_time'
                    , url: 'school-branches-map'
                }
                    , {
                    name: 'الاراضى فروع'
                    , class: 'red-fg'
                    , icon: 'access_time'
                    , url: 'landbranch'
                }]
            }]
        }, {
            name: 'اداره المكتبة'
            , class: 'red-fg'
            , icon: 'access_time'
            , widget: [{
                name: 'مكتب المكتبة'
                , class: 'red-fg'
                , icon: 'access_time'
                , widget: [{
                    name: 'برنامج المكتبه'
                    , class: 'red-fg'
                    , icon: 'access_time'
                    , url: 'library'
                }]
            }]
        }]
    }
    , {
        name: 'المركزية للصيانة'
        , class: 'light-blue-fg'
        , icon: 'people'
        , widget: [{
            name: 'اداره الحاسب الالي و الاجهزة الدقيقة'
            , class: 'red-fg'
            , icon: 'access_time'
            , widget: [{
                name: 'مكتب الحاسب الالي و الاجهزة الدقيقة'
                , class: 'red-fg'
                , icon: 'access_time'
                , widget: [{
                    name: 'برنامج صيانة الحاسبات'
                    , class: 'red-fg'
                    , icon: 'access_time'
                    , url: 'computer-maintenance'
                }]
            }]
        }, {
            name: 'اداره الالات و المعدات'
            , class: 'red-fg'
            , icon: 'access_time'
            , widget: [{
                name: 'مكتب الالات و المعدات'
                , class: 'red-fg'
                , icon: 'access_time'
                , widget: []
            }]
        }, {
            name: 'اداره صيانة المباني '
            , class: 'red-fg'
            , icon: 'access_time'
            , widget: [{
                name: 'مكتب صيانة المباني '
                , class: 'red-fg'
                , icon: 'access_time'
                , widget: [{
                    name: 'برنامج صيانة المباني'
                    , class: 'red-fg'
                    , icon: 'access_time'
                    , url: 'maintenance-of-educational-building'
                }
                    , {
                    name: 'برنامج فحص ومعاينة مباني'
                    , class: 'red-fg'
                    , icon: 'access_time'
                    , url: 'inspection-of-buildings'
                }]
            }]
        }]
    }
    , {
        name: 'المركزية لشئون الفروع'
        , class: 'light-blue-fg'
        , icon: 'people'
        , widget: [{
            name: 'اداره الفروع'
            , class: 'red-fg'
            , icon: 'access_time'
            , widget: [{
                name: 'مكتب الفروع'
                , class: 'red-fg'
                , icon: 'access_time'
                , widget: [{
                    name: 'برنامج مدير الفرع'
                    , class: 'red-fg'
                    , icon: 'access_time'
                    , url: 'branch-manager'
                }]
            }]
        }]
    }
    , {
        name: 'المركزية للتجهيزات'
        , class: 'light-blue-fg'
        , icon: 'people'
        , widget: [{
            name: 'اداره التجهزيات المعملية '
            , class: 'red-fg'
            , icon: 'access_time'
            , widget: [{
                name: 'مكتب التجهزيات المعملية '
                , class: 'red-fg'
                , icon: 'access_time'
                , widget: [{
                    name: 'برنامج التجهيزات المعملية'
                    , class: 'red-fg'
                    , icon: 'access_time'
                    , url: 'laboratory-equipment'
                }]
            }]
        }, {
            name: 'اداره التجهيزات الفنية '
            , class: 'red-fg'
            , icon: 'access_time'
            , widget: [{
                name: 'مكتب التجهيزات الفنية '
                , class: 'red-fg'
                , icon: 'access_time'
                , widget: []
            }]
        }, {
            name: 'اداره التجهيزات النمطية '
            , class: 'red-fg'
            , icon: 'access_time'
            , widget: [{
                name: 'مكتب التجهيزات النمطية '
                , class: 'red-fg'
                , icon: 'access_time'
                , widget: [{
                    name: 'برنامج التجهيز النمطي'
                    , class: 'red-fg'
                    , icon: 'access_time'
                    , url: 'typical-processing'
                }]
            }]
        }]
    }
    , {
        name: 'المركزية للتصميم'
        , class: 'light-blue-fg'
        , icon: 'people'
        , widget: [{
            name: 'اداره المقايسات'
            , class: 'red-fg'
            , icon: 'access_time'
            , widget: [{
                name: 'مكتب المقايسات'
                , class: 'red-fg'
                , icon: 'access_time'
                , widget: [{
                    name: 'برنامج  فروق الاوزان'
                    , class: 'red-fg'
                    , icon: 'access_time'
                    , url: 'weights-differences'
                }
                    , {
                    name: 'برنامج المقايسة'
                    , class: 'red-fg'
                    , icon: 'access_time'
                    , url: 'assay'
                }
                    , {
                    name: 'برنامج مقايسه -وظائف البنود والعناصر للمشروع'
                    , class: 'red-fg'
                    , icon: 'access_time'
                    , url: 'assay-unctions-of-items-and-elements-of-the-project'
                }
                    , {
                    name: 'برنامج المقايسة - قائمة المقايسات - أكواد النظام الفرعي للمقايسات'
                    , class: 'red-fg'
                    , icon: 'access_time'
                    , url: 'assay-list-subsystem-code'
                }
                    , {
                    name: 'برنامج المقايسة - النظام الفرعي للمقايسات'
                    , class: 'red-fg'
                    , icon: 'access_time'
                    , url: 'assay-subsystem-of-assays'
                }
                    , {
                    name: 'برنامج معاينة المبانى وشهادة الصلاحية'
                    , class: 'red-fg'
                    , icon: 'access_time'
                    , url: 'building-inspection-and-validity-certificate'
                }
                    , {
                    name: 'برنامج مقايسه -قائمة انشاء اعمال الغير'
                    , class: 'red-fg'
                    , icon: 'access_time'
                    , url: 'assay-list-of-creation-of-works-of-others'
                }
                    , {
                    name: 'برنامج المقايسة - أعمال مقايسات السحب'
                    , class: 'red-fg'
                    , icon: 'access_time'
                    , url: 'assay-work-of-clouds-assays'
                }
                    , {
                    name: 'برنامج المقايسة - قائمة معامل الاوزان للمبني'
                    , class: 'red-fg'
                    , icon: 'access_time'
                    , url: 'assay-building-weight-factor-list'
                }
                    , {
                    name: 'برنامج المقايسة - تطوير مكاتب البريد'
                    , class: 'red-fg'
                    , icon: 'access_time'
                    , url: 'assay-post-office-development'
                }
                    , {
                    name: 'برنامج المقايسة - قائمة المقايسات - أعمال قائمة أسعار الهيئة'
                    , class: 'red-fg'
                    , icon: 'access_time'
                    , url: 'assay-assay-list-authority-price-list'
                }
                    , {
                    name: 'برنامج المقايسة - قائمة المقايسات - أعمال نماذج الأبنية'
                    , class: 'red-fg'
                    , icon: 'access_time'
                    , url: 'assay-assay-list-building-models-work'
                }
                    , {
                    name: 'برنامج المقايسة - قائمة المقايسات - أعمال مقايسات الأبنية'
                    , class: 'red-fg'
                    , icon: 'access_time'
                    , url: 'assay-assay-list-building-assay'
                }]
            }]
        }, {
            name: 'اداره التصميم الانشائي'
            , class: 'red-fg'
            , icon: 'access_time'
            , widget: [{
                name: 'مكتب التصميم الانشائي'
                , class: 'red-fg'
                , icon: 'access_time'
                , widget: []
            }]
        }, {
            name: 'اداره التصميم  المعماري'
            , class: 'red-fg'
            , icon: 'access_time'
            , widget: [{
                name: 'مكتب التصميم  المعماري'
                , class: 'red-fg'
                , icon: 'access_time'
                , widget: []
            }]
        }, {
            name: 'اداره التكميلي'
            , class: 'red-fg'
            , icon: 'access_time'
            , widget: [{
                name: 'مكتب التكميلي'
                , class: 'red-fg'
                , icon: 'access_time'
                , widget: []
            }]
        }]
    }
    , {
        name: 'اخري'
        , class: 'light-blue-fg'
        , icon: 'people'
        , widget: [{
            name: 'اداره جمعية الخدمات'
            , class: 'red-fg'
            , icon: 'access_time'
            , widget: [{
                name: 'مكتب جمعية الخدمات'
                , class: 'red-fg'
                , icon: 'access_time'
                , widget: [{
                    name: 'برنامج جمعية الخدمات'
                    , class: 'red-fg'
                    , icon: 'access_time'
                    , url: 'services-association'
                }]
            }]
        }, {
            name: 'اداره لجنة فض المنازعات'
            , class: 'red-fg'
            , icon: 'access_time'
            , widget: [{
                name: 'مكتب لجنة فض المنازعات'
                , class: 'red-fg'
                , icon: 'access_time'
                , widget: []
            }]
        }, {
            name: 'اداره الصندوق'
            , class: 'red-fg'
            , icon: 'access_time'
            , widget: [{
                name: 'مكتب الصندوق'
                , class: 'red-fg'
                , icon: 'access_time'
                , widget: [{
                    name: 'برنامج صندوق التكافل الاجتماعي'
                    , class: 'red-fg'
                    , icon: 'access_time'
                    , url: 'social-solidarity-fund'
                }
                    , {
                    name: 'برنامج صندوق التكافل الاجتماعي أ'
                    , class: 'red-fg'
                    , icon: 'access_time'
                    , url: 'social-solidarity-fund-a'
                }
                    , {
                    name: 'برنامج صندوق التكافل الاجتماعي ب'
                    , class: 'red-fg'
                    , icon: 'access_time'
                    , url: 'social-solidarity-fund-b'
                }
                    , {
                    name: 'برنامج صندوق التكافل الاجتماعي ج'
                    , class: 'red-fg'
                    , icon: 'access_time'
                    , url: 'social-solidarity-fund-g'
                }]
            }]
        }, {
            name: 'اداره جمعية التعاونية'
            , class: 'red-fg'
            , icon: 'access_time'
            , widget: [{
                name: 'مكتب جمعية التعاونية'
                , class: 'red-fg'
                , icon: 'access_time'
                , widget: [{
                    name: 'برنامج جمعيه التعاونيه'
                    , class: 'red-fg'
                    , icon: 'access_time'
                    , url: 'cooperative-society'
                }]
            }]
        }, {
            name: 'اداره النقابة'
            , class: 'red-fg'
            , icon: 'access_time'
            , widget: [{
                name: 'مكتب النقابة '
                , class: 'red-fg'
                , icon: 'access_time'
                , widget: [{
                    name: 'برنامج النقابه'
                    , class: 'red-fg'
                    , icon: 'access_time'
                    , url: '-guild'
                }]
            }]
        }, {
            name: 'اداره الوحدات الصحية وزارة التضامن هيئة البريد'
            , class: 'red-fg'
            , icon: 'access_time'
            , widget: [{
                name: 'مكتب الوحدات الصحية وزارة التضامن هيئة البريد'
                , class: 'red-fg'
                , icon: 'access_time'
                , widget: [{
                    name: 'برنامج الوحدات الصحية وزارة التضامن هيئة البريد'
                    , class: 'red-fg'
                    , icon: 'access_time'
                    , url: 'health-units-ministry'
                }
                    , {
                    name: 'مكاتب البريد'
                    , class: 'red-fg'
                    , icon: 'access_time'
                    , url: 'post-offices'
                }
                    , {
                    name: 'وزارة التضامن'
                    , class: 'red-fg'
                    , icon: 'access_time'
                    , url: 'ministry-of-solidarity'
                }]
            }]
        }]
    }
];


export interface Widget {
    name: string;
    class: string;
    icon: string;
    url?: string;
    widget?: Widget[];
}
