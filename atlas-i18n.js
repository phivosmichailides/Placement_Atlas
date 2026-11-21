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
    ['pt', '🇵🇹 Português'],
    ['it', '🇮🇹 Italiano'],
    ['de', '🇩🇪 Deutsch'],
    ['nl', '🇳🇱 Nederlands'],
    ['fa', '🇮🇷 فارسی'],
    ['tr', '🇹🇷 Türkçe'],
    ['ps', '🇦🇫 پښتو'],
    ['ckb', '🇮🇶 سۆرانی'],
    ['so', '🇸🇴 Soomaali'],
    ['uk', '🇺🇦 Українська']
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
    header.append(picker);
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
    try{saved=localStorage.getItem('placement-atlas-language-v1')||'en';}catch{}
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
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();