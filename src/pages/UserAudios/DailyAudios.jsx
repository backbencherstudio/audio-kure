import { useState } from "react";
import "../../layout/layout.css";
import { FaRegUser } from "react-icons/fa";
import CureSessions from "../../components/UserAudios/CureSessions";
import { useSelector } from "react-redux";
import { logOut, selectCurrentUser } from "../../redux/fetures/auth/authSlice";
import { useAppDispatch } from "../../redux/hooks";
import { Link, useNavigate } from "react-router-dom";

const DailyAudios = () => {
  const [isOpen, setIsOpen] = useState();

  const handleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLOgout = () => {
    dispatch(logOut());
    localStorage.removeItem("layout");
    navigate("/login");
  };

  return (
    <div className="area overflow-y-scroll">
      <div className="max-w-7xl mx-auto">
        <div className="relative">
          <div className="grid justify-end my-4 mx-4">
            <button onClick={handleDropdown}>
              <FaRegUser className="text-2xl" />
            </button>
          </div>
          {isOpen && (
            <div
              className="absolute right-4 w-24 bg-[#4937af] rounded-md shadow-lg py-2 
                          ring-1 ring-black ring-opacity-5 transition transform 
                          ease-out duration-300 origin-top-right z-10"
            >
              <div className="flex justify-center items-center">
                {currentUser ? (
                  <button
                    className="text-center"
                    onClick={() => {
                      handleLOgout();
                    }}
                  >
                    Log Out
                  </button>
                ) : (
                  <Link to={"/login"} className="text-center mx-auto">
                    Log In
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      
      <CureSessions />

      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia et
        deserunt cumque autem unde vel hic temporibus eius nesciunt? Reiciendis
        magnam laborum est perspiciatis illo, voluptas doloribus non quasi,
        perferendis voluptatem sunt accusantium, inventore beatae repellat.
        Culpa commodi dicta officiis aliquid libero similique necessitatibus
        quis molestiae consectetur! Natus tempora rerum perferendis molestias
        rem voluptate adipisci ad, suscipit facere cupiditate culpa pariatur.
        Fugit tempora nam quas in sit deserunt excepturi dolore inventore atque,
        quam voluptatum repellendus ad tempore, accusamus, sequi quaerat ab
        veritatis dicta. Officia ipsum voluptate totam temporibus commodi?
        Labore reprehenderit repudiandae nostrum sunt, similique illum! Itaque
        deleniti soluta doloremque corrupti vel, quod numquam repellat harum
        earum corporis atque quisquam blanditiis minima quas quos dolor maxime
        dignissimos. Optio incidunt ipsum quam nam qui odit ab. Incidunt
        voluptate odit, laudantium illo rem nobis reprehenderit voluptates
        blanditiis neque modi sed eius eum est fugiat accusamus fugit suscipit
        facere nisi ut iste at provident ipsa aut. At vitae enim eveniet
        excepturi quibusdam ullam nostrum placeat ducimus dolores fugiat maiores
        ratione modi, incidunt repellat voluptatum illo quos omnis hic
        dignissimos, iste quae. Ad animi quas similique libero! Cupiditate
        dolorem animi hic eveniet officiis minus iusto incidunt distinctio
        explicabo blanditiis ab inventore error aliquam, culpa assumenda
        quibusdam labore excepturi sunt itaque aliquid. Culpa animi voluptatem
        nihil maxime obcaecati, perferendis necessitatibus assumenda voluptatum
        molestiae inventore excepturi, optio et autem, nobis aut veniam sint
        iusto ipsam incidunt nostrum! Nemo magnam ex quam reiciendis. Tenetur
        necessitatibus suscipit inventore hic rem. Vitae expedita cupiditate a
        commodi consequatur vero ipsum officia numquam eaque quasi dolores
        tempore officiis accusantium incidunt nobis animi minus deserunt
        voluptas harum perspiciatis, nisi ab consequuntur voluptatum. Ratione
        doloremque necessitatibus ea alias voluptatum aspernatur quaerat nemo
        aliquid natus sed repellat veniam dolores aperiam corporis corrupti
        excepturi, eum a perspiciatis. Molestias voluptatem velit facere cumque
        animi quaerat neque quis esse? Animi, dignissimos ad! Nesciunt provident
        nostrum nulla aperiam eum natus earum itaque facilis, nihil, sunt magni
        modi libero beatae dolor commodi sapiente optio esse dolores illo
        reprehenderit cum ipsum. Quo tenetur iusto consequuntur, porro delectus
        non quia maxime mollitia autem velit accusantium magni est id reiciendis
        dolores sint eaque provident deleniti. Ducimus, ea iure. Beatae, eaque
        amet. Sequi nemo possimus cumque, maxime molestiae expedita. Sapiente
        tenetur temporibus, facilis consequatur nihil laudantium odio deleniti
        voluptatum magnam. Ab repellendus et vitae omnis iste hic consequatur
        quo tempore sapiente ad temporibus magni iusto tenetur rerum harum
        quaerat, sequi, eos culpa sunt excepturi aut animi libero modi dolorum.
        Necessitatibus, repudiandae. Possimus impedit beatae voluptatem eaque
        cumque quidem corrupti expedita rerum numquam doloremque, quos vitae
        incidunt? Eum deserunt, adipisci amet earum architecto quod obcaecati
        eos consequatur a perspiciatis eligendi repudiandae tempore modi magnam
        nobis similique. Veniam tempore beatae, explicabo temporibus nobis
        aspernatur quasi repellat quod provident impedit laudantium.
        Necessitatibus distinctio soluta enim sed magnam dolorum amet nam
        accusantium provident explicabo illo vero veniam laboriosam quae,
        incidunt nisi facere error at id quas! Earum saepe enim non, architecto,
        ratione sapiente, laboriosam quis libero minima nesciunt iusto fugiat
        ducimus eos laudantium quasi delectus. Animi provident nisi non. Eaque
        iste dolorum incidunt porro asperiores repellendus commodi inventore
        officiis quod enim voluptatum cumque tenetur pariatur dolor illum nisi,
        facere cupiditate deleniti officia beatae a at consectetur voluptatem
        odio! Iste distinctio at quas quibusdam, cupiditate voluptates aperiam
        amet repellendus sit, corporis soluta cumque vero eligendi magni,
        quaerat rem? Suscipit eveniet, a exercitationem pariatur mollitia hic
        magni dolorum ea, voluptatum explicabo doloribus itaque atque ipsum!
        Molestias perferendis voluptatum illo. Voluptatem accusamus fugit error
        reiciendis vel, tempora quod eveniet ducimus sint eligendi soluta quia
        autem magnam ipsam eaque non culpa. Neque quibusdam ipsum nobis ad alias
        error autem provident itaque delectus. Explicabo quasi odio asperiores
        commodi impedit facere voluptate harum molestiae, repellat possimus ut
        nihil eius quae nesciunt tenetur expedita, rem cum unde modi excepturi
        delectus tempore laudantium ea? Optio ad nemo quidem modi quaerat aut
        amet quos accusantium maxime quae aperiam officia hic, iusto cum
        similique autem ipsam itaque dolore, voluptatem expedita. Ab, facere
        doloribus. Nisi labore doloribus iusto accusantium adipisci accusamus
        hic ipsum, tenetur impedit voluptatibus voluptate perferendis molestias
        repudiandae necessitatibus? Soluta a dolorem vitae aut, similique alias
        iste dicta optio odio labore, delectus cumque nostrum commodi inventore,
        debitis cum incidunt dolorum! Est architecto unde vero sit nisi
        similique cum repudiandae autem. Odit explicabo, minima nam debitis, sit
        consequuntur beatae est nesciunt inventore natus exercitationem, ipsum
        perferendis atque necessitatibus numquam culpa quos ut impedit voluptate
        nisi. Cumque sequi distinctio veniam quis, mollitia dolorum deserunt
        repellat, asperiores totam, ipsum recusandae numquam in nihil. Facilis
        cumque molestiae totam commodi iusto cum praesentium ducimus ratione
        rerum obcaecati, ipsa deserunt voluptatibus aperiam laudantium impedit
        quaerat neque nobis velit dolores asperiores dignissimos aspernatur et?
        Dolorem dolores eius eveniet corrupti non. Numquam explicabo asperiores
        cupiditate ducimus pariatur officiis natus accusantium aliquid?
        Repudiandae doloremque, vero numquam tempora quis accusamus? Ipsam
        voluptatem est, delectus esse ex id aperiam, modi eius, blanditiis nihil
        nobis aspernatur accusamus minima veniam. Corrupti quo ipsa nihil vero,
        praesentium itaque velit, et delectus neque excepturi voluptate! Nemo
        tempora, quia illo debitis culpa fugit voluptates voluptatum qui non
        vitae eaque magnam quidem veniam maxime? Assumenda eius quae quisquam
        optio, aperiam quo ea vero dignissimos, quidem est quod officia quam
        minima, laudantium placeat. Saepe dolorem fugit, doloremque ipsa
        praesentium nisi enim obcaecati cum magnam nulla amet asperiores tenetur
        nemo minima quas iste odio qui beatae et soluta reprehenderit ea numquam
        adipisci eius. Similique fugiat aperiam, sequi, saepe illo veniam
        aliquid nostrum, quibusdam tempore soluta ipsa nisi sit enim deserunt.
        Molestias, accusamus error. Tempora molestias vel officia rem porro
        consequatur ipsa, modi, molestiae, suscipit exercitationem quas nulla.
        Explicabo dolor necessitatibus, ullam, vitae maiores voluptatem eveniet
        accusamus sapiente enim soluta aliquam placeat repellendus! Debitis
        laborum, minima ea repudiandae provident odit dolores enim, voluptas
        veritatis in aut sunt asperiores distinctio officiis neque! Blanditiis,
        dolor saepe quos magnam voluptate ipsam numquam deleniti cupiditate iure
        minus temporibus repellendus voluptas vitae molestias voluptatibus quas
        ea quis iste, excepturi iusto dolorum doloremque, aliquid libero! Harum
        doloribus magnam, vitae modi exercitationem asperiores labore ex quas
        quia ea laudantium molestias recusandae in iste voluptas eligendi at! Ab
        fuga tenetur, inventore dolor error ipsam quam dolore in recusandae
        consectetur ipsum a. Itaque quia excepturi magni ex quam asperiores
        aspernatur, repellat cupiditate velit eos sapiente quidem officiis
        quibusdam culpa quod autem! Totam, voluptatem in. Eveniet quo ad quis
        nisi asperiores aliquid corrupti maxime molestiae, error animi, ea
        repudiandae illum dolor ullam aspernatur dolore dolorem consectetur
        voluptatum corporis. Explicabo excepturi incidunt quibusdam molestias
        pariatur deleniti tenetur praesentium odit asperiores doloribus, illo
        ipsa voluptas minus temporibus facere! Fugiat atque doloribus totam
        ullam quae, dignissimos autem laboriosam adipisci! Enim voluptas quam
        unde iure deleniti exercitationem ex, magni nemo delectus soluta, eos
        sequi hic sit aperiam qui doloremque commodi consectetur totam itaque
        similique placeat officia accusamus eveniet quae? Placeat assumenda
        harum ipsum. Quaerat molestiae aspernatur tenetur omnis cupiditate
        doloremque itaque esse molestias id, aut facere quia dolore laboriosam
        eum? Iure totam odio voluptate optio deserunt. Voluptate pariatur
        placeat expedita repellendus corporis, tenetur nobis qui quasi
        consequatur nisi quas nostrum eius omnis beatae a odio excepturi ipsum?
        Odit, harum ab! Pariatur a voluptatem laborum excepturi officiis libero
        sed fugit veritatis eaque laudantium? Deserunt debitis tempora saepe
        nulla sit cupiditate facilis, vel, fugit reiciendis dolores veniam et
        eius atque? Soluta doloremque esse suscipit. Nobis tempora veniam hic
        earum laborum magni ut facere suscipit, nisi dolores autem nemo ab.
        Alias maiores omnis quos quasi itaque molestiae doloremque, illo
        deleniti accusantium dolore ratione? Obcaecati, cupiditate dolore rerum
        exercitationem repellendus quos voluptatibus quaerat voluptas molestias
        nulla, eius adipisci id quae saepe minima, libero nesciunt sint veniam?
        Doloremque autem voluptate fuga quidem esse voluptatibus, eligendi
        doloribus dignissimos voluptatem laborum ex, est illo. Possimus
        inventore nihil repudiandae repellat autem ab ipsam ipsum nulla, officia
        harum rerum dolores iure obcaecati. Neque distinctio molestias quae
        doloremque aliquam cum inventore ab accusantium, odio magnam officia
        quasi numquam vero est quibusdam sunt quos modi obcaecati qui dolore
        ipsam. Odit, numquam corrupti? Voluptatibus aliquam corporis quibusdam
        fugit eum magni. Quidem, odit mollitia. Aperiam nisi impedit, ratione
        voluptates eius soluta a, praesentium facere quos corrupti iste,
        asperiores esse suscipit modi ea nam nesciunt reprehenderit dolorem
        maiores. Sit corrupti magnam quos eveniet necessitatibus iusto qui
        adipisci quis aliquam. Odit beatae temporibus assumenda sint quia atque
        excepturi cum ducimus iusto non blanditiis sequi, eligendi veritatis
        nam! Dignissimos reiciendis, aspernatur qui deserunt totam vel numquam
        exercitationem voluptas nisi a unde soluta. Facere dolore excepturi
        voluptas ad, dignissimos possimus voluptatem. Et, pariatur! Quia impedit
        perspiciatis sit alias nisi quae vero mollitia debitis ipsa? Ut eaque
        voluptatum nam ea suscipit fuga impedit unde. Porro perferendis voluptas
        dolores ratione animi quibusdam? Saepe officia accusantium aliquid!
        Totam consectetur ipsum architecto rerum? Alias neque ex quo unde id
        quasi possimus aperiam sequi! Maiores quasi doloremque tempora id
        quaerat iure libero repellat deleniti cumque porro ab enim sed dolor
        necessitatibus ad, facere minus architecto soluta ea corporis? Placeat
        explicabo voluptatibus, eum quidem est quibusdam quos praesentium
        eveniet quam neque doloremque eaque rem sapiente esse debitis et facere
        error maxime beatae aliquid reiciendis repellat quis? Accusantium cumque
        earum asperiores eveniet pariatur sequi explicabo temporibus et quaerat,
        consequatur error, aspernatur quo atque quisquam! Dolores accusantium
        odio vitae dolor sequi saepe porro laboriosam accusamus quis quos at nam
        praesentium hic cum aliquam, iste modi labore nulla omnis repellat id.
        Ex incidunt quas alias sunt dolorum! Accusantium officiis non autem?
        Ipsum officia ullam illo assumenda doloribus fugit, doloremque sequi
        deleniti exercitationem est voluptate numquam eos id rem, magni suscipit
        iste laborum delectus tempora odio eaque porro dolore. Similique vitae,
        tempore sunt ducimus rem eum in illum quas, laboriosam at natus
        distinctio ab? Nostrum quasi laboriosam atque cupiditate, voluptatibus
        quam autem unde iure dolore natus aspernatur, expedita tempora dolorem,
        fugiat qui sit aliquid dolores excepturi. Fuga minus mollitia et, atque,
        ipsa nam quasi, nemo perferendis labore nostrum repellendus. Natus
        repellendus amet pariatur assumenda reprehenderit! Magnam iusto fuga
        iste possimus totam mollitia, vel rem corporis autem a reprehenderit
        sunt magni nemo voluptate aperiam quaerat dignissimos recusandae quis
        inventore esse ipsa sapiente. Beatae odit nihil ipsum dolor fugit
        adipisci itaque accusamus, esse aut commodi, dolore eos, excepturi
        voluptate perspiciatis magnam consequuntur accusantium! Nostrum vero
        sapiente fugit nisi incidunt iusto laudantium laborum officiis eius
        molestiae amet officia ut qui distinctio reiciendis, id tempora maxime,
        repudiandae voluptatibus explicabo unde. Consectetur corporis numquam,
        neque sint amet quo? Doloremque saepe nisi, modi a veniam officia? Eum,
        eveniet? Ipsam mollitia tempora laborum eum repellendus officiis enim id
        ex, consectetur aspernatur, aut ducimus, similique voluptates
        reiciendis. Ex quam minus, nihil atque voluptatum, esse minima, eius sit
        voluptate tenetur eos autem quisquam et! Unde earum temporibus aut? Eos,
        sed reiciendis aliquam amet deserunt ad ex repellendus laboriosam
        exercitationem cum facilis ab ratione reprehenderit eveniet temporibus
        ut praesentium placeat aut dolorum architecto voluptates possimus?
        Expedita pariatur, natus quod odit doloremque laboriosam quae, atque
        minima nobis fugit ad veritatis architecto quas tempore soluta nostrum
        omnis quidem optio magnam earum quibusdam ea eius. Dignissimos ex
        recusandae earum, libero atque tempore consequatur eius? Possimus fugit
        consequuntur ullam atque modi inventore dolores adipisci aliquid
        consectetur, quaerat maiores, vero, voluptas tempora quam et delectus
        provident illum a sapiente nulla. Facere unde fuga ab! Cumque ab vero
        autem nostrum ipsa culpa eligendi. Nulla maiores ex, ut libero autem
        laborum officiis illo explicabo enim molestias corporis cumque itaque
        dolorem alias, impedit accusantium. Dolores autem sed voluptatem esse?
        Voluptatibus, ullam dolores quaerat praesentium nemo iusto officia ab
        laborum quo tenetur architecto soluta aspernatur? Molestiae a in
        aperiam! Atque molestias earum fugit optio error architecto magnam fuga
        ducimus dignissimos? Temporibus ratione illum voluptas facere iusto
        consectetur inventore, ad modi assumenda, magnam ipsam commodi quasi. Ex
        tempore saepe perferendis natus, ipsum error accusamus laudantium alias
        nobis eligendi laboriosam placeat, et nesciunt quis? Voluptatum, aut. Ea
        a incidunt totam, fugit dolores vitae facere sapiente cupiditate
        suscipit ipsum laboriosam eligendi cum praesentium fuga vel similique
        nostrum beatae! Iusto pariatur error aperiam fugiat veritatis eum soluta
        natus ducimus fuga officia earum magnam omnis, dolore nam porro esse
        laborum tempore distinctio. Quos iste ipsa id necessitatibus sed unde
        quas facere itaque voluptas! Qui, culpa tempora voluptate magni quod
        tempore numquam.
      </p>
    </div>
  );
};

export default DailyAudios;
