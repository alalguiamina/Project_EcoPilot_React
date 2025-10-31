import React, { useState } from "react";
import "./DataEntryPage.css";
import Sidebar from "../Sidebar/Sidebar";
import boltIcon from "../Assests/bolt.png";
import trashIcon from "../Assests/trash.png";
import waterIcon from "../Assests/water.png";
import productionIcon from "../Assests/production.png";
import socialIcon from "../Assests/social.png";
import deleteIcon from "../Assests/delete.png";

function DataEntryPage() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [entries, setEntries] = useState([]);
  const [saved, setSaved] = useState(false);

  // États pour les formulaires
  const [energieData, setEnergieData] = useState({
    annee: "2025",
    mois: "",
    site: "",
    type: "",
    unite: "",
    valeur: "",
  });

  const [eauData, setEauData] = useState({
    annee: "2025",
    mois: "",
    site: "",
    familleCulture: "",
    variete: "",
    volumeEau: "",
  });

  const [dechetsData, setDechetsData] = useState({
    annee: "2025",
    mois: "",
    site: "",
    categorie: "",
    unite: "",
    valeur: "",
  });

  const [socialData, setSocialData] = useState({
    annee: "2025",
    mois: "",
    site: "",
    action: "",
    budget: "",
    beneficiaires: "",
  });

  const [productionData, setProductionData] = useState({
    annee: "2025",
    mois: "",
    site: "",
    action: "",
    budget: "",
    beneficiaires: "",
  });

  const categories = [
    { id: "energie", name: "Énergie", icon: boltIcon, color: "#eab308" },
    { id: "eau", name: "Eau", icon: waterIcon, color: "#3b82f6" },
    { id: "dechets", name: "Déchets", icon: trashIcon, color: "#22c55e" },
    { id: "social", name: "Social", icon: socialIcon, color: "#a855f7" },
    {
      id: "production",
      name: "Production",
      icon: productionIcon,
      color: "#10b981",
    },
  ];

  const mois = [
    { value: "01", label: "Janvier" },
    { value: "02", label: "Février" },
    { value: "03", label: "Mars" },
    { value: "04", label: "Avril" },
    { value: "05", label: "Mai" },
    { value: "06", label: "Juin" },
    { value: "07", label: "Juillet" },
    { value: "08", label: "Août" },
    { value: "09", label: "Septembre" },
    { value: "10", label: "Octobre" },
    { value: "11", label: "Novembre" },
    { value: "12", label: "Décembre" },
  ];

  const sites = [
    { value: "benguerir", label: "Benguerir — Ferme expérimentale" },
    { value: "settat", label: "Settat — Ferme Doukkala" },
    { value: "meknes", label: "Meknès — Domaine Oléicole" },
    { value: "agadir", label: "Agadir — Station Maraîchère" },
    { value: "errachidia", label: "Errachidia — Oasis Erfoud" },
    { value: "khouribga", label: "Khouribga — Site Énergie Verte" },
    { value: "larache", label: "Larache — Usine de transformation" },
  ];

  const handleAddLine = () => {
    let newEntry = null;

    switch (selectedCategory) {
      case "energie":
        if (!energieData.mois || !energieData.site || !energieData.type) {
          alert("Veuillez remplir tous les champs obligatoires");
          return;
        }
        newEntry = {
          id: Date.now(),
          category: "Énergie",
          ...energieData,
        };
        setEnergieData({
          annee: "2025",
          mois: "",
          site: "",
          type: "",
          unite: "",
          valeur: "",
        });
        break;
      case "eau":
        if (!eauData.mois || !eauData.site || !eauData.volumeEau) {
          alert("Veuillez remplir tous les champs obligatoires");
          return;
        }
        newEntry = {
          id: Date.now(),
          category: "Eau",
          ...eauData,
        };
        setEauData({
          annee: "2025",
          mois: "",
          site: "",
          familleCulture: "",
          variete: "",
          volumeEau: "",
        });
        break;
      case "dechets":
        if (!dechetsData.mois || !dechetsData.site || !dechetsData.valeur) {
          alert("Veuillez remplir tous les champs obligatoires");
          return;
        }
        newEntry = {
          id: Date.now(),
          category: "Déchets",
          ...dechetsData,
        };
        setDechetsData({
          annee: "2025",
          mois: "",
          site: "",
          categorie: "",
          unite: "",
          valeur: "",
        });
        break;
      case "social":
        if (!socialData.mois || !socialData.site || !socialData.action) {
          alert("Veuillez remplir tous les champs obligatoires");
          return;
        }
        newEntry = {
          id: Date.now(),
          category: "Social",
          ...socialData,
        };
        setSocialData({
          annee: "2025",
          mois: "",
          site: "",
          action: "",
          budget: "",
          beneficiaires: "",
        });
        break;
      case "production":
        if (
          !productionData.mois ||
          !productionData.site ||
          !productionData.action
        ) {
          alert("Veuillez remplir tous les champs obligatoires");
          return;
        }
        newEntry = {
          id: Date.now(),
          category: "Production",
          ...productionData,
        };
        setProductionData({
          annee: "2025",
          mois: "",
          site: "",
          action: "",
          budget: "",
          beneficiaires: "",
        });
        break;
      default:
        return;
    }

    if (newEntry) {
      setEntries([...entries, newEntry]);
    }
  };

  const handleSubmit = () => {
    if (entries.length === 0) {
      alert("Aucune donnée à soumettre");
      return;
    }
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setEntries([]);
    }, 3000);
  };

  const handleDelete = (id) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  const getSiteLabel = (value) => {
    const site = sites.find((s) => s.value === value);
    return site ? site.label.split("—")[0].trim() : value;
  };

  const getMoisLabel = (value) => {
    const m = mois.find((m) => m.value === value);
    return m ? m.label : value;
  };

  return (
    <div className="dashboard-wrapper">
      <Sidebar />
      <div className="dashboard-content">
        <div className="data-entry-page">
          <div className="page-header">
            <h1>Saisie de données</h1>
            <p>Enregistrez vos données par catégorie</p>
          </div>

          {/* Sélecteur de catégorie */}
          <div className="card">
            <div className="card-header">
              <h2>Sélectionner une catégorie</h2>
              <p className="card-description">
                Choisissez le type de données à saisir
              </p>
            </div>
            <div className="card-content">
              <div className="category-grid">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`category-btn ${
                      selectedCategory === cat.id ? "active" : ""
                    }`}
                    style={
                      selectedCategory === cat.id
                        ? {
                            backgroundColor: `${cat.color}20`,
                            borderColor: cat.color,
                            color: cat.color,
                          }
                        : {}
                    }
                  >
                    <span className="category-icon">
                      <img
                        src={cat.icon}
                        alt={cat.name}
                        style={{
                          width: "32px",
                          height: "32px",
                          objectFit: "contain",
                        }}
                      />
                    </span>
                    <span className="category-name">{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Formulaires dynamiques */}
          {selectedCategory && (
            <div className="card form-card">
              <div className="card-header">
                <h2>
                  Formulaire -{" "}
                  {categories.find((c) => c.id === selectedCategory)?.name}
                </h2>
                <p className="card-description">
                  Remplissez les champs ci-dessous
                </p>
              </div>
              <div className="card-content">
                {/* Formulaire Énergie */}
                {selectedCategory === "energie" && (
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Année</label>
                      <select
                        value={energieData.annee}
                        onChange={(e) =>
                          setEnergieData({
                            ...energieData,
                            annee: e.target.value,
                          })
                        }
                      >
                        <option value="2025">2025</option>
                        <option value="2024">2024</option>
                        <option value="2023">2023</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Mois *</label>
                      <select
                        value={energieData.mois}
                        onChange={(e) =>
                          setEnergieData({
                            ...energieData,
                            mois: e.target.value,
                          })
                        }
                      >
                        <option value="">Sélectionner</option>
                        {mois.map((m) => (
                          <option key={m.value} value={m.value}>
                            {m.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Site *</label>
                      <select
                        value={energieData.site}
                        onChange={(e) =>
                          setEnergieData({
                            ...energieData,
                            site: e.target.value,
                          })
                        }
                      >
                        <option value="">Sélectionner</option>
                        {sites.map((s) => (
                          <option key={s.value} value={s.value}>
                            {s.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Type *</label>
                      <select
                        value={energieData.type}
                        onChange={(e) =>
                          setEnergieData({
                            ...energieData,
                            type: e.target.value,
                          })
                        }
                      >
                        <option value="">Sélectionner</option>
                        <option value="Électricité">Électricité</option>
                        <option value="Gaz naturel">Gaz naturel</option>
                        <option value="Diesel">Diesel</option>
                        <option value="Solaire">Solaire</option>
                        <option value="Biomasse">Biomasse</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Unité</label>
                      <select
                        value={energieData.unite}
                        onChange={(e) =>
                          setEnergieData({
                            ...energieData,
                            unite: e.target.value,
                          })
                        }
                      >
                        <option value="">Sélectionner</option>
                        <option value="kWh">kWh</option>
                        <option value="MWh">MWh</option>
                        <option value="Litres">Litres</option>
                        <option value="m³">m³</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Valeur</label>
                      <input
                        type="number"
                        value={energieData.valeur}
                        onChange={(e) =>
                          setEnergieData({
                            ...energieData,
                            valeur: e.target.value,
                          })
                        }
                        placeholder="0"
                      />
                    </div>
                  </div>
                )}

                {/* Formulaire Eau */}
                {selectedCategory === "eau" && (
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Année</label>
                      <select
                        value={eauData.annee}
                        onChange={(e) =>
                          setEauData({ ...eauData, annee: e.target.value })
                        }
                      >
                        <option value="2025">2025</option>
                        <option value="2024">2024</option>
                        <option value="2023">2023</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Mois *</label>
                      <select
                        value={eauData.mois}
                        onChange={(e) =>
                          setEauData({ ...eauData, mois: e.target.value })
                        }
                      >
                        <option value="">Sélectionner</option>
                        {mois.map((m) => (
                          <option key={m.value} value={m.value}>
                            {m.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Site *</label>
                      <select
                        value={eauData.site}
                        onChange={(e) =>
                          setEauData({ ...eauData, site: e.target.value })
                        }
                      >
                        <option value="">Sélectionner</option>
                        {sites.map((s) => (
                          <option key={s.value} value={s.value}>
                            {s.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Famille de culture</label>
                      <select
                        value={eauData.familleCulture}
                        onChange={(e) =>
                          setEauData({
                            ...eauData,
                            familleCulture: e.target.value,
                          })
                        }
                      >
                        <option value="">Sélectionner</option>
                        <option value="Céréales">Céréales</option>
                        <option value="Oléicole">Oléicole</option>
                        <option value="Fruits & Légumes">
                          Fruits & Légumes
                        </option>
                        <option value="Dattes">Dattes</option>
                        <option value="Plantes Aromatiques">
                          Plantes Aromatiques
                        </option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Variété</label>
                      <input
                        type="text"
                        value={eauData.variete}
                        onChange={(e) =>
                          setEauData({ ...eauData, variete: e.target.value })
                        }
                        placeholder="Ex: Tomate, Blé dur..."
                      />
                    </div>

                    <div className="form-group">
                      <label>Volume d'eau (m³) *</label>
                      <input
                        type="number"
                        value={eauData.volumeEau}
                        onChange={(e) =>
                          setEauData({ ...eauData, volumeEau: e.target.value })
                        }
                        placeholder="0"
                      />
                    </div>
                  </div>
                )}

                {/* Formulaire Déchets */}
                {selectedCategory === "dechets" && (
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Année</label>
                      <select
                        value={dechetsData.annee}
                        onChange={(e) =>
                          setDechetsData({
                            ...dechetsData,
                            annee: e.target.value,
                          })
                        }
                      >
                        <option value="2025">2025</option>
                        <option value="2024">2024</option>
                        <option value="2023">2023</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Mois *</label>
                      <select
                        value={dechetsData.mois}
                        onChange={(e) =>
                          setDechetsData({
                            ...dechetsData,
                            mois: e.target.value,
                          })
                        }
                      >
                        <option value="">Sélectionner</option>
                        {mois.map((m) => (
                          <option key={m.value} value={m.value}>
                            {m.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Site *</label>
                      <select
                        value={dechetsData.site}
                        onChange={(e) =>
                          setDechetsData({
                            ...dechetsData,
                            site: e.target.value,
                          })
                        }
                      >
                        <option value="">Sélectionner</option>
                        {sites.map((s) => (
                          <option key={s.value} value={s.value}>
                            {s.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Catégorie déchets</label>
                      <select
                        value={dechetsData.categorie}
                        onChange={(e) =>
                          setDechetsData({
                            ...dechetsData,
                            categorie: e.target.value,
                          })
                        }
                      >
                        <option value="">Sélectionner</option>
                        <option value="Déchets organiques">
                          Déchets organiques
                        </option>
                        <option value="Plastiques">Plastiques</option>
                        <option value="Carton/Papier">Carton/Papier</option>
                        <option value="Métal">Métal</option>
                        <option value="Verre">Verre</option>
                        <option value="Déchets dangereux">
                          Déchets dangereux
                        </option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Unité</label>
                      <select
                        value={dechetsData.unite}
                        onChange={(e) =>
                          setDechetsData({
                            ...dechetsData,
                            unite: e.target.value,
                          })
                        }
                      >
                        <option value="">Sélectionner</option>
                        <option value="kg">Kilogrammes (kg)</option>
                        <option value="tonnes">Tonnes</option>
                        <option value="m³">Mètres cubes (m³)</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Valeur *</label>
                      <input
                        type="number"
                        value={dechetsData.valeur}
                        onChange={(e) =>
                          setDechetsData({
                            ...dechetsData,
                            valeur: e.target.value,
                          })
                        }
                        placeholder="0"
                      />
                    </div>
                  </div>
                )}

                {/* Formulaire Social */}
                {selectedCategory === "social" && (
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Année</label>
                      <select
                        value={socialData.annee}
                        onChange={(e) =>
                          setSocialData({
                            ...socialData,
                            annee: e.target.value,
                          })
                        }
                      >
                        <option value="2025">2025</option>
                        <option value="2024">2024</option>
                        <option value="2023">2023</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Mois *</label>
                      <select
                        value={socialData.mois}
                        onChange={(e) =>
                          setSocialData({ ...socialData, mois: e.target.value })
                        }
                      >
                        <option value="">Sélectionner</option>
                        {mois.map((m) => (
                          <option key={m.value} value={m.value}>
                            {m.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Site *</label>
                      <select
                        value={socialData.site}
                        onChange={(e) =>
                          setSocialData({ ...socialData, site: e.target.value })
                        }
                      >
                        <option value="">Sélectionner</option>
                        {sites.map((s) => (
                          <option key={s.value} value={s.value}>
                            {s.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Action *</label>
                      <select
                        value={socialData.action}
                        onChange={(e) =>
                          setSocialData({
                            ...socialData,
                            action: e.target.value,
                          })
                        }
                      >
                        <option value="">Sélectionner</option>
                        <option value="Formation professionnelle">
                          Formation professionnelle
                        </option>
                        <option value="Campagne santé">Campagne santé</option>
                        <option value="Soutien éducatif">
                          Soutien éducatif
                        </option>
                        <option value="Infrastructure communautaire">
                          Infrastructure communautaire
                        </option>
                        <option value="Création d'emplois">
                          Création d'emplois
                        </option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Budget (MAD)</label>
                      <input
                        type="number"
                        value={socialData.budget}
                        onChange={(e) =>
                          setSocialData({
                            ...socialData,
                            budget: e.target.value,
                          })
                        }
                        placeholder="0"
                      />
                    </div>

                    <div className="form-group">
                      <label>Nombre de bénéficiaires</label>
                      <input
                        type="number"
                        value={socialData.beneficiaires}
                        onChange={(e) =>
                          setSocialData({
                            ...socialData,
                            beneficiaires: e.target.value,
                          })
                        }
                        placeholder="0"
                      />
                    </div>
                  </div>
                )}

                {/* Formulaire Production */}
                {selectedCategory === "production" && (
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Année</label>
                      <select
                        value={productionData.annee}
                        onChange={(e) =>
                          setProductionData({
                            ...productionData,
                            annee: e.target.value,
                          })
                        }
                      >
                        <option value="2025">2025</option>
                        <option value="2024">2024</option>
                        <option value="2023">2023</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Mois *</label>
                      <select
                        value={productionData.mois}
                        onChange={(e) =>
                          setProductionData({
                            ...productionData,
                            mois: e.target.value,
                          })
                        }
                      >
                        <option value="">Sélectionner</option>
                        {mois.map((m) => (
                          <option key={m.value} value={m.value}>
                            {m.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Site *</label>
                      <select
                        value={productionData.site}
                        onChange={(e) =>
                          setProductionData({
                            ...productionData,
                            site: e.target.value,
                          })
                        }
                      >
                        <option value="">Sélectionner</option>
                        {sites.map((s) => (
                          <option key={s.value} value={s.value}>
                            {s.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Action *</label>
                      <select
                        value={productionData.action}
                        onChange={(e) =>
                          setProductionData({
                            ...productionData,
                            action: e.target.value,
                          })
                        }
                      >
                        <option value="">Sélectionner</option>
                        <option value="Achat semences">Achat semences</option>
                        <option value="Système irrigation">
                          Système irrigation
                        </option>
                        <option value="Engrais bio">Engrais bio</option>
                        <option value="Équipement agricole">
                          Équipement agricole
                        </option>
                        <option value="Certification bio">
                          Certification bio
                        </option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Budget (MAD)</label>
                      <input
                        type="number"
                        value={productionData.budget}
                        onChange={(e) =>
                          setProductionData({
                            ...productionData,
                            budget: e.target.value,
                          })
                        }
                        placeholder="0"
                      />
                    </div>

                    <div className="form-group">
                      <label>Nombre de bénéficiaires</label>
                      <input
                        type="number"
                        value={productionData.beneficiaires}
                        onChange={(e) =>
                          setProductionData({
                            ...productionData,
                            beneficiaires: e.target.value,
                          })
                        }
                        placeholder="0"
                      />
                    </div>
                  </div>
                )}

                <div className="form-actions">
                  <button className="btn-add" onClick={handleAddLine}>
                    <span>➕</span> Ajouter ligne
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tableau des entrées */}
          {entries.length > 0 && (
            <div className="card">
              <div className="card-header">
                <div className="header-with-button">
                  <div>
                    <h2>Données saisies</h2>
                    <p className="card-description">
                      {entries.length} entrée(s) en attente de soumission
                    </p>
                  </div>
                  <button className="btn-submit" onClick={handleSubmit}>
                    ✓ Soumettre tout
                  </button>
                </div>
              </div>
              <div className="card-content">
                <div className="table-wrapper">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Catégorie</th>
                        <th>Année</th>
                        <th>Mois</th>
                        <th>Site</th>
                        <th>Détails</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {entries.map((entry) => (
                        <tr key={entry.id}>
                          <td>
                            <span className="category-badge">
                              {entry.category === "Énergie" && (
                                <img
                                  src={boltIcon}
                                  alt="Énergie"
                                  style={{
                                    width: "16px",
                                    height: "16px",
                                    objectFit: "contain",
                                    marginRight: "6px",
                                    verticalAlign: "middle",
                                  }}
                                />
                              )}
                              {entry.category === "Eau" && (
                                <img
                                  src={waterIcon}
                                  alt="Eau"
                                  style={{
                                    width: "16px",
                                    height: "16px",
                                    objectFit: "contain",
                                    marginRight: "6px",
                                    verticalAlign: "middle",
                                  }}
                                />
                              )}
                              {entry.category === "Déchets" && (
                                <img
                                  src={trashIcon}
                                  alt="Déchets"
                                  style={{
                                    width: "16px",
                                    height: "16px",
                                    objectFit: "contain",
                                    marginRight: "6px",
                                    verticalAlign: "middle",
                                  }}
                                />
                              )}
                              {entry.category === "Social" && (
                                <img
                                  src={socialIcon}
                                  alt="Social"
                                  style={{
                                    width: "16px",
                                    height: "16px",
                                    objectFit: "contain",
                                    marginRight: "6px",
                                    verticalAlign: "middle",
                                  }}
                                />
                              )}
                              {entry.category === "Production" && (
                                <img
                                  src={productionIcon}
                                  alt="Production"
                                  style={{
                                    width: "16px",
                                    height: "16px",
                                    objectFit: "contain",
                                    marginRight: "6px",
                                    verticalAlign: "middle",
                                  }}
                                />
                              )}
                              {entry.category}
                            </span>
                          </td>
                          <td>{entry.annee}</td>
                          <td>{getMoisLabel(entry.mois)}</td>
                          <td>{getSiteLabel(entry.site)}</td>
                          <td className="details-cell">
                            {entry.category === "Énergie" &&
                              `${entry.type} - ${entry.unite || "N/A"} - ${
                                entry.valeur || "N/A"
                              }`}
                            {entry.category === "Eau" &&
                              `${entry.familleCulture || "N/A"} - ${
                                entry.variete || "N/A"
                              } - ${entry.volumeEau} m³`}
                            {entry.category === "Déchets" &&
                              `${entry.categorie || "N/A"} - ${entry.valeur} ${
                                entry.unite || ""
                              }`}
                            {entry.category === "Social" &&
                              `${entry.action} - ${entry.budget || "0"} MAD - ${
                                entry.beneficiaires || "0"
                              } bénéf.`}
                            {entry.category === "Production" &&
                              `${entry.action} - ${entry.budget || "0"} MAD - ${
                                entry.beneficiaires || "0"
                              } bénéf.`}
                          </td>
                          <td>
                            <button
                              className="btn-delete"
                              onClick={() => handleDelete(entry.id)}
                            >
                              <img
                                src={deleteIcon}
                                alt="Delete"
                                style={{
                                  width: "16px",
                                  height: "16px",
                                  objectFit: "contain",
                                }}
                              />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {saved && (
                  <div className="success-message">
                    <span>✓</span> Toutes les données ont été enregistrées avec
                    succès !
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DataEntryPage;
