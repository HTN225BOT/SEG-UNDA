// Contenus pédagogiques de démarrage. À faire valider/adapter au syllabus officiel de l'UNDA.
export const courseCatalog = {
  "L1|Économie générale": {
    status: "contenu pilote — à valider par l'équipe pédagogique",
    intro: "Ce module présente les notions de base qui permettent de comprendre les choix économiques, la production et les échanges.",
    chapters: [
      {title:"Introduction à l'économie",objectives:["Définir l'économie et son objet d'étude.","Comprendre la rareté et le coût d'opportunité.","Distinguer besoins, biens et services."],sections:[["Qu'est-ce que l'économie ?","L'économie étudie la manière dont les individus et les sociétés utilisent des ressources limitées pour satisfaire des besoins nombreux. Elle analyse notamment la production, la répartition et la consommation des biens et services."],["La rareté et les choix","Les ressources (temps, travail, capital, matières premières) sont limitées. La rareté oblige à faire des choix. Le coût d'opportunité désigne la valeur de la meilleure option à laquelle on renonce lorsqu'on choisit une autre possibilité."],["Besoins, biens et services","Un besoin est un sentiment de manque. Un bien est un objet matériel qui peut satisfaire un besoin ; un service est une prestation immatérielle. Les biens économiques sont généralement rares et nécessitent des ressources pour être produits."]],summary:"L'économie étudie les choix réalisés sous contrainte de ressources. La rareté implique des arbitrages et donc un coût d'opportunité."},
      {title:"Les agents et les opérations économiques",objectives:["Identifier les principaux agents économiques.","Distinguer consommation, production et investissement.","Comprendre le rôle des échanges."],sections:[["Les ménages","Les ménages consomment des biens et services et fournissent notamment du travail. Ils perçoivent des revenus (salaires, revenus du patrimoine, prestations) qu'ils répartissent entre consommation et épargne."],["Les entreprises et les administrations","Les entreprises produisent des biens et services marchands. Les administrations publiques fournissent des services non marchands, organisent des services collectifs et réalisent des opérations de redistribution."],["Les opérations économiques","Les opérations peuvent concerner la production, la consommation, l'investissement, la répartition des revenus et le financement. Les échanges relient les agents au sein de l'économie."]],summary:"Les ménages, les entreprises, les administrations publiques et le reste du monde interagissent par des opérations de production, consommation, répartition et financement."},
      {title:"Le marché et la formation des prix",objectives:["Définir un marché.","Expliquer les rôles de l'offre et de la demande.","Interpréter simplement un prix d'équilibre."],sections:[["La notion de marché","Un marché est un espace réel ou virtuel où se rencontrent des offreurs et des demandeurs pour échanger un bien, un service ou un facteur de production."],["L'offre et la demande","La demande représente les quantités que les acheteurs souhaitent acquérir à différents prix. L'offre représente les quantités que les vendeurs souhaitent proposer. Toutes choses égales par ailleurs, une hausse du prix tend généralement à réduire la quantité demandée et à augmenter la quantité offerte."],["Le prix d'équilibre","Dans le modèle concurrentiel simple, le prix d'équilibre correspond au niveau auquel la quantité offerte égale la quantité demandée. Une pénurie ou un excédent peut exercer une pression sur le prix. Les marchés réels peuvent toutefois s'écarter de ce modèle."]],summary:"Dans le modèle simple du marché, le prix coordonne les décisions des acheteurs et des vendeurs ; l'équilibre se situe lorsque offre et demande se correspondent."}
    ],
    exercises:[
      {question:"Une étudiante choisit de consacrer deux heures à réviser plutôt qu'à travailler. Comment appelle-t-on la valeur de la meilleure option abandonnée ?",answer:"Le coût d'opportunité.",explanation:"Le coût d'opportunité est la valeur de la meilleure alternative à laquelle on renonce."},
      {question:"Quel agent économique produit principalement des biens et services marchands ?",answer:"L'entreprise.",explanation:"Les entreprises réalisent principalement une production marchande, vendue à un prix économiquement significatif."},
      {question:"Un étudiant dispose de 10 000 F CFA. Il peut acheter un manuel à 7 000 F CFA ou participer à une sortie qui lui coûte 6 000 F CFA. S'il achète le manuel, quelle est la meilleure option abandonnée et son coût d'opportunité ?",answer:"La sortie, d'un coût de 6 000 F CFA.",explanation:"Le coût d'opportunité correspond à la meilleure alternative abandonnée, ici la sortie à 6 000 F CFA. Il ne correspond pas automatiquement au prix du manuel."},
      {question:"Dans une économie simplifiée, les ménages fournissent du travail aux entreprises et reçoivent des salaires. Comment appelle-t-on cette rémunération ?",answer:"Un revenu du travail, généralement un salaire.",explanation:"Le travail est un facteur de production fourni par les ménages. Les entreprises rémunèrent ce facteur par des salaires."},
      {question:"On suppose une demande Qd = 100 − 2P et une offre Qs = 20 + 2P. Déterminez le prix et la quantité d'équilibre.",answer:"P = 20 et Q = 60.",explanation:"À l'équilibre, Qd = Qs : 100 − 2P = 20 + 2P, donc 80 = 4P et P = 20. En remplaçant : Q = 100 − 2 × 20 = 60 unités. Ce résultat vaut dans ce modèle simplifié."}
    ],
    quiz:[
      {q:"Quel est le problème central étudié par l'économie ?",options:["La rareté et les choix","Uniquement la monnaie","Uniquement les entreprises"],correct:0,why:"L'économie étudie les choix effectués avec des ressources limitées."},
      {q:"Quel agent fournit notamment du travail et consomme des biens et services ?",options:["Les ménages","La banque centrale uniquement","Les administrations uniquement"],correct:0,why:"Les ménages sont à la fois consommateurs et fournisseurs de facteurs de production, notamment le travail."},
      {q:"Dans le modèle concurrentiel simple, que signifie l'équilibre du marché ?",options:["L'offre est toujours nulle","La quantité offerte égale la quantité demandée","Le prix est toujours fixé par l'État"],correct:1,why:"Le prix d'équilibre égalise la quantité offerte et la quantité demandée dans ce modèle."},
      {q:"Une hausse du prix d'un bien entraîne généralement, toutes choses égales par ailleurs :",options:["Une hausse de la quantité demandée","Une baisse de la quantité demandée","La disparition automatique de la demande"],correct:1,why:"La loi de la demande décrit une relation généralement décroissante entre le prix et la quantité demandée, toutes choses égales par ailleurs."},
      {q:"Dans l'exercice Qd = 100 − 2P et Qs = 20 + 2P, quel est le prix d'équilibre ?",options:["10","20","40"],correct:1,why:"L'égalité 100 − 2P = 20 + 2P donne 80 = 4P, donc P = 20."}
    ]
  }
  ,
  "L1|Comptabilité générale": {
    status: "contenu pédagogique provisoire — à valider par l'équipe pédagogique",
    intro: "Ce cours d'initiation présente le rôle de la comptabilité, les principes de base de l'enregistrement et la logique du bilan et du compte de résultat.",
    chapters: [
      {title:"Rôle et principes de la comptabilité",objectives:["Expliquer l'utilité de l'information comptable.","Identifier les principaux utilisateurs des comptes.","Comprendre le principe de la partie double."],sections:[["Définition et rôle","La comptabilité est un système organisé qui permet d'enregistrer les opérations d'une entité, de suivre son patrimoine et de mesurer son activité. Elle produit une information utile à la gestion et à la prise de décision."],["Les utilisateurs de l'information comptable","Les dirigeants utilisent les comptes pour piloter l'activité. Les associés, prêteurs, fournisseurs, salariés et administrations peuvent également s'appuyer sur les informations comptables selon leurs besoins."],["La partie double","Une opération est enregistrée au moyen d'au moins deux mouvements de même montant : un débit et un crédit. Cette règle contribue à maintenir l'équilibre des écritures. Débit et crédit ne signifient pas automatiquement diminution et augmentation : leur effet dépend de la catégorie du compte."]],summary:"La comptabilité organise l'information financière. La partie double impose l'égalité entre le total des débits et celui des crédits pour chaque écriture."},
      {title:"Le bilan : patrimoine de l'entreprise",objectives:["Distinguer actif et passif.","Classer quelques éléments patrimoniaux simples.","Comprendre l'égalité fondamentale du bilan."],sections:[["L'actif","L'actif regroupe les ressources économiques contrôlées par l'entité : immobilisations, stocks, créances et disponibilités, par exemple."],["Le passif","Le passif présente les ressources qui financent l'actif. Il comprend notamment les capitaux propres et les dettes envers les banques, fournisseurs ou autres tiers."],["L'équilibre du bilan","Le bilan respecte l'égalité : Actif = Capitaux propres + Dettes. Il décrit une situation à une date précise et non la performance sur toute une période."]],summary:"Le bilan photographie le patrimoine à une date donnée. L'actif décrit les emplois et le passif les ressources de financement."},
      {title:"Le compte de résultat : mesurer l'activité",objectives:["Distinguer charges et produits.","Comprendre la formation du résultat.","Faire la différence entre bilan et compte de résultat."],sections:[["Les charges","Les charges correspondent aux consommations et coûts supportés dans le cadre de l'activité : achats consommés, loyers, salaires ou frais de transport, par exemple."],["Les produits","Les produits représentent les ressources générées par l'activité, notamment les ventes de biens et prestations de services. Ils sont enregistrés indépendamment de leur encaissement immédiat."],["Le résultat","Résultat = Total des produits − Total des charges. Si les produits dépassent les charges, l'entité réalise un bénéfice ; dans le cas contraire, elle constate une perte. Le compte de résultat porte sur une période."]],summary:"Le compte de résultat explique la performance sur une période : les produits moins les charges donnent le bénéfice ou la perte."}
    ],
    exercises:[{question:"Une entreprise possède du matériel, des stocks et de l'argent en banque. Dans quelle partie du bilan ces éléments sont-ils présentés ?",answer:"À l'actif du bilan.",explanation:"Ce sont des éléments de patrimoine contrôlés par l'entreprise et présentés parmi ses actifs."},{question:"Une entreprise réalise 2 500 000 F CFA de produits et 1 900 000 F CFA de charges. Quel est son résultat ?",answer:"600 000 F CFA de bénéfice.",explanation:"Résultat = 2 500 000 − 1 900 000 = 600 000 F CFA. Les produits sont supérieurs aux charges."}],
    quiz:[{q:"Quel est le rôle principal de la comptabilité ?",options:["Enregistrer et communiquer une information financière","Fixer tous les prix du marché","Remplacer les décisions du dirigeant"],correct:0,why:"La comptabilité fournit une information structurée sur le patrimoine et l'activité."},{q:"Où présente-t-on généralement les dettes envers les fournisseurs dans le bilan ?",options:["À l'actif","Au passif","Dans les produits"],correct:1,why:"Les dettes sont des ressources de financement et figurent au passif."},{q:"Comment calcule-t-on le résultat comptable simplifié ?",options:["Charges moins actif","Produits moins charges","Passif moins trésorerie"],correct:1,why:"Le résultat est égal aux produits diminués des charges sur la période."}]
  }
  ,
  "L1|Mathématiques": {
    status: "contenu pédagogique provisoire — trame générale à confronter au syllabus officiel de l'UNDA",
    intro: "Ce parcours de remise à niveau présente des outils mathématiques utiles aux études d'économie et de gestion : calcul numérique, pourcentages, algèbre, équations et fonctions simples. L'ordre et le niveau des notions devront être adaptés au programme officiel.",
    chapters: [
      {
        title: "Calcul numérique, fractions et pourcentages",
        objectives: [
          "Effectuer les opérations usuelles en respectant les priorités.",
          "Simplifier et calculer avec des fractions.",
          "Calculer une proportion, un taux d'évolution et une valeur après variation."
        ],
        sections: [
          ["Priorités opératoires", "Dans une expression, on traite d'abord les parenthèses, puis les puissances, ensuite les multiplications et divisions, et enfin les additions et soustractions. À priorité égale, on calcule de gauche à droite. Exemple : 8 + 3 × 4 = 8 + 12 = 20, et non 44."],
          ["Fractions", "Une fraction a/b représente le quotient de a par b, avec b différent de zéro. Pour additionner deux fractions, on les met au même dénominateur. Pour multiplier, on multiplie les numérateurs entre eux et les dénominateurs entre eux. Exemple : 1/2 + 1/3 = 3/6 + 2/6 = 5/6."],
          ["Proportions et pourcentages", "Un taux de t % correspond au coefficient t/100. Calculer 15 % de 80 000 F CFA revient à calculer 0,15 × 80 000 = 12 000 F CFA. Une hausse de t % multiplie la valeur initiale par 1 + t/100 ; une baisse de t % la multiplie par 1 − t/100."],
          ["Taux d'évolution", "Le taux d'évolution entre une valeur initiale V0 et une valeur finale V1 est (V1 − V0) / V0, à condition que V0 soit non nul. On multiplie le résultat par 100 pour l'exprimer en pourcentage. Une hausse de 10 % suivie d'une baisse de 10 % ne ramène pas à la valeur initiale : les coefficients multiplicateurs se multiplient."]
        ],
        summary: "Maîtriser les fractions, les priorités et les pourcentages est indispensable pour lire des données économiques et effectuer des calculs fiables. Pour une variation, utiliser un coefficient multiplicateur permet d'éviter les erreurs."
      },
      {
        title: "Calcul littéral, équations et inéquations",
        objectives: [
          "Réduire et développer des expressions algébriques simples.",
          "Résoudre une équation du premier degré.",
          "Résoudre une inéquation simple et interpréter son ensemble de solutions."
        ],
        sections: [
          ["Expressions littérales", "Une lettre représente une valeur inconnue ou variable. Réduire une expression consiste à regrouper les termes semblables : 3x + 2x − 4 = 5x − 4. Développer consiste à utiliser la distributivité : a(b + c) = ab + ac. Ainsi, 3(x + 2) = 3x + 6."],
          ["Équation du premier degré", "Une équation est une égalité contenant une inconnue. Pour résoudre 3x + 5 = 20, on soustrait 5 aux deux membres : 3x = 15, puis on divise par 3 : x = 5. Une transformation correcte conserve l'égalité."],
          ["Vérification d'une solution", "Après avoir trouvé une valeur, on peut la remplacer dans l'équation de départ. Pour x = 5 dans 3x + 5 = 20, on obtient 3 × 5 + 5 = 20 : l'égalité est vérifiée."],
          ["Inéquations", "Une inéquation utilise les signes <, >, ≤ ou ≥. On peut ajouter ou soustraire un même nombre aux deux membres. On peut multiplier ou diviser par un nombre positif sans changer le sens du signe. En multipliant ou divisant par un nombre négatif, il faut inverser le sens de l'inégalité. Exemple : −2x < 6 équivaut à x > −3."]
        ],
        summary: "Le calcul littéral permet de représenter une situation avec des variables. Pour résoudre une équation, on isole l'inconnue en conservant l'égalité ; pour une inéquation, attention au changement de sens lors d'une division par un nombre négatif."
      },
      {
        title: "Fonctions et applications économiques simples",
        objectives: [
          "Comprendre la notion de fonction et lire une image.",
          "Calculer l'image et rechercher un antécédent dans des exemples simples.",
          "Étudier une fonction affine et interpréter ses paramètres."
        ],
        sections: [
          ["Notion de fonction", "Une fonction associe à chaque valeur x de son domaine une unique valeur notée f(x). La valeur f(x) est l'image de x. Si f(x) = 2x + 3, alors l'image de 4 est f(4) = 2 × 4 + 3 = 11."],
          ["Antécédent", "Un antécédent d'une valeur y est une valeur x telle que f(x) = y. Pour f(x) = 2x + 3, chercher l'antécédent de 11 revient à résoudre 2x + 3 = 11, donc x = 4."],
          ["Fonction affine", "Une fonction affine s'écrit f(x) = ax + b. Le nombre a est le coefficient directeur et décrit la variation de la fonction lorsque x augmente d'une unité ; b est l'ordonnée à l'origine. Si a est positif, la fonction est croissante ; si a est négatif, elle est décroissante ; si a est nul, elle est constante."],
          ["Exemple d'application", "Une entreprise supporte un coût fixe de 50 000 F CFA et un coût variable de 1 200 F CFA par unité produite. Dans ce modèle simplifié, le coût total pour q unités est C(q) = 1 200q + 50 000. Pour q = 20, C(20) = 74 000 F CFA. Ce modèle suppose que le coût variable unitaire reste constant."],
          ["Lire un tableau de valeurs", "Un tableau de valeurs associe à plusieurs valeurs de x les valeurs correspondantes de f(x). Il permet de repérer des évolutions et de représenter graphiquement une fonction. Il faut toujours vérifier les unités et le contexte des variables."]
        ],
        summary: "Une fonction modélise une relation entre deux grandeurs. Les fonctions affines sont particulièrement utiles pour représenter des situations simples de coûts, recettes ou quantités, sous réserve des hypothèses du modèle."
      }
    ],
    exercises: [
      {question:"Calculez 8 + 3 × (12 − 4) ÷ 2.",answer:"20.",explanation:"On calcule d'abord la parenthèse : 12 − 4 = 8. Puis la multiplication et la division de gauche à droite : 3 × 8 ÷ 2 = 24 ÷ 2 = 12. Enfin 8 + 12 = 20."},
      {question:"Un article coûte 40 000 F CFA. Son prix augmente de 15 %. Quel est son nouveau prix ?",answer:"46 000 F CFA.",explanation:"La hausse vaut 0,15 × 40 000 = 6 000 F CFA. Le nouveau prix est 40 000 + 6 000 = 46 000 F CFA, soit 40 000 × 1,15."},
      {question:"Résolvez l'équation 4x − 7 = 21.",answer:"x = 7.",explanation:"On ajoute 7 aux deux membres : 4x = 28. On divise par 4 : x = 7. Vérification : 4 × 7 − 7 = 21."},
      {question:"Résolvez l'inéquation −3x ≤ 12.",answer:"x ≥ −4.",explanation:"On divise les deux membres par −3. Comme le diviseur est négatif, on inverse le sens du signe : x ≥ −4."},
      {question:"Une entreprise a un coût total C(q) = 1 500q + 30 000, en F CFA. Calculez le coût pour 12 unités et expliquez le rôle de 30 000.",answer:"C(12) = 48 000 F CFA. Le montant 30 000 F CFA représente le coût fixe du modèle.",explanation:"C(12) = 1 500 × 12 + 30 000 = 18 000 + 30 000 = 48 000 F CFA. Le terme constant ne dépend pas de la quantité q : il représente ici le coût fixe supposé."}
    ],
    quiz: [
      {q:"Combien vaut 20 % de 50 000 F CFA ?",options:["5 000 F CFA","10 000 F CFA","20 000 F CFA"],correct:1,why:"20 % = 0,20 et 0,20 × 50 000 = 10 000 F CFA."},
      {q:"Quelle est la forme développée de 4(x + 3) ?",options:["4x + 3","4x + 12","x + 12"],correct:1,why:"La distributivité donne 4 × x + 4 × 3 = 4x + 12."},
      {q:"Quelle est la solution de 2x + 6 = 14 ?",options:["x = 3","x = 4","x = 10"],correct:1,why:"On soustrait 6 : 2x = 8, puis on divise par 2 : x = 4."},
      {q:"Lorsqu'on divise les deux membres d'une inéquation par un nombre négatif :",options:["Le signe reste toujours identique","Le signe de l'inégalité s'inverse","L'inéquation n'a plus de solution"],correct:1,why:"La division par un nombre négatif inverse le sens de l'inégalité."},
      {q:"Pour f(x) = 3x − 2, quelle est l'image de 5 ?",options:["13","15","17"],correct:0,why:"f(5) = 3 × 5 − 2 = 15 − 2 = 13."}
    ]
  }

};