const mongoose = require('mongoose');

const BilingualTextSchema = new mongoose.Schema(
  {
    en: { type: String, default: '' },
    te: { type: String, default: '' },
  },
  { _id: false }
);

const ProfileSchema = new mongoose.Schema(
  {
    fullName: {
      en: { type: String, default: 'Gandra Venkata Ramana Reddy' },
      te: { type: String, default: 'గండ్ర వెంకట రమణా రెడ్డి' },
    },
    designation: {
      en: { type: String, default: 'Senior Political Leader & Former Member of Legislative Assembly' },
      te: { type: String, default: 'సీనియర్ రాజకీయ నాయకులు & పూర్వ శాసనసభ్యులు' },
    },
    constituency: {
      en: { type: String, default: 'Bhupalpally Constituency, Jayashankar Bhupalpally District, Telangana' },
      te: { type: String, default: 'భూపాలపల్లి నియోజకవర్గం, జయశంకర్ భూపాలపల్లి జిల్లా, తెలంగాణ' },
    },
    tagline: {
      en: { type: String, default: 'Decades of Dedicated Public Service, Grassroots Advocacy & Regional Development' },
      te: { type: String, default: 'ప్రజా శ్రేయస్సే ధ్యేయంగా - దశాబ్దాల ప్రజా సేవ, ప్రజా సంక్షేమం మరియు ప్రాంతీయ అభివృద్ధి' },
    },
    heroDignifiedMessage: {
      en: { type: String, default: 'Dedicated to the people of Telangana and the progress of Bhupalpally through transparent, accessible public service and steadfast community development.' },
      te: { type: String, default: 'నిరంతరం ప్రజల పక్షాన నిలుస్తూ, భూపాలపల్లి సమగ్ర ప్రగతి, పేదల సంక్షేమం మరియు పారదర్శక ప్రజా పాలనే నా ఆశయం.' },
    },
    portraitImage: {
      type: String,
      default: '/images/gandra-ramana-reddy-portrait.png',
    },
    namasteImage: {
      type: String,
      default: '/images/gandra-ramana-reddy-namaste.png',
    },
    biography: {
      en: { type: String, default: '' },
      te: { type: String, default: '' },
    },
    politicalJourney: {
      en: { type: String, default: '' },
      te: { type: String, default: '' },
    },
    leadershipPhilosophy: {
      en: { type: String, default: '' },
      te: { type: String, default: '' },
    },
    contactInfo: {
      officialEmail: { type: String, default: 'contact@gandrareddy.in' },
      officePhone: { type: String, default: '+91 8713 222 345' },
      publicOfficeAddress: {
        en: { type: String, default: 'MLA Camp Office, Main Road, Bhupalpally, Jayashankar Bhupalpally District, Telangana 506169' },
        te: { type: String, default: 'ఎమ్మెల్యే క్యాంప్ కార్యాలయం, మెయిన్ రోడ్, భూపాలపల్లి, జయశంకర్ భూపాలపల్లి జిల్లా, తెలంగాణ 506169' },
      },
      campOfficeAddress: {
        en: { type: String, default: 'Residence & Public Liaison Office, Hanumakonda, Telangana' },
        te: { type: String, default: 'నివాసం & ప్రజా సంబంధాల కార్యాలయం, హనుమకొండ, తెలంగాణ' },
      },
      socialLinks: {
        facebook: { type: String, default: '' },
        twitter: { type: String, default: '' },
        youtube: { type: String, default: '' },
        instagram: { type: String, default: '' },
        linkedin: { type: String, default: '' },
      },
    },
    gandraJyothi: {
      name: {
        en: { type: String, default: 'Smt. Gandra Jyothi' },
        te: { type: String, default: 'శ్రీమతి గండ్ర జ్యోతి' },
      },
      title: {
        en: { type: String, default: 'Former Chairperson, Warangal Rural Zilla Parishad & Public Servant' },
        te: { type: String, default: 'పూర్వ చైర్‌పర్సన్, వరంగల్ రూరల్ జిల్లా పరిషత్ & ప్రజా సేవకురాలు' },
      },
      biography: {
        en: { type: String, default: '' },
        te: { type: String, default: '' },
      },
      publicService: {
        en: { type: String, default: '' },
        te: { type: String, default: '' },
      },
      introduction: {
        en: { type: String, default: 'A lifetime of dedication to local governance, rural development, women’s economic independence, and athletic perseverance.' },
        te: { type: String, default: 'గ్రామీణాభివృద్ధి, మహిళా సాధికారత, నిస్వార్థ ప్రజాసేవ మరియు పట్టుదలతో కూడిన నాయకత్వ ప్రస్థానం.' },
      },
      communityInvolvement: {
        en: { type: String, default: 'Extensive grassroots engagement across Warangal and Bhupalpally mandals supporting women self-help federations, farmer families, and educational infrastructure.' },
        te: { type: String, default: 'వరంగల్, భూపాలపల్లి గ్రామీణ మండలాల్లో మహిళా స్వయం సహాయక సంఘాల బలోపేతం, రైతు కుటుంబాలకు అండగా నిలవడం మరియు పాఠశాలల్లో మౌలిక వసతుల పర్యవేక్షణ.' },
      },
      marathonHeading: {
        en: { type: String, default: 'World Marathon Majors — Six Star Finisher' },
        te: { type: String, default: 'వరల్డ్ మారథాన్ మేజర్స్ — సిక్స్ స్టార్ ఫినిషర్' },
      },
      marathonDesc: {
        en: { type: String, default: 'Completed all six prestigious World Marathon Majors (Tokyo, Boston, London, Berlin, Chicago, New York City), exemplifying extraordinary discipline, stamina, and representing Indian women on the world sports stage.' },
        te: { type: String, default: 'ప్రపంచ ప్రసిద్ధ ఆరు మేజర్ మారథాన్‌లను (టోక్యో, బోస్టన్, లండన్, బెర్లిన్, చికాగో, న్యూయార్క్) విజయవంతంగా పూర్తి చేసి, దృఢ సంకల్పంతో అంతర్జాతీయ స్థాయిలో తెలుగు మహిళల కీర్తిని సగర్వంగా నిలిపారు.' },
      },
      photo: {
        type: String,
        default: '/images/gandra-jyothi-portrait.png',
      },
      couplePhoto: {
        type: String,
        default: '/images/gandra-reddy-jyothi-together.png',
      },
      eventPhoto: {
        type: String,
        default: '/images/gandra-event-ktr.png',
      },
      isPublished: {
        type: Boolean,
        default: true,
      },
      socialLinks: {
        facebook: { type: String, default: '' },
        instagram: { type: String, default: '' },
        twitter: { type: String, default: '' },
        youtube: { type: String, default: '' },
        linkedin: { type: String, default: '' },
      },
      educationalQualifications: [
        {
          qualification: { en: { type: String, default: '' }, te: { type: String, default: '' } },
          institution: { en: { type: String, default: '' }, te: { type: String, default: '' } },
          yearOfCompletion: { type: String, default: '' },
          isVerified: { type: Boolean, default: false },
        },
      ],
      educationVerificationStatus: {
        isVerified: { type: Boolean, default: false },
        noticeMessage: {
          en: { type: String, default: 'Educational details will be updated after verification' },
          te: { type: String, default: 'విద్యార్హతల వివరాలు ధృవీకరించిన తర్వాత నవీకరించబడతాయి' },
        },
      },
    },
    educationalQualifications: [
      {
        qualification: {
          en: { type: String, default: '' },
          te: { type: String, default: '' },
        },
        institution: {
          en: { type: String, default: '' },
          te: { type: String, default: '' },
        },
        fieldOfStudy: {
          en: { type: String, default: '' },
          te: { type: String, default: '' },
        },
        yearOfCompletion: {
          type: String,
          default: '',
        },
        notes: {
          en: { type: String, default: '' },
          te: { type: String, default: '' },
        },
        order: {
          type: Number,
          default: 0,
        },
        isVerified: {
          type: Boolean,
          default: true,
        },
      },
    ],
    educationVerificationStatus: {
      isVerified: {
        type: Boolean,
        default: false,
      },
      noticeMessage: {
        en: { type: String, default: 'Educational details will be updated after verification' },
        te: { type: String, default: 'విద్యార్హతల వివరాలు ధృవీకరించిన తర్వాత నవీకరించబడతాయి' },
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Profile', ProfileSchema);
