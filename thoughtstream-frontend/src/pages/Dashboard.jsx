import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Header from "../components/Header";
import WeatherWidget from "../components/WeatherWidget";
import NewEntryForm from "../components/NewEntryForm";
import DiaryList from "../components/DiaryList";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Header />

      <div className="text-lg font-semibold mb-4">
        Welcome back, {user?.name || "User"}!
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column: weather + new entry */}
        <aside className="lg:col-span-1 space-y-6">
          <WeatherWidget />
          <NewEntryForm />
        </aside>

        {/* Right column: diary list */}
        <main className="lg:col-span-2">
          <DiaryList />
        </main>
      </div>
    </div>
  );
}
