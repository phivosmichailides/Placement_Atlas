'use strict';
/* Placement Atlas learning library: independent guidance and programme research links.
   It does not change catalogue data, decisions, scoring or official Oriel rankings. */
(()=>{
  const nav=document.querySelector('nav.tabs');
  if(!nav||document.getElementById('learn'))return;
  const tab=nav.querySelector(':scope > .tab[data-tab="learn"]')||document.createElement('button');
  tab.type='button';tab.className='tab atlasLearnNavTab';tab.dataset.tab='learn';
  tab.setAttribute('aria-label','Learning Hub');
  tab.innerHTML='<svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 0 4 22.5z"/><path d="M4 5.5v17M8 7h8M8 11h8"/></svg><span class="atlasTabLabel">Learning Hub</span>';
  const preferencesTab=nav.querySelector(':scope > .tab[data-tab="prefs"]');
  if(!tab.isConnected){if(preferencesTab)nav.insertBefore(tab,preferencesTab);else nav.append(tab);}
  tab.disabled=false;tab.removeAttribute('title');
  const panel=document.createElement('section');panel.id='learn';panel.className='panel atlasLearnPanel';
  panel.innerHTML=`
    <header class="atlasLearnHero">
      <div class="eyebrow">PLACEMENT ATLAS · LEARNING LIBRARY</div>
      <h2>Understand the year before you choose it.</h2>
      <p>Independent, practical guidance on training settings, programme structures, regions, pay, working life and what to ask before accepting a placement.</p>
      <div class="atlasLearnHeroActions">
        <button type="button" class="btn primary" data-learn-jump="settings">Explore training settings</button>
        <button type="button" class="btn" data-learn-jump="research">Research a programme</button>
      </div>
      <p class="atlasLearnDisclaimer">Guidance, not a promise about any individual employer. Programme details can vary between sites and change between recruitment cycles.</p>
    </header>

    <section class="atlasLearnSection" id="atlasLearnSettings">
      <div class="atlasLearnSectionHead"><div><div class="eyebrow">01 · THE WORK</div><h3>What does each training setting involve?</h3><p>The setting gives you a clue about the work, but the actual rota, supervisor and responsibilities matter more than the label.</p></div></div>
      <div class="atlasLearnSettingGrid">
        <details class="atlasLearnTopic"><summary>Community pharmacy</summary><div><p>Usually combines dispensing and accuracy checking with patient-facing advice, services, medicines safety and the day-to-day running of a pharmacy.</p><ul><li>Expect regular interaction with patients and the wider primary-care network.</li><li>Workload can be shaped by prescription volume, staffing, service demand and local systems.</li><li>Ask how much protected learning time is available alongside operational work.</li></ul></div></details>
        <details class="atlasLearnTopic"><summary>Hospital pharmacy</summary><div><p>Can include clinical ward work, medicines reconciliation, discharge planning, specialist services, dispensary work and multidisciplinary team learning.</p><ul><li>Rotations and exposure differ significantly between hospitals and departments.</li><li>Ask which clinical areas you will actually visit and how often you will be supervised on wards.</li><li>Clarify weekend, evening and bank-holiday commitments.</li></ul></div></details>
        <details class="atlasLearnTopic"><summary>General practice (GP)</summary><div><p>Often involves working with GPs, practice pharmacists and other primary-care colleagues on medicines optimisation, structured reviews, long-term conditions and prescribing-related work.</p><ul><li>Ask what a trainee is permitted and expected to do at each stage.</li><li>Check whether the placement is embedded in a practice team or split across several practices.</li><li>Find out how clinical supervision and feedback are organised.</li></ul></div></details>
        <details class="atlasLearnTopic"><summary>Split or mixed programmes</summary><div><p>A split programme can give experience across hospital, GP and/or community settings. The number of weeks in each setting is important, but so is how the placements fit together.</p><ul><li>Check the exact weeks and sequence in each setting.</li><li>Ask whether supervisors coordinate learning across sites.</li><li>Calculate travel between every site, not just the first postcode.</li></ul></div></details>
        <details class="atlasLearnTopic"><summary>Industry, research or specialist exposure</summary><div><p>Some programmes may include specialist or non-traditional exposure. Read the programme description carefully and confirm the day-to-day work with the employer.</p><ul><li>Ask what projects, responsibilities and supervision are guaranteed.</li><li>Check how the experience maps to the foundation training outcomes.</li><li>Do not assume that a programme title alone guarantees a particular role.</li></ul></div></details>
      </div>
    </section>

<section class="atlasLearnSection atlasIndustryGuide" id="atlasLearnIndustry" aria-labelledby="atlasLearnIndustryTitle"><div class="eyebrow">IN-DEPTH GUIDE · INDUSTRY CAREERS</div><h3 id="atlasLearnIndustryTitle">Industry, hospital &amp; community: your split placement explained</h3><p class="atlasIndustryGuideSubtitle">16 practical, source-backed answers about the rotation, real industry teams, projects, the foundation year and what comes next.</p><div class="atlasIndustryGuideIntro"><p><strong>An industry / hospital / community split can provide a valuable introduction to medicines development without sacrificing the foundation year's clinical purpose.</strong> But the quality of the opportunity depends on the actual programme, not the words “industry placement”. This guide answers the questions newly allocated trainees most often ask, drawing on NHS England training guidance, ABPI careers material, MHRA safety guidance, employer examples and a published cross-sector study.</p><p>The examples of tasks and timetables are <em>illustrative</em>. Placement Atlas does not have private access to individual employers' rotas or guaranteed projects. Confirm current details with your host and the official training provider.</p></div><div class="atlasIndustryExperienceLinks" aria-label="Industry trainee experiences and careers"><strong>Real accounts &amp; next-step research</strong><div class="atlasIndustryExperienceGrid"><a href="https://pharmaceutical-journal.com/article/feature/what-pharmacy-trainees-can-expect-from-a-preregistration-year-in-the-pharmaceutical-industry" target="_blank" rel="noopener noreferrer">Trainees describe industry rotations <span>Pharmaceutical Journal · 2017 account</span></a><a href="https://pharmaceutical-journal.com/article/news/a-day-in-the-life-of-an-industry-preregistration-pharmacist" target="_blank" rel="noopener noreferrer">A day in industry training <span>Pharmaceutical Journal · 2018 account</span></a><a href="https://www.abpi.org.uk/careers/job-case-studies/regulatory-affairs-associate-astellas/" target="_blank" rel="noopener noreferrer">Hospital training → regulatory affairs <span>ABPI · career case study</span></a><a href="https://www.abpi.org.uk/careers/job-case-studies/" target="_blank" rel="noopener noreferrer">Explore actual industry roles <span>ABPI · employee experiences</span></a></div><p>First-person stories describe individual people and past programmes, not what every 2027/28 employer will offer. Check your exact Oriel programme and host's current training plan.</p></div><div class="atlasIndustryTools"><button type="button" class="btn" data-industry-expand="all">Expand all answers</button><button type="button" class="btn" data-industry-expand="none">Collapse all</button><a class="btn" href="/industry-foundation-training.html">Read as a full article</a></div><div class="atlasIndustryAnswers"><details class="atlasIndustryAnswer" id="industry-what-is-a-split" open><summary><span class="atlasIndustryQuestionNumber">01</span><span>What does an industry / hospital / community split actually mean?</span></summary><div class="atlasIndustryAnswerBody"><p>It means your foundation training is delivered through more than one setting, with an industry organisation as one of the hosts. The clinical settings and industry setting should contribute to a coherent, supervised foundation training plan. <strong>It does not mean three equal four-month rotations.</strong> A programme might have different blocks, an order chosen by the employer, or a principal employment site and one or more rotation partners.</p>
<p>For your own allocation, ask the employer for a written outline of <strong>the weeks in each setting, their sequence, all exact addresses, working patterns and the name of the lead designated supervisor</strong>. NHS England explains that employers operate approved training programmes and that variations exist between programmes; its 2026 employer requirements describe specific supervision arrangements for longer multi-sector rotations. Treat the individual Oriel advert and confirmed employer training plan as authoritative, not a generic three-sector description.</p>
<p>The industry period may focus on regulatory affairs, medical information, drug safety, manufacturing, research, quality or another business unit. Some posts are explicitly attached to a department. Others include introductions to several teams. Ask which experiences are planned and what is only possible if capacity permits.</p><p class="atlasIndustryCitations">Sources and further reading: <a href="https://london.wtepharmacy.nhs.uk/pharmacists/foundation-trainee-pharmacists/" target="_blank" rel="noopener noreferrer">NHS England — foundation training guidance</a> · <a href="https://london.wtepharmacy.nhs.uk/national-recruitment/employer-terms-of-participation/2026-employer-tops/" target="_blank" rel="noopener noreferrer">NHS England — 2026 employer training requirements</a> · <a href="https://london.wtepharmacy.nhs.uk/national-recruitment/preferencing/" target="_blank" rel="noopener noreferrer">NHS England — preferencing and programme information</a></p></div></details>
<details class="atlasIndustryAnswer" id="industry-day-to-day" ><summary><span class="atlasIndustryQuestionNumber">02</span><span>What is a realistic day in the industry rotation?</span></summary><div class="atlasIndustryAnswerBody"><p>Many office-based placements combine induction, reading scientific or procedural material, team meetings, working on a supervised task, reviewing outputs and short feedback discussions. Depending on the host, you might be <strong>summarising clinical evidence, checking a document against an approved source, helping prepare a presentation, observing a cross-functional meeting, or learning how a medicine's safety information is tracked</strong>.</p>
<p>An <em>illustrative</em> day might begin by checking a project plan and reading a paper or standard operating procedure; continue with a medical-information, regulatory or safety team meeting; include a focused document or data task; and end with supervisor feedback and portfolio reflection. This is <strong>a plausible example, not a timetable promised by an employer</strong>. Some rotations are laboratory-, manufacturing- or site-based and look very different from desk-based medical affairs.</p>
<p>The pace can feel more project-based than routine patient-facing pharmacy: deadlines, version-controlled documents, scientific accuracy, confidentiality and communication matter. Trainees should not expect independent authority to approve regulated work or to give external scientific advice without appropriate oversight. Reading a previous trainee's first-person account can help you formulate questions, but historical examples are not a description of a current programme.</p><p class="atlasIndustryCitations">Sources and further reading: <a href="https://www.abpi.org.uk/careers/working-in-the-industry/" target="_blank" rel="noopener noreferrer">ABPI — pharmaceutical industry careers</a> · <a href="https://www.abpi.org.uk/careers/job-roles/medical-information/" target="_blank" rel="noopener noreferrer">ABPI — medical information</a> · <a href="https://pharmaceutical-journal.com/article/news/a-day-in-the-life-of-an-industry-preregistration-pharmacist" target="_blank" rel="noopener noreferrer">Pharmaceutical Journal — historical trainee day-in-the-life</a></p></div></details>
<details class="atlasIndustryAnswer" id="industry-types-of-projects" ><summary><span class="atlasIndustryQuestionNumber">03</span><span>What projects might a trainee be asked to work on?</span></summary><div class="atlasIndustryAnswerBody"><p><strong>Examples to ask about rather than expect:</strong> an evidence table comparing published clinical studies; a supervised medical-information response draft; a summary of relevant product information; a regulatory document tracker; a mock adverse-event intake workflow; an approved literature-monitoring exercise; a trial-operations spreadsheet or process map; a quality-improvement proposal; or a short presentation explaining a disease area and treatment landscape.</p>
<p>The appropriate scope depends on the function. In <strong>medical information</strong>, a trainee might practise turning a clinical question into an accurate, referenced answer. In <strong>regulatory affairs</strong>, the exercise may involve document control, labelling changes or understanding a submission timeline. In <strong>pharmacovigilance</strong>, it could focus on recognising reportable safety information, understanding case processing and following escalation procedures. In <strong>clinical operations</strong>, it may be a trial visit checklist or study-status summary. Manufacturing and quality teams may instead focus on deviations, validation concepts and Good Manufacturing Practice (GMP).</p>
<p>A small, finished project with clear supervision often provides stronger experience than observing many teams without producing anything. Agree on a defined scope, evidence of completion and confidentiality rules early. Never take patient data, unpublished company information or internal slides away for a portfolio or job application without explicit permission.</p><p class="atlasIndustryCitations">Sources and further reading: <a href="https://www.abpi.org.uk/careers/job-roles/medical-information/" target="_blank" rel="noopener noreferrer">ABPI — medical information</a> · <a href="https://www.abpi.org.uk/careers/working-in-the-industry/research-and-development/drug-safety-pharmacovigilance/" target="_blank" rel="noopener noreferrer">ABPI — drug safety and pharmacovigilance</a> · <a href="https://www.abpi.org.uk/careers/working-in-the-industry/research-and-development/regulatory-affairs/" target="_blank" rel="noopener noreferrer">ABPI — regulatory affairs</a> · <a href="https://www.abpi.org.uk/careers/working-in-the-industry/research-and-development/clinical-studies/clinical-research-work/" target="_blank" rel="noopener noreferrer">ABPI — clinical research work</a> · <a href="https://www.abpi.org.uk/careers/working-in-the-industry/research-and-development/pharmacy/pharmacists-in-manufacturing/" target="_blank" rel="noopener noreferrer">ABPI — pharmacists in manufacturing</a></p></div></details>
<details class="atlasIndustryAnswer" id="industry-exposure" ><summary><span class="atlasIndustryQuestionNumber">04</span><span>Will I rotate through medical affairs, regulatory affairs, pharmacovigilance and clinical trials?</span></summary><div class="atlasIndustryAnswerBody"><p><strong>Not necessarily.</strong> The placement may sit in a single team. Being employed or hosted by a major pharmaceutical company does not automatically grant a full rotation across its functions. Departments have different obligations, staffing, access permissions and commercially sensitive projects. A broader overview may come through structured talks, shadowing, approved meetings and short informational interviews rather than several formal rotations.</p>
<p>Ask your host: “Which business unit am I assigned to? What is the main deliverable? Are there scheduled introductions to other functions? Could I arrange two or three short shadowing conversations while still completing the approved learning plan?” These questions are more informative than asking whether you will “see industry” in general.</p>
<p>Keep a note of the parts you enjoy: evaluating published evidence, preparing written responses, structured compliance work, data, project coordination, relationship-building or manufacturing science. That interest profile helps you choose future roles. The wide range of possible departments is supported by ABPI career descriptions, but the exact exposure is controlled by your employer.</p><p class="atlasIndustryCitations">Sources and further reading: <a href="https://www.abpi.org.uk/careers/working-in-the-industry/" target="_blank" rel="noopener noreferrer">ABPI — pharmaceutical industry careers</a> · <a href="https://www.abpi.org.uk/careers/working-in-the-industry/research-and-development/medical-affairs/" target="_blank" rel="noopener noreferrer">ABPI — medical affairs</a> · <a href="https://careers.ed.ac.uk/explore-your-options/finding-out-about-different-careers/sector-information/life-sciences-pharma-0" target="_blank" rel="noopener noreferrer">University of Edinburgh — life sciences careers and entry routes</a></p></div></details>
<details class="atlasIndustryAnswer" id="industry-medaffairs" ><summary><span class="atlasIndustryQuestionNumber">05</span><span>What do medical affairs and medical information actually do?</span></summary><div class="atlasIndustryAnswerBody"><p><strong>Medical information</strong> supports accurate, balanced and traceable responses to questions about medicines from healthcare professionals and other appropriate audiences. The work can involve evaluating sources, preparing referenced answers, maintaining approved information, escalating safety information and supporting compliant communications. A pharmacy background can be particularly relevant because it develops medicines knowledge and skills in finding and appraising clinical evidence.</p>
<p><strong>Medical affairs</strong> is broader: scientific strategy, evidence communication, medical education, external expert engagement and collaboration with clinical development, safety and other teams. Titles and responsibilities differ between companies. A trainee might observe an approved scientific meeting, review literature or learn how materials are medically reviewed; they should not assume they will independently act as a medical science liaison or sign off external materials.</p>
<p>A good learning objective is to compare <em>an evidence-based, non-promotional medical answer</em> with <em>promotional material</em> and understand why audience, claims, approvals and the ABPI Code matter. Ask how the medical team interacts with compliance, pharmacovigilance, regulatory and commercial colleagues.</p><p class="atlasIndustryCitations">Sources and further reading: <a href="https://www.abpi.org.uk/careers/job-roles/medical-information/" target="_blank" rel="noopener noreferrer">ABPI — medical information</a> · <a href="https://www.abpi.org.uk/careers/working-in-the-industry/research-and-development/medical-affairs/" target="_blank" rel="noopener noreferrer">ABPI — medical affairs</a> · <a href="https://www.abpi.org.uk/reputation/abpi-2024-code-of-practice/" target="_blank" rel="noopener noreferrer">ABPI — Code of Practice</a></p></div></details>
<details class="atlasIndustryAnswer" id="industry-regulatory" ><summary><span class="atlasIndustryQuestionNumber">06</span><span>What would I learn in regulatory affairs?</span></summary><div class="atlasIndustryAnswerBody"><p>Regulatory affairs helps make sure a medicine is developed, authorised and maintained in accordance with the relevant rules. Teams coordinate scientific and quality evidence, submissions, marketing authorisations, changes to product information, labelling and communication with regulators. Work often combines technical reading, precise writing, version control, timelines and cross-team coordination.</p>
<p>A trainee could learn the difference between an initial marketing authorisation, a post-authorisation variation and an update to a product information document; map the groups that contribute to a submission; or practise finding and comparing authorised information. Those are <strong>learning examples</strong>, not claims that every industry trainee has access to confidential dossiers or live regulatory submissions.</p>
<p>For career exploration, ask a regulatory colleague which introductory roles exist locally, what evidence of good documentation skills they look for and which qualifications are useful versus optional. ABPI notes that entrants can come from life-sciences degrees and may move into regulatory through other industry roles; you do not automatically need a PhD.</p><p class="atlasIndustryCitations">Sources and further reading: <a href="https://www.abpi.org.uk/careers/working-in-the-industry/research-and-development/regulatory-affairs/" target="_blank" rel="noopener noreferrer">ABPI — regulatory affairs</a> · <a href="https://www.abpi.org.uk/careers/job-case-studies/regulatory-affairs-associate-astellas/" target="_blank" rel="noopener noreferrer">ABPI — pharmacy graduate entering regulatory affairs</a></p></div></details>
<details class="atlasIndustryAnswer" id="industry-pharmacovigilance" ><summary><span class="atlasIndustryQuestionNumber">07</span><span>What is pharmacovigilance, and could a trainee work on it?</span></summary><div class="atlasIndustryAnswerBody"><p>Pharmacovigilance (PV) is about <strong>detecting, assessing, understanding and preventing problems associated with medicines</strong> during development and after launch. Teams may receive reports from healthcare professionals and patients, process individual case safety information, monitor literature, contribute to safety summaries and support risk-management activities.</p>
<p>An introductory placement may cover how suspected adverse drug reactions are identified, documented and promptly escalated through approved channels. The UK's MHRA Yellow Card scheme is a useful public example of how suspected medicine harms are reported. A trainee should learn the local reporting process <strong>before</strong> handling any real safety information: safety obligations and deadlines are not optional, and handling reports should remain supervised.</p>
<p>Ask the PV team what their typical workflow looks like, which data quality checks matter and how they communicate potential signals to regulatory and medical teams. Some companies combine pharmacovigilance and medical information responsibilities, while others keep them separate.</p><p class="atlasIndustryCitations">Sources and further reading: <a href="https://www.abpi.org.uk/careers/working-in-the-industry/research-and-development/drug-safety-pharmacovigilance/" target="_blank" rel="noopener noreferrer">ABPI — drug safety and pharmacovigilance</a> · <a href="https://www.gov.uk/guidance/the-yellow-card-scheme-guidance-for-healthcare-professionals-patients-and-the-public" target="_blank" rel="noopener noreferrer">MHRA — Yellow Card reporting</a></p></div></details>
<details class="atlasIndustryAnswer" id="industry-clinical-trials" ><summary><span class="atlasIndustryQuestionNumber">08</span><span>What would exposure to clinical trials involve?</span></summary><div class="atlasIndustryAnswerBody"><p>Clinical research teams coordinate the people, records and processes that allow trials to run safely and produce interpretable data. Depending on the organisation, introductory exposure might cover protocol reading, eligibility criteria, study timelines, document quality, site coordination, trial supplies or an explanation of informed consent and Good Clinical Practice (GCP).</p>
<p>Roles such as clinical trials administrator (CTA) and clinical research associate (CRA) have different responsibilities. For example, ABPI describes activities for experienced CRAs ranging from coordinating approvals to monitoring sites. A <strong>foundation trainee would normally observe or assist within an appropriate supervised scope</strong>, not immediately become an independent CRA or clinical investigator.</p>
<p>Useful questions include: “Does the host run its own trials or work with contract research organisations? May I attend a study-team meeting? Is introductory GCP training offered? Can I map how a protocol amendment reaches a clinical site?” Learn the research lifecycle first; then decide whether data, operations, monitoring or clinical science attracts you most.</p><p class="atlasIndustryCitations">Sources and further reading: <a href="https://www.abpi.org.uk/careers/working-in-the-industry/research-and-development/clinical-studies/clinical-research-work/" target="_blank" rel="noopener noreferrer">ABPI — clinical research work</a> · <a href="https://www.abpi.org.uk/careers/working-in-the-industry/" target="_blank" rel="noopener noreferrer">ABPI — pharmaceutical industry careers</a></p></div></details>
<details class="atlasIndustryAnswer" id="industry-other-routes" ><summary><span class="atlasIndustryQuestionNumber">09</span><span>What about manufacturing, quality, data, market access and commercial roles?</span></summary><div class="atlasIndustryAnswerBody"><p>Industry is much wider than medical affairs, regulatory affairs, pharmacovigilance and trials. Manufacturing and quality assurance teams work with production processes, batch records, deviations, investigations and GMP principles. Supply-chain teams manage availability and movement of medicines. Health economics and market access work with evidence about value, reimbursement and adoption. Data and analytics teams may support commercial, clinical or operational decisions. Project-management and business roles keep multidisciplinary work on schedule.</p>
<p>These functions can appeal to pharmacists who enjoy systems, technology, writing, data, structured processes or the broader medicine lifecycle. They also explain why the company hosting a placement is not a reliable shortcut to guessing the work: a regulatory placement at one site can differ fundamentally from a manufacturing placement elsewhere.</p>
<p>If you are unsure which route to pursue, request informational conversations with colleagues in two or three contrasting functions. Ask what they actually do, what they wish they had learned early and which entry-level roles recruit MPharm graduates. Keep the distinction between <strong>commercial strategy</strong>, <strong>scientific medical information</strong> and <strong>approved promotional activity</strong> clear.</p><p class="atlasIndustryCitations">Sources and further reading: <a href="https://www.abpi.org.uk/careers/working-in-the-industry/research-and-development/pharmacy/pharmacists-in-manufacturing/" target="_blank" rel="noopener noreferrer">ABPI — pharmacists in manufacturing</a> · <a href="https://careers.ed.ac.uk/explore-your-options/finding-out-about-different-careers/sector-information/life-sciences-pharma-0" target="_blank" rel="noopener noreferrer">University of Edinburgh — life sciences careers and entry routes</a> · <a href="https://www.abpi.org.uk/careers/working-in-the-industry/" target="_blank" rel="noopener noreferrer">ABPI — pharmaceutical industry careers</a> · <a href="https://www.abpi.org.uk/reputation/abpi-2024-code-of-practice/" target="_blank" rel="noopener noreferrer">ABPI — Code of Practice</a></p></div></details>
<details class="atlasIndustryAnswer" id="industry-hospital-community" ><summary><span class="atlasIndustryQuestionNumber">10</span><span>How do the hospital and community rotations help someone aiming for industry?</span></summary><div class="atlasIndustryAnswerBody"><p><strong>Hospital pharmacy</strong> can develop clinical reasoning, medicines reconciliation, multidisciplinary communication, drug-information skills and an understanding of specialist care pathways. <strong>Community pharmacy</strong> can build practical knowledge of dispensing systems, medicines safety, consultations, adherence barriers, patient access and real-world medicine use. Those experiences can make industry work more meaningful: you better understand the healthcare settings where a medicine will eventually be used.</p>
<p>For example, a patient question about side effects can connect community experience to pharmacovigilance; a hospital formulary discussion can illuminate evidence generation and market access; a medicines-information enquiry can connect to medical affairs. These are examples of transferable insight, not permission to collect patient information for industry projects.</p>
<p>The clinical rotations are also part of your actual foundation training, not an inconvenient detour from an industry career. NHS England's assessment and e-portfolio approach and the employer's training plan remain central. Check how your designated supervisor and rotational supervisors coordinate feedback, GPhC learning outcomes and preparation for the registration assessment.</p><p class="atlasIndustryCitations">Sources and further reading: <a href="https://london.wtepharmacy.nhs.uk/pharmacists/foundation-trainee-pharmacists/" target="_blank" rel="noopener noreferrer">NHS England — foundation training guidance</a> · <a href="https://london.wtepharmacy.nhs.uk/national-recruitment/employer-terms-of-participation/2026-employer-tops/" target="_blank" rel="noopener noreferrer">NHS England — 2026 employer training requirements</a> · <a href="https://www.uhb.nhs.uk/uhb-jobs/career-development/pharmacy-training/" target="_blank" rel="noopener noreferrer">University Hospitals Birmingham — example foundation programme</a></p></div></details>
<details class="atlasIndustryAnswer" id="industry-prepare" ><summary><span class="atlasIndustryQuestionNumber">11</span><span>What should I learn before the industry placement starts?</span></summary><div class="atlasIndustryAnswerBody"><p>Start with <strong>the medicine lifecycle</strong>: discovery → preclinical research → clinical development → regulatory approval → manufacturing and supply → monitoring after launch. Learn the basic vocabulary of trials (protocol, endpoint, randomisation, adverse event), medicine information (SmPC, evidence appraisal), regulatory affairs (marketing authorisation, variation), drug safety (adverse drug reaction, signal) and quality (GMP). This foundation helps you understand conversations without pretending to be a specialist.</p>
<p>Practise finding reliable sources and summarising a short clinical paper: research question, design, population, outcome, limitations and practical meaning. Refresh Excel tables, basic charts, PowerPoint and professional email writing, since these may be useful across many office-based teams. If the host offers specific training in GCP, information governance or its internal systems, follow its materials rather than paying for generic courses first.</p>
<p>Before day one, ask which department you are joining, whether there are suggested papers or onboarding modules, the expected dress and attendance arrangements, whether equipment is provided, and how work will be mapped to the foundation portfolio. Doing a little targeted reading beats trying to master every pharma function.</p><p class="atlasIndustryCitations">Sources and further reading: <a href="https://www.abpi.org.uk/careers/working-in-the-industry/" target="_blank" rel="noopener noreferrer">ABPI — pharmaceutical industry careers</a> · <a href="https://www.abpi.org.uk/careers/working-in-the-industry/research-and-development/clinical-studies/clinical-research-work/" target="_blank" rel="noopener noreferrer">ABPI — clinical research work</a> · <a href="https://www.abpi.org.uk/reputation/abpi-2024-code-of-practice/" target="_blank" rel="noopener noreferrer">ABPI — Code of Practice</a></p></div></details>
<details class="atlasIndustryAnswer" id="industry-first-90-days" ><summary><span class="atlasIndustryQuestionNumber">12</span><span>How can I make the most of a short industry rotation?</span></summary><div class="atlasIndustryAnswerBody"><p><strong>Before arrival:</strong> request your schedule and supervisor details; set two or three learning goals. Examples: “Understand the medical-information workflow,” “Complete one accurately referenced project,” or “Meet colleagues in two other functions.”</p>
<p><strong>First weeks:</strong> learn the safety, confidentiality and document-control rules; ask your supervisor what successful performance looks like; understand where your work fits into a broader medicine process. Keep a private learning log that records your <em>skills and reflections</em>, not company confidential information or patient details.</p>
<p><strong>Middle of the rotation:</strong> volunteer for an appropriately scoped project, request feedback early, and ask for permitted shadowing. Record what changed following your feedback: a clearer evidence table, better communication with colleagues, a faster checked workflow or a stronger presentation.</p>
<p><strong>Final weeks:</strong> present your approved learning to the team, ask for a development conversation and identify roles worth researching. Request LinkedIn connections or future career advice professionally, without assuming a job will be available. Make sure any evidence included in your GPhC portfolio or personal CV complies with your employer's policy.</p><p class="atlasIndustryCitations">Sources and further reading: <a href="https://london.wtepharmacy.nhs.uk/pharmacists/foundation-trainee-pharmacists/" target="_blank" rel="noopener noreferrer">NHS England — foundation training guidance</a> · <a href="https://london.wtepharmacy.nhs.uk/national-recruitment/employer-terms-of-participation/2026-employer-tops/" target="_blank" rel="noopener noreferrer">NHS England — 2026 employer training requirements</a> · <a href="https://www.abpi.org.uk/careers/job-case-studies/" target="_blank" rel="noopener noreferrer">ABPI — real job case studies</a></p></div></details>
<details class="atlasIndustryAnswer" id="industry-career-after" ><summary><span class="atlasIndustryQuestionNumber">13</span><span>Can this help me get an industry job after registration?</span></summary><div class="atlasIndustryAnswerBody"><p><strong>Yes, it can be useful evidence of interest, understanding and professional contacts; no, it is not a guaranteed job offer.</strong> A graduate with an industry split may be able to explain what a specific team does, how it handles evidence and compliance, and what they contributed. That is often much stronger than a generic statement that “I have always been interested in pharma”. But a hospital-only or community-only training year does not close off industry as a career.</p>
<p>Routes include graduate programmes, entry-level positions and function-specific assistant or associate roles. Depending on the employer, search for medical information associate, regulatory affairs associate, drug safety associate, clinical trials administrator, clinical operations coordinator, quality associate, medical writer or graduate schemes. Some roles require additional expertise or experience, so read person specifications rather than assuming all are entry level.</p>
<p>An ABPI case study describes an individual entering regulatory affairs following a pharmacy degree and hospital foundation training, illustrating that a dedicated industry rotation is <em>not</em> the only route. University careers guidance likewise describes both graduate schemes and direct applications to junior roles. If you require visa sponsorship, check the <em>specific future employer and role</em>; the sponsorship status of a foundation programme does not determine a later industry's hiring decision.</p><p class="atlasIndustryCitations">Sources and further reading: <a href="https://www.abpi.org.uk/careers/job-case-studies/regulatory-affairs-associate-astellas/" target="_blank" rel="noopener noreferrer">ABPI — pharmacy graduate entering regulatory affairs</a> · <a href="https://careers.ed.ac.uk/explore-your-options/finding-out-about-different-careers/sector-information/life-sciences-pharma-0" target="_blank" rel="noopener noreferrer">University of Edinburgh — life sciences careers and entry routes</a> · <a href="https://www.abpi.org.uk/careers/job-case-studies/" target="_blank" rel="noopener noreferrer">ABPI — real job case studies</a> · <a href="https://pharmacistsupport.org/i-need-help-managing-my/student-experience/placements-and-working-whilst-studying/" target="_blank" rel="noopener noreferrer">Pharmacist Support — industrial placements and work experience</a></p></div></details>
<details class="atlasIndustryAnswer" id="industry-cv-interview" ><summary><span class="atlasIndustryQuestionNumber">14</span><span>How do I turn the experience into strong applications and interviews?</span></summary><div class="atlasIndustryAnswerBody"><p>Instead of writing “completed a pharmaceutical industry placement”, make your contribution specific. A stronger <em>illustrative</em> CV bullet would read: “Reviewed published evidence for a supervised medical-information exercise and produced a referenced summary used in an internal learning session.” Only include deliverables you genuinely completed, and obtain permission before describing work involving confidential projects.</p>
<p>Build two or three interview stories using <strong>Situation → Task → Action → Result → Reflection</strong>. Potential themes are responding to critical feedback, summarising conflicting evidence, communicating with someone from another function, following a quality process or balancing project work with clinical training. Results need not be invented percentages: an accepted document, a clear presentation or a documented improvement can be meaningful if true.</p>
<p>Keep an “industry role map” with three functions that interest you, the key skills each needs, relevant vacancies and people who can explain the work. Ask your supervisor whether they can provide a reference and whether you may stay in touch. Apply as roles open; don't wait until the end of the year to learn when graduate programmes recruit.</p><p class="atlasIndustryCitations">Sources and further reading: <a href="https://careers.ed.ac.uk/explore-your-options/finding-out-about-different-careers/sector-information/life-sciences-pharma-0" target="_blank" rel="noopener noreferrer">University of Edinburgh — life sciences careers and entry routes</a> · <a href="https://www.abpi.org.uk/careers/job-case-studies/" target="_blank" rel="noopener noreferrer">ABPI — real job case studies</a> · <a href="https://www.abpi.org.uk/careers/working-in-the-industry/research-and-development/regulatory-affairs/" target="_blank" rel="noopener noreferrer">ABPI — regulatory affairs</a></p></div></details>
<details class="atlasIndustryAnswer" id="industry-supervision-exams" ><summary><span class="atlasIndustryQuestionNumber">15</span><span>Will splitting the year disadvantage my registration assessment or learning outcomes?</span></summary><div class="atlasIndustryAnswerBody"><p>There is no sound basis for promising either that a split guarantees better assessment performance or that it puts every trainee at a disadvantage. What matters is the <strong>quality and coverage of the approved training plan, supervised patient-facing learning, assessment preparation and your own consistent study</strong>. Industry-specific activities may support professional judgement, governance, evidence appraisal and communication, while clinical rotations help develop prescribing and direct patient-care competencies.</p>
<p>Ask for the learning-outcome mapping across all three settings, who reviews your e-portfolio evidence, when progress reviews occur, how prescribing learning is supported, and what happens if a planned experience is unavailable. NHS England explains that a national assessment strategy and e-portfolio support trainees regardless of sector. Employers are expected to provide an approved training plan and appropriate designated supervision, including arrangements during multi-sector rotations.</p>
<p>Use your foundation provider and regulator for current assessment rules and deadlines. The title of a rotation does not override those requirements; neither does an anecdote from a trainee on Reddit establish your likely result.</p><p class="atlasIndustryCitations">Sources and further reading: <a href="https://london.wtepharmacy.nhs.uk/pharmacists/foundation-trainee-pharmacists/" target="_blank" rel="noopener noreferrer">NHS England — foundation training guidance</a> · <a href="https://london.wtepharmacy.nhs.uk/national-recruitment/employer-terms-of-participation/2026-employer-tops/" target="_blank" rel="noopener noreferrer">NHS England — 2026 employer training requirements</a> · <a href="https://www.pharmacyregulation.org/" target="_blank" rel="noopener noreferrer">GPhC — official pharmacy regulator</a></p></div></details>
<details class="atlasIndustryAnswer" id="industry-questions-to-ask" ><summary><span class="atlasIndustryQuestionNumber">16</span><span>What should I ask the placement coordinator now that I have an offer?</span></summary><div class="atlasIndustryAnswerBody"><p>Request answers in writing where possible. The key questions are: <strong>(1)</strong> Which company, department and team will host me? <strong>(2)</strong> How many weeks will I spend in each setting, and in what order? <strong>(3)</strong> What are the exact sites, working hours, travel expectations and any expense arrangements? <strong>(4)</strong> Who is my lead designated supervisor, and who supports me at each rotation site? <strong>(5)</strong> What are the expected industry projects and assessment evidence? <strong>(6)</strong> Are medical affairs, regulatory, safety or clinical trials visits genuinely scheduled, or just potential? <strong>(7)</strong> Can I meet previous trainees or attend introductory sessions? <strong>(8)</strong> How will registration-assessment preparation and supervised clinical practice be organised?</p>
<p>Also ask whether the first months of the placement can include an agreed small project, which types of team meetings you may attend, whether shadowing requires special approval and how to report confidentiality or safety concerns. Those are constructive questions for an enthusiastic new trainee, not unreasonable demands. The aim is to turn a vague programme title into a concrete training and career-development plan.</p><p class="atlasIndustryCitations">Sources and further reading: <a href="https://london.wtepharmacy.nhs.uk/national-recruitment/preferencing/" target="_blank" rel="noopener noreferrer">NHS England — preferencing and programme information</a> · <a href="https://london.wtepharmacy.nhs.uk/national-recruitment/employer-terms-of-participation/2026-employer-tops/" target="_blank" rel="noopener noreferrer">NHS England — 2026 employer training requirements</a> · <a href="https://london.wtepharmacy.nhs.uk/pharmacists/foundation-trainee-pharmacists/" target="_blank" rel="noopener noreferrer">NHS England — foundation training guidance</a> · <a href="https://www.abpi.org.uk/careers/job-case-studies/" target="_blank" rel="noopener noreferrer">ABPI — real job case studies</a></p></div></details></div><p class="atlasLearnCaution">Researched 21 November 2026. Guidance is independent of Oriel, the NHS and the GPhC. Official employer training plans and regulator requirements take precedence. Source links are provided for verification.</p></section>

    <section class="atlasLearnSection" id="atlasLearnStructure">
      <div class="eyebrow">02 · PROGRAMME STRUCTURE</div><h3>How to read a split placement</h3>
      <p>A programme may list several training settings or postcodes. That does not automatically tell you the weekly timetable, whether you move between sites, or how much time you spend in each team.</p>
      <div class="atlasLearnChecklist">
        <div><b>Weeks</b><span>Check the stated weeks in hospital, GP, community or other settings.</span></div>
        <div><b>Sequence</b><span>Ask which setting comes first and whether rotations change during the year.</span></div>
        <div><b>Sites</b><span>Confirm the exact address for every site and whether the location can change.</span></div>
        <div><b>Travel</b><span>Check whether travel between sites happens during the working day and whether expenses are reimbursed.</span></div>
        <div><b>Supervision</b><span>Find out who your designated supervisor is and how feedback is coordinated across placements.</span></div>
      </div>
    </section>

    <section class="atlasLearnSection atlasRegionExplorer" id="atlasLearnRegions">
      <div class="eyebrow">03 · LOCATION & LIFESTYLE</div>
      <h3>Find a region that fits the rest of your life.</h3>
      <p>Look beyond the regional label. Use the actual programme postcodes, salary, rota and likely commute when comparing places.</p>
      <div class="atlasLearnRegionTools">
        <label for="atlasLearnRegion">Where are you considering?</label>
        <select id="atlasLearnRegion"><option value="">Choose a region</option></select>
      </div>
      <div class="atlasRegionData" id="atlasRegionData" aria-live="polite">
        <p class="atlasLearnCaution">Select a region to see the programme snapshot and research tools.</p>
      </div>
      <div class="atlasLearnRegionLinks" id="atlasLearnRegionLinks" aria-label="Independent region research"></div>
      <div class="atlasRegionDecision">
        <div><strong>Housing</strong><span>Compare rental prices for the towns or postcodes where you might actually live — not a region-wide average.</span></div>
        <div><strong>Commute</strong><span>Check the journey on a weekday at your real start time, and whether late or weekend services work.</span></div>
        <div><strong>Work–life balance</strong><span>Weigh weekly hours, shift patterns, commute and housing costs together.</span></div>
      </div>
      <p class="atlasLearnCaution">Programme statistics below use the site's dated 2026 Oriel dataset. They are not live salary, rental or availability figures.</p>
    </section>

    <section class="atlasLearnSection" id="atlasLearnPay">
      <div class="eyebrow">04 · PAY & WORKING LIFE</div><h3>Look beyond the headline salary</h3>
      <p>Compare the advertised gross annual salary with contracted weekly hours, rota expectations and the real cost of getting to work. A higher salary can be less attractive if the commute, hours or housing costs are substantially higher.</p>
      <div class="atlasLearnChecklist">
        <div><b>Gross pay</b><span>Confirm the annual salary, pay point and whether the figure is for the full training year.</span></div>
        <div><b>Take-home pay</b><span>Income tax, National Insurance, pension contributions and student-loan deductions affect net pay.</span></div>
        <div><b>Hours and rota</b><span>Ask about weekends, evenings, bank holidays, overtime, breaks and how rotas are published.</span></div>
        <div><b>Travel and expenses</b><span>Check reimbursement for travel between sites, mileage, parking and required training days.</span></div>
        <div><b>Support</b><span>Ask about protected study time, exam preparation, supervision and access to learning resources.</span></div>
      </div>
      <div class="atlasLearnExternalLinks">
        <a href="https://www.gov.uk/income-tax-rates" target="_blank" rel="noopener noreferrer">GOV.UK · Income Tax rates</a>
        <a href="https://www.nhsbsa.nhs.uk/nhs-pensions" target="_blank" rel="noopener noreferrer">NHS Pensions</a>
        <a href="https://www.ons.gov.uk/peoplepopulationandcommunity/housing/bulletins/privaterentandhousepricesuk/latest" target="_blank" rel="noopener noreferrer">ONS · Private rent and house prices</a>
        <a href="https://tfl.gov.uk/fares" target="_blank" rel="noopener noreferrer">TfL · Fares</a>
      </div>
    </section>

    <section class="atlasLearnSection" id="atlasLearnYear">
      <div class="eyebrow">05 · THE FOUNDATION YEAR</div><h3>What should you expect as a trainee?</h3>
      <div class="atlasLearnTimeline">
        <div><b>Get oriented</b><p>Understand your role, workplace policies, supervision arrangements, learning plan and the expectations for each placement.</p></div>
        <div><b>Build evidence</b><p>Keep up with your learning portfolio, record relevant experiences and use feedback to identify gaps early.</p></div>
        <div><b>Develop judgement</b><p>Practise clinical reasoning, communication, medicines safety and reflective learning with appropriate supervision.</p></div>
        <div><b>Prepare consistently</b><p>Set a regular study routine for the GPhC registration assessment rather than leaving preparation until the final weeks.</p></div>
        <div><b>Review progress</b><p>Use supervisor meetings to discuss progress, workload, support needs and the next learning objectives.</p></div>
      </div>
      <p class="atlasLearnCaution">Your employer's training plan and the current GPhC requirements take precedence. Confirm current rules and deadlines directly with the regulator.</p>
      <div class="atlasLearnExternalLinks">
        <a href="https://www.pharmacyregulation.org/" target="_blank" rel="noopener noreferrer">General Pharmaceutical Council (GPhC)</a>
        <a href="https://www.pharmacyregulation.org/students-and-trainees/pharmacist-education-and-training/common-registration-assessment/sitting-common-registration-assessment" target="_blank" rel="noopener noreferrer">GPhC · Common Registration Assessment</a>
      </div>
    </section>

    <section class="atlasLearnSection" id="atlasLearnChecklist">
      <div class="eyebrow">06 · BEFORE YOU RANK OR ACCEPT</div><h3>Questions worth asking the employer</h3>
      <div class="atlasLearnQuestionGrid">
        <label><input type="checkbox"> What are the exact training addresses and rotation dates?</label>
        <label><input type="checkbox"> How many weeks are spent in each setting?</label>
        <label><input type="checkbox"> What are the contracted hours and weekend expectations?</label>
        <label><input type="checkbox"> Who supervises me in each placement?</label>
        <label><input type="checkbox"> How much protected study and assessment preparation is provided?</label>
        <label><input type="checkbox"> Are travel costs between sites reimbursed?</label>
        <label><input type="checkbox"> What support is available if I struggle or fall behind?</label>
        <label><input type="checkbox"> Which details are confirmed, and which may change?</label>
      </div>
    </section>

    <section class="atlasLearnSection atlasLearnResearch" id="atlasLearnResearch">
      <div class="eyebrow">07 · REAL-WORLD RESEARCH</div><h3>Look up a specific programme</h3>
      <p>Search the catalogue to find public discussions and reviews relating to an employer or training site. These links open the original public sources; Placement Atlas does not verify or endorse individual comments.</p>
      <label class="atlasLearnSearchLabel" for="atlasLearnProgrammeSearch">Search by programme, employer, region or postcode</label>
      <input id="atlasLearnProgrammeSearch" type="search" autocomplete="off" placeholder="e.g. Royal Free, Chelsea & Westminster, SW10 9NH">
      <div id="atlasLearnProgrammeResults" class="atlasLearnProgrammeResults" aria-live="polite"></div>
      <div id="atlasLearnSelectedProgramme" class="atlasLearnSelectedProgramme" hidden></div>
      <p class="atlasLearnCaution">Google reviews usually describe patient or customer experiences, not the quality of foundation training. Reddit discussions and individual reviews are anecdotes, not representative evidence. Check dates, context and the exact site before relying on them.</p>
    </section>

    <section class="atlasLearnSection atlasLearnSources">
      <div class="eyebrow">REFERENCE POINTS</div><h3>Use official information to verify the details</h3>
      <div class="atlasLearnExternalLinks">
        <a href="https://www.pharmacyregulation.org/" target="_blank" rel="noopener noreferrer">GPhC · Registration and training requirements</a>
        <a href="https://www.oriel.nhs.uk/" target="_blank" rel="noopener noreferrer">Official Oriel recruitment system</a>
        <a href="https://www.nhs.uk/" target="_blank" rel="noopener noreferrer">NHS · Health and services</a>
        <a href="https://www.nationalrail.co.uk/" target="_blank" rel="noopener noreferrer">National Rail · Journey planning</a>
      </div>
      <p class="atlasLearnCaution">This guide is separate from the future member discussion forum. Community-submitted experiences will need clear dates, source context, moderation and reporting before they are published.</p>
    </section>
  `;
  // Existing Oriel information becomes a secondary Guidance view.
  const guide=document.createElement('div');guide.id='atlasLearnGuidance';
  while(panel.firstChild)guide.append(panel.firstChild);
  guide.hidden=true;
  const home=document.createElement('div');home.id='atlasLearnHome';
  home.innerHTML='<header class="atlasLearnHero"><div class="eyebrow">YOUR PHARMACY LEARNING SPACE</div><h2>Learn with purpose.</h2><p>Build confidence from your first MPharm year through foundation training and registration preparation.</p></header>'+
  '<section class="atlasIndustryHubTeaser"><div><span class="eyebrow">NEW · INDUSTRY PLACEMENTS</span><h3>Industry + hospital + community: what to expect</h3><p>Explore 16 detailed answers on industry rotations, daily projects, medical affairs, regulatory affairs, pharmacovigilance, and getting into pharma after training.</p></div><button type="button" class="btn primary" data-industry-open>Explore the guide</button></section>'+
  '<div class="atlasLearnHomeGrid">'+
  '<article class="atlasLearnModule"><span class="atlasModuleIndex">01</span><h3>Drug knowledge</h3><p>Practise a structured formulary and build clinically accurate medicine knowledge.</p><small>Formulary exercises · next stage</small></article>'+
  '<article class="atlasLearnModule"><span class="atlasModuleIndex">02</span><h3>Flashcards &amp; revision</h3><p>Organise year-specific material and revisit the concepts you find difficult.</p><small>Study tools · planned</small></article>'+
  '<article class="atlasLearnModule"><span class="atlasModuleIndex">03</span><h3>Clinical simulations</h3><p>Practise counselling, prescription checking, services and OSCE-style scenarios.</p><small>Interactive practice · planned</small></article>'+
  '<article class="atlasLearnModule"><span class="atlasModuleIndex">04</span><h3>Journal &amp; portfolio</h3><p>Capture learning experiences, reflections and future portfolio material.</p><small>Private autosaving journal · planned</small></article></div>'+
  '<section class="atlasLearnHubGuidance"><div><span class="eyebrow">GUIDANCE &amp; ADVICE</span><h3>Research a placement</h3><p>Understand training settings, salary, working life and programme structure.</p></div><button type="button" class="btn" data-atlas-learn-view="guide">Open guidance</button></section>';
  const menu=document.createElement('nav');menu.className='atlasLearnHubNav';menu.setAttribute('aria-label','Learning Hub sections');
  menu.innerHTML='<button type="button" data-atlas-learn-view="home" aria-current="page">Learning</button><button type="button" data-atlas-learn-view="guide">Guidance &amp; advice</button>';
  panel.append(menu,home,guide);
  panel.querySelectorAll('[data-atlas-learn-view]').forEach(b=>b.addEventListener('click',()=>{
    const guidance=b.dataset.atlasLearnView==='guide';
    guide.hidden=!guidance;home.hidden=guidance;
    menu.querySelectorAll('button').forEach(x=>x.setAttribute('aria-current',String(x===b?'page':'false')));
    panel.scrollIntoView({behavior:'smooth',block:'start'});
  }));
  panel.querySelector('[data-industry-open]')?.addEventListener('click',()=>{
    panel.querySelector('.atlasLearnHubNav [data-atlas-learn-view="guide"]')?.click();
    const target=panel.querySelector('#atlasLearnIndustry');
    requestAnimationFrame(()=>target?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'}));
  });
  panel.querySelectorAll('[data-industry-expand]').forEach(button=>button.addEventListener('click',()=>{
    const open=button.dataset.industryExpand==='all';
    panel.querySelectorAll('#atlasLearnIndustry .atlasIndustryAnswer').forEach(item=>{item.open=open;});
  }));
  const prefs=document.getElementById('prefs');
  if(prefs)prefs.insertAdjacentElement('afterend',panel);
  else document.querySelector('.shell')?.append(panel);
  // The main application is loaded asynchronously after cloud bootstrap.
  // An early click must still open Learning Hub once the app is interactive.
  let pendingLearn=false;
  nav.addEventListener('click',event=>{
    const selected=event.target.closest?.('.tab[data-tab]');
    if(selected&&selected!==tab)pendingLearn=false;
  },true);
  tab.addEventListener('click',()=>{
    if(typeof switchTab==='function')return; // The main app's normal handler opens it.
    if(pendingLearn)return;
    pendingLearn=true;
    let checks=0;
    const resume=()=>{
      if(!pendingLearn)return;
      if(typeof switchTab==='function'){
        pendingLearn=false;switchTab('learn');return;
      }
      if(checks++<375)window.setTimeout(resume,160);
      else pendingLearn=false;
    };
    resume();
  });
  tab.onclick=()=>{if(typeof switchTab==='function')switchTab('learn')};
  panel.querySelectorAll('[data-learn-jump]').forEach(button=>button.addEventListener('click',()=>{
    panel.querySelector('#atlasLearn'+(button.dataset.learnJump==='settings'?'Settings':'Research'))?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});
  }));
  const regionSelect=panel.querySelector('#atlasLearnRegion'),regionLinks=panel.querySelector('#atlasLearnRegionLinks');
  const regionNames={'east midlands':'East Midlands','east of england':'East of England','kent, surrey and sussex':'Kent, Surrey and Sussex','north east':'North East','north west':'North West','south west':'South West','thames valley':'Thames Valley','wales':'Wales','wessex':'Wessex','west midlands':'West Midlands','yorkshire and the humber':'Yorkshire and the Humber','london':'London'};
  const formatRegion=value=>regionNames[String(value||'').trim().toLowerCase()]||String(value||'').replace(/\b[a-z]/g,c=>c.toUpperCase());
  const allPlacements=()=>{try{return Array.isArray(placements)?placements:[]}catch{return []}};
  const cleanTitle=p=>window.AtlasPrototypeCleanTitle?.(p.title||p.employer||'Programme',p)||p.title||p.employer||'Programme';
  const populateRegions=()=>{
    if(!regionSelect)return;
    const current=regionSelect.value,regions=[...new Set(allPlacements().map(p=>p.region).filter(Boolean))].sort((a,b)=>formatRegion(a).localeCompare(formatRegion(b)));
    regionSelect.replaceChildren(new Option('Choose a region',''));
    for(const value of regions)regionSelect.add(new Option(formatRegion(value),value));
    if(regions.includes(current))regionSelect.value=current;
  };
  const addLink=(parent,label,url)=>{
    const a=document.createElement('a');a.href=url;a.target='_blank';a.rel='noopener noreferrer';a.textContent=label;parent.append(a);
  };
  const regionData=panel.querySelector('#atlasRegionData');
  const regionExplore=region=>{
    const exploreFilter=document.getElementById('region');
    if(exploreFilter){
      exploreFilter.value=region;
      exploreFilter.dispatchEvent(new Event('change',{bubbles:true}));
    }
    document.querySelector('nav.tabs [data-tab="explore"]')?.click();
  };
  const updateRegionLinks=()=>{
    if(!regionLinks||!regionData)return;
    const region=regionSelect.value;
    regionLinks.replaceChildren();regionData.replaceChildren();
    if(!region){
      const hint=document.createElement('p');hint.textContent='Choose a region to compare its programmes and plan your next steps.';
      hint.className='atlasLearnCaution';regionData.append(hint);return;
    }
    const items=allPlacements().filter(p=>p.region===region);
    const salaries=items.map(p=>Number(p.salary)).filter(n=>Number.isFinite(n)&&n>10000&&n<150000).sort((a,b)=>a-b);
    const hours=items.map(p=>Number(p.hours)).filter(n=>Number.isFinite(n)&&n>=15&&n<=60).sort((a,b)=>a-b);
    const median=a=>a.length?(a.length%2?a[(a.length-1)/2]:(a[a.length/2-1]+a[a.length/2])/2):null;
    const money=n=>'£'+Math.round(n).toLocaleString('en-GB');
    const tiles=[
      ['Programmes in catalogue',String(items.length)],
      ['Median listed salary',salaries.length?money(median(salaries)):'Not stated'],
      ['Median weekly hours',hours.length?median(hours)+' hours':'Not stated']
    ];
    const title=document.createElement('h4');title.textContent=formatRegion(region)+' · at a glance';regionData.append(title);
    const grid=document.createElement('div');grid.className='atlasRegionStats';
    for(const [label,value] of tiles){
      const item=document.createElement('div');
      const small=document.createElement('span');small.textContent=label;
      const big=document.createElement('strong');big.textContent=value;
      item.append(small,big);grid.append(item);
    }
    regionData.append(grid);
    const note=document.createElement('p');note.className='atlasRegionFootnote';
    note.textContent=salaries.length
      ?'Salary data available for '+salaries.length+' of '+items.length+' programmes. Median is descriptive, not a prediction of an offer.'
      :'Programme salaries are not available for this region in the loaded dataset.';
    regionData.append(note);
    const button=document.createElement('button');button.type='button';button.className='btn primary atlasRegionExploreBtn';
    button.textContent='Explore programmes in '+formatRegion(region);
    button.addEventListener('click',()=>regionExplore(region));regionData.append(button);
    const heading=document.createElement('strong');heading.className='atlasRegionLinksHeading';
    heading.textContent='Useful next checks';regionLinks.append(heading);
    addLink(regionLinks,'Local rents · ONS','https://www.ons.gov.uk/visualisations/housingpriceslocal/');
    addLink(regionLinks,'Train routes · National Rail','https://www.nationalrail.co.uk/');
    const transport={
      'london':['London travel · TfL','https://tfl.gov.uk/'],
      'wales':['Wales travel · TfW','https://tfw.wales/'],
      'north west':['Greater Manchester travel · TfGM','https://tfgm.com/'],
      'west midlands':['West Midlands travel · TfWM','https://www.tfwm.org.uk/'],
      'north east':['Tyne and Wear travel · Nexus','https://www.nexus.org.uk/'],
      'south west':['West of England travel · Travelwest','https://travelwest.info/']
    };
    const specific=transport[String(region).toLowerCase()];
    if(specific)addLink(regionLinks,...specific);
    addLink(regionLinks,'Local transport · Traveline','https://www.traveline.info/');
    const footer=document.createElement('p');footer.className='atlasRegionFootnote';
    footer.textContent='Select exact towns and training sites before using local rent and travel information.';
    regionLinks.append(footer);
  };
  regionSelect?.addEventListener('change',updateRegionLinks);
  populateRegions();updateRegionLinks();
  const search=panel.querySelector('#atlasLearnProgrammeSearch'),results=panel.querySelector('#atlasLearnProgrammeResults'),selected=panel.querySelector('#atlasLearnSelectedProgramme');
  const researchFor=p=>{
    if(!selected)return;
    selected.hidden=false;selected.replaceChildren();
    const heading=document.createElement('div');heading.className='atlasLearnSelectedHead';
    const name=document.createElement('strong');name.textContent=cleanTitle(p);
    const meta=document.createElement('span');meta.textContent=formatRegion(p.region)+' · '+(p.postcodes||[]).join(' + ');
    heading.append(name,meta);selected.append(heading);
    const links=document.createElement('div');links.className='atlasLearnExternalLinks';
    const base=(p.employer||cleanTitle(p))+' '+(p.region||'')+' foundation pharmacist training';
    const siteQuery=(p.employer||cleanTitle(p))+' '+(p.region||'')+' official company training site';
    addLink(links,'Find the employer’s official website (search)','https://www.google.com/search?q='+encodeURIComponent(siteQuery));
    addLink(links,'Search Google reviews','https://www.google.com/search?q='+encodeURIComponent((p.employer||cleanTitle(p))+' '+(p.region||'')+' reviews'));
    addLink(links,'Search Reddit trainee experiences','https://www.reddit.com/search/?q='+encodeURIComponent(base+' placement experience'));
    addLink(links,'Find the training site on Google Maps','https://www.google.com/maps/search/?api=1&query='+encodeURIComponent((p.employer||cleanTitle(p))+' '+(p.postcodes||[]).join(' ')));
    addLink(links,'Search the wider web','https://www.google.com/search?q='+encodeURIComponent(base+' trainee experience'));
    // An employer's name is not proof that a specific programme includes
    // industry: use only explicit programme/sector wording for these links.
    const industryDescription=[p.title,p.employer,p.sector,p.setting,p.trainingSetting,
      ...(Array.isArray(p.rotations)?p.rotations.map(x=>typeof x==='string'?x:(x?.sector||x?.setting||'')):[])
    ].filter(Boolean).join(' ').toLowerCase();
    if(/\bindustry\b|pharmaceutical industry/.test(industryDescription)){
      addLink(links,'Industry trainee’s first-hand account · Pharmaceutical Journal',
        'https://pharmaceutical-journal.com/article/feature/what-pharmacy-trainees-can-expect-from-a-preregistration-year-in-the-pharmaceutical-industry');
      addLink(links,'Industry careers and employee stories · ABPI','https://www.abpi.org.uk/careers/job-case-studies/');
      addLink(links,'Industry rotation guide · Placement Atlas','/industry-foundation-training.html');
    }
    selected.append(links);
  };
  const renderMatches=()=>{
    if(!search||!results)return;
    const query=search.value.trim().toLowerCase();results.replaceChildren();
    if(query.length<2){results.hidden=true;return}
    const terms=query.split(/\s+/).filter(Boolean);
    const matches=allPlacements().filter(p=>{
      const haystack=[p.title,p.employer,p.region,p.id,...(p.postcodes||[])].join(' ').toLowerCase();
      return terms.every(term=>haystack.includes(term));
    }).slice(0,8);
    results.hidden=false;
    if(!matches.length){const empty=document.createElement('p');empty.className='atlasLearnNoResults';empty.textContent='No matching programmes. Try an employer, town or postcode.';results.append(empty);return}
    for(const p of matches){
      const button=document.createElement('button');button.type='button';button.className='atlasLearnProgrammeResult';
      const title=document.createElement('strong');title.textContent=cleanTitle(p);
      const meta=document.createElement('span');meta.textContent=formatRegion(p.region)+' · '+(p.postcodes||[]).join(' + ')+' · '+(p.salary?'£'+Number(p.salary).toLocaleString('en-GB'):'Salary not listed');
      button.append(title,meta);button.addEventListener('click',()=>{search.value=cleanTitle(p);results.hidden=true;researchFor(p)});
      results.append(button);
    }
  };
  search?.addEventListener('input',renderMatches);
  // The catalogue loads asynchronously. The main app announces desk:ready,
  // not necessarily desk:dataset; hydrate again once data is available.
  const syncLibrary=()=>{populateRegions();updateRegionLinks();renderMatches();};
  for(const event of ['desk:ready','desk:dataset','desk:cards-ready'])document.addEventListener(event,syncLibrary);
  tab.addEventListener('click',syncLibrary);
  const awaitCatalogue=attempt=>{
    if(allPlacements().length){syncLibrary();return;}
    if(attempt<40)window.setTimeout(()=>awaitCatalogue(attempt+1),250);
  };
  awaitCatalogue(0);
})();
