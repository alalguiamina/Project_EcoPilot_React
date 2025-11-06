import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./OrganisationPage.css";
import { Building2, MapPin, Users, X } from "lucide-react";
import { User } from "App";
import Sidebar from "Components/Sidebar/Sidebar";
import Topbar from "Components/Topbar/Topbar";
import { usePageTitle } from "hooks/usePageTitle";
import { EntityManager } from "Components/EntityManager";
import { UserManager } from "Components/UserManager";
import { ExpandablePanel } from "Components/ExpandablePanel";
import { AddUserDialog } from "Components/AddUserDialog";
import {
  Site,
  Domaine,
  BusinessUnit,
  UserData,
  NewUser,
} from "types/organisation";

interface OrganisationPageProps {
  user: User;
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
  const entityConfigs = [
    {
      id: "sites",
      title: "Site",
      type: "sites",
      fields: [
        { key: "name", label: "Site Name", placeholder: "Enter site name" },
        { key: "location", label: "Location", placeholder: "Enter location" },
        { key: "surface", label: "Surface", placeholder: "Enter surface" },
      ],
      items: sites,
      newItem: newSite,
      setNewItem: setNewSite,
      onAdd: handleAddSite,
      onDelete: handleDeleteSite,
    },
    {
      id: "domaines",
      title: "Domain",
      type: "domaines",
      fields: [
        { key: "name", label: "Domain Name", placeholder: "Enter domain name" },
        { key: "type", label: "Type", placeholder: "Enter type" },
      ],
      items: domaines,
      newItem: newDomaine,
      setNewItem: setNewDomaine,
      onAdd: handleAddDomaine,
      onDelete: handleDeleteDomaine,
    },
    {
      id: "business-units",
      title: "Business Unit",
      type: "business-units",
      fields: [
        { key: "name", label: "BU Name", placeholder: "Enter BU name" },
        {
          key: "description",
          label: "Description",
          placeholder: "Enter description",
        },
      ],
      items: businessUnits,
      newItem: newBU,
      setNewItem: setNewBU,
      onAdd: handleAddBU,
      onDelete: handleDeleteBU,
    },
  ];

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
            <ExpandablePanel
              id="org"
              title="Entités"
              description="Gestion des sites, domaines et unités commerciales"
              icon={<span className="icon">🏢</span>}
              color="blue"
              metricValue={
                sites.length + domaines.length + businessUnits.length
              }
              metricLabel="Entités totales"
              expandedPanel={expandedPanel as string | null}
              setExpandedPanel={
                setExpandedPanel as (panel: string | null) => void
              }
            >
              <div className="tabs-container">
                <div className="tabs-list">
                  {entityConfigs.map(({ id, title }) => (
                    <button
                      key={id}
                      className={`tab-button ${activeTab === id ? "active" : ""}`}
                      onClick={() => setActiveTab(id)}
                    >
                      {title}
                    </button>
                  ))}
                </div>

                {entityConfigs.map(
                  ({
                    id,
                    title,
                    fields,
                    items,
                    newItem,
                    setNewItem,
                    onAdd,
                    onDelete,
                  }) =>
                    activeTab === id && (
                      <EntityManager
                        key={id}
                        title={title}
                        fields={fields}
                        items={items}
                        newItem={newItem as any}
                        setNewItem={setNewItem as (item: any) => void}
                        onAdd={onAdd}
                        onDelete={onDelete}
                      />
                    ),
                )}
              </div>{" "}
            </ExpandablePanel>

            {/* User Management Panel */}
            <ExpandablePanel
              id="users"
              title="Gestion d'Utilisateur"
              description="Administration des comptes utilisateurs et permissions"
              icon={<span className="icon">👥</span>}
              color="purple"
              metricValue={users.length}
              metricLabel="Utilisateurs actifs"
              expandedPanel={expandedPanel as string | null}
              setExpandedPanel={
                setExpandedPanel as (panel: string | null) => void
              }
            >
              {/* User management table and search */}
              <UserManager
                users={users}
                searchQuery={searchQuery}
                onSearch={setSearchQuery}
                onAdd={() => setIsAddDialogOpen(true)}
                onDelete={handleDeleteUser}
              />

              {/* Add User Dialog  */}
              {isAddDialogOpen && (
                <AddUserDialog
                  isOpen={isAddDialogOpen}
                  newUser={newUser}
                  setNewUser={setNewUser}
                  sites={sites}
                  domaines={domaines}
                  businessUnits={businessUnits}
                  onAddUser={handleAddUser}
                  onClose={() => setIsAddDialogOpen(false)}
                />
              )}
            </ExpandablePanel>
          </div>
        </main>
      </div>
    </div>
  );
};

export default OrganisationPage;
