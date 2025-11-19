import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./OrganisationPage.css";
import { Building2, MapPin, Plus, Users, X } from "lucide-react";
import { User } from "App";
import Sidebar from "Components/Sidebar/Sidebar";
import Topbar from "Components/Topbar/Topbar";
import { usePageTitle } from "hooks/usePageTitle";
import { EntityManager } from "Components/EntityManager";
import { UserManager } from "Components/UserManager";
import { ExpandablePanel } from "Components/ExpandablePanel";
import { AddUserDialog } from "Components/AddUserDialog";
import { createEntityFormatter } from "Utils/formatter";

import { Site, UserData, SiteGroup, NewUser } from "types/organisation";
import AddSiteGroupDialog from "Components/AddSiteGroupDialog";
import EditUserDialog from "Components/EditUserDialog";

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

  const [siteGroups, setSiteGroups] = useState<SiteGroup[]>([]);

  const [newGroup, setNewGroup] = useState<SiteGroup>({
    name: "",
    description: "",
    type: "Interne",
    siteId: 0,
    members: [],
  });

  const [isAddGroupOpen, setIsAddGroupOpen] = useState(false);

  // Users state
  const [users, setUsers] = useState<UserData[]>([
    {
      id: 1,
      username: "jdupont",
      firstName: "Jean",
      lastName: "Dupont",
      email: "j.dupont@lda.ma",
      site: "Site Berkane",
      role: "Admin",
    },
    {
      id: 2,
      username: "mmartin",
      firstName: "Marie",
      lastName: "Martin",
      email: "m.martin@lda.ma",
      site: "Site Meknès",
      role: "Super User",
    },
    {
      id: 3,
      username: "achami",
      firstName: "Ahmed",
      lastName: "Chami",
      email: "a.chami@lda.ma",
      site: "Site Agadir",
      role: "Super User",
    },
    {
      id: 4,
      username: "sbennani",
      firstName: "Samira",
      lastName: "Bennani",
      email: "s.bennani@lda.ma",
      site: "Site Berkane",
      role: "User",
    },
    {
      id: 5,
      username: "krahmani",
      firstName: "Karim",
      lastName: "Rahmani",
      email: "k.rahmani@lda.ma",
      site: "Site Meknès",
      role: "User",
    },
    {
      id: 6,
      username: "fzaidi",
      firstName: "Fatima",
      lastName: "Zaidi",
      email: "f.zaidi@lda.ma",
      site: "Site Agadir",
      role: "User",
    },
    {
      id: 7,
      username: "hbenali",
      firstName: "Hassan",
      lastName: "Benali",
      email: "h.benali@lda.ma",
      site: "Site Meknès",
      role: "Agent de saisie",
    },
    {
      id: 8,
      username: "lchoukri",
      firstName: "Laila",
      lastName: "Choukri",
      email: "l.choukri@lda.ma",
      site: "Site Berkane",
      role: "Agent de saisie",
    },
    {
      id: 9,
      username: "yhamdi",
      firstName: "Youssef",
      lastName: "Hamdi",
      email: "y.hamdi@lda.ma",
      site: "Site Agadir",
      role: "Agent de saisie",
    },
    {
      id: 10,
      username: "sbelkadi",
      firstName: "Sara",
      lastName: "Belkadi",
      email: "s.belkadi@lda.ma",
      site: "Site Meknès",
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
    role: "User",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const [userBeingEdited, setUserBeingEdited] = useState<UserData | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  // Tabs state

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

  const handleAddGroup = () => {
    if (!newGroup.name || !newGroup.siteId) return;

    setSiteGroups([...siteGroups, { ...newGroup, id: Date.now() }]);

    setNewGroup({
      name: "",
      description: "",
      type: "Interne",
      siteId: "",
      members: [],
    });

    setIsAddGroupOpen(false);
  };
  const formatSiteGroupField = createEntityFormatter(sites, users);
  const handleEditUser = (user: UserData) => {
    setUserBeingEdited({ ...user });
    setIsEditDialogOpen(true);
  };
  // Add/Edit User handlers
  const handleSaveUser = () => {
    if (userBeingEdited) {
      // === EDIT MODE ===
      setUsers(
        users.map((u) =>
          u.id === userBeingEdited.id ? { ...newUser, id: u.id } : u,
        ),
      );
    } else {
      // === ADD MODE ===
      setUsers([...users, { ...newUser, id: Date.now() }]);
    }

    // Reset
    setNewUser({
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      site: "",
      role: "User",
    });

    setUserBeingEdited(null);
    setIsAddDialogOpen(false);
    setIsEditDialogOpen(false);
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
      id: "site-groups",
      title: "Groupes de Site",
      fields: [
        { key: "name", label: "Nom de l'unité", placeholder: "Entrer le nom" },
        {
          key: "description",
          label: "Description",
          placeholder: "Entrer la description",
        },
        { key: "type", label: "Type", placeholder: "Interne / Externe" },
        { key: "siteId", label: "Site", placeholder: "ID du site" },
        { key: "members", label: "Membres", placeholder: "Liste des membres" },
      ],
      items: siteGroups,
      newItem: newGroup,
      setNewItem: setNewGroup as any,
      onAdd: handleAddGroup,
      onDelete: (id: number) =>
        setSiteGroups(siteGroups.filter((g) => g.id !== id)),
    },
  ];
  const emptyUser: NewUser = {
    id: 0,
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    site: "",
    role: "User",
  };

  // Generic formatter builder for EntityManager
  function createFormatField({
    sites,
    users,
  }: {
    sites?: Site[];
    users?: UserData[];
  }) {
    return (key: string, value: any) => {
      // Convert siteId → site.name
      if (key === "siteId" && sites) {
        const site = sites.find((s) => s.id === value);
        return site ? site.name : "—";
      }

      // Convert userId → user.role
      if (key === "userId" && users) {
        const user = users.find((u) => u.id === value);
        return user ? user.role : "—";
      }

      // Convert members[] → roles (comma-separated)
      if (key === "members" && users && Array.isArray(value)) {
        return value
          .map((id) => {
            const u = users.find((user) => user.id === id);
            return u ? u.role : "—";
          })
          .join(", ");
      }

      return String(value);
    };
  }

  return (
    <div className="dashboard-wrapper">
      <Sidebar user={user} />

      <div className="dashboard-content">
        <Topbar {...topbarProps} />
        <main className="main-dashboard">
          <div className="organisation-page">
            <div className="page-header">
              <p>Gestion des unités organisationnelles et des utilisateurs</p>
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
                  <span className="score-label">Utilisateurs</span>
                  <span className="score-icon">👤</span>
                </div>
                <div className="score-value orange">{users.length}</div>
                <p className="score-change">Actifs</p>
              </div>
            </div>*/}

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
              <UserManager
                users={users}
                searchQuery={searchQuery}
                onSearch={setSearchQuery}
                onAdd={() => {
                  // OPEN ADD DIALOG
                  setNewUser({
                    username: "",
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                    site: "",
                    role: "User",
                  });
                  setIsAddDialogOpen(true);
                  setUserBeingEdited(null);
                }}
                onEdit={(user) => {
                  // OPEN EDIT DIALOG
                  setUserBeingEdited({ ...user });
                  setIsEditDialogOpen(true);
                  setIsAddDialogOpen(false);
                }}
                onDelete={handleDeleteUser}
              />

              {/* ADD USER DIALOG */}
              {isAddDialogOpen && (
                <AddUserDialog
                  isOpen={isAddDialogOpen}
                  newUser={newUser}
                  setNewUser={setNewUser}
                  sites={sites}
                  onSave={() => {
                    setUsers([...users, { ...newUser, id: Date.now() }]);
                    setIsAddDialogOpen(false);
                  }}
                  onClose={() => setIsAddDialogOpen(false)}
                />
              )}

              {/* EDIT USER DIALOG */}
              {isEditDialogOpen && userBeingEdited && (
                <EditUserDialog
                  isOpen={isEditDialogOpen}
                  user={userBeingEdited}
                  setUser={(updated) => setUserBeingEdited(updated)}
                  sites={sites}
                  onSave={() => {
                    setUsers(
                      users.map((u) =>
                        u.id === userBeingEdited.id ? userBeingEdited : u,
                      ),
                    );
                    setIsEditDialogOpen(false);
                    setUserBeingEdited(null);
                  }}
                  onClose={() => {
                    setIsEditDialogOpen(false);
                    setUserBeingEdited(null);
                  }}
                />
              )}
            </ExpandablePanel>

            {/* Organisation Panel */}
            <ExpandablePanel
              id="org"
              title="Unités"
              description="Gestion des sites"
              icon={<span className="icon">🏢</span>}
              color="blue"
              metricValue={sites.length}
              metricLabel="Unités totales"
              expandedPanel={expandedPanel as string | null}
              setExpandedPanel={
                setExpandedPanel as (panel: string | null) => void
              }
            >
              <div className="single-panel">
                {(() => {
                  const cfg = entityConfigs.find(
                    (c) => c.id === "site-groups",
                  )!;

                  return (
                    <>
                      <EntityManager
                        title={cfg.title}
                        fields={cfg.fields}
                        items={cfg.items}
                        newItem={cfg.newItem as any}
                        setNewItem={cfg.setNewItem as (item: any) => void}
                        onAdd={cfg.onAdd}
                        onDelete={cfg.onDelete}
                        extraActionButton={
                          <button
                            className="btn-primary"
                            onClick={() => setIsAddGroupOpen(true)}
                          >
                            <Plus className="w-4 h-4 mr-2" /> Ajouter
                          </button>
                        }
                        formatField={formatSiteGroupField}
                      />

                      {isAddGroupOpen && (
                        <AddSiteGroupDialog
                          isOpen={isAddGroupOpen}
                          newGroup={newGroup}
                          setNewGroup={setNewGroup}
                          sites={sites}
                          people={users}
                          onAddGroup={handleAddGroup}
                          onClose={() => setIsAddGroupOpen(false)}
                        />
                      )}
                    </>
                  );
                })()}
              </div>
            </ExpandablePanel>
          </div>
        </main>
      </div>
    </div>
  );
};

export default OrganisationPage;
