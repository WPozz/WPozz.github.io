/**
 * PORTFOLIO JAVASCRIPT - WILLIAM POZZOLINI
 * Interactive features:
 * 1. Real-Time Dynamic Bilingual Switcher (Italiano <-> English) with localStorage
 * 2. Dark / Light Theme Engine with localStorage & dynamic icon update
 * 3. Working Project Category Filter (Tutti/All, DL, BCI, Health)
 * 4. Interactive Project Detail Modals (ESC to close, overlay click)
 * 5. 1-Click Clipboard Email Copy with Localized Toast Notification
 * 6. Responsive Mobile Navigation & Scrollspy Tracking
 */

// --- BILINGUAL I18N DICTIONARY ---
const translations = {
    it: {
        // Nav
        nav_about: '<i class="fa-regular fa-user"></i> Chi Sono',
        nav_experience: '<i class="fa-solid fa-briefcase"></i> Esperienza',
        nav_projects: '<i class="fa-solid fa-code"></i> Progetti',
        nav_education: '<i class="fa-solid fa-graduation-cap"></i> Formazione',
        nav_skills: '<i class="fa-solid fa-microchip"></i> Competenze',
        nav_contact: '<i class="fa-regular fa-envelope"></i> Contatti',
        nav_cv: '<i class="fa-solid fa-file-arrow-down"></i> Scarica CV',

        // Hero
        hero_badge: 'Ricercatore in Deep Learning & Bioingegneria',
        hero_greeting: 'Ciao, sono',
        hero_subtitle: 'Sviluppo modelli computazionali avanzati all\'intersezione tra Intelligenza Artificiale, Neuroimaging 3D e Ingegneria Biomedica. Attualmente impegnato nella ricerca su paradigmi di Self-Supervised Learning e Brain-Computer Interfaces.',
        hero_tag_1: 'Neuroimaging & SSL',
        hero_tag_2: 'PyTorch & HPC',
        hero_tag_3: 'Padova / Pescara, Italia',
        hero_btn_projects: '<i class="fa-solid fa-diagram-project"></i> Esplora i Progetti',
        hero_btn_cv: '<i class="fa-solid fa-download"></i> Scarica il CV (PDF)',
        hero_btn_contact: 'Contattami <i class="fa-solid fa-arrow-right"></i>',
        
        // Terminal
        t_k_name: '"nome"',
        t_k_role: '"ruolo"',
        t_k_inst: '"istituto"',
        t_k_proj: '"progetto"',
        t_k_areas: '"ambiti_ricerca"',
        t_k_status: '"stato"',
        t_v_status: '"Attivo nella Ricerca NeuroAI"',
        t_cuda_out: 'Dispositivi CUDA: 4 (Cluster Multi-GPU SLURM Operativo)',

        // About
        about_subtitle: 'Profilo & Visione Scientifica',
        about_title: 'Chi Sono',
        about_lead: 'Unire l\'Ingegneria Biomedica al Deep Learning per l\'innovazione neurotecnologica.',
        about_p1: 'Sono uno studente magistrale in <strong>Bioingegneria</strong> presso l\'<strong>Università degli Studi di Padova</strong> e Ricercatore in Deep Learning presso il <strong>Padova Neuroscience Center (PNC)</strong>, sotto la supervisione del Prof. Manfredo Atzori.',
        about_p2: 'La mia attività scientifica si concentra sull\'applicazione di architetture di <strong>Self-Supervised Learning (SSL)</strong> a dataset eterogenei di neuroimaging tridimensionale nel quadro del <strong>progetto europeo HEREDITARY</strong>. Sviluppo modelli ibridi <strong>CNN-Transformer</strong> per l\'estrazione non supervisionata di fenotipi clinici latenti e interpretabili da risonanze magnetiche 3D.',
        about_p3: 'Forte di una Laurea Triennale con lode/101 in Ingegneria Biomedica conseguita presso l\'Università "G. d\'Annunzio" di Chieti-Pescara (con focus su modellazione biomeccanica e analisi FEA), coniugo calcolo computazionale ad alte prestazioni (HPC, SLURM, PyTorch distribuito), decodifica di segnali elettroencefalografici (EEG/BCI) e rigore metodologico.',
        about_lang_title: 'Profilo Internazionale & Competenze Linguistiche',
        about_lang_sub: 'Anno accademico (2015–2016) svolto presso la <em>Scuola Europea di Bruxelles I (EEB1 - Uccle, Belgio)</em> in un contesto accademico multilingue.',
        lang_it: 'Italiano',
        lang_lvl_native: 'Madrelingua',
        lang_en: 'Inglese',
        lang_lvl_c1: 'C1 (Avanzato)',
        lang_fr: 'Francese',
        lang_lvl_b2: 'B2',
        lang_de: 'Tedesco',
        lang_lvl_b1: 'B1',
        lang_es: 'Spagnolo',
        card_ai_title: 'Medical AI & SSL',
        card_ai_desc: 'Sviluppo di paradigmi C-JEPA, regolarizzazione VICReg e Vision Transformers per l\'elaborazione volumetrica di scansioni MRI e TC 3D.',
        card_hpc_title: 'HPC & Calcolo Multi-GPU',
        card_hpc_desc: 'Orchestrazione di cluster Linux tramite SLURM workload manager, ottimizzazioni CUDA AMP e training loop scalabili.',
        card_bci_title: 'Neuro-Robotica & BCI',
        card_bci_desc: 'Estrazione real-time di feature bandpower da tracciati EEG, classificazione di motor imagery e integrazione su nodi ROS.',
        card_fea_title: 'Biomeccanica Computazionale',
        card_fea_desc: 'Segmentazione anatomica 3D (ITK-SNAP) e simulazioni agli elementi finiti (FEA) su COMSOL Multiphysics per valutazioni strutturali.',

        // Experience
        exp_subtitle: 'Percorso Professionale',
        exp_title: 'Esperienze di Ricerca',
        exp1_badge: 'Feb. 2026 – Presente',
        exp1_role: 'Deep Learning Researcher',
        exp1_loc: 'Padova, Veneto, Italia (Ibrido)',
        exp1_proj_label: 'Progetto EU HEREDITARY:',
        exp1_b1: 'Progettazione e implementazione di una pipeline end-to-end di <strong>Self-Supervised Learning (SSL)</strong> in PyTorch, integrando i paradigmi <strong>C-JEPA</strong> e <strong>VICReg intra-soggetto</strong> per estrarre fenotipi latenti da dati di neuroimaging 3D non etichettati.',
        exp1_b2: 'Sviluppo di un\'architettura multimodale <strong>CNN-Transformer</strong> dotata di modulo <strong>TokenLearner</strong> e attenzione spaziale per comprimere feature map multi-scala in embedding anatomicamente localizzati.',
        exp1_b3: 'Elaborazione e campionamento del dataset eterogeneo <strong>FOMO-300K (318.000+ volumi MRI)</strong> con ottimizzazione dei loop di addestramento distribuito su cluster Linux multi-GPU tramite <strong>SLURM</strong>.',
        exp1_b4: 'Applicazione di procedure automatiche di anonimizzazione biometrica (<strong>defacing via SynthSeg+</strong>) a tutela della privacy sui dati clinici neurodiagnostici.',
        exp2_badge: 'Dic. 2023 – Feb. 2024',
        exp2_role: 'Tirocinante Ricercatore – Biomeccanica Computazionale',
        exp2_loc: 'Pescara, Abruzzo, Italia (In presenza)',
        exp2_b1: 'Segmentazione semi-automatica di scansioni TC diagnostiche per l\'estrazione di regioni di interesse anatomiche (ROI vertebrali) tramite <strong>ITK-SNAP</strong>.',
        exp2_b2: 'Conduzione di analisi agli elementi finiti (<strong>FEA</strong>) tramite <strong>COMSOL Multiphysics</strong> per la valutazione comparativa delle sollecitazioni biomeccaniche su vertebre sane e patologiche.',
        exp2_b3: 'Standardizzazione e stesura della documentazione tecnica dei protocolli e workflow computazionali.',

        // Projects
        proj_subtitle: 'Portfolio Tecnico & Scientifico',
        proj_title: 'Progetti Accademici & Applicati',
        filter_all: 'Tutti i Progetti',
        filter_dl: 'Deep Learning & AI',
        filter_bci: 'Neuro & BCI',
        filter_health: 'Health Tech & Mobile',
        btn_details: '<i class="fa-solid fa-circle-info"></i> Dettagli',
        btn_close: 'Chiudi',
        btn_github_repo: 'Repository GitHub',

        p1_type: 'Tesi Magistrale / Progetto EU',
        p1_title: 'Anatomical-Aware SSL for Phenotype Clustering',
        p1_desc: 'Pipeline PyTorch per l\'estrazione non supervisionata di rappresentazioni fenotipiche latenti da risonanze magnetiche cerebrali 3D (dataset FOMO-300K).',
        p1_hl1: 'TokenLearner & Attenzione Spaziale',
        p1_hl2: 'Accelerazione Multi-GPU su SLURM',

        p2_type: 'Medical NLP & PyTorch',
        p2_title: 'Clinical NLP – Medical Transcription Classification',
        p2_desc: 'Pipeline NLP basata su Transformer (Bio-ClinicalBERT) per la classificazione multi-classe automatica di referti e trascrizioni in 13+ specialità cliniche.',
        p2_hl1: '91% Top-3 Accuracy',
        p2_hl2: 'Custom Focal Loss & CUDA AMP',

        p3_type: 'Mobile App & Wearable',
        p3_title: 'Kairos – Monitoraggio Stress & Sedentarietà',
        p3_desc: 'Applicazione mobile Flutter con integrazione di dispositivi wearable (Fitbit) per il rilevamento continuativo dello stress lavorativo e della sedentarietà.',
        p3_hl1: 'Studio validato su 212 lavoratori (12 regioni IT)',
        p3_hl2: 'In preparazione per il rilascio su Google Play',

        p4_type: 'Neuroingegneria & BCI',
        p4_title: 'Real-Time EEG/BCI Motor Imagery in ROS',
        p4_desc: 'Classificatore a soglia per discriminare task di motor imagery (mano destra/sinistra e piedi) in tempo reale mediante feature di potenza di banda EEG.',
        p4_hl1: 'Calcolo della potenza di banda in streaming',
        p4_hl2: 'Integrazione nodo Robot Operating System',

        p5_type: 'Machine Learning Clinico',
        p5_title: 'Predizione del Diabete con Support Vector Machines',
        p5_desc: 'Pipeline end-to-end scikit-learn con benchmark di kernel SVM (Lineare, RBF, Polinomiale), tuning via GridSearchCV e analisi di interpretabilità.',
        p5_hl1: 'Metrica Balanced Accuracy & Gestione Imbalance',
        p5_hl2: 'Interpretabilità delle decisioni cliniche',

        p6_type: 'Tesi Triennale / Analisi FEA',
        p6_title: 'Modellazione FEA di Vertebra Lombare Sana vs Patologica',
        p6_desc: 'Modellazione 3D e analisi biomeccanica agli elementi finiti di una vertebra lombare a partire da scansioni diagnostiche TC comparative.',
        p6_hl1: 'Segmentazione anatomica 3D in ITK-SNAP',
        p6_hl2: 'Simulazioni sollecitazioni Von Mises in COMSOL',

        // Education
        edu_subtitle: 'Percorso Accademico',
        edu_title: 'Istruzione & Formazione',
        edu1_degree: 'Laurea Magistrale in Bioingegneria',
        edu1_badge: 'Set. 2024 – Set. 2026',
        edu1_avg_lbl: 'Media Attuale:',
        edu1_sup_lbl: 'Relatore:',
        edu1_loc_lbl: 'Sede:',
        edu1_loc_val: 'Padova, Italia',
        edu1_thesis_lbl: 'Tesi di Ricerca:',
        edu1_courses_lbl: 'Corsi Chiave di Specializzazione:',
        c_dl: 'Deep Learning applied to Neuroscience',
        c_ml: 'Machine Learning',
        c_bio: 'Biosensors',
        c_sig: 'Advanced Bio-signal Analysis',
        c_rob: 'Neuro-robotics',
        c_img: 'Imaging for Neuroscience',

        edu2_degree: 'Laurea Triennale in Ingegneria Biomedica',
        edu2_badge: 'Ott. 2021 – Lug. 2024',
        edu2_grade_lbl: 'Votazione Finale:',
        edu2_sup_lbl: 'Relatrice:',
        edu2_loc_lbl: 'Sede:',
        edu2_loc_val: 'Pescara, Italia',
        edu2_thesis_lbl: 'Tesi Triennale:',
        edu2_thesis_val: 'Modellazione e analisi agli elementi finiti (FEA) di una vertebra lombare: confronto tra caso sano e patologico.',
        edu3_desc: 'Anno accademico internazionale svolto all\'interno di un contesto didattico multilingue e multiculturale, consolidando la padronanza fluida di <strong>Francese</strong> e <strong>Tedesco</strong>, oltre all\'Inglese avanzato e all\'Italiano madrelingua.',

        // Skills
        skills_subtitle: 'Stack Tecnologico & Ambiti Operativi',
        skills_title: 'Competenze Tecniche & Scientifiche',
        sk1_title: 'Deep Learning & Intelligenza Artificiale',
        sk1_sub: 'Modelli generativi, SSL e reti neurali complesse',
        sk_chip_pytorch: 'Architetture custom, DDP, AMP & Loss focalizzate',
        sk_chip_ssl: 'Paradigmi predittivi C-JEPA & regolarizzazione VICReg',
        sk_chip_vit: 'Compressione e attenzione spaziale su volumi 3D',
        sk_chip_nlp: 'Bio-ClinicalBERT, classificazione clinica multi-classe',
        sk_chip_ml_name: 'Machine Learning Tradizionale',
        sk_chip_ml_desc: 'scikit-learn, SVM kernel tuning (GridSearchCV), TensorFlow',
        sk_chip_num_name: 'Calcolo Numerico & Statistica',
        sk_chip_num_desc: 'NumPy, SciPy, R (Caret, GBM), LaTeX per stesura scientifica',

        sk2_title: 'HPC, Calcolo Distribuito & Strumenti',
        sk2_sub: 'Gestione risorse cluster e ambienti di sviluppo',
        sk_chip_slurm: 'Job scheduling, allocazione nodi cluster ed esecuzione batch',
        sk_chip_gpu: 'CUDA Automatic Mixed Precision (AMP), monitoraggio hardware',
        sk_chip_git: 'Controllo di versione, branching strategy e CI/CD workflow',
        sk_chip_linux_name: 'Ambiente Linux & Shell Bash',
        sk_chip_linux_desc: 'Automazione di pipeline, scripting e gestione remota SSH',
        sk_chip_ros: 'Comunicazione publisher/subscriber per streaming neurale',
        sk_chip_mobile_name: 'Sviluppo Mobile (Flutter & Dart)',
        sk_chip_mobile_desc: 'Architettura data layer, Provider e integrazione REST API',

        sk3_title: 'Bioingegneria & Elaborazione Biosegnali',
        sk3_sub: 'Analisi tracciati EEG, sensori indossabili e decodifica BCI',
        sk_chip_eeg: 'Classificazione in tempo reale di paradigmi di Motor Imagery',
        sk_chip_filt_name: 'Filtraggio Digitale & Bandpower',
        sk_chip_filt_desc: 'Estrazione ritmi Mu/Beta con filtri passa-banda di Butterworth',
        sk_chip_matlab: 'Elaborazione avanzata di segnali fisiologici e spettrografia',
        sk_chip_wear_name: 'Biosensori Indossabili',
        sk_chip_wear_desc: 'Integrazione API Fitbit (HRV, parametri circadiani, attività)',
        sk_chip_gdpr_name: 'Conformità Dati Clinici (GDPR)',
        sk_chip_gdpr_desc: 'Trattamento etico e anonimizzato dei parametri sanitari',

        sk4_title: 'Medical Imaging 3D & Biomeccanica',
        sk4_sub: 'Analisi volumetrica e simulazione computazionale',
        sk_chip_mri_name: 'Neuroimaging 3D Volumetrico',
        sk_chip_mri_desc: 'Preprocessing e normalizzazione di dataset MRI (FOMO-300K)',
        sk_chip_def_name: 'Anonimizzazione Biometrica (Defacing)',
        sk_chip_def_desc: 'Defacing automatizzato tramite SynthSeg+ su volumi cerebrali',
        sk_chip_itk_name: 'Segmentazione ROI (ITK-SNAP)',
        sk_chip_itk_desc: 'Estrazione semi-automatica di strutture ossee da scansioni TC',
        sk_chip_comsol: 'Modellazione ad elementi finiti, meshing 3D e carichi di stress',
        sk_chip_bioeval_name: 'Valutazione Biomeccanica Strutturale',
        sk_chip_bioeval_desc: 'Distribuzione delle sollecitazioni di Von Mises in casi patologici',

        // Contact
        contact_subtitle: 'Collaborazioni Scientifiche & Opportunità',
        contact_title: 'Mettiti in Contatto',
        contact_info_title: 'Contatti Diretti',
        contact_info_desc: 'Sono sempre disponibile per confrontarmi su progetti di ricerca in NeuroAI, sfide di bioingegneria, opportunità professionali e collaborazioni scientifiche.',
        contact_lbl_phone: 'Telefono',
        contact_lbl_loc: 'Sede',
        contact_val_loc: 'Padova / Pescara, Italia',
        form_title: 'Invia un Messaggio',
        form_lbl_name: 'Nome / Ente / Università',
        form_lbl_email: 'Indirizzo Email',
        form_lbl_subject: 'Oggetto',
        form_lbl_msg: 'Messaggio',
        form_btn_send: '<i class="fa-solid fa-paper-plane"></i> Invia tramite Client Email',

        // Footer
        footer_rights: 'Tutti i diritti riservati.',
        footer_gdpr: 'Trattamento dati autorizzato ai sensi del Regolamento UE 2016/679 (GDPR).',

        // Modals
        m1_title: 'EU HEREDITARY: Anatomical-Aware SSL',
        m1_h1: 'Obiettivo Scientifico',
        m1_p1: 'Estrarre rappresentazioni fenotipiche latenti e interpretabili da risonanze magnetiche 3D senza l\'uso di annotazioni diagnostiche manuali (approccio non supervisionato), abilitando il clustering di sottogruppi clinici nel quadro del progetto europeo HEREDITARY.',
        m1_h2: 'Architettura & Metodologia',
        m1_li1: '<strong>Paradigma Ibrido SSL:</strong> Combinazione tra architettura predittiva congiunta (C-JEPA) e regolarizzazione di varianza-invarianza-covarianza (VICReg intra-soggetto) per prevenire il collasso delle rappresentazioni.',
        m1_li2: '<strong>CNN-Transformer con TokenLearner:</strong> Estrazione di feature volumetriche multi-scala tramite backbone CNN 3D, compresse da un modulo TokenLearner in token spazialmente localizzati processati da blocchi Transformer.',
        m1_li3: '<strong>Infrastruttura HPC:</strong> Elaborazione su larga scala del dataset eterogeneo FOMO-300K (oltre 318.000 volumi MRI) con precisione mista automatica (CUDA AMP) su cluster multi-GPU con scheduler SLURM.',
        m1_li4: '<strong>Privacy & Anonimizzazione:</strong> Pipeline automatica di biometric defacing via SynthSeg+ conforme agli standard clinici di sicurezza.',

        m2_title: 'Clinical NLP – Medical Transcription Classification',
        m2_h1: 'Panoramica del Progetto',
        m2_p1: 'Classificazione automatica multi-classe di referti e trascrizioni cliniche complesse in 13+ specialità mediche per ottimizzare i flussi di triage documentale ospedaliero.',
        m2_h2: 'Dettagli Metodologici & Risultati',
        m2_li1: 'Fine-tuning del modello Transformer pre-addestrato sul dominio biomedico <strong>Bio-ClinicalBERT</strong>.',
        m2_li2: 'Introduzione di una <strong>Focal Loss</strong> pesata personalizzata per superare il severo sbilanciamento delle classi tra specialità rare e frequenti.',
        m2_li3: 'Raggiungimento di una <strong>Top-3 Accuracy del 91%</strong> validata tramite curve Precision-Recall e matrici di confusione standardizzate.',
        m2_li4: 'Addestramento accelerato su GPU tramite PyTorch Automatic Mixed Precision (AMP).',

        m3_title: 'Kairos – Monitoraggio Stress & Sedentarietà',
        m3_h1: 'Contesto & Sviluppo',
        m3_p1: 'Applicazione mobile ideata per il monitoraggio continuativo del benessere lavorativo, rilevando stati di sedentarietà prolungata e stress attraverso sensori wearable.',
        m3_li1: 'Integrazione real-time con le API Fitbit per il recupero di parametri biometrici (HRV, contapassi, livelli di attività).',
        m3_li2: 'Data layer robusto con gestione della modalità offline, caching locale e sincronizzazione sicura con server universitario.',
        m3_li3: 'Design validato da un\'indagine empirica su 212 lavoratori distribuiti in 12 regioni italiane in merito a privacy e user experience.',
        m3_li4: 'Interfaccia bilingue (IT/EN) con rilascio programmato su Google Play Store nel 2027.',

        m4_title: 'Real-Time EEG/BCI Motor Imagery in ROS',
        m4_h1: 'Architettura di Controllo',
        m4_p1: 'Implementazione di una pipeline Robot Operating System (ROS) per la decodifica in streaming di intenzioni motorie (mano destra/sinistra e piedi) da tracciati elettroencefalografici (EEG).',
        m4_h2: 'Workflow di Elaborazione',
        m4_li1: 'Configurazione di filtri passa-banda Butterworth per isolare i ritmi sensorimotori Mu (8–12 Hz) e Beta (13–30 Hz).',
        m4_li2: 'Calcolo online della potenza di banda (bandpower) con stima a bassa latenza in tempo reale.',
        m4_li3: 'Acquisizione sperimentale del dataset EEG/BCI per la calibrazione delle soglie decisionali.',

        m5_title: 'Predizione Diabete con Support Vector Machines',
        m5_h1: 'Dettagli Metodologici',
        m5_p1: 'Pipeline per la classificazione del rischio diabetico, focalizzata sull\'ottimizzazione degli iperparametri e sull\'interpretabilità clinica dei confini decisionali.',
        m5_li1: 'Confronto approfondito tra kernel Lineare, RBF (Radial Basis Function) e Polinomiale.',
        m5_li2: 'Ottimizzazione della cross-validation via GridSearchCV guidata dalla metrica <em>Balanced Accuracy</em>.',
        m5_li3: 'Validazione clinica rispetto al modello di baseline a classe maggioritaria.',

        m6_title: 'Modellazione FEA di Vertebra Lombare',
        m6_h1: 'Tesi di Laurea Triennale',
        m6_p1: 'Studio biomeccanico comparativo tra vertebre lombari sane e patologiche mediante ricostruzione tridimensionale da scansioni TC e simulazioni ad elementi finiti.',
        m6_li1: 'Segmentazione semi-automatica delle densità ossee corticali e trabecolari da immagini TC in ITK-SNAP.',
        m6_li2: 'Generazione di mesh 3D solide e simulazione delle sollecitazioni di Von Mises sotto carichi fisiologici di compressione e flessione in COMSOL.'
    },

    en: {
        // Nav
        nav_about: '<i class="fa-regular fa-user"></i> About',
        nav_experience: '<i class="fa-solid fa-briefcase"></i> Experience',
        nav_projects: '<i class="fa-solid fa-code"></i> Projects',
        nav_education: '<i class="fa-solid fa-graduation-cap"></i> Education',
        nav_skills: '<i class="fa-solid fa-microchip"></i> Skills',
        nav_contact: '<i class="fa-regular fa-envelope"></i> Contact',
        nav_cv: '<i class="fa-solid fa-file-arrow-down"></i> Resume / CV',

        // Hero
        hero_badge: 'Deep Learning Researcher & Bioengineer',
        hero_greeting: "Hi, I'm",
        hero_subtitle: 'Developing advanced computational models at the intersection of Artificial Intelligence, 3D Neuroimaging, and Biomedical Engineering. Currently investigating Self-Supervised Learning paradigms and Brain-Computer Interfaces.',
        hero_tag_1: 'Neuroimaging & SSL',
        hero_tag_2: 'PyTorch & HPC',
        hero_tag_3: 'Padua / Pescara, Italy',
        hero_btn_projects: '<i class="fa-solid fa-diagram-project"></i> View Projects',
        hero_btn_cv: '<i class="fa-solid fa-download"></i> Download CV (PDF)',
        hero_btn_contact: 'Get in Touch <i class="fa-solid fa-arrow-right"></i>',

        // Terminal
        t_k_name: '"name"',
        t_k_role: '"role"',
        t_k_inst: '"affiliation"',
        t_k_proj: '"project"',
        t_k_areas: '"focus_areas"',
        t_k_status: '"status"',
        t_v_status: '"Active in NeuroAI Research"',
        t_cuda_out: 'CUDA Devices: 4 (Multi-GPU SLURM Cluster Online)',

        // About
        about_subtitle: 'Profile & Research Vision',
        about_title: 'About Me',
        about_lead: 'Bridging Biomedical Engineering with Deep Learning to advance neurotechnology.',
        about_p1: 'I am a Bioengineering Master’s student at the <strong>University of Padua</strong> and a Deep Learning Researcher at the <strong>Padova Neuroscience Center (PNC)</strong>, working under the supervision of Prof. Manfredo Atzori.',
        about_p2: 'My core research focuses on applying <strong>Self-Supervised Learning (SSL)</strong> paradigms to large-scale, heterogeneous 3D neuroimaging datasets within the <strong>EU HEREDITARY Project</strong>. I design hybrid <strong>CNN-Transformer</strong> architectures to extract latent, anatomically localized phenotype representations without requiring manual diagnostic annotations.',
        about_p3: 'Backed by a Bachelor\'s degree in Biomedical Engineering from the University of Chieti-Pescara (specializing in finite element analysis and biomechanical modeling), I combine high-performance computing (HPC, SLURM, multi-GPU PyTorch workflows), biosignal decoding (EEG/BCI), and clinical translation awareness.',
        about_lang_title: 'International Background & Languages',
        about_lang_sub: 'Completed an academic year (2015–2016) at the <em>European School of Brussels I (EEB1 - Uccle, Belgium)</em> in a multilingual academic setting.',
        lang_it: 'Italian',
        lang_lvl_native: 'Native',
        lang_en: 'English',
        lang_lvl_c1: 'C1 (Advanced)',
        lang_fr: 'French',
        lang_lvl_b2: 'B2',
        lang_de: 'German',
        lang_lvl_b1: 'B1',
        lang_es: 'Spanish',
        card_ai_title: 'Medical AI & SSL',
        card_ai_desc: 'Developing C-JEPA, VICReg, and Vision Transformers for 3D volumetric MRI and CT image analysis.',
        card_hpc_title: 'HPC & Multi-GPU Computing',
        card_hpc_desc: 'Orchestrating Linux clusters via SLURM workload manager, CUDA AMP optimizations, and scalable training loops.',
        card_bci_title: 'Neuro-Robotics & BCI',
        card_bci_desc: 'Real-time EEG bandpower feature extraction, motor imagery classification, and ROS pipeline integration.',
        card_fea_title: 'Computational Biomechanics',
        card_fea_desc: 'Semi-automatic 3D anatomical segmentation (ITK-SNAP) and structural finite element simulations (COMSOL Multiphysics).',

        // Experience
        exp_subtitle: 'Professional Pathway',
        exp_title: 'Research Experience',
        exp1_badge: 'Feb. 2026 – Present',
        exp1_role: 'Deep Learning Researcher',
        exp1_loc: 'Padua, Veneto, Italy (Hybrid)',
        exp1_proj_label: 'EU HEREDITARY Project:',
        exp1_b1: 'Architected an end-to-end self-supervised learning (SSL) pipeline in PyTorch, integrating a hybrid <strong>C-JEPA</strong> and intra-subject <strong>VICReg</strong> paradigm to extract latent phenotypes from 3D neuroimaging data without supervised labels.',
        exp1_b2: 'Designed a custom multi-modal <strong>CNN-Transformer</strong> equipped with a <strong>TokenLearner</strong> and spatial attention to compress multi-scale feature maps into anatomically localized embeddings.',
        exp1_b3: 'Processed and curated a subset of the heterogeneous <strong>FOMO-300K dataset (318,000+ MRI scans)</strong>, optimizing distributed training loops on a multi-GPU Linux cluster using <strong>SLURM</strong>.',
        exp1_b4: 'Applied biometric anonymization (automated defacing via <strong>SynthSeg+</strong> anatomical segmentation) to ensure privacy-compliant processing of sensitive clinical neuroimaging data.',
        exp2_badge: 'Dec. 2023 – Feb. 2024',
        exp2_role: 'Student Intern – Computational Biomechanics',
        exp2_loc: 'Pescara, Abruzzo, Italy (On-site)',
        exp2_b1: 'Segmented diagnostic CT scans to extract anatomical regions of interest (vertebral ROIs) using <strong>ITK-SNAP</strong>.',
        exp2_b2: 'Conducted finite element analysis (<strong>FEA</strong>) via <strong>COMSOL Multiphysics</strong> for comparative biomechanical evaluation of healthy versus pathological lumbar vertebrae.',
        exp2_b3: 'Standardized and documented technical modeling protocols and computational simulation workflows.',

        // Projects
        proj_subtitle: 'Technical & Scientific Portfolio',
        proj_title: 'Academic & Applied Projects',
        filter_all: 'All Projects',
        filter_dl: 'Deep Learning & AI',
        filter_bci: 'Neuro & BCI',
        filter_health: 'Health Tech & Mobile',
        btn_details: '<i class="fa-solid fa-circle-info"></i> Details',
        btn_close: 'Close',
        btn_github_repo: 'GitHub Repository',

        p1_type: 'Master Thesis / EU Project',
        p1_title: 'Anatomical-Aware SSL for Phenotype Clustering',
        p1_desc: 'End-to-end PyTorch SSL pipeline (C-JEPA & VICReg) for unsupervised clinical phenotype extraction from 3D brain MRI (FOMO-300K dataset).',
        p1_hl1: 'TokenLearner & Spatial Attention',
        p1_hl2: 'Multi-GPU Acceleration on SLURM',

        p2_type: 'Medical NLP & PyTorch',
        p2_title: 'Clinical NLP – Medical Transcription Classification',
        p2_desc: 'Transformer-based NLP pipeline (Bio-ClinicalBERT) performing multi-class classification of medical transcripts into 13+ clinical specialties.',
        p2_hl1: '91% Top-3 Accuracy',
        p2_hl2: 'Custom Focal Loss & CUDA AMP',

        p3_type: 'Mobile App & Wearable',
        p3_title: 'Kairos – Stress & Sedentary Behavior Monitor',
        p3_desc: 'Flutter mobile application with wearable (Fitbit) integration for workplace stress detection, activity coaching, and sedentary tracking.',
        p3_hl1: 'Survey validated (212 users across 12 IT regions)',
        p3_hl2: 'Preparing Google Play Store release',

        p4_type: 'Neuroengineering & BCI',
        p4_title: 'Real-Time EEG/BCI Motor Imagery in ROS',
        p4_desc: 'Threshold-based online classifier discriminating left/right hand and foot motor imagery tasks using real-time EEG bandpower features in ROS.',
        p4_hl1: 'Streaming real-time bandpower computation',
        p4_hl2: 'Robot Operating System node integration',

        p5_type: 'Clinical Machine Learning',
        p5_title: 'Diabetes Prediction via Support Vector Machines',
        p5_desc: 'End-to-end scikit-learn pipeline benchmarking Linear, RBF, and Polynomial SVM kernels with GridSearchCV hyperparameter optimization.',
        p5_hl1: 'Balanced Accuracy & Imbalance Handling',
        p5_hl2: 'Clinical Decision Interpretability',

        p6_type: 'Bachelor Thesis / FEA Analysis',
        p6_title: 'FEA Modeling of Healthy vs. Pathological Vertebra',
        p6_desc: 'Biomechanical 3D modeling and finite element stress analysis comparing healthy and osteoporotic lumbar vertebrae from clinical CT datasets.',
        p6_hl1: 'ITK-SNAP 3D CT Anatomical Segmentation',
        p6_hl2: 'COMSOL Von Mises Structural Stress Analysis',

        // Education
        edu_subtitle: 'Academic Background',
        edu_title: 'Education & Degrees',
        edu1_degree: 'Master’s Degree in Bioengineering',
        edu1_badge: 'Sep. 2024 – Sep. 2026',
        edu1_avg_lbl: 'Current Average:',
        edu1_sup_lbl: 'Supervisor:',
        edu1_loc_lbl: 'Location:',
        edu1_loc_val: 'Padua, Italy',
        edu1_thesis_lbl: 'Research Thesis:',
        edu1_courses_lbl: 'Key Specialized Coursework:',
        c_dl: 'Deep Learning applied to Neuroscience',
        c_ml: 'Machine Learning',
        c_bio: 'Biosensors',
        c_sig: 'Advanced Bio-signal Analysis',
        c_rob: 'Neuro-robotics',
        c_img: 'Imaging for Neuroscience',

        edu2_degree: 'Bachelor’s Degree in Biomedical Engineering',
        edu2_badge: 'Oct. 2021 – Jul. 2024',
        edu2_grade_lbl: 'Final Grade:',
        edu2_sup_lbl: 'Supervisor:',
        edu2_loc_lbl: 'Location:',
        edu2_loc_val: 'Pescara, Italy',
        edu2_thesis_lbl: 'BSc Thesis:',
        edu2_thesis_val: 'Modeling and finite element analysis (FEA) of a lumbar vertebra: comparison between healthy and pathological cases.',
        edu3_desc: 'Completed one academic year immersed in an international, multilingual curriculum, establishing advanced fluency in <strong>French</strong> and <strong>German</strong> alongside fluent English and native Italian.',

        // Skills
        skills_subtitle: 'Technical Proficiency & Domains',
        skills_title: 'Tech Stack & Core Competencies',
        sk1_title: 'Deep Learning & Artificial Intelligence',
        sk1_sub: 'Generative models, SSL, and complex neural architectures',
        sk_chip_pytorch: 'Custom architectures, DDP, AMP & Focal Loss functions',
        sk_chip_ssl: 'Predictive C-JEPA paradigms & VICReg regularization',
        sk_chip_vit: 'Spatial attention & token compression on 3D volumes',
        sk_chip_nlp: 'Bio-ClinicalBERT, multi-class clinical triage modeling',
        sk_chip_ml_name: 'Traditional Machine Learning',
        sk_chip_ml_desc: 'scikit-learn, SVM kernel tuning (GridSearchCV), TensorFlow',
        sk_chip_num_name: 'Numerical Computing & Statistics',
        sk_chip_num_desc: 'NumPy, SciPy, R (Caret, GBM), LaTeX for scientific typesetting',

        sk2_title: 'HPC, Distributed Computing & Tools',
        sk2_sub: 'Cluster resource management and development environments',
        sk_chip_slurm: 'Job scheduling, cluster node allocation & batch execution',
        sk_chip_gpu: 'CUDA Automatic Mixed Precision (AMP), GPU monitoring',
        sk_chip_git: 'Version control, branching strategy & CI/CD workflows',
        sk_chip_linux_name: 'Linux Environment & Bash Shell',
        sk_chip_linux_desc: 'Pipeline automation, shell scripting & remote SSH workflows',
        sk_chip_ros: 'Publisher/subscriber communications for neural data streaming',
        sk_chip_mobile_name: 'Mobile Development (Flutter & Dart)',
        sk_chip_mobile_desc: 'Data layer architecture, Provider state & REST API ingestion',

        sk3_title: 'Bioengineering & Biosignal Processing',
        sk3_sub: 'EEG signal analysis, wearable sensor streams & BCI decoding',
        sk_chip_eeg: 'Online real-time Motor Imagery intention classification',
        sk_chip_filt_name: 'Digital Filtering & Bandpower',
        sk_chip_filt_desc: 'Mu/Beta rhythm isolation via Butterworth bandpass filters',
        sk_chip_matlab: 'Advanced physiological signal analysis & time-frequency transforms',
        sk_chip_wear_name: 'Wearable Biosensors',
        sk_chip_wear_desc: 'Fitbit Web API integration (HRV, circadian and activity metrics)',
        sk_chip_gdpr_name: 'Clinical Data Compliance (GDPR)',
        sk_chip_gdpr_desc: 'Ethical, anonymized handling of sensitive healthcare datasets',

        sk4_title: '3D Medical Imaging & Biomechanics',
        sk4_sub: 'Volumetric medical analysis and computational simulation',
        sk_chip_mri_name: '3D Volumetric Neuroimaging',
        sk_chip_mri_desc: 'Preprocessing & intensity normalization on MRI datasets (FOMO-300K)',
        sk_chip_def_name: 'Biometric Anonymization (Defacing)',
        sk_chip_def_desc: 'Automated anatomical defacing via SynthSeg+ on brain scans',
        sk_chip_itk_name: 'ROI Segmentation (ITK-SNAP)',
        sk_chip_itk_desc: 'Semi-automatic anatomical bone extraction from CT diagnostic scans',
        sk_chip_comsol: 'Finite element modeling, 3D solid meshing & load simulations',
        sk_chip_bioeval_name: 'Structural Biomechanical Analysis',
        sk_chip_bioeval_desc: 'Von Mises stress distribution under physiological loading',

        // Contact
        contact_subtitle: "Let's Discuss Research & Collaborations",
        contact_title: 'Get In Touch',
        contact_info_title: 'Direct Inquiries',
        contact_info_desc: 'I am always open to exploring research collaborations in NeuroAI, biomedical engineering challenges, and technical inquiries.',
        contact_lbl_phone: 'Phone',
        contact_lbl_loc: 'Location',
        contact_val_loc: 'Padua / Pescara, Italy',
        form_title: 'Send a Message',
        form_lbl_name: 'Your Name / Organization',
        form_lbl_email: 'Email Address',
        form_lbl_subject: 'Subject',
        form_lbl_msg: 'Message',
        form_btn_send: '<i class="fa-solid fa-paper-plane"></i> Send via Email Client',

        // Footer
        footer_rights: 'All rights reserved.',
        footer_gdpr: 'Data processing authorized in compliance with EU GDPR (Regulation 2016/679).',

        // Modals
        m1_title: 'EU HEREDITARY: Anatomical-Aware SSL',
        m1_h1: 'Scientific Objective',
        m1_p1: 'Extract latent, interpretable phenotypic representations from 3D MRI scans without diagnostic annotations (unsupervised), enabling downstream clinical phenotype clustering within the EU HEREDITARY framework.',
        m1_h2: 'Architecture & Methodology',
        m1_li1: '<strong>Hybrid SSL Paradigm:</strong> Combined Contextual Joint-Embedding Predictive Architecture (C-JEPA) with intra-subject VICReg variance-invariance-covariance regularization to mitigate representation collapse.',
        m1_li2: '<strong>CNN-Transformer with TokenLearner:</strong> Multi-scale 3D CNN feature extraction compressed by a TokenLearner module into anatomically localized tokens processed by Transformer self-attention blocks.',
        m1_li3: '<strong>HPC Infrastructure:</strong> Large-scale processing of the FOMO-300K dataset (318,000+ MRI volumes) with automatic mixed precision (AMP) across multi-GPU Linux cluster nodes using SLURM.',
        m1_li4: '<strong>Privacy & Anonymization:</strong> Automated anatomical defacing pipeline via SynthSeg+ for strict clinical compliance.',

        m2_title: 'Clinical NLP – Medical Transcription Classification',
        m2_h1: 'Project Overview',
        m2_p1: 'Automated multi-class classification of complex medical transcriptions into 13+ clinical specialties to streamline hospital documentation workflows and clinical triage.',
        m2_h2: 'Key Technical Highlights',
        m2_li1: 'Fine-tuned biomedical domain Transformer model (<strong>Bio-ClinicalBERT</strong>).',
        m2_li2: 'Implemented a custom weighted <strong>Focal Loss</strong> function to mitigate severe class imbalance between rare and common medical specialties.',
        m2_li3: 'Achieved <strong>91% Top-3 Accuracy</strong> validated through comprehensive Precision-Recall curves and multi-class confusion matrices.',
        m2_li4: 'Accelerated CUDA training loops using PyTorch Automatic Mixed Precision (AMP).',

        m3_title: 'Kairos – Stress & Sedentary Behavior App',
        m3_h1: 'Context & Development',
        m3_p1: 'A mobile health solution designed to track workplace stress levels and mitigate sedentary behavior through continuous biometric sensor streams.',
        m3_li1: 'Integrated real-time Fitbit Web APIs for biometric data ingestion (HRV, step count, activity levels).',
        m3_li2: 'Engineered robust data layer with offline detection, local caching, and secure university server synchronization.',
        m3_li3: 'Product design grounded in a nationwide survey (212 respondents across 12 Italian regions) assessing privacy and user engagement.',
        m3_li4: 'Bilingual interface (IT/EN) scheduled for release on Google Play Store in 2027.',

        m4_title: 'Real-Time EEG/BCI Motor Imagery in ROS',
        m4_h1: 'Control Architecture',
        m4_p1: 'Implementation of a Robot Operating System (ROS) pipeline for online streaming and decoding of motor imagery intentions (left/right hand and feet) from raw EEG signals.',
        m4_h2: 'Processing Workflow',
        m4_li1: 'Configured Butterworth bandpass filter parameters to isolate sensorimotor Mu (8–12 Hz) and Beta (13–30 Hz) rhythms.',
        m4_li2: 'Engineered real-time online bandpower computation node with low-latency signal buffering.',
        m4_li3: 'Recorded and calibrated experimental EEG/BCI datasets for decision threshold optimization.',

        m5_title: 'Diabetes Prediction with SVM',
        m5_h1: 'Methodological Details',
        m5_p1: 'Rigorous clinical classification pipeline assessing diabetic risk factors with strong emphasis on model interpretability and hyperparameter tuning.',
        m5_li1: 'Systematic benchmark across Linear, Radial Basis Function (RBF), and Polynomial SVM kernels.',
        m5_li2: 'Hyperparameter optimization via GridSearchCV guided by Balanced Accuracy to counter label imbalance.',
        m5_li3: 'Clinical validation against majority-class baseline models.',

        m6_title: 'FEA Modeling of Lumbar Vertebra',
        m6_h1: 'Bachelor Thesis Project',
        m6_p1: 'Comparative structural biomechanics study between healthy and osteoporotic/pathological lumbar vertebrae using 3D CT reconstruction and FEA.',
        m6_li1: 'Segmented cortical and trabecular bone volumes from clinical CT scans using ITK-SNAP.',
        m6_li2: 'Generated 3D solid meshes and evaluated Von Mises stress distributions under physiological compression and flexion loads in COMSOL.'
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. TEMA GIORNO / NOTTE (DARK / LIGHT MODE)
    // ==========================================
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    function applyTheme(theme) {
        htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem('wp_theme', theme);
        if (themeToggleBtn) {
            const icon = themeToggleBtn.querySelector('i');
            if (icon) {
                icon.className = theme === 'light' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
            }
        }
    }

    const savedTheme = localStorage.getItem('wp_theme') || 
        (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    applyTheme(savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme') || 'dark';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
        });
    }

    // ==========================================
    // 2. SWITCHER BILINGUE ISTANTANEO (IT <-> EN)
    // ==========================================
    const langToggleBtn = document.getElementById('lang-toggle');
    const langDisplay = document.getElementById('lang-display');

    function applyLanguage(lang) {
        if (!translations[lang]) return;
        localStorage.setItem('wp_lang', lang);
        htmlElement.setAttribute('lang', lang);

        if (langDisplay) {
            langDisplay.textContent = lang.toUpperCase();
        }

        // Traduce istantaneamente tutti gli elementi con data-i18n
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) {
                el.innerHTML = translations[lang][key];
            }
        });
    }

    const savedLang = localStorage.getItem('wp_lang') || 'it';
    applyLanguage(savedLang);

    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', () => {
            const currentLang = localStorage.getItem('wp_lang') || 'it';
            const nextLang = currentLang === 'it' ? 'en' : 'it';
            applyLanguage(nextLang);
            showToast(nextLang === 'it' ? 'Lingua impostata: Italiano' : 'Language set: English');
        });
    }

    // ==========================================
    // 3. FILTRI CATEGORIA PROGETTI (TUTTI, DL, BCI, HEALTH)
    // ==========================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const selectedFilter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (selectedFilter === 'all' || cardCategory === selectedFilter) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // ==========================================
    // 4. FINESTRE MODALI INTERATTIVE DEI PROGETTI
    // ==========================================
    const openModalBtns = document.querySelectorAll('.open-modal-btn');
    openModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                closeModal(activeModal.id);
            }
        }
    });

    // ==========================================
    // 5. MENU MOBILE & TRACKING DELLO SCROLL
    // ==========================================
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            const icon = navToggle.querySelector('i');
            if (icon) {
                icon.className = navMenu.classList.contains('open') ? 'fa-solid fa-xmark' : 'fa-solid fa-bars-staggered';
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu && navMenu.classList.contains('open')) {
                navMenu.classList.remove('open');
                if (navToggle) {
                    const icon = navToggle.querySelector('i');
                    if (icon) icon.className = 'fa-solid fa-bars-staggered';
                }
            }
        });
    });

    const header = document.getElementById('header');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        if (header) {
            if (scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const link = document.querySelector(`.nav-menu a[href*="${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                if (link) link.classList.add('active');
            } else {
                if (link) link.classList.remove('active');
            }
        });
    });
});

// Funzione globale di chiusura modale
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// 6. COPIA EMAIL RAPIDA NEGLI APPUNTI CON NOTIFICA
function copyEmail() {
    const email = 'williampoz15@gmail.com';
    const lang = localStorage.getItem('wp_lang') || 'it';
    navigator.clipboard.writeText(email).then(() => {
        showToast(lang === 'it' ? 'Email copiata negli appunti: ' + email : 'Email copied to clipboard: ' + email);
    }).catch(() => {
        showToast(email);
    });
}

function showToast(message) {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

// 7. INVIO MODULO DI CONTATTO
function handleFormSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    const lang = localStorage.getItem('wp_lang') || 'it';

    const mailtoLink = `mailto:williampoz15@gmail.com?subject=${encodeURIComponent('[' + (lang === 'it' ? 'Sito Web' : 'Website') + '] ' + subject)}&body=${encodeURIComponent((lang === 'it' ? 'Da: ' : 'From: ') + name + ' (' + email + ')\n\n' + message)}`;
    window.location.href = mailtoLink;
    showToast(lang === 'it' ? 'Apertura client email in corso...' : 'Opening email client...');
}
