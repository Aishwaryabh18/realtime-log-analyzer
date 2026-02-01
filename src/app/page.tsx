import LiveLogs from "../components/LiveLogs";

export default function Page() {
  return (
    <main className="p-4">
      <h1 className="text-xl mb-4">Real-time Log Analyzer</h1>
      <LiveLogs />
    </main>
  );
}
