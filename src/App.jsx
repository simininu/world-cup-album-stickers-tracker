import { useState, useEffect, useRef } from "react";
import { Shield, User, Users, Repeat2, X, SendHorizontal, Settings, Package, Star, UserPlus, UserCheck, Calendar, MapPin } from "lucide-react";

// Google Font injection
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href = "https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Inter:wght@400;600;700;800;900&display=swap";
document.head.appendChild(fontLink);

const LANG_KEY = "copa2026_lang";

const TRANSLATIONS = {
  en: {
    appTitle: "WORLD CUP 2026",
    appSubtitle: "Sticker Tracker",
    collection: "Collection",
    stickers: "stickers",
    missing: "missing",
    swaps: "Swaps",
    packs: "Packs",
    all: "All",
    groups: "Groups",
    duplicates: "Duplicates",
    missingTab: "Missing",
    specialStickers: "SPECIAL STICKERS",
    dup: "dup",
    dups: "dups",
    albumComplete: "Album complete!",
    noDuplicates: "No duplicates yet",
    group: "GROUP",
    myCollection: "My Collection",
    noStickersYet: "No stickers collected yet",
    sticker: "sticker",
    close: "Close",
    collected: "collected",
    promisedTo: "Promised to:",
    namePlaceholder: "Name...",
    save: "Save",
    cancel: "Cancel",
    clear: "Clear",
    prev: "Prev",
    next: "Next",
    legendMissing: "Missing",
    legendHave: "Have",
    legendDuplicate: "Duplicate",
    legendPromised: "Promised",
    share: "SHARE",
    shareCollectionStatus: "Share your collection status",
    copyText: "Copy Text",
    copied: "Copied!",
    packTracker: "Pack Tracker",
    trackPurchases: "Track your pack purchases",
    totalSpent: "Total spent",
    avgPerPack: "Avg / pack",
    addPurchase: "Add purchase",
    packsLabel: "Packs",
    priceEach: "Price each (€)",
    add: "+ Add",
    noPurchasesYet: "No purchases yet",
    settings: "Settings",
    language: "Language",
    backupDescription: "Export your collection to a file and import it on another device.",
    exportCollection: "Export collection",
    downloadBackup: "Download a backup file",
    importCollection: "Import collection",
    restoreBackup: "Restore from a backup file",
    imported: "Imported!",
    invalidFile: "Invalid file",
    matches: "Matches",
    upcoming: "Upcoming",
    results: "Results",
    standings: "Standings",
    live: "LIVE",
    today: "Today",
    tomorrow: "Tomorrow",
    winner: "Winner",
    loser: "Loser",
    noMatchesFound: "No matches found",
    loadingScores: "Loading scores...",
  },
  pt: {
    appTitle: "COPA DO MUNDO 2026",
    appSubtitle: "Álbum de Figurinhas",
    collection: "Coleção",
    stickers: "figurinhas",
    missing: "faltando",
    swaps: "Trocas",
    packs: "Pacotes",
    all: "Todos",
    groups: "Grupos",
    duplicates: "Repetidas",
    missingTab: "Faltando",
    specialStickers: "FIGURINHAS ESPECIAIS",
    dup: "repetida",
    dups: "repetidas",
    albumComplete: "Álbum completo!",
    noDuplicates: "Nenhuma repetida ainda",
    group: "GRUPO",
    myCollection: "Minha Coleção",
    noStickersYet: "Nenhuma figurinha ainda",
    sticker: "figurinha",
    close: "Fechar",
    collected: "coletadas",
    promisedTo: "Prometida para:",
    namePlaceholder: "Nome...",
    save: "Salvar",
    cancel: "Cancelar",
    prev: "Anterior",
    clear: "Limpar",
    next: "Próximo",
    legendMissing: "Faltando",
    legendHave: "Tenho",
    legendDuplicate: "Repetida",
    legendPromised: "Prometida",
    share: "COMPARTILHAR",
    shareCollectionStatus: "Compartilhe o status da sua coleção",
    copyText: "Copiar Texto",
    copied: "Copiado!",
    packTracker: "Controle de Pacotes",
    trackPurchases: "Controle suas compras de pacotes",
    totalSpent: "Total gasto",
    avgPerPack: "Média / pacote",
    addPurchase: "Adicionar compra",
    packsLabel: "Pacotes",
    priceEach: "Preço cada (€)",
    add: "+ Adicionar",
    noPurchasesYet: "Nenhuma compra ainda",
    settings: "Configurações",
    language: "Idioma",
    backupDescription: "Exporte sua coleção para um arquivo e importe em outro dispositivo.",
    exportCollection: "Exportar coleção",
    downloadBackup: "Baixar arquivo de backup",
    importCollection: "Importar coleção",
    restoreBackup: "Restaurar de um arquivo de backup",
    imported: "Importado!",
    invalidFile: "Arquivo inválido",
    matches: "Jogos",
    upcoming: "Próximos",
    results: "Resultados",
    standings: "Classificação",
    live: "AO VIVO",
    today: "Hoje",
    tomorrow: "Amanhã",
    winner: "Vencedor",
    loser: "Perdedor",
    noMatchesFound: "Nenhum jogo encontrado",
    loadingScores: "Carregando placares...",
  },
};

const SPECIAL = [
  { code: "00", name: "Panini Logo" },
  { code: "FWC1", name: "Official Emblem" },
  { code: "FWC2", name: "Official Emblem II" },
  { code: "FWC3", name: "Official Mascots" },
  { code: "FWC4", name: "Official Slogan" },
  { code: "FWC5", name: "Official Ball" },
  { code: "FWC6", name: "Canada — Host Cities" },
  { code: "FWC7", name: "Mexico — Host Cities" },
  { code: "FWC8", name: "USA — Host Cities" },
  { code: "FWC9", name: "FIFA Museum — Uruguay 1930" },
  { code: "FWC10", name: "FIFA Museum — Italy 1934" },
  { code: "FWC11", name: "FIFA Museum — France 1938" },
  { code: "FWC12", name: "FIFA Museum — Brazil 1950" },
  { code: "FWC13", name: "FIFA Museum — Switzerland 1954" },
  { code: "FWC14", name: "FIFA Museum — Sweden 1958" },
  { code: "FWC15", name: "FIFA Museum — Chile 1962" },
  { code: "FWC16", name: "FIFA Museum — England 1966" },
  { code: "FWC17", name: "FIFA Museum — Mexico 1970" },
  { code: "FWC18", name: "FIFA Museum — Germany 1974" },
  { code: "FWC19", name: "FIFA Museum — Argentina 1978" },
];

const TEAMS = [
  // Group A
  { code: "MEX", name: "Mexico", flag: "🇲🇽", group: "A" },
  { code: "RSA", name: "South Africa", flag: "🇿🇦", group: "A" },
  { code: "KOR", name: "Korea Republic", flag: "🇰🇷", group: "A" },
  { code: "CZE", name: "Czechia", flag: "🇨🇿", group: "A" },
  // Group B
  { code: "CAN", name: "Canada", flag: "🇨🇦", group: "B" },
  { code: "BIH", name: "Bosnia-Herzegovina", flag: "🇧🇦", group: "B" },
  { code: "QAT", name: "Qatar", flag: "🇶🇦", group: "B" },
  { code: "SUI", name: "Switzerland", flag: "🇨🇭", group: "B" },
  // Group C
  { code: "BRA", name: "Brazil", flag: "🇧🇷", group: "C" },
  { code: "MAR", name: "Morocco", flag: "🇲🇦", group: "C" },
  { code: "HAI", name: "Haiti", flag: "🇭🇹", group: "C" },
  { code: "SCO", name: "Scotland", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", group: "C" },
  // Group D
  { code: "USA", name: "United States", flag: "🇺🇸", group: "D" },
  { code: "PAR", name: "Paraguay", flag: "🇵🇾", group: "D" },
  { code: "AUS", name: "Australia", flag: "🇦🇺", group: "D" },
  { code: "TUR", name: "Turkey", flag: "🇹🇷", group: "D" },
  // Group E
  { code: "GER", name: "Germany", flag: "🇩🇪", group: "E" },
  { code: "CUW", name: "Curaçao", flag: "🇨🇼", group: "E" },
  { code: "CIV", name: "Côte d'Ivoire", flag: "🇨🇮", group: "E" },
  { code: "ECU", name: "Ecuador", flag: "🇪🇨", group: "E" },
  // Group F
  { code: "NED", name: "Netherlands", flag: "🇳🇱", group: "F" },
  { code: "JPN", name: "Japan", flag: "🇯🇵", group: "F" },
  { code: "SWE", name: "Sweden", flag: "🇸🇪", group: "F" },
  { code: "TUN", name: "Tunisia", flag: "🇹🇳", group: "F" },
  // Group G
  { code: "BEL", name: "Belgium", flag: "🇧🇪", group: "G" },
  { code: "EGY", name: "Egypt", flag: "🇪🇬", group: "G" },
  { code: "IRN", name: "Iran", flag: "🇮🇷", group: "G" },
  { code: "NZL", name: "New Zealand", flag: "🇳🇿", group: "G" },
  // Group H
  { code: "ESP", name: "Spain", flag: "🇪🇸", group: "H" },
  { code: "CPV", name: "Cabo Verde", flag: "🇨🇻", group: "H" },
  { code: "KSA", name: "Saudi Arabia", flag: "🇸🇦", group: "H" },
  { code: "URU", name: "Uruguay", flag: "🇺🇾", group: "H" },
  // Group I
  { code: "FRA", name: "France", flag: "🇫🇷", group: "I" },
  { code: "SEN", name: "Senegal", flag: "🇸🇳", group: "I" },
  { code: "IRQ", name: "Iraq", flag: "🇮🇶", group: "I" },
  { code: "NOR", name: "Norway", flag: "🇳🇴", group: "I" },
  // Group J
  { code: "ARG", name: "Argentina", flag: "🇦🇷", group: "J" },
  { code: "ALG", name: "Algeria", flag: "🇩🇿", group: "J" },
  { code: "AUT", name: "Austria", flag: "🇦🇹", group: "J" },
  { code: "JOR", name: "Jordan", flag: "🇯🇴", group: "J" },
  // Group K
  { code: "POR", name: "Portugal", flag: "🇵🇹", group: "K" },
  { code: "COD", name: "DR Congo", flag: "🇨🇩", group: "K" },
  { code: "UZB", name: "Uzbekistan", flag: "🇺🇿", group: "K" },
  { code: "COL", name: "Colombia", flag: "🇨🇴", group: "K" },
  // Group L
  { code: "ENG", name: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", group: "L" },
  { code: "CRO", name: "Croatia", flag: "🇭🇷", group: "L" },
  { code: "GHA", name: "Ghana", flag: "🇬🇭", group: "L" },
  { code: "PAN", name: "Panama", flag: "🇵🇦", group: "L" },
];

const PLAYERS = {
  "MEX": ["Team Logo","Luis Malagón","Johan Vasquez","Jorge Sánchez","Cesar Montes","Jesus Gallardo","Israel Reyes","Diego Lainez","Carlos Rodriguez","Edson Alvarez","Orbelin Pineda","Marcel Ruiz","Team Photo","Érick Sánchez","Hirving Lozano","Santiago Giménez","Raúl Jiménez","Alexis Vega","Roberto Alvarado","Cesar Huerta"],
  "RSA": ["Team Logo","Ronwen Williams","Sipho Chaine","Aubrey Modiba","Samukele Kabini","Mbekezeli Mbokazi","Khulumani Ndamane","Siyabonga Ngezana","Khuliso Mudau","Nkosinathi Sibisi","Teboho Mokoena","Thalente Mbatha","Team Photo","Bathasi Aubaas","Yaya Sithole","Sipho Mbule","Lyle Foster","Iqraam Rayners","Mohau Nkota","Oswin Appollis"],
  "KOR": ["Team Logo","Hyeon-woo Jo","Seung-Gyu Kim","Min-jae Kim","Yu-min Cho","Young-woo Seol","Han-beom Lee","Tae-seok Lee","Myung-jae Lee","Jae-sung Lee","In-beom Hwang","Kang-in Lee","Team Photo","Seung-ho Paik","Jens Castrop","Dongg-yeong Lee","Gue-sung Cho","Heung-min Son","Hee-chan Hwang","Hyeon-Gyu Oh"],
  "CZE": ["Team Logo","Matej Kovar","Jindrich Stanek","Ladislav Krejci","Vladimir Coufal","Jaroslav Zeleny","Tomas Holes","David Zima","Michal Sadilek","Lukas Provod","Lukas Cerv","Tomas Soucek","Team Photo","Pavel Sulc","Matej Vydra","Vasil Kusej","Tomas Chory","Vaclav Cerny","Adam Hlozek","Patrik Schick"],
  "CAN": ["Team Logo","Dayne St.Clair","Alphonso Davies","Alistair Johnston","Samuel Adekugbe","Riche Larvea","Derek Cornelius","Moïse Bombito","Kamal Miller","Stephen Eustáquio","Ismaël Koné","Jonathan Osorio","Team Photo","Jacob Shaffelburg","Mathieu Choinière","Niko Sigur","Tajon Buchanan","Liam Millar","Cyle Larin","Jonathan David"],
  "BIH": ["Team Logo","Nikola Vasilj","Amer Dedic","Sead Kolasinac","Tarik Muharemovic","Nihad Mujakic","Nikola Katic","Amir Hadziahmetovic","Benjamin Tahirovic","Armin Gigovic","Ivan Sunjic","Ivan Basic","Team Photo","Dzenis Burnic","Esmir Bajraktarevic","Amar Memic","Ermedin Demirovic","Edin Dzeko","Samed Bazdar","Haris Tabakovic"],
  "QAT": ["Team Logo","Meshaal Barsham","Sultan Albrake","Lucas Mendes","Homam Ahmed","Boualem Khoukhi","Pedro Miguel","Tarek Salman","Mohamed Al-Mannai","Karim Boudiaf","Assim Madibo","Ahmed Fatehi","Team Photo","Mohammed Waad","Abdulaziz Hatem","Hassan Al-Haydos","Edmilson Junior","Akram Hassan Afif","Ahmed Al Ganehi","Almoez Ali"],
  "SUI": ["Team Logo","Gregor Kobel","Yvon Mvogo","Manuel Akanji","Ricardo Rodriguez","Nico Elvedi","Aurèle Amenda","Silvan Widmer","Granit Xhaka","Denis Zakaria","Remo Freuler","Fabian Rieder","Team Photo","Ardon Jashari","Johan Manzambi","Michel Aebischer","Breel Embolo","Ruben Vargas","Dan Ndoye","Zeki Amdouni"],
  "BRA": ["Team Logo","Alisson","Bento","Marquinhos","Éder Militão","Gabriel Magalhães","Danilo","Wesley","Lucas Paquetá","Casemiro","Bruno Guimarães","Luiz Henrique","Team Photo","Vinicius Júnior","Rodrygo","João Pedro","Matheus Cunha","Gabriel Martinelli","Raphinha","Estévão"],
  "MAR": ["Team Logo","Yassine Bounou","Munir El Kajoui","Achraf Hakimi","Noussair Mazraoui","Nayef Aguerd","Roman Saiss","Jawad El Yamio","Adam Masina","Sofyan Amrabat","Azzedine Ounahi","Eliesse Ben Seghir","Team Photo","Bilal El Khannouss","Ismael Saibari","Youssef En-Nesyri","Abde Ezzalzouli","Soufiane Rahimi","Brahim Diaz","Ayoub El Kaabi"],
  "HAI": ["Team Logo","Johny Placide","Carlens Arcus","Martin Expérience","Jean-Kevin Duverne","Ricardo Adé","Duke Lacroix","Garven Metusala","Hannes Delcroix","Leverton Pierre","Danley Jean Jacques","Jean-Ricner Bellegarde","Team Photo","Christopher Attys","Derrick Etienne Jr","Josue Casimir","Ruben Providence","Duckens Nazon","Louicius Deedson","Frantzdy Pierrot"],
  "SCO": ["Team Logo","Angus Gunn","Jack Hendry","Kieran Tierney","Aaron Hickey","Andrew Robertson","Scott McKenna","John Souttar","Anthony Ralston","Grant Hanley","Scott McTominay","Billy Gilmour","Team Photo","Lewis Ferguson","Ryan Christie","Kenny McLean","John McGinn","Lyndon Dykes","Che Adams","Ben Gannon-Doak"],
  "USA": ["Team Logo","Math Freese","Chris Richards","Tim Ream","Mark McKenzie","Alex Freeman","Antonee Robinson","Tyler Adams","Tanner Tessmann","Weston McKennie","Christian Roldan","Timothy Weah","Team Photo","Diego Luna","Malik Tillman","Christian Pulisic","Brenden Aaronson","Ricardo Pepi","Haji Wright","Folarin Balogun"],
  "PAR": ["Team Logo","Roberto Fernandez","Orlando Gill","Gustavo Gomez","Fabián Balbuena","Juan José Cáceres","Omar Alderete","Junior Alonso","Mathías Villasanti","Diego Gomez","Damián Bobadilla","Andres Cubas","Team Photo","Matias Galarza Fonda","Julio Enciso","Alejandro Romero Gamarra","Miguel Almirón","Ramon Sosa","Angel Romero","Antonio Sanabria"],
  "AUS": ["Team Logo","Mathew Ryan","Joe Gauci","Harry Souttar","Alessandro Circati","Jordan Bos","Aziz Behich","Cameron Burgess","Lewis Miller","Milos Degenek","Jackson Irvine","Riley McGree","Team Photo","Aiden O'Neill","Connor Metcalfe","Patrick Yazbek","Craig Goodwin","Kusini Vengi","Nestory Irankunda","Mohamed Touré"],
  "TUR": ["Team Logo","Ugurcan Cakir","Mert Muldur","Zeki Celik","Abdulkerim Bardakci","Caglar Soyuncu","Merih Demiral","Ferdi Kadioglu","Kaan Ayhan","Ismail Yuksek","Hakan Calhanoglu","Orkun Kokcu","Team Photo","Arda Guler","Irfan Can Kahveci","Yunus Akgun","Can Uzun","Baris Alper Yilmaz","Kerem Akturkoglu","Kenan Yildiz"],
  "GER": ["Team Logo","Marc-André ter Stegen","Jonathan Tah","David Raum","Nico Schlotterbeck","Antonio Rüdiger","Waldemar Anton","Ridle Baku","Maximilian Mittelstadt","Joshua Kimmich","Florian Wirtz","Felix Nmecha","Team Photo","Leon Goretzka","Jamal Musiala","Serge Gnabry","Kai Havertz","Leroy Sane","Karim Adeyemi","Nick Woltemade"],
  "CUW": ["Team Logo","Eloy Room","Armando Obispo","Sherel Floranus","Jurien Gaari","Joshua Brenet","Roshon Van Eijma","Shurandy Sambo","Livano Comenencia","Godfried Roemeratoe","Juninho Bacuna","Leandro Bacuna","Team Photo","Tahith Chong","Kenji Gorre","Jearl Margaritha","Jurgen Locadia","Jeremy Antonisse","Gervane Kastaneer","Sontje Hansen"],
  "CIV": ["Team Logo","Yahia Fofana","Ghislain Konan","Wilfried Singo","Odilon Kossounou","Evan Ndicka","Willy Boly","Emmanuel Agbadou","Ousmane Diomande","Franck Kessie","Seko Fofana","Ibrahim Sangare","Team Photo","Jean-Philippe Gbamin","Amad Diallo","Sébastien Haller","Simon Adingra","Yan Diomande","Evann Guessand","Oumar Diakite"],
  "ECU": ["Team Logo","Hernán Galíndez","Gonzalo Valle","Piero Hincapié","Pervis Estupiñán","Willian Pacho","Ángelo Preciado","Joel Ordóñez","Moises Caicedo","Alan Franco","Kendry Paez","Pedro Vite","Team Photo","John Veboah","Leonardo Campana","Gonzalo Plata","Nilson Angulo","Alan Minda","Kevin Rodriguez","Enner Valencia"],
  "NED": ["Team Logo","Bart Verbruggen","Virgil van Dijk","Micky van de Ven","Jurrien Timber","Denzel Dumfries","Nathan Aké","Jeremie Frimpong","Jan Paul van Hecke","Tijjani Reijnders","Ryan Gravenberch","Teun Koopmeiners","Team Photo","Frenkie de Jong","Xavi Simons","Justin Kluivert","Memphis Depay","Donyell Malen","Wout Weghorst","Cody Gakpo"],
  "JPN": ["Team Logo","Zion Suzuki","Henry Heroki Mochizuki","Ayumu Seko","Junnosuke Suzuki","Shogo Taniguchi","Tsuyoshi Watanabe","Kaishu Sano","Yuki Soma","Ao Tanaka","Daichi Kamada","Takefusa Kubo","Team Photo","Ritsu Doan","Keito Nakamura","Takumi Minamino","Shuto Machino","Junya Ito","Koki Ogawa","Ayase Ueda"],
  "SWE": ["Team Logo","Victor Johansson","Isak Hien","Gabriel Gudmundsson","Emil Holm","Victor Nilsson Lindelöf","Gustaf Lagerbielke","Lucas Bergvall","Hugo Larsson","Jesper Karlström","Yasin Ayari","Mattias Svanberg","Team Photo","Daniel Svensson","Ken Sema","Roony Bardghji","Dejan Kulusevski","Anthony Elanga","Alexander Isak","Viktor Gyökeres"],
  "TUN": ["Team Logo","Bechir Ben Said","Aymen Dahmen","Yan Valery","Montassar Talbi","Yassine Meriah","Ali Abdi","Dylan Bronn","Ellyes Skhiri","Aissa Laidouni","Ferjani Sassi","Mohamed Ali Ben Romdhane","Team Photo","Hannibal Mejbri","Elias Achouri","Elias Saad","Hazem Mastouri","Ismael Gharbi","Sayfallah Ltaief","Naim Sliti"],
  "BEL": ["Team Logo","Thibaut Courtois","Arthur Theate","Timothy Castagne","Zeno Debast","Brandon Mechele","Maxim De Cuyper","Thomas Meunier","Youri Tielemans","Amadou Onana","Nicolas Raskin","Alexis Saelemaekers","Team Photo","Hans Vanaken","Kevin De Bruyne","Jérémy Doku","Charles De Ketelaere","Leandro Trossard","Loïs Openda","Romelu Lukaku"],
  "EGY": ["Team Logo","Mohamed El Shenawy","Mohamed Hany","Mohamed Hamdy","Yasser Ibrahim","Khaled Sobhi","Ramy Rabia","Hossam Abdelmaguid","Ahmed Fatouh","Marwan Attia","Zizo","Hamdy Fathy","Team Photo","Mohamed Lasheen","Emam Ashour","Osama Faisal","Mohamed Salah","Mostafa Mohamed","Trezeguet","Omar Marmoush"],
  "IRN": ["Team Logo","Alireza Beiranvand","Morteza Pouraliganji","Ehsan Hajsafi","Milad Mohammadi","Shojae Khalilzadeh","Ramin Rezaeian","Hossein Kanaani","Sadegh Moharrami","Saleh Hardani","Saeed Ezatolahi","Saman Ghoddos","Team Photo","Omid Noorafkan","Roozbeh Cheshmi","Mohammad Mohebi","Sardar Azmoun","Mehdi Taremi","Alireza Jahanbakhsh","Ali Gholizadeh"],
  "NZL": ["Team Logo","Max Crocombe Payne","Alex Paulsen","Michael Boxall","Liberato Cacace","Tim Payne","Tyler Bindon","Francis de Vries","Finn Surman","Joe Bell","Sarpreet Singh","Ryan Thomas","Team Photo","Matthew Garbett","Marko Stamenić","Ben Old","Chris Wood","Elijah Just","Callum McCowatt","Kosta Barbarouses"],
  "ESP": ["Team Logo","Unai Simon","Robin Le Normand","Aymeric Laporte","Dean Huijsen","Pedro Porro","Dani Carvajal","Marc Cucurella","Martín Zubimendi","Rodri","Pedri","Fabian Ruiz","Team Photo","Mikel Merino","Lamine Yamal","Dani Olmo","Nico Williams","Ferran Torres","Álvaro Morata","Mikel Oyarzabal"],
  "CPV": ["Team Logo","Vozinha","Logan Costa","Pico","Diney","Steven Moreira","Wagner Pina","Joao Paulo","Yannick Semedo","Kevin Pina","Patrick Andrade","Jamiro Monteiro","Team Photo","Deroy Duarte","Garry Rodrigues","Jovane Cabral","Ryan Mendes","Dailon Livramento","Willy Semedo","Bebe"],
  "KSA": ["Team Logo","Nawaf Alaqidi","Abdulrahman Al-Sanbi","Saud Abdulhamid","Nawaf Bouwashl","Jihad Thakri","Moteb Al-Harbi","Hassan Altambakti","Musab Aljuwayr","Ziyad Aljohani","Abdullah Alkhaibari","Nasser Aldawsari","Team Photo","Saleh Abu Alshamat","Marwan Alsahafi","Salem Aldawsari","Abdulrahman Al-Aboud","Feras Akbrikan","Saleh Alshehri","Abdullah Al-Hamdan"],
  "URU": ["Team Logo","Sergio Rochet","Santiago Mele","Ronald Araujo","José María Giménez","Sebastian Caceres","Mathias Olivera","Guillermo Varela","Nahitan Nandez","Federico Valverde","Giorgian De Arrascaeta","Rodrigo Bentancur","Team Photo","Manuel Ugarte","Nicolás de la Cruz","Maxi Araujo","Darwin Núñez","Federico Viñas","Rodrigo Aguirre","Facundo Pellistri"],
  "FRA": ["Team Logo","Mike Maignan","Theo Hernandez","William Saliba","Jules Kounde","Ibrahima Konate","Dayot Upamecano","Lucas Digne","Aurélien Tchouaméni","Eduardo Camavinga","Manu Kone","Adrien Rabiot","Team Photo","Michael Olise","Ousmane Dembele","Bradley Barcola","Désiré Doué","Kingsley Coman","Hugo Ekitike","Kylian Mbappe"],
  "SEN": ["Team Logo","Edouard Mendy","Yehvann Diouf","Moussa Niakhaté","Abdoulaye Seck","Ismail Jakobs","El Hadji Malick Diouf","Kalidou Koulibaly","Idrissa Gana Gueye","Pape Matar Sarr","Pape Gueye","Habib Diarra","Team Photo","Lamine Camara","Sadio Mane","Ismaïla Sarr","Boulaye Dia","Iliman Ndiaye","Nicolas Jackson","Krepin Diatta"],
  "IRQ": ["Team Logo","Jalal Hassan","Rebin Sulaka","Hussein Ali","Akam Hashem","Merchas Doski","Zaid Tahseen","Manaf Younis","Zidane Iqbal","Amir Al-Ammari","Ibrahim Bavesh","Ali Jasim","Team Photo","Youssef Amyn","Aimar Sher","Marko Farji","Osama Rashid","Ali Al-Hamadi","Aymen Hussein","Mohanad Ali"],
  "NOR": ["Team Logo","Orjan Nyland","Julian Ryerson","Leo Ostigård","Kristoffer Vassbakk Ajer","Marcus Holmgren Pedersen","David Møller Wolfe","Torbjørn Heggem","Morten Thorsby","Martin Ødegaard","Sander Berge","Andreas Schjelderup","Team Photo","Patrick Berg","Erling Haaland","Alexander Sørloth","Aron Dønnum","Jorgen Strand Larsen","Antonio Nusa","Oscar Bobb"],
  "ARG": ["Team Logo","Emiliano Martinez","Nahuel Molina","Cristian Romero","Nicolas Otamendi","Nicolas Tagliafico","Leonardo Balerdi","Enzo Fernandez","Alexis Mac Allister","Rodrigo De Paul","Exequiel Palacios","Leandro Paredes","Team Photo","Nico Paz","Franco Mastantuono","Nico Gonzalez","Lionel Messi","Lautaro Martinez","Julian Alvarez","Giuliano Simeone"],
  "ALG": ["Team Logo","Alexis Guendouz","Ramy Bensebaini","Youcef Atal","Rayan Aït-Nouri","Mohamed Amine Tougai","Aïssa Mandi","Ismael Bennacer","Houssem Aquar","Hicham Boudaoui","Ramiz Zerrouki","Nabil Bentalab","Team Photo","Farés Chaibi","Riyad Mahrez","Said Benrahma","Anis Hadj Moussa","Amine Gouiri","Baghdad Bounedjah","Mohammed Amoura"],
  "AUT": ["Team Logo","Alexander Schlager","Patrick Pentz","David Alaba","Kevin Danso","Philipp Lienhart","Stefan Posch","Phillipp Mwene","Alexander Prass","Xaver Schlager","Marcel Sabitzer","Konrad Laimer","Team Photo","Florian Grillitsch","Nicolas Seiwald","Romano Schmid","Patrick Wimmer","Christoph Baumgartner","Michael Gregoritsch","Marko Arnautović"],
  "JOR": ["Team Logo","Yazeed Abulaila","Ihsan Haddad","Mohammad Abu Hashish","Yazan Al-Arab","Abdallah Nasib","Saleem Obaid","Mohammad Abualnadi","Ibrahim Saadeh","Nizar Al-Rashdan","Noor Al-Rawabdeh","Mohannad Abu Taha","Team Photo","Amer Jamous","Musa Al-Taamari","Yazan Al-Naimat","Mahmoud Al-Mardi","Ali Olwan","Mohammad Abu Zrayq","Ibrahim Sabra"],
  "POR": ["Team Logo","Diogo Costa","Jose Sa","Ruben Dias","João Cancelo","Diogo Dalot","Nuno Mendes","Gonçalo Inácio","Bernardo Silva","Bruno Fernandes","Ruben Neves","Vitinha","Team Photo","João Neves","Cristiano Ronaldo","Francisco Trincao","João Felix","Gonçalo Ramos","Pedro Neto","Rafael Leão"],
  "COD": ["Team Logo","Lionel Mpasi","Aaron Wan-Bissaka","Axel Tuanzebe","Arthur Masuaku","Chancel Mbemba","Ngal'ayel Mukau","Samuel Moutoussamy","Noah Sadiki","Théo Bongonda","Yoane Wissa","Cédric Bakambu","Team Photo","Donatien Masuaku","Meschack Elia","Silas Katompa Mvumpa","Cédric Itten","Gael Kakuta","Jonathan David","Wissa"],
  "UZB": ["Team Logo","Utkir Yusupov","Abdukodir Khusanov","Farrukh Sayfiev","Dostonbek Khamdamov","Eldor Shomurodov","Jaloliddin Masharipov","Otabek Shukurov","Azizbek Turgunboev","Islom Tukhtahujaev","Jasurbek Yakhshiboev","Akbar Turgunboev","Team Photo","Muzaffar Muminov","Khojiakbar Alijonov","Otabek Turgunboev","Jamshid Iskanderov","Husan Kholmatov","Bunyod Abdullayev","Odil Ahmedov"],
  "COL": ["Team Logo","Camilo Vargas","David Ospina","Santiago Arias","Jhon Lucumi","Davinson Sanchez","Daniel Munoz","Yerry Mina","Carlos Cuesta","Richard Rios","Jefferson Lerma","Wilmar Barrios","Team Photo","Juan Cuadrado","James Rodriguez","Luis Diaz","Jhon Cordoba","Rafael Santos Borre","Falcao","Jhon Duran"],
  "ENG": ["Team Logo","Jordan Pickford","John Stones","Marc Guehi","Ezri Konsa","Trent Alexander-Arnold","Reece James","Dan Burn","Jordan Henderson","Declan Rice","Jude Bellingham","Cole Palmer","Team Photo","Morgan Rogers","Anthony Gordon","Phil Foden","Bukayo Saka","Harry Kane","Marcus Rashford","Ollie Watkins"],
  "CRO": ["Team Logo","Dominik Livaković","Duje Ćaleta-Car","Joško Gvardiol","Josip Stanišić","Luka Vušković","Josip Šutalo","Kristijan Jakić","Luka Modrić","Mateo Kovačić","Martin Baturina","Lovro Majer","Team Photo","Mario Pašalić","Petar Sučić","Ivan Perišić","Marco Pašalić","Ante Budimir","Andrej Kramarić","Franjo Ivanović"],
  "GHA": ["Team Logo","Richard Ofori","Abdul Manaf Nurudeen","Daniel Amartey","Alexander Djiku","Tariq Lamptey","Abdul Rahman Baba","Gideon Mensah","Alidu Seidu","Thomas Partey","Salis Abdul Samed","Mohammed Kudus","Team Photo","Antoine Semenyo","Ernest Nuamah","Kamaldeen Sulemana","Issahaku Abdul Fatawu","Inaki Williams","Jordan Ayew","Andre Ayew"],
  "PAN": ["Team Logo","Luis Mejia","Orlando Mosquera","Eric Davis","Fidel Escobar","Michael Murillo","Andres Andrade","Jose Cordoba","Cesar Blackman","Adalberto Carrasquilla","Aníbal Godoy","Edgar Barcenas","Team Photo","Ismael Díaz","José Luiz Rodriguez","Alberto Quintero","Cerdigo Waterman","Edgardo Fariña","Rolando Blackburn","Jose Fajardo"],
};
const MATCHES = [
  {n:1,r:"Matchday 1",u:"2026-06-11T19:00:00Z",t1:"MEX",t2:"RSA",g:"A",v:"Mexico City"},
  {n:2,r:"Matchday 1",u:"2026-06-12T02:00:00Z",t1:"KOR",t2:"CZE",g:"A",v:"Guadalajara (Zapopan)"},
  {n:3,r:"Matchday 8",u:"2026-06-18T16:00:00Z",t1:"CZE",t2:"RSA",g:"A",v:"Atlanta"},
  {n:4,r:"Matchday 8",u:"2026-06-19T01:00:00Z",t1:"MEX",t2:"KOR",g:"A",v:"Guadalajara (Zapopan)"},
  {n:5,r:"Matchday 14",u:"2026-06-25T01:00:00Z",t1:"CZE",t2:"MEX",g:"A",v:"Mexico City"},
  {n:6,r:"Matchday 14",u:"2026-06-25T01:00:00Z",t1:"RSA",t2:"KOR",g:"A",v:"Monterrey (Guadalupe)"},
  {n:7,r:"Matchday 2",u:"2026-06-12T19:00:00Z",t1:"CAN",t2:"BIH",g:"B",v:"Toronto"},
  {n:8,r:"Matchday 3",u:"2026-06-13T19:00:00Z",t1:"QAT",t2:"SUI",g:"B",v:"San Francisco Bay Area (Santa Clara)"},
  {n:9,r:"Matchday 8",u:"2026-06-18T19:00:00Z",t1:"SUI",t2:"BIH",g:"B",v:"Los Angeles (Inglewood)"},
  {n:10,r:"Matchday 8",u:"2026-06-18T22:00:00Z",t1:"CAN",t2:"QAT",g:"B",v:"Vancouver"},
  {n:11,r:"Matchday 14",u:"2026-06-24T19:00:00Z",t1:"SUI",t2:"CAN",g:"B",v:"Vancouver"},
  {n:12,r:"Matchday 14",u:"2026-06-24T19:00:00Z",t1:"BIH",t2:"QAT",g:"B",v:"Seattle"},
  {n:13,r:"Matchday 3",u:"2026-06-13T22:00:00Z",t1:"BRA",t2:"MAR",g:"C",v:"New York/New Jersey (East Rutherford)"},
  {n:14,r:"Matchday 3",u:"2026-06-14T01:00:00Z",t1:"HAI",t2:"SCO",g:"C",v:"Boston (Foxborough)"},
  {n:15,r:"Matchday 9",u:"2026-06-19T22:00:00Z",t1:"SCO",t2:"MAR",g:"C",v:"Boston (Foxborough)"},
  {n:16,r:"Matchday 9",u:"2026-06-20T01:00:00Z",t1:"BRA",t2:"HAI",g:"C",v:"Philadelphia"},
  {n:17,r:"Matchday 14",u:"2026-06-24T22:00:00Z",t1:"SCO",t2:"BRA",g:"C",v:"Miami (Miami Gardens)"},
  {n:18,r:"Matchday 14",u:"2026-06-24T22:00:00Z",t1:"MAR",t2:"HAI",g:"C",v:"Atlanta"},
  {n:19,r:"Matchday 2",u:"2026-06-13T01:00:00Z",t1:"USA",t2:"PAR",g:"D",v:"Los Angeles (Inglewood)"},
  {n:20,r:"Matchday 3",u:"2026-06-14T04:00:00Z",t1:"AUS",t2:"TUR",g:"D",v:"Vancouver"},
  {n:21,r:"Matchday 9",u:"2026-06-19T19:00:00Z",t1:"USA",t2:"AUS",g:"D",v:"Seattle"},
  {n:22,r:"Matchday 9",u:"2026-06-20T04:00:00Z",t1:"TUR",t2:"PAR",g:"D",v:"San Francisco Bay Area (Santa Clara)"},
  {n:23,r:"Matchday 15",u:"2026-06-26T02:00:00Z",t1:"TUR",t2:"USA",g:"D",v:"Los Angeles (Inglewood)"},
  {n:24,r:"Matchday 15",u:"2026-06-26T02:00:00Z",t1:"PAR",t2:"AUS",g:"D",v:"San Francisco Bay Area (Santa Clara)"},
  {n:25,r:"Matchday 4",u:"2026-06-14T17:00:00Z",t1:"GER",t2:"CUW",g:"E",v:"Houston"},
  {n:26,r:"Matchday 4",u:"2026-06-14T23:00:00Z",t1:"CIV",t2:"ECU",g:"E",v:"Philadelphia"},
  {n:27,r:"Matchday 10",u:"2026-06-20T20:00:00Z",t1:"GER",t2:"CIV",g:"E",v:"Toronto"},
  {n:28,r:"Matchday 10",u:"2026-06-21T00:00:00Z",t1:"ECU",t2:"CUW",g:"E",v:"Kansas City"},
  {n:29,r:"Matchday 15",u:"2026-06-25T20:00:00Z",t1:"CUW",t2:"CIV",g:"E",v:"Philadelphia"},
  {n:30,r:"Matchday 15",u:"2026-06-25T20:00:00Z",t1:"ECU",t2:"GER",g:"E",v:"New York/New Jersey (East Rutherford)"},
  {n:31,r:"Matchday 4",u:"2026-06-14T20:00:00Z",t1:"NED",t2:"JPN",g:"F",v:"Dallas (Arlington)"},
  {n:32,r:"Matchday 4",u:"2026-06-15T02:00:00Z",t1:"SWE",t2:"TUN",g:"F",v:"Monterrey (Guadalupe)"},
  {n:33,r:"Matchday 10",u:"2026-06-20T17:00:00Z",t1:"NED",t2:"SWE",g:"F",v:"Houston"},
  {n:34,r:"Matchday 10",u:"2026-06-21T04:00:00Z",t1:"TUN",t2:"JPN",g:"F",v:"Monterrey (Guadalupe)"},
  {n:35,r:"Matchday 15",u:"2026-06-25T23:00:00Z",t1:"JPN",t2:"SWE",g:"F",v:"Dallas (Arlington)"},
  {n:36,r:"Matchday 15",u:"2026-06-25T23:00:00Z",t1:"TUN",t2:"NED",g:"F",v:"Kansas City"},
  {n:37,r:"Matchday 5",u:"2026-06-15T19:00:00Z",t1:"BEL",t2:"EGY",g:"G",v:"Seattle"},
  {n:38,r:"Matchday 5",u:"2026-06-16T01:00:00Z",t1:"IRN",t2:"NZL",g:"G",v:"Los Angeles (Inglewood)"},
  {n:39,r:"Matchday 11",u:"2026-06-21T19:00:00Z",t1:"BEL",t2:"IRN",g:"G",v:"Los Angeles (Inglewood)"},
  {n:40,r:"Matchday 11",u:"2026-06-22T01:00:00Z",t1:"NZL",t2:"EGY",g:"G",v:"Vancouver"},
  {n:41,r:"Matchday 16",u:"2026-06-27T03:00:00Z",t1:"EGY",t2:"IRN",g:"G",v:"Seattle"},
  {n:42,r:"Matchday 16",u:"2026-06-27T03:00:00Z",t1:"NZL",t2:"BEL",g:"G",v:"Vancouver"},
  {n:43,r:"Matchday 5",u:"2026-06-15T16:00:00Z",t1:"ESP",t2:"CPV",g:"H",v:"Atlanta"},
  {n:44,r:"Matchday 5",u:"2026-06-15T22:00:00Z",t1:"KSA",t2:"URU",g:"H",v:"Miami (Miami Gardens)"},
  {n:45,r:"Matchday 11",u:"2026-06-21T16:00:00Z",t1:"ESP",t2:"KSA",g:"H",v:"Atlanta"},
  {n:46,r:"Matchday 11",u:"2026-06-21T22:00:00Z",t1:"URU",t2:"CPV",g:"H",v:"Miami (Miami Gardens)"},
  {n:47,r:"Matchday 16",u:"2026-06-27T00:00:00Z",t1:"CPV",t2:"KSA",g:"H",v:"Houston"},
  {n:48,r:"Matchday 16",u:"2026-06-27T00:00:00Z",t1:"URU",t2:"ESP",g:"H",v:"Guadalajara (Zapopan)"},
  {n:49,r:"Matchday 6",u:"2026-06-16T19:00:00Z",t1:"FRA",t2:"SEN",g:"I",v:"New York/New Jersey (East Rutherford)"},
  {n:50,r:"Matchday 6",u:"2026-06-16T22:00:00Z",t1:"IRQ",t2:"NOR",g:"I",v:"Boston (Foxborough)"},
  {n:51,r:"Matchday 12",u:"2026-06-22T21:00:00Z",t1:"FRA",t2:"IRQ",g:"I",v:"Philadelphia"},
  {n:52,r:"Matchday 12",u:"2026-06-23T00:00:00Z",t1:"NOR",t2:"SEN",g:"I",v:"New York/New Jersey (East Rutherford)"},
  {n:53,r:"Matchday 16",u:"2026-06-26T19:00:00Z",t1:"NOR",t2:"FRA",g:"I",v:"Boston (Foxborough)"},
  {n:54,r:"Matchday 16",u:"2026-06-26T19:00:00Z",t1:"SEN",t2:"IRQ",g:"I",v:"Toronto"},
  {n:55,r:"Matchday 6",u:"2026-06-17T01:00:00Z",t1:"ARG",t2:"ALG",g:"J",v:"Kansas City"},
  {n:56,r:"Matchday 6",u:"2026-06-17T04:00:00Z",t1:"AUT",t2:"JOR",g:"J",v:"San Francisco Bay Area (Santa Clara)"},
  {n:57,r:"Matchday 12",u:"2026-06-22T17:00:00Z",t1:"ARG",t2:"AUT",g:"J",v:"Dallas (Arlington)"},
  {n:58,r:"Matchday 12",u:"2026-06-23T03:00:00Z",t1:"JOR",t2:"ALG",g:"J",v:"San Francisco Bay Area (Santa Clara)"},
  {n:59,r:"Matchday 17",u:"2026-06-28T02:00:00Z",t1:"ALG",t2:"AUT",g:"J",v:"Kansas City"},
  {n:60,r:"Matchday 17",u:"2026-06-28T02:00:00Z",t1:"JOR",t2:"ARG",g:"J",v:"Dallas (Arlington)"},
  {n:61,r:"Matchday 7",u:"2026-06-17T17:00:00Z",t1:"POR",t2:"COD",g:"K",v:"Houston"},
  {n:62,r:"Matchday 7",u:"2026-06-18T02:00:00Z",t1:"UZB",t2:"COL",g:"K",v:"Mexico City"},
  {n:63,r:"Matchday 13",u:"2026-06-23T17:00:00Z",t1:"POR",t2:"UZB",g:"K",v:"Houston"},
  {n:64,r:"Matchday 13",u:"2026-06-24T02:00:00Z",t1:"COL",t2:"COD",g:"K",v:"Guadalajara (Zapopan)"},
  {n:65,r:"Matchday 17",u:"2026-06-27T23:30:00Z",t1:"COL",t2:"POR",g:"K",v:"Miami (Miami Gardens)"},
  {n:66,r:"Matchday 17",u:"2026-06-27T23:30:00Z",t1:"COD",t2:"UZB",g:"K",v:"Atlanta"},
  {n:67,r:"Matchday 7",u:"2026-06-17T20:00:00Z",t1:"ENG",t2:"CRO",g:"L",v:"Dallas (Arlington)"},
  {n:68,r:"Matchday 7",u:"2026-06-17T23:00:00Z",t1:"GHA",t2:"PAN",g:"L",v:"Toronto"},
  {n:69,r:"Matchday 13",u:"2026-06-23T20:00:00Z",t1:"ENG",t2:"GHA",g:"L",v:"Boston (Foxborough)"},
  {n:70,r:"Matchday 13",u:"2026-06-23T23:00:00Z",t1:"PAN",t2:"CRO",g:"L",v:"Toronto"},
  {n:71,r:"Matchday 17",u:"2026-06-27T21:00:00Z",t1:"PAN",t2:"ENG",g:"L",v:"New York/New Jersey (East Rutherford)"},
  {n:72,r:"Matchday 17",u:"2026-06-27T21:00:00Z",t1:"CRO",t2:"GHA",g:"L",v:"Philadelphia"},
  {n:73,r:"Round of 32",u:"2026-06-28T19:00:00Z",t1:"2A",t2:"2B",g:"",v:"Los Angeles (Inglewood)"},
  {n:74,r:"Round of 32",u:"2026-06-29T20:30:00Z",t1:"1E",t2:"3A/B/C/D/F",g:"",v:"Boston (Foxborough)"},
  {n:75,r:"Round of 32",u:"2026-06-30T01:00:00Z",t1:"1F",t2:"2C",g:"",v:"Monterrey (Guadalupe)"},
  {n:76,r:"Round of 32",u:"2026-06-29T17:00:00Z",t1:"1C",t2:"2F",g:"",v:"Houston"},
  {n:77,r:"Round of 32",u:"2026-06-30T21:00:00Z",t1:"1I",t2:"3C/D/F/G/H",g:"",v:"New York/New Jersey (East Rutherford)"},
  {n:78,r:"Round of 32",u:"2026-06-30T17:00:00Z",t1:"2E",t2:"2I",g:"",v:"Dallas (Arlington)"},
  {n:79,r:"Round of 32",u:"2026-07-01T01:00:00Z",t1:"1A",t2:"3C/E/F/H/I",g:"",v:"Mexico City"},
  {n:80,r:"Round of 32",u:"2026-07-01T16:00:00Z",t1:"1L",t2:"3E/H/I/J/K",g:"",v:"Atlanta"},
  {n:81,r:"Round of 32",u:"2026-07-02T00:00:00Z",t1:"1D",t2:"3B/E/F/I/J",g:"",v:"San Francisco Bay Area (Santa Clara)"},
  {n:82,r:"Round of 32",u:"2026-07-01T20:00:00Z",t1:"1G",t2:"3A/E/H/I/J",g:"",v:"Seattle"},
  {n:83,r:"Round of 32",u:"2026-07-02T23:00:00Z",t1:"2K",t2:"2L",g:"",v:"Toronto"},
  {n:84,r:"Round of 32",u:"2026-07-02T19:00:00Z",t1:"1H",t2:"2J",g:"",v:"Los Angeles (Inglewood)"},
  {n:85,r:"Round of 32",u:"2026-07-03T03:00:00Z",t1:"1B",t2:"3E/F/G/I/J",g:"",v:"Vancouver"},
  {n:86,r:"Round of 32",u:"2026-07-03T22:00:00Z",t1:"1J",t2:"2H",g:"",v:"Miami (Miami Gardens)"},
  {n:87,r:"Round of 32",u:"2026-07-04T01:30:00Z",t1:"1K",t2:"3D/E/I/J/L",g:"",v:"Kansas City"},
  {n:88,r:"Round of 32",u:"2026-07-03T18:00:00Z",t1:"2D",t2:"2G",g:"",v:"Dallas (Arlington)"},
  {n:89,r:"Round of 16",u:"2026-07-04T21:00:00Z",t1:"W74",t2:"W77",g:"",v:"Philadelphia"},
  {n:90,r:"Round of 16",u:"2026-07-04T17:00:00Z",t1:"W73",t2:"W75",g:"",v:"Houston"},
  {n:91,r:"Round of 16",u:"2026-07-05T20:00:00Z",t1:"W76",t2:"W78",g:"",v:"New York/New Jersey (East Rutherford)"},
  {n:92,r:"Round of 16",u:"2026-07-06T00:00:00Z",t1:"W79",t2:"W80",g:"",v:"Mexico City"},
  {n:93,r:"Round of 16",u:"2026-07-06T19:00:00Z",t1:"W83",t2:"W84",g:"",v:"Dallas (Arlington)"},
  {n:94,r:"Round of 16",u:"2026-07-07T00:00:00Z",t1:"W81",t2:"W82",g:"",v:"Seattle"},
  {n:95,r:"Round of 16",u:"2026-07-07T16:00:00Z",t1:"W86",t2:"W88",g:"",v:"Atlanta"},
  {n:96,r:"Round of 16",u:"2026-07-07T20:00:00Z",t1:"W85",t2:"W87",g:"",v:"Vancouver"},
  {n:97,r:"Quarter-final",u:"2026-07-09T20:00:00Z",t1:"W89",t2:"W90",g:"",v:"Boston (Foxborough)"},
  {n:98,r:"Quarter-final",u:"2026-07-10T19:00:00Z",t1:"W93",t2:"W94",g:"",v:"Los Angeles (Inglewood)"},
  {n:99,r:"Quarter-final",u:"2026-07-11T21:00:00Z",t1:"W91",t2:"W92",g:"",v:"Miami (Miami Gardens)"},
  {n:100,r:"Quarter-final",u:"2026-07-12T01:00:00Z",t1:"W95",t2:"W96",g:"",v:"Kansas City"},
  {n:101,r:"Semi-final",u:"2026-07-14T19:00:00Z",t1:"W97",t2:"W98",g:"",v:"Dallas (Arlington)"},
  {n:102,r:"Semi-final",u:"2026-07-15T19:00:00Z",t1:"W99",t2:"W100",g:"",v:"Atlanta"},
  {n:103,r:"Match for third place",u:"2026-07-18T21:00:00Z",t1:"L101",t2:"L102",g:"",v:"Miami (Miami Gardens)"},
  {n:104,r:"Final",u:"2026-07-19T19:00:00Z",t1:"W101",t2:"W102",g:"",v:"New York/New Jersey (East Rutherford)"}
];

// Readable labels for knockout-stage placeholder codes
const KNOCKOUT_LABEL = {
  "1A":"1st A","1B":"1st B","1C":"1st C","1D":"1st D","1E":"1st E","1F":"1st F","1G":"1st G","1H":"1st H","1I":"1st I","1J":"1st J","1K":"1st K","1L":"1st L",
  "2A":"2nd A","2B":"2nd B","2C":"2nd C","2D":"2nd D","2E":"2nd E","2F":"2nd F","2G":"2nd G","2H":"2nd H","2I":"2nd I","2J":"2nd J","2K":"2nd K","2L":"2nd L",
};
function matchLabel(code, t) {
  if (KNOCKOUT_LABEL[code]) return KNOCKOUT_LABEL[code];
  if (code.startsWith("W")) return `${t("winner")} M${code.slice(1)}`;
  if (code.startsWith("L")) return `${t("loser")} M${code.slice(1)}`;
  if (code.includes("/")) return `3rd ${code}`;
  return code;
}

const TEAM_TOTAL = 20;
const STORAGE_KEY = "copa2026_stickers_v3";
const PROMISED_KEY = "copa2026_promised";

const INIT_STATE = () => {
  const s = { special: Array(SPECIAL.length).fill(0) };
  TEAMS.forEach(t => { s[t.code] = Array(TEAM_TOTAL).fill(0); });
  return s;
};

function loadStickers() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      const full = INIT_STATE();
      if (parsed.special) full.special = parsed.special;
      TEAMS.forEach(t => { if (parsed[t.code]) full[t.code] = parsed[t.code]; });
      return full;
    }
  } catch (e) {}
  return INIT_STATE();
}

function getStats(stickers) {
  let have = 0, dup = 0, miss = 0;
  stickers.special.forEach(s => { if (s === 1) have++; else if (s === 2) dup++; else miss++; });
  TEAMS.forEach(t => stickers[t.code].forEach(s => { if (s === 1) have++; else if (s === 2) dup++; else miss++; }));
  return { have, dup, miss, total: SPECIAL.length + TEAMS.length * TEAM_TOTAL };
}

function buildShareText(stickers, promised = {}) {
  const repeated = [], missing = [];
  const specRep = [], specMis = [];
  stickers.special.forEach((s, i) => {
    if (s === 2) specRep.push(SPECIAL[i].code);
    if (s === 0) specMis.push(SPECIAL[i].code);
  });
  if (specRep.length) repeated.push(`Special: ${specRep.join(", ")}`);
  if (specMis.length) missing.push(`Special: ${specMis.join(", ")}`);
  TEAMS.forEach(t => {
    const rep = [], mis = [];
    stickers[t.code].forEach((s, i) => {
      if (s === 2 && !promised[`${t.code}-${i}`]) rep.push(i + 1);
      if (s === 0) mis.push(i + 1);
    });
    if (rep.length) repeated.push(`${t.flag} ${t.code}: ${rep.join(", ")}`);
    if (mis.length) missing.push(`${t.flag} ${t.code}: ${mis.join(", ")}`);
  });
  const stats = getStats(stickers);
  const pct = Math.round((stats.have + stats.dup) / stats.total * 100);
  return [
    `⚽ World Cup 2026 Stickers — ${pct}% complete`,
    `✅ ${stats.have} have  |  🔁 ${stats.dup} duplicates  |  ❌ ${stats.miss} missing`,
    "",
    repeated.length ? `🔁 DUPLICATES (available to trade):\n${repeated.join("\n")}` : "🔁 No duplicates yet",
    "",
    missing.length ? `❌ MISSING:\n${missing.join("\n")}` : "❌ Album complete! 🏆",
  ].join("\n");
}

const css = `
  @keyframes stickerPop {
    0% { transform: scale(1); }
    40% { transform: scale(1.18) rotate(-2deg); }
    70% { transform: scale(0.95) rotate(1deg); }
    100% { transform: scale(1) rotate(0deg); }
  }
  @keyframes splashIn {
    0% { opacity: 0; transform: scale(0.92); }
    100% { opacity: 1; transform: scale(1); }
  }
  .sticker-pop { animation: stickerPop 0.35s cubic-bezier(.36,.07,.19,.97); }
  * { -webkit-tap-highlight-color: transparent; box-sizing: border-box; }
  body { margin: 0; background: #0a1f0f; }
`;
const styleEl = document.createElement("style");
styleEl.textContent = css;
document.head.appendChild(styleEl);

// ─── Sticker Card (team) ──────────────────────────────────────────────────────
function StickerCard({ team, stickers, onClick, t }) {
  const haveCount = stickers.filter(s => s >= 1).length;
  const dupCount = stickers.filter(s => s === 2).length;
  const isComplete = haveCount === TEAM_TOTAL;
  const pct = Math.round(haveCount / TEAM_TOTAL * 100);

  return (
    <button onClick={onClick} style={{
      background: "#1e3a2a",
      border: "none",
      borderRadius: 10,
      overflow: "hidden",
      cursor: "pointer",
      padding: 0,
      boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
      transform: "translateZ(0)",
      transition: "box-shadow 0.2s, transform 0.15s",
    }}>
      {/* Color strip — status only */}
      <div style={{
        background: "#2d6e47",
        height: 7,
      }} />

      {/* Card body */}
      <div style={{ padding: "8px 10px 10px", position: "relative", textAlign: "left" }}>
        {/* Code badge top-right */}
        <div style={{
          position: "absolute", top: 8, right: 8,
          background: "rgba(255,255,255,0.12)",
          color: "rgba(255,255,255,0.6)",
          fontFamily: "'Black Han Sans', sans-serif",
          fontSize: 9,
          padding: "1px 5px",
          borderRadius: 4,
          letterSpacing: 0.5,
        }}>{team.code}</div>

        {/* Flag */}
        <div style={{ fontSize: 24, lineHeight: 1, marginBottom: 4, textAlign: "left" }}>{team.flag}</div>

        {/* Team name */}
        <div style={{
          fontFamily: "'Black Han Sans', sans-serif",
          fontSize: 11,
          color: "#f5f0e8",
          lineHeight: 1.2,
          marginBottom: 5,
          paddingRight: 28,
          textAlign: "left",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}>{team.name}</div>

        {/* Progress */}
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <div style={{ flex: 1, height: 3, background: "rgba(255,255,255,0.12)", borderRadius: 3, overflow: "hidden" }}>
            <div style={{
              height: "100%", width: `${pct}%`,
              background: isComplete ? "#27ae60" : "#f5c842",
              borderRadius: 3, transition: "width 0.3s",
            }} />
          </div>
          <span style={{ fontSize: 9, color: "rgba(255,255,255,0.45)", fontWeight: 700, minWidth: 24 }}>{haveCount}/20</span>
        </div>

        <div style={{ marginTop: 4, fontSize: 9, fontWeight: 800, height: 13 }}>
          {dupCount > 0 && <span style={{ color: "#f5a623", display: "flex", alignItems: "center", gap: 3, fontSize: 10 }}><Repeat2 size={10} strokeWidth={2} /> {dupCount} {dupCount > 1 ? t("dups") : t("dup")}</span>}
          {isComplete && <span style={{ color: "#27ae60" }}>✓ Complete</span>}
        </div>
      </div>
    </button>
  );
}

// ─── Team Modal ───────────────────────────────────────────────────────────────
function TeamModal({ team, stickers, onToggle, onClose, onPrev, onNext, hasPrev, hasNext, promised, onPromise, t }) {
  const [poppingIdx, setPoppingIdx] = useState(null);
  const [promptIdx, setPromptIdx] = useState(null);
  const [promptName, setPromptName] = useState("");

  function handleTap(idx) {
    setPoppingIdx(idx);
    onToggle(idx);
    // If cycling away from dup (2→0), clear any promise
    if (stickers[idx] === 2) {
      onPromise(`${team.code}-${idx}`, null);
    }
    setTimeout(() => setPoppingIdx(null), 400);
  }

  function handlePromiseIcon(e, idx) {
    e.stopPropagation();
    setPromptIdx(idx);
    setPromptName(promised[`${team.code}-${idx}`] || "");
  }

  function handlePromiseSave() {
    onPromise(`${team.code}-${promptIdx}`, promptName.trim() || null);
    setPromptIdx(null);
    setPromptName("");
  }

  const collected = stickers.filter(s => s >= 1).length;
  const dups = stickers.filter(s => s === 2).length;

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)",
      display: "flex", alignItems: "flex-end", justifyContent: "center",
      zIndex: 100,
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "#0a1f0f", borderRadius: "20px 20px 0 0", width: "100%", maxWidth: 560,
        maxHeight: "90vh", display: "flex", flexDirection: "column",
        boxShadow: "0 -8px 40px rgba(0,0,0,0.6)",
      }}>
        {/* Header */}
        <div style={{ padding: "16px 16px 12px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 36 }}>{team.flag}</span>
            <div>
              <div style={{ fontFamily: "'Black Han Sans', sans-serif", color: "#f5f0e8", fontSize: 20 }}>{team.name}</div>
              <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 12 }}>
                {collected}/20 {t("collected")}
                {dups > 0 && <span style={{ color: "#f5a623", marginLeft: 8, display: "inline-flex", alignItems: "center", gap: 3 }}><Repeat2 size={11} strokeWidth={2} /> {dups} {dups > 1 ? t("dups") : t("dup")}</span>}
              </div>
            </div>
          </div>
          <button onClick={onClose} style={{
            background: "rgba(255,255,255,0.1)", border: "none", color: "#fff",
            borderRadius: "50%", width: 32, height: 32, padding: 0, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          }}><X size={16} strokeWidth={2.5} /></button>
        </div>

        {/* Legend */}
        <div style={{ display: "flex", gap: 14, padding: "0 16px 12px", flexShrink: 0, flexWrap: "wrap" }}>
          {[
            { bg: "rgba(255,255,255,0.06)", border: "rgba(255,255,255,0.12)", label: t("legendMissing") },
            { bg: "rgba(39,174,96,0.25)", border: "#27ae60", label: t("legendHave") },
            { bg: "rgba(245,166,35,0.25)", border: "#f5a623", label: t("legendDuplicate") },
            { bg: "rgba(155,89,182,0.2)", border: "#9b59b6", label: t("legendPromised") },
          ].map(l => (
            <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 12, height: 12, borderRadius: 3, background: l.bg, border: `1.5px solid ${l.border}` }} />
              <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>{l.label}</span>
            </div>
          ))}
        </div>

        {/* Sticker grid — large cards */}
        <div style={{ overflowY: "auto", padding: "0 12px 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
            {stickers.map((state, idx) => {
              const n = idx + 1;
              const promisedTo = promised[`${team.code}-${idx}`];
              const isPromised = state === 2 && promisedTo;
              let bg, border, textCol, badge;
              if (state === 0) { bg = "rgba(255,255,255,0.05)"; border = "rgba(255,255,255,0.1)"; textCol = "rgba(255,255,255,0.25)"; badge = null; }
              else if (state === 1) { bg = "rgba(39,174,96,0.15)"; border = "#27ae60"; textCol = "#27ae60"; badge = "x1"; }
              else if (isPromised) { bg = "rgba(155,89,182,0.2)"; border = "#9b59b6"; textCol = "#c39bd3"; badge = null; }
              else { bg = "rgba(245,166,35,0.15)"; border = "#f5a623"; textCol = "#f5a623"; badge = "x2"; }

              // Inline prompt
              if (promptIdx === idx) {
                return (
                  <div key={n} style={{
                    background: "rgba(155,89,182,0.15)", border: "2px solid #9b59b6",
                    borderRadius: 12, padding: "10px 8px",
                    display: "flex", flexDirection: "column", gap: 6, minHeight: 110,
                    alignItems: "center",
                  }}>
                    <span style={{ color: "#c39bd3", fontSize: 9, fontWeight: 800, fontFamily: "monospace", alignSelf: "flex-start" }}>{team.code} {n}</span>
                    <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 9 }}>{t("promisedTo")}</span>
                    <input
                      autoFocus
                      value={promptName}
                      onChange={e => setPromptName(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && handlePromiseSave()}
                      placeholder={t("namePlaceholder")}
                      style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 6, padding: "4px 6px", color: "#fff", fontSize: 16, outline: "none", width: "100%", boxSizing: "border-box" }}
                    />
                    <div style={{ display: "flex", gap: 4, width: "100%" }}>
                      <button onClick={handlePromiseSave} style={{ flex: 1, background: "#9b59b6", border: "none", borderRadius: 6, color: "#fff", fontSize: 10, fontWeight: 700, padding: "4px 0", cursor: "pointer" }}>{t("save")}</button>
                      <button onClick={() => { setPromptIdx(null); }} style={{ flex: 1, background: "rgba(255,255,255,0.08)", border: "none", borderRadius: 6, color: "rgba(255,255,255,0.5)", fontSize: 10, padding: "4px 0", cursor: "pointer" }}>{t("cancel")}</button>
                    </div>
                  </div>
                );
              }

              return (
                <button
                  key={n}
                  onClick={() => handleTap(idx)}
                  className={poppingIdx === idx ? "sticker-pop" : ""}
                  style={{
                    background: bg, border: `2px solid ${border}`,
                    borderRadius: 12, padding: "18px 8px 12px", cursor: "pointer",
                    display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
                    position: "relative", minHeight: 110,
                  }}>
                  <span style={{ position: "absolute", top: 7, left: 8, color: textCol, fontSize: 9, fontWeight: 800, fontFamily: "monospace", opacity: 0.8 }}>{team.code} {n}</span>

                  {/* Promise icon — only for duplicates */}
                  {state === 2 && (
                    <button
                      onClick={e => handlePromiseIcon(e, idx)}
                      style={{
                        position: "absolute", top: 5, right: 5,
                        background: isPromised ? "#9b59b6" : "#f5a623",
                        border: "none", borderRadius: 6, width: 24, height: 24,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        cursor: "pointer", padding: 0,
                      }}>
                      {isPromised
                        ? <UserCheck size={14} color="#fff" strokeWidth={2} />
                        : <UserPlus size={14} color="#0a1f0f" strokeWidth={2} />
                      }
                    </button>
                  )}

                  <div style={{ opacity: state === 0 ? 0.15 : 0.85, marginTop: 18, color: state === 0 ? "#fff" : textCol }}>
                    {n === 1 ? <Shield size={30} strokeWidth={1.5} /> : n === 13 ? <Users size={30} strokeWidth={1.5} /> : <User size={30} strokeWidth={1.5} />}
                  </div>

                  <span style={{ color: state === 0 ? "rgba(255,255,255,0.3)" : textCol, fontSize: 11, textAlign: "center", lineHeight: 1.3, padding: "0 2px", wordBreak: "break-word" }}>
                    {(PLAYERS[team.code] && PLAYERS[team.code][idx]) || ""}
                  </span>

                  {isPromised ? (
                    <div style={{ background: "#9b59b6", color: "#fff", borderRadius: 20, padding: "2px 8px", fontSize: 9, fontWeight: 700, maxWidth: "90%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>→ {promisedTo}</div>
                  ) : badge ? (
                    <div style={{ background: border, color: "#0a1f0f", borderRadius: 20, padding: "2px 8px", fontSize: 10, fontWeight: 800 }}>{badge}</div>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>

        {/* Prev / Next navigation */}
        <div style={{
          display: "flex", justifyContent: "space-between",
          padding: "10px 16px 24px", flexShrink: 0,
          borderTop: "1px solid rgba(255,255,255,0.08)",
        }}>
          <button onClick={onPrev} disabled={!hasPrev} style={{
            background: hasPrev ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.1)", color: hasPrev ? "#f5f0e8" : "rgba(255,255,255,0.2)",
            borderRadius: 10, padding: "10px 20px", cursor: hasPrev ? "pointer" : "default",
            fontFamily: "'Black Han Sans', sans-serif", fontSize: 13,
          }}>← {t("prev")}</button>
          <button onClick={onNext} disabled={!hasNext} style={{
            background: hasNext ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.1)", color: hasNext ? "#f5f0e8" : "rgba(255,255,255,0.2)",
            borderRadius: 10, padding: "10px 20px", cursor: hasNext ? "pointer" : "default",
            fontFamily: "'Black Han Sans', sans-serif", fontSize: 13,
          }}>{t("next")} →</button>
        </div>
      </div>
    </div>
  );
}

// ─── Collection Modal ────────────────────────────────────────────────────────
function CollectionModal({ stickers, promised, onClose, t }) {
  const teamsWithStickers = TEAMS.filter(t => t.stickers
    ? false
    : stickers[t.code].some(s => s >= 1)
  );

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)",
      display: "flex", alignItems: "flex-end", justifyContent: "center",
      zIndex: 100,
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "#0a1f0f", borderRadius: "20px 20px 0 0", width: "100%", maxWidth: 560,
        maxHeight: "90vh", display: "flex", flexDirection: "column",
        boxShadow: "0 -8px 40px rgba(0,0,0,0.6)",
      }}>
        {/* Header */}
        <div style={{ padding: "16px 16px 12px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <div style={{ fontFamily: "'Black Han Sans', sans-serif", color: "#f5f0e8", fontSize: 22 }}>{t("myCollection")} <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 16, fontFamily: "'Inter', sans-serif", fontWeight: 400 }}>({Object.values(stickers).flat().filter(s => s >= 1).length})</span></div>
          <button onClick={onClose} style={{
            background: "rgba(255,255,255,0.1)", border: "none", color: "#fff",
            borderRadius: "50%", width: 32, height: 32, padding: 0, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          }}><X size={16} strokeWidth={2.5} /></button>
        </div>

        {/* Scrollable list */}
        <div style={{ overflowY: "auto", padding: "0 14px 24px" }}>
          {teamsWithStickers.length === 0 ? (
            <div style={{ textAlign: "center", color: "rgba(255,255,255,0.3)", padding: "40px 0", fontSize: 14 }}>
              {t("noStickersYet")}
            </div>
          ) : teamsWithStickers.map(team => {
            const collected = stickers[team.code]
              .map((s, i) => ({ s, i }))
              .filter(({ s }) => s >= 1);

            return (
              <div key={team.code} style={{ marginBottom: 20 }}>
                {/* Team header */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 20 }}>{team.flag}</span>
                    <span style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>{team.name}</span>
                  </div>
                  <span style={{
                    background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)",
                    borderRadius: 20, padding: "2px 10px", fontSize: 11, fontWeight: 600,
                  }}>{collected.length} {t("stickers")}</span>
                </div>

                {/* Sticker cards */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
                  {collected.map(({ s, i }) => {
                    const n = i + 1;
                    const isDup = s === 2;
                    const promisedTo = isDup ? promised[`${team.code}-${i}`] : null;
                    const isPromised = !!promisedTo;
                    const bg = isPromised ? "rgba(155,89,182,0.2)" : isDup ? "rgba(245,166,35,0.15)" : "rgba(39,174,96,0.15)";
                    const border = isPromised ? "#9b59b6" : isDup ? "#f5a623" : "#27ae60";
                    const textCol = isPromised ? "#c39bd3" : isDup ? "#f5a623" : "#27ae60";
                    return (
                      <div key={n} style={{
                        background: bg, border: `2px solid ${border}`,
                        borderRadius: 12, padding: "14px 8px 10px",
                        display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
                        position: "relative", minHeight: 90,
                      }}>
                        <span style={{
                          position: "absolute", top: 7, left: 8,
                          color: textCol, fontSize: 9, fontWeight: 800, fontFamily: "monospace", opacity: 0.8,
                        }}>{team.code} {n}</span>
                        <div style={{ opacity: 0.85, marginTop: 8, color: textCol }}>
                          {n === 1 ? <Shield size={22} strokeWidth={1.5} /> : n === 13 ? <Users size={22} strokeWidth={1.5} /> : <User size={22} strokeWidth={1.5} />}
                        </div>
                        <span style={{
                          color: textCol, fontSize: 11, textAlign: "center",
                          lineHeight: 1.2, padding: "0 4px", wordBreak: "break-word",
                        }}>
                          {(PLAYERS[team.code] && PLAYERS[team.code][i]) || ""}
                        </span>
                        {isPromised ? (
                          <div style={{ background: "#9b59b6", color: "#fff", borderRadius: 20, padding: "2px 8px", fontSize: 9, fontWeight: 700, maxWidth: "90%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>→ {promisedTo}</div>
                        ) : (
                          <div style={{
                            background: border, color: "#0a1f0f",
                            borderRadius: 20, padding: "2px 8px", fontSize: 10, fontWeight: 800,
                          }}>{isDup ? "x2" : "x1"}</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Special Modal ────────────────────────────────────────────────────────────
function SpecialModal({ stickers, onToggle, onClose, t }) {
  const [poppingIdx, setPoppingIdx] = useState(null);

  function handleTap(idx) {
    setPoppingIdx(idx);
    onToggle(idx);
    setTimeout(() => setPoppingIdx(null), 400);
  }

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)",
      display: "flex", alignItems: "flex-end", justifyContent: "center",
      zIndex: 100,
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "#0a1f0f", borderRadius: "20px 20px 0 0", width: "100%", maxWidth: 560,
        maxHeight: "90vh", display: "flex", flexDirection: "column",
        boxShadow: "0 -8px 40px rgba(0,0,0,0.6)",
      }}>
        <div style={{ padding: "16px 16px 12px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <div>
            <div style={{ fontFamily: "'Black Han Sans', sans-serif", color: "#f5f0e8", fontSize: 20 }}>✨ {t("specialStickers")}</div>
            <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 12 }}>
              {stickers.filter(s => s >= 1).length}/{SPECIAL.length} {t("collected")}
            </div>
          </div>
          <button onClick={onClose} style={{
            background: "rgba(255,255,255,0.1)", border: "none", color: "#fff",
            borderRadius: "50%", width: 32, height: 32, padding: 0, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          }}><X size={16} strokeWidth={2.5} /></button>
        </div>

        <div style={{ overflowY: "auto", padding: "0 12px 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
            {SPECIAL.map((sp, idx) => {
              const state = stickers[idx];
              let bg, border, textCol, badge;
              if (state === 0) { bg = "rgba(255,255,255,0.05)"; border = "rgba(255,255,255,0.1)"; textCol = "rgba(255,255,255,0.25)"; badge = null; }
              else if (state === 1) { bg = "rgba(39,174,96,0.15)"; border = "#27ae60"; textCol = "#27ae60"; badge = "x1"; }
              else { bg = "rgba(245,166,35,0.15)"; border = "#f5a623"; textCol = "#f5a623"; badge = "x2"; }

              return (
                <button
                  key={sp.code}
                  onClick={() => handleTap(idx)}
                  className={poppingIdx === idx ? "sticker-pop" : ""}
                  style={{
                    background: bg, border: `2px solid ${border}`,
                    borderRadius: 12, padding: "18px 8px 12px", cursor: "pointer",
                    display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
                    position: "relative", minHeight: 110,
                  }}>
                  {/* Code label top-left */}
                  <span style={{
                    position: "absolute", top: 7, left: 8,
                    color: textCol, fontSize: 9, fontWeight: 800, fontFamily: "monospace", opacity: 0.8,
                  }}>{sp.code}</span>

                  {/* Icon */}
                  <div style={{ opacity: state === 0 ? 0.15 : 0.85, marginTop: 18, color: state === 0 ? "#fff" : textCol }}>
                    <Star size={30} strokeWidth={1.5} />
                  </div>

                  {/* Name */}
                  <span style={{
                    color: state === 0 ? "rgba(255,255,255,0.3)" : textCol,
                    fontSize: 9, textAlign: "center", lineHeight: 1.3,
                    padding: "0 2px", wordBreak: "break-word",
                  }}>{sp.name}</span>

                  {/* Badge */}
                  {badge && (
                    <div style={{
                      background: border, color: "#0a1f0f",
                      borderRadius: 20, padding: "2px 8px", fontSize: 10, fontWeight: 800,
                    }}>{badge}</div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Share Sheet ──────────────────────────────────────────────────────────────
function ShareSheet({ stickers, promised, onClose, t }) {
  const text = buildShareText(stickers, promised);
  const [copied, setCopied] = useState(false);
  function copy() {
    navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  }
  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)",
      display: "flex", alignItems: "flex-end", justifyContent: "center", zIndex: 200, padding: 16,
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "#1e3a2a", borderRadius: 16, width: "100%", maxWidth: 500,
        overflow: "hidden", marginBottom: 8, boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
      }}>
        <div style={{ background: "#0a1f0f", padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontFamily: "'Black Han Sans', sans-serif", color: "#f5c842", fontSize: 16 }}>📤 Share with friends</div>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", borderRadius: 8, width: 32, height: 32, cursor: "pointer", fontSize: 16 }}>✕</button>
        </div>
        <div style={{ padding: 16 }}>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 12, marginBottom: 10 }}>{t("shareCollectionStatus")}</p>
          <textarea readOnly value={text} style={{
            width: "100%", background: "#0f2d1a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8,
            padding: "10px 12px", color: "#f5f0e8", fontSize: 12, fontFamily: "monospace",
            lineHeight: 1.6, resize: "none", outline: "none", height: 220,
          }} />
          <button onClick={copy} style={{
            marginTop: 10, width: "100%",
            background: copied ? "#27ae60" : "#f5c842",
            color: copied ? "#fff" : "#0a1f0f",
            border: "none", borderRadius: 10, padding: "12px 0",
            fontFamily: "'Black Han Sans', sans-serif", fontSize: 16, cursor: "pointer",
          }}>{copied ? "✓ " + t("copied") : "📋 " + t("copyText")}</button>
        </div>
      </div>
    </div>
  );
}

const PACKS_KEY = "copa2026_packs";

function loadPacks() {
  try {
    const saved = localStorage.getItem(PACKS_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {}
  return [];
}

// ─── Packs Modal ──────────────────────────────────────────────────────────────
function PacksModal({ packs, onAdd, onRemove, onClose, t }) {
  const [qty, setQty] = useState("1");
  const [price, setPrice] = useState("1.50");

  const totalPacks = packs.reduce((s, p) => s + p.qty, 0);
  const totalSpent = packs.reduce((s, p) => s + p.qty * p.price, 0);
  const avgPrice = totalPacks > 0 ? totalSpent / totalPacks : 0;

  function handleAdd() {
    const q = parseInt(qty);
    const p = parseFloat(price.replace(",", "."));
    if (!q || q < 1 || !p || p <= 0) return;
    onAdd({ id: Date.now(), qty: q, price: p, date: new Date().toLocaleDateString("en-GB") });
    setQty("1");
    setPrice("1.50");
  }

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)",
      display: "flex", alignItems: "flex-end", justifyContent: "center",
      zIndex: 100,
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "#0a1f0f", borderRadius: "20px 20px 0 0", width: "100%", maxWidth: 560,
        maxHeight: "90vh", display: "flex", flexDirection: "column",
        boxShadow: "0 -8px 40px rgba(0,0,0,0.6)",
      }}>
        {/* Header */}
        <div style={{ padding: "16px 16px 12px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Package size={22} color="#f5f0e8" strokeWidth={1.5} />
            <div style={{ fontFamily: "'Black Han Sans', sans-serif", color: "#f5f0e8", fontSize: 20 }}>{t("packTracker")}</div>
          </div>
          <button onClick={onClose} style={{
            background: "rgba(255,255,255,0.1)", border: "none", color: "#fff",
            borderRadius: "50%", width: 32, height: 32, padding: 0, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          }}><X size={16} strokeWidth={2.5} /></button>
        </div>

        {/* Summary */}
        <div style={{ display: "flex", gap: 8, padding: "0 16px 12px", flexShrink: 0 }}>
          {[
            { label: t("packsLabel"), value: totalPacks },
            { label: t("totalSpent"), value: `€${totalSpent.toFixed(2)}` },
            { label: t("avgPerPack"), value: `€${avgPrice.toFixed(2)}` },
          ].map(s => (
            <div key={s.label} style={{ flex: 1, background: "rgba(255,255,255,0.06)", borderRadius: 10, padding: "10px 6px", textAlign: "center" }}>
              <div style={{ fontFamily: "'Black Han Sans', sans-serif", color: "#f5f0e8", fontSize: 18 }}>{s.value}</div>
              <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 10, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Add purchase */}
        <div style={{ padding: "12px 16px", borderTop: "1px solid rgba(255,255,255,0.08)", borderBottom: "1px solid rgba(255,255,255,0.08)", flexShrink: 0 }}>
          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>{t("addPurchase")}</div>
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ flex: 1 }}>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 10, marginBottom: 4 }}>{t("packsLabel")}</div>
              <input
                type="number" min="1" value={qty}
                onChange={e => setQty(e.target.value)}
                style={{ width: "100%", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, padding: "8px 10px", color: "#fff", fontSize: 16, outline: "none" }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 10, marginBottom: 4 }}>{t("priceEach")}</div>
              <input
                type="number" min="0" step="0.01" value={price}
                onChange={e => setPrice(e.target.value)}
                style={{ width: "100%", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, padding: "8px 10px", color: "#fff", fontSize: 16, outline: "none" }}
              />
            </div>
            <div style={{ display: "flex", alignItems: "flex-end" }}>
              <button onClick={handleAdd} style={{ background: "#f5c842", color: "#0a1f0f", border: "none", borderRadius: 8, padding: "8px 14px", fontFamily: "'Black Han Sans', sans-serif", fontSize: 14, cursor: "pointer" }}>{t("add")}</button>
            </div>
          </div>
        </div>

        {/* History */}
        <div style={{ overflowY: "auto", padding: 12, display: "flex", flexDirection: "column", gap: 6 }}>
          {packs.length === 0 ? (
            <div style={{ textAlign: "center", color: "rgba(255,255,255,0.3)", padding: "24px 0", fontSize: 13 }}>{t("noPurchasesYet")}</div>
          ) : [...packs].reverse().map(p => (
            <div key={p.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255,255,255,0.05)", borderRadius: 10, padding: "10px 12px" }}>
              <div>
                <div style={{ color: "#f5f0e8", fontSize: 13, fontWeight: 700 }}>{p.qty} pack{p.qty > 1 ? "s" : ""} · €{(p.qty * p.price).toFixed(2)}</div>
                <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 11 }}>€{p.price.toFixed(2)} each · {p.date}</div>
              </div>
              <button onClick={() => onRemove(p.id)} style={{ background: "rgba(255,255,255,0.08)", border: "none", color: "rgba(255,255,255,0.4)", borderRadius: 6, width: 28, height: 28, cursor: "pointer", fontSize: 14 }}>✕</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
// ─── Matches Modal ────────────────────────────────────────────────────────────
const MANUAL_SCORES_KEY = "copa2026_manual_scores";

// Teams per group, derived from the official group draw
const GROUP_TEAMS = {
  A: ["MEX", "RSA", "KOR", "CZE"],
  B: ["CAN", "BIH", "QAT", "SUI"],
  C: ["BRA", "MAR", "HAI", "SCO"],
  D: ["USA", "PAR", "AUS", "TUR"],
  E: ["GER", "CUW", "CIV", "ECU"],
  F: ["NED", "JPN", "SWE", "TUN"],
  G: ["BEL", "EGY", "IRN", "NZL"],
  H: ["ESP", "CPV", "KSA", "URU"],
  I: ["FRA", "SEN", "IRQ", "NOR"],
  J: ["ARG", "ALG", "AUT", "JOR"],
  K: ["POR", "COD", "UZB", "COL"],
  L: ["ENG", "CRO", "GHA", "PAN"],
};

// Compute group tables (P/W/D/L/GF/GA/GD/Pts) from user-entered scores
function computeGroupStandings(manualScores) {
  const result = {};
  Object.entries(GROUP_TEAMS).forEach(([g, codes]) => {
    const stats = {};
    codes.forEach(code => { stats[code] = { code, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 }; });
    MATCHES.filter(m => m.g === g).forEach(m => {
      const score = manualScores[m.n];
      if (!score) return;
      const [s1, s2] = score;
      const a = stats[m.t1], b = stats[m.t2];
      a.p++; b.p++;
      a.gf += s1; a.ga += s2;
      b.gf += s2; b.ga += s1;
      if (s1 > s2) { a.w++; a.pts += 3; b.l++; }
      else if (s1 < s2) { b.w++; b.pts += 3; a.l++; }
      else { a.d++; b.d++; a.pts++; b.pts++; }
    });
    const arr = Object.values(stats);
    arr.forEach(team => { team.gd = team.gf - team.ga; });
    arr.sort((a, b) => b.pts - a.pts || b.gd - a.gd || b.gf - a.gf);
    result[g] = arr;
  });
  return result;
}

// Rank all 12 third-placed teams; the best 8 advance to the Round of 32
function computeQualifiedThirds(standings) {
  const thirds = Object.entries(standings)
    .filter(([g, arr]) => arr.every(team => team.p === 3))
    .map(([g, arr]) => ({ group: g, ...arr[2] }));
  thirds.sort((a, b) => b.pts - a.pts || b.gd - a.gd || b.gf - a.gf);
  return new Set(thirds.slice(0, 8).map(t => t.group));
}

// Resolve a placeholder code ("1A", "2A", "3A/B/C/D/F", "W74", "L101") to an actual team code,
// or return null if it can't be determined yet from the scores entered so far
function resolveTeam(code, standings, qualifiedThirds, manualScores) {
  if (TEAMS.find(t => t.code === code)) return code;

  let m = code.match(/^([12])([A-L])$/);
  if (m) {
    const grp = standings[m[2]];
    if (grp && grp.every(t => t.p === 3)) return grp[parseInt(m[1], 10) - 1].code;
    return null;
  }

  if (code.match(/^3[A-L](\/[A-L])+$/)) {
    const groups = code.slice(1).split("/");
    const candidates = groups.filter(g => qualifiedThirds.has(g) && standings[g] && standings[g].every(t => t.p === 3));
    if (candidates.length === 1) return standings[candidates[0]][2].code;
    return null;
  }

  m = code.match(/^W(\d+)$/);
  if (m) {
    const match = MATCHES.find(x => x.n === parseInt(m[1], 10));
    const score = manualScores[match.n];
    if (!score) return null;
    const r1 = resolveTeam(match.t1, standings, qualifiedThirds, manualScores);
    const r2 = resolveTeam(match.t2, standings, qualifiedThirds, manualScores);
    if (!r1 || !r2) return null;
    return score[0] > score[1] ? r1 : score[1] > score[0] ? r2 : null;
  }

  m = code.match(/^L(\d+)$/);
  if (m) {
    const match = MATCHES.find(x => x.n === parseInt(m[1], 10));
    const score = manualScores[match.n];
    if (!score) return null;
    const r1 = resolveTeam(match.t1, standings, qualifiedThirds, manualScores);
    const r2 = resolveTeam(match.t2, standings, qualifiedThirds, manualScores);
    if (!r1 || !r2) return null;
    return score[0] > score[1] ? r2 : score[1] > score[0] ? r1 : null;
  }

  return null;
}

// Map full country names (as used by external APIs) to our team codes,
// used for best-effort auto-fill of scores
const NAME_TO_CODE = {
  "Mexico": "MEX", "South Africa": "RSA", "South Korea": "KOR", "Korea Republic": "KOR",
  "Czechia": "CZE", "Czech Republic": "CZE", "Canada": "CAN",
  "Bosnia and Herzegovina": "BIH", "Bosnia & Herzegovina": "BIH", "Bosnia-Herzegovina": "BIH", "Bosnia": "BIH",
  "Qatar": "QAT", "Switzerland": "SUI", "Brazil": "BRA", "Morocco": "MAR", "Haiti": "HAI",
  "Scotland": "SCO", "USA": "USA", "United States": "USA", "United States of America": "USA", "Paraguay": "PAR",
  "Australia": "AUS", "Turkey": "TUR", "Türkiye": "TUR", "Germany": "GER",
  "Curaçao": "CUW", "Curacao": "CUW", "Ivory Coast": "CIV", "Côte d'Ivoire": "CIV",
  "Cote d'Ivoire": "CIV", "Ecuador": "ECU", "Netherlands": "NED", "Japan": "JPN",
  "Sweden": "SWE", "Tunisia": "TUN", "Belgium": "BEL", "Egypt": "EGY", "Iran": "IRN",
  "IR Iran": "IRN", "New Zealand": "NZL", "Spain": "ESP", "Cape Verde": "CPV", "Cabo Verde": "CPV",
  "Saudi Arabia": "KSA", "Uruguay": "URU", "France": "FRA", "Senegal": "SEN",
  "Iraq": "IRQ", "Norway": "NOR", "Argentina": "ARG", "Algeria": "ALG", "Austria": "AUT",
  "Jordan": "JOR", "Portugal": "POR", "DR Congo": "COD", "Congo DR": "COD", "Congo": "COD",
  "Uzbekistan": "UZB", "Colombia": "COL", "England": "ENG", "Croatia": "CRO",
  "Ghana": "GHA", "Panama": "PAN",
};

// Best-effort source for live/recent scores (CORS-enabled, no key required)
const AUTO_SCORES_URL = "https://wcup2026.org/api/data.php?action=today";

// Try several common field-name shapes to extract a usable {team1,team2,score1,score2} from an API item
function extractMatchInfo(item) {
  if (!item || typeof item !== "object") return null;
  const team1Name = item.team1 || item.home || item.homeTeam || item.home_team || (item.teams && item.teams.home && item.teams.home.name);
  const team2Name = item.team2 || item.away || item.awayTeam || item.away_team || (item.teams && item.teams.away && item.teams.away.name);
  if (!team1Name || !team2Name) return null;

  let s1, s2;
  if (item.score && Array.isArray(item.score.ft)) { s1 = item.score.ft[0]; s2 = item.score.ft[1]; }
  else if (item.score && item.score.fulltime) { s1 = item.score.fulltime.home; s2 = item.score.fulltime.away; }
  else if (item.goals) { s1 = item.goals.home; s2 = item.goals.away; }
  else if (item.home_score !== undefined) { s1 = item.home_score; s2 = item.away_score; }
  else if (item.score1 !== undefined) { s1 = item.score1; s2 = item.score2; }

  if (s1 === undefined || s2 === undefined || s1 === null || s2 === null) return null;
  return { team1Name, team2Name, score1: parseInt(s1, 10), score2: parseInt(s2, 10) };
}

function MatchesModal({ onClose, t, lang }) {
  const [tab, setTab] = useState("upcoming");
  const [now] = useState(() => new Date());
  const [manualScores, setManualScores] = useState(() => {
    try { return JSON.parse(localStorage.getItem(MANUAL_SCORES_KEY) || "{}"); } catch { return {}; }
  });
  const [autoScores, setAutoScores] = useState({});
  const [editingMatch, setEditingMatch] = useState(null);
  const [editScore1, setEditScore1] = useState("");
  const [editScore2, setEditScore2] = useState("");

  useEffect(() => {
    localStorage.setItem(MANUAL_SCORES_KEY, JSON.stringify(manualScores));
  }, [manualScores]);

  // Best-effort: try to auto-fill recent/today's scores from a free public API
  useEffect(() => {
    function dateStr(d) {
      return d.toISOString().slice(0, 10);
    }
    // Try the last 7 days, in case the API supports a date filter for past results
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      dates.push(dateStr(d));
    }

    Promise.all(
      dates.map(d =>
        fetch(`${AUTO_SCORES_URL}&date=${d}`).then(r => r.json()).catch(() => null)
      )
    ).then(results => {
      const found = {};
      results.forEach(data => {
        if (!data) return;
        const items = data.matches || data.results || data.fixtures || [];
        items.forEach(item => {
          const info = extractMatchInfo(item);
          if (!info) return;
          const c1 = NAME_TO_CODE[info.team1Name];
          const c2 = NAME_TO_CODE[info.team2Name];
          if (!c1 || !c2) return;
          const match = MATCHES.find(m =>
            (m.t1 === c1 && m.t2 === c2) || (m.t1 === c2 && m.t2 === c1)
          );
          if (!match) return;
          found[match.n] = (match.t1 === c1) ? [info.score1, info.score2] : [info.score2, info.score1];
        });
      });
      setAutoScores(found);
    }).catch(() => setAutoScores({}));
  }, []);

  const groupStandings = computeGroupStandings(manualScores);
  const qualifiedThirds = computeQualifiedThirds(groupStandings);

  const localTz = Intl.DateTimeFormat().resolvedOptions().timeZone;

  function getScore(match) {
    return manualScores[match.n] || autoScores[match.n] || null;
  }

  function isAutoScore(match) {
    return !manualScores[match.n] && !!autoScores[match.n];
  }

  function startEditScore(match, current) {
    setEditingMatch(match.n);
    setEditScore1(current ? String(current[0]) : "");
    setEditScore2(current ? String(current[1]) : "");
  }

  function saveManualScore() {
    if (editScore1 === "" || editScore2 === "") return;
    setManualScores(prev => ({ ...prev, [editingMatch]: [parseInt(editScore1, 10) || 0, parseInt(editScore2, 10) || 0] }));
    setEditingMatch(null);
  }

  function clearManualScore() {
    setManualScores(prev => {
      const updated = { ...prev };
      delete updated[editingMatch];
      return updated;
    });
    setEditingMatch(null);
  }

  function formatDateTime(utcStr) {
    const d = new Date(utcStr);
    const dateFmt = new Intl.DateTimeFormat(lang === "pt" ? "pt-PT" : "en-GB", {
      weekday: "short", day: "2-digit", month: "short", timeZone: localTz,
    });
    const timeFmt = new Intl.DateTimeFormat(lang === "pt" ? "pt-PT" : "en-GB", {
      hour: "2-digit", minute: "2-digit", timeZone: localTz,
    });
    return { date: dateFmt.format(d), time: timeFmt.format(d) };
  }

  function isLive(utcStr) {
    const d = new Date(utcStr);
    const diffMin = (now - d) / 60000;
    return diffMin >= 0 && diffMin <= 125; // ~2h05 match window
  }

  function isPast(utcStr) {
    const d = new Date(utcStr);
    return (now - d) / 60000 > 125;
  }

  const allMatches = MATCHES;
  const upcoming = allMatches.filter(m => !isPast(m.u)).sort((a, b) => new Date(a.u) - new Date(b.u));
  const past = allMatches.filter(m => isPast(m.u)).sort((a, b) => new Date(b.u) - new Date(a.u));

  function renderTeam(code) {
    const resolved = resolveTeam(code, groupStandings, qualifiedThirds, manualScores);
    if (resolved) {
      const team = TEAMS.find(x => x.code === resolved);
      if (team) return { flag: team.flag, name: team.name, resolved: true };
    }
    return { flag: "🏳️", name: matchLabel(code, t), resolved: false };
  }

  function MatchRow({ m }) {
    const { date, time } = formatDateTime(m.u);
    const score = getScore(m);
    const live = isLive(m.u);
    const t1 = renderTeam(m.t1);
    const t2 = renderTeam(m.t2);
    const bothResolved = t1.resolved && t2.resolved;
    const score2InputRef = useRef(null);
    return (
      <div style={{
        background: live ? "rgba(245,166,35,0.12)" : "rgba(255,255,255,0.05)",
        border: live ? "1px solid #f5a623" : "1px solid rgba(255,255,255,0.08)",
        borderRadius: 12, padding: "12px 14px", marginBottom: 8,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>{date} · {time}</span>
          {live ? (
            <span style={{ background: "#f5a623", color: "#0a1f0f", borderRadius: 20, padding: "2px 8px", fontSize: 10, fontWeight: 800 }}>{t("live")}</span>
          ) : (
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 10, fontFamily: "monospace" }}>{m.g ? `${t("group")} ${m.g}` : m.r}</span>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, minWidth: 0 }}>
            <span style={{ fontSize: 20 }}>{t1.flag}</span>
            <span style={{ color: "#f5f0e8", fontSize: 13, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t1.name}</span>
          </div>
          {editingMatch === m.n ? (
            <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "0 6px" }}>
              <input
                type="tel" inputMode="numeric" pattern="[0-9]*" autoFocus value={editScore1}
                onFocus={e => e.target.select()}
                onInput={e => {
                  const val = e.target.value.replace(/[^0-9]/g, "").slice(0, 2);
                  setEditScore1(val);
                  if (val !== "" && score2InputRef.current) {
                    score2InputRef.current.focus();
                    score2InputRef.current.click();
                  }
                }}
                onChange={() => {}}
                style={{ width: 32, textAlign: "center", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 6, color: "#fff", fontSize: 16, padding: "4px 2px", outline: "none" }}
              />
              <span style={{ color: "rgba(255,255,255,0.4)" }}>-</span>
              <input
                ref={score2InputRef}
                type="tel" inputMode="numeric" pattern="[0-9]*" value={editScore2}
                onFocus={e => e.target.select()}
                onInput={e => setEditScore2(e.target.value.replace(/[^0-9]/g, "").slice(0, 2))}
                onChange={() => {}}
                onKeyDown={e => { if (e.key === "Enter") saveManualScore(); }}
                style={{ width: 32, textAlign: "center", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 6, color: "#fff", fontSize: 16, padding: "4px 2px", outline: "none" }}
              />
            </div>
          ) : score ? (
            <button onClick={() => startEditScore(m, score)} style={{
              fontFamily: "'Black Han Sans', sans-serif", color: "#f5c842", fontSize: 18, padding: "0 10px",
              whiteSpace: "nowrap", background: "none", border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", gap: 4,
            }}>
              {score[0]} - {score[1]}
              {isAutoScore(m) && <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#27ae60", display: "inline-block" }} />}
            </button>
          ) : (bothResolved && isPast(m.u)) ? (
            <button onClick={() => startEditScore(m, null)} style={{
              background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)",
              color: "rgba(255,255,255,0.5)", borderRadius: 8, padding: "4px 10px",
              fontSize: 12, cursor: "pointer",
            }}>+</button>
          ) : (
            <div style={{ color: "rgba(255,255,255,0.25)", fontSize: 12, padding: "0 10px" }}>vs</div>
          )}
          <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, minWidth: 0, justifyContent: "flex-end" }}>
            <span style={{ color: "#f5f0e8", fontSize: 13, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", textAlign: "right" }}>{t2.name}</span>
            <span style={{ fontSize: 20 }}>{t2.flag}</span>
          </div>
        </div>
        {editingMatch === m.n && (
          <div style={{ display: "flex", gap: 6, marginTop: 8, justifyContent: "center" }}>
            <button onClick={saveManualScore} style={{ background: "#f5c842", color: "#0a1f0f", border: "none", borderRadius: 6, padding: "4px 14px", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>{t("save")}</button>
            {manualScores[m.n] && (
              <button onClick={clearManualScore} style={{ background: "rgba(231,76,60,0.15)", color: "#e74c3c", border: "none", borderRadius: 6, padding: "4px 14px", fontSize: 11, cursor: "pointer" }}>{t("clear")}</button>
            )}
            <button onClick={() => setEditingMatch(null)} style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)", border: "none", borderRadius: 6, padding: "4px 14px", fontSize: 11, cursor: "pointer" }}>{t("cancel")}</button>
          </div>
        )}
        <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 8, color: "rgba(255,255,255,0.3)", fontSize: 10 }}>
          <MapPin size={11} strokeWidth={2} /> {m.v}
        </div>
      </div>
    );
  }

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)",
      display: "flex", alignItems: "flex-end", justifyContent: "center",
      zIndex: 100,
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "#0a1f0f", borderRadius: "20px 20px 0 0", width: "100%", maxWidth: 560,
        maxHeight: "90vh", display: "flex", flexDirection: "column",
        boxShadow: "0 -8px 40px rgba(0,0,0,0.6)",
      }}>
        {/* Header */}
        <div style={{ padding: "16px 16px 12px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Calendar size={22} color="#f5f0e8" strokeWidth={1.5} />
            <div style={{ fontFamily: "'Black Han Sans', sans-serif", color: "#f5f0e8", fontSize: 20 }}>{t("matches")}</div>
          </div>
          <button onClick={onClose} style={{
            background: "rgba(255,255,255,0.1)", border: "none", color: "#fff",
            borderRadius: "50%", width: 32, height: 32, padding: 0, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          }}><X size={16} strokeWidth={2.5} /></button>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 8, padding: "0 16px 12px", flexShrink: 0 }}>
          {[
            { key: "upcoming", label: t("upcoming") },
            { key: "results", label: t("results") },
            { key: "standings", label: t("standings") },
          ].map(tb => (
            <button key={tb.key} onClick={() => setTab(tb.key)} style={{
              background: tab === tb.key ? "#f5c842" : "rgba(255,255,255,0.08)",
              color: tab === tb.key ? "#0a1f0f" : "rgba(255,255,255,0.7)",
              border: "none", borderRadius: 20, padding: "7px 14px",
              fontFamily: tab === tb.key ? "'Black Han Sans', sans-serif" : "'Inter', sans-serif",
              fontWeight: tab === tb.key ? 400 : 600,
              fontSize: 12, cursor: "pointer", letterSpacing: tab === tb.key ? 0.5 : 0,
            }}>{tb.label}</button>
          ))}
        </div>

        {/* Content */}
        <div style={{ overflowY: "auto", padding: "0 16px 24px" }}>
          {tab === "upcoming" && (
            upcoming.length === 0
              ? <div style={{ textAlign: "center", color: "rgba(255,255,255,0.3)", padding: "30px 0", fontSize: 13 }}>{t("noMatchesFound")}</div>
              : upcoming.map(m => <MatchRow key={m.n} m={m} />)
          )}
          {tab === "results" && (
            past.length === 0
              ? <div style={{ textAlign: "center", color: "rgba(255,255,255,0.3)", padding: "30px 0", fontSize: 13 }}>{t("noMatchesFound")}</div>
              : past.map(m => <MatchRow key={m.n} m={m} />)
          )}
          {tab === "standings" && (
            Object.entries(groupStandings).map(([groupName, teams]) => (
              <div key={groupName} style={{ marginBottom: 16 }}>
                <div style={{
                  fontFamily: "'Black Han Sans', sans-serif", color: "#f5c842",
                  fontSize: 12, letterSpacing: 1, marginBottom: 6,
                  background: "rgba(255,255,255,0.06)", display: "inline-block",
                  padding: "3px 10px", borderRadius: 20,
                }}>{t("group").toUpperCase()} {groupName}</div>
                <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 10, overflow: "hidden" }}>
                  {/* Header row */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 24px 24px 24px 24px 24px 32px", padding: "6px 10px", fontSize: 10, color: "rgba(255,255,255,0.35)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    <span></span><span style={{ textAlign: "center" }}>P</span><span style={{ textAlign: "center" }}>V</span><span style={{ textAlign: "center" }}>E</span><span style={{ textAlign: "center" }}>D</span><span style={{ textAlign: "center" }}>SG</span><span style={{ textAlign: "center" }}>Pts</span>
                  </div>
                  {teams.map((tm, i) => {
                    const team = TEAMS.find(x => x.code === tm.code);
                    const groupStarted = teams.some(x => x.p > 0);
                    const qualified = groupStarted && (i < 2 || (i === 2 && qualifiedThirds.has(groupName)));
                    return (
                      <div key={tm.code} style={{
                        display: "grid", gridTemplateColumns: "1fr 24px 24px 24px 24px 24px 32px",
                        padding: "8px 10px", fontSize: 12, color: "#f5f0e8", alignItems: "center",
                        borderBottom: i < teams.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                        borderLeft: qualified ? "3px solid #27ae60" : "3px solid transparent",
                      }}>
                        <span style={{ display: "flex", alignItems: "center", gap: 6, overflow: "hidden" }}>
                          <span style={{ fontSize: 16 }}>{team ? team.flag : "🏳️"}</span>
                          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{team ? team.name : tm.code}</span>
                        </span>
                        <span style={{ textAlign: "center", color: "rgba(255,255,255,0.6)" }}>{tm.p}</span>
                        <span style={{ textAlign: "center", color: "rgba(255,255,255,0.6)" }}>{tm.w}</span>
                        <span style={{ textAlign: "center", color: "rgba(255,255,255,0.6)" }}>{tm.d}</span>
                        <span style={{ textAlign: "center", color: "rgba(255,255,255,0.6)" }}>{tm.l}</span>
                        <span style={{ textAlign: "center", color: "rgba(255,255,255,0.6)" }}>{tm.gd > 0 ? `+${tm.gd}` : tm.gd}</span>
                        <span style={{ textAlign: "center", fontWeight: 800, color: "#f5c842" }}>{tm.pts}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Settings Modal ───────────────────────────────────────────────────────────
function SettingsModal({ stickers, packs, promised, onImport, onClose, t, lang, setLang }) {
  const [imported, setImported] = useState(false);
  const [error, setError] = useState(false);

  function handleExport() {
    const data = JSON.stringify({ stickers, packs, promised });
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `copa2026-backup-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleImport(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        if (!data.stickers) throw new Error("Invalid file");
        onImport(data);
        setImported(true);
        setTimeout(() => setImported(false), 2000);
      } catch {
        setError(true);
        setTimeout(() => setError(false), 2000);
      }
    };
    reader.readAsText(file);
  }

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)",
      display: "flex", alignItems: "flex-end", justifyContent: "center",
      zIndex: 300,
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "#0a1f0f", borderRadius: "20px 20px 0 0", width: "100%", maxWidth: 560,
        boxShadow: "0 -8px 40px rgba(0,0,0,0.6)",
      }}>
        {/* Header */}
        <div style={{ padding: "16px 16px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Settings size={22} color="#f5f0e8" strokeWidth={1.5} />
            <div style={{ fontFamily: "'Black Han Sans', sans-serif", color: "#f5f0e8", fontSize: 20 }}>{t("settings")}</div>
          </div>
          <button onClick={onClose} style={{
            background: "rgba(255,255,255,0.1)", border: "none", color: "#fff",
            borderRadius: "50%", width: 32, height: 32, padding: 0, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          }}><X size={16} strokeWidth={2.5} /></button>
        </div>

        <div style={{ padding: "0 16px 32px", display: "flex", flexDirection: "column", gap: 10 }}>
          {/* Language selector */}
          <div>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>{t("language")}</div>
            <div style={{ display: "flex", gap: 8 }}>
              {[{ code: "en", label: "English" }, { code: "pt", label: "Português" }].map(l => (
                <button key={l.code} onClick={() => setLang(l.code)} style={{
                  flex: 1, background: lang === l.code ? "#f5c842" : "rgba(255,255,255,0.06)",
                  color: lang === l.code ? "#0a1f0f" : "#f5f0e8",
                  border: "1px solid " + (lang === l.code ? "#f5c842" : "rgba(255,255,255,0.12)"),
                  borderRadius: 10, padding: "10px 0", cursor: "pointer",
                  fontFamily: "'Black Han Sans', sans-serif", fontSize: 13,
                }}>{l.label}</button>
              ))}
            </div>
          </div>

          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, marginBottom: 4, marginTop: 6 }}>
            {t("backupDescription")}
          </div>

          {/* Export */}
          <button onClick={handleExport} style={{
            background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 10, padding: "14px 16px", cursor: "pointer",
            display: "flex", alignItems: "center", gap: 12, textAlign: "left",
          }}>
            <div style={{ color: "#f5c842", fontSize: 22 }}>📤</div>
            <div>
              <div style={{ color: "#f5f0e8", fontWeight: 700, fontSize: 14 }}>{t("exportCollection")}</div>
              <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, marginTop: 2 }}>{t("downloadBackup")}</div>
            </div>
          </button>

          {/* Import */}
          <label style={{
            background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 10, padding: "14px 16px", cursor: "pointer",
            display: "flex", alignItems: "center", gap: 12,
          }}>
            <input type="file" accept=".json" onChange={handleImport} style={{ display: "none" }} />
            <div style={{ fontSize: 22 }}>{imported ? "✅" : error ? "❌" : "📥"}</div>
            <div>
              <div style={{ color: imported ? "#27ae60" : error ? "#e74c3c" : "#f5f0e8", fontWeight: 700, fontSize: 14 }}>
                {imported ? t("imported") : error ? t("invalidFile") : t("importCollection")}
              </div>
              <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, marginTop: 2 }}>{t("restoreBackup")}</div>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [stickers, setStickers] = useState(loadStickers);
  const [lang, setLang] = useState(() => localStorage.getItem(LANG_KEY) || "en");
  const t = (key) => TRANSLATIONS[lang][key] || TRANSLATIONS.en[key] || key;
  useEffect(() => { localStorage.setItem(LANG_KEY, lang); }, [lang]);
  const [promised, setPromised] = useState(() => {
    try { return JSON.parse(localStorage.getItem(PROMISED_KEY) || "{}"); } catch { return {}; }
  });
  const [packs, setPacks] = useState(loadPacks);
  const [splash, setSplash] = useState(true);
  const [splashFading, setSplashFading] = useState(false);
  const [activeTeam, setActiveTeam] = useState(null);
  const [showSpecial, setShowSpecial] = useState(false);
  const [showCollection, setShowCollection] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showPacks, setShowPacks] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showMatches, setShowMatches] = useState(false);
  const [view, setView] = useState("all");
  const [inlinePrompt, setInlinePrompt] = useState(null);
  const [inlinePromptName, setInlinePromptName] = useState("");

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(stickers)); }, [stickers]);
  useEffect(() => { localStorage.setItem(PROMISED_KEY, JSON.stringify(promised)); }, [promised]);
  useEffect(() => { localStorage.setItem(PACKS_KEY, JSON.stringify(packs)); }, [packs]);

  function handlePromise(key, name) {
    setPromised(prev => {
      const updated = { ...prev };
      if (name) updated[key] = name;
      else delete updated[key];
      return updated;
    });
  }
  useEffect(() => {
    const t1 = setTimeout(() => setSplashFading(true), 2000);
    const t2 = setTimeout(() => setSplash(false), 2600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  function addPack(p) { setPacks(prev => [...prev, p]); }
  function removePack(id) { setPacks(prev => prev.filter(p => p.id !== id)); }
  function handleImport(data) {
    if (data.stickers) setStickers(data.stickers);
    if (data.packs) setPacks(data.packs);
    if (data.promised) setPromised(data.promised);
    setShowSettings(false);
  }

  const stats = getStats(stickers);
  const pct = Math.round((stats.have + stats.dup) / stats.total * 100);

  function toggleSticker(teamCode, idx) {
    setStickers(prev => {
      const updated = { ...prev, [teamCode]: [...prev[teamCode]] };
      updated[teamCode][idx] = (updated[teamCode][idx] + 1) % 3;
      return updated;
    });
  }
  function toggleSpecial(idx) {
    setStickers(prev => {
      const updated = { ...prev, special: [...prev.special] };
      updated.special[idx] = (updated.special[idx] + 1) % 3;
      return updated;
    });
  }

  const currentTeam = activeTeam ? TEAMS.find(t => t.code === activeTeam) : null;
  const currentTeamIdx = activeTeam ? TEAMS.findIndex(t => t.code === activeTeam) : -1;

  function goToPrevTeam() {
    if (currentTeamIdx > 0) setActiveTeam(TEAMS[currentTeamIdx - 1].code);
  }
  function goToNextTeam() {
    if (currentTeamIdx < TEAMS.length - 1) setActiveTeam(TEAMS[currentTeamIdx + 1].code);
  }
  const specialHave = stickers.special.filter(s => s >= 1).length;
  const specialDup = stickers.special.filter(s => s === 2).length;

  const visibleTeams = TEAMS.filter(team => {
    if (view === "missing") return stickers[team.code].some(s => s === 0);
    if (view === "duplicates") return stickers[team.code].some((s, i) => s === 2);
    return true;
  });

  const GROUPS = ["A","B","C","D","E","F","G","H","I","J","K","L"];

  return (
    <div style={{ minHeight: "100vh", background: "#0a1f0f", fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* Splash screen */}
      {splash && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 999,
          background: "linear-gradient(160deg, #0a1f0f 0%, #0f3020 50%, #0a1f0f 100%)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          opacity: splashFading ? 0 : 1,
          transition: "opacity 0.6s ease",
          pointerEvents: splashFading ? "none" : "all",
        }}>
          <div style={{ animation: "splashIn 0.6s ease forwards", textAlign: "center" }}>
            <div style={{ fontSize: 72, marginBottom: 16, lineHeight: 1 }}>⚽</div>
            <div style={{
              fontFamily: "'Black Han Sans', sans-serif",
              color: "#f5c842", fontSize: 36,
              letterSpacing: 2, lineHeight: 1, marginBottom: 6,
            }}>WORLD CUP</div>
            <div style={{
              fontFamily: "'Black Han Sans', sans-serif",
              color: "#fff", fontSize: 52,
              letterSpacing: 4, lineHeight: 1, marginBottom: 8,
            }}>2026</div>
            <div style={{
              color: "rgba(255,255,255,0.35)", fontSize: 12,
              letterSpacing: 3, textTransform: "uppercase",
            }}>{t("appSubtitle")}</div>
          </div>
          <div style={{
            position: "absolute", bottom: 40,
            fontSize: 22, letterSpacing: 6,
          }}>🇲🇽 🇺🇸 🇨🇦</div>
        </div>
      )}

      {/* Header */}
      <div style={{
        background: "#0a1f0f",
        padding: "16px 16px 20px",
        position: "sticky", top: 0, zIndex: 10,
        transform: "translateZ(0)", WebkitTransform: "translateZ(0)",
      }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <div>
              <div style={{ fontFamily: "'Black Han Sans', sans-serif", color: "#f5c842", fontSize: 22, letterSpacing: 1, lineHeight: 1 }}>{t("appTitle")}</div>
              <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", marginTop: 2 }}>{t("appSubtitle")}</div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => setShowMatches(true)} style={{
                background: "rgba(255,255,255,0.1)", color: "#f5f0e8", border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: 10, padding: "9px 12px", cursor: "pointer",
                display: "flex", alignItems: "center",
              }}><Calendar size={16} strokeWidth={2} /></button>
              <button onClick={() => setShowSettings(true)} style={{
                background: "rgba(255,255,255,0.1)", color: "#f5f0e8", border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: 10, padding: "9px 12px", cursor: "pointer",
                display: "flex", alignItems: "center",
              }}><Settings size={16} strokeWidth={2} /></button>
            </div>
          </div>

          {/* Dashboard cards */}
          <div style={{ display: "flex", gap: 10 }}>
            {/* Progress card */}
            <button onClick={() => setShowCollection(true)} style={{ flex: 2, background: "rgba(255,255,255,0.06)", borderRadius: 14, padding: "14px 16px", border: "none", textAlign: "left", cursor: "pointer" }}>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 10, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>{t("collection")}</div>
              <div style={{ fontFamily: "'Black Han Sans', sans-serif", color: "#fff", fontSize: 40, lineHeight: 1, marginBottom: 4 }}>{pct}%</div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, marginBottom: 10 }}>{stats.have + stats.dup} {lang === "pt" ? "de" : "of"} {stats.total} {t("stickers")}</div>
              <div style={{ height: 4, background: "rgba(255,255,255,0.1)", borderRadius: 4, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${pct}%`, background: "linear-gradient(90deg, #27ae60, #f5c842)", borderRadius: 4, transition: "width 0.4s" }} />
              </div>
              <div style={{ color: "rgba(255,255,255,0.25)", fontSize: 10, marginTop: 6 }}>{stats.miss} {t("missing")}</div>
            </button>

            {/* Swaps card */}
            <button onClick={() => setView(view === "duplicates" ? "all" : "duplicates")} style={{
              flex: 1, background: view === "duplicates" ? "rgba(245,166,35,0.2)" : "rgba(255,255,255,0.06)",
              borderRadius: 14, padding: "14px 12px", border: view === "duplicates" ? "1px solid #f5a623" : "1px solid transparent",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6,
              cursor: "pointer",
            }}>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 10, textTransform: "uppercase", letterSpacing: 1 }}>{t("swaps")}</div>
              <Repeat2 size={24} color="#f5a623" strokeWidth={1.5} />
              <div style={{ fontFamily: "'Black Han Sans', sans-serif", color: "#f5a623", fontSize: 24, lineHeight: 1 }}>{stats.dup}</div>
            </button>

            {/* Pack Tracker card */}
            <button onClick={() => setShowPacks(true)} style={{
              flex: 1, background: "rgba(255,255,255,0.06)",
              borderRadius: 14, padding: "14px 12px", border: "1px solid transparent",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6,
              cursor: "pointer",
            }}>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 10, textTransform: "uppercase", letterSpacing: 1 }}>{t("packs")}</div>
              <Package size={24} color="#27ae60" strokeWidth={1.5} />
              <div style={{ fontFamily: "'Black Han Sans', sans-serif", color: "#27ae60", fontSize: 24, lineHeight: 1 }}>{packs.reduce((s, p) => s + p.qty, 0)}</div>
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 560, margin: "0 auto", padding: "14px 12px 0" }}>

        {/* Filter tabs */}
        <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
          {[
            { key: "all", label: t("all"), icon: null },
            { key: "groups", label: t("groups"), icon: null },
            { key: "duplicates", label: t("duplicates"), icon: <Repeat2 size={12} strokeWidth={2} /> },
            { key: "missing", label: t("missingTab"), icon: <X size={12} strokeWidth={2.5} /> },
          ].map(f => (
            <button key={f.key} onClick={() => setView(f.key)} style={{
              background: view === f.key ? "#f5c842" : "rgba(255,255,255,0.08)",
              color: view === f.key ? "#0a1f0f" : "rgba(255,255,255,0.7)",
              border: "none", borderRadius: 20, padding: "7px 14px",
              fontFamily: view === f.key ? "'Black Han Sans', sans-serif" : "'Inter', sans-serif",
              fontWeight: view === f.key ? 400 : 600,
              fontSize: 12, cursor: "pointer", letterSpacing: view === f.key ? 0.5 : 0,
              display: "flex", alignItems: "center", gap: 5,
            }}>
              {f.icon}{f.label}
            </button>
          ))}
        </div>

        {/* Special stickers card */}
        {(view === "all" || view === "groups" ||
          (view === "missing" && stickers.special.some(s => s === 0))
        ) && (
          <button onClick={() => setShowSpecial(true)} style={{
            width: "100%", background: "rgba(100,45,10,0.3)", border: "1px solid rgba(200,120,40,0.3)",
            borderRadius: 10, overflow: "hidden", cursor: "pointer",
            marginBottom: 16, padding: 0,
          }}>
            <div style={{ background: "linear-gradient(90deg, #5c2008, #c9621a)", height: 7 }} />
            <div style={{ padding: "10px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 24 }}>✨</span>
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontFamily: "'Black Han Sans', sans-serif", color: "#f5f0e8", fontSize: 13 }}>{t("specialStickers")}</div>
                  {specialDup > 0 && <div style={{ fontSize: 11, color: "#f5a623", display: "flex", alignItems: "center", gap: 3 }}><Repeat2 size={10} strokeWidth={2} /> {specialDup} {specialDup > 1 ? t("dups") : t("dup")}</div>}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{
                  background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.6)",
                  fontFamily: "'Black Han Sans', sans-serif",
                  fontSize: 9, padding: "1px 5px", borderRadius: 4, letterSpacing: 0.5,
                }}>FWC</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5, margin: "0 14px 10px" }}>
              <div style={{ flex: 1, height: 3, background: "rgba(255,255,255,0.1)", borderRadius: 3, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${Math.round(specialHave / SPECIAL.length * 100)}%`, background: "#c9621a", borderRadius: 3 }} />
              </div>
              <span style={{ fontSize: 9, color: "rgba(255,255,255,0.45)", fontWeight: 700, minWidth: 24 }}>{specialHave}/{SPECIAL.length}</span>
            </div>
          </button>
        )}

        {/* Teams */}
        {visibleTeams.length === 0 && view !== "duplicates" ? (
          <div style={{ textAlign: "center", color: "rgba(255,255,255,0.4)", padding: "40px 0" }}>
            <div style={{ fontSize: 40, marginBottom: 8 }}>🏆</div>
            <div style={{ fontFamily: "'Black Han Sans', sans-serif", fontSize: 16, color: "#f5c842" }}>
              {t("albumComplete")}
            </div>
          </div>
        ) : view === "groups" ? (
          // Grouped by group A-L
          GROUPS.map(g => {
            const groupTeams = TEAMS.filter(t => t.group === g);
            return (
              <div key={g} style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  <div style={{
                    fontFamily: "'Black Han Sans', sans-serif",
                    background: "rgba(255,255,255,0.08)",
                    color: "#f5c842", fontSize: 12, letterSpacing: 1,
                    padding: "3px 10px", borderRadius: 20,
                  }}>{t("group")} {g}</div>
                  <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8 }}>
                  {groupTeams.map(team => (
                    <StickerCard key={team.code} team={team} stickers={stickers[team.code]} onClick={() => setActiveTeam(team.code)} t={t} />
                  ))}
                </div>
              </div>
            );
          })
        ) : view === "duplicates" ? (
          // Expanded duplicates view
          <div style={{ paddingBottom: 24 }}>
            {/* Special stickers duplicates */}
            {stickers.special.some(s => s === 2) && (
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 20 }}>✨</span>
                    <span style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>{t("specialStickers")}</span>
                  </div>
                  <span style={{ background: "rgba(245,166,35,0.15)", color: "#f5a623", borderRadius: 20, padding: "2px 10px", fontSize: 11, fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
                    <Repeat2 size={10} strokeWidth={2} /> {stickers.special.filter(s => s === 2).length} dup{stickers.special.filter(s => s === 2).length > 1 ? "s" : ""}
                  </span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
                  {stickers.special.map((s, i) => {
                    if (s !== 2) return null;
                    const sp = SPECIAL[i];
                    return (
                      <button key={sp.code} onClick={() => setShowSpecial(true)} style={{
                        background: "rgba(245,166,35,0.15)", border: "2px solid #f5a623",
                        borderRadius: 12, padding: "18px 8px 12px", cursor: "pointer",
                        display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
                        position: "relative", minHeight: 110,
                      }}>
                        <span style={{ position: "absolute", top: 7, left: 8, color: "#f5a623", fontSize: 9, fontWeight: 800, fontFamily: "monospace", opacity: 0.8 }}>{sp.code}</span>
                        <div style={{ marginTop: 18, color: "#f5a623" }}>
                          <Star size={30} strokeWidth={1.5} />
                        </div>
                        <span style={{ color: "#f5a623", fontSize: 11, textAlign: "center", lineHeight: 1.3, padding: "0 2px", wordBreak: "break-word" }}>{sp.name}</span>
                        <div style={{ background: "#f5a623", color: "#0a1f0f", borderRadius: 20, padding: "2px 8px", fontSize: 10, fontWeight: 800 }}>x2</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
            {visibleTeams.length === 0 ? (
              <div style={{ textAlign: "center", color: "rgba(255,255,255,0.4)", padding: "40px 0" }}>
                <div style={{ fontSize: 40, marginBottom: 8 }}>🏆</div>
                <div style={{ fontFamily: "'Black Han Sans', sans-serif", fontSize: 16, color: "#f5c842" }}>{t("noDuplicates")}</div>
              </div>
            ) : visibleTeams.map(team => {
              const dups = stickers[team.code].map((s, i) => ({ s, i })).filter(({ s }) => s === 2);
              return (
                <div key={team.code} style={{ marginBottom: 20 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 20 }}>{team.flag}</span>
                      <span style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>{team.name}</span>
                    </div>
                    <span style={{ background: "rgba(245,166,35,0.15)", color: "#f5a623", borderRadius: 20, padding: "2px 10px", fontSize: 11, fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
                      <Repeat2 size={10} strokeWidth={2} /> {dups.length} {dups.length > 1 ? t("dups") : t("dup")}
                    </span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
                    {dups.map(({ i }) => {
                      const n = i + 1;
                      const playerName = (PLAYERS[team.code] && PLAYERS[team.code][i]) || "";
                      const promisedTo = promised[`${team.code}-${i}`];
                      const isPromised = !!promisedTo;
                      const key = `${team.code}-${i}`;
                      const bg = isPromised ? "rgba(155,89,182,0.2)" : "rgba(245,166,35,0.15)";
                      const border = isPromised ? "#9b59b6" : "#f5a623";
                      const textCol = isPromised ? "#c39bd3" : "#f5a623";
                      return (
                        <div key={n} style={{
                          background: bg, border: `2px solid ${border}`,
                          borderRadius: 12, padding: "18px 8px 12px",
                          display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
                          position: "relative", minHeight: 110,
                        }}>
                          <span style={{ position: "absolute", top: 7, left: 8, color: textCol, fontSize: 9, fontWeight: 800, fontFamily: "monospace", opacity: 0.8 }}>{team.code} {n}</span>
                          
                          {/* Promise icon */}
                          <button onClick={e => { e.stopPropagation(); setInlinePrompt(inlinePrompt === key ? null : key); setInlinePromptName(promisedTo || ""); }} style={{
                            position: "absolute", top: 5, right: 5,
                            background: isPromised ? "#9b59b6" : "#f5a623",
                            border: "none", borderRadius: 6, width: 24, height: 24,
                            display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: 0,
                          }}>
                            {isPromised ? <UserCheck size={14} color="#fff" strokeWidth={2} /> : <UserPlus size={14} color="#0a1f0f" strokeWidth={2} />}
                          </button>

                          <div style={{ marginTop: 18, color: textCol }}>
                            {n === 1 ? <Shield size={30} strokeWidth={1.5} /> : n === 13 ? <Users size={30} strokeWidth={1.5} /> : <User size={30} strokeWidth={1.5} />}
                          </div>
                          <span style={{ color: textCol, fontSize: 11, textAlign: "center", lineHeight: 1.3, padding: "0 2px", wordBreak: "break-word" }}>{playerName}</span>

                          {inlinePrompt === key ? (
                            <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 4 }}>
                              <input
                                autoFocus
                                value={inlinePromptName}
                                onChange={e => setInlinePromptName(e.target.value)}
                                onKeyDown={e => { if (e.key === "Enter") { handlePromise(key, inlinePromptName.trim() || null); setInlinePrompt(null); }}}
                                placeholder={t("namePlaceholder")}
                                style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 6, padding: "4px 6px", color: "#fff", fontSize: 16, outline: "none", width: "100%", boxSizing: "border-box" }}
                              />
                              <div style={{ display: "flex", gap: 4 }}>
                                <button onClick={() => { handlePromise(key, inlinePromptName.trim() || null); setInlinePrompt(null); }} style={{ flex: 1, background: "#9b59b6", border: "none", borderRadius: 6, color: "#fff", fontSize: 10, fontWeight: 700, padding: "4px 0", cursor: "pointer" }}>Save</button>
                                <button onClick={() => setInlinePrompt(null)} style={{ flex: 1, background: "rgba(255,255,255,0.08)", border: "none", borderRadius: 6, color: "rgba(255,255,255,0.5)", fontSize: 10, padding: "4px 0", cursor: "pointer" }}>Cancel</button>
                              </div>
                            </div>
                          ) : isPromised ? (
                            <div style={{ background: "#9b59b6", color: "#fff", borderRadius: 20, padding: "2px 8px", fontSize: 9, fontWeight: 700, maxWidth: "90%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>→ {promisedTo}</div>
                          ) : (
                            <div style={{ background: border, color: "#0a1f0f", borderRadius: 20, padding: "2px 8px", fontSize: 10, fontWeight: 800 }}>x2</div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, paddingBottom: 24 }}>
            {visibleTeams.map(team => (
              <StickerCard
                key={team.code}
                team={team}
                stickers={stickers[team.code]}
                onClick={() => setActiveTeam(team.code)}
                t={t}
              />
            ))}
          </div>
        )}

        <div style={{ height: 24 }} />
      </div>

      {/* Floating share button */}
      <button onClick={() => setShowShare(true)} style={{
        position: "fixed", bottom: 24, right: 20,
        background: "#f5c842", color: "#0a1f0f", border: "none",
        borderRadius: 50, padding: "14px 20px",
        fontFamily: "'Black Han Sans', sans-serif", fontSize: 14, cursor: "pointer",
        boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
        zIndex: 50, display: "flex", alignItems: "center", gap: 8,
      }}>
        <SendHorizontal size={16} strokeWidth={2} /> {t("share")}
      </button>

      {showSettings && <SettingsModal stickers={stickers} packs={packs} promised={promised} onImport={handleImport} onClose={() => setShowSettings(false)} t={t} lang={lang} setLang={setLang} />}
      {showMatches && <MatchesModal onClose={() => setShowMatches(false)} t={t} lang={lang} />}
      {showPacks && <PacksModal packs={packs} onAdd={addPack} onRemove={removePack} onClose={() => setShowPacks(false)} t={t} />}
      {showCollection && <CollectionModal stickers={stickers} promised={promised} onClose={() => setShowCollection(false)} t={t} />}
      {showSpecial && <SpecialModal stickers={stickers.special} onToggle={toggleSpecial} onClose={() => setShowSpecial(false)} t={t} />}
      {activeTeam && currentTeam && (
        <TeamModal
          team={currentTeam}
          stickers={stickers[activeTeam]}
          onToggle={(idx) => toggleSticker(activeTeam, idx)}
          onClose={() => setActiveTeam(null)}
          onPrev={goToPrevTeam}
          onNext={goToNextTeam}
          hasPrev={currentTeamIdx > 0}
          hasNext={currentTeamIdx < TEAMS.length - 1}
          promised={promised}
          onPromise={handlePromise}
          t={t}
        />
      )}
      {showShare && <ShareSheet stickers={stickers} promised={promised} onClose={() => setShowShare(false)} t={t} />}
    </div>
  );
}