"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Check, KeyRound, Mail, ShieldCheck, UserRound } from "lucide-react";
import { useApp } from "@/components/providers";
import { knownMatricules } from "@/lib/mock-data";
import { languageNames } from "@/lib/i18n";
import { Field, PrimaryButton, TextInput } from "@/components/ui";
import { PlatformMark } from "@/components/brand";
import type { Lang } from "@/lib/types";

type Step = "matricule" | "code" | "password";
const ORDER: Step[] = ["matricule", "code", "password"];

// Code de démonstration : le parcours réel enverrait un code par email.
const DEMO_CODE = "480192";

export default function LoginPage() {
  const router = useRouter();
  const { setAuthed, lang, setLang } = useApp();

  const [step, setStep] = useState<Step>("matricule");
  const [matricule, setMatricule] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const known = useMemo(() => knownMatricules[matricule.trim().toUpperCase()], [matricule]);

  function submitMatricule(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!knownMatricules[matricule.trim().toUpperCase()]) {
      setError(
        "Ce matricule n'est pas reconnu comme membre du personnel d'ITRACOM Holding. Accès refusé.",
      );
      return;
    }
    setStep("code");
  }

  function submitCode(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (code.trim() !== DEMO_CODE) {
      setError("Code incorrect. Saisissez le code de démonstration indiqué ci-dessous.");
      return;
    }
    setStep("password");
  }

  function submitPassword(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (password.length < 4) {
      setError("Mot de passe requis (au moins 4 caractères pour la démonstration).");
      return;
    }
    setAuthed(true);
    router.replace("/dashboard");
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Panneau d'identité — sobre, sans décor */}
      <aside
        className="hidden flex-col justify-between p-10 md:flex md:w-[40%] lg:w-[36%]"
        style={{ background: "#0f172a", color: "#e2e8f0" }}
      >
        <div className="flex items-center gap-2.5">
          <PlatformMark size={30} inverted />
          <span className="text-[15px] font-semibold tracking-tight" style={{ color: "#f8fafc" }}>
            ITRAHUB
          </span>
        </div>

        <div className="max-w-sm">
          <h1 className="h01" style={{ color: "#f8fafc" }}>
            Gestion budgétaire du groupe ITRACOM
          </h1>
          <p className="mt-3 text-[14px] leading-[22px]" style={{ color: "#94a3b8" }}>
            Préparer, viser, arbitrer, approuver, consolider et suivre les budgets
            des sociétés dans un seul espace de travail.
          </p>
          <ul className="mt-6 space-y-2">
            {[
              "Circuit de validation à six statuts",
              "Équilibre des ressources par source",
              "Consolidation du groupe en USD",
              "Dépenses jusqu'au paiement enregistré",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 text-[13px]" style={{ color: "#cbd5e1" }}>
                <Check size={13} style={{ color: "#94a3b8" }} />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-[12px] leading-[18px]" style={{ color: "#64748b" }}>
          Démonstration UI — le matricule, le code email et le mot de passe sont
          simulés. Aucun email n'est envoyé et aucune session serveur n'est ouverte.
        </p>
      </aside>

      <main className="flex flex-1 items-center justify-center px-5 py-10">
        <div className="w-full max-w-[360px]">
          <div className="mb-8 flex items-center justify-between">
            <span className="flex items-center gap-2 md:hidden">
              <PlatformMark size={28} />
              <span className="text-[15px] font-semibold" style={{ color: "var(--ink)" }}>
                ITRAHUB
              </span>
            </span>
            <div className="ml-auto flex gap-0.5">
              {(Object.keys(languageNames) as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className="rounded-[5px] px-2 py-1 text-[12.5px] font-medium transition"
                  style={{
                    background: lang === l ? "var(--selected)" : "transparent",
                    color: lang === l ? "var(--ink)" : "var(--muted)",
                  }}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <Stepper step={step} />

          {step === "matricule" && (
            <form onSubmit={submitMatricule} className="fade-in">
              <h2 className="h01 mb-1" style={{ color: "var(--ink)" }}>
                Connexion
              </h2>
              <p className="meta mb-5">
                Saisissez le matricule fourni par la direction d'ITRACOM Holding.
              </p>
              <Field label="Matricule">
                <span
                  className="flex items-center gap-2 rounded-[6px] border px-2.5"
                  style={{ borderColor: "var(--line)", background: "var(--panel)" }}
                >
                  <UserRound size={15} style={{ color: "var(--muted)" }} />
                  <input
                    autoFocus
                    value={matricule}
                    onChange={(e) => setMatricule(e.target.value)}
                    placeholder="ITC-0042"
                    autoComplete="off"
                    className="h-[40px] w-full bg-transparent text-[14px] outline-none"
                    style={{ color: "var(--ink)" }}
                  />
                </span>
              </Field>
              {known ? (
                <p
                  className="mt-2 flex items-center gap-1.5 text-[13px]"
                  style={{ color: "var(--success)" }}
                >
                  <Check size={13} /> {known.name}
                </p>
              ) : null}
              <ErrorNote error={error} />
              <Submit>
                Continuer <ArrowRight size={15} />
              </Submit>
              <Hint>
                Matricules reconnus pour la démonstration : <b>ITC-0042</b> ou <b>ITC-0108</b>.
              </Hint>
            </form>
          )}

          {step === "code" && (
            <form onSubmit={submitCode} className="fade-in">
              <h2 className="h01 mb-1" style={{ color: "var(--ink)" }}>
                Vérification
              </h2>
              <p className="meta mb-5">
                Un code a été envoyé à l'adresse email de{" "}
                <b style={{ color: "var(--slate)" }}>{known?.name}</b> ({known?.email}).
              </p>
              <Field label="Code reçu par email">
                <span
                  className="flex items-center gap-2 rounded-[6px] border px-2.5"
                  style={{ borderColor: "var(--line)", background: "var(--panel)" }}
                >
                  <Mail size={15} style={{ color: "var(--muted)" }} />
                  <input
                    autoFocus
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="______"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    className="num h-[40px] w-full bg-transparent text-[14px] tracking-[0.3em] outline-none"
                    style={{ color: "var(--ink)" }}
                  />
                </span>
              </Field>
              <ErrorNote error={error} />
              <Submit>
                Valider le code <ArrowRight size={15} />
              </Submit>
              <Hint>
                Envoi d'email simulé. Code de démonstration : <b>{DEMO_CODE}</b>.
              </Hint>
              <Back onClick={() => { setStep("matricule"); setError(null); }} />
            </form>
          )}

          {step === "password" && (
            <form onSubmit={submitPassword} className="fade-in">
              <h2 className="h01 mb-1" style={{ color: "var(--ink)" }}>
                Mot de passe
              </h2>
              <p className="meta mb-5">
                Dernière étape avant l'accès au tableau de bord.
              </p>
              <Field label="Mot de passe">
                <span
                  className="flex items-center gap-2 rounded-[6px] border px-2.5"
                  style={{ borderColor: "var(--line)", background: "var(--panel)" }}
                >
                  <KeyRound size={15} style={{ color: "var(--muted)" }} />
                  <input
                    autoFocus
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    className="h-[40px] w-full bg-transparent text-[14px] outline-none"
                    style={{ color: "var(--ink)" }}
                  />
                </span>
              </Field>
              <ErrorNote error={error} />
              <Submit>
                Accéder au tableau de bord <ArrowRight size={15} />
              </Submit>
              <button
                type="button"
                className="mt-3 text-[13px] font-medium transition hover:underline"
                style={{ color: "var(--muted)" }}
              >
                Mot de passe oublié ?
              </button>
              <Hint>
                Validation simulée : toute saisie d'au moins 4 caractères ouvre la
                démonstration. Aucune authentification réelle n'est raccordée.
              </Hint>
              <Back onClick={() => { setStep("code"); setError(null); }} />
            </form>
          )}
        </div>
      </main>
    </div>
  );
}

function Stepper({ step }: { step: Step }) {
  const labels: Record<Step, string> = {
    matricule: "Matricule",
    code: "Code email",
    password: "Mot de passe",
  };
  const current = ORDER.indexOf(step);
  return (
    <div className="mb-7">
      <div className="flex items-center gap-1.5">
        {ORDER.map((s, i) => (
          <span
            key={s}
            className="h-[3px] flex-1 rounded-full transition-colors"
            style={{ background: i <= current ? "var(--ink)" : "var(--line)" }}
          />
        ))}
      </div>
      <p className="meta mt-2">
        Étape {current + 1} sur 3 — {labels[step]}
      </p>
    </div>
  );
}

function Submit({ children }: { children: React.ReactNode }) {
  return (
    <PrimaryButton type="submit" className="mt-5 w-full">
      {children}
    </PrimaryButton>
  );
}

function ErrorNote({ error }: { error: string | null }) {
  if (!error) return null;
  return (
    <p
      role="alert"
      className="mt-3 rounded-[6px] border px-3 py-2 text-[13px] leading-[18px]"
      style={{
        background: "var(--danger-soft)",
        borderColor: "color-mix(in srgb, var(--danger) 28%, transparent)",
        color: "var(--danger)",
      }}
    >
      {error}
    </p>
  );
}

function Hint({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="mt-5 flex items-start gap-2 rounded-[6px] border border-dashed px-3 py-2 text-[12px] leading-[17px]"
      style={{ borderColor: "var(--line)", color: "var(--muted)" }}
    >
      <ShieldCheck size={13} className="mt-[1px] shrink-0" />
      <span>{children}</span>
    </p>
  );
}

function Back({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-4 text-[13px] font-medium transition hover:underline"
      style={{ color: "var(--muted)" }}
    >
      ← Étape précédente
    </button>
  );
}
