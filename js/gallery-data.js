/*
 * Données de la galerie — Dans l'œil de David
 * Catégories regroupées (6 univers). Le champ "cat" pilote les filtres.
 *
 * IMPORTANT : le classement et les alt-text se basent sur le CONTENU RÉEL
 * de chaque image, vérifié visuellement une par une (page d'audit fichier↔image).
 * Les NOMS DE FICHIERS NE SONT PAS FIABLES : l'export initial a mélangé
 * plusieurs fichiers (ex. "voiture_mercedes-amg-face" = un nu artistique,
 * "voiture_moto-graffiti" = un cheval, "animalier_cheval-tendresse" = une Mercedes).
 * Ne jamais se fier au nom du fichier pour ranger une photo.
 *
 * w / h = dimensions réelles, pour réserver le bon ratio (évite le saut de mise en page).
 */

const CATEGORIES = [
  { key: "all",       label: "Tout" },
  { key: "portrait",  label: "Portrait & Mode" },
  { key: "mariage",   label: "Mariage" },
  { key: "boudoir",   label: "Boudoir" },
  { key: "auto",      label: "Automobile & Sport" },
  { key: "nature",    label: "Nature & Animalier" },
  { key: "creatif",   label: "Créatif" }
];

const PHOTOS = [
  // ————— Portrait & Mode —————
  { file: "mode_femme-parapluie-portrait.webp",   cat: "portrait", w: 1440, h: 1800, alt: "Portrait d'une femme blonde sous un parapluie multicolore" },
  { file: "mode_femme-parapluie-pierre.webp",     cat: "portrait", w: 1440, h: 1800, alt: "Femme et parapluie coloré devant une façade en pierre" },
  { file: "mode_femme-veste-cuir-briques.webp",   cat: "portrait", w: 1440, h: 1800, alt: "Portrait mode, veste en cuir devant un mur de briques" },
  { file: "mode_femme-cuir-mur-briques.webp",     cat: "portrait", w: 1440, h: 1800, alt: "Femme en veste de cuir, regard intense contre un mur de briques" },
  { file: "mode_femme-portrait-cuir.webp",        cat: "portrait", w: 1440, h: 1800, alt: "Portrait rapproché, veste de cuir, ambiance urbaine" },
  { file: "mode_femme-parapluie-marches.webp",    cat: "portrait", w: 1440, h: 1800, alt: "Femme au parapluie coloré sur des marches en pierre" },
  { file: "mode_femme-parapluie-escalier.webp",   cat: "portrait", w: 1440, h: 1800, alt: "Pose dynamique avec parapluie dans un escalier" },
  { file: "mode_femme-parapluie-arche.webp",      cat: "portrait", w: 1440, h: 1800, alt: "Femme au parapluie sous une arche ancienne" },
  { file: "mode_femme-pensive-mur.webp",          cat: "portrait", w: 1440, h: 1800, alt: "Portrait pensif appuyé contre un mur de briques" },
  { file: "mode_femme-assise-marches.webp",       cat: "portrait", w: 1440, h: 1800, alt: "Femme accroupie sur des marches, lumière naturelle" },
  { file: "mode_femme-rue-paisley.webp",          cat: "portrait", w: 1440, h: 1800, alt: "Mode de rue, jupe imprimée et veste de cuir" },
  { file: "famille_famille-arbre.webp",           cat: "portrait", w: 1440, h: 1440, alt: "Portrait de famille en noir et blanc autour d'un arbre" },
  // Octobre Rose : portraits studio engagés
  { file: "cosplay_sorciere-graffiti.webp",       cat: "portrait", w: 1440, h: 1440, alt: "Portrait Octobre Rose, gants de boxe et ruban rose" },
  { file: "engage_octobre-rose-gants.webp",       cat: "portrait", w: 1440, h: 1440, alt: "Portrait Octobre Rose, ruban rose et geste de cœur" },

  // ————— Mariage —————
  { file: "mariage_mariee-robe-sourire.webp",     cat: "mariage",  w: 1440, h: 1920, alt: "Mariée souriante en robe blanche pendant les préparatifs" },
  { file: "mariage_mariee-dos-robe.webp",         cat: "mariage",  w: 1440, h: 1920, alt: "Laçage de la robe de mariée pendant l'habillage" },
  { file: "mariage_mariee-coiffure.webp",         cat: "mariage",  w: 1440, h: 1920, alt: "Coiffure de mariée fleurie en cours de préparation" },

  // ————— Boudoir —————
  { file: "voiture_mercedes-amg-face.webp",       cat: "boudoir",  w: 1440, h: 954,  alt: "Nu artistique en noir et blanc au bord de l'eau" },
  { file: "boudoir_nu-artistique-herbes.webp",    cat: "boudoir",  w: 1080, h: 1440, alt: "Portrait sensuel dans les hautes herbes au coucher du soleil" },
  { file: "engage_octobre-rose-coeur.webp",       cat: "boudoir",  w: 1440, h: 961,  alt: "Portrait boudoir, chevelure rousse, lumière douce" },

  // ————— Automobile & Sport —————
  { file: "voiture_lamborghini-orange-face.webp", cat: "auto",     w: 1440, h: 961,  alt: "Lamborghini Gallardo orange de face dans un garage" },
  { file: "voiture_lamborghini-orange-garage.webp",cat:"auto",     w: 1440, h: 961,  alt: "Lamborghini orange devant un hangar, composition cinématographique" },
  { file: "voiture_lamborghini-phare.webp",       cat: "auto",     w: 1440, h: 961,  alt: "Lamborghini orange et voitures de sport sur un parking" },
  { file: "boudoir_portrait-rousse-glamour.webp", cat: "auto",     w: 1440, h: 961,  alt: "Capot et phare d'une Lamborghini orange" },
  { file: "voiture_lamborghini-jante.webp",       cat: "auto",     w: 1440, h: 961,  alt: "Détail de la jante d'une Lamborghini orange" },
  { file: "voiture_lamborghini-logo.webp",        cat: "auto",     w: 1440, h: 961,  alt: "Logo Lamborghini en gros plan" },
  { file: "voiture_jante-mercedes-amg.webp",      cat: "auto",     w: 1440, h: 954,  alt: "Détail de jante Mercedes-AMG sur fond noir" },
  { file: "animalier_cheval-tendresse.webp",      cat: "auto",     w: 1440, h: 954,  alt: "Mercedes-AMG noire de face, ambiance nocturne" },
  { file: "boudoir_nu-artistique-foret.webp",     cat: "auto",     w: 1440, h: 954,  alt: "Moto et pilote devant un mur de graffitis" },
  { file: "sport_moto-drift-fumee.jpg",           cat: "auto",     w: 1152, h: 1440, alt: "Stunt moto dans un nuage de fumée de pneu" },
  { file: "sport_drift-nissan-torque.jpg",        cat: "auto",     w: 1440, h: 1919, alt: "Nissan 370Z en drift sur piste mouillée" },
  { file: "sport_drift-bmw-noire.jpg",            cat: "auto",     w: 1440, h: 1919, alt: "BMW noire en drift sous un ciel d'orage" },
  { file: "sport_drift-bmw-grise.jpg",            cat: "auto",     w: 1440, h: 1920, alt: "BMW grise en glisse, paysage automnal" },

  // ————— Nature & Animalier —————
  { file: "voiture_moto-graffiti.webp",           cat: "nature",   w: 1440, h: 1031, alt: "Moment de tendresse entre une femme et un cheval à l'écurie" },
  { file: "famille_couple-senior-promenade.webp", cat: "nature",   w: 1440, h: 1800, alt: "Couple de seniors en promenade dans une allée arborée" },

  // ————— Créatif —————
  { file: "cosplay_personnage-arsenic.webp",      cat: "creatif",  w: 1440, h: 1919, alt: "Personnage de sorcière, maquillage artistique, mur sombre" },
  { file: "cosplay_sorciere-portrait.webp",       cat: "creatif",  w: 1440, h: 1919, alt: "Sorcière tenant une fiole d'Arsenic, lumière verte" },
  { file: "cosplay_sorciere-feuilles.webp",       cat: "creatif",  w: 1440, h: 1919, alt: "Portrait rapproché d'un personnage fantastique encapuchonné" },
  { file: "cosplay_sorciere-feuilles-2.webp",     cat: "creatif",  w: 1440, h: 1919, alt: "Sorcière dans un tourbillon de feuilles, scène mystique" }
];
