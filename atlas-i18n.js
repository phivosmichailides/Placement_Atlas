/* Placement Atlas multilingual interface · Phase 1
   Static, privacy-friendly UI translations. Programme and employer data is intentionally excluded.
   Extend the dictionaries here as new interface copy is added. */
(() => {
  'use strict';

  const LANGUAGES = [
    ['en', '🇬🇧 English'],
    ['ur', '🇵🇰 اردو'],
    ['ar', '🇸🇦 العربية'],
    ['zh-CN', '🇨🇳 简体中文'],
    ['zh-TW', '🇹🇼 繁體中文'],
    ['pa', '🇮🇳 ਪੰਜਾਬੀ'],
    ['bn', '🇧🇩 বাংলা'],
    ['hi', '🇮🇳 हिन्दी'],
    ['gu', '🇮🇳 ગુજરાતી'],
    ['ta', '🇮🇳 தமிழ்'],
    ['pl', '🇵🇱 Polski'],
    ['ro', '🇷🇴 Română'],
    ['es', '🇪🇸 Español'],
    ['fr', '🇫🇷 Français'],
    ['pt', '🇵🇹 Português']
  ];

  const DICTIONARIES = {
    ur: {
      'Language':'زبان','Explore':'دریافت کریں','For You':'آپ کے لیے','Shortlist':'مختصر فہرست',
      'Learning Hub':'سیکھنے کا مرکز','My Outcome':'میرا نتیجہ','Compare':'موازنہ','Preferences':'ترجیحات',
      'Your filters':'آپ کے فلٹرز','Reset':'ری سیٹ','Search':'تلاش','Sector':'شعبہ','Region':'علاقہ',
      'Any':'کوئی بھی','Max hours':'زیادہ سے زیادہ گھنٹے','Minimum salary':'کم از کم تنخواہ',
      'Decisions':'فیصلے','All decisions':'تمام فیصلے','My shortlist':'میری مختصر فہرست','Excluded':'خارج کردہ',
      'Skilled Worker visa sponsorship':'Skilled Worker visa کی اسپانسرشپ','All programmes':'تمام پروگرام',
      'Specialist settings':'خصوصی شعبے','Sort by':'ترتیب دیں','Salary':'تنخواہ',
      'Effective hourly pay':'فی گھنٹہ مؤثر اجرت','Shortest week':'مختصر ترین ہفتہ','List':'فہرست','Grid':'گرڈ',
      'About & support':'تعارف اور مدد','Find your foundation placement.':'اپنی فاؤنڈیشن ٹریننگ کی جگہ تلاش کریں۔',
      'Explore all programme locations across England & Wales':'England اور Wales میں تمام پروگراموں کے مقامات دیکھیں',
      'Map style':'نقشے کا انداز','Fit results':'نتائج کو نقشے میں فٹ کریں','Hide filters':'فلٹرز چھپائیں',
      'Best fit':'بہترین مطابقت','Highest salary':'سب سے زیادہ تنخواہ','Export decisions':'فیصلے برآمد کریں',
      'Backup':'بیک اپ','Restore backup':'بیک اپ بحال کریں','No results found':'کوئی نتیجہ نہیں ملا'
    },
    ar: {
      'Language':'اللغة','Explore':'استكشف','For You':'مقترح لك','Shortlist':'القائمة المختصرة',
      'Learning Hub':'مركز التعلّم','My Outcome':'نتيجتي','Compare':'مقارنة','Preferences':'التفضيلات',
      'Your filters':'عوامل التصفية','Reset':'إعادة ضبط','Search':'بحث','Sector':'القطاع','Region':'المنطقة',
      'Any':'الكل','Max hours':'الحد الأقصى للساعات','Minimum salary':'الحد الأدنى للراتب',
      'Decisions':'القرارات','All decisions':'جميع القرارات','My shortlist':'قائمتي المختصرة','Excluded':'مستبعد',
      'Skilled Worker visa sponsorship':'رعاية تأشيرة Skilled Worker','All programmes':'جميع البرامج',
      'Specialist settings':'التخصصات','Sort by':'ترتيب حسب','Salary':'الراتب',
      'Effective hourly pay':'الأجر الفعلي بالساعة','Shortest week':'أقصر أسبوع عمل','List':'قائمة','Grid':'شبكة',
      'About & support':'حول ودعم','Find your foundation placement.':'اعثر على مكان التدريب التأسيسي المناسب لك.',
      'Explore all programme locations across England & Wales':'استكشف مواقع جميع البرامج في إنجلترا وويلز',
      'Map style':'نمط الخريطة','Fit results':'ملاءمة النتائج على الخريطة','Hide filters':'إخفاء عوامل التصفية',
      'Best fit':'أفضل توافق','Highest salary':'أعلى راتب','Export decisions':'تصدير القرارات',
      'Backup':'نسخة احتياطية','Restore backup':'استعادة النسخة الاحتياطية','No results found':'لم يتم العثور على نتائج'
    },
    'zh-CN': {
      'Language':'语言','Explore':'探索','For You':'为你推荐','Shortlist':'收藏清单',
      'Learning Hub':'学习中心','My Outcome':'我的结果','Compare':'比较','Preferences':'偏好设置',
      'Your filters':'筛选条件','Reset':'重置','Search':'搜索','Sector':'领域','Region':'地区',
      'Any':'不限','Max hours':'每周最多工时','Minimum salary':'最低薪资','Decisions':'选择状态',
      'All decisions':'所有状态','My shortlist':'我的收藏','Excluded':'已排除',
      'Skilled Worker visa sponsorship':'Skilled Worker 签证担保','All programmes':'所有项目',
      'Specialist settings':'专科领域','Sort by':'排序方式','Salary':'薪资',
      'Effective hourly pay':'实际时薪','Shortest week':'每周工时最短','List':'列表','Grid':'网格',
      'About & support':'关于与帮助','Find your foundation placement.':'找到适合你的基础培训岗位。',
      'Explore all programme locations across England & Wales':'查看英格兰和威尔士所有培训项目的地点',
      'Map style':'地图样式','Fit results':'缩放至搜索结果','Hide filters':'隐藏筛选条件',
      'Best fit':'最匹配','Highest salary':'最高薪资','Export decisions':'导出选择',
      'Backup':'备份','Restore backup':'恢复备份','No results found':'未找到结果'
    },
    'zh-TW': {
      'Language':'語言','Explore':'探索','For You':'為你推薦','Shortlist':'收藏清單',
      'Learning Hub':'學習中心','My Outcome':'我的結果','Compare':'比較','Preferences':'偏好設定',
      'Your filters':'篩選條件','Reset':'重設','Search':'搜尋','Sector':'領域','Region':'地區',
      'Any':'不限','Max hours':'每週最多工時','Minimum salary':'最低薪資','Decisions':'選擇狀態',
      'All decisions':'所有狀態','My shortlist':'我的收藏','Excluded':'已排除',
      'Skilled Worker visa sponsorship':'Skilled Worker 簽證擔保','All programmes':'所有計畫',
      'Specialist settings':'專科領域','Sort by':'排序方式','Salary':'薪資',
      'Effective hourly pay':'實際時薪','Shortest week':'每週工時最短','List':'清單','Grid':'格狀',
      'About & support':'關於與支援','Find your foundation placement.':'找到適合你的基礎培訓職位。',
      'Explore all programme locations across England & Wales':'查看英格蘭和威爾斯所有培訓計畫的地點',
      'Map style':'地圖樣式','Fit results':'縮放至搜尋結果','Hide filters':'隱藏篩選條件',
      'Best fit':'最符合','Highest salary':'最高薪資','Export decisions':'匯出選擇',
      'Backup':'備份','Restore backup':'還原備份','No results found':'找不到結果'
    },
    pa: {
      'Language':'ਭਾਸ਼ਾ','Explore':'ਖੋਜੋ','For You':'ਤੁਹਾਡੇ ਲਈ','Shortlist':'ਚੁਣੀ ਸੂਚੀ',
      'Learning Hub':'ਸਿੱਖਣ ਕੇਂਦਰ','My Outcome':'ਮੇਰਾ ਨਤੀਜਾ','Compare':'ਤੁਲਨਾ ਕਰੋ','Preferences':'ਤਰਜੀਹਾਂ',
      'Your filters':'ਤੁਹਾਡੇ ਫਿਲਟਰ','Reset':'ਰੀਸੈੱਟ','Search':'ਖੋਜ','Sector':'ਖੇਤਰ','Region':'ਇਲਾਕਾ',
      'Any':'ਕੋਈ ਵੀ','Max hours':'ਵੱਧ ਤੋਂ ਵੱਧ ਘੰਟੇ','Minimum salary':'ਘੱਟੋ-ਘੱਟ ਤਨਖਾਹ',
      'Decisions':'ਫੈਸਲੇ','All decisions':'ਸਾਰੇ ਫੈਸਲੇ','My shortlist':'ਮੇਰੀ ਚੁਣੀ ਸੂਚੀ','Excluded':'ਬਾਹਰ ਰੱਖੇ',
      'Skilled Worker visa sponsorship':'Skilled Worker ਵੀਜ਼ਾ ਸਪਾਂਸਰਸ਼ਿਪ','All programmes':'ਸਾਰੇ ਪ੍ਰੋਗਰਾਮ',
      'Specialist settings':'ਮਾਹਰ ਸੈਟਿੰਗਾਂ','Sort by':'ਇਸ ਅਨੁਸਾਰ ਕ੍ਰਮਬੱਧ ਕਰੋ','Salary':'ਤਨਖਾਹ',
      'Effective hourly pay':'ਪ੍ਰਭਾਵੀ ਘੰਟਾਵਾਰ ਤਨਖਾਹ','Shortest week':'ਸਭ ਤੋਂ ਛੋਤਾ ਕੰਮਕਾਜੀ ਹਫ਼ਤਾ',
      'List':'ਸੂਚੀ','Grid':'ਗਰਿੱਡ','About & support':'ਜਾਣਕਾਰੀ ਅਤੇ ਸਹਾਇਤਾ',
      'Find your foundation placement.':'ਆਪਣੀ ਫਾਊਂਡੇਸ਼ਨ ਟ੍ਰੇਨਿੰਗ ਪਲੇਸਮੈਂਟ ਲੱਭੋ।',
      'Explore all programme locations across England & Wales':'ਇੰਗਲੈਂਡ ਅਤੇ ਵੇਲਜ਼ ਵਿੱਚ ਸਾਰੇ ਪ੍ਰੋਗਰਾਮਾਂ ਦੇ ਸਥਾਨ ਵੇਖੋ',
      'Map style':'ਨਕਸ਼ੇ ਦੀ ਸ਼ੈਲੀ','Fit results':'ਨਤੀਜਿਆਂ ਨੂੰ ਨਕਸ਼ੇ ਵਿੱਚ ਫਿੱਟ ਕਰੋ','Hide filters':'ਫਿਲਟਰ ਲੁਕਾਓ',
      'Best fit':'ਸਭ ਤੋਂ ਵਧੀਆ ਮੇਲ','Highest salary':'ਸਭ ਤੋਂ ਵੱਧ ਤਨਖਾਹ','Export decisions':'ਫੈਸਲੇ ਐਕਸਪੋਰਟ ਕਰੋ',
      'Backup':'ਬੈਕਅੱਪ','Restore backup':'ਬੈਕਅੱਪ ਮੁੜ ਪ੍ਰਾਪਤ ਕਰੋ','No results found':'ਕੋਈ ਨਤੀਜਾ ਨਹੀਂ ਮਿਲਿਆ'
    },
    bn: {
      'Language':'ভাষা','Explore':'অন্বেষণ করুন','For You':'আপনার জন্য','Shortlist':'সংক্ষিপ্ত তালিকা',
      'Learning Hub':'শেখার কেন্দ্র','My Outcome':'আমার ফলাফল','Compare':'তুলনা করুন','Preferences':'পছন্দসমূহ',
      'Your filters':'আপনার ফিল্টার','Reset':'রিসেট','Search':'অনুসন্ধান','Sector':'খাত','Region':'অঞ্চল',
      'Any':'যেকোনো','Max hours':'সর্বোচ্চ কর্মঘণ্টা','Minimum salary':'সর্বনিম্ন বেতন',
      'Decisions':'সিদ্ধান্ত','All decisions':'সব সিদ্ধান্ত','My shortlist':'আমার সংক্ষিপ্ত তালিকা','Excluded':'বাদ দেওয়া',
      'Skilled Worker visa sponsorship':'Skilled Worker ভিসা স্পনসরশিপ','All programmes':'সব প্রোগ্রাম',
      'Specialist settings':'বিশেষায়িত ক্ষেত্র','Sort by':'সাজান','Salary':'বেতন',
      'Effective hourly pay':'কার্যকর ঘণ্টাপ্রতি পারিশ্রমিক','Shortest week':'সবচেয়ে কম কর্মঘণ্টার সপ্তাহ',
      'List':'তালিকা','Grid':'গ্রিড','About & support':'পরিচিতি ও সহায়তা',
      'Find your foundation placement.':'আপনার ফাউন্ডেশন প্রশিক্ষণের স্থান খুঁজুন।',
      'Explore all programme locations across England & Wales':'ইংল্যান্ড ও ওয়েলসের সব প্রোগ্রামের অবস্থান দেখুন',
      'Map style':'মানচিত্রের ধরন','Fit results':'ফলাফল অনুযায়ী মানচিত্র সাজান','Hide filters':'ফিল্টার লুকান',
      'Best fit':'সেরা মিল','Highest salary':'সর্বোচ্চ বেতন','Export decisions':'সিদ্ধান্ত এক্সপোর্ট করুন',
      'Backup':'ব্যাকআপ','Restore backup':'ব্যাকআপ পুনরুদ্ধার','No results found':'কোনো ফলাফল পাওয়া যায়নি'
    },
    hi: {
      'Language':'भाषा','Explore':'खोजें','For You':'आपके लिए','Shortlist':'चयनित सूची',
      'Learning Hub':'लर्निंग हब','My Outcome':'मेरा परिणाम','Compare':'तुलना करें','Preferences':'प्राथमिकताएँ',
      'Your filters':'आपके फ़िल्टर','Reset':'रीसेट','Search':'खोजें','Sector':'क्षेत्र','Region':'इलाका',
      'Any':'कोई भी','Max hours':'अधिकतम घंटे','Minimum salary':'न्यूनतम वेतन',
      'Decisions':'निर्णय','All decisions':'सभी निर्णय','My shortlist':'मेरी चयनित सूची','Excluded':'हटाए गए',
      'Skilled Worker visa sponsorship':'Skilled Worker वीज़ा प्रायोजन','All programmes':'सभी प्रोग्राम',
      'Specialist settings':'विशेषज्ञ क्षेत्र','Sort by':'क्रमबद्ध करें','Salary':'वेतन',
      'Effective hourly pay':'प्रभावी प्रति घंटा वेतन','Shortest week':'सबसे छोटा कार्य सप्ताह',
      'List':'सूची','Grid':'ग्रिड','About & support':'जानकारी और सहायता',
      'Find your foundation placement.':'अपनी फ़ाउंडेशन ट्रेनिंग प्लेसमेंट खोजें।',
      'Explore all programme locations across England & Wales':'इंग्लैंड और वेल्स में सभी प्रोग्राम के स्थान देखें',
      'Map style':'मानचित्र शैली','Fit results':'परिणामों के अनुसार मानचित्र दिखाएँ','Hide filters':'फ़िल्टर छिपाएँ',
      'Best fit':'सबसे अच्छा मेल','Highest salary':'सबसे अधिक वेतन','Export decisions':'निर्णय एक्सपोर्ट करें',
      'Backup':'बैकअप','Restore backup':'बैकअप पुनर्स्थापित करें','No results found':'कोई परिणाम नहीं मिला'
    },
    gu: {
      'Language':'ભાષા','Explore':'શોધો','For You':'તમારા માટે','Shortlist':'પસંદગીની યાદી',
      'Learning Hub':'શીખવાનું કેન્દ્ર','My Outcome':'મારું પરિણામ','Compare':'સરખામણી કરો','Preferences':'પસંદગીઓ',
      'Your filters':'તમારા ફિલ્ટર્સ','Reset':'રીસેટ','Search':'શોધ','Sector':'ક્ષેત્ર','Region':'વિસ્તાર',
      'Any':'કોઈપણ','Max hours':'મહત્તમ કલાકો','Minimum salary':'લઘુત્તમ પગાર',
      'Decisions':'નિર્ણયો','All decisions':'બધા નિર્ણયો','My shortlist':'મારી પસંદગીની યાદી','Excluded':'બાકાત',
      'Skilled Worker visa sponsorship':'Skilled Worker વિઝા સ્પોન્સરશિપ','All programmes':'બધા કાર્યક્રમો',
      'Specialist settings':'વિશેષ ક્ષેત્રો','Sort by':'આ પ્રમાણે ગોઠવો','Salary':'પગાર',
      'Effective hourly pay':'અસરકારક કલાકદીઠ પગાર','Shortest week':'સૌથી ટૂંકું કાર્ય અઠવાડિયું',
      'List':'યાદી','Grid':'ગ્રીડ','About & support':'વિશે અને સહાય',
      'Find your foundation placement.':'તમારી ફાઉન્ડેશન તાલીમની જગ્યા શોધો.',
      'Explore all programme locations across England & Wales':'ઇંગ્લેન્ડ અને વેલ્સમાં તમામ કાર્યક્રમોના સ્થળો જુઓ',
      'Map style':'નકશાની શૈલી','Fit results':'પરિણામો પ્રમાણે નકશો ગોઠવો','Hide filters':'ફિલ્ટર્સ છુપાવો',
      'Best fit':'શ્રેષ્ઠ મેળ','Highest salary':'સૌથી વધુ પગાર','Export decisions':'નિર્ણયો નિકાસ કરો',
      'Backup':'બેકઅપ','Restore backup':'બેકઅપ પુનઃસ્થાપિત કરો','No results found':'કોઈ પરિણામ મળ્યું નથી'
    },
    ta: {
      'Language':'மொழி','Explore':'ஆராய்க','For You':'உங்களுக்காக','Shortlist':'தேர்வுப் பட்டியல்',
      'Learning Hub':'கற்றல் மையம்','My Outcome':'எனது முடிவு','Compare':'ஒப்பிடுக','Preferences':'விருப்பத்தேர்வுகள்',
      'Your filters':'உங்கள் வடிப்பான்கள்','Reset':'மீட்டமை','Search':'தேடுக','Sector':'துறை','Region':'பகுதி',
      'Any':'எதுவும்','Max hours':'அதிகபட்ச மணிநேரம்','Minimum salary':'குறைந்தபட்ச சம்பளம்',
      'Decisions':'முடிவுகள்','All decisions':'அனைத்து முடிவுகள்','My shortlist':'எனது தேர்வுப் பட்டியல்','Excluded':'நீக்கப்பட்டவை',
      'Skilled Worker visa sponsorship':'Skilled Worker விசா ஆதரவு','All programmes':'அனைத்து திட்டங்கள்',
      'Specialist settings':'சிறப்பு துறைகள்','Sort by':'வரிசைப்படுத்து','Salary':'சம்பளம்',
      'Effective hourly pay':'செயல்திறன் அடிப்படையிலான மணிநேர ஊதியம்','Shortest week':'குறைந்த வேலை நேர வாரம்',
      'List':'பட்டியல்','Grid':'கட்டம்','About & support':'தகவல் மற்றும் உதவி',
      'Find your foundation placement.':'உங்கள் அடிப்படைப் பயிற்சி இடத்தைக் கண்டறியுங்கள்.',
      'Explore all programme locations across England & Wales':'இங்கிலாந்து மற்றும் வேல்ஸில் உள்ள அனைத்து திட்ட இடங்களையும் காண்க',
      'Map style':'வரைபடத் தோற்றம்','Fit results':'முடிவுகளுக்கேற்ப வரைபடத்தை அமை','Hide filters':'வடிப்பான்களை மறை',
      'Best fit':'சிறந்த பொருத்தம்','Highest salary':'அதிக சம்பளம்','Export decisions':'முடிவுகளை ஏற்றுமதி செய்',
      'Backup':'காப்புப்பிரதி','Restore backup':'காப்புப்பிரதியை மீட்டமை','No results found':'முடிவுகள் எதுவும் இல்லை'
    },
    pl: {
      'Language':'Język','Explore':'Odkrywaj','For You':'Dla Ciebie','Shortlist':'Lista wybranych',
      'Learning Hub':'Centrum wiedzy','My Outcome':'Mój wynik','Compare':'Porównaj','Preferences':'Preferencje',
      'Your filters':'Twoje filtry','Reset':'Resetuj','Search':'Szukaj','Sector':'Sektor','Region':'Region',
      'Any':'Dowolny','Max hours':'Maks. liczba godzin','Minimum salary':'Minimalne wynagrodzenie',
      'Decisions':'Decyzje','All decisions':'Wszystkie decyzje','My shortlist':'Moja lista','Excluded':'Wykluczone',
      'Skilled Worker visa sponsorship':'Sponsorowanie wizy Skilled Worker','All programmes':'Wszystkie programy',
      'Specialist settings':'Placówki specjalistyczne','Sort by':'Sortuj według','Salary':'Wynagrodzenie',
      'Effective hourly pay':'Efektywna stawka godzinowa','Shortest week':'Najkrótszy tydzień pracy',
      'List':'Lista','Grid':'Siatka','About & support':'O projekcie i pomoc',
      'Find your foundation placement.':'Znajdź miejsce stażu foundation.',
      'Explore all programme locations across England & Wales':'Przeglądaj lokalizacje wszystkich programów w Anglii i Walii',
      'Map style':'Styl mapy','Fit results':'Dopasuj widok do wyników','Hide filters':'Ukryj filtry',
      'Best fit':'Najlepsze dopasowanie','Highest salary':'Najwyższe wynagrodzenie','Export decisions':'Eksportuj decyzje',
      'Backup':'Kopia zapasowa','Restore backup':'Przywróć kopię zapasową','No results found':'Nie znaleziono wyników'
    },
    ro: {
      'Language':'Limbă','Explore':'Explorează','For You':'Pentru tine','Shortlist':'Lista scurtă',
      'Learning Hub':'Centrul de învățare','My Outcome':'Rezultatul meu','Compare':'Compară','Preferences':'Preferințe',
      'Your filters':'Filtrele tale','Reset':'Resetează','Search':'Caută','Sector':'Sector','Region':'Regiune',
      'Any':'Oricare','Max hours':'Număr maxim de ore','Minimum salary':'Salariu minim',
      'Decisions':'Decizii','All decisions':'Toate deciziile','My shortlist':'Lista mea scurtă','Excluded':'Excluse',
      'Skilled Worker visa sponsorship':'Sponsorizare pentru viza Skilled Worker','All programmes':'Toate programele',
      'Specialist settings':'Domenii specializate','Sort by':'Sortează după','Salary':'Salariu',
      'Effective hourly pay':'Plată efectivă pe oră','Shortest week':'Cea mai scurtă săptămână',
      'List':'Listă','Grid':'Grilă','About & support':'Despre și asistență',
      'Find your foundation placement.':'Găsește-ți locul de pregătire profesională.',
      'Explore all programme locations across England & Wales':'Explorează locațiile tuturor programelor din Anglia și Țara Galilor',
      'Map style':'Stilul hărții','Fit results':'Încadrează rezultatele pe hartă','Hide filters':'Ascunde filtrele',
      'Best fit':'Cea mai bună potrivire','Highest salary':'Cel mai mare salariu','Export decisions':'Exportă deciziile',
      'Backup':'Copie de rezervă','Restore backup':'Restabilește copia de rezervă','No results found':'Nu au fost găsite rezultate'
    },
    es: {
      'Language':'Idioma','Explore':'Explorar','For You':'Para ti','Shortlist':'Lista de favoritos',
      'Learning Hub':'Centro de aprendizaje','My Outcome':'Mi resultado','Compare':'Comparar','Preferences':'Preferencias',
      'Your filters':'Tus filtros','Reset':'Restablecer','Search':'Buscar','Sector':'Sector','Region':'Región',
      'Any':'Cualquiera','Max hours':'Horas máximas','Minimum salary':'Salario mínimo',
      'Decisions':'Decisiones','All decisions':'Todas las decisiones','My shortlist':'Mi lista','Excluded':'Excluidos',
      'Skilled Worker visa sponsorship':'Patrocinio de visado Skilled Worker','All programmes':'Todos los programas',
      'Specialist settings':'Ámbitos especializados','Sort by':'Ordenar por','Salary':'Salario',
      'Effective hourly pay':'Salario efectivo por hora','Shortest week':'Semana laboral más corta',
      'List':'Lista','Grid':'Cuadrícula','About & support':'Información y ayuda',
      'Find your foundation placement.':'Encuentra tu plaza de formación.',
      'Explore all programme locations across England & Wales':'Explora las ubicaciones de todos los programas en Inglaterra y Gales',
      'Map style':'Estilo del mapa','Fit results':'Ajustar el mapa a los resultados','Hide filters':'Ocultar filtros',
      'Best fit':'Mejor coincidencia','Highest salary':'Salario más alto','Export decisions':'Exportar decisiones',
      'Backup':'Copia de seguridad','Restore backup':'Restaurar copia de seguridad','No results found':'No se encontraron resultados'
    },
    fr: {
      'Language':'Langue','Explore':'Explorer','For You':'Pour vous','Shortlist':'Liste restreinte',
      'Learning Hub':'Centre de ressources','My Outcome':'Mon résultat','Compare':'Comparer','Preferences':'Préférences',
      'Your filters':'Vos filtres','Reset':'Réinitialiser','Search':'Rechercher','Sector':'Secteur','Region':'Région',
      'Any':'Tous','Max hours':'Nombre d’heures maximum','Minimum salary':'Salaire minimum',
      'Decisions':'Décisions','All decisions':'Toutes les décisions','My shortlist':'Ma liste','Excluded':'Exclus',
      'Skilled Worker visa sponsorship':'Parrainage du visa Skilled Worker','All programmes':'Tous les programmes',
      'Specialist settings':'Domaines spécialisés','Sort by':'Trier par','Salary':'Salaire',
      'Effective hourly pay':'Rémunération horaire effective','Shortest week':'Semaine la plus courte',
      'List':'Liste','Grid':'Grille','About & support':'À propos et assistance',
      'Find your foundation placement.':'Trouvez votre poste de formation.',
      'Explore all programme locations across England & Wales':'Explorez les lieux de tous les programmes en Angleterre et au pays de Galles',
      'Map style':'Style de carte','Fit results':'Ajuster la carte aux résultats','Hide filters':'Masquer les filtres',
      'Best fit':'Meilleure correspondance','Highest salary':'Salaire le plus élevé','Export decisions':'Exporter les décisions',
      'Backup':'Sauvegarde','Restore backup':'Restaurer la sauvegarde','No results found':'Aucun résultat trouvé'
    },
    pt: {
      'Language':'Idioma','Explore':'Explorar','For You':'Para si','Shortlist':'Lista de opções',
      'Learning Hub':'Centro de aprendizagem','My Outcome':'O meu resultado','Compare':'Comparar','Preferences':'Preferências',
      'Your filters':'Os seus filtros','Reset':'Repor','Search':'Pesquisar','Sector':'Setor','Region':'Região',
      'Any':'Qualquer','Max hours':'Máximo de horas','Minimum salary':'Salário mínimo',
      'Decisions':'Decisões','All decisions':'Todas as decisões','My shortlist':'A minha lista','Excluded':'Excluídos',
      'Skilled Worker visa sponsorship':'Patrocínio do visto Skilled Worker','All programmes':'Todos os programas',
      'Specialist settings':'Áreas especializadas','Sort by':'Ordenar por','Salary':'Salário',
      'Effective hourly pay':'Remuneração efetiva por hora','Shortest week':'Semana mais curta',
      'List':'Lista','Grid':'Grelha','About & support':'Sobre e apoio',
      'Find your foundation placement.':'Encontre a sua vaga de formação.',
      'Explore all programme locations across England & Wales':'Explore as localizações de todos os programas em Inglaterra e no País de Gales',
      'Map style':'Estilo do mapa','Fit results':'Enquadrar resultados no mapa','Hide filters':'Ocultar filtros',
      'Best fit':'Melhor correspondência','Highest salary':'Salário mais elevado','Export decisions':'Exportar decisões',
      'Backup':'Cópia de segurança','Restore backup':'Restaurar cópia de segurança','No results found':'Não foram encontrados resultados'
    }
  };

  const PROTECTED_SELECTOR = [
    '#results', '#reco', '#shortlistList', '#compareArea', '#placementMap', '#mapSelection',
    '.placement', '.rank-row', '.recoGrid', '.leaflet-container',
    '.leaflet-popup', '.programme-preview', '.atlasWorkspaceTitleOriginal',
    '.atlasWorkspaceTitleConcise', '[data-atlas-no-translate]',
    '[contenteditable="true"]'
  ].join(',');

  const TEXT_SKIP = new Set(['SCRIPT','STYLE','NOSCRIPT','TEXTAREA','INPUT','SVG','PATH']);
  const originalText = new WeakMap();
  const lastText = new WeakMap();
  const originalAttributes = new WeakMap();
  const lastAttributes = new WeakMap();
  let activeLanguage = 'en';
  let observer = null;

  const isProtected = element => !!element?.closest?.(PROTECTED_SELECTOR);
  const dictionary = () => DICTIONARIES[activeLanguage] || {};
  const preserveWhitespace = (source, translated) => {
    const leading = source.match(/^\s*/)?.[0] || '';
    const trailing = source.match(/\s*$/)?.[0] || '';
    const core = translated.trim();
    return leading + core + trailing;
  };

  function translateTextNode(node) {
    const parent = node.parentElement;
    if (!parent || TEXT_SKIP.has(parent.tagName) || isProtected(parent)) return;
    const current = node.nodeValue || '';
    let source = originalText.get(node);
    const last = lastText.get(node);
    if (source === undefined || (last !== undefined && current !== last)) {
      source = current;
      originalText.set(node, source);
    }
    const key = source.trim();
    if (!key) return;
    const translated = activeLanguage === 'en' ? source : (dictionary()[key] ? preserveWhitespace(source, dictionary()[key]) : source);
    if (node.nodeValue !== translated) node.nodeValue = translated;
    lastText.set(node, translated);
  }

  function translateAttributes(element) {
    if (!element || isProtected(element) || ['SCRIPT','STYLE','OPTION'].includes(element.tagName)) return;
    for (const name of ['placeholder','aria-label','title']) {
      if (!element.hasAttribute(name)) continue;
      let saved = originalAttributes.get(element);
      if (!saved) { saved = {}; originalAttributes.set(element, saved); }
      let rendered = lastAttributes.get(element);
      if (!rendered) { rendered = {}; lastAttributes.set(element, rendered); }
      const current = element.getAttribute(name);
      if (saved[name] === undefined || (rendered[name] !== undefined && current !== rendered[name])) saved[name] = current;
      const source = saved[name];
      const translated = activeLanguage === 'en' ? source : (dictionary()[source] || source);
      if (current !== translated) element.setAttribute(name, translated);
      rendered[name] = translated;
    }
  }

  function walk(node) {
    if (!node) return;
    if (node.nodeType === Node.TEXT_NODE) {
      translateTextNode(node);
      return;
    }
    if (node.nodeType !== Node.ELEMENT_NODE && node !== document.body) return;
    if (node.nodeType === Node.ELEMENT_NODE) {
      if (isProtected(node)) return;
      translateAttributes(node);
    }
    for (const child of Array.from(node.childNodes || [])) walk(child);
  }

  function applyLanguage(language) {
    activeLanguage = LANGUAGES.some(([code]) => code === language) ? language : 'en';
    const rtl = activeLanguage === 'ar' || activeLanguage === 'ur';
    document.documentElement.lang = activeLanguage;
    document.documentElement.dir = rtl ? 'rtl' : 'ltr';
    document.documentElement.dataset.atlasLanguage = activeLanguage;
    walk(document.body);
    document.dispatchEvent(new CustomEvent('placementatlas:languagechange', { detail: { language: activeLanguage, direction: rtl ? 'rtl' : 'ltr' } }));
  }

  function mountSelector() {
    const header = document.querySelector('.shell > header.top');
    const nav = header?.querySelector('nav.tabs');
    if (!header || !nav || document.getElementById('atlasLanguagePicker')) return;
    const label = document.createElement('label');
    label.className = 'atlasLanguagePicker';
    label.id = 'atlasLanguagePicker';
    
    label.innerHTML = '<span>Language</span><select id="atlasLanguageSelect" aria-label="Choose interface language"></select>';
    const select = label.querySelector('select');
    for (const [code, name] of LANGUAGES) {
      const option = document.createElement('option');
      option.value = code;
      option.textContent = name;
      select.append(option);
    }
    let saved = 'en';
    try { saved = localStorage.getItem('placement-atlas-language-v1') || 'en'; } catch {}
    if (!LANGUAGES.some(([code]) => code === saved)) saved = 'en';
    select.value = saved;
    select.addEventListener('change', () => {
      const language = select.value;
      try { localStorage.setItem('placement-atlas-language-v1', language); } catch {}
      applyLanguage(language);
    });
    header.append(label);
    return select;
  }

  function init() {
    const select = mountSelector();
    let saved = 'en';
    try { saved = localStorage.getItem('placement-atlas-language-v1') || 'en'; } catch {}
    if (select) select.value = LANGUAGES.some(([code]) => code === saved) ? saved : 'en';
    applyLanguage(saved);
    if (observer) observer.disconnect();
    observer = new MutationObserver(records => {
      for (const record of records) {
        for (const node of record.addedNodes) walk(node);
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    document.addEventListener('desk:after-navigation', () => walk(document.body));
    document.addEventListener('desk:dataset', () => walk(document.body));
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();