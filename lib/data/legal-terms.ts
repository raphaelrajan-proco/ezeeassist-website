/**
 * Terms of Use, copied verbatim from the live site.
 *
 * Source: https://www.ezeeassist.com/terms-of-use
 * Extracted from that page's HTML rather than from a prose conversion:
 * this is legal copy and a summary is not a copy. A first attempt read
 * the page through a summarising fetch and came back with whole articles
 * collapsed to one line ("7.1 - 7.12: Standard contract provisions
 * covering..."), which is exactly the failure to avoid.
 *
 * **Do not edit the wording here.** It has to match the published page.
 * If the live page changes, re-extract rather than hand-patching, or the
 * two drift and nobody can tell which is authoritative.
 *
 * `t` is the source tag: h4 a section heading, p a paragraph, li a
 * bullet. The page renders each accordingly and adds nothing.
 */
export type LegalBlock = { t: "h4" | "p" | "li"; s: string };

export const TERMS_BLOCKS: LegalBlock[] = [
  { t: "h4", s: "Last updated: September 1, 2023" },
  { t: "p", s: "THESE TERMS OF USE (“TERMS OF USE”) GOVERN YOUR (AS DEFINED BELOW) ACCESS TO AND USE OF OUR SERVICES AND SITE (AS DEFINEDBELOW). THESE TERMS OF USE FORM A BINDING LEGAL AGREEMENT BETWEEN PROCO INNOVATION INC. (“PROCO”, “US”, “WE”, AND “OUR”) AND THE USER WHO ACCESSES OR USES THE SERVICES OR SITE IN ANY WAY (“YOU”)." },
  { t: "p", s: "BY USING THE SITE OR SERVICES (INCLUDING BY ENGAGING WITH PROCO'S CHATBOT) IN ANY WAY, YOU HEREBY AGREE TO THESE TERMS OF USE, AS WELL AS OUR PRIVACY POLICY AND COOKIES POLICY. IF YOU ARE USING THE SERVICES ON BEHALF OF A CUSTOMER OF PROCO, THEN USE OF THE SERVICES SHALL ALSO BE SUBJECT TO THE SERVICES AGREEMENT ENTERED INTO BETWEEN PROCO AND CUSTOMER." },
  { t: "h4", s: "Article 1: Website And Services" },
  { t: "p", s: "1.1 Use of the Site" },
  { t: "p", s: "Subject to Your compliance with these Terms of Use, Proco may, on the terms and conditions set out in these Terms of Use, provide You with access to access to and use of our website, www.ezeeassist.com and any subpages (collectively, the “Site”)." },
  { t: "p", s: "1.2 Use of the Platform Services" },
  { t: "p", s: "Subject to Your compliance with these Terms of Use, Proco may, on the terms and conditions set out in these Terms of Use, provide You with access to Proco's proprietary conversational, artificial intelligence-powered chatbot software services (“Platform Services”) and any other products and services otherwise made available by Proco under these Terms of Use (collectively, the “Services”). In order to provide the Services, it will be necessary for Proco to communicate with You through various channels, including instant messaging, email and SMS. Accordingly, You consent and grant us permission to communicate with You through such channels, and further agree to provide us with any further evidence required to document or affirm such consent and permission, in each case as required by applicable laws, in connection with these Terms of Use or our performance of the Services." },
  { t: "p", s: "1.3 Product Evaluation or Sandbox Usage" },
  { t: "p", s: "Proco may make available a free or discounted version of the Site, Platform Services or other Services on a trial basis. If access is provisioned to You, Proco grants You a limited, personal, non-transferrable, non-sub-licensable, revocable internal license to use the Services for non-production, evaluation purposes during the applicable trial period. NOTWITHSTANDING ANY OTHER PROVISIONS IN THESE TERMS, ACCESS TO THE TRIAL VERSION OF THE SERVICES IS ON AN “AS-IS” BASIS WITHOUT ANY REPRESENTATIONS, WARRANTIES AND/OR CONDITIONS OF ANY KIND. ANY DATA OR CONTENT UPLOADED TO THE SERVICES BY COMPANY MAY BE PERMANENTLY LOST UPON EXPIRY OF THE TRIAL PERIOD." },
  { t: "h4", s: "Article 2: Service Restrictions" },
  { t: "p", s: "2.1 Services Restrictions" },
  { t: "p", s: "You shall use the Services solely as contemplated in these Terms of Use and shall not directly or indirectly license, sublicense, sell, resell, lease, transfer, assign, distribute, time share or, save as expressly permitted by these Terms of Use, otherwise make the Services available to any third party including through any file-sharing method or any application hosting service. You represent and warrant all use of the Site and Services shall be in compliance with our Acceptable Use Policy." },
  { t: "h4", s: "Article 3: Proprietary Rights" },
  { t: "p", s: "3.1 Reservation of Rights" },
  { t: "p", s: "Proco owns all right, title and interest, including Intellectual Property Rights, in and to: (i) the Services and Site; (ii) Aggregated and Statistical Information (as defined below); and (iii) any changes, updates, enhancements, adaptations, translations, or derivative works to the foregoing. Except for the limited rights expressly granted to You, all other rights in and to the Services are expressly reserved by Proco and its licensors." },
  { t: "p", s: "3.2 Feedback" },
  { t: "p", s: "Proco may freely use any suggestions, feedback or ideas You may provide. By providing any feedback to Proco, You grant Proco a perpetual, worldwide, fully transferable, sublicensable, non-revocable, royalty free license to use the feedback that You provide. Proco may put any provided feedback in various uses that may include but are not limited to modifying and improving the Site and Services, Proco's other current and future services/products, advertising or marketing materials without any payment or other further obligation to You." },
  { t: "p", s: "3.3 End User Data" },
  { t: "p", s: "You hereby grant Proco a worldwide, royalty-free, and non-exclusive license to access any data relating to You that we receive either directly or indirectly from You, which may include Your personal information (“End User Data”). End User Data in order to:" },
  { t: "p", s: "(a) provide the Services;" },
  { t: "p", s: "(b) perform the obligations set out in these Terms of Use;" },
  { t: "p", s: "(c) improve the Services and to create aggregated and de-identified information (“Aggregated Statistical Information”)." },
  { t: "h4", s: "Article 4: Term And Termination" },
  { t: "p", s: "4.1 Term and Termination" },
  { t: "p", s: "These Terms of Use will commence when You first use our Site or Services and will continue until terminated by either party in accordance with the terms and conditions set out in these Terms of Use (the “Term”). We may terminate these Terms of Use for convenience, at any time, by providing written notice to You." },
  { t: "p", s: "4.2 Surviving Provisions" },
  { t: "p", s: "The following provisions shall survive any termination or expiration of these Terms of Use: Section 2.1, Article 3, Article 5, Section 4.2, and Article 5." },
  { t: "h4", s: "Article 5: Warranties, Disclaimers, & Indemnification" },
  { t: "p", s: "5.1 Warranties" },
  { t: "p", s: "You represent and warrant that:" },
  { t: "p", s: "(a) You have the right and authority to enter into these Terms of Use and to grant all rights granted by You in these Terms of Use;" },
  { t: "p", s: "(b) if You are accessing or using the Services on behalf of another person or entity, that You have the authority to bind such person or entity to these Terms of Use; and" },
  { t: "p", s: "(c) Your use of the Site and Services will comply at all times with the Acceptable Use Policy and all applicable laws and regulations." },
  { t: "p", s: "5.2 Disclaimer" },
  { t: "p", s: "TO THE EXTENT FULLY APPLICABLE BY LAW, YOU ACKNOWLEDGE, UNDERSTAND AND AGREE THAT THE SITE AND SERVICES ARE PROVIDED “AS IS” AND “WHERE-IS”, WITHOUT ANY REPRESENTATION, CONDITION, AND/OR WARRANTY OF ANY KIND. PROCO AND ITS LICENSORS AND/OR SUPPLIERS MAKE NO REPRESENTATIONS AND GIVE NO WARRANTIES OR CONDITIONS, EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE REGARDING THE SITE OR SERVICES PROVIDED UNDER THESE TERMS OF USE AND PROCO SPECIFICALLY DISCLAIMS ANY AND ALL STATUTORY REPRESENTATIONS, WARRANTIES, AND/OR CONDITIONS AGAINST NON-INFRINGEMENT AND ANY AND ALL IMPLIED REPRESENTATIONS, CONDITIONS AND/OR WARRANTIES OF MERCHANTABILITY, MERCHANTABLE QUALITY, DURABILITY, TITLE AND FITNESS FOR A PARTICULAR PURPOSE TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW. WE DO NOT WARRANT THAT THE SERVICES WILL BE PROVIDED WITHOUT INTERRUPTION OR BE ERROR FREE." },
  { t: "p", s: "5.3 Indemnification" },
  { t: "p", s: "You agree to indemnify, defend and hold Proco and its officers, directors, employees and representatives harmless from and against any and all claims, complaints, demands, investigations, actions, suits and proceedings by any third party and all resulting liabilities and obligations (including damages, administrative monetary penalties, financial sanctions, settlement payments, expenses and costs, including lawyer's fees) arising from, connected with or relating to:" },
  { t: "p", s: "(a) Your use of the Site or Services contrary to these Terms of Use; and" },
  { t: "p", s: "(b) any data, information or other materials that You makes available to us (including in respect of personal information)." },
  { t: "h4", s: "Article 6 - Limitation Of Liability" },
  { t: "p", s: "6.1 No Customer Relationship with Proco; Resolution of Disputes" },
  { t: "p", s: "YOU ACKNOWLEDGE AND AGREE THAT, UNLESS YOU HAVE ENTERED INTO A SEPARATE SERVICES AGREEMENT WITH US, YOU ARE NOT A CUSTOMER OF OURS AND THAT WE ARE MAKING AVAILABLE THE SITE AND/OR SERVICES TO YOU ON BEHALF OF THIRD PERSONS OR THIRD-PARTY ORGANIZATIONS. ACCORDINGLY, YOU WILL RESOLVE ANY DISPUTES DIRECTLY WITH SUCH THIRD PERSONS OR THIRD-PARTY ORGANIZATIONS AND NOT US. SUCH THIRD PERSONS OR THIRD-PARTY ORGANIZATIONS MAY HAVE AN AGREEMENT WITH YOU GOVERNING THE PROCO PLATFORM SERVICES. IN THE EVENT OF ANY CONFLICTS OR INCONSISTENCY BETWEEN THE PROVISIONS OF SUCH AGREEMENT AND THE PROVISIONS OF THESE TERMS OF USE, THE PROVISIONS OF THESE TERMS OF USE WILL PREVAIL TO THE EXTENT OF SUCH CONFLICT OR INCONSISTENCY." },
  { t: "p", s: "6.2 Limitations of Liability" },
  { t: "p", s: "TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT WILL PROCO BE LIABLE, WHETHER BASED ON WARRANTY, CONTRACT, TORT, NEGLIGENCE, STRICT LIABILITY OR ANY OTHER LEGAL THEORY, FOR ANY DIRECT, INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, EXEMPLARY OR PUNITIVE DAMAGES; OR LOST PROFITS, LOSS OF USE, LOSS OF DATA, PERSONAL INJURY, FINES, FEES, PENALTIES OR OTHER LIABILITIES, IN EACH CASE, WHETHER OR NOT WE WERE ADVISED OF THE POSSIBILITY OF SUCH DAMAGES, RESULTING FROM OR RELATED TO THE SERVICES OR THESE TERMS OF USE. TO THE EXTENT THAT THE FOREGOING LIMITATION IS NOT PERMITTED BY APPLICABLE LAW, IN NO EVENT WILL OUR TOTAL AGGREGATE LIABILITY IN CONNECTION WITH OR UNDER THESE TERMS OF USE, OR YOUR USE OF, OR INABILITY TO MAKE USE OF, THE SERVICES, EXCEED $100 USD. FOR GREATER CERTAINTY, THE EXISTENCE OF ONE OR MORE CLAIMS UNDER THESE TERMS OF USE WILL NOT INCREASE THIS MAXIMUM LIABILITY AMOUNT." },
  { t: "h4", s: "Article 7 - Miscellaneous" },
  { t: "p", s: "7.1 Interpretation" },
  { t: "p", s: "For all purposes of these Terms of Use, except as otherwise expressly provided or unless the context otherwise requires:" },
  { t: "li", s: "All references in these Terms of Use to designated “sections”, “paragraphs”, “articles” and other subdivisions are references to the designated sections, paragraphs, articles and other subdivisions of these Terms of Use;" },
  { t: "li", s: "The words “herein”, “hereof” and “hereunder”, and other words of similar import, refer to these Terms of Use as a whole and not to any particular section, paragraph or other subdivision;" },
  { t: "li", s: "The headings are for convenience only and do not form a part of these Terms of Use, nor are they intended to interpret, define or limit the scope, extent or intent of these Terms of Use, or any of its provisions;" },
  { t: "li", s: "Where the words “include”, “includes” or “including” are used in these Terms of Use, they shall be deemed to be followed by the words “without limitation”, and the words following “include”, “includes” or “including”, as the case may be, shall not be considered to set forth an exhaustive list;" },
  { t: "li", s: "Any reference to any person shall include and shall be deemed to be a reference to any entity that is a successor to such entity; and" },
  { t: "li", s: "Words importing gender include all genders, and words importing the singular include the plural, and vice versa." },
  { t: "p", s: "7.2 Governing Law and Jurisdiction" },
  { t: "p", s: "These Terms of Use shall be construed and enforced in accordance with, and the rights of the parties shall be governed by, the laws of the Province of Ontario without reference to its choice of law rules. Each of the parties hereto hereby attorns to the non-exclusive jurisdiction of the courts of the Province of Ontario located in Toronto, Ontario." },
  { t: "p", s: "7.3 Assignment" },
  { t: "p", s: "You may not assign any of its rights or obligations hereunder, whether by operation of law or otherwise, without the prior written consent of Proco. Any attempt by You to assign its rights or obligations under these Terms of Use in breach of this Section shall be void and of no effect. Proco may assign any of its rights or obligations hereunder without Your consent. Subject to the foregoing, these Terms of Use shall bind and inure to the benefit of the parties, their respective successors and permitted assigns." },
  { t: "p", s: "7.4 Binding Nature of Agreement" },
  { t: "p", s: "These Terms of Use shall ensure to the benefit of and shall be binding upon the parties hereto together with their successors and permitted assigns." },
  { t: "p", s: "7.5 Amendments" },
  { t: "p", s: "Proco may amend these Terms of Use and any time by providing notice to You, including by posting an amendment version of these Terms of Use on the Site." },
  { t: "p", s: "7.6 Further Assurances" },
  { t: "p", s: "You covenant and agree to do such things and execute such further documents, agreements and assurances as may be necessary or advisable from time to time in order to carry out the terms and conditions of these Terms of Use in accordance with their true intent." },
  { t: "p", s: "7.7 Provisions Severable" },
  { t: "p", s: "If any provision of these Terms of Use is held to be invalid, unenforceable or illegal, such provision shall be deemed to be independent and severable from the remaining provisions of these Terms of Use, and the remaining provisions of these Terms of Use shall not be affected and shall be valid and enforceable to the full extent permitted by law." },
  { t: "p", s: "7.8 Rights and Remedies Cumulative" },
  { t: "p", s: "Except as provided in these Terms of Use, the rights, powers, remedies and privileges provided in these Terms of Use are cumulative and not exclusive of any rights, powers, remedies and privileges provided by law." },
  { t: "p", s: "7.9 Survival of Obligations" },
  { t: "p", s: "The obligations and remedies of the parties and all rights and obligations of either party that may have arisen or accrued prior to termination or expiry of these Terms of Use survive termination or expiry of these Terms of Use." },
  { t: "p", s: "7.10 Force Majeure" },
  { t: "p", s: "Proco shall not be liable for delays caused by any event beyond its reasonable control, including acts of God." },
  { t: "p", s: "7.11 Entire Agreement" },
  { t: "p", s: "These Terms of Use constitute the entire agreement between You and Proco pertaining to the subject matter of these Terms of Use and supersedes all prior agreements and understandings between You and Proco." },
  { t: "p", s: "7.12 Language" },
  { t: "p", s: "The parties have expressly requested and required that these Terms of Use and all related documents be written in the English language. Les parties conviennent et exigent expressément que ce Contrat et tous les documents qui s'y rapportent soient rédigés en Anglais." },
];
