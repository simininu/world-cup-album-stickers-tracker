import { useState, useEffect } from "react";
import { Shield, User, Users, Repeat2, X, SendHorizontal, Settings, Package, Star, UserPlus, UserCheck } from "lucide-react";

// Google Font injection
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href = "https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Inter:wght@400;600;700;800;900&display=swap";
document.head.appendChild(fontLink);

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
function StickerCard({ team, stickers, onClick }) {
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
          {dupCount > 0 && <span style={{ color: "#f5a623", display: "flex", alignItems: "center", gap: 3, fontSize: 10 }}><Repeat2 size={10} strokeWidth={2} /> {dupCount} dup{dupCount > 1 ? "s" : ""}</span>}
          {isComplete && <span style={{ color: "#27ae60" }}>✓ Complete</span>}
        </div>
      </div>
    </button>
  );
}

// ─── Team Modal ───────────────────────────────────────────────────────────────
function TeamModal({ team, stickers, onToggle, onClose, onPrev, onNext, hasPrev, hasNext, promised, onPromise }) {
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
                {collected}/20 collected
                {dups > 0 && <span style={{ color: "#f5a623", marginLeft: 8, display: "inline-flex", alignItems: "center", gap: 3 }}><Repeat2 size={11} strokeWidth={2} /> {dups} dup{dups > 1 ? "s" : ""}</span>}
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
            { bg: "rgba(255,255,255,0.06)", border: "rgba(255,255,255,0.12)", label: "Missing" },
            { bg: "rgba(39,174,96,0.25)", border: "#27ae60", label: "Have" },
            { bg: "rgba(245,166,35,0.25)", border: "#f5a623", label: "Duplicate" },
            { bg: "rgba(155,89,182,0.2)", border: "#9b59b6", label: "Promised" },
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
                    <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 9 }}>Promised to:</span>
                    <input
                      autoFocus
                      value={promptName}
                      onChange={e => setPromptName(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && handlePromiseSave()}
                      placeholder="Name..."
                      style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 6, padding: "4px 6px", color: "#fff", fontSize: 16, outline: "none", width: "100%", boxSizing: "border-box" }}
                    />
                    <div style={{ display: "flex", gap: 4, width: "100%" }}>
                      <button onClick={handlePromiseSave} style={{ flex: 1, background: "#9b59b6", border: "none", borderRadius: 6, color: "#fff", fontSize: 10, fontWeight: 700, padding: "4px 0", cursor: "pointer" }}>Save</button>
                      <button onClick={() => { setPromptIdx(null); }} style={{ flex: 1, background: "rgba(255,255,255,0.08)", border: "none", borderRadius: 6, color: "rgba(255,255,255,0.5)", fontSize: 10, padding: "4px 0", cursor: "pointer" }}>Cancel</button>
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
          }}>← Prev</button>
          <button onClick={onNext} disabled={!hasNext} style={{
            background: hasNext ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.1)", color: hasNext ? "#f5f0e8" : "rgba(255,255,255,0.2)",
            borderRadius: 10, padding: "10px 20px", cursor: hasNext ? "pointer" : "default",
            fontFamily: "'Black Han Sans', sans-serif", fontSize: 13,
          }}>Next →</button>
        </div>
      </div>
    </div>
  );
}

// ─── Collection Modal ────────────────────────────────────────────────────────
function CollectionModal({ stickers, onClose }) {
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
          <div style={{ fontFamily: "'Black Han Sans', sans-serif", color: "#f5f0e8", fontSize: 22 }}>My Collection <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 16, fontFamily: "'Inter', sans-serif", fontWeight: 400 }}>({Object.values(stickers).flat().filter(s => s >= 1).length})</span></div>
          <button onClick={onClose} style={{
            background: "rgba(255,255,255,0.1)", border: "none", color: "#fff",
            borderRadius: "50%", width: 32, height: 32, padding: 0, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          }}><X size={16} strokeWidth={2.5} /></button>
        </div>

        {/* Scrollable list */}
        <div style={{ overflowY: "auto", padding: "0 14px 24px" }}>
          {teamsWithStickers.length === 0 ? (
            <div style={{ textAlign: "center", color: "rgba(255,255,255,0.3)", padding: "40px 0", fontSize: 14 }}>
              No stickers collected yet
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
                  }}>{collected.length} sticker{collected.length !== 1 ? "s" : ""}</span>
                </div>

                {/* Sticker cards */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
                  {collected.map(({ s, i }) => {
                    const n = i + 1;
                    const isDup = s === 2;
                    const bg = isDup ? "rgba(245,166,35,0.15)" : "rgba(39,174,96,0.15)";
                    const border = isDup ? "#f5a623" : "#27ae60";
                    const textCol = isDup ? "#f5a623" : "#27ae60";
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
                        <div style={{
                          background: border, color: "#0a1f0f",
                          borderRadius: 20, padding: "2px 8px", fontSize: 10, fontWeight: 800,
                        }}>{isDup ? "x2" : "x1"}</div>
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
function SpecialModal({ stickers, onToggle, onClose }) {
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
            <div style={{ fontFamily: "'Black Han Sans', sans-serif", color: "#f5f0e8", fontSize: 20 }}>✨ Special Stickers</div>
            <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 12 }}>
              {stickers.filter(s => s >= 1).length}/{SPECIAL.length} collected
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
function ShareSheet({ stickers, promised, onClose }) {
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
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 12, marginBottom: 10 }}>Copy and paste this text anywhere — anyone can read it without installing anything:</p>
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
          }}>{copied ? "✓ Copied!" : "📋 Copy text"}</button>
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
function PacksModal({ packs, onAdd, onRemove, onClose }) {
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
            <div style={{ fontFamily: "'Black Han Sans', sans-serif", color: "#f5f0e8", fontSize: 20 }}>Pack Tracker</div>
          </div>
          <button onClick={onClose} style={{
            background: "rgba(255,255,255,0.1)", border: "none", color: "#fff",
            borderRadius: "50%", width: 32, height: 32, padding: 0, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          }}><X size={16} strokeWidth={2.5} /></button>
        </div>

        {/* Summary */}
        <div style={{ display: "flex", gap: 8, padding: "0 16px 12px", flexShrink: 0 }}>
          {[
            { label: "Packs", value: totalPacks },
            { label: "Total spent", value: `€${totalSpent.toFixed(2)}` },
            { label: "Avg / pack", value: `€${avgPrice.toFixed(2)}` },
          ].map(s => (
            <div key={s.label} style={{ flex: 1, background: "rgba(255,255,255,0.06)", borderRadius: 10, padding: "10px 6px", textAlign: "center" }}>
              <div style={{ fontFamily: "'Black Han Sans', sans-serif", color: "#f5f0e8", fontSize: 18 }}>{s.value}</div>
              <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 10, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Add purchase */}
        <div style={{ padding: "12px 16px", borderTop: "1px solid rgba(255,255,255,0.08)", borderBottom: "1px solid rgba(255,255,255,0.08)", flexShrink: 0 }}>
          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>Add purchase</div>
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ flex: 1 }}>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 10, marginBottom: 4 }}>Packs</div>
              <input
                type="number" min="1" value={qty}
                onChange={e => setQty(e.target.value)}
                style={{ width: "100%", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, padding: "8px 10px", color: "#fff", fontSize: 16, outline: "none" }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 10, marginBottom: 4 }}>Price each (€)</div>
              <input
                type="number" min="0" step="0.01" value={price}
                onChange={e => setPrice(e.target.value)}
                style={{ width: "100%", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, padding: "8px 10px", color: "#fff", fontSize: 16, outline: "none" }}
              />
            </div>
            <div style={{ display: "flex", alignItems: "flex-end" }}>
              <button onClick={handleAdd} style={{ background: "#f5c842", color: "#0a1f0f", border: "none", borderRadius: 8, padding: "8px 14px", fontFamily: "'Black Han Sans', sans-serif", fontSize: 14, cursor: "pointer" }}>+ Add</button>
            </div>
          </div>
        </div>

        {/* History */}
        <div style={{ overflowY: "auto", padding: 12, display: "flex", flexDirection: "column", gap: 6 }}>
          {packs.length === 0 ? (
            <div style={{ textAlign: "center", color: "rgba(255,255,255,0.3)", padding: "24px 0", fontSize: 13 }}>No purchases yet</div>
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
// ─── Settings Modal ───────────────────────────────────────────────────────────
function SettingsModal({ stickers, packs, promised, onImport, onClose }) {
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
            <div style={{ fontFamily: "'Black Han Sans', sans-serif", color: "#f5f0e8", fontSize: 20 }}>Settings</div>
          </div>
          <button onClick={onClose} style={{
            background: "rgba(255,255,255,0.1)", border: "none", color: "#fff",
            borderRadius: "50%", width: 32, height: 32, padding: 0, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          }}><X size={16} strokeWidth={2.5} /></button>
        </div>

        <div style={{ padding: "0 16px 32px", display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, marginBottom: 4 }}>
            Export your collection to a file and import it on another device.
          </div>

          {/* Export */}
          <button onClick={handleExport} style={{
            background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 10, padding: "14px 16px", cursor: "pointer",
            display: "flex", alignItems: "center", gap: 12, textAlign: "left",
          }}>
            <div style={{ color: "#f5c842", fontSize: 22 }}>📤</div>
            <div>
              <div style={{ color: "#f5f0e8", fontWeight: 700, fontSize: 14 }}>Export collection</div>
              <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, marginTop: 2 }}>Download a backup file</div>
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
                {imported ? "Imported!" : error ? "Invalid file" : "Import collection"}
              </div>
              <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, marginTop: 2 }}>Restore from a backup file</div>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [stickers, setStickers] = useState(loadStickers);
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
            }}>Sticker Tracker</div>
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
      }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <div>
              <div style={{ fontFamily: "'Black Han Sans', sans-serif", color: "#f5c842", fontSize: 22, letterSpacing: 1, lineHeight: 1 }}>WORLD CUP 2026</div>
              <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", marginTop: 2 }}>Sticker Tracker</div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
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
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 10, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>Collection</div>
              <div style={{ fontFamily: "'Black Han Sans', sans-serif", color: "#fff", fontSize: 40, lineHeight: 1, marginBottom: 4 }}>{pct}%</div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, marginBottom: 10 }}>{stats.have + stats.dup} of {stats.total} stickers</div>
              <div style={{ height: 4, background: "rgba(255,255,255,0.1)", borderRadius: 4, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${pct}%`, background: "linear-gradient(90deg, #27ae60, #f5c842)", borderRadius: 4, transition: "width 0.4s" }} />
              </div>
              <div style={{ color: "rgba(255,255,255,0.25)", fontSize: 10, marginTop: 6 }}>{stats.miss} missing</div>
            </button>

            {/* Swaps card */}
            <button onClick={() => setView(view === "duplicates" ? "all" : "duplicates")} style={{
              flex: 1, background: view === "duplicates" ? "rgba(245,166,35,0.2)" : "rgba(255,255,255,0.06)",
              borderRadius: 14, padding: "14px 12px", border: view === "duplicates" ? "1px solid #f5a623" : "1px solid transparent",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6,
              cursor: "pointer",
            }}>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 10, textTransform: "uppercase", letterSpacing: 1 }}>Swaps</div>
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
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 10, textTransform: "uppercase", letterSpacing: 1 }}>Packs</div>
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
            { key: "all", label: "All", icon: null },
            { key: "groups", label: "Groups", icon: null },
            { key: "duplicates", label: "Duplicates", icon: <Repeat2 size={12} strokeWidth={2} /> },
            { key: "missing", label: "Missing", icon: <X size={12} strokeWidth={2.5} /> },
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
                  <div style={{ fontFamily: "'Black Han Sans', sans-serif", color: "#f5f0e8", fontSize: 13 }}>SPECIAL STICKERS</div>
                  {specialDup > 0 && <div style={{ fontSize: 11, color: "#f5a623", display: "flex", alignItems: "center", gap: 3 }}><Repeat2 size={10} strokeWidth={2} /> {specialDup} dup{specialDup > 1 ? "s" : ""}</div>}
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
              Album complete!
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
                  }}>GROUP {g}</div>
                  <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8 }}>
                  {groupTeams.map(team => (
                    <StickerCard key={team.code} team={team} stickers={stickers[team.code]} onClick={() => setActiveTeam(team.code)} />
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
                    <span style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>Special Stickers</span>
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
                <div style={{ fontFamily: "'Black Han Sans', sans-serif", fontSize: 16, color: "#f5c842" }}>No duplicates yet</div>
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
                      <Repeat2 size={10} strokeWidth={2} /> {dups.length} dup{dups.length > 1 ? "s" : ""}
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
                                placeholder="Name..."
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
        <SendHorizontal size={16} strokeWidth={2} /> SHARE
      </button>

      {showSettings && <SettingsModal stickers={stickers} packs={packs} promised={promised} onImport={handleImport} onClose={() => setShowSettings(false)} />}
      {showPacks && <PacksModal packs={packs} onAdd={addPack} onRemove={removePack} onClose={() => setShowPacks(false)} />}
      {showCollection && <CollectionModal stickers={stickers} onClose={() => setShowCollection(false)} />}
      {showSpecial && <SpecialModal stickers={stickers.special} onToggle={toggleSpecial} onClose={() => setShowSpecial(false)} />}
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
        />
      )}
      {showShare && <ShareSheet stickers={stickers} promised={promised} onClose={() => setShowShare(false)} />}
    </div>
  );
}