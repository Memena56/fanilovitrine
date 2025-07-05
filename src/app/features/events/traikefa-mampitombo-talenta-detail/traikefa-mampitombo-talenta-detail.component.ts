import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-traikefa-mampitombo-talenta-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './traikefa-mampitombo-talenta-detail.component.html',
  styleUrls: ['./traikefa-mampitombo-talenta-detail.component.css']
})
export class TraikefaMampitomboTalentaDetailComponent {
  showAll = false;
  expandedIndexes = new Set<number>();

  cards = [
    {
      title: 'Free Being Me',
      image: 'FBM 15cm.png',
      content: `Free Being Me (FBM) dia fandaharam-panabeazana izay mampiroborobo izao tontolo izao ho afaka amin’ny tebiteby ateraky ny bika aman’endrika. Nanomboka tamin’ny taona 2013 ny FBM, novolavolaina niaraka tamin’ny fiaraha-miasa amin’ny Skoto Zazavavy maneran-tany (WAGGGS), Dove Self-Esteem Project (DSEP), ary ny Centre of Appearance Research (CAR). Hatramin’izay, dia tovovavy sy vehivavy enina tapitrisa mahery amin’ny firenena 80 no nahazo fahatokisan-tena bebe kokoa momba ny vatany ary nanampy ny hafa hahatsapa toy izany koa. Anisan’izany ny Fanilon’i Madagasikara. Efa nisitrika io fandaharam-panabeazana io daholo ny Diosezy rehetra izay manampy azy ireo hatoky tena. `
    },
    {
      title: 'Action on Body Confidence',
      image: 'ACC.png',
      content: `Action on Body Confidence (ABC) dia fandaharam-panabeazana izay nentina nanatsara ny Free Being Me (FBM) izay fiaraha-miasa iray ihany. Fa rehefa manana ny fahatokisan-tena ireo tovovavy sy vehivavy dia manampy ny hafa hanao toy izany koa. Ka manao asa firotsahana eo anivon’ny Fiaraha-monina.`
    },
    {
      title: 'Surf Smart',
      image: 'SS 15cm.png',
      content: `Surf Smart dia fandaharam-panabeazana izay vatsin’ny Norton, izay mpitarika maneran-tany eo amin’ny sehatry ny fiarovana ara-nomerika ho an’ny mpanjifa. Nanokan-tena i Norton hanampy amin’ny fiarovana ny fitaovana, ny maha-izy azy, ny fiainana manokana amin’ny aterineto, ary ny filàn’ny tokantrano sy fianakaviana, ho an’ny mpanjifa manodidina ny 50 tapitrisa. Manome fiarovana azo itokisana izy ireo ao anatin’izao tontolo nomerika sarotra izao.  Koa, anisan’ny misitraka izany ny Fanilon’I Madagasaikara amin’ny alalàn’ny Surf Smart.
Surf Smart 2.0: Tsapa sy hita fa tena miroborobo tokoa ny teknolojia sy ny aterineto amin’izao fotoana izao , koa beazina ireo tanora mba hahay handanjalana ny fampiasana izany, hahay hiaro-tena amin’ireo karazana herisetra an-jotra ary hanaja ny tena sy ny hafa rehefa mampiasa izany. Efa nisitraka ity fandaharam-panabeazana Surf Smart ity avokoa ireo Diosezy manerana ny Nosy eto anivon’ny Fikambanana.
Manana ny mpitondra feo ihany koa ny Surf Smart (Surf Smart Advocacy) izay sehatra hahafan’ireo Fanilo mitondra feo, manao haitaky hanovana zava-misy iray mikasika ny olan’ny teknolojia.`
    },
    {
      title: 'Girl Powered Nutrition',
      image: 'GPN 15cm.png',
      content: `Ny Girl Powered Nutrition (GPN) dia fandaharam-panabeazana izay antsoina hoe «Ankizivavy matanjaka amin’ny fanjarian-tsakafo» izay iaraha-miasa amin’ny Nutrition International. Ny Skoto Zazavavy maneran-tany dia nanao ity fandaharam-panabeazana ity satria ny tsy fanjarian-tsakafo dia antony iray mahatonga ny tsy fitovian-jo izay heverina fa ny zazavavy dia ambany lanja kokoa mihoatra ny zazalahy amin’ny fanjarian-tsakafo. Ankoatra ny fianarana momba ny sakafo ara-pahasalamana sy maroloko, dia ampiana ihany koa ny zazavavy hiatrika sy hanongotra ny fototry ny tsy fanjarian-tsakafo amin’ny sehatra rehetra misy azy. Efa nisitraka ity fandaharam-panabeazana ity avokoa ireo Diosezy eto anivon’ny Fikambanana. Isika Fanilon’i Madagasikara ihany koa dia miara-miasa amin’ireo mpiara-miombon’antoka maro hafa toy ny UNICEF izay fiarahana mamaha ireo olana misy amin’ny tsy fanjarian-tsakafo toy ny any Atsimon’ny Madagasikara, ny SOAFITSANGA izay nivelatra tamin’ny Faritra maro ihany koa. Maro koa ireo mpiara-miombon’antoka miara-miasa toy ny ONN, PAM sy ireo Ministera maro ao anatin’izany: Ministeran’ny Fanabeazam-pirenena, Ministeran’ny Tanora sy ny Fanatanjahantena; Ministeran’ny Rano; Ministeran’ny Fambolena sy ny Fiompiana...`
    },
    {
      title: 'Menstrual Hygiene Management',
      image: 'MHM 15cm.png',
      content: `Menstrual Hygiene Management (MHM) dia fandaharam-panabeazana avy amin’ny Skoto Zazavavy maneran-tany izay miara-miasa amin’ny Wash United. Manerana an’izao tontolo dia hita sy tsapa fa sakana lehibe tsy ahafahan’izy ireo manararaotra tanteraka ny fiainany ny tsingerin’ny fadimbolana isam-bolana amin’ny alalàn’ireo herisetra maro mianjady aminy manoloana izany, ireo kolontsaina sy fady isan-karazany izay mbola hanaovana ny Haitaky ihany koa manoloana an’izay. Manabe ireo zazavavy sy tovovavy hahafantatra ny mikasika ny Fabimbolana, miady amin’ireo sakana maro atrehin’izy ireo mandritran’izany izay manomboka amin’ny vidin’ireo kojakoja ampiasaina mandritran’ny fadimbolana ka hatramin’ny fanilikilihana ara-tsosialy. Manoro azy ireo ihany koa ny fanamboarana ireo fitaovana ilaina amin’izany, ny fahadiovana mandritran’izany fa indrindra ny mirehareha fa voajanahary ary tsy maha menatra ny tonga fotoana. Ny Fanilon’i Madagasikara ihany koa dia manana toerana iray famokarana ireo salaka lamba antsoina hoe «Atelier Shop Fanilo» izay fiaraha-miasa tamin’ny «US Embassy» izay hita fa tena mivoatra. Amin’izao dia manao ireo fitaovana maro ilain’ny Fikambanana ihany ko any “Atelier”. Nisy ihany koa ny SOAFITSANGA izay niarahana tamin’ny UNICEF izay niarahana nientana manoloana izany fitantanana ny fahadiovana mandritran’ny Fadimbolana izany. Maro koa ireo mpiara misalahy amin’izany toy ny Ministeran’ny Rano, WATERAID sy ireo hafa ka hahatrarana ny tanjona iombonana.  `
    },
    {
      title: 'Plastic Tide Turner Challenge',
      image: 'PTTC 15cm.png',
      content: `Plastic Tide Turner Challenge (PTTC) dia fandaharam-panabeazana ato anivon’yn Skoto Zazavavy maneran-tany ka anisan’ny misitraka izany ny Fanilon’i Madagasikara. PTTC dia tarihin’ny Fandaharan’asan’ny Firenena Mikambana momba ny Tontolo Iainana (United Nations Environment Programme UNEP), izay mikendry ny hanabe sy hampahafantatra ny tanora maneran-tany momba ny fako plastika. Omem-panabeazana sy fitaovana izy ireo mba hahafahany manova ny fitondran-tenany manokana, manentana ny fiarahamoniny, ary manangana hoavy tsaratsara kokoa ho an’ny olona sy ho an’ny planeta. Ity fandaharam-panabeazana ity dia anisan’ny andiana mari-pankasitrahana «UN Challenge Badge Series», natsangan’ny fiaraha-miasa lehibe eo amin’ny Tanora sy ny Firenena Mikambana (YUNGA), izay isan’ny ampahany lehibe amin’izany ny Skoto Zazavavy maneran-tany." Misy ihany koa ireo mpitondra feo na mpanao haitaky antsoina hoe «Wave Makers» manolona ity fandaharam-panabeazana ity ankoatry ny fampahafantarana ny fako plastika, ny fomba fanodinana sy ny fampiasana azy indray. Ny Fanilon’i Madagasikara dia anisan’ny misitraka izany rehetra izany manerana ireo Diosezy. Miara miasa amin’ireo misehatra amin’izany ihany koa ny Fanilo toy ny  Ministeran’ny Tontolo iainana, GIZ; Centre Arrupe... `
    },
    {
      title: 'YUNGA',
      image: 'assets/images/yunga.png',
      content: `YUNGA dia fiaraha-miasa misy eo amin’ny Skoto Zazavavy maneran-tany sy ny Firenena Mikambana izany hoe noforonina niaraka tamin’ny sampan-draharahan’ny Firenena Mikambana, ny fiarahamonim-pirenena ary Fikambanana hafa, ny mari-pankasitrahana YUNGA Challenge Badges dia mikendry ny hampitombo ny fahalalana, hanabe, ary hanentana sy hanova fitondran-tena ka ho lasa mpandray anjara mavitrika amin’ny fanovana eo amin’ny fiarahamonina misy anao. Misy sehatra maro hita ao amin’ny YUNGA Badge dia ireto avy: Zava-manan’aina isan-karazany (Biodiversité), Fahavitan-tena ara-tsakafo sy Fiovan’ny Toetr’andro, Fandresena ny Mosary, Ala, Sakafo Ara-pahasalamana, Fiovan’ny Toetr’andro ; Fitovian-jo; Ranomasina, Angovo azo avozina, Tany, ary Rano." Amin’izao fotoana ihany koa dia misy ny fiaraha-miasa amin’ny UNICEF; FNUAP ary ny Skoto Zazavavy maneran-tany ka hanetsika indray izany fandaharam-panabeazana izany izay hahafan’ireo Fanilo manerana ny Nosy hisitraka izany. `
    },
    {
      title: 'Girl-Led Action on Climate Change',
      image: 'GLACC.png',
      content: `Girl-Led Action on Climate Change (GLACC) dia fandaharam-panabeazana vaovao izay novolavolaina niaraka tamin’ny Sampan-draharahan’ny Sakafo sy ny Fambolena eto amin’ny Firenena Mikambana (Food and Agriculture Organization FAO) sy ny Fandaharan’asan’ny Firenena Mikambana momba ny Tontolo Iainana (United Nations Environment Programme UNEP), izay manabe an’arivony amin’ireo zazavavy sy vehivavy momba ny fiovan’ny toetr’andro sy ny fiantraikany amin’ny fitovian-jo. Ity ihany koa dia fiaraha-miasa amin’ny «AKO and the Swedish Postcode Foundation» sy ny Skoto Zazavavy manerantany. Mba hanaparitahana izany, dia mizara ny fahalalana sy fahaiza-manao azony amin’olona roa farafahakeliny ao amin’ny fiarahamoniny tsirairay avy ny vehivavy tsirairay, ary mitarika asa firotsahana  iray ho an’ny fiarahamonina araka ny safidiny.
Misy ihany koa ny fanaovana haitaky amin’ny tompon’andraikitra maro isan’ambaratongany ka vehivavy tanora voafantina no ampiofanina sy arahina torohevitra mba hitondra fanentanana sy fanovana amin’ny sehatra nasionaly, ary koa handray anjara amin’ireo fivoriambe maneran-tany toy ny Fivoriana an’ny UNFCCC COP (Conference of Parties)  sy ny Vaomieran’ny Firenena Mikambana momba ny Toetry ny Vehivavy (Commission on the Status of  Women CSW). Anisan’ny misitraka izany ny Fanilon’i Madagasikara izay mivelatra amin’ireo Diosezy 10 eto anivon’ny Fikambanana. Misy ihany koa ny fiarahana misalaha amin’ny UNICEF manoloana ilay asa firotsahana eo anivon’ny Fiaraha-monina, ny fanaovana haitaky izay mifototra amin’ny ady amin’ny fiovan’ny toetrandro.
`
    },
    {
      title: 'Stop the Violence',
      image: 'STV 15cm.png',
      content: `Stop the Violence (STV) dia anisan’ny fandaharam-panabeazana iarahana amin’ny Skoto Zazavavy maneran-tany. Ny STV ihany koa dia fanentanana iraisam-pirenena lehibe ataon’ny Skoto Zazavavy manerantany hanakana sy hampitsaharana ny herisetra atao amin’ny zazavavy sy ny tovovavy. Hatramin’ny nanombohany tamin’ny taona 2011, dia niady tamin’ny herisetra atao amin’ny zazavavy sy ny tovovavy amin’ny fiarahamona misy azy amin’ny alalan’ny Fanabeazana, fanentanana, fandresen-dahatra sy haitaky, hetsika na asa firotsahana eo anivon’ny fiarahamonina, ary fikarohana.  Maro ireo kazarana herisetra misy ka ampafantarina azy ireo izany sy ny toerana afaka manampy sy manohana raha misy ny tranga iray. Efa anisany nisehatra tamin’izany isika Fanilo manerana ny Nosy. Misy ihany koa ny fiaraha-miasa maro toy ny SOROPTIMIST International, UNICEF; Centre Arrupe; Ministeran’ny Mponina, Ministeran’ny Fitsarana amin’ny alalan’ny BFP «Brigade Féminie de Proximité». Eo am-pananganana ny ivon-toeran’ny mahery fo ihany koa isika izay toerana fihainoana «Centre d’écoute» izay hatao an-jotra sy mivantana handraisana sy hanampiana ireo iharan’izany herisetra izany ato amin’ny mpikambana sy ny fiaraha-monina ihany koa. Efa nandray anjara amin’io fandaharam-panabeazana io avokoa ireo Diosezy mandrafitra ny Fikambanana.    `
    },
    {
      title: 'STEM / YESS Girls’ Movement',
      image: 'STEM.jpg',
      content: `Ny STEM (Science Technology Engineering Mathematics) dia anisan’ny fandaharam-panabeazana nanaovan’ny Skoto Zazavavy maneran-tany fikarohana izay niarahana niasa tamin’ny Johnson & Johnson Foundation ny taona 2023. Taorian’izany dia nampiditra zany tao anatin’ny fandaharan’asa YESS ny Skoto Zazavavy maneran-tany.
Ny YESS na “Youth Exchange South to South” izay fifanakalozana ho an’ny tovovavy 18 hatramin’ny 35 taona avy aty Afrika sy Asia nanomboka ny taona 2016 hatramin’izao mandritran’ny enim-bolana ka hatramin’ny herintaona.  Tsapa fa mbola maro ireo vehivavy izay voahiliky ny Fiaraha-monina ho toy ny tsy mahavita ireo taranja siantifika kanefa ny vehivavy dia mahavita izany ihany koa ary tsara kokoa aza. Ny STEM dia natao hanentana ireo tovovavy sy vehivavy hirotsaka bebe kokoa amin’ireo sehatra ireo ary mba hahafantatra koa fa misy eo amin’ny fianana an-davanandron’ny tsirairay izany.
`
    },
  ];

  toggleReadMore(i: number) {
    this.expandedIndexes.has(i)
      ? this.expandedIndexes.delete(i)
      : this.expandedIndexes.add(i);
  }

  isExpanded(i: number): boolean {
    return this.expandedIndexes.has(i);
  }
}
