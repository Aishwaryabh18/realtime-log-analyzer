import dynamic from "next/dynamic";

const LiveLogs = dynamic(() => import("@/components/LiveLogs"), {
  ssr: false,
});

export default function Page() {
  return (
    <main>
      <h1>Real-time Log Analyzer</h1>
      <LiveLogs />
    </main>
  );
}
