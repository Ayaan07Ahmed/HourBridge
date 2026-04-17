const CLIENT_TYPES = ['Client', 'Partner', 'Other'];
const STORAGE_KEY = 'worldclock-timezones';
const USER_NAME_KEY = 'worldclock-user-name';
const THEME_KEY = 'worldclock-theme';
const FORMAT_KEY = 'worldclock-24h';
const DB_NAME = 'hourbridge-db';
const DB_VERSION = 1;
const EVENTS_STORE = 'events';

const CARD_COLORS = ['#e94560', '#0fbcbc', '#f0a500', '#9b5de5', '#ff6b35'];

// --- Reference data tables ---

// ISO 3166-1 alpha-2 country codes, mapped from lowercase country name
const COUNTRY_CODES = {
    'afghanistan': 'AF', 'albania': 'AL', 'algeria': 'DZ', 'argentina': 'AR',
    'australia': 'AU', 'austria': 'AT', 'azerbaijan': 'AZ', 'bahrain': 'BH',
    'bangladesh': 'BD', 'belgium': 'BE', 'bolivia': 'BO', 'brazil': 'BR',
    'brunei': 'BN', 'bulgaria': 'BG', 'cambodia': 'KH', 'canada': 'CA',
    'chile': 'CL', 'china': 'CN', 'colombia': 'CO', 'costa rica': 'CR',
    'croatia': 'HR', 'cuba': 'CU', 'cyprus': 'CY', 'czech republic': 'CZ',
    'czechia': 'CZ', 'denmark': 'DK', 'dominican republic': 'DO',
    'ecuador': 'EC', 'egypt': 'EG', 'el salvador': 'SV', 'estonia': 'EE',
    'ethiopia': 'ET', 'fiji': 'FJ', 'finland': 'FI', 'france': 'FR',
    'georgia': 'GE', 'germany': 'DE', 'ghana': 'GH', 'greece': 'GR',
    'guatemala': 'GT', 'honduras': 'HN', 'hong kong': 'HK', 'hungary': 'HU',
    'iceland': 'IS', 'india': 'IN', 'indonesia': 'ID', 'iran': 'IR',
    'iraq': 'IQ', 'ireland': 'IE', 'israel': 'IL', 'italy': 'IT',
    'ivory coast': 'CI', 'jamaica': 'JM', 'japan': 'JP', 'jordan': 'JO',
    'kazakhstan': 'KZ', 'kenya': 'KE', 'south korea': 'KR', 'north korea': 'KP',
    'kuwait': 'KW', 'kyrgyzstan': 'KG', 'laos': 'LA', 'latvia': 'LV',
    'lebanon': 'LB', 'libya': 'LY', 'lithuania': 'LT', 'luxembourg': 'LU',
    'malaysia': 'MY', 'maldives': 'MV', 'malta': 'MT', 'mexico': 'MX',
    'mongolia': 'MN', 'morocco': 'MA', 'myanmar': 'MM', 'nepal': 'NP',
    'netherlands': 'NL', 'new zealand': 'NZ', 'nicaragua': 'NI', 'nigeria': 'NG',
    'norway': 'NO', 'oman': 'OM', 'pakistan': 'PK', 'palestine': 'PS',
    'panama': 'PA', 'paraguay': 'PY', 'peru': 'PE', 'philippines': 'PH',
    'poland': 'PL', 'portugal': 'PT', 'qatar': 'QA', 'romania': 'RO',
    'russia': 'RU', 'saudi arabia': 'SA', 'serbia': 'RS', 'singapore': 'SG',
    'slovakia': 'SK', 'slovenia': 'SI', 'somalia': 'SO', 'south africa': 'ZA',
    'spain': 'ES', 'sri lanka': 'LK', 'sudan': 'SD', 'sweden': 'SE',
    'switzerland': 'CH', 'syria': 'SY', 'taiwan': 'TW', 'tajikistan': 'TJ',
    'tanzania': 'TZ', 'thailand': 'TH', 'tunisia': 'TN', 'turkey': 'TR',
    'turkmenistan': 'TM', 'uae': 'AE', 'united arab emirates': 'AE',
    'uganda': 'UG', 'uk': 'GB', 'united kingdom': 'GB', 'britain': 'GB',
    'england': 'GB', 'scotland': 'GB', 'wales': 'GB', 'ukraine': 'UA',
    'uruguay': 'UY', 'us': 'US', 'usa': 'US', 'united states': 'US',
    'uzbekistan': 'UZ', 'venezuela': 'VE', 'vietnam': 'VN', 'yemen': 'YE',
    'zambia': 'ZM', 'zimbabwe': 'ZW',
};

// International dialing codes by ISO country code
const DIAL_CODES = {
    AF: '+93', AL: '+355', DZ: '+213', AR: '+54', AU: '+61', AT: '+43',
    AZ: '+994', BH: '+973', BD: '+880', BE: '+32', BO: '+591', BR: '+55',
    BN: '+673', BG: '+359', KH: '+855', CA: '+1', CL: '+56', CN: '+86',
    CO: '+57', CR: '+506', HR: '+385', CU: '+53', CY: '+357', CZ: '+420',
    DK: '+45', DO: '+1', EC: '+593', EG: '+20', SV: '+503', EE: '+372',
    ET: '+251', FJ: '+679', FI: '+358', FR: '+33', GE: '+995', DE: '+49',
    GH: '+233', GR: '+30', GT: '+502', HN: '+504', HK: '+852', HU: '+36',
    IS: '+354', IN: '+91', ID: '+62', IR: '+98', IQ: '+964', IE: '+353',
    IL: '+972', IT: '+39', CI: '+225', JM: '+1', JP: '+81', JO: '+962',
    KZ: '+7', KE: '+254', KR: '+82', KP: '+850', KW: '+965', KG: '+996',
    LA: '+856', LV: '+371', LB: '+961', LY: '+218', LT: '+370', LU: '+352',
    MY: '+60', MV: '+960', MT: '+356', MX: '+52', MN: '+976', MA: '+212',
    MM: '+95', NP: '+977', NL: '+31', NZ: '+64', NI: '+505', NG: '+234',
    NO: '+47', OM: '+968', PK: '+92', PS: '+970', PA: '+507', PY: '+595',
    PE: '+51', PH: '+63', PL: '+48', PT: '+351', QA: '+974', RO: '+40',
    RU: '+7', SA: '+966', RS: '+381', SG: '+65', SK: '+421', SI: '+386',
    SO: '+252', ZA: '+27', ES: '+34', LK: '+94', SD: '+249', SE: '+46',
    CH: '+41', SY: '+963', TW: '+886', TJ: '+992', TZ: '+255', TH: '+66',
    TN: '+216', TR: '+90', TM: '+993', AE: '+971', UG: '+256', GB: '+44',
    UA: '+380', UY: '+598', US: '+1', UZ: '+998', VE: '+58', VN: '+84',
    YE: '+967', ZM: '+260', ZW: '+263',
};

// ISO 4217 currency codes by ISO country code
const CURRENCY_CODES = {
    AF: 'AFN', AL: 'ALL', DZ: 'DZD', AR: 'ARS', AU: 'AUD', AT: 'EUR',
    AZ: 'AZN', BH: 'BHD', BD: 'BDT', BE: 'EUR', BO: 'BOB', BR: 'BRL',
    BN: 'BND', BG: 'BGN', KH: 'KHR', CA: 'CAD', CL: 'CLP', CN: 'CNY',
    CO: 'COP', CR: 'CRC', HR: 'EUR', CU: 'CUP', CY: 'EUR', CZ: 'CZK',
    DK: 'DKK', DO: 'DOP', EC: 'USD', EG: 'EGP', SV: 'USD', EE: 'EUR',
    ET: 'ETB', FJ: 'FJD', FI: 'EUR', FR: 'EUR', GE: 'GEL', DE: 'EUR',
    GH: 'GHS', GR: 'EUR', GT: 'GTQ', HN: 'HNL', HK: 'HKD', HU: 'HUF',
    IS: 'ISK', IN: 'INR', ID: 'IDR', IR: 'IRR', IQ: 'IQD', IE: 'EUR',
    IL: 'ILS', IT: 'EUR', CI: 'XOF', JM: 'JMD', JP: 'JPY', JO: 'JOD',
    KZ: 'KZT', KE: 'KES', KR: 'KRW', KP: 'KPW', KW: 'KWD', KG: 'KGS',
    LA: 'LAK', LV: 'EUR', LB: 'LBP', LY: 'LYD', LT: 'EUR', LU: 'EUR',
    MY: 'MYR', MV: 'MVR', MT: 'EUR', MX: 'MXN', MN: 'MNT', MA: 'MAD',
    MM: 'MMK', NP: 'NPR', NL: 'EUR', NZ: 'NZD', NI: 'NIO', NG: 'NGN',
    NO: 'NOK', OM: 'OMR', PK: 'PKR', PS: 'ILS', PA: 'PAB', PY: 'PYG',
    PE: 'PEN', PH: 'PHP', PL: 'PLN', PT: 'EUR', QA: 'QAR', RO: 'RON',
    RU: 'RUB', SA: 'SAR', RS: 'RSD', SG: 'SGD', SK: 'EUR', SI: 'EUR',
    SO: 'SOS', ZA: 'ZAR', ES: 'EUR', LK: 'LKR', SD: 'SDG', SE: 'SEK',
    CH: 'CHF', SY: 'SYP', TW: 'TWD', TJ: 'TJS', TZ: 'TZS', TH: 'THB',
    TN: 'TND', TR: 'TRY', TM: 'TMT', AE: 'AED', UG: 'UGX', GB: 'GBP',
    UA: 'UAH', UY: 'UYU', US: 'USD', UZ: 'UZS', VE: 'VES', VN: 'VND',
    YE: 'YER', ZM: 'ZMW', ZW: 'ZWL',
};

// Public holidays — keyed by ISO country code, covers 2025/2026 major ones
// Only fixed-date holidays that apply to most regions; some Easter/variable dates included
const HOLIDAYS = {
    GB: [
        { date: '2025-12-25', name: 'Christmas Day' },
        { date: '2025-12-26', name: 'Boxing Day' },
        { date: '2026-01-01', name: "New Year's Day" },
        { date: '2026-04-03', name: 'Good Friday' },
        { date: '2026-04-06', name: 'Easter Monday' },
        { date: '2026-05-04', name: 'Early May Bank Holiday' },
        { date: '2026-05-25', name: 'Spring Bank Holiday' },
        { date: '2026-08-31', name: 'Summer Bank Holiday' },
        { date: '2026-12-25', name: 'Christmas Day' },
        { date: '2026-12-28', name: 'Boxing Day (substitute)' },
    ],
    US: [
        { date: '2025-12-25', name: 'Christmas Day' },
        { date: '2026-01-01', name: "New Year's Day" },
        { date: '2026-01-19', name: 'Martin Luther King Jr. Day' },
        { date: '2026-02-16', name: "Presidents' Day" },
        { date: '2026-05-25', name: 'Memorial Day' },
        { date: '2026-06-19', name: 'Juneteenth' },
        { date: '2026-07-03', name: 'Independence Day (observed)' },
        { date: '2026-07-04', name: 'Independence Day' },
        { date: '2026-09-07', name: 'Labor Day' },
        { date: '2026-11-11', name: 'Veterans Day' },
        { date: '2026-11-26', name: 'Thanksgiving' },
        { date: '2026-12-25', name: 'Christmas Day' },
    ],
    CA: [
        { date: '2026-01-01', name: "New Year's Day" },
        { date: '2026-04-03', name: 'Good Friday' },
        { date: '2026-05-18', name: 'Victoria Day' },
        { date: '2026-07-01', name: 'Canada Day' },
        { date: '2026-09-07', name: 'Labour Day' },
        { date: '2026-10-12', name: 'Thanksgiving' },
        { date: '2026-12-25', name: 'Christmas Day' },
        { date: '2026-12-28', name: 'Boxing Day (observed)' },
    ],
    IN: [
        { date: '2026-01-26', name: 'Republic Day' },
        { date: '2026-03-04', name: 'Holi' },
        { date: '2026-08-15', name: 'Independence Day' },
        { date: '2026-10-02', name: 'Gandhi Jayanti' },
        { date: '2026-11-08', name: 'Diwali' },
        { date: '2026-12-25', name: 'Christmas Day' },
    ],
    JP: [
        { date: '2026-01-01', name: "New Year's Day" },
        { date: '2026-01-12', name: 'Coming of Age Day' },
        { date: '2026-02-11', name: 'National Foundation Day' },
        { date: '2026-02-23', name: "Emperor's Birthday" },
        { date: '2026-04-29', name: 'Showa Day' },
        { date: '2026-05-03', name: 'Constitution Day' },
        { date: '2026-05-05', name: 'Children\'s Day' },
        { date: '2026-11-03', name: 'Culture Day' },
        { date: '2026-11-23', name: 'Labor Thanksgiving Day' },
    ],
    CN: [
        { date: '2026-01-01', name: "New Year's Day" },
        { date: '2026-02-17', name: 'Chinese New Year' },
        { date: '2026-04-05', name: 'Qingming Festival' },
        { date: '2026-05-01', name: 'Labour Day' },
        { date: '2026-06-19', name: 'Dragon Boat Festival' },
        { date: '2026-09-25', name: 'Mid-Autumn Festival' },
        { date: '2026-10-01', name: 'National Day' },
    ],
    DE: [
        { date: '2026-01-01', name: 'Neujahr' },
        { date: '2026-04-03', name: 'Karfreitag' },
        { date: '2026-04-06', name: 'Ostermontag' },
        { date: '2026-05-01', name: 'Tag der Arbeit' },
        { date: '2026-10-03', name: 'Tag der Deutschen Einheit' },
        { date: '2026-12-25', name: 'Erster Weihnachtstag' },
        { date: '2026-12-26', name: 'Zweiter Weihnachtstag' },
    ],
    FR: [
        { date: '2026-01-01', name: 'Jour de l\'An' },
        { date: '2026-04-06', name: 'Lundi de Pâques' },
        { date: '2026-05-01', name: 'Fête du Travail' },
        { date: '2026-05-08', name: 'Victoire 1945' },
        { date: '2026-07-14', name: 'Fête Nationale' },
        { date: '2026-08-15', name: 'Assomption' },
        { date: '2026-11-01', name: 'Toussaint' },
        { date: '2026-11-11', name: 'Armistice 1918' },
        { date: '2026-12-25', name: 'Noël' },
    ],
    ES: [
        { date: '2026-01-01', name: 'Año Nuevo' },
        { date: '2026-01-06', name: 'Epifanía del Señor' },
        { date: '2026-04-03', name: 'Viernes Santo' },
        { date: '2026-05-01', name: 'Día del Trabajo' },
        { date: '2026-08-15', name: 'Asunción de la Virgen' },
        { date: '2026-10-12', name: 'Fiesta Nacional' },
        { date: '2026-11-01', name: 'Todos los Santos' },
        { date: '2026-12-06', name: 'Día de la Constitución' },
        { date: '2026-12-08', name: 'Inmaculada Concepción' },
        { date: '2026-12-25', name: 'Navidad' },
    ],
    IT: [
        { date: '2026-01-01', name: 'Capodanno' },
        { date: '2026-01-06', name: 'Epifania' },
        { date: '2026-04-06', name: 'Pasquetta' },
        { date: '2026-04-25', name: 'Festa della Liberazione' },
        { date: '2026-05-01', name: 'Festa del Lavoro' },
        { date: '2026-06-02', name: 'Festa della Repubblica' },
        { date: '2026-08-15', name: 'Ferragosto' },
        { date: '2026-12-25', name: 'Natale' },
        { date: '2026-12-26', name: 'Santo Stefano' },
    ],
    BR: [
        { date: '2026-01-01', name: 'Ano Novo' },
        { date: '2026-02-17', name: 'Carnaval' },
        { date: '2026-04-03', name: 'Sexta-feira Santa' },
        { date: '2026-04-21', name: 'Tiradentes' },
        { date: '2026-05-01', name: 'Dia do Trabalho' },
        { date: '2026-09-07', name: 'Independência' },
        { date: '2026-10-12', name: 'N. Sra. Aparecida' },
        { date: '2026-11-02', name: 'Finados' },
        { date: '2026-11-15', name: 'Proclamação da República' },
        { date: '2026-12-25', name: 'Natal' },
    ],
    MX: [
        { date: '2026-01-01', name: 'Año Nuevo' },
        { date: '2026-02-02', name: 'Día de la Constitución' },
        { date: '2026-03-16', name: 'Natalicio de Benito Juárez' },
        { date: '2026-05-01', name: 'Día del Trabajo' },
        { date: '2026-09-16', name: 'Día de la Independencia' },
        { date: '2026-11-16', name: 'Día de la Revolución' },
        { date: '2026-12-25', name: 'Navidad' },
    ],
    AU: [
        { date: '2026-01-01', name: "New Year's Day" },
        { date: '2026-01-26', name: 'Australia Day' },
        { date: '2026-04-03', name: 'Good Friday' },
        { date: '2026-04-06', name: 'Easter Monday' },
        { date: '2026-04-25', name: 'Anzac Day' },
        { date: '2026-12-25', name: 'Christmas Day' },
        { date: '2026-12-28', name: 'Boxing Day (observed)' },
    ],
    NL: [
        { date: '2026-01-01', name: 'Nieuwjaarsdag' },
        { date: '2026-04-03', name: 'Goede Vrijdag' },
        { date: '2026-04-06', name: 'Tweede Paasdag' },
        { date: '2026-04-27', name: 'Koningsdag' },
        { date: '2026-05-05', name: 'Bevrijdingsdag' },
        { date: '2026-12-25', name: 'Eerste Kerstdag' },
        { date: '2026-12-26', name: 'Tweede Kerstdag' },
    ],
    SG: [
        { date: '2026-01-01', name: "New Year's Day" },
        { date: '2026-02-17', name: 'Chinese New Year' },
        { date: '2026-04-03', name: 'Good Friday' },
        { date: '2026-05-01', name: 'Labour Day' },
        { date: '2026-08-09', name: 'National Day' },
        { date: '2026-12-25', name: 'Christmas Day' },
    ],
    AE: [
        { date: '2026-01-01', name: "New Year's Day" },
        { date: '2026-12-02', name: 'UAE National Day' },
        { date: '2026-12-03', name: 'UAE National Day Holiday' },
    ],
    ZA: [
        { date: '2026-01-01', name: "New Year's Day" },
        { date: '2026-03-21', name: 'Human Rights Day' },
        { date: '2026-04-03', name: 'Good Friday' },
        { date: '2026-04-27', name: 'Freedom Day' },
        { date: '2026-05-01', name: 'Workers\' Day' },
        { date: '2026-06-16', name: 'Youth Day' },
        { date: '2026-08-09', name: 'Women\'s Day' },
        { date: '2026-09-24', name: 'Heritage Day' },
        { date: '2026-12-16', name: 'Day of Reconciliation' },
        { date: '2026-12-25', name: 'Christmas Day' },
        { date: '2026-12-26', name: 'Day of Goodwill' },
    ],
    RU: [
        { date: '2026-01-01', name: 'New Year' },
        { date: '2026-01-07', name: 'Orthodox Christmas' },
        { date: '2026-02-23', name: 'Defender of the Fatherland' },
        { date: '2026-03-08', name: "International Women's Day" },
        { date: '2026-05-01', name: 'Spring and Labour Day' },
        { date: '2026-05-09', name: 'Victory Day' },
        { date: '2026-06-12', name: 'Russia Day' },
        { date: '2026-11-04', name: 'Unity Day' },
    ],
    KR: [
        { date: '2026-01-01', name: "New Year's Day" },
        { date: '2026-02-17', name: 'Seollal' },
        { date: '2026-03-01', name: 'Independence Movement Day' },
        { date: '2026-05-05', name: 'Children\'s Day' },
        { date: '2026-06-06', name: 'Memorial Day' },
        { date: '2026-08-15', name: 'Liberation Day' },
        { date: '2026-10-03', name: 'National Foundation Day' },
        { date: '2026-10-09', name: 'Hangul Day' },
        { date: '2026-12-25', name: 'Christmas Day' },
    ],
    SA: [
        { date: '2026-09-23', name: 'Saudi National Day' },
    ],
    TR: [
        { date: '2026-01-01', name: "New Year's Day" },
        { date: '2026-04-23', name: 'National Sovereignty Day' },
        { date: '2026-05-01', name: 'Labour Day' },
        { date: '2026-05-19', name: 'Commemoration of Atatürk' },
        { date: '2026-07-15', name: 'Democracy Day' },
        { date: '2026-08-30', name: 'Victory Day' },
        { date: '2026-10-29', name: 'Republic Day' },
    ],
    CH: [
        { date: '2026-01-01', name: 'Neujahrstag' },
        { date: '2026-04-03', name: 'Karfreitag' },
        { date: '2026-04-06', name: 'Ostermontag' },
        { date: '2026-05-01', name: 'Tag der Arbeit' },
        { date: '2026-08-01', name: 'Bundesfeier' },
        { date: '2026-12-25', name: 'Weihnachten' },
        { date: '2026-12-26', name: 'Stephanstag' },
    ],
    SE: [
        { date: '2026-01-01', name: 'Nyårsdagen' },
        { date: '2026-01-06', name: 'Trettondag jul' },
        { date: '2026-04-03', name: 'Långfredagen' },
        { date: '2026-04-06', name: 'Annandag påsk' },
        { date: '2026-05-01', name: 'Första maj' },
        { date: '2026-06-06', name: 'Sveriges nationaldag' },
        { date: '2026-12-25', name: 'Juldagen' },
        { date: '2026-12-26', name: 'Annandag jul' },
    ],
    IE: [
        { date: '2026-01-01', name: "New Year's Day" },
        { date: '2026-03-17', name: "St. Patrick's Day" },
        { date: '2026-04-06', name: 'Easter Monday' },
        { date: '2026-05-04', name: 'May Day' },
        { date: '2026-06-01', name: 'June Bank Holiday' },
        { date: '2026-08-03', name: 'August Bank Holiday' },
        { date: '2026-10-26', name: 'October Bank Holiday' },
        { date: '2026-12-25', name: 'Christmas Day' },
        { date: '2026-12-26', name: "St. Stephen's Day" },
    ],
    NZ: [
        { date: '2026-01-01', name: "New Year's Day" },
        { date: '2026-02-06', name: 'Waitangi Day' },
        { date: '2026-04-03', name: 'Good Friday' },
        { date: '2026-04-06', name: 'Easter Monday' },
        { date: '2026-04-25', name: 'Anzac Day' },
        { date: '2026-12-25', name: 'Christmas Day' },
        { date: '2026-12-28', name: 'Boxing Day (observed)' },
    ],
    PK: [
        { date: '2026-02-05', name: 'Kashmir Day' },
        { date: '2026-03-23', name: 'Pakistan Day' },
        { date: '2026-05-01', name: 'Labour Day' },
        { date: '2026-08-14', name: 'Independence Day' },
        { date: '2026-12-25', name: 'Quaid-e-Azam Day' },
    ],
};

// --- IndexedDB helpers (for events/calendar) ---

let dbPromise = null;

function openDB() {
    if (dbPromise) return dbPromise;
    dbPromise = new Promise((resolve, reject) => {
        const req = indexedDB.open(DB_NAME, DB_VERSION);
        req.onupgradeneeded = () => {
            const db = req.result;
            if (!db.objectStoreNames.contains(EVENTS_STORE)) {
                db.createObjectStore(EVENTS_STORE, { keyPath: 'id', autoIncrement: true });
            }
        };
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    });
    return dbPromise;
}

async function addEvent(evt) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(EVENTS_STORE, 'readwrite');
        const req = tx.objectStore(EVENTS_STORE).add(evt);
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    });
}

async function getAllEvents() {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(EVENTS_STORE, 'readonly');
        const req = tx.objectStore(EVENTS_STORE).getAll();
        req.onsuccess = () => resolve(req.result || []);
        req.onerror = () => reject(req.error);
    });
}

async function deleteEvent(id) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(EVENTS_STORE, 'readwrite');
        const req = tx.objectStore(EVENTS_STORE).delete(id);
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
    });
}

async function updateEvent(evt) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(EVENTS_STORE, 'readwrite');
        const req = tx.objectStore(EVENTS_STORE).put(evt);
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    });
}

// Timezone search widget (lives inside the client form)
const searchInput = document.getElementById('client-tz-search');
const dropdownList = document.getElementById('client-tz-list');

// Client form refs
const addClientBtn = document.getElementById('add-client-btn');
const clientForm = document.getElementById('client-form');
const clientNameInput = document.getElementById('client-name-input');
const clientNotesInput = document.getElementById('client-notes-input');
const clientSaveBtn = document.getElementById('client-save-btn');
const clientCancelBtn = document.getElementById('client-cancel-btn');
const clocksContainer = document.getElementById('clocks');
const localClockEl = document.getElementById('local-clock');
const localGreetingEl = document.getElementById('local-greeting');
const themeToggle = document.getElementById('theme-toggle');
const formatToggle = document.getElementById('format-toggle');
const meetingBtn = document.getElementById('meeting-btn');
const meetingPlanner = document.getElementById('meeting-planner');
const calendarBtn = document.getElementById('calendar-btn');
const calendarPanel = document.getElementById('calendar-panel');
const todaysEventsEl = document.getElementById('todays-events');
const eventsList = document.getElementById('events-list');
const addEventBtn = document.getElementById('add-event-btn');
const eventForm = document.getElementById('event-form');
const eventFormTitle = document.getElementById('event-title-input');
const eventFormDate = document.getElementById('event-date-input');
const eventFormTime = document.getElementById('event-time-input');
const eventFormTz = document.getElementById('event-tz-input');
const eventFormNotes = document.getElementById('event-notes-input');
const eventFormLinks = document.getElementById('event-links-input');
const eventFormColor = document.getElementById('event-color-input');
const eventFormClient = document.getElementById('event-client-input');
const eventSaveBtn = document.getElementById('event-save-btn');
const eventCancelBtn = document.getElementById('event-cancel-btn');

let activeClients = []; // Array of { id, name, type, tz, color, businessStart, businessEnd, notes, links }
let allTimezones = [];
let selectedTz = '';
let activeIndex = -1;
let intervalId = null;
let use24h = false;
let dragSrcIndex = null;
let cachedEvents = [];
let selectedMpHour = null; // Selected hour in meeting planner (0-23, local time)
let editingEventId = null; // If non-null, event form is editing this event
let editingClientId = null; // If non-null, client form is editing this client
let userName = ''; // User's own name, shown in the greeting
let isEditingName = false; // Skip greeting re-render while editing

const localTz = Intl.DateTimeFormat().resolvedOptions().timeZone;

// --- Theme ---

function loadTheme() {
    const isLight = localStorage.getItem(THEME_KEY) === 'light';
    if (isLight) {
        document.documentElement.setAttribute('data-theme', 'light');
    }
    themeToggle.checked = isLight;
}

themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem(THEME_KEY, 'light');
    } else {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem(THEME_KEY, 'dark');
    }
});

// --- 12/24h format ---

function loadFormat() {
    use24h = localStorage.getItem(FORMAT_KEY) === 'true';
    formatToggle.checked = use24h;
}

formatToggle.addEventListener('change', () => {
    use24h = formatToggle.checked;
    localStorage.setItem(FORMAT_KEY, use24h);
    renderClocks();
    renderLocalClock();
});

// --- Timezone data ---

const COUNTRY_TIMEZONES = {
    'afghanistan': ['Asia/Kabul'],
    'albania': ['Europe/Tirane'],
    'algeria': ['Africa/Algiers'],
    'argentina': ['America/Argentina/Buenos_Aires'],
    'australia': ['Australia/Sydney', 'Australia/Melbourne', 'Australia/Brisbane', 'Australia/Perth', 'Australia/Adelaide', 'Australia/Darwin', 'Australia/Hobart'],
    'austria': ['Europe/Vienna'],
    'azerbaijan': ['Asia/Baku'],
    'bahrain': ['Asia/Bahrain'],
    'bangladesh': ['Asia/Dhaka'],
    'belgium': ['Europe/Brussels'],
    'bolivia': ['America/La_Paz'],
    'brazil': ['America/Sao_Paulo', 'America/Manaus', 'America/Recife', 'America/Fortaleza'],
    'brunei': ['Asia/Brunei'],
    'bulgaria': ['Europe/Sofia'],
    'cambodia': ['Asia/Phnom_Penh'],
    'canada': ['America/Toronto', 'America/Vancouver', 'America/Edmonton', 'America/Winnipeg', 'America/Halifax', 'America/St_Johns'],
    'chile': ['America/Santiago'],
    'china': ['Asia/Shanghai', 'Asia/Hong_Kong'],
    'colombia': ['America/Bogota'],
    'costa rica': ['America/Costa_Rica'],
    'croatia': ['Europe/Zagreb'],
    'cuba': ['America/Havana'],
    'cyprus': ['Asia/Nicosia'],
    'czech republic': ['Europe/Prague'],
    'czechia': ['Europe/Prague'],
    'denmark': ['Europe/Copenhagen'],
    'dominican republic': ['America/Santo_Domingo'],
    'ecuador': ['America/Guayaquil'],
    'egypt': ['Africa/Cairo'],
    'el salvador': ['America/El_Salvador'],
    'estonia': ['Europe/Tallinn'],
    'ethiopia': ['Africa/Addis_Ababa'],
    'fiji': ['Pacific/Fiji'],
    'finland': ['Europe/Helsinki'],
    'france': ['Europe/Paris'],
    'georgia': ['Asia/Tbilisi'],
    'germany': ['Europe/Berlin'],
    'ghana': ['Africa/Accra'],
    'greece': ['Europe/Athens'],
    'guatemala': ['America/Guatemala'],
    'honduras': ['America/Tegucigalpa'],
    'hong kong': ['Asia/Hong_Kong'],
    'hungary': ['Europe/Budapest'],
    'iceland': ['Atlantic/Reykjavik'],
    'india': ['Asia/Kolkata'],
    'indonesia': ['Asia/Jakarta', 'Asia/Makassar', 'Asia/Jayapura'],
    'iran': ['Asia/Tehran'],
    'iraq': ['Asia/Baghdad'],
    'ireland': ['Europe/Dublin'],
    'israel': ['Asia/Jerusalem'],
    'italy': ['Europe/Rome'],
    'ivory coast': ['Africa/Abidjan'],
    'jamaica': ['America/Jamaica'],
    'japan': ['Asia/Tokyo'],
    'jordan': ['Asia/Amman'],
    'kazakhstan': ['Asia/Almaty', 'Asia/Aqtau'],
    'kenya': ['Africa/Nairobi'],
    'korea': ['Asia/Seoul'],
    'south korea': ['Asia/Seoul'],
    'north korea': ['Asia/Pyongyang'],
    'kuwait': ['Asia/Kuwait'],
    'kyrgyzstan': ['Asia/Bishkek'],
    'laos': ['Asia/Vientiane'],
    'latvia': ['Europe/Riga'],
    'lebanon': ['Asia/Beirut'],
    'libya': ['Africa/Tripoli'],
    'lithuania': ['Europe/Vilnius'],
    'luxembourg': ['Europe/Luxembourg'],
    'malaysia': ['Asia/Kuala_Lumpur'],
    'maldives': ['Indian/Maldives'],
    'malta': ['Europe/Malta'],
    'mexico': ['America/Mexico_City', 'America/Cancun', 'America/Tijuana'],
    'mongolia': ['Asia/Ulaanbaatar'],
    'morocco': ['Africa/Casablanca'],
    'myanmar': ['Asia/Yangon'],
    'nepal': ['Asia/Kathmandu'],
    'netherlands': ['Europe/Amsterdam'],
    'new zealand': ['Pacific/Auckland'],
    'nicaragua': ['America/Managua'],
    'nigeria': ['Africa/Lagos'],
    'norway': ['Europe/Oslo'],
    'oman': ['Asia/Muscat'],
    'pakistan': ['Asia/Karachi'],
    'palestine': ['Asia/Gaza', 'Asia/Hebron'],
    'panama': ['America/Panama'],
    'paraguay': ['America/Asuncion'],
    'peru': ['America/Lima'],
    'philippines': ['Asia/Manila'],
    'poland': ['Europe/Warsaw'],
    'portugal': ['Europe/Lisbon'],
    'qatar': ['Asia/Qatar'],
    'romania': ['Europe/Bucharest'],
    'russia': ['Europe/Moscow', 'Asia/Yekaterinburg', 'Asia/Novosibirsk', 'Asia/Vladivostok', 'Asia/Kamchatka'],
    'saudi arabia': ['Asia/Riyadh'],
    'serbia': ['Europe/Belgrade'],
    'singapore': ['Asia/Singapore'],
    'slovakia': ['Europe/Bratislava'],
    'slovenia': ['Europe/Ljubljana'],
    'somalia': ['Africa/Mogadishu'],
    'south africa': ['Africa/Johannesburg'],
    'spain': ['Europe/Madrid'],
    'sri lanka': ['Asia/Colombo'],
    'sudan': ['Africa/Khartoum'],
    'sweden': ['Europe/Stockholm'],
    'switzerland': ['Europe/Zurich'],
    'syria': ['Asia/Damascus'],
    'taiwan': ['Asia/Taipei'],
    'tajikistan': ['Asia/Dushanbe'],
    'tanzania': ['Africa/Dar_es_Salaam'],
    'thailand': ['Asia/Bangkok'],
    'tunisia': ['Africa/Tunis'],
    'turkey': ['Europe/Istanbul'],
    'turkmenistan': ['Asia/Ashgabat'],
    'uae': ['Asia/Dubai'],
    'united arab emirates': ['Asia/Dubai'],
    'uganda': ['Africa/Kampala'],
    'uk': ['Europe/London'],
    'united kingdom': ['Europe/London'],
    'britain': ['Europe/London'],
    'england': ['Europe/London'],
    'scotland': ['Europe/London'],
    'wales': ['Europe/London'],
    'ukraine': ['Europe/Kyiv'],
    'uruguay': ['America/Montevideo'],
    'us': ['America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles', 'America/Anchorage', 'Pacific/Honolulu'],
    'usa': ['America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles', 'America/Anchorage', 'Pacific/Honolulu'],
    'united states': ['America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles', 'America/Anchorage', 'Pacific/Honolulu'],
    'america': ['America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles'],
    'uzbekistan': ['Asia/Tashkent'],
    'venezuela': ['America/Caracas'],
    'vietnam': ['Asia/Ho_Chi_Minh'],
    'yemen': ['Asia/Aden'],
    'zambia': ['Africa/Lusaka'],
    'zimbabwe': ['Africa/Harare'],
};

function loadTimezones() {
    allTimezones = Intl.supportedValuesOf('timeZone');
}

function filterTimezones(query) {
    if (!query) return allTimezones.slice(0, 30);
    const lower = query.toLowerCase();

    // Collect timezone matches from country mapping
    const countryMatches = new Set();
    for (const [country, zones] of Object.entries(COUNTRY_TIMEZONES)) {
        if (country.includes(lower)) {
            zones.forEach(tz => countryMatches.add(tz));
        }
    }

    // Filter by timezone name as before
    const nameMatches = allTimezones.filter(tz =>
        tz.toLowerCase().replace(/_/g, ' ').includes(lower)
    );

    // Merge: country matches first, then name matches (no duplicates)
    const seen = new Set();
    const results = [];
    for (const tz of [...countryMatches, ...nameMatches]) {
        if (!seen.has(tz)) {
            seen.add(tz);
            results.push(tz);
        }
    }
    return results;
}

// --- Searchable dropdown ---

function showDropdown(items) {
    dropdownList.innerHTML = '';
    activeIndex = -1;

    if (items.length === 0) {
        dropdownList.innerHTML = '<li class="no-results">No timezones found</li>';
        dropdownList.classList.remove('hidden');
        return;
    }

    items.forEach((tz, i) => {
        const li = document.createElement('li');
        li.textContent = tz.replace(/_/g, ' ');
        li.dataset.value = tz;
        li.addEventListener('mousedown', (e) => {
            e.preventDefault();
            selectTimezone(tz);
        });
        dropdownList.appendChild(li);
    });

    dropdownList.classList.remove('hidden');
}

function hideDropdown() {
    dropdownList.classList.add('hidden');
    activeIndex = -1;
}

function selectTimezone(tz) {
    selectedTz = tz;
    searchInput.value = tz.replace(/_/g, ' ');
    hideDropdown();
}

function scrollActiveIntoView() {
    const items = dropdownList.querySelectorAll('li:not(.no-results)');
    if (items[activeIndex]) {
        items[activeIndex].scrollIntoView({ block: 'nearest' });
    }
}

function updateActiveItem() {
    const items = dropdownList.querySelectorAll('li:not(.no-results)');
    items.forEach((li, i) => li.classList.toggle('active', i === activeIndex));
}

if (searchInput) searchInput.addEventListener('input', () => {
    selectedTz = '';
    const results = filterTimezones(searchInput.value.trim());
    showDropdown(results);
    if (results.length > 0) {
        activeIndex = 0;
        updateActiveItem();
    }
});

if (searchInput) searchInput.addEventListener('focus', () => {
    const results = filterTimezones(searchInput.value.trim());
    showDropdown(results);
});

if (searchInput) searchInput.addEventListener('blur', () => {
    hideDropdown();
});

if (searchInput) searchInput.addEventListener('keydown', (e) => {
    const items = dropdownList.querySelectorAll('li:not(.no-results)');
    if (items.length === 0) return;

    if (e.key === 'ArrowDown') {
        e.preventDefault();
        activeIndex = Math.min(activeIndex + 1, items.length - 1);
        updateActiveItem();
        scrollActiveIntoView();
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        activeIndex = Math.max(activeIndex - 1, 0);
        updateActiveItem();
        scrollActiveIntoView();
    } else if (e.key === 'Enter') {
        e.preventDefault();
        const pickIndex = activeIndex >= 0 ? activeIndex : 0;
        if (items[pickIndex]) {
            selectTimezone(items[pickIndex].dataset.value);
        }
    } else if (e.key === 'Escape') {
        hideDropdown();
        searchInput.blur();
    }
});

// --- Formatting ---

function formatTime(tz) {
    return new Intl.DateTimeFormat('en-US', {
        timeZone: tz,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: !use24h,
    }).format(new Date());
}

function formatDate(tz) {
    return new Intl.DateTimeFormat('en-US', {
        timeZone: tz,
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    }).format(new Date());
}

function getShortName(tz) {
    const parts = new Intl.DateTimeFormat('en-US', {
        timeZone: tz,
        timeZoneName: 'short',
    }).formatToParts(new Date());
    const tzPart = parts.find(p => p.type === 'timeZoneName');
    return tzPart ? tzPart.value : '';
}

function friendlyLabel(tz) {
    const city = tz.split('/').pop().replace(/_/g, ' ');
    const abbr = getShortName(tz);
    return `${city} (${abbr})`;
}

// --- Time offset ---

function getUtcOffsetMinutes(tz) {
    const now = new Date();
    const parts = new Intl.DateTimeFormat('en-US', {
        timeZone: tz,
        timeZoneName: 'longOffset',
    }).formatToParts(now);
    const offsetPart = parts.find(p => p.type === 'timeZoneName');
    if (!offsetPart) return 0;
    const match = offsetPart.value.match(/GMT([+-])(\d{1,2}):?(\d{2})?/);
    if (!match) return 0;
    const sign = match[1] === '+' ? 1 : -1;
    const hours = parseInt(match[2], 10);
    const mins = parseInt(match[3] || '0', 10);
    return sign * (hours * 60 + mins);
}

function getOffsetLabel(tz) {
    const localOffset = getUtcOffsetMinutes(localTz);
    const cardOffset = getUtcOffsetMinutes(tz);
    const diffMinutes = cardOffset - localOffset;
    if (diffMinutes === 0) return 'Local';
    const sign = diffMinutes > 0 ? '+' : '-';
    const absMinutes = Math.abs(diffMinutes);
    const h = Math.floor(absMinutes / 60);
    const m = absMinutes % 60;
    return m === 0 ? `${sign}${h}h` : `${sign}${h}:${String(m).padStart(2, '0')}`;
}

// --- Greeting ---

function getGreeting(tz) {
    const hour = parseInt(new Intl.DateTimeFormat('en-US', {
        timeZone: tz,
        hour: 'numeric',
        hour12: false,
    }).format(new Date()), 10);
    if (hour >= 5 && hour < 12) return 'Good morning';
    if (hour >= 12 && hour < 17) return 'Good afternoon';
    if (hour >= 17 && hour < 21) return 'Good evening';
    return 'Good night';
}

// --- Analog clock ---

function getTimeParts(tz) {
    const now = new Date();
    const parts = new Intl.DateTimeFormat('en-US', {
        timeZone: tz,
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false,
    }).formatToParts(now);
    const h = parseInt(parts.find(p => p.type === 'hour').value, 10);
    const m = parseInt(parts.find(p => p.type === 'minute').value, 10);
    const s = parseInt(parts.find(p => p.type === 'second').value, 10);
    return { h, m, s };
}

function buildAnalogClock(tz) {
    const { h, m, s } = getTimeParts(tz);
    const hourDeg = ((h % 12) + m / 60) * 30;
    const minDeg = (m + s / 60) * 6;
    const secDeg = s * 6;

    let ticksHtml = '';
    for (let i = 0; i < 12; i++) {
        ticksHtml += `<div class="tick" style="transform:rotate(${i * 30}deg)"></div>`;
    }

    return `
        <div class="analog-clock">
            ${ticksHtml}
            <div class="hand hand-hour" style="transform:rotate(${hourDeg}deg)"></div>
            <div class="hand hand-minute" style="transform:rotate(${minDeg}deg)"></div>
            <div class="hand hand-second" style="transform:rotate(${secDeg}deg)"></div>
            <div class="center-dot"></div>
        </div>
    `;
}

// --- Local clock ---

function getLocalCountry() {
    // Build reverse lookup: timezone -> country name
    for (const [country, zones] of Object.entries(COUNTRY_TIMEZONES)) {
        if (zones.includes(localTz)) {
            // Capitalise each word
            return country.replace(/\b\w/g, c => c.toUpperCase());
        }
    }
    // Fallback to city name if no country match
    return localTz.split('/').pop().replace(/_/g, ' ');
}

// Find the ISO country code for a given IANA timezone
function getCountryCodeForTz(tz) {
    for (const [country, zones] of Object.entries(COUNTRY_TIMEZONES)) {
        if (zones.includes(tz)) {
            return COUNTRY_CODES[country] || '';
        }
    }
    return '';
}

function getDialCode(tz) {
    const cc = getCountryCodeForTz(tz);
    return DIAL_CODES[cc] || '';
}

function getCurrencyCode(tz) {
    const cc = getCountryCodeForTz(tz);
    return CURRENCY_CODES[cc] || '';
}

// Get the YYYY-MM-DD date string in a given timezone
function getDateStringInTz(tz, daysOffset = 0) {
    const now = new Date();
    now.setUTCDate(now.getUTCDate() + daysOffset);
    const parts = new Intl.DateTimeFormat('en-GB', {
        timeZone: tz,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).formatToParts(now);
    const y = parts.find(p => p.type === 'year').value;
    const m = parts.find(p => p.type === 'month').value;
    const d = parts.find(p => p.type === 'day').value;
    return `${y}-${m}-${d}`;
}

// Get upcoming holidays for a timezone within the next N days
function getUpcomingHoliday(tz, withinDays = 14) {
    const cc = getCountryCodeForTz(tz);
    if (!cc || !HOLIDAYS[cc]) return null;
    const todayStr = getDateStringInTz(tz);
    const today = new Date(todayStr + 'T00:00:00Z');
    for (const h of HOLIDAYS[cc]) {
        const hDate = new Date(h.date + 'T00:00:00Z');
        const diffDays = Math.round((hDate - today) / (1000 * 60 * 60 * 24));
        if (diffDays >= 0 && diffDays <= withinDays) {
            return { ...h, daysAway: diffDays };
        }
    }
    return null;
}

// Is the given date a holiday in the given timezone's country?
function isHoliday(tz, dateStr) {
    const cc = getCountryCodeForTz(tz);
    if (!cc || !HOLIDAYS[cc]) return null;
    return HOLIDAYS[cc].find(h => h.date === dateStr) || null;
}

function getLocalGreeting(tz) {
    const hour = parseInt(new Intl.DateTimeFormat('en-US', {
        timeZone: tz,
        hour: 'numeric',
        hour12: false,
    }).format(new Date()), 10);
    if (hour >= 5 && hour < 12) return 'Have a good morning';
    if (hour >= 12 && hour < 17) return 'Have a good afternoon';
    if (hour >= 17 && hour < 21) return 'Have a good evening';
    return 'Have a good night';
}

function loadUserName() {
    userName = localStorage.getItem(USER_NAME_KEY) || '';
}

function saveUserName(name) {
    userName = (name || '').trim().slice(0, 40);
    if (userName) {
        localStorage.setItem(USER_NAME_KEY, userName);
    } else {
        localStorage.removeItem(USER_NAME_KEY);
    }
}

function renderLocalClock() {
    // Don't overwrite the greeting while the user is editing their name
    if (!isEditingName) {
        const prefix = getLocalGreeting(localTz);
        const displayName = userName || 'there';
        const emptyClass = userName ? '' : ' greeting-name-empty';
        localGreetingEl.innerHTML = `
            ${escapeHtml(prefix)}, <span class="greeting-name${emptyClass}" id="greeting-name" title="Click to edit your name">${escapeHtml(displayName)}</span> <button class="greeting-edit" id="greeting-edit" title="Edit name">✎</button>
        `;
        wireGreetingEdit();
    }
    localClockEl.innerHTML = `
        <div class="local-time">${formatTime(localTz)}</div>
        <div class="local-date">${formatDate(localTz)}</div>
        <div class="local-zone">${friendlyLabel(localTz)}</div>
    `;
}

function wireGreetingEdit() {
    const nameEl = document.getElementById('greeting-name');
    const editBtn = document.getElementById('greeting-edit');
    if (!nameEl || !editBtn) return;

    const start = () => {
        isEditingName = true;
        const current = userName;
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'greeting-name-input';
        input.value = current;
        input.maxLength = 40;
        input.placeholder = 'Your name';
        nameEl.replaceWith(input);
        editBtn.classList.add('hidden');
        input.focus();
        input.select();

        let finished = false;
        const commit = () => {
            if (finished) return;
            finished = true;
            isEditingName = false;
            saveUserName(input.value);
            renderLocalClock();
        };
        const cancel = () => {
            if (finished) return;
            finished = true;
            isEditingName = false;
            renderLocalClock();
        };
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                commit();
            } else if (e.key === 'Escape') {
                e.preventDefault();
                cancel();
            }
        });
        input.addEventListener('blur', commit);
    };

    nameEl.addEventListener('click', start);
    editBtn.addEventListener('click', start);
}

// --- Rendering ---

function renderClocks() {
    clocksContainer.innerHTML = '';
    activeClients.forEach((entry, index) => {
        const tz = entry.tz;
        const name = entry.name || cityFromTz(tz);
        const type = entry.type || 'Client';
        const color = entry.color || '';
        const businessStart = entry.businessStart ?? 9;
        const businessEnd = entry.businessEnd ?? 17;
        const notes = entry.notes || '';
        const card = document.createElement('div');
        card.className = 'clock-card';
        card.draggable = true;
        card.dataset.index = index;
        card.dataset.clientId = entry.id;

        if (color) {
            card.style.borderLeftColor = color;
        }

        const swatchesHtml = CARD_COLORS.map(c =>
            `<span class="color-swatch${c === color ? ' active' : ''}" data-color="${c}" style="background:${c}"></span>`
        ).join('');

        const dial = getDialCode(tz);
        const currency = getCurrencyCode(tz);
        const infoRow = (dial || currency)
            ? `<span class="clock-info-row">${dial ? `<span class="info-chip">📞 ${dial}</span>` : ''}${currency ? `<span class="info-chip">💰 ${currency}</span>` : ''}</span>`
            : '';

        const countdown = getBusinessCountdown(tz, businessStart, businessEnd);
        const countdownHtml = `<span class="biz-countdown biz-${countdown.status}" data-tz-biz="${tz}" data-biz-start="${businessStart}" data-biz-end="${businessEnd}">${countdown.text}</span>`;

        const holiday = getUpcomingHoliday(tz, 14);
        const holidayHtml = holiday
            ? `<span class="holiday-badge">🎉 ${escapeHtml(holiday.name)}${holiday.daysAway === 0 ? ' today' : holiday.daysAway === 1 ? ' tomorrow' : ` in ${holiday.daysAway} days`}</span>`
            : '';

        const notesHtml = notes
            ? `<div class="clock-notes" data-note-idx="${index}">✎ ${escapeHtml(notes)}</div>`
            : `<button class="add-note-btn" data-note-idx="${index}">+ Add note</button>`;

        const typeClass = `client-type-${type.toLowerCase()}`;

        card.innerHTML = `
            <div class="clock-left">
                <div class="clock-info">
                    <div class="client-header">
                        <span class="client-name" ${color ? `style="color:${color}"` : ''}>${escapeHtml(name)}</span>
                        <span class="client-type-badge ${typeClass}">${escapeHtml(type)}</span>
                    </div>
                    <span class="clock-zone">${friendlyLabel(tz)}</span>
                    <span class="clock-time" data-tz="${tz}">${formatTime(tz)}</span>
                    <span class="clock-date" data-tz-date="${tz}">${formatDate(tz)}</span>
                    <span class="clock-greeting" data-tz-greet="${tz}">${getGreeting(tz)}</span>
                    ${infoRow}
                    ${countdownHtml}
                    ${holidayHtml}
                    ${notesHtml}
                </div>
                <span class="clock-offset">${getOffsetLabel(tz)}</span>
            </div>
            <div class="card-actions">
                <div class="color-swatches">${swatchesHtml}</div>
                <div class="card-buttons">
                    <button class="edit-client-btn" data-edit-client-idx="${index}" title="Edit client">✎</button>
                    <button class="hours-btn" data-hours-idx="${index}" title="Business hours">⚙</button>
                    <button class="remove-btn" data-index="${index}" title="Remove">&times;</button>
                </div>
            </div>
        `;
        clocksContainer.appendChild(card);
    });
    updateControls();
    renderMeetingPlanner();
}

function updateTimes() {
    document.querySelectorAll('.clock-time[data-tz]').forEach(el => {
        el.textContent = formatTime(el.dataset.tz);
    });
    document.querySelectorAll('.clock-date[data-tz-date]').forEach(el => {
        el.textContent = formatDate(el.dataset.tzDate);
    });
    document.querySelectorAll('.clock-greeting[data-tz-greet]').forEach(el => {
        el.textContent = getGreeting(el.dataset.tzGreet);
    });
    // Update business countdowns
    document.querySelectorAll('.biz-countdown[data-tz-biz]').forEach(el => {
        const tz = el.dataset.tzBiz;
        const bs = parseInt(el.dataset.bizStart, 10);
        const be = parseInt(el.dataset.bizEnd, 10);
        const cd = getBusinessCountdown(tz, bs, be);
        el.textContent = cd.text;
        el.className = `biz-countdown biz-${cd.status}`;
        el.dataset.tzBiz = tz;
        el.dataset.bizStart = bs;
        el.dataset.bizEnd = be;
    });
    renderLocalClock();
    updateEventCountdowns();
    renderTodaysEvents();
}

function updateControls() {
    // No limit anymore — kept as placeholder in case we need UI updates tied to active count.
}

// --- State ---

function genClientId() {
    return 'c_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8);
}

function cityFromTz(tz) {
    return (tz || '').split('/').pop().replace(/_/g, ' ');
}

function normalizeClient(entry) {
    const obj = typeof entry === 'string' ? { tz: entry } : { ...entry };
    if (typeof obj.id !== 'string') obj.id = genClientId();
    if (typeof obj.tz !== 'string') obj.tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (typeof obj.name !== 'string' || !obj.name.trim()) obj.name = cityFromTz(obj.tz);
    if (typeof obj.type !== 'string' || !CLIENT_TYPES.includes(obj.type)) obj.type = 'Client';
    if (typeof obj.color !== 'string') obj.color = '';
    if (typeof obj.businessStart !== 'number') obj.businessStart = 9;
    if (typeof obj.businessEnd !== 'number') obj.businessEnd = 17;
    if (typeof obj.notes !== 'string') obj.notes = '';
    if (!Array.isArray(obj.links)) obj.links = [];
    return obj;
}

function loadState() {
    try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
        if (Array.isArray(saved) && saved.length > 0) {
            activeClients = saved.map(normalizeClient);
        } else {
            activeClients = [normalizeClient({ tz: Intl.DateTimeFormat().resolvedOptions().timeZone, name: 'You', type: 'Other' })];
        }
    } catch {
        activeClients = [normalizeClient({ tz: Intl.DateTimeFormat().resolvedOptions().timeZone, name: 'You', type: 'Other' })];
    }
}

function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(activeClients));
}

// (Legacy add-timezone flow removed — clients now added via client form, wired below.)

// --- Card events (remove + color) ---

clocksContainer.addEventListener('click', (e) => {
    // Remove button
    const btn = e.target.closest('.remove-btn');
    if (btn) {
        const index = parseInt(btn.dataset.index, 10);
        activeClients.splice(index, 1);
        saveState();
        renderClocks();
        return;
    }

    // Color swatch
    const swatch = e.target.closest('.color-swatch');
    if (swatch) {
        const card = swatch.closest('.clock-card');
        const index = parseInt(card.dataset.index, 10);
        const color = swatch.dataset.color;
        if (activeClients[index].color === color) {
            activeClients[index].color = '';
        } else {
            activeClients[index].color = color;
        }
        saveState();
        renderClocks();
        return;
    }

    // Business hours gear
    const hoursBtn = e.target.closest('.hours-btn');
    if (hoursBtn) {
        const index = parseInt(hoursBtn.dataset.hoursIdx, 10);
        openHoursPopover(index, hoursBtn);
        return;
    }

    // Edit client
    const editBtn = e.target.closest('.edit-client-btn');
    if (editBtn) {
        const index = parseInt(editBtn.dataset.editClientIdx, 10);
        const c = activeClients[index];
        if (c) openClientForm({ name: c.name, type: c.type, tz: c.tz, color: c.color, notes: c.notes }, c.id);
        return;
    }

    // Add note or edit note
    const addNote = e.target.closest('.add-note-btn');
    if (addNote) {
        const index = parseInt(addNote.dataset.noteIdx, 10);
        openNoteEditor(index, addNote);
        return;
    }
    const noteEl = e.target.closest('.clock-notes');
    if (noteEl) {
        const index = parseInt(noteEl.dataset.noteIdx, 10);
        openNoteEditor(index, noteEl);
        return;
    }
});

function openNoteEditor(index, anchor) {
    const entry = activeClients[index];
    const existing = entry.notes || '';
    const editor = document.createElement('div');
    editor.className = 'note-editor';
    editor.innerHTML = `
        <textarea maxlength="200" placeholder="Contact, language, etc.">${escapeHtml(existing)}</textarea>
        <div class="note-editor-actions">
            <button class="note-save">Save</button>
            <button class="note-cancel">Cancel</button>
            ${existing ? '<button class="note-delete">Delete</button>' : ''}
        </div>
    `;
    anchor.replaceWith(editor);
    const textarea = editor.querySelector('textarea');
    textarea.focus();
    textarea.setSelectionRange(textarea.value.length, textarea.value.length);

    editor.querySelector('.note-save').addEventListener('click', () => {
        activeClients[index].notes = textarea.value.trim();
        saveState();
        renderClocks();
    });
    editor.querySelector('.note-cancel').addEventListener('click', () => {
        renderClocks();
    });
    const delBtn = editor.querySelector('.note-delete');
    if (delBtn) {
        delBtn.addEventListener('click', () => {
            activeClients[index].notes = '';
            saveState();
            renderClocks();
        });
    }
}

function openHoursPopover(index, anchor) {
    // Close any open popovers first
    document.querySelectorAll('.hours-popover').forEach(p => p.remove());

    const entry = activeClients[index];
    const pop = document.createElement('div');
    pop.className = 'hours-popover';
    pop.innerHTML = `
        <div class="hours-popover-title">Business hours</div>
        <div class="hours-popover-row">
            <label>Start <input type="number" min="0" max="23" value="${entry.businessStart}" class="hours-start"></label>
            <label>End <input type="number" min="1" max="24" value="${entry.businessEnd}" class="hours-end"></label>
        </div>
        <div class="hours-popover-actions">
            <button class="hours-save">Save</button>
            <button class="hours-cancel">Cancel</button>
        </div>
    `;
    document.body.appendChild(pop);

    const rect = anchor.getBoundingClientRect();
    pop.style.position = 'fixed';
    pop.style.top = `${rect.bottom + 6}px`;
    pop.style.left = `${Math.max(10, rect.right - 220)}px`;

    const closePopover = () => pop.remove();

    pop.querySelector('.hours-save').addEventListener('click', () => {
        const start = parseInt(pop.querySelector('.hours-start').value, 10);
        const end = parseInt(pop.querySelector('.hours-end').value, 10);
        if (isNaN(start) || isNaN(end) || start < 0 || start > 23 || end < 1 || end > 24 || start >= end) {
            alert('Invalid hours. Start must be 0-23, End must be > Start and ≤ 24.');
            return;
        }
        activeClients[index].businessStart = start;
        activeClients[index].businessEnd = end;
        saveState();
        closePopover();
        renderClocks();
    });
    pop.querySelector('.hours-cancel').addEventListener('click', closePopover);

    // Close on outside click
    setTimeout(() => {
        const outsideHandler = (e) => {
            if (!pop.contains(e.target)) {
                closePopover();
                document.removeEventListener('click', outsideHandler);
            }
        };
        document.addEventListener('click', outsideHandler);
    }, 0);
}

// --- Drag and drop ---

clocksContainer.addEventListener('dragstart', (e) => {
    const card = e.target.closest('.clock-card');
    if (!card) return;
    dragSrcIndex = parseInt(card.dataset.index, 10);
    card.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
});

clocksContainer.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    const card = e.target.closest('.clock-card');
    // Clear all drag-over indicators
    clocksContainer.querySelectorAll('.clock-card').forEach(c => c.classList.remove('drag-over'));
    if (card) {
        card.classList.add('drag-over');
    }
});

clocksContainer.addEventListener('dragleave', (e) => {
    const card = e.target.closest('.clock-card');
    if (card) card.classList.remove('drag-over');
});

clocksContainer.addEventListener('drop', (e) => {
    e.preventDefault();
    const card = e.target.closest('.clock-card');
    if (!card) return;
    const dropIndex = parseInt(card.dataset.index, 10);
    if (dragSrcIndex === null || dragSrcIndex === dropIndex) return;

    // Reorder
    const [moved] = activeClients.splice(dragSrcIndex, 1);
    activeClients.splice(dropIndex, 0, moved);
    saveState();
    renderClocks();
    dragSrcIndex = null;
});

clocksContainer.addEventListener('dragend', () => {
    clocksContainer.querySelectorAll('.clock-card').forEach(c => {
        c.classList.remove('dragging', 'drag-over');
    });
    dragSrcIndex = null;
});

// --- Meeting planner ---

function getHourInTz(tz, localHour) {
    // Given an hour (0-23) in localTz, what hour is it in tz?
    const localOffset = getUtcOffsetMinutes(localTz);
    const tzOffset = getUtcOffsetMinutes(tz);
    const diff = tzOffset - localOffset;
    return ((localHour * 60 + diff) / 60 + 24) % 24;
}

function renderMeetingPlanner() {
    if (meetingPlanner.classList.contains('hidden')) return;

    if (activeClients.length < 1) {
        meetingPlanner.innerHTML = '<div class="mp-empty">Add a timezone to see business hours overlap.</div>';
        return;
    }

    const allZones = [
        { tz: localTz, label: `You — ${friendlyLabel(localTz)}`, color: '', businessStart: 9, businessEnd: 17 },
        ...activeClients.map(e => ({
            tz: e.tz,
            label: `${e.name} · ${cityFromTz(e.tz)}`,
            color: e.color || '',
            businessStart: e.businessStart ?? 9, businessEnd: e.businessEnd ?? 17
        }))
    ];

    // Hour labels (local time)
    let hourLabelsHtml = '';
    for (let h = 0; h < 24; h++) {
        const sel = selectedMpHour === h ? ' mp-label-selected' : '';
        hourLabelsHtml += `<span class="mp-hour-label${sel}">${h}</span>`;
    }

    // For each zone, compute which local hours fall within that zone's business hours
    const businessHoursSets = allZones.map(z => {
        const set = new Set();
        for (let localH = 0; localH < 24; localH++) {
            const tzH = getHourInTz(z.tz, localH);
            if (tzH >= z.businessStart && tzH < z.businessEnd) set.add(localH);
        }
        return set;
    });

    // Find overlap: hours that are business in ALL zones
    const overlapSet = new Set();
    for (let h = 0; h < 24; h++) {
        if (businessHoursSets.every(s => s.has(h))) overlapSet.add(h);
    }

    // Detect holidays per zone for today
    const holidaysByZone = allZones.map(z => {
        const dateStr = getDateStringInTz(z.tz);
        return isHoliday(z.tz, dateStr);
    });

    let rowsHtml = '';
    allZones.forEach((z, i) => {
        let cells = '';
        const zoneColor = z.color;
        const isHol = holidaysByZone[i];
        for (let h = 0; h < 24; h++) {
            const isBusiness = businessHoursSets[i].has(h);
            const isOverlap = overlapSet.has(h);
            const isSelected = selectedMpHour === h;
            let style = '';
            if (isOverlap) {
                style = zoneColor ? `background:${zoneColor}` : '';
            } else if (isBusiness && zoneColor) {
                style = `background:${zoneColor}33`;
            }
            let cls = isOverlap ? 'mp-hour overlap' : isBusiness ? 'mp-hour business' : 'mp-hour';
            if (isSelected) cls += ' mp-hour-selected';
            if (isHol && isBusiness) cls += ' mp-hour-holiday';
            cells += `<div class="${cls}" data-mp-hour="${h}"${style ? ` style="${style}"` : ''}></div>`;
        }
        const labelStyle = zoneColor ? ` style="color:${zoneColor}"` : '';
        const holMark = isHol ? ` <span class="mp-holiday-indicator" title="${escapeHtml(isHol.name)}">🎉</span>` : '';
        rowsHtml += `<div class="mp-row"><span class="mp-label"${labelStyle}>${z.label}${holMark}</span><div class="mp-hours">${cells}</div></div>`;
    });

    const overlapCount = overlapSet.size;
    const overlapText = overlapCount > 0
        ? `${overlapCount} overlapping business hour${overlapCount > 1 ? 's' : ''} (highlighted)`
        : 'No overlapping business hours found';

    // Currently conducting business (using per-zone hours)
    const nowOpen = allZones.filter(z => {
        const { h } = getTimeParts(z.tz);
        return h >= z.businessStart && h < z.businessEnd;
    });
    const nowOpenHtml = nowOpen.length > 0
        ? `<span style="color:#00c897">Open now:</span> ${nowOpen.map(z => {
            const labelColor = z.color ? ` style="color:${z.color}"` : '';
            return `<span${labelColor}>${z.label}</span>`;
        }).join(', ')}`
        : '<span style="color:var(--text-faint)">No zones currently in business hours</span>';

    // Holiday warnings
    const holidayWarnings = allZones
        .map((z, i) => holidaysByZone[i] ? { zone: z, holiday: holidaysByZone[i] } : null)
        .filter(Boolean);
    const holidayWarningHtml = holidayWarnings.length > 0
        ? `<div class="mp-holiday-warning">⚠ Public holiday today: ${holidayWarnings.map(h => `${h.zone.label} (${escapeHtml(h.holiday.name)})`).join(', ')}</div>`
        : '';

    // Meeting time picker info (shown if an hour is selected)
    let selectedInfoHtml = '';
    if (selectedMpHour !== null) {
        const utcIso = getSelectedMpUtcDate();
        const times = allZones.map(z => {
            const t = new Intl.DateTimeFormat('en-US', {
                timeZone: z.tz,
                weekday: 'short',
                hour: '2-digit',
                minute: '2-digit',
                hour12: !use24h,
            }).format(new Date(utcIso));
            const labelColor = z.color ? `style="color:${z.color}"` : '';
            return `<div class="mp-time-row"><span ${labelColor}>${z.label}:</span> <strong>${t}</strong></div>`;
        }).join('');
        selectedInfoHtml = `
            <div class="mp-selected-block">
                <div class="mp-selected-title">Selected time (${selectedMpHour}:00 local)</div>
                <div class="mp-selected-times">${times}</div>
                <div class="mp-selected-actions">
                    <button id="mp-export-ics" class="mp-action-btn">Download .ics</button>
                    <button id="mp-save-event" class="mp-action-btn">Save as event</button>
                    <button id="mp-clear-selected" class="mp-action-btn mp-action-secondary">Clear</button>
                </div>
            </div>
        `;
    }

    meetingPlanner.innerHTML = `
        <div class="mp-header">Business Hours Overlap (click an hour to pin a meeting time)</div>
        <div class="mp-now">${nowOpenHtml}</div>
        ${holidayWarningHtml}
        <div class="mp-hour-labels">${hourLabelsHtml}</div>
        <div class="mp-grid">${rowsHtml}</div>
        <div style="margin-top:10px;font-size:0.78rem;color:var(--text-faint)">${overlapText}</div>
        ${selectedInfoHtml}
    `;

    // Wire up click handlers
    meetingPlanner.querySelectorAll('[data-mp-hour]').forEach(cell => {
        cell.addEventListener('click', () => {
            handleMpHourClick(parseInt(cell.dataset.mpHour, 10));
        });
    });
    meetingPlanner.querySelectorAll('.mp-hour-label').forEach((label, h) => {
        label.addEventListener('click', () => handleMpHourClick(h));
    });
    const exportBtn = document.getElementById('mp-export-ics');
    if (exportBtn) exportBtn.addEventListener('click', buildMeetingIcs);
    const saveBtn = document.getElementById('mp-save-event');
    if (saveBtn) saveBtn.addEventListener('click', saveMeetingAsEvent);
    const clearBtn = document.getElementById('mp-clear-selected');
    if (clearBtn) clearBtn.addEventListener('click', () => {
        selectedMpHour = null;
        renderMeetingPlanner();
    });
}

meetingBtn.addEventListener('click', () => {
    if (meetingBtn.classList.contains('tab-active')) {
        showTab(null);
    } else {
        showTab('business');
    }
});

// --- Business hours countdown ---

function getBusinessCountdown(tz, businessStart, businessEnd) {
    // Returns { status, text } where status is 'open', 'opens-today', 'opens-tomorrow', 'closed-weekend'
    const now = new Date();
    const parts = new Intl.DateTimeFormat('en-US', {
        timeZone: tz,
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false,
    }).formatToParts(now);
    const h = parseInt(parts.find(p => p.type === 'hour').value, 10);
    const m = parseInt(parts.find(p => p.type === 'minute').value, 10);
    const s = parseInt(parts.find(p => p.type === 'second').value, 10);
    const currentMinutes = h * 60 + m;
    const startMinutes = businessStart * 60;
    const endMinutes = businessEnd * 60;

    function formatDuration(totalMinutes) {
        const hours = Math.floor(totalMinutes / 60);
        const mins = totalMinutes % 60;
        if (hours === 0) return `${mins}m`;
        if (mins === 0) return `${hours}h`;
        return `${hours}h ${mins}m`;
    }

    if (currentMinutes >= startMinutes && currentMinutes < endMinutes) {
        const remaining = endMinutes - currentMinutes - (s > 0 ? 0 : 0);
        return { status: 'open', text: `Closes in ${formatDuration(remaining)}` };
    }
    if (currentMinutes < startMinutes) {
        const remaining = startMinutes - currentMinutes;
        return { status: 'opens-today', text: `Opens in ${formatDuration(remaining)}` };
    }
    // After hours — compute until tomorrow's start
    const remaining = (24 * 60 - currentMinutes) + startMinutes;
    return { status: 'opens-tomorrow', text: `Opens in ${formatDuration(remaining)}` };
}

// --- Event countdown ---

function formatEventCountdown(eventDateIso) {
    const now = new Date();
    const evtDate = new Date(eventDateIso);
    const diffMs = evtDate - now;

    if (diffMs < -60000) return 'Ended';
    if (Math.abs(diffMs) < 60000) return 'Now';

    const absMs = Math.abs(diffMs);
    const days = Math.floor(absMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((absMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((absMs % (1000 * 60 * 60)) / (1000 * 60));

    let text;
    if (days > 0) text = `${days}d ${hours}h`;
    else if (hours > 0) text = `${hours}h ${mins}m`;
    else text = `${mins}m`;

    return diffMs > 0 ? `in ${text}` : `${text} ago`;
}

// --- Calendar / Events ---

async function loadEvents() {
    try {
        cachedEvents = await getAllEvents();
    } catch (err) {
        console.error('Failed to load events', err);
        cachedEvents = [];
    }
}

function formatEventDateTime(evt) {
    return new Intl.DateTimeFormat('en-US', {
        timeZone: evt.tz,
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: !use24h,
    }).format(new Date(evt.datetime));
}

function renderTodaysEvents() {
    if (!todaysEventsEl) return;
    const todayStr = getDateStringInTz(localTz);

    // Events happening today in local timezone
    const todays = cachedEvents.filter(evt => {
        const evtDateInLocal = getDateStringInTz_forDate(new Date(evt.datetime), localTz);
        return evtDateInLocal === todayStr;
    }).sort((a, b) => new Date(a.datetime) - new Date(b.datetime));

    if (todays.length === 0) {
        todaysEventsEl.classList.add('hidden');
        todaysEventsEl.innerHTML = '';
        return;
    }

    todaysEventsEl.classList.remove('hidden');
    const rowsHtml = todays.map(evt => {
        const countdown = formatEventCountdown(evt.datetime);
        const timeStr = new Intl.DateTimeFormat('en-US', {
            timeZone: evt.tz,
            hour: '2-digit', minute: '2-digit', hour12: !use24h,
        }).format(new Date(evt.datetime));
        const client = evt.clientId ? activeClients.find(c => c.id === evt.clientId) : null;
        const effectiveColor = evt.color || (client ? client.color : '');
        const colorStyle = effectiveColor ? `style="background:${effectiveColor}"` : '';
        const isPast = new Date(evt.datetime).getTime() < Date.now() - 60000;
        const links = Array.isArray(evt.links) ? evt.links : [];
        const firstLink = links[0] ? normalizeLink(links[0]) : '';
        const linkHtml = firstLink
            ? `<a href="${escapeHtml(firstLink)}" target="_blank" rel="noopener noreferrer" class="today-event-link" title="${escapeHtml(firstLink)}">🔗${links.length > 1 ? `×${links.length}` : ''}</a>`
            : '';
        const clientInlineBadge = client
            ? `<span class="today-event-client">with ${escapeHtml(client.name)}</span>`
            : '';
        return `
            <div class="today-event-row ${isPast ? 'event-past' : ''}">
                <span class="today-event-dot" ${colorStyle}></span>
                <span class="today-event-time">${timeStr}</span>
                <span class="today-event-title">${escapeHtml(evt.title)} ${clientInlineBadge}</span>
                ${linkHtml}
                <span class="today-event-countdown" data-event-id="${evt.id}">${countdown}</span>
            </div>
        `;
    }).join('');

    todaysEventsEl.innerHTML = `
        <div class="today-events-header">Today's Events (${todays.length})</div>
        <div class="today-events-list">${rowsHtml}</div>
    `;
}

// Get YYYY-MM-DD for an arbitrary Date object in a given tz
function getDateStringInTz_forDate(dateObj, tz) {
    const parts = new Intl.DateTimeFormat('en-GB', {
        timeZone: tz,
        year: 'numeric', month: '2-digit', day: '2-digit',
    }).formatToParts(dateObj);
    const y = parts.find(p => p.type === 'year').value;
    const m = parts.find(p => p.type === 'month').value;
    const d = parts.find(p => p.type === 'day').value;
    return `${y}-${m}-${d}`;
}

function renderEventsList() {
    if (!eventsList) return;
    const now = Date.now();
    const sorted = [...cachedEvents].sort((a, b) => new Date(a.datetime) - new Date(b.datetime));

    if (sorted.length === 0) {
        eventsList.innerHTML = '<div class="events-empty">No events yet. Click "+ Add Event" to create one.</div>';
        return;
    }

    eventsList.innerHTML = sorted.map(evt => {
        const countdown = formatEventCountdown(evt.datetime);
        const isPast = new Date(evt.datetime).getTime() < now - 60000;
        const client = evt.clientId ? activeClients.find(c => c.id === evt.clientId) : null;
        const effectiveColor = evt.color || (client ? client.color : '');
        const colorBar = effectiveColor
            ? `<div class="event-color-bar" style="background:${effectiveColor}"></div>`
            : '<div class="event-color-bar"></div>';
        const links = Array.isArray(evt.links) ? evt.links : [];
        const linksHtml = links.length > 0
            ? `<div class="event-links">${links.map(rawHref => {
                const href = normalizeLink(rawHref);
                const safe = escapeHtml(href);
                const label = hostFromUrl(href);
                return `<a href="${safe}" target="_blank" rel="noopener noreferrer" class="event-link">🔗 ${escapeHtml(label)}</a>`;
            }).join('')}</div>`
            : '';
        const clientBadge = client
            ? `<span class="event-client-badge" ${client.color ? `style="background:${client.color};color:#fff"` : ''}>${escapeHtml(client.name)}</span>`
            : '';
        return `
            <div class="event-row ${isPast ? 'event-past' : ''}" data-event-id="${evt.id}">
                ${colorBar}
                <div class="event-main">
                    <div class="event-title">${escapeHtml(evt.title)} ${clientBadge}</div>
                    <div class="event-meta">${formatEventDateTime(evt)} · ${friendlyLabel(evt.tz)}</div>
                    ${evt.notes ? `<div class="event-notes">${escapeHtml(evt.notes)}</div>` : ''}
                    ${linksHtml}
                </div>
                <div class="event-right">
                    <div class="event-countdown" data-event-id="${evt.id}">${countdown}</div>
                    <div class="event-row-actions">
                        <button class="event-edit" data-edit-id="${evt.id}" title="Edit">✎</button>
                        <button class="event-delete" data-delete-id="${evt.id}" title="Delete">&times;</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function hostFromUrl(url) {
    try {
        const u = new URL(url);
        return u.hostname.replace(/^www\./, '');
    } catch {
        // If URL is malformed, show truncated version
        return url.length > 30 ? url.slice(0, 30) + '…' : url;
    }
}

function updateEventCountdowns() {
    document.querySelectorAll('.event-countdown[data-event-id], .today-event-countdown[data-event-id]').forEach(el => {
        const id = parseInt(el.dataset.eventId, 10);
        const evt = cachedEvents.find(e => e.id === id);
        if (evt) el.textContent = formatEventCountdown(evt.datetime);
    });
}

function escapeHtml(str) {
    if (typeof str !== 'string') return '';
    return str.replace(/[&<>"']/g, c => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
}

// --- Tab switching for right column ---

function showTab(which) {
    // which = 'business' | 'calendar' | null (close both)
    if (which === 'business') {
        meetingPlanner.classList.remove('hidden');
        calendarPanel.classList.add('hidden');
        meetingBtn.classList.add('tab-active');
        calendarBtn.classList.remove('tab-active');
        renderMeetingPlanner();
    } else if (which === 'calendar') {
        calendarPanel.classList.remove('hidden');
        meetingPlanner.classList.add('hidden');
        calendarBtn.classList.add('tab-active');
        meetingBtn.classList.remove('tab-active');
        renderEventsList();
    } else {
        meetingPlanner.classList.add('hidden');
        calendarPanel.classList.add('hidden');
        meetingBtn.classList.remove('tab-active');
        calendarBtn.classList.remove('tab-active');
    }
}

// --- Client form (add/edit) ---

const CLIENT_FORM_COLORS = ['', ...CARD_COLORS];

function renderColorPicker() {
    const picker = document.getElementById('client-color-picker');
    if (!picker) return;
    picker.innerHTML = CLIENT_FORM_COLORS.map(c =>
        `<span class="color-swatch${c === '' ? ' color-none' : ''}" data-color="${c}" style="${c ? `background:${c}` : ''}">${c ? '' : '∅'}</span>`
    ).join('');
    picker.querySelectorAll('.color-swatch').forEach(sw => {
        sw.addEventListener('click', () => {
            picker.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
            sw.classList.add('active');
            picker.dataset.selectedColor = sw.dataset.color;
        });
    });
}

function openClientForm(prefill = {}, editId = null) {
    if (!clientForm) return;
    editingClientId = editId;
    clientForm.classList.remove('hidden');
    if (addClientBtn) addClientBtn.classList.add('hidden');

    clientNameInput.value = prefill.name || '';
    if (clientNotesInput) clientNotesInput.value = prefill.notes || '';

    // Type radios
    const type = prefill.type || 'Client';
    document.querySelectorAll('input[name="client-type"]').forEach(r => {
        r.checked = r.value === type;
    });

    // Timezone picker (reuses existing searchInput widget)
    const tz = prefill.tz || localTz;
    selectedTz = tz;
    if (searchInput) searchInput.value = tz.replace(/_/g, ' ');

    // Color picker — mark prefill color active
    renderColorPicker();
    const picker = document.getElementById('client-color-picker');
    if (picker) {
        picker.dataset.selectedColor = prefill.color || '';
        picker.querySelectorAll('.color-swatch').forEach(sw => {
            if (sw.dataset.color === (prefill.color || '')) sw.classList.add('active');
        });
    }

    // Button labels
    if (clientSaveBtn) clientSaveBtn.textContent = editId ? 'Update' : 'Save';
    clientNameInput.focus();
}

function closeClientForm() {
    if (!clientForm) return;
    clientForm.classList.add('hidden');
    if (addClientBtn) addClientBtn.classList.remove('hidden');
    editingClientId = null;
    selectedTz = '';
    if (searchInput) searchInput.value = '';
    if (clientNotesInput) clientNotesInput.value = '';
    if (clientSaveBtn) clientSaveBtn.textContent = 'Save';
}

function handleSaveClient() {
    const name = clientNameInput.value.trim();
    if (!name) {
        clientNameInput.focus();
        return;
    }
    const typeRadio = document.querySelector('input[name="client-type"]:checked');
    const type = typeRadio ? typeRadio.value : 'Client';

    // Resolve timezone: if user typed a valid name directly without picking, try to match
    let tz = selectedTz;
    if (!tz && searchInput) {
        const raw = searchInput.value.trim();
        // Try exact match on IANA (with spaces converted back)
        const underscored = raw.replace(/ /g, '_');
        if (allTimezones.includes(underscored)) {
            tz = underscored;
        } else {
            // Fall back to first filter result
            const results = filterTimezones(raw);
            if (results.length > 0) tz = results[0];
        }
    }
    if (!tz) {
        if (searchInput) searchInput.focus();
        return;
    }

    const picker = document.getElementById('client-color-picker');
    const color = picker ? (picker.dataset.selectedColor || '') : '';
    const notes = clientNotesInput ? clientNotesInput.value.trim() : '';

    if (editingClientId !== null) {
        const idx = activeClients.findIndex(c => c.id === editingClientId);
        if (idx >= 0) {
            activeClients[idx] = normalizeClient({
                ...activeClients[idx],
                name, type, tz, color, notes,
            });
        }
    } else {
        activeClients.push(normalizeClient({ name, type, tz, color, notes }));
    }
    saveState();
    closeClientForm();
    renderClocks();
}

function openEventForm(prefill = {}, editId = null) {
    if (!eventForm) return;
    editingEventId = editId;
    eventForm.classList.remove('hidden');
    eventFormTitle.value = prefill.title || '';

    // Default: today, in 1 hour, in local timezone
    const now = new Date();
    const prefillDate = prefill.date || now.toISOString().slice(0, 10);
    const prefillTime = prefill.time || new Date(now.getTime() + 3600000).toTimeString().slice(0, 5);
    eventFormDate.value = prefillDate;
    eventFormTime.value = prefillTime;

    // Populate timezone dropdown
    const currentZones = [localTz, ...activeClients.map(z => z.tz)];
    // If editing and the event's tz isn't in active zones, include it
    if (prefill.tz && !currentZones.includes(prefill.tz)) currentZones.push(prefill.tz);
    const uniqueZones = [...new Set(currentZones)];
    eventFormTz.innerHTML = uniqueZones.map(tz =>
        `<option value="${tz}"${tz === (prefill.tz || localTz) ? ' selected' : ''}>${tz.replace(/_/g, ' ')}</option>`
    ).join('');

    eventFormNotes.value = prefill.notes || '';
    eventFormLinks.value = Array.isArray(prefill.links) ? prefill.links.join('\n') : (prefill.links || '');
    eventFormColor.value = prefill.color || '';

    // Populate client dropdown
    if (eventFormClient) {
        const opts = ['<option value="">— None —</option>']
            .concat(activeClients.map(c =>
                `<option value="${c.id}"${c.id === prefill.clientId ? ' selected' : ''}>${escapeHtml(c.name)} (${escapeHtml(c.type)}) · ${escapeHtml(cityFromTz(c.tz))}</option>`
            ));
        eventFormClient.innerHTML = opts.join('');
    }

    // Update save button label + form title
    if (eventSaveBtn) eventSaveBtn.textContent = editId ? 'Update' : 'Save';
    eventFormTitle.focus();
}

function closeEventForm() {
    if (eventForm) eventForm.classList.add('hidden');
    editingEventId = null;
    if (eventSaveBtn) eventSaveBtn.textContent = 'Save';
}

function normalizeLink(url) {
    if (!url) return '';
    const trimmed = url.trim();
    if (!trimmed) return '';
    // Accept common protocols; otherwise prepend https://
    // Detects http:, https:, mailto:, tel:, sms:, ftp:, file:, and custom app schemes like zoommtg:
    if (/^[a-z][a-z0-9+.-]*:/i.test(trimmed)) return trimmed;
    // Auto-detect email addresses for mailto:
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return 'mailto:' + trimmed;
    return 'https://' + trimmed;
}

function parseLinks(raw) {
    if (!raw) return [];
    return raw.split('\n')
        .map(s => s.trim())
        .filter(Boolean)
        .map(normalizeLink)
        .slice(0, 10); // Cap at 10 links
}

async function handleSaveEvent() {
    const title = eventFormTitle.value.trim();
    if (!title) {
        eventFormTitle.focus();
        return;
    }
    const date = eventFormDate.value;
    const time = eventFormTime.value;
    const tz = eventFormTz.value;
    if (!date || !time || !tz) return;

    const datetimeIso = zonedToUtcIso(date, time, tz);

    const clientId = eventFormClient ? (eventFormClient.value || null) : null;

    // If a client is selected but color not chosen, inherit client color
    let color = eventFormColor.value || '';
    if (!color && clientId) {
        const c = activeClients.find(x => x.id === clientId);
        if (c) color = c.color || '';
    }

    const eventData = {
        title,
        datetime: datetimeIso,
        tz,
        notes: eventFormNotes.value.trim(),
        links: parseLinks(eventFormLinks.value),
        color,
        clientId: clientId || null,
    };

    try {
        if (editingEventId !== null) {
            // Find existing event to preserve createdAt + id
            const existing = cachedEvents.find(e => e.id === editingEventId);
            const updated = {
                ...existing,
                ...eventData,
                id: editingEventId,
                updatedAt: new Date().toISOString(),
            };
            await updateEvent(updated);
        } else {
            eventData.createdAt = new Date().toISOString();
            await addEvent(eventData);
        }
        await loadEvents();
        renderEventsList();
        renderTodaysEvents();
        closeEventForm();
    } catch (err) {
        console.error('Failed to save event', err);
        alert('Failed to save event: ' + err.message);
    }
}

// Convert a date+time string interpreted in `tz` to a UTC ISO string
function zonedToUtcIso(dateStr, timeStr, tz) {
    // First get the UTC offset in tz for that specific date
    // Approximation: create a naive UTC Date, check its tz-formatted hour, adjust
    const [y, mo, d] = dateStr.split('-').map(Number);
    const [h, mi] = timeStr.split(':').map(Number);

    // Candidate UTC time (as if the local time was UTC)
    let candidate = new Date(Date.UTC(y, mo - 1, d, h, mi, 0));

    // Check what time that candidate is in tz
    const parts = new Intl.DateTimeFormat('en-GB', {
        timeZone: tz,
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: false,
    }).formatToParts(candidate);
    const tzY = parseInt(parts.find(p => p.type === 'year').value, 10);
    const tzMo = parseInt(parts.find(p => p.type === 'month').value, 10);
    const tzD = parseInt(parts.find(p => p.type === 'day').value, 10);
    const tzH = parseInt(parts.find(p => p.type === 'hour').value, 10);
    const tzMi = parseInt(parts.find(p => p.type === 'minute').value, 10);

    const target = Date.UTC(y, mo - 1, d, h, mi, 0);
    const actual = Date.UTC(tzY, tzMo - 1, tzD, tzH, tzMi, 0);
    const diff = target - actual; // how much to shift candidate to land on target wall-clock in tz
    return new Date(candidate.getTime() + diff).toISOString();
}

// --- .ics export ---

function buildIcs(title, description, startDateUtc, durationMinutes = 60) {
    const fmt = (d) => {
        const pad = n => String(n).padStart(2, '0');
        return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`;
    };
    const start = new Date(startDateUtc);
    const end = new Date(start.getTime() + durationMinutes * 60000);
    const uid = `${Date.now()}-${Math.random().toString(36).slice(2)}@hourbridge`;
    const now = new Date();

    return [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//HourBridge//EN',
        'CALSCALE:GREGORIAN',
        'BEGIN:VEVENT',
        `UID:${uid}`,
        `DTSTAMP:${fmt(now)}`,
        `DTSTART:${fmt(start)}`,
        `DTEND:${fmt(end)}`,
        `SUMMARY:${icsEscape(title)}`,
        `DESCRIPTION:${icsEscape(description)}`,
        'END:VEVENT',
        'END:VCALENDAR'
    ].join('\r\n');
}

function icsEscape(str) {
    return (str || '').replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
}

function downloadIcs(filename, icsContent) {
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// --- Meeting time picker ---

function handleMpHourClick(hour) {
    if (selectedMpHour === hour) {
        selectedMpHour = null;
    } else {
        selectedMpHour = hour;
    }
    renderMeetingPlanner();
}

function getSelectedMpUtcDate() {
    if (selectedMpHour === null) return null;
    // Get today's date in the local tz, combined with selected local hour
    const todayStr = getDateStringInTz(localTz);
    const timeStr = `${String(selectedMpHour).padStart(2, '0')}:00`;
    return zonedToUtcIso(todayStr, timeStr, localTz);
}

function buildMeetingIcs() {
    const utcIso = getSelectedMpUtcDate();
    if (!utcIso) return;

    const allZones = [{ tz: localTz, label: `You (${friendlyLabel(localTz)})` },
        ...activeClients.map(z => ({ tz: z.tz, label: `${z.name} (${friendlyLabel(z.tz)})` }))];

    const desc = allZones.map(z => {
        const t = new Intl.DateTimeFormat('en-US', {
            timeZone: z.tz,
            weekday: 'short', month: 'short', day: 'numeric',
            hour: '2-digit', minute: '2-digit', hour12: false,
        }).format(new Date(utcIso));
        return `${z.label}: ${t}`;
    }).join('\\n');

    const ics = buildIcs('International Meeting', `Times in each zone:\\n${desc}`, utcIso, 60);
    downloadIcs(`hourbridge-meeting-${selectedMpHour}h.ics`, ics);
}

function saveMeetingAsEvent() {
    const utcIso = getSelectedMpUtcDate();
    if (!utcIso) return;
    const d = new Date(utcIso);
    // Pre-fill form with local date/time (display as local wall-clock)
    const localParts = new Intl.DateTimeFormat('en-GB', {
        timeZone: localTz,
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', hour12: false,
    }).formatToParts(d);
    const y = localParts.find(p => p.type === 'year').value;
    const mo = localParts.find(p => p.type === 'month').value;
    const da = localParts.find(p => p.type === 'day').value;
    const h = localParts.find(p => p.type === 'hour').value;
    const mi = localParts.find(p => p.type === 'minute').value;

    showTab('calendar');
    openEventForm({
        title: 'International Meeting',
        date: `${y}-${mo}-${da}`,
        time: `${h}:${mi}`,
        tz: localTz,
    });
}

// --- Keyboard shortcut ---

document.addEventListener('keydown', (e) => {
    const activeTag = (document.activeElement && document.activeElement.tagName) || '';
    const isTyping = ['INPUT', 'TEXTAREA', 'SELECT'].includes(activeTag);
    if (e.key === '/' && !isTyping && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        openClientForm();
    }
});

// --- Client form wiring ---

if (addClientBtn) {
    addClientBtn.addEventListener('click', () => openClientForm());
}
if (clientSaveBtn) {
    clientSaveBtn.addEventListener('click', handleSaveClient);
}
if (clientCancelBtn) {
    clientCancelBtn.addEventListener('click', closeClientForm);
}
if (clientNameInput) {
    clientNameInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSaveClient();
        }
    });
}

// --- Calendar UI wiring ---

if (calendarBtn) {
    calendarBtn.addEventListener('click', () => {
        if (calendarBtn.classList.contains('tab-active')) {
            showTab(null);
        } else {
            showTab('calendar');
        }
    });
}
if (addEventBtn) {
    addEventBtn.addEventListener('click', () => openEventForm());
}
if (eventSaveBtn) {
    eventSaveBtn.addEventListener('click', handleSaveEvent);
}
if (eventCancelBtn) {
    eventCancelBtn.addEventListener('click', closeEventForm);
}
if (eventsList) {
    eventsList.addEventListener('click', async (e) => {
        // Don't intercept clicks on actual links
        if (e.target.closest('a.event-link')) return;

        const del = e.target.closest('.event-delete');
        if (del) {
            const id = parseInt(del.dataset.deleteId, 10);
            if (confirm('Delete this event?')) {
                try {
                    await deleteEvent(id);
                    await loadEvents();
                    renderEventsList();
                    renderTodaysEvents();
                } catch (err) {
                    alert('Failed to delete: ' + err.message);
                }
            }
            return;
        }

        const edit = e.target.closest('.event-edit');
        if (edit) {
            const id = parseInt(edit.dataset.editId, 10);
            const evt = cachedEvents.find(ev => ev.id === id);
            if (!evt) return;
            // Compute local date/time strings for the event's tz
            const d = new Date(evt.datetime);
            const parts = new Intl.DateTimeFormat('en-GB', {
                timeZone: evt.tz,
                year: 'numeric', month: '2-digit', day: '2-digit',
                hour: '2-digit', minute: '2-digit', hour12: false,
            }).formatToParts(d);
            const y = parts.find(p => p.type === 'year').value;
            const mo = parts.find(p => p.type === 'month').value;
            const da = parts.find(p => p.type === 'day').value;
            const h = parts.find(p => p.type === 'hour').value;
            const mi = parts.find(p => p.type === 'minute').value;
            openEventForm({
                title: evt.title,
                date: `${y}-${mo}-${da}`,
                time: `${h}:${mi}`,
                tz: evt.tz,
                notes: evt.notes || '',
                links: evt.links || [],
                color: evt.color || '',
                clientId: evt.clientId || '',
            }, id);
        }
    });
}

// --- Backup & Sync ---

const SYNC_QR_MAX_PAYLOAD_BYTES = 1800; // URL-safe base64 inflates by ~33%; keep URL under ~2.3KB
const SYNC_LINK_WARN_BYTES = 8 * 1024;   // Warn above ~8KB (messaging apps may truncate)
const SYNC_LINK_MAX_BYTES = 30 * 1024;   // Hard cap for clipboard/URL safety

const syncBtn = document.getElementById('sync-btn');
const syncModal = document.getElementById('sync-modal');
const syncCloseBtn = document.getElementById('sync-close-btn');
const syncDownloadBtn = document.getElementById('sync-download-btn');
const syncQrBtn = document.getElementById('sync-qr-btn');
const syncQrContainer = document.getElementById('sync-qr-container');
const syncStats = document.getElementById('sync-stats');
const syncImportFile = document.getElementById('sync-import-file');
const syncLinkBtn = document.getElementById('sync-link-btn');
const syncCopyFeedback = document.getElementById('sync-copy-feedback');

async function gatherAllData() {
    const events = await getAllEvents();
    // Strip auto-incremented IDs so imports don't collide
    const strippedEvents = events.map(e => {
        const { id, ...rest } = e;
        return rest;
    });
    return {
        app: 'HourBridge',
        v: 1,
        exportedAt: new Date().toISOString(),
        userName: localStorage.getItem(USER_NAME_KEY) || '',
        theme: localStorage.getItem(THEME_KEY) || 'dark',
        format24h: localStorage.getItem(FORMAT_KEY) === 'true',
        clients: activeClients,
        events: strippedEvents,
    };
}

function validateImportPayload(payload) {
    if (!payload || typeof payload !== 'object') return 'Invalid data: not an object.';
    if (payload.app !== 'HourBridge') return 'Invalid data: not a HourBridge backup.';
    if (payload.v !== 1) return `Unsupported backup version: ${payload.v}.`;
    if (!Array.isArray(payload.clients)) return 'Invalid data: clients missing or wrong shape.';
    if (!Array.isArray(payload.events)) return 'Invalid data: events missing or wrong shape.';
    return null;
}

async function applyAllData(payload) {
    // 1. Clients
    activeClients = payload.clients.map(normalizeClient);
    saveState();

    // 2. User preferences
    if (typeof payload.userName === 'string') {
        saveUserName(payload.userName);
    }
    if (payload.theme === 'light' || payload.theme === 'dark') {
        localStorage.setItem(THEME_KEY, payload.theme);
        if (payload.theme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
        if (themeToggle) themeToggle.checked = payload.theme === 'light';
    }
    if (typeof payload.format24h === 'boolean') {
        localStorage.setItem(FORMAT_KEY, String(payload.format24h));
        use24h = payload.format24h;
        if (formatToggle) formatToggle.checked = payload.format24h;
    }

    // 3. Events — wipe and re-fill
    const existing = await getAllEvents();
    for (const e of existing) {
        await deleteEvent(e.id);
    }
    for (const evt of payload.events) {
        // Ensure minimum required fields
        const toAdd = {
            title: String(evt.title || 'Untitled'),
            datetime: String(evt.datetime || new Date().toISOString()),
            tz: String(evt.tz || localTz),
            notes: typeof evt.notes === 'string' ? evt.notes : '',
            links: Array.isArray(evt.links) ? evt.links : [],
            color: typeof evt.color === 'string' ? evt.color : '',
            clientId: evt.clientId || null,
            createdAt: evt.createdAt || new Date().toISOString(),
        };
        if (evt.updatedAt) toAdd.updatedAt = evt.updatedAt;
        await addEvent(toAdd);
    }
    await loadEvents();

    // 4. Re-render everything
    renderLocalClock();
    renderClocks();
    renderTodaysEvents();
    renderEventsList();
    renderNextEventBadgeIfPresent();
}

function renderNextEventBadgeIfPresent() {
    // renderTodaysEvents already updates today list; nothing else needed
}

// --- Export to file ---

function downloadBackup() {
    gatherAllData().then(data => {
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        const today = new Date().toISOString().slice(0, 10);
        a.href = url;
        a.download = `hourbridge-backup-${today}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
}

// --- Import from file ---

function importFromFile(file) {
    const reader = new FileReader();
    reader.onload = () => {
        let payload;
        try {
            payload = JSON.parse(reader.result);
        } catch (err) {
            alert('Could not read backup: ' + err.message);
            return;
        }
        const error = validateImportPayload(payload);
        if (error) {
            alert(error);
            return;
        }
        const summary = `${payload.clients.length} clients, ${payload.events.length} events`;
        if (!confirm(`This will replace all your current data with the imported backup (${summary}). Continue?`)) {
            return;
        }
        applyAllData(payload)
            .then(() => alert('Import complete.'))
            .catch(err => alert('Import failed: ' + err.message));
    };
    reader.onerror = () => alert('Could not read the file.');
    reader.readAsText(file);
}

// --- QR generation ---

function base64UrlEncode(str) {
    // UTF-8 safe base64url
    const utf8 = new TextEncoder().encode(str);
    let binary = '';
    utf8.forEach(b => binary += String.fromCharCode(b));
    return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64UrlDecode(b64) {
    let s = b64.replace(/-/g, '+').replace(/_/g, '/');
    while (s.length % 4) s += '=';
    const binary = atob(s);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return new TextDecoder().decode(bytes);
}

function buildImportUrl(payload) {
    const minimal = JSON.stringify(payload);
    const encoded = base64UrlEncode(minimal);
    const base = window.location.origin + window.location.pathname;
    return `${base}#import=${encoded}`;
}

function showSyncFeedback(msg, isError = false) {
    if (!syncCopyFeedback) return;
    syncCopyFeedback.textContent = msg;
    syncCopyFeedback.classList.remove('hidden');
    syncCopyFeedback.classList.toggle('sync-feedback-error', !!isError);
    clearTimeout(showSyncFeedback._timer);
    showSyncFeedback._timer = setTimeout(() => {
        syncCopyFeedback.classList.add('hidden');
    }, 4000);
}

async function copySyncLink() {
    const data = await gatherAllData();
    const url = buildImportUrl(data);
    const size = new Blob([url]).size;
    const sizeStr = `${(size / 1024).toFixed(1)} KB`;

    if (size > SYNC_LINK_MAX_BYTES) {
        showSyncFeedback(`Link too large (${sizeStr}) — use file export instead.`, true);
        return;
    }

    // Try Web Share API first (opens native share sheet on mobile)
    if (navigator.share) {
        try {
            await navigator.share({
                title: 'HourBridge data',
                text: 'Open this link on your other device to import HourBridge data.',
                url,
            });
            showSyncFeedback(`Shared (${sizeStr}).`);
            return;
        } catch (err) {
            if (err && err.name === 'AbortError') return; // user cancelled
            // Otherwise fall through to clipboard
        }
    }

    // Fallback: copy to clipboard
    try {
        await navigator.clipboard.writeText(url);
        const warning = size > SYNC_LINK_WARN_BYTES
            ? ' Warning: some messaging apps may truncate long links.'
            : '';
        showSyncFeedback(`Link copied (${sizeStr}). Paste anywhere to share.${warning}`);
    } catch (err) {
        // Very old fallback — show a prompt so user can select + copy manually
        window.prompt('Copy this link (Ctrl/Cmd+C):', url);
        showSyncFeedback(`Link shown (${sizeStr}).`);
    }
}

async function showQrCode() {
    if (typeof qrcode === 'undefined') {
        syncQrContainer.innerHTML = '<div class="sync-error">QR library failed to load. Use file export instead.</div>';
        syncQrContainer.classList.remove('hidden');
        return;
    }
    const data = await gatherAllData();
    const url = buildImportUrl(data);
    const byteLength = new Blob([url]).size;

    if (byteLength > SYNC_QR_MAX_PAYLOAD_BYTES) {
        syncQrContainer.innerHTML = `
            <div class="sync-error">
                Data too large for QR (${(byteLength/1024).toFixed(1)} KB).
                Use the file export instead.
            </div>
        `;
        syncQrContainer.classList.remove('hidden');
        return;
    }

    try {
        // typeNumber=0 lets the library pick the smallest version; errorCorrectionLevel 'L' maximizes data capacity
        const qr = qrcode(0, 'L');
        qr.addData(url);
        qr.make();
        // Render as SVG (scales clean and is theme-friendly)
        const svg = qr.createSvgTag({ cellSize: 6, margin: 4 });
        syncQrContainer.innerHTML = `
            <div class="sync-qr-box">${svg}</div>
            <div class="sync-qr-hint">Scan with your phone's camera. Payload: ${(byteLength/1024).toFixed(2)} KB.</div>
        `;
        syncQrContainer.classList.remove('hidden');
    } catch (err) {
        syncQrContainer.innerHTML = `<div class="sync-error">Could not generate QR: ${escapeHtml(err.message)}. Use the file export instead.</div>`;
        syncQrContainer.classList.remove('hidden');
    }
}

// --- URL hash auto-import ---

async function checkUrlHashImport() {
    const hash = window.location.hash || '';
    const match = hash.match(/#import=([A-Za-z0-9_\-]+)/);
    if (!match) return;
    try {
        const decoded = base64UrlDecode(match[1]);
        const payload = JSON.parse(decoded);
        const error = validateImportPayload(payload);
        if (error) {
            alert(error);
            history.replaceState(null, '', window.location.pathname);
            return;
        }
        const summary = `${payload.clients.length} clients, ${payload.events.length} events`;
        if (confirm(`Imported from QR / link: ${summary}.\n\nThis will replace all your current data. Continue?`)) {
            await applyAllData(payload);
        }
    } catch (err) {
        alert('Could not import from link: ' + err.message);
    } finally {
        // Remove hash so refresh doesn't re-trigger
        history.replaceState(null, '', window.location.pathname);
    }
}

// --- Sync modal open/close + stats ---

async function openSyncModal() {
    syncModal.classList.remove('hidden');
    syncQrContainer.classList.add('hidden');
    syncQrContainer.innerHTML = '';
    if (syncCopyFeedback) syncCopyFeedback.classList.add('hidden');
    const data = await gatherAllData();
    const url = buildImportUrl(data);
    const size = new Blob([url]).size;
    const fitsQr = size <= SYNC_QR_MAX_PAYLOAD_BYTES;
    const fitsLink = size <= SYNC_LINK_MAX_BYTES;
    syncStats.innerHTML = `${data.clients.length} clients · ${data.events.length} events · ~${(size/1024).toFixed(2)} KB ${fitsQr ? '· ✓ fits QR' : fitsLink ? '· ✓ fits link' : '· ✗ too large for link'}`;
    syncQrBtn.disabled = !fitsQr;
    syncQrBtn.title = fitsQr ? '' : 'Data too large for QR — use file export';
    if (syncLinkBtn) {
        syncLinkBtn.disabled = !fitsLink;
        syncLinkBtn.title = fitsLink ? '' : 'Data too large for a link — use file export';
    }
}

function closeSyncModal() {
    syncModal.classList.add('hidden');
    syncQrContainer.classList.add('hidden');
    syncQrContainer.innerHTML = '';
}

// --- Sync wiring ---

if (syncBtn) syncBtn.addEventListener('click', openSyncModal);
if (syncCloseBtn) syncCloseBtn.addEventListener('click', closeSyncModal);
if (syncModal) {
    syncModal.addEventListener('click', (e) => {
        if (e.target === syncModal) closeSyncModal();
    });
}
if (syncDownloadBtn) syncDownloadBtn.addEventListener('click', downloadBackup);
if (syncQrBtn) syncQrBtn.addEventListener('click', showQrCode);
if (syncLinkBtn) syncLinkBtn.addEventListener('click', copySyncLink);
if (syncImportFile) {
    syncImportFile.addEventListener('change', (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) importFromFile(file);
        // Reset so selecting the same file again still fires change
        e.target.value = '';
    });
}

// --- Init ---

(async function init() {
    loadTheme();
    loadFormat();
    loadUserName();
    loadTimezones();
    loadState();
    renderLocalClock();
    renderClocks();
    renderMeetingPlanner();
    try {
        await loadEvents();
    } catch (err) {
        console.error('IndexedDB unavailable:', err);
    }
    renderTodaysEvents();
    intervalId = setInterval(updateTimes, 1000);
    // Check for incoming sync data from QR/URL (non-blocking)
    checkUrlHashImport();
})();

// --- Service Worker ---

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js');
}
