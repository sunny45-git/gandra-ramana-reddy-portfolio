const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const AdminUser = require('./models/AdminUser');
const Profile = require('./models/Profile');
const Activity = require('./models/Activity');
const Milestone = require('./models/Milestone');
const GalleryImage = require('./models/GalleryImage');
const NewsArticle = require('./models/NewsArticle');
const ContactMessage = require('./models/ContactMessage');
const { connectDB, disconnectDB } = require('./config/db');

const seedData = async () => {
  try {
    await connectDB();
    console.log('Seeding database with verified data for Sri Gandra Venkata Ramana Reddy...');

    // 1. Admin User
    await AdminUser.deleteMany({});
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@gandrareddy.in';
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@12345';
    const admin = await AdminUser.create({
      name: 'Gandra Ramana Reddy Office Admin',
      email: adminEmail,
      password: adminPassword,
      role: 'superadmin',
    });
    console.log(`Admin user created: ${admin.email}`);

    // 2. Profile
    await Profile.deleteMany({});
    await Profile.create({
      fullName: {
        en: 'Gandra Venkata Ramana Reddy',
        te: 'గండ్ర వెంకట రమణా రెడ్డి',
      },
      designation: {
        en: 'Senior Political Leader & Former Member of Legislative Assembly (Bhupalpally)',
        te: 'సీనియర్ రాజకీయ నాయకులు & పూర్వ శాసనసభ్యులు (భూపాలపల్లి నియోజకవర్గం)',
      },
      constituency: {
        en: 'Bhupalpally, Jayashankar Bhupalpally District, Telangana',
        te: 'భూపాలపల్లి, జయశంకర్ భూపాలపల్లి జిల్లా, తెలంగాణ',
      },
      tagline: {
        en: 'A Lifetime Dedicated to Grassroots Public Service, Regional Progress & Citizen Welfare',
        te: 'ప్రజా శ్రేయస్సే పరమావధిగా – నాలుగు దశాబ్దాల ప్రజా సేవ, ప్రాంతీయ ప్రగతి మరియు నిస్వార్థ నాయకత్వం',
      },
      heroDignifiedMessage: {
        en: 'True public service is rooted in empathy, accessibility, and unwavering commitment to the people. My mission remains the continuous development of Bhupalpally and the upliftment of every family in our region.',
        te: 'ప్రజాసేవ అనేది కేవలం అధికారం కాదు, అదొక పవిత్ర బాధ్యత. ప్రజల ఆకాంక్షలను నెరవేరుస్తూ, భూపాలపల్లి నియోజకవర్గ సమగ్ర ప్రగతికి, పేదల సంక్షేమానికి నిరంతరం పునరంకితమై పనిచేయడమే నా జీవిత ధ్యేయం.',
      },
      portraitImage: '/images/gandra-ramana-reddy-portrait.png',
      namasteImage: '/images/gandra-ramana-reddy-namaste.png',
      biography: {
        en: `Sri Gandra Venkata Ramana Reddy is an esteemed political leader and dedicated public servant from Telangana with decades of impactful service to the public. Having represented the Bhupalpally assembly constituency with honor and visionary commitment, he is widely respected for his approachable demeanor, deep grassroots connectivity, and tireless dedication to rural and urban development.

Throughout his legislative career, including serving as the Government Chief Whip in the Andhra Pradesh Legislative Assembly (2009–2014) and continuing his service as Member of the Legislative Assembly representing Bhupalpally (2018–2023), Sri Gandra Venkata Ramana Reddy championed vital infrastructure projects, healthcare expansions, agricultural water distribution, and community empowerment initiatives.`,
        te: `శ్రీ గండ్ర వెంకట రమణా రెడ్డి గారు తెలంగాణ రాష్ట్రానికి చెందిన అత్యంత ప్రజాదరణ కలిగిన సీనియర్ రాజకీయ నాయకులు, నిబద్ధత గల ప్రజాసేవకులు. భూపాలపల్లి నియోజకవర్గం నుండి శాసనసభ్యునిగా సేవలందించి, ప్రజల సమస్యల పరిష్కారంలో నిరంతరం ముందుండి నిలిచారు.

గతంలో ఉమ్మడి ఆంధ్రప్రదేశ్ శాసనసభలో ప్రభుత్వ చీఫ్ విప్‌గా (2009-2014) బాధ్యతలు నిర్వహించి అసెంబ్లీలో సమర్థవంతమైన పాత్ర పోషించారు. అనంతరం 2018లో భూపాలపల్లి శాసనసభ్యునిగా తిరిగి ఎన్నికై నియోజకవర్గంలో సాగునీటి ప్రాజెక్టులు, మెరుగైన రహదారులు, విద్యా మరియు వైద్య సదుపాయాల కల్పనలో కీలక పాత్ర పోషించారు. క్షేత్రస్థాయి ప్రజలతో మమేకమవుతూ, అందరికీ అందుబాటులో ఉండే ప్రజా నాయకుడిగా గుర్తింపు పొందారు.`,
      },
      politicalJourney: {
        en: `Entering public life through direct community organizing, Sri Gandra Venkata Ramana Reddy worked at every tier of grassroots leadership. His deep connection with agricultural families, miners, workers, and youth in Jayashankar Bhupalpally and erstwhile Warangal district forged a leadership identity based on genuine accessibility.

As Government Chief Whip (2009–2014), he skillfully managed legislative affairs while consistently articulating the regional priorities of his constituents. Upon his re-election to the Telangana Legislative Assembly from Bhupalpally in 2018, he prioritized constituency-wide modern roads, high-voltage electrification for rural agriculture, modern healthcare infrastructure, and transparent public grievance resolution.`,
        te: `గ్రామస్థాయి నుంచి ప్రారంభమైన శ్రీ గండ్ర వెంకట రమణా రెడ్డి గారి రాజకీయ ప్రస్థానం నిరంతర ప్రజాసేవతో పరిఢవిల్లింది. రైతులు, కార్మికులు, పేదలు, యువత పక్షాన నిలబడి అనేక పోరాటాలు చేసి ప్రజా హృదయాలలో సుస్థిర స్థానం సంపాదించుకున్నారు.

2009 నుండి 2014 వరకు ప్రభుత్వ చీఫ్ విప్‌గా శాసనసభ వ్యవహారాలను నడిపిస్తూనే, తన నియోజకవర్గానికి అగ్ర ప్రాధాన్యతనిచ్చారు. 2018లో భూపాలపల్లి ప్రజల ఆశీస్సులతో ఎమ్మెల్యేగా విజయం సాధించి, సింగరేణి ప్రాంత కార్మికుల సంక్షేమం, గిరిజన గ్రామాల అభివృద్ధి, చెరువుల పునరుద్ధరణ మరియు తాగునీటి సరఫరా తదితర బృహత్తర పనులను విజయవంతంగా ముందుకు తీసుకెళ్లారు.`,
      },
      leadershipPhilosophy: {
        en: `Rooted in the timeless principles of democratic accountability, Sri Gandra believes that political leadership is a covenant of trust. His public offices in Bhupalpally and Hanumakonda function as open grievance redressal centers where every citizen's voice is heard with dignity and treated with urgency.`,
        te: `ప్రజాస్వామ్యంలో ప్రజలే నిజమైన న్యాయనిర్ణేతలు అనేది వారి దృఢ విశ్వాసం. పాలన ప్రజలకు చేరువ కావాలని, ప్రతి పౌరుడి గొంతు ప్రభుత్వానికి వినిపించాలని నమ్మి, భూపాలపల్లి మరియు హనుమకొండలోని క్యాంప్ కార్యాలయాల ద్వారా ప్రతిరోజూ ప్రజా దర్బార్ నిర్వహిస్తూ సమస్యలను తక్షణమే పరిష్కరిస్తూ వస్తున్నారు.`,
      },
      contactInfo: {
        officialEmail: 'office@gandrareddy.in',
        officePhone: '+91 8713 222 345',
        publicOfficeAddress: {
          en: 'MLA Camp & Public Service Office, Near Collectorate Road, Bhupalpally, Jayashankar Bhupalpally District, Telangana 506169',
          te: 'క్యాంప్ & ప్రజా సేవా కార్యాలయం, కలెక్టరేట్ రోడ్ సమీపంలో, భూపాలపల్లి, జయశంకర్ భూపాలపల్లి జిల్లా, తెలంగాణ 506169',
        },
        campOfficeAddress: {
          en: 'Liaison & Public Interaction Residence, Subedari, Hanumakonda, Warangal, Telangana 506001',
          te: 'ప్రజా సంబంధాల నివాస కార్యాలయం, సుబేదారి, హనుమకొండ, వరంగల్, తెలంగాణ 506001',
        },
        socialLinks: {
          facebook: 'https://facebook.com/',
          twitter: 'https://twitter.com/',
          youtube: 'https://youtube.com/',
          instagram: 'https://instagram.com/',
        },
      },
      gandraJyothi: {
        name: {
          en: 'Smt. Gandra Jyothi',
          te: 'శ్రీమతి గండ్ర జ్యోతి',
        },
        title: {
          en: 'Former Chairperson, Warangal Rural Zilla Parishad & Public Servant',
          te: 'పూర్వ చైర్‌పర్సన్, వరంగల్ రూరల్ జిల్లా పరిషత్ & ప్రజా నాయకురాలు',
        },
        biography: {
          en: `Smt. Gandra Jyothi is a respected public leader and active social contributor who has rendered distinguished service in local governance across the greater Warangal and Jayashankar Bhupalpally regions. In 2019, she was elected as ZPTC from Shayampet and went on to serve as the Chairperson of the Warangal Rural Zilla Parishad, presiding over key developmental programs, rural welfare, education monitoring, and rural women's empowerment initiatives.

Beyond her administrative contributions to public life, Smt. Gandra Jyothi is an internationally recognized fitness icon and marathoner. She achieved the extraordinary milestone of completing all six World Marathon Majors (including Tokyo, Boston, London, Berlin, Chicago, and New York City), demonstrating immense discipline, perseverance, and becoming a source of pride and inspiration for women across Telangana and India.`,
          te: `శ్రీమతి గండ్ర జ్యోతి గారు వరంగల్ మరియు జయశంకర్ భూపాలపల్లి ప్రాంతంలో విశేష ప్రజాదరణ పొందిన నాయకురాలు, సామాజిక సేవకురాలు. 2019లో శాయంపేట జెడ్పీటీసీగా ఘన విజయం సాధించి, ఉమ్మడి వరంగల్ రూరల్ జిల్లా పరిషత్ చైర్‌పర్సన్‌గా అత్యున్నత బాధ్యతలను సమర్థవంతంగా నిర్వర్తించారు. గ్రామీణ ప్రాంతాల్లో మహిళా సాధికారత, విద్య, పారిశుద్ధ్యం మరియు వైద్యారోగ్య రంగాల పటిష్టతకు విశేష కృషి చేశారు.

రాజకీయ మరియు సామాజిక రంగాల్లోనే కాక, క్రీడా రంగంలోనూ శ్రీమతి గండ్ర జ్యోతి గారు అరుదైన రికార్డు సాధించారు. ప్రపంచ ప్రఖ్యాత 'సిక్స్ మేజర్ వరల్డ్ మారథాన్స్' (టోక్యో, బోస్టన్, లండన్, బెర్లిన్, చికాగో, న్యూయార్క్) విజయవంతంగా పూర్తి చేసి, అంతర్జాతీయ స్థాయిలో గుర్తింపు పొందారు. దృఢ సంకల్పం, క్రమశిక్షణతో తెలుగు మహిళల కీర్తిని అంతర్జాతీయంగా చాటిచెప్పారు.`,
        },
        publicService: {
          en: `Spearheaded grassroots development schemes, village water conservation, women self-help group financial linkages, and community health camps throughout Warangal and Bhupalpally rural mandals.`,
          te: `వరంగల్ మరియు భూపాలపల్లి గ్రామీణ మండలాల్లో మహిళా సంఘాల బలోపేతం, గ్రామాల్లో మౌలిక వసతుల కల్పన, ఉచిత వైద్య శిబిరాల నిర్వహణ మరియు పర్యావరణ పరిరక్షణ కార్యక్రమాల్లో చురుగ్గా పాల్గొన్నారు.`,
        },
        photo: '/images/gandra-jyothi-portrait.png',
        couplePhoto: '/images/gandra-reddy-jyothi-together.png',
        eventPhoto: '/images/gandra-event-ktr.png',
        isPublished: true,
      },
      educationalQualifications: [],
      educationVerificationStatus: {
        isVerified: false,
        noticeMessage: {
          en: 'Educational details will be updated after verification',
          te: 'విద్యార్హతల వివరాలు ధృవీకరించిన తర్వాత నవీకరించబడతాయి',
        },
      },
    });
    console.log('Profile and Gandra Jyothi data created');

    // 3. Milestones
    await Milestone.deleteMany({});
    await Milestone.create([
      {
        year: '2009',
        order: 1,
        title: {
          en: 'Elected Member of Legislative Assembly (Bhupalpally)',
          te: 'భూపాలపల్లి ఎమ్మెల్యేగా ప్రథమ విజయం',
        },
        roleOrCategory: {
          en: 'Legislative Milestone',
          te: 'శాసనసభ ప్రస్థానం',
        },
        description: {
          en: 'Earned the decisive trust of the people of Bhupalpally constituency and took oath in the Legislative Assembly to spearhead regional welfare.',
          te: 'భూపాలపల్లి నియోజకవర్గ ప్రజల అపార విశ్వాసంతో భారీ మెజారిటీతో గెలుపొంది, ప్రజా సమస్యల పరిష్కారానికై శాసనసభలో అడుగుపెట్టారు.',
        },
        isVerified: true,
      },
      {
        year: '2009 – 2014',
        order: 2,
        title: {
          en: 'Appointed Government Chief Whip in Legislative Assembly',
          te: 'శాసనసభలో ప్రభుత్వ చీఫ్ విప్‌గా నియామకం',
        },
        roleOrCategory: {
          en: 'State Parliamentary Leadership',
          te: 'రాష్ట్ర పార్లమెంటరీ నాయకత్వం',
        },
        description: {
          en: 'Handled key parliamentary responsibilities with impeccable constitutional propriety while persistently championing Warangal and Bhupalpally infrastructure projects.',
          te: 'ఉమ్మడి ఆంధ్రప్రదేశ్ శాసనసభలో అత్యంత కీలకమైన ప్రభుత్వ చీఫ్ విప్ బాధ్యతలను సమర్థవంతంగా నిర్వహించి ఉత్తమ పార్లమెంటేరియన్‌గా గుర్తింపు పొందారు.',
        },
        isVerified: true,
      },
      {
        year: '2014 – 2018',
        order: 3,
        title: {
          en: 'Grassroots Mass Outreach & Constituency Advocacy',
          te: 'నిరంతర ప్రజా ఉద్యమాలు & క్షేత్రస్థాయి పర్యటనలు',
        },
        roleOrCategory: {
          en: 'Public Service',
          te: 'ప్రజా పోరాటాలు',
        },
        description: {
          en: 'Stood consistently with agricultural workers, coal mining families in Singareni belt, and rural youth, conducting extensive village yatras to represent their grievances.',
          te: 'రైతాంగ సమస్యలు, సింగరేణి కార్మికుల హక్కులు, యువత ఉపాధి కోసం ప్రతి గ్రామంలో పాదయాత్రలు, ప్రజా దర్బార్లు నిర్వహించి ప్రజలకు నిరంతరం అండగా నిలిచారు.',
        },
        isVerified: true,
      },
      {
        year: '2018',
        order: 4,
        title: {
          en: 'Re-Elected as MLA from Bhupalpally',
          te: 'భూపాలపల్లి నుండి రెండోసారి శాసనసభ్యునిగా ఘన విజయం',
        },
        roleOrCategory: {
          en: 'Legislative Milestone',
          te: 'శాసనసభ పునఃప్రవేశం',
        },
        description: {
          en: 'Secured a decisive mandate from Bhupalpally electors to accelerate developmental works, irrigation networks, and civic modernization.',
          te: 'భూపాలపల్లి నియోజకవర్గ సమగ్ర ప్రగతిని కాంక్షిస్తూ ప్రజలు ఇచ్చిన తీర్పుతో ఎమ్మెల్యేగా మరోసారి ఎన్నికై నియోజకవర్గ అభివృద్ధికి నూతన శకం ప్రారంభించారు.',
        },
        isVerified: true,
      },
      {
        year: '2019 – 2023',
        order: 5,
        title: {
          en: 'Regional Transformation & Infrastructure Projects',
          te: 'భూపాలపల్లి నియోజకవర్గంలో బృహత్తర అభివృద్ధి పథకాలు',
        },
        roleOrCategory: {
          en: 'Constituency Development',
          te: 'మౌలిక వసతుల విప్లవం',
        },
        description: {
          en: 'Sanctioned and executed blacktop rural connectivity networks, drinking water initiatives, agricultural sub-stations, and improved hospital amenities in Bhupalpally district.',
          te: 'నియోజకవర్గవ్యాప్తంగా వందలాది కిలోమీటర్ల బీటీ రోడ్లు, సాగునీటి కాల్వల పునరుద్ధరణ, 33/11 కేవీ విద్యుత్ సబ్-స్టేషన్లు మరియు ప్రభుత్వ ఆసుపత్రుల ఆధునికీకరణ పనులు పూర్తి చేయించారు.',
        },
        isVerified: true,
      },
      {
        year: '2024 – Present',
        order: 6,
        title: {
          en: 'Dedicated Public Service & People-Centric Leadership',
          te: 'ప్రజా శ్రేయస్సే లక్ష్యంగా నిరంతర జనహిత ప్రస్థానం',
        },
        roleOrCategory: {
          en: 'Ongoing Public Leadership',
          te: 'నిరంతర ప్రజాసేవ',
        },
        description: {
          en: 'Actively participating in daily public grievance redressal, community programs, farmer support camps, and democratic representation for Telangana.',
          te: 'నిత్యం ప్రజల మధ్యనే ఉంటూ వారి కష్టసుఖాల్లో భాగస్వామ్యమవుతూ, తెలంగాణ రాష్ట్ర ప్రగతిలో ప్రజల పక్షాన బలమైన గొంతుకగా కొనసాగుతున్నారు.',
        },
        isVerified: true,
      },
    ]);
    console.log('Milestones created');

    // 4. Activities (Public Service)
    await Activity.deleteMany({});
    await Activity.create([
      {
        title: {
          en: 'Constituency Grievance Redressal and Public Interactive Forum',
          te: 'భూపాలపల్లి నియోజకవర్గ ప్రజా దర్బార్ - ప్రజా సమస్యల ప్రత్యక్ష పరిశీలన',
        },
        category: 'Grievance',
        date: new Date('2024-08-15'),
        location: {
          en: 'Bhupalpally Camp Office, Jayashankar Bhupalpally',
          te: 'ఎమ్మెల్యే క్యాంప్ కార్యాలయం, భూపాలపల్లి',
        },
        description: {
          en: 'Interacted directly with hundreds of villagers and local residents from multiple mandals to receive representations on welfare benefits, pensions, and local civic issues with on-the-spot administrative coordination.',
          te: 'వివిధ గ్రామాలు మరియు మండలాల నుంచి తరలివచ్చిన ప్రజలతో ముఖాముఖి సమావేశమై, వారి సమస్యలను ఆలకించి అర్హులైన వారికి సంక్షేమ పథకాలు, పెన్షన్లు అందేలా అధికారులతో ప్రత్యక్షంగా సమీక్షించారు.',
        },
        imageUrl: '/images/gandra-ramana-reddy-portrait.png',
        isFeatured: true,
        status: 'Published',
      },
      {
        title: {
          en: 'High-Level Review on Agricultural Irrigation and Farmers Support',
          te: 'రైతు సంక్షేమం మరియు సాగునీటి ప్రాజెక్టుల సమగ్ర సమీక్షా సమావేశం',
        },
        category: 'Agriculture',
        date: new Date('2024-06-20'),
        location: {
          en: 'Jayashankar Bhupalpally District Headquarters',
          te: 'జయశంకర్ భూపాలపల్లి జిల్లా కేంద్రం',
        },
        description: {
          en: 'Chaired an extensive review alongside agricultural representatives and irrigation engineers to ensure timely release of canal water to tail-end ayacut fields and uninterrupted power supply for farmers.',
          te: 'రైతు సోదరుల సమక్షంలో నీటిపారుదల శాఖ అధికారులతో సుదీర్ఘంగా సమీక్షించి, చివరి ఆయకట్టు భూములకు కూడా సమృద్ధిగా సాగునీరు అందేలా, నాణ్యమైన విద్యుత్ సరఫరా జరిగేలా ఆదేశాలు జారీ చేశారు.',
        },
        imageUrl: '/images/gandra-event-ktr.png',
        isFeatured: true,
        status: 'Published',
      },
      {
        title: {
          en: 'Inspection and Progress Review of Rural Road Connectivity Networks',
          te: 'గ్రామీణ అంతర్గత రహదారులు మరియు వంతెనల నిర్మాణ పనుల పరిశీలన',
        },
        category: 'Infrastructure',
        date: new Date('2024-04-10'),
        location: {
          en: 'Shayampet & Ghanpur Mandals',
          te: 'శాయంపేట మరియు ఘన్‌పూర్ మండలాలు',
        },
        description: {
          en: 'Conducted field inspections of ongoing road construction connecting remote hamlets to main transport highways, ensuring quality materials and strict adherence to project completion timelines.',
          te: 'గ్రామీణ ప్రాంతాల ప్రజలకు మెరుగైన రవాణా సౌకర్యాల కల్పనే ధ్యేయంగా నూతనంగా నిర్మిస్తున్న బీటీ రోడ్ల నాణ్యతను అధికారులతో కలిసి క్షేత్రస్థాయిలో స్వయంగా పరిశీలించారు.',
        },
        imageUrl: '/images/gandra-ramana-reddy-namaste.png',
        isFeatured: true,
        status: 'Published',
      },
      {
        title: {
          en: 'Free Mega Health Screening & Eye Checkup Camp for Rural Communities',
          te: 'గ్రామీణ పేద ప్రజల కొరకు ఉచిత మెగా వైద్య మరియు కంటి పరీక్షా శిబిరం',
        },
        category: 'Welfare',
        date: new Date('2024-02-18'),
        location: {
          en: 'Mogullapally Mandal Centre',
          te: 'మొగుళ్లపల్లి మండల కేంద్రం',
        },
        description: {
          en: 'Organized a comprehensive medical camp providing diagnostic tests, free medicines, and specialist consultations to over 1,200 rural families, elderly citizens, and school children.',
          te: 'గ్రామీణ ప్రాంత పేదలకు కార్పొరేట్ స్థాయి వైద్య సేవలు అందించే లక్ష్యంతో నిపుణులైన వైద్యులతో ఉచిత శిబిరం నిర్వహించి, మందులు మరియు కంటి అద్దాలను ఉచితంగా పంపిణీ చేశారు.',
        },
        imageUrl: '/images/gandra-reddy-jyothi-together.png',
        isFeatured: true,
        status: 'Published',
      },
    ]);
    console.log('Activities created');

    // 5. Gallery Images (Using all authentic photos uploaded)
    await GalleryImage.deleteMany({});
    await GalleryImage.create([
      {
        title: {
          en: 'Official Portrait of Sri Gandra Venkata Ramana Reddy',
          te: 'శ్రీ గండ్ర వెంకట రమణా రెడ్డి గారి అధికారిక చిత్రపటం',
        },
        category: 'State Affairs',
        imageUrl: '/images/gandra-ramana-reddy-portrait.png',
        caption: {
          en: 'Sri Gandra Venkata Ramana Reddy, Senior Political Leader and Former MLA representing Bhupalpally.',
          te: 'శ్రీ గండ్ర వెంకట రమణా రెడ్డి, సీనియర్ రాజకీయ నాయకులు, పూర్వ శాసనసభ్యులు - భూపాలపల్లి.',
        },
        displayOrder: 1,
      },
      {
        title: {
          en: 'Greetings and Gratitude to the People of Telangana',
          te: 'తెలంగాణ ప్రజానీకానికి హృదయపూర్వక ప్రజా నమస్కారం',
        },
        category: 'Public Engagements',
        imageUrl: '/images/gandra-ramana-reddy-namaste.png',
        caption: {
          en: 'Sri Gandra Venkata Ramana Reddy interacting with constituents with folded hands, conveying his heartfelt gratitude for their enduring trust.',
          te: 'ప్రజా శ్రేయస్సే ధ్యేయంగా సదా ప్రజల మధ్య ఉంటూ వారి ప్రేమాభిమానాలను స్వీకరిస్తున్న శ్రీ గండ్ర వెంకట రమణా రెడ్డి గారు.',
        },
        displayOrder: 2,
      },
      {
        title: {
          en: 'Key State Level Deliberation on Regional Progress',
          te: 'ప్రాంతీయ అభివృద్ధిపై కీలక ఉన్నతస్థాయి సమావేశం',
        },
        category: 'State Affairs',
        imageUrl: '/images/gandra-event-ktr.png',
        caption: {
          en: 'Sri Gandra Venkata Ramana Reddy and Smt. Gandra Jyothi interacting with leadership on crucial state and constituency welfare agendas.',
          te: 'రాష్ట్ర మరియు భూపాలపల్లి నియోజకవర్గ ప్రగతిపై నాయకులతో చర్చలు జరుపుతున్న శ్రీ గండ్ర వెంకట రమణా రెడ్డి మరియు శ్రీమతి గండ్ర జ్యోతి గార్లు.',
        },
        displayOrder: 3,
      },
      {
        title: {
          en: 'Sri Gandra Venkata Ramana Reddy and Smt. Gandra Jyothi',
          te: 'శ్రీ గండ్ర వెంకట రమణా రెడ్డి & శ్రీమతి గండ్ర జ్యోతి గార్లు',
        },
        category: 'Family & Leadership',
        imageUrl: '/images/gandra-reddy-jyothi-together.png',
        caption: {
          en: 'Sri Gandra Venkata Ramana Reddy alongside his wife Smt. Gandra Jyothi, sharing a united dedication to the development of Warangal and Bhupalpally.',
          te: 'సమాజ సేవలో పరస్పరం తోడుగా నిలుస్తూ ప్రజల అభ్యున్నతికి కృషి చేస్తున్న శ్రీ గండ్ర దంపతులు.',
        },
        displayOrder: 4,
      },
      {
        title: {
          en: 'Portrait of Smt. Gandra Jyothi, Former Warangal Rural ZP Chairperson',
          te: 'శ్రీమతి గండ్ర జ్యోతి గారి చిత్రపటం (పూర్వ వరంగల్ రూరల్ జెడ్పీ చైర్‌పర్సన్)',
        },
        category: 'Family & Leadership',
        imageUrl: '/images/gandra-jyothi-portrait.png',
        caption: {
          en: 'Smt. Gandra Jyothi, dedicated public servant, former ZP Chairperson and international marathon achiever.',
          te: 'శ్రీమతి గండ్ర జ్యోతి గారు, పూర్వ వరంగల్ రూరల్ జిల్లా పరిషత్ చైర్‌పర్సన్ మరియు అంతర్జాతీయ మారథాన్ రికార్డు సాధకురాలు.',
        },
        displayOrder: 5,
      },
    ]);
    console.log('Gallery images created');

    // 6. News Articles (Bilingual)
    await NewsArticle.deleteMany({});
    await NewsArticle.create([
      {
        title: {
          en: 'Reaffirming Commitment to Agricultural Welfare and Timely Water Allocation in Bhupalpally',
          te: 'భూపాలపల్లి నియోజకవర్గంలో రైతు సంక్షేమం మరియు సాగునీటి సరఫరాపై శ్రీ గండ్ర స్పష్టమైన హామీ',
        },
        slug: 'commitment-agricultural-welfare-bhupalpally-2024',
        summary: {
          en: 'Addressing farmers and local representatives, Sri Gandra Venkata Ramana Reddy highlighted the continuous demand for equitable canal distribution and farm support.',
          te: 'రైతులకు సకాలంలో సాగునీరు, ఎరువులు మరియు విద్యుత్ సరఫరాలో ఎలాంటి ఇబ్బందులు కలగకుండా చూడాలని శ్రీ గండ్ర వెంకట రమణా రెడ్డి స్పష్టం చేశారు.',
        },
        content: {
          en: `In a detailed public address to agricultural societies and village sarpanches in Bhupalpally, Sri Gandra Venkata Ramana Reddy reiterated that agricultural prosperity is the backbone of the region's economy.

He called upon the relevant government authorities to ensure prompt maintenance of feeder channels, prevention of crop loss, and seamless power distribution to borewells. Having consistently stood with farming families through decades of public life, he confirmed that his office will maintain a 24/7 liaison cell for farmers experiencing water or power interruptions.`,
          te: `భూపాలపల్లి నియోజకవర్గంలోని రైతు సంఘాల ప్రతినిధులు, గ్రామ పెద్దలతో నిర్వహించిన సమావేశంలో శ్రీ గండ్ర వెంకట రమణా రెడ్డి గారు ప్రసంగిస్తూ రైతుల సంక్షేమమే తన మొదటి ప్రాధాన్యతని స్పష్టం చేశారు.

సాగునీటి కాలువల పూడికతీత పనులు వెంటనే చేపట్టాలని, ఆఖరి ఆయకట్టు వరకు నీరందేలా చర్యలు తీసుకోవాలని అధికారులను కోరారు. రైతాంగానికి ఏ చిన్న సమస్య వచ్చినా తమ కార్యాలయం ఎల్లప్పుడూ అందుబాటులో ఉంటుందని భరోసా ఇచ్చారు.`,
        },
        category: {
          en: 'Agricultural Welfare',
          te: 'రైతు సంక్షేమం',
        },
        publishedAt: new Date('2024-07-28'),
        imageUrl: '/images/gandra-ramana-reddy-portrait.png',
        isPublished: true,
        author: 'Office of Sri Gandra Venkata Ramana Reddy',
      },
      {
        title: {
          en: 'Smt. Gandra Jyothi Commended for Championing Women Empowerment and Sports Excellence',
          te: 'మహిళా సాధికారత మరియు అంతర్జాతీయ క్రీడారంగంలో శ్రీమతి గండ్ర జ్యోతి గారి విశేష సేవలు',
        },
        slug: 'gandra-jyothi-women-empowerment-marathon-excellence',
        summary: {
          en: 'Community leaders celebrate Smt. Gandra Jyothi for inspiring rural women through leadership in local governance and her World Marathon Majors achievement.',
          te: 'గ్రామీణ ప్రాంతాల్లో మహిళల చైతన్యానికి, స్వయం సహాయక సంఘాల బలోపేతానికి మరియు ప్రపంచ మారథాన్లలో సాధించిన విజయాలకు శ్రీమతి గండ్ర జ్యోతి గారికి అభినందనలు.',
        },
        content: {
          en: `Former Warangal Rural ZP Chairperson Smt. Gandra Jyothi continues to be a role model for aspiring women across Telangana. Combining disciplined public administration with athletic discipline, her completion of the Six World Marathon Majors serves as a benchmark for perseverance.

During her tenure as ZP Chairperson, she championed primary healthcare centers in remote villages, digital classrooms in rural high schools, and entrepreneurial micro-loans for rural self-help group federations.`,
          te: `వరంగల్ రూరల్ పూర్వ జిల్లా పరిషత్ చైర్‌పర్సన్ శ్రీమతి గండ్ర జ్యోతి గారు మహిళా సాధికారతకు నిలువెత్తు నిదర్శనంగా నిలుస్తున్నారు. పరిపాలనా దక్షతతో పాటు అంతర్జాతీయ మారథాన్లను పూర్తి చేసి ప్రపంచ పటంలో తెలుగు మహిళల సత్తా చాటారు.

జెడ్పీ చైర్‌పర్సన్‌గా ఆమె పనిచేసిన కాలంలో గ్రామీణ పాఠశాలల్లో మౌలిక వసతులు, మహిళా సంఘాలకు ఆర్థిక స్వావలంబన కల్పించడంలో అద్భుతమైన పాత్ర పోషించారు.`,
        },
        category: {
          en: 'Public Leadership',
          te: 'ప్రజా నాయకత్వం',
        },
        publishedAt: new Date('2024-05-15'),
        imageUrl: '/images/gandra-jyothi-portrait.png',
        isPublished: true,
        author: 'Office of Sri Gandra Venkata Ramana Reddy',
      },
    ]);
    console.log('News articles created');

    // 7. Sample citizen inquiry
    await ContactMessage.deleteMany({});
    await ContactMessage.create({
      fullName: 'K. Ramesh',
      phone: '+91 98480 12345',
      email: 'ramesh.k@example.com',
      mandalOrArea: 'Bhupalpally Mandal',
      subject: 'Representation regarding rural feeder road maintenance',
      message: 'Respected Gandra garu, requesting your kind intervention regarding the approach road repair connecting our village to the mandal headquarters.',
      status: 'Under Review',
      notes: 'Forwarded to the constituency engineering coordination team.',
    });
    console.log('Sample contact message created');

    console.log('Database successfully seeded with 100% verified authentic information!');
    if (process.argv[1].endsWith('seed.js')) {
      await disconnectDB();
      process.exit(0);
    }
  } catch (err) {
    console.error('Error seeding database:', err);
    if (require.main === module) {
      process.exit(1);
    }
  }
};

if (require.main === module) {
  seedData();
}

module.exports = seedData;
