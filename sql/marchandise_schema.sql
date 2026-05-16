CREATE TABLE CLIENT (
    id_client NUMBER PRIMARY KEY,
    nom VARCHAR2(50) NOT NULL,
    prenom VARCHAR2(50) NOT NULL,
    pays VARCHAR2(50) NOT NULL,
    premium CHAR(1) CHECK (premium IN ('O','N'))
);

CREATE TABLE CATEGORIE (
    id_categorie NUMBER PRIMARY KEY,
    nom_categorie VARCHAR2(50) NOT NULL,
    nb_produits NUMBER,
    date_creation DATE
);

CREATE TABLE COLIS (
    id_colis NUMBER PRIMARY KEY,
    date_creation DATE NOT NULL,
    pays_depart VARCHAR2(50),
    pays_destination VARCHAR2(50),
    date_estimee_arrivee DATE,
    id_client NUMBER,
    CONSTRAINT fk_colis_client FOREIGN KEY (id_client)
        REFERENCES CLIENT(id_client)
);

CREATE TABLE PRODUIT (
    id_produit NUMBER PRIMARY KEY,
    nom_produit VARCHAR2(50) NOT NULL,
    prix NUMBER(10,2),
    rabais NUMBER(5,2),
    quantite NUMBER,
    id_colis NUMBER,
    id_categorie NUMBER,
    CONSTRAINT fk_produit_colis FOREIGN KEY (id_colis)
        REFERENCES COLIS(id_colis),
    CONSTRAINT fk_produit_categorie FOREIGN KEY (id_categorie)
        REFERENCES CATEGORIE(id_categorie)
);
//CLIENTS
INSERT INTO CLIENT VALUES (1,'Bayan','Skyler','Canada','O');
INSERT INTO CLIENT VALUES (2,'Arous','Youcef','France','N');

//Categorie
INSERT INTO CATEGORIE VALUES (1,'Maison et cuisine',1,DATE '2026-03-01');
INSERT INTO CATEGORIE VALUES (2,'Electroniques',2,DATE '2026-03-01');
INSERT INTO CATEGORIE VALUES (3,'Mode',1,DATE '2026-03-01');
INSERT INTO CATEGORIE VALUES (4,'Beauté',1,DATE '2026-03-01');

//COLIS
INSERT INTO COLIS VALUES (1,DATE '2026-03-10','Canada','France',DATE '2026-03-18',1);
INSERT INTO COLIS VALUES (2,DATE '2026-03-12','Etats-Unis','Canada',DATE '2026-03-20',2);

//PRODUIT
INSERT INTO PRODUIT VALUES (1,'Air Fryer',129.99,10,1,1,1);
INSERT INTO PRODUIT VALUES (2,'Casque Bluetooth',89.99,15,1,1,2);
INSERT INTO PRODUIT VALUES (3,'Lunettes de soleil',49.99,20,2,2,3);
INSERT INTO PRODUIT VALUES (4,'Parfum',79.99,5,1,2,4);
INSERT INTO PRODUIT VALUES (5,'Ecouteurs sans fil',149.99,25,1,2,2);

SELECT p.nom_produit, c.nom_categorie
FROM PRODUIT p
INNER JOIN CATEGORIE c
ON p.id_categorie = c.id_categorie;