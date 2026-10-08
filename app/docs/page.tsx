import Link from "next/link";
import { ArrowLeft, BookOpen, Code, Cpu, Terminal, Shield, Sparkles } from "lucide-react";

export const metadata = {
  title: "Documentation | HospitalOS Developer Platform",
  description: "Getting started guide, device connector architecture, and API documentation for HospitalOS.",
};

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-[#070B14] text-[#EAF0FF]">
      {/* Top Nav */}
      <header className="border-b border-[rgba(79,124,255,0.18)] bg-[#070B14]/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#8A97B5] hover:text-[#00E5C3] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <span className="text-border">/</span>
            <div className="flex items-center gap-2 font-bold font-heading text-sm">
              <span className="w-6 h-6 rounded bg-gradient-to-br from-[#00E5C3] to-[#4F7CFF] flex items-center justify-center text-[#070B14] text-xs font-extrabold">
                +
              </span>
              HospitalOS Docs
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/DreamFaang78/cautious-memory"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs px-3 py-1.5 rounded-lg border border-[rgba(79,124,255,0.2)] bg-white/5 hover:bg-white/10 transition-colors"
            >
              GitHub Repo
            </a>
          </div>
        </div>
      </header>

      {/* Docs Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E5C3]/10 border border-[#00E5C3]/30 text-[#00E5C3] text-xs font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Developer Platform v0.1.0-alpha
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-heading mb-4">
            HospitalOS Architecture & Quickstart
          </h1>
          <p className="text-[#8A97B5] text-base leading-relaxed">
            HospitalOS is an open-source, AI-first platform for hospital operations in India. It connects patient registration, clinical voice documentation, lab diagnostic analyzers (HL7/ASTM), and admin resource scheduling into one live system.
          </p>
        </div>

        {/* Section 1: Architecture Overview */}
        <div className="space-y-12 divide-y divide-[rgba(79,124,255,0.15)]">
          <section className="pt-8 first:pt-0">
            <h2 className="text-xl font-bold font-heading text-foreground flex items-center gap-2.5 mb-4">
              <Cpu className="w-5 h-5 text-[#00E5C3]" />
              Core Architecture & Layers
            </h2>
            <p className="text-sm text-[#8A97B5] mb-4">
              The platform is split into four primary layers:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-[#0F1626] border border-[rgba(79,124,255,0.18)]">
                <span className="font-bold text-[#00E5C3] block mb-1">1. Ingestion Layer (Device Hub)</span>
                Listens on TCP/Serial for HL7 v2.x and ASTM 1394-91 feeds from lab analyzers and bed vitals monitors.
              </div>
              <div className="p-4 rounded-xl bg-[#0F1626] border border-[rgba(79,124,255,0.18)]">
                <span className="font-bold text-[#4F7CFF] block mb-1">2. Clinical Graph Engine</span>
                Chronologically normalizes patient timelines, mapping observation codes to LOINC and procedures to SNOMED-CT.
              </div>
              <div className="p-4 rounded-xl bg-[#0F1626] border border-[rgba(79,124,255,0.18)]">
                <span className="font-bold text-[#FF9F43] block mb-1">3. Ambient AI Co-Pilot</span>
                Processes multilingual doctor-patient audio streams (Hindi/English) into structured clinical SOAP notes.
              </div>
              <div className="p-4 rounded-xl bg-[#0F1626] border border-[rgba(79,124,255,0.18)]">
                <span className="font-bold text-[#A855F7] block mb-1">4. Ops Orchestrator</span>
                Monitors queue lengths, ward bed utilization, and predicts appointment no-shows based on lead time and age.
              </div>
            </div>
          </section>

          {/* Section 2: Quickstart Code */}
          <section className="pt-8">
            <h2 className="text-xl font-bold font-heading text-foreground flex items-center gap-2.5 mb-4">
              <Terminal className="w-5 h-5 text-[#4F7CFF]" />
              Connecting a Lab Analyzer (HL7 / ASTM)
            </h2>
            <p className="text-sm text-[#8A97B5] mb-4">
              Here is how an analyzer driver registers a lab result into the unified patient stream using the HospitalOS Device SDK:
            </p>
            <div className="bg-[#05080E] p-4 rounded-xl border border-[rgba(79,124,255,0.2)] font-mono text-xs overflow-x-auto text-[#00E5C3]">
              <pre>{`import { HospitalOSClient } from "@hospitalos/sdk";

// Initialize the secure HospitalOS client
const client = new HospitalOSClient({
  facilityId: "IN-UP-KNP-042",
  apiKey: process.env.HOSPITALOS_SECRET_KEY,
});

// Register analyzer event listener for CBC / Biochemistry feed
client.devices.onLabResult(async ({ analyzerId, sampleBarcode, observations }) => {
  console.log(\`Received specimen \${sampleBarcode} from \${analyzerId}\`);

  // Match sampleBarcode with active patient admission token
  const patient = await client.patients.findByBarcode(sampleBarcode);

  // Automatically attach structured lab observations
  await client.records.attachLabObservation({
    patientId: patient.id,
    analyzer: analyzerId,
    timestamp: new Date().toISOString(),
    results: observations.map((obs) => ({
      code: obs.testCode, // e.g., "718-7" for Hemoglobin
      value: obs.value,
      units: obs.units,
      abnormalFlag: obs.isAbnormal ? "HIGH" : "NORMAL",
    })),
  });

  // If critical abnormal, trigger clinician notification
  if (observations.some((o) => o.isCritical)) {
    await client.alerts.notifyDoctor({
      doctorId: patient.assignedDoctorId,
      severity: "CRITICAL",
      message: \`Critical lab alert for \${patient.name} in Room 14\`,
    });
  }
});`}</pre>
            </div>
          </section>

          {/* Section 3: Compliance & DPDP */}
          <section className="pt-8">
            <h2 className="text-xl font-bold font-heading text-foreground flex items-center gap-2.5 mb-4">
              <Shield className="w-5 h-5 text-[#FF9F43]" />
              Security & DPDP Compliance
            </h2>
            <p className="text-sm text-[#8A97B5] leading-relaxed mb-3">
              HospitalOS is designed in strict adherence to India’s Digital Personal Data Protection (DPDP) Act 2023 and MeitY Rules (notified Nov 2025). Key security constraints:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs text-[#8A97B5]">
              <li><strong className="text-foreground">Explicit Consent:</strong> Data collection requires verifiable consent logging prior to medical record indexing.</li>
              <li><strong className="text-foreground">Encryption:</strong> AES-256 at rest, TLS 1.3 in transit.</li>
              <li><strong className="text-foreground">Auditability:</strong> Immutable tamper-evident audit logs record every clinician or staff view.</li>
              <li><strong className="text-foreground">Human in the Loop:</strong> AI provides drafts and flags; licensed doctors maintain full signing authority.</li>
            </ul>
          </section>
        </div>

        {/* Footer in Docs */}
        <div className="mt-16 pt-8 border-t border-[rgba(79,124,255,0.18)] flex items-center justify-between text-xs text-[#8A97B5]">
          <div>HospitalOS Open Source · Founded by Agam Singh</div>
          <Link href="/" className="text-[#00E5C3] hover:underline">
            Return to Landing Page
          </Link>
        </div>
      </main>
    </div>
  );
}
