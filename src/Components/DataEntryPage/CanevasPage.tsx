import { User } from "App";
import DataEntryPage from "./DataEntryPage";

export const CanevasPage = ({ user }: { user: User }) => {
  return <DataEntryPage user={user} />;
};
