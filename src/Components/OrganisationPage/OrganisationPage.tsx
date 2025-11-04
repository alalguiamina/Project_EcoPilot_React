import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./OrganisationPage.css";
import {
  Building2,
  MapPin,
  Users,
  Search,
  Edit,
  Trash2,
  Plus,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { User } from "App";
import Sidebar from "Components/Sidebar/Sidebar";
import Topbar from "Components/Topbar/Topbar";
import { usePageTitle } from "hooks/usePageTitle";
import { EntityManager } from "Components/EntityManager";

interface OrganisationPageProps {
  user: User;
}

interface Site {
  id?: number;
  name: string;
  location: string;
  surface: string;
}

interface Domaine {
  id?: number;
  name: string;
  type: string;
}

interface BusinessUnit {
  id?: number;
  name: string;
  description: string;
}

interface UserData {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  site: string;
  domaine: string;
  businessUnit: string;
  role: string;
}

const OrganisationPage = ({ user }: OrganisationPageProps) => {
  const navigate = useNavigate();
  const handleLogout = () => navigate("/");
  const pageTitle = usePageTitle();
  const topbarProps = {
    title: pageTitle,
    userName: user.first_name || "User",
    onLogout: handleLogout,
  };

  // Panel expansion states
  const [expandedPanel, setExpandedPanel] = useState<"org" | "users" | null>(
    null,
  );

  // Sites state
  const [sites, setSites] = useState<Site[]>([
    {
      id: 1,
      name: "Site Berkane",
      location: "Berkane, Oriental",
      surface: "150 ha",
    },
    {
      id: 2,
      name: "Site Meknès",
      location: "Meknès, Fès-Meknès",
      surface: "220 ha",
    },
    {
      id: 3,
      name: "Site Agadir",
      location: "Agadir, Souss-Massa",
      surface: "180 ha",
    },
  ]);
  const [newSite, setNewSite] = useState({
    name: "",
    location: "",
    surface: "",
  });

  // Domaines state
  const [domaines, setDomaines] = useState<Domaine[]>([
    { id: 1, name: "Agrumes", type: "Production" },
    { id: 2, name: "Olives", type: "Production" },
    { id: 3, name: "Légumes", type: "Production" },
  ]);
  const [newDomaine, setNewDomaine] = useState({ name: "", type: "" });

  // Business Units state
  const [businessUnits, setBusinessUnits] = useState<BusinessUnit[]>([
    { id: 1, name: "BU Nord", description: "Business Unit région Nord" },
    { id: 2, name: "BU Centre", description: "Business Unit région Centre" },
    { id: 3, name: "BU Sud", description: "Business Unit région Sud" },
  ]);
  const [newBU, setNewBU] = useState({ name: "", description: "" });

  // Users state
  const [users, setUsers] = useState<UserData[]>([
    {
      id: 1,
      username: "jdupont",
      firstName: "Jean",
      lastName: "Dupont",
      email: "j.dupont@lda.ma",
      site: "Site Berkane",
      domaine: "Agrumes",
      businessUnit: "BU Nord",
      role: "Admin",
    },
    {
      id: 2,
      username: "mmartin",
      firstName: "Marie",
      lastName: "Martin",
      email: "m.martin@lda.ma",
      site: "Site Meknès",
      domaine: "Olives",
      businessUnit: "BU Centre",
      role: "User",
    },
    {
      id: 3,
      username: "achami",
      firstName: "Ahmed",
      lastName: "Chami",
      email: "a.chami@lda.ma",
      site: "Site Agadir",
      domaine: "Légumes",
      businessUnit: "BU Sud",
      role: "Agent de saisie",
    },
  ]);
  const [newUser, setNewUser] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    site: "",
    domaine: "",
    businessUnit: "",
    role: "User",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Tabs state
  const [activeTab, setActiveTab] = useState("sites");

  // Filter users based on search
  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Add/Edit Site handlers
  const handleAddSite = () => {
    if (newSite.name && newSite.location && newSite.surface) {
      setSites([...sites, { ...newSite, id: Date.now() }]);
      setNewSite({ name: "", location: "", surface: "" });
    }
  };

  const handleDeleteSite = (id: number) => {
    setSites(sites.filter((site) => site.id !== id));
  };

  // Add/Edit Domaine handlers
  const handleAddDomaine = () => {
    if (newDomaine.name && newDomaine.type) {
      setDomaines([...domaines, { ...newDomaine, id: Date.now() }]);
      setNewDomaine({ name: "", type: "" });
    }
  };

  const handleDeleteDomaine = (id: number) => {
    setDomaines(domaines.filter((domaine) => domaine.id !== id));
  };

  // Add/Edit Business Unit handlers
  const handleAddBU = () => {
    if (newBU.name && newBU.description) {
      setBusinessUnits([...businessUnits, { ...newBU, id: Date.now() }]);
      setNewBU({ name: "", description: "" });
    }
  };

  const handleDeleteBU = (id: number) => {
    setBusinessUnits(businessUnits.filter((bu) => bu.id !== id));
  };

  // Add/Edit User handlers
  const handleAddUser = () => {
    if (
      newUser.username &&
      newUser.email &&
      newUser.firstName &&
      newUser.lastName
    ) {
      setUsers([...users, { ...newUser, id: Date.now() }]);
      setNewUser({
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        site: "",
        domaine: "",
        businessUnit: "",
        role: "User",
      });
      setIsAddDialogOpen(false);
    }
  };

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const Badge = ({
    children,
    className = "",
  }: {
    children: React.ReactNode;
    className?: string;
  }) => {
    return <span className={`badge ${className}`.trim()}>{children}</span>;
  };

  return (
    <div className="dashboard-wrapper">
      <Sidebar user={user} />

      <div className="dashboard-content">
        <Topbar {...topbarProps} />
        <main className="main-dashboard">
          <div className="organisation-page">
            <div className="page-header">
              <p>Gestion des entités organisationnelles et des utilisateurs</p>
            </div>

            {/* Score cards */}
            {/*<div className="score-cards-grid">
              <div className="score-card">
                <div className="score-card-header">
                  <span className="score-label">Sites</span>
                  <span className="score-icon">📍</span>
                </div>
                <div className="score-value blue">{sites.length}</div>
                <p className="score-change">Actifs</p>
              </div>

              <div className="score-card">
                <div className="score-card-header">
                  <span className="score-label">Domaines</span>
                  <span className="score-icon">🏭</span>
                </div>
                <div className="score-value green">{domaines.length}</div>
                <p className="score-change">En production</p>
              </div>

              <div className="score-card">
                <div className="score-card-header">
                  <span className="score-label">Business Units</span>
                  <span className="score-icon">👥</span>
                </div>
                <div className="score-value purple">{businessUnits.length}</div>
                <p className="score-change">Opérationnelles</p>
              </div>

              <div className="score-card">
                <div className="score-card-header">
                  <span className="score-label">Utilisateurs</span>
                  <span className="score-icon">👤</span>
                </div>
                <div className="score-value orange">{users.length}</div>
                <p className="score-change">Actifs</p>
              </div>
            </div>*/}

            {/* Organisation Panel */}
            <div className="expandable-card">
              <button
                onClick={() =>
                  setExpandedPanel(expandedPanel === "org" ? null : "org")
                }
                className="expandable-header"
              >
                <div className="expandable-title">
                  <div className="icon-container blue">
                    <span className="icon">🏢</span>
                  </div>
                  <div>
                    <h3>Entités</h3>
                    <p>Gestion des sites, domaines et unités commerciales</p>
                  </div>
                </div>
                <div className="expandable-metrics">
                  <div className="metric-value blue">
                    {sites.length + domaines.length + businessUnits.length}
                  </div>
                  <p className="metric-label">Entités totales</p>
                  <span className="expand-icon">
                    {expandedPanel === "org" ? <ChevronUp /> : <ChevronDown />}
                  </span>
                </div>
              </button>

              {expandedPanel === "org" && (
                <div className="expandable-content">
                  {/* Tabs */}
                  <div className="tabs-container">
                    <div className="tabs-list">
                      <button
                        className={`tab-button ${activeTab === "sites" ? "active" : ""}`}
                        onClick={() => setActiveTab("sites")}
                      >
                        <MapPin className="w-4 h-4 mr-2" />
                        Sites
                      </button>
                      <button
                        className={`tab-button ${activeTab === "domaines" ? "active" : ""}`}
                        onClick={() => setActiveTab("domaines")}
                      >
                        <Building2 className="w-4 h-4 mr-2" />
                        Domaines
                      </button>
                      <button
                        className={`tab-button ${activeTab === "business-units" ? "active" : ""}`}
                        onClick={() => setActiveTab("business-units")}
                      >
                        <Users className="w-4 h-4 mr-2" /> Business Units
                      </button>
                    </div>
                    {/* Sites Tab */}
                    {activeTab === "sites" && (
                      <EntityManager<Site>
                        title="Site"
                        fields={[
                          {
                            key: "name",
                            label: "Site Name",
                            placeholder: "Enter site name",
                          },
                          {
                            key: "location",
                            label: "Location",
                            placeholder: "Enter location",
                          },
                          {
                            key: "surface",
                            label: "Surface",
                            placeholder: "Enter surface",
                          },
                        ]}
                        items={sites}
                        newItem={newSite}
                        setNewItem={setNewSite}
                        onAdd={handleAddSite}
                        onDelete={handleDeleteSite}
                      />
                    )}
                    {/* Domaines Tab */}
                    {activeTab === "domaines" && (
                      <EntityManager<Domaine>
                        title="Domain"
                        fields={[
                          {
                            key: "name",
                            label: "Domain Name",
                            placeholder: "Enter domain name",
                          },
                          {
                            key: "type",
                            label: "Type",
                            placeholder: "Enter type",
                          },
                        ]}
                        items={domaines}
                        newItem={newDomaine}
                        setNewItem={setNewDomaine}
                        onAdd={handleAddDomaine}
                        onDelete={handleDeleteDomaine}
                      />
                    )}
                    {/* Business Units Tab */}
                    {activeTab === "business-units" && (
                      <EntityManager<BusinessUnit>
                        title="Business Unit"
                        fields={[
                          {
                            key: "name",
                            label: "BU Name",
                            placeholder: "Enter BU name",
                          },
                          {
                            key: "description",
                            label: "Description",
                            placeholder: "Enter description",
                          },
                        ]}
                        items={businessUnits}
                        newItem={newBU}
                        setNewItem={setNewBU}
                        onAdd={handleAddBU}
                        onDelete={handleDeleteBU}
                      />
                    )}{" "}
                  </div>
                </div>
              )}
            </div>

            {/* User Management Panel */}
            <div className="expandable-card">
              <button
                onClick={() =>
                  setExpandedPanel(expandedPanel === "users" ? null : "users")
                }
                className="expandable-header"
              >
                <div className="expandable-title">
                  <div className="icon-container purple">
                    <span className="icon">👥</span>
                  </div>
                  <div>
                    <h3>Gestion d'Utilisateur</h3>
                    <p>
                      Administration des comptes utilisateurs et permissions
                    </p>
                  </div>
                </div>
                <div className="expandable-metrics">
                  <div className="metric-value purple">{users.length}</div>
                  <p className="metric-label">Utilisateurs actifs</p>
                  <span className="expand-icon">
                    {expandedPanel === "users" ? (
                      <ChevronUp />
                    ) : (
                      <ChevronDown />
                    )}
                  </span>
                </div>
              </button>

              {expandedPanel === "users" && (
                <div className="expandable-content">
                  <div className="panel-header-row">
                    <div className="toolbar">
                      <div className="search-bar">
                        <Search className="search-icon" />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Rechercher un utilisateur..."
                        />
                      </div>

                      <button
                        className="btn-primary"
                        onClick={() => setIsAddDialogOpen(true)}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Ajouter
                      </button>
                    </div>
                  </div>
                  {/* Users Table */}
                  <div className="table-container">
                    <table>
                      <thead>
                        <tr>
                          <th>Username</th>
                          <th>Full Name</th>
                          <th>Email</th>
                          <th>Site</th>
                          <th>Role</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.map((user) => (
                          <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>
                              {user.firstName} {user.lastName}
                            </td>
                            <td>{user.email}</td>
                            <td>{user.site}</td>
                            <td>
                              <span
                                className={`role-badge ${user.role.toLowerCase().replace(" ", "-")}`}
                              >
                                {user.role}
                              </span>
                            </td>
                            <td>
                              <div className="action-buttons">
                                <button className="btn-icon btn-edit">
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  className="btn-icon btn-delete"
                                  onClick={() => handleDeleteUser(user.id!)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Add User Dialog */}
          {isAddDialogOpen && (
            <div className="dialog-overlay">
              <div className="dialog">
                <div className="dialog-header">
                  <h3>Add New User</h3>
                  <button
                    className="btn-icon"
                    onClick={() => setIsAddDialogOpen(false)}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="dialog-content">
                  <p className="dialog-description">
                    Fill in the user details below
                  </p>
                  <div className="form-grid-2">
                    <div className="form-field">
                      <label htmlFor="username">Username</label>
                      <input
                        id="username"
                        type="text"
                        value={newUser.username}
                        onChange={(e) =>
                          setNewUser({ ...newUser, username: e.target.value })
                        }
                        placeholder="Enter username"
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor="email">Email</label>
                      <input
                        id="email"
                        type="email"
                        value={newUser.email}
                        onChange={(e) =>
                          setNewUser({ ...newUser, email: e.target.value })
                        }
                        placeholder="Enter email"
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor="firstName">First Name</label>
                      <input
                        id="firstName"
                        type="text"
                        value={newUser.firstName}
                        onChange={(e) =>
                          setNewUser({ ...newUser, firstName: e.target.value })
                        }
                        placeholder="Enter first name"
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor="lastName">Last Name</label>
                      <input
                        id="lastName"
                        type="text"
                        value={newUser.lastName}
                        onChange={(e) =>
                          setNewUser({ ...newUser, lastName: e.target.value })
                        }
                        placeholder="Enter last name"
                      />
                    </div>
                    <div className="form-field full-width">
                      <label htmlFor="password">Password</label>
                      <input
                        id="password"
                        type="password"
                        value={newUser.password}
                        onChange={(e) =>
                          setNewUser({ ...newUser, password: e.target.value })
                        }
                        placeholder="Enter password"
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor="user-site">Site</label>
                      <select
                        id="user-site"
                        value={newUser.site}
                        onChange={(e) =>
                          setNewUser({ ...newUser, site: e.target.value })
                        }
                      >
                        <option value="">Select site</option>
                        {sites.map((site) => (
                          <option key={site.id} value={site.name}>
                            {site.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-field">
                      <label htmlFor="user-domaine">Domain</label>
                      <select
                        id="user-domaine"
                        value={newUser.domaine}
                        onChange={(e) =>
                          setNewUser({ ...newUser, domaine: e.target.value })
                        }
                      >
                        <option value="">Select domain</option>
                        {domaines.map((domaine) => (
                          <option key={domaine.id} value={domaine.name}>
                            {domaine.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-field">
                      <label htmlFor="user-bu">Business Unit</label>
                      <select
                        id="user-bu"
                        value={newUser.businessUnit}
                        onChange={(e) =>
                          setNewUser({
                            ...newUser,
                            businessUnit: e.target.value,
                          })
                        }
                      >
                        <option value="">Select business unit</option>
                        {businessUnits.map((bu) => (
                          <option key={bu.id} value={bu.name}>
                            {bu.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-field">
                      <label htmlFor="user-role">Role</label>
                      <select
                        id="user-role"
                        value={newUser.role}
                        onChange={(e) =>
                          setNewUser({ ...newUser, role: e.target.value })
                        }
                      >
                        <option value="Agent de saisie">Agent de saisie</option>
                        <option value="User">User</option>
                        <option value="Super User">Super User</option>
                        <option value="Admin">Admin</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="dialog-footer">
                  <button
                    className="btn-secondary"
                    onClick={() => setIsAddDialogOpen(false)}
                  >
                    Cancel
                  </button>
                  <button onClick={handleAddUser} className="btn-primary">
                    Add User
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default OrganisationPage;
