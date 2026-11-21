/* Placement Atlas multilingual interface · Phase 1
   Static, privacy-friendly UI translations. Programme and employer data is intentionally excluded.
   Extend the dictionaries here as new interface copy is added. */
(() => {
  'use strict';

  // English is the default and remains the source of truth for official labels.
  // Flags indicate a familiar locale, not the only country using a language.
  const LANGUAGES = [
    ['en', '🇬🇧 English'],
    ['el', '🇬🇷 Ελληνικά'],
    ['fr', '🇫🇷 Français'],
    ['es', '🇪🇸 Español'],
    ['it', '🇮🇹 Italiano'],
    ['nl', '🇳🇱 Nederlands'],
    ['de', '🇩🇪 Deutsch'],
    ['zh-CN', '🇨🇳 中文（简体）'],
    ['yue-HK', '🇭🇰 粵語'],
    ['ja', '🇯🇵 日本語'],
    ['ko', '🇰🇷 한국어'],
    ['hi', '🇮🇳 हिन्दी'],
    ['ar', '🇸🇦 العربية'],
    ['ur', '🇵🇰 اردو'],
    ['zh-TW', '🇹🇼 中文（繁體）'],
    ['pa', '🇮🇳 ਪੰਜਾਬੀ'],
    ['bn', '🇧🇩 বাংলা'],
    ['gu', '🇮🇳 ગુજરાતી'],
    ['ta', '🇮🇳 தமிழ்'],
    ['pl', '🇵🇱 Polski'],
    ['ro', '🇷🇴 Română'],
    ['pt', '🇵🇹 Português'],
    ['fa', '🇮🇷 فارسی'],
    ['tr', '🇹🇷 Türkçe'],
    ['ps', '🇦🇫 پښتو'],
    ['ckb', '🇮🇶 سۆرانی'],
    ['so', '🇸🇴 Soomaali'],
    ['uk', '🇺🇦 Українська']
  ];

  const DICTIONARIES = {
    'yue-HK': {},
    ja: {},
    ko: {},
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

  // These language packs cover the high-frequency interface. Unknown strings
  // safely fall back to the original English; never invent translated data.
  Object.assign(DICTIONARIES, {
    el: {
      'Language':'Γλώσσα','Explore':'Εξερεύνηση','For You':'Για εσένα','Shortlist':'Λίστα επιλογών',
      'Learning Hub':'Κέντρο μάθησης','My Outcome':'Το αποτέλεσμά μου','Compare':'Σύγκριση','Preferences':'Προτιμήσεις',
      'Your filters':'Τα φίλτρα σου','Reset':'Επαναφορά','Search':'Αναζήτηση','Sector':'Τομέας','Region':'Περιοχή',
      'Any':'Οποιοδήποτε','Max hours':'Μέγιστες ώρες','Minimum salary':'Ελάχιστος μισθός',
      'Decisions':'Αποφάσεις','All decisions':'Όλες οι αποφάσεις','My shortlist':'Η λίστα μου','Excluded':'Εξαιρούμενα',
      'Skilled Worker visa sponsorship':'Χορηγία βίζας Skilled Worker','All programmes':'Όλα τα προγράμματα',
      'Specialist settings':'Εξειδικευμένοι χώροι','Sort by':'Ταξινόμηση κατά','Salary':'Μισθός',
      'Effective hourly pay':'Πραγματική ωριαία αμοιβή','Shortest week':'Λιγότερες ώρες την εβδομάδα',
      'List':'Λίστα','Grid':'Πλέγμα','About & support':'Σχετικά και υποστήριξη',
      'Find your foundation placement.':'Βρες τη θέση πρακτικής εκπαίδευσης που σου ταιριάζει.',
      'Explore all programme locations across England & Wales':'Εξερεύνησε τις τοποθεσίες των προγραμμάτων σε Αγγλία και Ουαλία',
      'Map style':'Στυλ χάρτη','Fit results':'Εστίαση στα αποτελέσματα','Hide filters':'Απόκρυψη φίλτρων',
      'Best fit':'Καλύτερη αντιστοίχιση','Highest salary':'Υψηλότερος μισθός',
      'Export decisions':'Εξαγωγή αποφάσεων','Backup':'Αντίγραφο ασφαλείας',
      'Restore backup':'Επαναφορά αντιγράφου','No results found':'Δεν βρέθηκαν αποτελέσματα'
    },
    it: {
      'Language':'Lingua','Explore':'Esplora','For You':'Per te','Shortlist':'Lista di preferiti',
      'Learning Hub':'Centro di apprendimento','My Outcome':'Il mio risultato','Compare':'Confronta','Preferences':'Preferenze',
      'Your filters':'I tuoi filtri','Reset':'Reimposta','Search':'Cerca','Sector':'Settore','Region':'Regione',
      'Any':'Qualsiasi','Max hours':'Ore massime','Minimum salary':'Stipendio minimo','Decisions':'Decisioni',
      'All decisions':'Tutte le decisioni','My shortlist':'La mia lista','Excluded':'Esclusi',
      'Skilled Worker visa sponsorship':'Sponsorizzazione del visto Skilled Worker',
      'All programmes':'Tutti i programmi','Specialist settings':'Settori specialistici',
      'Sort by':'Ordina per','Salary':'Stipendio','Effective hourly pay':'Paga oraria effettiva',
      'Shortest week':'Settimana più breve','List':'Elenco','Grid':'Griglia',
      'About & support':'Informazioni e assistenza','Find your foundation placement.':'Trova il tuo posto di formazione.',
      'Explore all programme locations across England & Wales':'Esplora le sedi dei programmi in Inghilterra e Galles',
      'Map style':'Stile mappa','Fit results':'Inquadra i risultati','Hide filters':'Nascondi filtri',
      'Best fit':'Migliore corrispondenza','Highest salary':'Stipendio più alto',
      'Export decisions':'Esporta decisioni','Backup':'Backup','Restore backup':'Ripristina backup',
      'No results found':'Nessun risultato trovato'
    },
    de: {
      'Language':'Sprache','Explore':'Entdecken','For You':'Für dich','Shortlist':'Merkliste',
      'Learning Hub':'Lernzentrum','My Outcome':'Mein Ergebnis','Compare':'Vergleichen','Preferences':'Einstellungen',
      'Your filters':'Deine Filter','Reset':'Zurücksetzen','Search':'Suchen','Sector':'Sektor','Region':'Region',
      'Any':'Alle','Max hours':'Maximale Stunden','Minimum salary':'Mindestgehalt','Decisions':'Entscheidungen',
      'All decisions':'Alle Entscheidungen','My shortlist':'Meine Merkliste','Excluded':'Ausgeschlossen',
      'Skilled Worker visa sponsorship':'Sponsoring für das Skilled Worker-Visum',
      'All programmes':'Alle Programme','Specialist settings':'Spezialisierte Einrichtungen',
      'Sort by':'Sortieren nach','Salary':'Gehalt','Effective hourly pay':'Effektiver Stundenlohn',
      'Shortest week':'Kürzeste Arbeitswoche','List':'Liste','Grid':'Raster',
      'About & support':'Über uns und Hilfe','Find your foundation placement.':'Finde deinen passenden Ausbildungsplatz.',
      'Explore all programme locations across England & Wales':'Entdecke alle Programmstandorte in England und Wales',
      'Map style':'Kartenstil','Fit results':'Ergebnisse auf Karte anzeigen','Hide filters':'Filter ausblenden',
      'Best fit':'Beste Übereinstimmung','Highest salary':'Höchstes Gehalt',
      'Export decisions':'Entscheidungen exportieren','Backup':'Sicherung','Restore backup':'Sicherung wiederherstellen',
      'No results found':'Keine Ergebnisse gefunden'
    },
    nl: {
      'Language':'Taal','Explore':'Verkennen','For You':'Voor jou','Shortlist':'Favorietenlijst',
      'Learning Hub':'Leercentrum','My Outcome':'Mijn resultaat','Compare':'Vergelijken','Preferences':'Voorkeuren',
      'Your filters':'Je filters','Reset':'Resetten','Search':'Zoeken','Sector':'Sector','Region':'Regio',
      'Any':'Alle','Max hours':'Maximaal aantal uren','Minimum salary':'Minimumsalaris','Decisions':'Keuzes',
      'All decisions':'Alle keuzes','My shortlist':'Mijn favorieten','Excluded':'Uitgesloten',
      'Skilled Worker visa sponsorship':'Sponsoring voor een Skilled Worker-visum',
      'All programmes':'Alle programma’s','Specialist settings':'Gespecialiseerde instellingen',
      'Sort by':'Sorteren op','Salary':'Salaris','Effective hourly pay':'Effectief uurloon',
      'Shortest week':'Kortste werkweek','List':'Lijst','Grid':'Raster',
      'About & support':'Over en ondersteuning','Find your foundation placement.':'Vind je opleidingsplek.',
      'Explore all programme locations across England & Wales':'Bekijk alle programmalocaties in Engeland en Wales',
      'Map style':'Kaartstijl','Fit results':'Resultaten in beeld','Hide filters':'Filters verbergen',
      'Best fit':'Beste match','Highest salary':'Hoogste salaris','Export decisions':'Keuzes exporteren',
      'Backup':'Back-up','Restore backup':'Back-up herstellen','No results found':'Geen resultaten gevonden'
    },
    fa: {
      'Language':'زبان','Explore':'کاوش','For You':'برای شما','Shortlist':'فهرست منتخب',
      'Learning Hub':'مرکز یادگیری','My Outcome':'نتیجه من','Compare':'مقایسه','Preferences':'ترجیحات',
      'Your filters':'فیلترهای شما','Reset':'بازنشانی','Search':'جستجو','Sector':'بخش','Region':'منطقه',
      'Any':'همه','Max hours':'حداکثر ساعت','Minimum salary':'حداقل حقوق','Decisions':'تصمیم‌ها',
      'All decisions':'همه تصمیم‌ها','My shortlist':'فهرست منتخب من','Excluded':'حذف‌شده',
      'Skilled Worker visa sponsorship':'حمایت مالی ویزای Skilled Worker',
      'All programmes':'همه برنامه‌ها','Specialist settings':'بخش‌های تخصصی','Sort by':'مرتب‌سازی بر اساس',
      'Salary':'حقوق','Effective hourly pay':'دستمزد ساعتی مؤثر','Shortest week':'کوتاه‌ترین هفته کاری',
      'List':'فهرست','Grid':'شبکه','About & support':'درباره و پشتیبانی',
      'Find your foundation placement.':'محل آموزش پایه مناسب خود را پیدا کنید.',
      'Explore all programme locations across England & Wales':'مکان همه برنامه‌ها در انگلستان و ولز را ببینید',
      'Map style':'سبک نقشه','Fit results':'نمایش نتایج روی نقشه','Hide filters':'پنهان کردن فیلترها',
      'Best fit':'بهترین تطابق','Highest salary':'بالاترین حقوق','Export decisions':'خروجی گرفتن از تصمیم‌ها',
      'Backup':'پشتیبان‌گیری','Restore backup':'بازیابی پشتیبان','No results found':'نتیجه‌ای پیدا نشد'
    },
    tr: {
      'Language':'Dil','Explore':'Keşfet','For You':'Sizin için','Shortlist':'Kısa liste',
      'Learning Hub':'Öğrenme merkezi','My Outcome':'Sonucum','Compare':'Karşılaştır','Preferences':'Tercihler',
      'Your filters':'Filtreleriniz','Reset':'Sıfırla','Search':'Ara','Sector':'Sektör','Region':'Bölge',
      'Any':'Tümü','Max hours':'Azami saat','Minimum salary':'Asgari maaş','Decisions':'Kararlar',
      'All decisions':'Tüm kararlar','My shortlist':'Kısa listem','Excluded':'Hariç tutulanlar',
      'Skilled Worker visa sponsorship':'Skilled Worker vizesi sponsorluğu','All programmes':'Tüm programlar',
      'Specialist settings':'Uzmanlık alanları','Sort by':'Sırala','Salary':'Maaş',
      'Effective hourly pay':'Efektif saatlik ücret','Shortest week':'En kısa çalışma haftası',
      'List':'Liste','Grid':'Izgara','About & support':'Hakkında ve destek',
      'Find your foundation placement.':'Temel eğitim yerinizi bulun.',
      'Explore all programme locations across England & Wales':'İngiltere ve Galler’deki tüm program konumlarını keşfedin',
      'Map style':'Harita stili','Fit results':'Sonuçlara odaklan','Hide filters':'Filtreleri gizle',
      'Best fit':'En iyi eşleşme','Highest salary':'En yüksek maaş','Export decisions':'Kararları dışa aktar',
      'Backup':'Yedekle','Restore backup':'Yedeği geri yükle','No results found':'Sonuç bulunamadı'
    },
    ps: {
      'Language':'ژبه','Explore':'وپلټئ','For You':'ستاسو لپاره','Shortlist':'لنډ لېست',
      'Learning Hub':'د زده‌کړې مرکز','My Outcome':'زما پایله','Compare':'پرتله','Preferences':'غوره‌توبونه',
      'Your filters':'ستاسو چاڼګرونه','Reset':'بیا تنظیم','Search':'لټون','Sector':'څانګه','Region':'سیمه',
      'Any':'هر یو','Max hours':'تر ټولو ډېر ساعتونه','Minimum salary':'لږترلږه معاش',
      'Decisions':'پرېکړې','All decisions':'ټولې پرېکړې','My shortlist':'زما لنډ لېست','Excluded':'ایستل شوي',
      'Skilled Worker visa sponsorship':'د Skilled Worker ویزې سپانسرشيپ',
      'All programmes':'ټول پروګرامونه','Specialist settings':'ځانګړي څانګې','Sort by':'ترتیب',
      'Salary':'معاش','Effective hourly pay':'اغېزمن ساعتي معاش','Shortest week':'تر ټولو لنډه کاري اونۍ',
      'List':'لېست','Grid':'شبکه','About & support':'په اړه او مرسته',
      'Find your foundation placement.':'د خپلې بنسټیزې روزنې ځای ومومئ.',
      'Explore all programme locations across England & Wales':'په انګلستان او وېلز کې د پروګرامونو ځایونه وګورئ',
      'Map style':'د نقشې بڼه','Fit results':'پایلې په نقشه کې ښکاره کړئ','Hide filters':'چاڼګرونه پټ کړئ',
      'Best fit':'غوره برابرون','Highest salary':'تر ټولو لوړ معاش','Export decisions':'پرېکړې صادرې کړئ',
      'Backup':'شاتړ','Restore backup':'شاتړ بېرته راولئ','No results found':'پایلې ونه موندل شوې'
    },
    ckb: {
      'Language':'زمان','Explore':'گەڕان','For You':'بۆ تۆ','Shortlist':'لیستی کورتکراوە',
      'Learning Hub':'ناوەندی فێربوون','My Outcome':'ئەنجامی من','Compare':'بەراورد','Preferences':'هەڵبژاردەکان',
      'Your filters':'فلتەرەکانت','Reset':'ڕێکخستنەوە','Search':'گەڕان','Sector':'بوار','Region':'ناوچە',
      'Any':'هەرکام','Max hours':'زۆرترین کاتژمێر','Minimum salary':'کەمترین مووچە',
      'Decisions':'بڕیارەکان','All decisions':'هەموو بڕیارەکان','My shortlist':'لیستی من','Excluded':'لابراو',
      'Skilled Worker visa sponsorship':'سپۆنسەری ڤیزای Skilled Worker',
      'All programmes':'هەموو بەرنامەکان','Specialist settings':'بوارە تایبەتەکان',
      'Sort by':'ڕیزکردن بەپێی','Salary':'مووچە','Effective hourly pay':'مووچەی کاریگەر بۆ هەر کاتژمێر',
      'Shortest week':'کورتترین هەفتەی کار','List':'لیست','Grid':'تۆڕ','About & support':'دەربارە و پشتگیری',
      'Find your foundation placement.':'شوێنی ڕاهێنانی بنەڕەتی خۆت بدۆزەوە.',
      'Explore all programme locations across England & Wales':'شوێنی هەموو بەرنامەکان لە ئینگلتەرا و وێڵز ببینە',
      'Map style':'شێوازی نەخشە','Fit results':'نیشاندانی ئەنجامەکان لەسەر نەخشە',
      'Hide filters':'شاردنەوەی فلتەرەکان','Best fit':'باشترین گونجان','Highest salary':'بەرزترین مووچە',
      'Export decisions':'هەناردەکردنی بڕیارەکان','Backup':'پاڵپشت','Restore backup':'گەڕاندنەوەی پاڵپشت',
      'No results found':'هیچ ئەنجامێک نەدۆزرایەوە'
    },
    so: {
      'Language':'Luqad','Explore':'Sahami','For You':'Adiga kuu gaar ah','Shortlist':'Liiska xulashada',
      'Learning Hub':'Xarunta waxbarashada','My Outcome':'Natiijadayda','Compare':'Isbarbardhig','Preferences':'Doorbidyada',
      'Your filters':'Shaandhooyinkaaga','Reset':'Dib u deji','Search':'Raadi','Sector':'Qaybta','Region':'Gobolka',
      'Any':'Dhammaan','Max hours':'Saacadaha ugu badan','Minimum salary':'Mushaharka ugu yar',
      'Decisions':'Go’aannada','All decisions':'Dhammaan go’aannada','My shortlist':'Liiskayga','Excluded':'Laga reebay',
      'Skilled Worker visa sponsorship':'Taageerada fiisaha Skilled Worker',
      'All programmes':'Dhammaan barnaamijyada','Specialist settings':'Goobaha takhasuska',
      'Sort by':'U kala saar','Salary':'Mushahar','Effective hourly pay':'Mushaharka saacaddii',
      'Shortest week':'Toddobaadka shaqo ee ugu gaaban','List':'Liis','Grid':'Shabag',
      'About & support':'Ku saabsan iyo caawimo','Find your foundation placement.':'Hel goobta tababarkaaga aasaasiga ah.',
      'Explore all programme locations across England & Wales':'Eeg goobaha barnaamijyada England iyo Wales',
      'Map style':'Qaabka khariidadda','Fit results':'Muujinta natiijooyinka khariidadda',
      'Hide filters':'Qari shaandhooyinka','Best fit':'Ugu habboon','Highest salary':'Mushaharka ugu sarreeya',
      'Export decisions':'Dhoofinta go’aannada','Backup':'Kayd','Restore backup':'Soo celi kaydka',
      'No results found':'Wax natiijo ah lama helin'
    },
    uk: {
      'Language':'Мова','Explore':'Огляд','For You':'Для вас','Shortlist':'Короткий список',
      'Learning Hub':'Навчальний центр','My Outcome':'Мій результат','Compare':'Порівняти','Preferences':'Налаштування',
      'Your filters':'Ваші фільтри','Reset':'Скинути','Search':'Пошук','Sector':'Сектор','Region':'Регіон',
      'Any':'Будь-який','Max hours':'Максимум годин','Minimum salary':'Мінімальна зарплата',
      'Decisions':'Рішення','All decisions':'Усі рішення','My shortlist':'Мій список','Excluded':'Виключені',
      'Skilled Worker visa sponsorship':'Спонсорство візи Skilled Worker',
      'All programmes':'Усі програми','Specialist settings':'Спеціалізовані заклади',
      'Sort by':'Сортувати за','Salary':'Зарплата','Effective hourly pay':'Фактична оплата за годину',
      'Shortest week':'Найкоротший робочий тиждень','List':'Список','Grid':'Сітка',
      'About & support':'Про нас і підтримка','Find your foundation placement.':'Знайдіть місце для базової підготовки.',
      'Explore all programme locations across England & Wales':'Перегляньте розташування всіх програм в Англії та Уельсі',
      'Map style':'Стиль карти','Fit results':'Показати результати на карті',
      'Hide filters':'Приховати фільтри','Best fit':'Найкраща відповідність',
      'Highest salary':'Найвища зарплата','Export decisions':'Експортувати рішення',
      'Backup':'Резервна копія','Restore backup':'Відновити копію',
      'No results found':'Результатів не знайдено'
    }
  });

  // Human-reviewed Greek interface copy. Raw programme names, employers and official
  // training data remain in their original language.
  Object.assign(DICTIONARIES.el,   {
    "Explore": "Εξερεύνηση",
    "For You": "Για εσένα",
    "For you": "Για εσένα",
    "Shortlist": "Λίστα επιλογών",
    "My shortlist": "Η λίστα επιλογών μου",
    "My shortlist (0)": "Η λίστα μου (0)",
    "Shortlisted": "Στη λίστα",
    "Shortlist & rankings": "Λίστα και κατάταξη",
    "Oriel Simulation": "Προσομοίωση Oriel",
    "Swipe Mode": "Σάρωση",
    "Learning Hub": "Κέντρο μάθησης",
    "Preferences": "Προτιμήσεις",
    "Your priorities": "Οι προτεραιότητές σου",
    "Your filters": "Τα φίλτρα σου",
    "Training setting": "Τύπος εκπαίδευσης",
    "Region": "Περιοχή",
    "Area": "Περιοχή",
    "Any": "Χωρίς περιορισμό",
    "All regions": "Όλες οι περιοχές",
    "All programmes": "Όλα τα προγράμματα",
    "All programmes · no filters applied": "Όλα τα προγράμματα · χωρίς φίλτρα",
    "Maximum hours / week": "Μέγιστες ώρες/εβδομάδα",
    "Minimum annual salary": "Ελάχιστος ετήσιος μισθός",
    "Any split": "Κάθε μικτό πρόγραμμα",
    "Search": "Αναζήτηση",
    "Search within a distance": "Αναζήτηση σε ακτίνα",
    "More filters": "Περισσότερα φίλτρα",
    "Refine filters": "Ρύθμιση φίλτρων",
    "Filters": "Φίλτρα",
    "Show filters": "Εμφάνιση φίλτρων",
    "Hide filters": "Απόκρυψη φίλτρων",
    "Reset": "Επαναφορά",
    "History": "Ιστορικό",
    "Undo": "Αναίρεση",
    "Redo": "Επανάληψη",
    "Max hours": "Μέγιστες ώρες",
    "Minimum salary": "Ελάχιστος μισθός",
    "Community Pharmacy": "Κοινοτικό φαρμακείο",
    "General Practice": "Γενική ιατρική (GP)",
    "Hospital": "Νοσοκομείο",
    "Industry": "Βιομηχανία",
    "Other": "Άλλο",
    "Hospital-led": "Κυρίως νοσοκομείο",
    "GP-heavy": "Κυρίως GP",
    "Hospital + GP": "Νοσοκομείο + GP",
    "Community": "Κοινότητα",
    "Low community": "Λίγη κοινότητα",
    "London": "Λονδίνο",
    "More statistics": "Περισσότερα στοιχεία",
    "Strong matches for you": "Καλές αντιστοιχίσεις",
    "England & Wales programmes": "Προγράμματα σε Αγγλία και Ουαλία",
    "Training positions listed": "Διαθέσιμες θέσεις στο αρχείο",
    "Hospital-led programmes": "Νοσοκομειακά προγράμματα",
    "GP-led programmes": "Προγράμματα GP",
    "Find your matches": "Βρες τις αντιστοιχίσεις σου",
    "Find my matches": "Βρες τις επιλογές μου",
    "Find a placement that actually fits you.": "Βρες την εκπαίδευση που σου ταιριάζει.",
    "Explore programmes": "Εξερεύνησε προγράμματα",
    "See my matches": "Δες τις επιλογές μου",
    "How Placement Atlas helps": "Πώς σε βοηθά το Placement Atlas",
    "Reduce overload": "Λιγότερη πολυπλοκότητα",
    "Explain the score": "Κατανοητή βαθμολογία",
    "Personalise without limiting": "Εξατομίκευση χωρίς περιορισμούς",
    "Free to explore": "Δωρεάν περιήγηση",
    "No account needed to start": "Ξεκινάς χωρίς λογαριασμό",
    "Independent project": "Ανεξάρτητο έργο",
    "ORIEL 2027/28 · OFFERS STAGE": "ORIEL 2027/28 · ΣΤΑΔΙΟ ΠΡΟΣΦΟΡΩΝ",
    "Offers underway": "Σε εξέλιξη οι προσφορές",
    "Official offers guidance": "Επίσημος οδηγός προσφορών",
    "View offer & outcome": "Δες την προσφορά σου",
    "EXPLORE · YOUR DECISION SPACE": "ΕΞΕΡΕΥΝΗΣΗ · ΧΩΡΟΣ ΕΠΙΛΟΓΩΝ",
    "Browse every programme, then see which suit your own priorities.": "Δες όλα τα προγράμματα και βρες όσα σου ταιριάζουν.",
    "Your placement workspace": "Ο χώρος επιλογών σου",
    "Start broad, then narrow your choices.": "Ξεκίνα με όλες τις επιλογές και βάλε τα δικά σου κριτήρια.",
    "Explore all programme locations across England & Wales": "Τοποθεσίες προγραμμάτων στην Αγγλία και την Ουαλία",
    "Map style": "Εμφάνιση χάρτη",
    "Locate matching sites": "Εντοπισμός θέσεων",
    "Fit results": "Εστίαση στα αποτελέσματα",
    "Show all matching": "Εμφάνιση όλων",
    "Fast Streets · Recommended": "Γρήγορος οδικός χάρτης",
    "Editorial · Automatic": "Αυτόματο στυλ",
    "Streets Light": "Ανοιχτός χάρτης",
    "Streets Dark": "Σκούρος χάρτης",
    "No programme sites in this view.": "Δεν υπάρχουν θέσεις σε αυτή την περιοχή.",
    "Fit all results": "Εστίαση σε όλα",
    "saved locally": "αποθηκεύτηκε τοπικά",
    "Programme results shown:": "Προγράμματα που εμφανίζονται:",
    "Sort results": "Ταξινόμηση",
    "Sort by": "Ταξινόμηση κατά",
    "Best fit": "Καλύτερη αντιστοίχιση",
    "Highest salary": "Υψηλότερος μισθός",
    "Best hourly pay": "Καλύτερη ωριαία αμοιβή",
    "Effective hourly pay": "Πραγματική ωριαία αμοιβή",
    "Shortest week": "Λιγότερες ώρες",
    "Name A–Z": "Όνομα Α–Ω",
    "A–Z": "Α–Ω",
    "List": "Λίστα",
    "Grid": "Πλέγμα",
    "Compare selected": "Σύγκριση επιλεγμένων",
    "Compare": "Σύγκριση",
    "Compare programmes": "Σύγκριση προγραμμάτων",
    "My shortlist (": "Η λίστα επιλογών μου (",
    "Back to my previous results": "Πίσω στα αποτελέσματά μου",
    "No results found": "Δεν βρέθηκαν αποτελέσματα",
    "Decisions": "Αποφάσεις",
    "All decisions": "Όλες οι αποφάσεις",
    "Hide No / Absolutely not": "Απόκρυψη απορριφθέντων",
    "Not decided yet": "Χωρίς απόφαση",
    "Excluded": "Εξαιρέθηκαν",
    "Hide excluded programmes": "Απόκρυψη αποκλεισμένων",
    "Hide already-shortlisted programmes": "Απόκρυψη από τη λίστα επιλογών",
    "Hide shortlisted": "Απόκρυψη από τη λίστα",
    "Showing excluded": "Εμφάνιση αποκλεισμένων",
    "Advanced filters & exclusions": "Πρόσθετα φίλτρα και αποκλεισμοί",
    "Home postcode or area · commute starting point": "Αφετηρία μετακίνησης (ταχ. κώδικας ή περιοχή)",
    "No commute starting point saved. Add a postcode to personalise each training-site journey.": "Δεν έχει οριστεί αφετηρία. Πρόσθεσε ταχ. κώδικα για εκτίμηση διαδρομών.",
    "Save starting point": "Αποθήκευση αφετηρίας",
    "Commute, sponsorship, specialist settings and your saved decision status.": "Μετακινήσεις, βίζα, ειδικές δομές και αποθηκευμένες επιλογές.",
    "Skilled Worker visa sponsorship": "Χορηγία βίζας Skilled Worker",
    "Advertised sponsorship only": "Μόνο με δηλωμένη χορηγία",
    "Sponsorship not offered": "Χωρίς χορηγία βίζας",
    "Not confirmed in Oriel export": "Δεν επιβεβαιώνεται στο αρχείο Oriel",
    "Hide avoided areas entirely": "Απόκρυψη περιοχών προς αποφυγή",
    "Hide far-out London towns (e.g. Orpington)": "Απόκρυψη μακρινών προαστίων Λονδίνου",
    "Specialist settings": "Εξειδικευμένες δομές",
    "Specialist programmes": "Εξειδικευμένα προγράμματα",
    "Hide programmes linked to specialist settings you want to avoid.": "Κρύψε προγράμματα σε δομές που θέλεις να αποφύγεις.",
    "Hide prison, custody & justice settings": "Απόκρυψη φυλακών και δομών κράτησης",
    "Hide mental health & forensic services": "Απόκρυψη ψυχικής υγείας και δικαστικών δομών",
    "Hide other specialist centres (hospice, substance misuse, rehabilitation)": "Απόκρυψη άλλων ειδικών δομών",
    "Include the remaining settings": "Συμπερίληψη άλλων δομών",
    "Show specialist programmes only": "Μόνο εξειδικευμένα",
    "Choose point on map": "Επιλογή σημείου στον χάρτη",
    "Clear distance filter": "Καθαρισμός φίλτρου απόστασης",
    "No distance filter applied.": "Δεν έχει οριστεί απόσταση.",
    "Not personalised": "Χωρίς εξατομίκευση",
    "Personal fit": "Προσωπική αντιστοίχιση",
    "Personalise fit": "Εξατομίκευση",
    "Personalise to find your strengths": "Εξατομίκευση αποτελεσμάτων",
    "See your personal trade-offs · Take the quiz": "Δες τα υπέρ και τα κατά · Κάνε το κουίζ",
    "Take the quiz": "Κάνε το κουίζ",
    "Add to shortlist": "Προσθήκη στη λίστα",
    "Remove from shortlist": "Αφαίρεση",
    "Remove from shortlist?": "Αφαίρεση από τη λίστα;",
    "View all details ↓": "Πλήρεις λεπτομέρειες ↓",
    "Hide details ↑": "Απόκρυψη λεπτομερειών ↑",
    "Show details": "Λεπτομέρειες",
    "Read more": "Περισσότερα",
    "View details": "Λεπτομέρειες",
    "Not yet shortlisted": "Δεν έχει προστεθεί στη λίστα",
    "Added to shortlist": "Προστέθηκε στη λίστα",
    "View shortlist": "Δες τη λίστα",
    "View my shortlist": "Δες τη λίστα μου",
    "Your shortlist": "Η λίστα επιλογών σου",
    "Your shortlist.": "Η λίστα επιλογών σου.",
    "Your shortlist is empty": "Η λίστα σου είναι κενή",
    "Review my shortlist": "Έλεγχος της λίστας μου",
    "Ranked": "Σε κατάταξη",
    "Saved": "Αποθηκευμένα",
    "Save": "Αποθήκευση",
    "Save preferences": "Αποθήκευση προτιμήσεων",
    "Notes": "Σημειώσεις",
    "Rank": "Σειρά κατάταξης",
    "Reorder": "Αλλαγή σειράς",
    "Remove": "Αφαίρεση",
    "Clear comparison": "Καθαρισμός σύγκρισης",
    "Add up to five from Explore.": "Επίλεξε έως πέντε από την Εξερεύνηση.",
    "SIDE BY SIDE": "ΔΙΠΛΑ ΔΙΠΛΑ",
    "Attribute": "Χαρακτηριστικό",
    "Programme": "Πρόγραμμα",
    "Programmes": "Προγράμματα",
    "Programme identifier": "Κωδικός προγράμματος",
    "Original programme description": "Αρχική περιγραφή προγράμματος",
    "All supplied programme labels": "Όλα τα πεδία του προγράμματος",
    "Gross annual salary": "Ετήσιος μικτός μισθός",
    "Gross hourly rate": "Μικτή ωριαία αμοιβή",
    "Take-home pay": "Καθαρός μισθός",
    "Estimated take-home": "Εκτιμώμενος καθαρός μισθός",
    "See estimated take-home": "Εκτίμηση καθαρών αποδοχών",
    "Travel": "Μετακίνηση",
    "Locations & commute": "Τοποθεσίες και μετακίνηση",
    "More connections & commute": "Περισσότερες διαδρομές",
    "Training locations": "Τοποθεσίες εκπαίδευσης",
    "Working hours": "Ώρες εργασίας",
    "Hours / week": "Ώρες/εβδομάδα",
    "Hours": "Ώρες",
    "Salary": "Μισθός",
    "Places": "Θέσεις",
    "Postcode": "Ταχυδρομικός κώδικας",
    "Not offered": "Δεν προσφέρεται",
    "Offered": "Προσφέρεται",
    "Unknown": "Άγνωστο",
    "Yes": "Ναι",
    "No": "Όχι",
    "Fully mapped": "Πλήρως χαρτογραφημένα",
    "Loading…": "Φόρτωση…",
    "Loading placement data…": "Φόρτωση προγραμμάτων…",
    "Loading map locations…": "Φόρτωση θέσεων χάρτη…",
    "Export decisions": "Εξαγωγή επιλογών",
    "Backup": "Αντίγραφο ασφαλείας",
    "Restore backup": "Επαναφορά αντιγράφου",
    "Upload latest Oriel CSV": "Μεταφόρτωση αρχείου Oriel CSV",
    "How saving and backups work": "Πώς λειτουργούν οι αποθηκεύσεις",
    "Install app": "Εγκατάσταση εφαρμογής",
    "Your workspace": "Ο χώρος σου",
    "Profile": "Προφίλ",
    "Sign in": "Σύνδεση",
    "Sign out": "Αποσύνδεση",
    "Log out": "Αποσύνδεση",
    "Create account": "Δημιουργία λογαριασμού",
    "Account security": "Ασφάλεια λογαριασμού",
    "Change profile photo": "Αλλαγή φωτογραφίας προφίλ",
    "Edit name": "Επεξεργασία ονόματος",
    "Edit details": "Επεξεργασία στοιχείων",
    "Save name": "Αποθήκευση ονόματος",
    "Cancel": "Ακύρωση",
    "Remove photo": "Αφαίρεση φωτογραφίας",
    "Appearance": "Εμφάνιση",
    "Follow device": "Σύμφωνα με τη συσκευή",
    "Light": "Φωτεινό",
    "Dark": "Σκοτεινό",
    "My Outcome": "Η προσφορά μου",
    "Offer tracker": "Παρακολούθηση προσφοράς",
    "Current status": "Τρέχουσα κατάσταση",
    "Awaiting an offer": "Αναμονή προσφοράς",
    "Offer received — action needed": "Λήψη προσφοράς — απαιτείται ενέργεια",
    "Offer accepted": "Αποδοχή προσφοράς",
    "Declined": "Απορρίφθηκε",
    "Outcome": "Αποτέλεσμα",
    "More": "Περισσότερα",
    "Select": "Επιλογή",
    "Choose": "Επίλεξε",
    "Close": "Κλείσιμο",
    "Continue": "Συνέχεια",
    "Done": "Έτοιμο",
    "Start fresh": "Νέα αρχή",
    "Clear local data": "Διαγραφή τοπικών δεδομένων",
    "Learning": "Μάθηση",
    "Guidance & advice": "Οδηγίες και συμβουλές",
    "Learn with purpose.": "Μάθε με στόχο.",
    "Explore training settings": "Εξερεύνησε τους τύπους εκπαίδευσης",
    "Research a programme": "Έρευνα για πρόγραμμα",
    "Help": "Βοήθεια",
    "About & support": "Σχετικά και υποστήριξη",
    "Your account & workspace": "Λογαριασμός και χώρος εργασίας",
    "Potential trade-offs": "Πιθανά μειονεκτήματα",
    "Programme highlights": "Πλεονεκτήματα προγράμματος",
    "The green flags": "Τα θετικά σημεία",
    "Read the room": "Τι να προσέξεις",
    "Like No": "Όχι",
    "Like": "Μου αρέσει",
    "Super Like": "Σούπερ επιλογή",
    "Swipe left to exclude a programme": "Σύρε αριστερά για απόρριψη",
    "Swipe right to shortlist a programme": "Σύρε δεξιά για προσθήκη στη λίστα",
    "remaining in all regions": "απομένουν σε όλες τις περιοχές",
    "Not yet decided": "Δεν έχεις αποφασίσει",
    "Undo last decision": "Αναίρεση τελευταίας επιλογής",
    "All regions — England & Wales": "Όλες οι περιοχές · Αγγλία και Ουαλία",
    "Sound off": "Ήχος κλειστός",
    "Sound on": "Ήχος ενεργός",
    "Review advertised salaries and hours, not guarantees.": "Έλεγξε τα δηλωμένα ποσά και τις ώρες. Δεν αποτελούν εγγύηση."
  });

  // Additional Greek copy across shortlist, preferences, simulation and Swipe Mode.
  Object.assign(DICTIONARIES.el,   {
    "YOUR SHORTLIST": "Η ΛΙΣΤΑ ΕΠΙΛΟΓΩΝ ΣΟΥ",
    "Review and reorder your saved programmes before transferring your preferences to Oriel.": "Έλεγξε και ταξινόμησε τα αποθηκευμένα προγράμματα πριν μεταφέρεις τις επιλογές σου στο Oriel.",
    "Make it a PDF": "Αποθήκευση ως PDF",
    "Nothing shortlisted yet. Mark placements or and they’ll appear here.": "Η λίστα σου είναι ακόμη κενή. Πρόσθεσε προγράμματα από την Εξερεύνηση.",
    "Display order": "Σειρά εμφάνισης",
    "1 → last (ascending)": "Από το πρώτο στο τελευταίο",
    "Last → 1 (descending)": "Από το τελευταίο στο πρώτο",
    "Viewing order only — your saved priority numbers and exported ranking do not change.": "Αλλάζει μόνο η προβολή. Η αποθηκευμένη κατάταξη δεν αλλάζει.",
    "YOUR PROFILE": "ΤΟ ΠΡΟΦΙΛ ΣΟΥ",
    "Your setup sets the starting point. Fine-tune how each factor affects programme matches below.": "Οι προτιμήσεις σου ορίζουν την αφετηρία. Ρύθμισε τη σημασία κάθε κριτηρίου.",
    "Fine-tune how strongly each factor affects your matches.": "Ρύθμισε πόσο επηρεάζει κάθε κριτήριο τις αντιστοιχίσεις.",
    "Pay": "Αμοιβή",
    "Off": "Καθόλου",
    "Strongest": "Μέγιστη",
    "Hospital training": "Νοσοκομειακή εκπαίδευση",
    "GP training": "Εκπαίδευση σε GP",
    "Location": "Τοποθεσία",
    "Career development": "Επαγγελματική εξέλιξη",
    "Work independence": "Αυτονομία στην εργασία",
    "Limit community-heavy training": "Λιγότερη εκπαίδευση σε φαρμακείο",
    "Not needed / no preference": "Δεν απαιτείται / αδιάφορο",
    "Prefer programmes offering sponsorship": "Προτίμηση σε χορηγία βίζας",
    "Require advertised sponsorship": "Απαραίτητη δηλωμένη χορηγία",
    "Programme sponsorship status comes from the dated Oriel export. An advertised offer does not guarantee individual visa eligibility.": "Η χορηγία βίζας προέρχεται από παλαιότερο αρχείο Oriel. Δεν εγγυάται δικαίωμα χορήγησης βίζας.",
    "Official Oriel guidance.": "Επίσημες οδηγίες Oriel.",
    "Retake setup": "Ξανά οι αρχικές ρυθμίσεις",
    "LOCATIONS": "ΤΟΠΟΘΕΣΙΕΣ",
    "Area preferences": "Προτιμήσεις περιοχών",
    "PREFERRED AREAS": "ΕΠΙΘΥΜΗΤΕΣ ΠΕΡΙΟΧΕΣ",
    "Areas you like": "Περιοχές που προτιμάς",
    "Preferred areas": "Προτιμώμενες περιοχές",
    "Add area": "Προσθήκη περιοχής",
    "Add areas to improve match scores.": "Πρόσθεσε περιοχές για καλύτερες αντιστοιχίσεις.",
    "Only show programmes in these preferred areas": "Μόνο προγράμματα στις περιοχές που προτιμώ",
    "AREAS TO EXCLUDE": "ΠΕΡΙΟΧΕΣ ΠΡΟΣ ΑΠΟΦΥΓΗ",
    "Areas you’d rather avoid": "Περιοχές που θέλεις να αποφύγεις",
    "Areas to exclude": "Περιοχές προς αποκλεισμό",
    "Exclude area": "Αποκλεισμός περιοχής",
    "Add an area to check listed training sites.": "Πρόσθεσε περιοχή για έλεγχο των χώρων εκπαίδευσης.",
    "View excluded": "Προβολή αποκλεισμένων",
    "Retry verification": "Επανάληψη ελέγχου",
    "Only exact, verified training-site postcode matches are excluded. Unverified locations remain visible.": "Αποκλείονται μόνο επιβεβαιωμένες αντιστοιχίες ταχ. κώδικα. Οι μη επιβεβαιωμένες τοποθεσίες παραμένουν.",
    "WHOLE-SITE APPEARANCE · NOT MAP PINS": "ΕΜΦΑΝΙΣΗ ΕΦΑΡΜΟΓΗΣ · ΟΧΙ ΔΕΙΚΤΕΣ ΧΑΡΤΗ",
    "Interface colours": "Χρώματα εφαρμογής",
    "Choose a colour theme for the whole interface. Map pin colours can be adjusted separately.": "Επίλεξε χρωματικό θέμα για την εφαρμογή. Τα χρώματα του χάρτη αλλάζουν χωριστά.",
    "Brightness": "Φωτεινότητα",
    "Forest": "Δάσος",
    "Blue": "Μπλε",
    "Violet": "Βιολετί",
    "Amber": "Κεχριμπάρι",
    "Brown": "Καφέ",
    "Monochrome": "Μονόχρωμο",
    "YOUR MAP": "Ο ΧΑΡΤΗΣ ΣΟΥ",
    "Map colours": "Χρώματα χάρτη",
    "Customise marker colours": "Προσαρμογή χρωμάτων δεικτών",
    "Choose a colour for each setting. The legend updates to match.": "Επίλεξε χρώμα ανά τύπο εκπαίδευσης. Το υπόμνημα ενημερώνεται αυτόματα.",
    "Restore default map colours": "Επαναφορά χρωμάτων χάρτη",
    "RESET": "ΕΠΑΝΑΦΟΡΑ",
    "Clears your ratings, notes and uploaded CSV on this browser only.": "Διαγράφει αξιολογήσεις, σημειώσεις και αρχεία CSV μόνο από αυτό το πρόγραμμα περιήγησης.",
    "PAY & PENSIONS": "ΑΠΟΔΟΧΕΣ ΚΑΙ ΣΥΝΤΑΞΕΙΣ",
    "💷 Estimated take-home": "💷 Εκτιμώμενος καθαρός μισθός",
    "Shown beneath advertised annual salaries. Illustrative UK PAYE for tax year 2027/28 (England/Wales), 2027/28 National Insurance assumptions, one job and standard tax code. Actual payroll depends on pension scheme, tax code, benefits and loan repayments.": "Οι καθαρές αποδοχές είναι ενδεικτικές, βάσει φορολογίας PAYE και εισφορών για το 2027/28 στην Αγγλία και Ουαλία. Το πραγματικό ποσό εξαρτάται από φόρους, σύνταξη και κρατήσεις.",
    "EMPLOYEE PENSION ASSUMPTION": "ΥΠΟΘΕΣΗ ΣΥΝΤΑΞΙΟΔΟΤΙΚΩΝ ΕΙΣΦΟΡΩΝ",
    "Employee pension assumption": "Συνταξιοδοτικές εισφορές",
    "Workplace minimum: 5% of qualifying earnings": "Ελάχιστη εισφορά: 5% των επιλέξιμων αποδοχών",
    "NHS scheme: current published tiers": "Σύνταξη NHS: δημοσιευμένες κλίμακες",
    "No pension deduction": "Χωρίς κράτηση σύνταξης",
    "STUDENT LOAN": "ΦΟΙΤΗΤΙΚΟ ΔΑΝΕΙΟ",
    "Student loan": "Φοιτητικό δάνειο",
    "No repayment": "Χωρίς αποπληρωμή",
    "Plan 5 (illustrative threshold)": "Plan 5 (ενδεικτικό όριο)",
    "NHS pension tiers use the published 2026/27 rates as an estimate; 2027/28 deductions may differ. Student-loan Plan 5 uses the £25,000 2026/27 reference threshold pending the applicable later figure. Pension relief model assumes the net-pay method, not salary sacrifice. A 52-week annual salary is used, even for placements beginning July/August.": "Για τη σύνταξη NHS χρησιμοποιούνται ενδεικτικά οι κλίμακες 2026/27, που ενδέχεται να αλλάξουν. Για το Plan 5 χρησιμοποιείται προσωρινά όριο £25.000. Οι υπολογισμοί δεν αποτελούν εκκαθαριστικό μισθοδοσίας.",
    "Income Tax rates": "Συντελεστές φόρου εισοδήματος",
    "National Insurance": "Εθνική ασφάλιση",
    "NHS pension tiers": "Κλίμακες σύνταξης NHS",
    "YOUR WORKSPACE": "Ο ΧΩΡΟΣ ΣΟΥ",
    "Save & manage your choices": "Αποθήκευση και διαχείριση επιλογών",
    "Export or back up your shortlist. Install the app or import an updated programme list.": "Εξήγαγε ή αποθήκευσε αντίγραφο της λίστας σου. Μπορείς επίσης να εγκαταστήσεις την εφαρμογή ή να εισαγάγεις νέο αρχείο.",
    "Help improve this desk": "Βοήθησε να βελτιωθεί η εφαρμογή",
    "Export previous study results": "Εξαγωγή προηγούμενων αποτελεσμάτων μελέτης",
    "Delete previous study results": "Διαγραφή προηγούμενων αποτελεσμάτων μελέτης",
    "Researcher: review exported sessions": "Ερευνητής: έλεγχος εξαγόμενων συνεδριών",
    "Study JSON files (up to 100, 2 MB each)": "Αρχεία JSON μελέτης (έως 100, 2 MB το καθένα)",
    "PRIVATE ORIEL PRACTICE WORKSPACE": "ΙΔΙΩΤΙΚΟΣ ΧΩΡΟΣ ΕΞΑΣΚΗΣΗΣ ORIEL",
    "Organise programmes into the three official category names, drag or reorder them, and copy their exact codes. This never updates your actual Oriel application or the main Placement Atlas shortlist.": "Οργάνωσε τα προγράμματα στις τρεις επίσημες κατηγορίες, άλλαξε τη σειρά τους και αντέγραψε τους κωδικούς. Δεν αλλάζει η αίτηση Oriel ούτε η λίστα σου.",
    "Open official Oriel ↗": "Άνοιγμα επίσημου Oriel ↗",
    "Open official Oriel": "Άνοιγμα επίσημου Oriel",
    "Open official Oriel in split view": "Άνοιγμα Oriel σε διαχωρισμένη προβολή",
    "Opens a second tab. In Chrome, right-click the Oriel tab and choose “Add tab to new split view”, then select this Desk.": "Ανοίγει δεύτερη καρτέλα. Στο Chrome επίλεξε διαχωρισμένη προβολή για το Oriel και αυτή την εφαρμογή.",
    "Offer & outcome": "Προσφορά και αποτέλεσμα",
    "PROGRAMMES ORGANISED": "ΤΑΞΙΝΟΜΗΜΕΝΑ ΠΡΟΓΡΑΜΜΑΤΑ",
    "programmes remain unassigned": "προγράμματα δεν έχουν καταταχθεί",
    "Import my shortlist": "Εισαγωγή λίστας επιλογών",
    "Export ranked CSV": "Εξαγωγή κατάταξης CSV",
    "Restore": "Επαναφορά",
    "Clear simulation": "Καθαρισμός προσομοίωσης",
    "Search by name, town or code; click a result to add it. Drag a card to another column, use its dropdown to move it, or click its number to change rank. The copy icon copies the four-digit programme code for pasting into Oriel.": "Βρες πρόγραμμα με όνομα, πόλη ή κωδικό. Πρόσθεσέ το, σύρε το στην κατάλληλη κατηγορία ή άλλαξε τη σειρά του. Αντέγραψε τον κωδικό για χρήση στο Oriel.",
    "RANKED IN YOUR CHOSEN ORDER": "ΚΑΤΑΤΑΞΗ ΜΕ ΤΗ ΣΕΙΡΑ ΣΟΥ",
    "Your preferred programmes, ranked in order.": "Τα προγράμματα που προτιμάς, με τη σειρά σου.",
    "COULD ACCEPT": "ΘΑ ΔΕΧΟΜΟΥΝ",
    "You could accept a programme in this group if needed.": "Προγράμματα που θα δεχόσουν αν χρειαζόταν.",
    "WOULD NOT ACCEPT": "ΔΕΝ ΘΑ ΔΕΧΟΜΟΥΝ",
    "You would not accept an offer in this group.": "Προγράμματα που δεν θα αποδεχόσουν.",
    "Add programme": "Προσθήκη προγράμματος",
    "Add programmes using the search bar above.": "Πρόσθεσε προγράμματα μέσω της αναζήτησης παραπάνω.",
    "Unassigned is separate from No Preference here.": "Τα μη καταταγμένα είναι διαφορετικά από το No Preference.",
    "Unassigned programmes have not yet been placed in this simulation. Official Oriel may handle unselected programmes differently.": "Τα μη καταταγμένα προγράμματα δεν έχουν τοποθετηθεί ακόμη. Το Oriel μπορεί να τα αντιμετωπίζει διαφορετικά.",
    "Place all remaining in Not Wanted…": "Μεταφορά όλων των υπολοίπων στο Not Wanted…",
    "Simulator data is saved locally only.": "Η προσομοίωση αποθηκεύεται μόνο στη συσκευή.",
    "Pick up to five placements from Explore.": "Επίλεξε έως πέντε προγράμματα από την Εξερεύνηση.",
    "← Back to Explore": "← Πίσω στην Εξερεύνηση",
    "YOUR ACCOUNT & WORKSPACE": "ΛΟΓΑΡΙΑΣΜΟΣ ΚΑΙ ΧΩΡΟΣ ΣΟΥ",
    "Your personal space for Placement Atlas.": "Ο προσωπικός σου χώρος στο Placement Atlas.",
    "PLACEMENT ATLAS COMMUNITY": "ΚΟΙΝΟΤΗΤΑ PLACEMENT ATLAS",
    "Join the pharmacy community": "Γίνε μέλος της κοινότητας φαρμακευτικής",
    "Save your shortlist, preferences and notes, and pick up where you left off on any device.": "Αποθήκευσε τη λίστα, τις προτιμήσεις και τις σημειώσεις σου για να συνεχίζεις από οποιαδήποτε συσκευή.",
    "Not signed in": "Δεν έχεις συνδεθεί",
    "Pharmacist": "Φαρμακοποιός",
    "Create an account to save your shortlist and preferences across devices.": "Φτιάξε λογαριασμό για να συγχρονίζεις λίστες και προτιμήσεις μεταξύ συσκευών.",
    "Reset your password securely using a link sent to your registered email.": "Άλλαξε τον κωδικό σου με ασφαλή σύνδεσμο στο email σου.",
    "Set or change password": "Ορισμός ή αλλαγή κωδικού",
    "Follow your device automatically, or choose your own light or dark mode.": "Ακολούθησε αυτόματα το θέμα της συσκευής ή επίλεξε φωτεινή ή σκοτεινή εμφάνιση.",
    "Refine": "Φίλτρα",
    "All settings": "Όλοι οι τύποι εκπαίδευσης",
    "Split training": "Μικτή εκπαίδευση",
    "Community-led": "Κυρίως φαρμακείο",
    "Any salary": "Κάθε μισθός",
    "Any hours": "Κάθε ωράριο",
    "Split placements only": "Μόνο μικτά προγράμματα",
    "Hide already-decided programmes": "Απόκρυψη ήδη αξιολογημένων",
    "Clear game filters": "Καθαρισμός φίλτρων σάρωσης",
    "FIT · TAKE QUIZ": "ΑΝΤΙΣΤΟΙΧΙΣΗ · ΚΑΝΕ ΤΟ ΚΟΥΙΖ",
    "SALARY": "ΜΙΣΘΟΣ",
    "HOURS": "ΩΡΕΣ",
    "PLACES": "ΘΕΣΕΙΣ",
    "APPROXIMATE TRAINING LOCATIONS": "ΕΝΔΕΙΚΤΙΚΕΣ ΤΟΠΟΘΕΣΙΕΣ ΕΚΠΑΙΔΕΥΣΗΣ",
    "⌖ APPROXIMATE TRAINING LOCATIONS": "⌖ ΕΝΔΕΙΚΤΙΚΕΣ ΤΟΠΟΘΕΣΙΕΣ ΕΚΠΑΙΔΕΥΣΗΣ",
    "LIKE NO": "ΟΧΙ",
    "LIKE": "ΝΑΙ",
    "SUPER LIKE": "ΞΕΧΩΡΙΣΤΟ",
    "Pay cheque looking pretty persuasive": "Ο μισθός φαίνεται ελκυστικός",
    "Hours look fairly civilised on paper": "Το δηλωμένο ωράριο φαίνεται λογικό",
    "Hospital and GP rotations — options!": "Εμπειρία σε νοσοκομείο και GP",
    "Split sites: check the travel logistics": "Πολλές τοποθεσίες: έλεγξε τις μετακινήσεις",
    "Tip: ← Like No · → Like · ↑ Super Like · Backspace Undo": "Συμβουλή: ← Όχι · → Μου αρέσει · ↑ Ξεχωριστό · Backspace Αναίρεση",
    "Rotation weeks, salary and hours come from the Oriel CSV. Training areas are postcode-based approximations. Cheeky pros and cons are suggestions, not verified employer promises.": "Η διάρκεια, ο μισθός και οι ώρες προέρχονται από το αρχείο Oriel. Οι τοποθεσίες είναι κατά προσέγγιση και τα υπέρ/κατά ενδεικτικά.",
    "Travel2 listed postcodes": "Μετακίνηση · 2 ταχ. κώδικες",
    "No results": "Κανένα αποτέλεσμα",
    "All matching": "Όλα τα αποτελέσματα",
    "Select all": "Επιλογή όλων",
    "Show shortlisted": "Εμφάνιση λίστας",
    "Hide shortlisted": "Απόκρυψη λίστας",
    "Showing excluded": "Εμφανίζονται αποκλεισμένα",
    "Not personalised": "Χωρίς εξατομίκευση"
  });

  Object.assign(DICTIONARIES.el,   {
    "Full name": "Πλήρης ονομασία",
    "Overview": "Επισκόπηση",
    "Training & dates": "Εκπαίδευση και ημερομηνίες",
    "Pay & eligibility": "Αποδοχές και προϋποθέσεις",
    "My assessment": "Η αξιολόγησή μου",
    "See if you're a fit — take the quiz": "Δες αν σου ταιριάζει · Κάνε το κουίζ",
    "Rotation details": "Στοιχεία εκπαίδευσης",
    "Rotation weeks": "Εβδομάδες εκπαίδευσης",
    "Take quiz": "Κάνε το κουίζ",
    "Programme highlights": "Πλεονεκτήματα προγράμματος",
    "PROGRAMME HIGHLIGHTS": "ΠΛΕΟΝΕΚΤΗΜΑΤΑ ΠΡΟΓΡΑΜΜΑΤΟΣ",
    "Potential trade-offs": "Πιθανά μειονεκτήματα",
    "POTENTIAL TRADE-OFFS": "ΠΙΘΑΝΑ ΜΕΙΟΝΕΚΤΗΜΑΤΑ",
    "Personal fit": "Προσωπική αντιστοίχιση",
    "PERSONAL FIT": "ΠΡΟΣΩΠΙΚΗ ΑΝΤΙΣΤΟΙΧΙΣΗ",
    "Strong pay": "Υψηλός μισθός",
    "Major hospital exposure": "Σημαντική νοσοκομειακή εμπειρία",
    "Major GP exposure": "Σημαντική εμπειρία σε GP",
    "Major community exposure": "Σημαντική εμπειρία σε φαρμακείο",
    "No major trade-offs.": "Δεν προκύπτουν σημαντικά μειονεκτήματα.",
    "LOCATION & CONNECTIONS": "ΤΟΠΟΘΕΣΙΑ ΚΑΙ ΣΥΓΚΟΙΝΩΝΙΕΣ",
    "Locations & connections": "Τοποθεσίες και συγκοινωνίες",
    "Area connections": "Συνδέσεις περιοχής",
    "General local transport guidance · Use the nearby station and directions above. Add a home postcode only if you want a personalised commute estimate.": "Γενικές οδηγίες μετακίνησης: δες τον κοντινότερο σταθμό και τις διαδρομές παραπάνω. Πρόσθεσε ταχ. κώδικα κατοικίας για εξατομικευμένη εκτίμηση.",
    "Open selected site ↗": "Άνοιγμα επιλεγμένης τοποθεσίας ↗",
    "Rail station locations": "Θέσεις σιδηροδρομικών σταθμών",
    "Exclude": "Αποκλεισμός",
    "Saved to your shortlist": "Αποθηκεύτηκε στη λίστα επιλογών σου",
    "Not shortlisted": "Δεν είναι στη λίστα σου",
    "Strong yes": "Ισχυρή προτίμηση",
    "Yes": "Ναι",
    "Maybe": "Ίσως",
    "Only if needed": "Μόνο αν χρειαστεί",
    "No": "Όχι",
    "Absolutely not": "Με τίποτα",
    "See full details, location & pay": "Δες λεπτομέρειες, τοποθεσία και αποδοχές",
    "Hours not stated": "Δεν αναφέρονται ώρες",
    "Salary not stated": "Δεν αναφέρεται μισθός",
    "Training places": "Θέσεις εκπαίδευσης",
    "Not stated": "Δεν αναφέρεται",
    "Skilled Worker visa: not offered": "Βίζα Skilled Worker: δεν προσφέρεται",
    "Skilled Worker visa: offered": "Βίζα Skilled Worker: προσφέρεται",
    "Original Oriel name": "Αρχική ονομασία στο Oriel",
    "Show original Oriel programme name": "Εμφάνιση αρχικής ονομασίας στο Oriel",
    "Remove programme from shortlist": "Αφαίρεση προγράμματος από τη λίστα",
    "Move to higher priority, closer to #1": "Μετακίνηση σε υψηλότερη προτεραιότητα",
    "Move to lower priority, farther from #1": "Μετακίνηση σε χαμηλότερη προτεραιότητα",
    "Previous training site": "Προηγούμενη τοποθεσία εκπαίδευσης",
    "Next training site": "Επόμενη τοποθεσία εκπαίδευσης",
    "Make a PDF of your ranked shortlist": "Αποθήκευση κατάταξης σε PDF",
    "Open a print-ready shortlist, then choose Save as PDF.": "Άνοιξε τη λίστα για εκτύπωση και επέλεξε Αποθήκευση ως PDF.",
    "Add to comparison": "Προσθήκη στη σύγκριση",
    "Remove from comparison": "Αφαίρεση από τη σύγκριση",
    "Training": "Εκπαίδευση",
    "Settings": "Ρυθμίσεις",
    "Total": "Σύνολο",
    "Your personal fit": "Η προσωπική σου αντιστοίχιση",
    "More details": "Περισσότερα στοιχεία",
    "Show full name": "Προβολή πλήρους ονομασίας",
    "Hide full name": "Απόκρυψη πλήρους ονομασίας",
    "No major issues detected": "Δεν εντοπίστηκαν σημαντικά προβλήματα"
  });

  Object.assign(DICTIONARIES.el,   {
    "Starts": "Έναρξη",
    "Est. finish": "Εκτ. λήξη",
    "Full name": "Πλήρης ονομασία",
    "LOCATION & CONNECTIONS": "ΤΟΠΟΘΕΣΙΕΣ ΚΑΙ ΣΥΓΚΟΙΝΩΝΙΕΣ",
    "Map loading…": "Ο χάρτης φορτώνει…",
    "Area connections": "Συγκοινωνίες περιοχής",
    "Site": "Τοποθεσία",
    "Station": "Σταθμός",
    "Directions": "Οδηγίες",
    "Rail station locations": "Τοποθεσίες σιδηροδρομικών σταθμών",
    "Open selected site": "Άνοιγμα τοποθεσίας",
    "Go to map": "Μετάβαση στον χάρτη",
    "Not offered": "Δεν προσφέρεται",
    "View original": "Προβολή αρχικής ονομασίας",
    "Show full name": "Προβολή πλήρους ονομασίας",
    "Hide full name": "Απόκρυψη πλήρους ονομασίας",
    "Remove from shortlist": "Αφαίρεση"
  });

  Object.assign(DICTIONARIES.el,   {
    "Location & connections": "Τοποθεσία και συγκοινωνίες",
    "Rail station locations:": "Τοποθεσίες σιδηροδρομικών σταθμών:",
    "London Underground data: TfL": "Δεδομένα μετρό Λονδίνου: TfL",
    "Programme start and estimated finish": "Έναρξη και εκτιμώμενη λήξη προγράμματος",
    "Map loading…": "Ο χάρτης φορτώνει…",
    "Site directions": "Οδηγίες προς τοποθεσία",
    "Training site": "Τοποθεσία εκπαίδευσης"
  });

  // Extend every language using the same reviewed UI keys; the existing packs remain intact.
  const parityPacks = window.PlacementAtlasLocalePacks || {};
  for (const [language, translations] of Object.entries(parityPacks)) {
    if (DICTIONARIES[language]) Object.assign(DICTIONARIES[language], translations);
  }
  // Official identifiers must remain consistent in every language.
  const OFFICIAL_TERMS = new Set(['Placement Atlas','Oriel','NHS','MPharm','Swipe Mode','GP','Hospital','General Practice','Skilled Worker visa','England','Wales','London','Wessex','East Midlands','East of England','Kent, Surrey and Sussex','North East','North West','South West','Thames Valley','West Midlands','Yorkshire and the Humber']);
  const getSavedLanguage = () => {
    let saved='en';
    try{saved=localStorage.getItem('placement-atlas-language-v1')||'en';}catch{}
    try{
      const requested=new URL(location.href).searchParams.get('lang');
      if(requested && LANGUAGES.some(([code])=>code===requested))return requested;
    }catch{}
    return saved;
  };
  const syncURLLanguage = code => {
    try{
      const url=new URL(location.href);
      if(code==='en')url.searchParams.delete('lang'); else url.searchParams.set('lang',code);
      if(url.href!==location.href)history.replaceState(history.state,'',url.pathname+url.search+url.hash);
    }catch{}
  };
  const parityWords = () => DICTIONARIES[activeLanguage] || {};
  const dynamicLocale = (key) => {
    if(activeLanguage==='en') return null;
    const dict=parityWords();
    let m;
    // Preserve the exact count and location name while localising the descriptor.
    if((m=key.match(/^(\d[\d,]*)\s+programmes?$/i)) && dict['programmes'])
      return m[1]+' '+dict['programmes'];
    if((m=key.match(/^(.+?)\s+programmes$/i)) && dict['programmes']) {
      // Only locations from the selected, official region names are eligible.
      const areas=new Set(['London','Wales','Wessex','East Midlands','East of England','Kent, Surrey and Sussex','North East','North West','South West','Thames Valley','West Midlands','Yorkshire and the Humber']);
      if(areas.has(m[1]))return m[1]+' · '+dict['programmes'];
    }
    if((m=key.match(/^(\d[\d,]*)\s+total programmes\s*·\s*(\d[\d,]*)\s+shown$/i))
       && dict['total programmes'] && dict['shown'])
      return m[1]+' '+dict['total programmes']+' · '+m[2]+' '+dict['shown'];
    if((m=key.match(/^([←↩○✓☷]+\s*)(.+)$/)) && dict[m[2]])return m[1]+dict[m[2]];
    if((m=key.match(/^(.+?)\s*([→↓↑]+)$/)) && dict[m[1]])return dict[m[1]]+' '+m[2];
    if(key==='Done' && dict['Finish'])return dict['Finish'];
    if((m=key.match(/^(\d[\d,]*)\s+Shortlisted$/i)) && dict['Shortlisted'])return m[1]+' '+dict['Shortlisted'];
    return null;
  };

  const PROTECTED_SELECTOR = [
    '#placementMap', '.leaflet-container', '.leaflet-popup',
    '.tdProgrammeName', '.tdEmployer',
    '.tdLocationText', '.tdDetailsFacts dd', '.tdDrawerProgrammeTitle',
    '.atlasWorkspaceTitleOriginal', '.atlasWorkspaceTitleConcise',
    '.atlasTitleOriginal', '.atlasTitleConcise', '.placementTop h3', '.placementTop .employer', '.placementTop .eyebrow',
    '.tdProgrammeTitle', '.programme-title', '.programme-name', '.recoCard h3',
    '.atlasCardOriginalDescription', '.atlasOriginalDescription',
    '[data-atlas-no-translate]', '[translate="no"]',
    '[contenteditable="true"]'
  ].join(',');

  const TEXT_SKIP = new Set(['SCRIPT','STYLE','NOSCRIPT','TEXTAREA','INPUT','SVG','PATH']);
  const originalText = new WeakMap();
  const lastText = new WeakMap();
  const originalAttributes = new WeakMap();
  const lastAttributes = new WeakMap();
  let activeLanguage = 'en';
  let observer = null;

  const isProtected = element => {
    const matched = element?.closest?.(PROTECTED_SELECTOR);
    // The original programme title is protected, but the small "Full name"
    // UI control nested inside its heading is not programme data.
    if (matched?.matches?.('.placementTop h3') && element?.closest?.('button')) return false;
    return Boolean(matched);
  };
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
    if(OFFICIAL_TERMS.has(key))return;
    if (!key) return;
    const dict = dictionary();
    let value = dict[key] || dict[key.replace(/\s+/g, ' ')] || dynamicLocale(key);
    // The English "Any" must agree with the field in Greek; translating
    // all four selects to the same masculine form is grammatically wrong.
    if (activeLanguage === 'el' && key === 'Any' && parent.tagName === 'OPTION') {
      const select = parent.closest('select');
      if (select?.id === 'region') value = 'Οποιαδήποτε';
      else if (select?.id === 'sector') value = 'Οποιοδήποτε';
      else if (select?.id === 'hours' || select?.id === 'salary') value = 'Χωρίς όριο';
    }
    // Dynamic counts stay live; translate only their user-interface wording.
    if (activeLanguage === 'el' && !value) {
      let match;
      if ((match = key.match(/^My shortlist\s*\((\d+)\)$/))) value = 'Η λίστα μου (' + match[1] + ')';
      else if ((match = key.match(/^(\d[\d,.]*)\s+Shortlisted$/i))) value = match[1] + ' στη λίστα';
      else if ((match = key.match(/^Shortlist\s*#\s*(\d+)$/i))) value = 'Λίστα επιλογών #' + match[1];
      else if ((match = key.match(/^(\d[\d,.]*)\s+training places?$/i))) value = match[1] + (Number(match[1].replace(/,/g,'')) === 1 ? ' θέση εκπαίδευσης' : ' θέσεις εκπαίδευσης');
      else if ((match = key.match(/^(\d[\d,.]*)\s+listed postcodes?$/i))) value = match[1] + ' ταχ. κώδικες';
      else if ((match = key.match(/^(\d[\d,.]*)\s+remaining in all regions$/i))) value = match[1] + ' απομένουν σε όλες τις περιοχές';
      else if ((match = key.match(/^(\d[\d,.]*)\s+TOTAL\s*·\s*(\d[\d,.]*)\s+MATCHING$/i))) value = match[1] + ' ΣΥΝΟΛΟ · ' + match[2] + ' ΑΠΟΤΕΛΕΣΜΑΤΑ';
      else if ((match = key.match(/^(\d[\d,.]*)\s+total programmes\s*·\s*(\d[\d,.]*)\s+shown$/i))) value = match[1] + ' προγράμματα · ' + match[2] + ' εμφανίζονται';
    }
    // Mixed icon-and-label buttons must translate without losing the icon.
    if (activeLanguage === 'el' && !value) {
      const prefixed = key.match(/^([←↩○✓☷]\s*)(.+)$/);
      if (prefixed && dict[prefixed[2]]) value = prefixed[1] + dict[prefixed[2]];
      const s = key.match(/^(\d[\d,.]*)\s+programmes remain unassigned$/i);
      if (s) value = s[1] + ' προγράμματα χωρίς κατάταξη';
      const reviewed = key.match(/^(\d[\d,.]*)\s*\/\s*(\d[\d,.]*)\s+reviewed$/i);
      if (reviewed) value = reviewed[1] + ' / ' + reviewed[2] + ' αξιολογήθηκαν';
      const pnum = key.match(/^PROGRAMME\s+(\d+)$/i);
      if (pnum) value = 'ΠΡΟΓΡΑΜΜΑ ' + pnum[1];
      const perWeek = key.match(/^(\d+(?:[.,]\d+)?)\s*\/\s*week$/i);
      if (perWeek) value = perWeek[1] + ' / εβδομάδα';
      const rotation = key.match(/^(.+?)\s*·\s*(\d+)w$/i);
      if (rotation) value = rotation[1] + ' · ' + rotation[2] + ' εβδομ.';
      let cardMatch;
      if ((cardMatch = key.match(/^Programme\s+(\d+)\s*·\s*Saved to your shortlist$/i))) value = 'Πρόγραμμα ' + cardMatch[1] + ' · Στη λίστα σου';
      else if ((cardMatch = key.match(/^(\d+(?:[.,]\d+)?)h?\/week$/i))) value = cardMatch[1] + ' ώρες/εβδομάδα';
      else if ((cardMatch = key.match(/^(\d+(?:[.,]\d+)?)h\s+week$/i))) value = cardMatch[1] + ' ώρες/εβδομάδα';
      else if ((cardMatch = key.match(/^£([\d,]+)\/mo\s+gross$/i))) value = '£' + cardMatch[1] + '/μήνα μικτά';
      else if ((cardMatch = key.match(/^Est\.\s+take-home\s+(£[\d,]+)\/mo\s*·\s*(£[\d,]+)\/yr$/i))) value = 'Καθαρά (εκτ.) ' + cardMatch[1] + '/μήνα · ' + cardMatch[2] + '/έτος';
      else if ((cardMatch = key.match(/^Site\s+(\d+)\s+of\s+(\d+)\s*·\s*(.+)$/i))) value = 'Θέση ' + cardMatch[1] + ' από ' + cardMatch[2] + ' · ' + cardMatch[3];
      else if ((cardMatch = key.match(/^Starts\s+(.+)$/i))) value = 'Έναρξη ' + cardMatch[1];
      else if ((cardMatch = key.match(/^Est\.\s+finish\s+(.+)$/i))) value = 'Εκτ. λήξη ' + cardMatch[1];
      else if ((cardMatch = key.match(/^(\d+)\s+weeks?\s*·\s*estimated from listed rotation durations$/i))) value = cardMatch[1] + ' εβδομάδες · εκτίμηση από τη διάρκεια των περιόδων';
      else if ((cardMatch = key.match(/^Directions from\s+(.+)\s+↗$/i))) value = 'Οδηγίες από ' + cardMatch[1] + ' ↗';
      if (!value && (cardMatch = key.match(/^Rail station locations:\s*(.+)$/i))) value = 'Τοποθεσίες σιδηροδρομικών σταθμών: ' + cardMatch[1];
      if (!value && (cardMatch = key.match(/^Area connections\s*·\s*(.+)$/i))) {
        // Preserve place and transport names instead of attempting to re-translate
        // source-derived routing advice automatically.
        value = 'Συγκοινωνίες περιοχής · ' + cardMatch[1];
      }
      if (!value && /Nothing shortlisted yet\./i.test(key)) value = 'Δεν έχεις προσθέσει ακόμη προγράμματα. Επίλεξε όσα σε ενδιαφέρουν από την Εξερεύνηση.';
      if (value && /^\d+\s+θέσεις εκπαίδευσης$/.test(value) && key.startsWith('1 ')) value = '1 θέση εκπαίδευσης';
      if (!value && (cardMatch = key.match(/^(\d+) training places?$/i))) value = cardMatch[1] + (cardMatch[1] === '1' ? ' θέση εκπαίδευσης' : ' θέσεις εκπαίδευσης');
      if (!value && (cardMatch = key.match(/^(\d+) listed postcodes?$/i))) value = cardMatch[1] + (cardMatch[1] === '1' ? ' ταχ. κώδικας' : ' ταχ. κώδικες');
      if (!value) {
        const greekDate = key.match(/^(~?)(\d{1,2})\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d{4})$/);
        if (greekDate) {
          const months = {Jan:'Ιανουαρίου',Feb:'Φεβρουαρίου',Mar:'Μαρτίου',
            Apr:'Απριλίου',May:'Μαΐου',Jun:'Ιουνίου',Jul:'Ιουλίου',
            Aug:'Αυγούστου',Sep:'Σεπτεμβρίου',Oct:'Οκτωβρίου',
            Nov:'Νοεμβρίου',Dec:'Δεκεμβρίου'};
          value = greekDate[1] + greekDate[2] + ' ' + months[greekDate[3]] + ' ' + greekDate[4];
        }
      }
      const excludes = key.match(/^(\d+)\s+excluded$/i);
      if (excludes) value = excludes[1] + ' αποκλεισμένα';
    }
    const translated = activeLanguage === 'en' ? source : (value ? preserveWhitespace(source, value) : source);
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
      const translated = activeLanguage === 'en' || OFFICIAL_TERMS.has(source) ? source : (dictionary()[source] || dynamicLocale(source) || source);
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
      if (isProtected(node)) {
        if (node.matches?.('.placementTop h3')) {
          // Only visit nested controls, never the raw employer or programme title.
          node.querySelectorAll('button').forEach(button => walk(button));
        }
        return;
      }
      translateAttributes(node);
    }
    for (const child of Array.from(node.childNodes || [])) walk(child);
  }

  function applyLanguage(language) {
    activeLanguage = LANGUAGES.some(([code]) => code === language) ? language : 'en';
    const rtl = ['ar','ur','fa','ps','ckb'].includes(activeLanguage);
    document.documentElement.lang = activeLanguage;
    document.documentElement.dir = rtl ? 'rtl' : 'ltr';
    document.documentElement.dataset.atlasLanguage = activeLanguage;
    walk(document.body);
    document.dispatchEvent(new CustomEvent('placementatlas:languagechange', { detail: { language: activeLanguage, direction: rtl ? 'rtl' : 'ltr' } }));
  }

  // Body-level popover avoids clipping inside the scrollable sticky header.
  function mountSelector() {
    const header = document.querySelector('.shell > header.top');
    const nav = header?.querySelector('nav.tabs');
    if (!header || !nav || document.getElementById('atlasLanguagePicker')) return null;
    const picker = document.createElement('div');
    picker.id = 'atlasLanguagePicker';
    picker.className = 'atlasLanguagePicker';
    picker.setAttribute('translate', 'no');
    picker.setAttribute('data-atlas-no-translate', '');
    picker.innerHTML = '<button type="button" class="atlasLanguageTrigger" id="atlasLanguageTrigger" aria-haspopup="menu" aria-controls="atlasLanguageMenu" aria-expanded="false">' +
      '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c-3 3-4.5 6-4.5 9s1.5 6 4.5 9M12 3c3 3 4.5 6 4.5 9s-1.5 6-4.5 9"/></svg>' +
      '<span class="atlasLanguageCurrentFlag" aria-hidden="true">🇬🇧</span>' +
      '<span class="atlasLanguageCurrentName">English</span>' +
      '<svg class="atlasLanguageChevron" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="m6 9 6 6 6-6"/></svg></button>';
    const trigger = picker.querySelector('#atlasLanguageTrigger');
    const popup = document.createElement('div');
    popup.id = 'atlasLanguageMenu';
    popup.className = 'atlasLanguageMenu';
    popup.hidden = true;
    popup.setAttribute('role','menu');
    popup.setAttribute('aria-label','Choose website language');
    popup.setAttribute('data-atlas-no-translate','');
    popup.setAttribute('translate','no');
    const title = document.createElement('div');
    title.className = 'atlasLanguageMenuTitle';
    title.textContent = 'Choose language';
    const list = document.createElement('div');
    list.className = 'atlasLanguageOptions';
    popup.append(title,list);
    const buttons = new Map();
    const parseLabel = label => {
      const index = label.indexOf(' ');
      return {flag:label.slice(0,index),name:label.slice(index+1)};
    };
    for (const [code,label] of LANGUAGES) {
      const {flag,name}=parseLabel(label);
      const option = document.createElement('button');
      option.type='button';
      option.className='atlasLanguageOption';
      option.dataset.language=code;
      option.setAttribute('role','menuitemradio');
      option.setAttribute('aria-checked','false');
      option.tabIndex=-1;
      const flagSpan=document.createElement('span');
      flagSpan.className='atlasLanguageOptionFlag';
      flagSpan.setAttribute('aria-hidden','true');
      flagSpan.textContent=flag;
      const nameSpan=document.createElement('span');
      nameSpan.className='atlasLanguageOptionName';
      nameSpan.textContent=name;
      nameSpan.lang=code;
      if(['ar','ur','fa','ps','ckb'].includes(code))nameSpan.dir='rtl';
      const tick=document.createElement('span');
      tick.className='atlasLanguageOptionCheck';
      tick.setAttribute('aria-hidden','true');
      tick.textContent='✓';
      option.append(flagSpan,nameSpan,tick);
      list.append(option);
      buttons.set(code,option);
    }
    // Reuse the existing profile/theme toolbar; never overlap it with an
    // absolutely positioned language control on narrow phone widths.
    const utility=header.querySelector('.atlasHeaderUtilities');
    if(utility)utility.append(picker);
    else header.append(picker);
    document.body.append(popup);
    let opened=false;
    const updateSelected=()=>{
      const [code,label]=LANGUAGES.find(([entry])=>entry===activeLanguage)||LANGUAGES[0];
      const {flag,name}=parseLabel(label);
      trigger.querySelector('.atlasLanguageCurrentFlag').textContent=flag;
      trigger.querySelector('.atlasLanguageCurrentName').textContent=name;
      trigger.setAttribute('aria-label','Website language: '+name+'. Change language');
      for(const [entry,button] of buttons) {
        const selected=entry===code;
        button.setAttribute('aria-checked',String(selected));
        button.classList.toggle('atlasLanguageSelected',selected);
      }
    };
    const positionPopup=()=>{
      if(!opened)return;
      const r=trigger.getBoundingClientRect();
      const vw=window.innerWidth,vh=window.innerHeight;
      const width=Math.min(310,vw-24);
      popup.style.width=width+'px';
      const left=Math.max(12,Math.min(vw-width-12,r.right-width));
      const maxHeight=Math.min(420,Math.max(160,vh-24));
      const below=vh-r.bottom-12;
      const above=r.top-12;
      const useAbove=below<Math.min(260,maxHeight)&&above>below;
      const height=Math.min(maxHeight,Math.max(140,useAbove?above:below));
      popup.style.left=left+'px';
      popup.style.maxHeight=height+'px';
      popup.style.top=(useAbove?Math.max(12,r.top-height-5):Math.min(vh-height-12,r.bottom+5))+'px';
    };
    const closePopup=(restoreFocus=false)=>{
      if(!opened)return;
      opened=false;
      popup.hidden=true;
      trigger.setAttribute('aria-expanded','false');
      picker.classList.remove('atlasLanguageOpen');
      if(restoreFocus)trigger.focus();
    };
    const openPopup=()=>{
      if(opened)return;
      opened=true;
      popup.hidden=false;
      trigger.setAttribute('aria-expanded','true');
      picker.classList.add('atlasLanguageOpen');
      positionPopup();
      const chosen=buttons.get(activeLanguage)||buttons.get('en');
      chosen?.focus();
      chosen?.scrollIntoView({block:'nearest'});
    };
    const selectLanguage=code=>{
      if(!buttons.has(code))return;
      try{localStorage.setItem('placement-atlas-language-v1',code);}catch{}
      syncURLLanguage(code);
      applyLanguage(code);
      updateSelected();
      closePopup(true);
    };
    trigger.addEventListener('click',()=>opened?closePopup():openPopup());
    trigger.addEventListener('keydown',event=>{
      if(['ArrowDown','ArrowUp','Enter',' '].includes(event.key)){
        event.preventDefault();
        if(!opened)openPopup();
        if(event.key==='ArrowUp')buttons.get(LANGUAGES[LANGUAGES.length-1][0])?.focus();
      }
    });
    list.addEventListener('click',event=>{
      const option=event.target.closest('button[data-language]');
      if(option)selectLanguage(option.dataset.language);
    });
    list.addEventListener('keydown',event=>{
      if(event.key==='Escape'){event.preventDefault();closePopup(true);return;}
      if(event.key==='Tab'){closePopup();return;}
      if(!['ArrowDown','ArrowUp','Home','End'].includes(event.key))return;
      event.preventDefault();
      const focused=event.target.closest('button[data-language]');
      const i=LANGUAGES.findIndex(([code])=>code===focused?.dataset.language);
      let next=0;
      if(event.key==='Home')next=0;
      else if(event.key==='End')next=LANGUAGES.length-1;
      else next=(i+(event.key==='ArrowUp'?-1:1)+LANGUAGES.length)%LANGUAGES.length;
      buttons.get(LANGUAGES[next][0])?.focus();
    });
    document.addEventListener('pointerdown',event=>{
      if(opened&&!picker.contains(event.target)&&!popup.contains(event.target))closePopup();
    },true);
    document.addEventListener('keydown',event=>{
      if(opened&&event.key==='Escape'){event.preventDefault();closePopup(true);}
    });
    window.addEventListener('resize',positionPopup,{passive:true});
    window.addEventListener('scroll',positionPopup,{passive:true,capture:true});
    document.addEventListener('placementatlas:languagechange',updateSelected);
    updateSelected();
    return picker;
  }

  function init() {
    mountSelector();
    let saved='en';
    saved=getSavedLanguage();
    applyLanguage(saved);
    if(observer)observer.disconnect();
    let pending=[];
    let scheduled=false;
    const flush=()=>{
      scheduled=false;
      const nodes=pending;
      pending=[];
      // One pass per unique changed node to avoid repeatedly traversing
      // dynamic programme content in the same animation frame.
      for(const node of new Set(nodes))walk(node);
    };
    observer=new MutationObserver(records=>{
      for(const record of records){
        if(record.type==='characterData')pending.push(record.target);
        else for(const node of record.addedNodes)pending.push(node);
      }
      if(pending.length&&!scheduled){
        scheduled=true;
        requestAnimationFrame(flush);
      }
    });
    observer.observe(document.body,{childList:true,subtree:true,characterData:true});
    document.addEventListener('desk:after-navigation',()=>walk(document.body));
    document.addEventListener('placementatlas:refresh-translation',e=>walk(e.detail?.root||document.body));
    window.PlacementAtlasTranslateUI=root=>walk(root||document.body);
    window.addEventListener('popstate',()=>{
      const code=new URL(location.href).searchParams.get('lang');
      const selected=(code&&LANGUAGES.some(([value])=>value===code))?code:getSavedLanguage();
      if(selected!==activeLanguage)applyLanguage(selected);
    });

  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();