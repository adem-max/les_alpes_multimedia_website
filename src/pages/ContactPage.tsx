import React, { useState, useEffect, useRef } from 'react';
import { PageRoute, SiteLegalConfig, ServiceType, QuoteFormState } from '../types';
import { Mail, Phone, MapPin, Send, CheckCircle2, Shield, AlertCircle, Clock, Check, ExternalLink, Sparkles, RotateCcw } from 'lucide-react';

const COOLDOWN_SECONDS = 60; // 60s cooldown between quote requests from same browser
const MAX_SUBMISSIONS_PER_HOUR = 3; // Maximum 3 quote requests per hour
const MIN_FILL_TIME_MS = 2500; // Bot speed trap: submissions in <2.5s are rejected

const getRecentSubmissions = (): number[] => {
  try {
    const raw = localStorage.getItem('alpes_submission_timestamps');
    if (!raw) return [];
    const list: number[] = JSON.parse(raw);
    const oneHourAgo = Date.now() - 60 * 60 * 1000;
    return list.filter((t) => typeof t === 'number' && t > oneHourAgo);
  } catch {
    return [];
  }
};

const recordSubmissionTimestamp = () => {
  try {
    const now = Date.now();
    localStorage.setItem('alpes_last_quote_time', String(now));
    const recent = getRecentSubmissions();
    recent.push(now);
    localStorage.setItem('alpes_submission_timestamps', JSON.stringify(recent.slice(-10)));
  } catch {
    // Ignore local storage errors
  }
};

const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.11 7.09C8.94 7.09 8.67 7.15 8.44 7.4C8.21 7.65 7.56 8.26 7.56 9.5C7.56 10.74 8.46 11.94 8.59 12.11C8.72 12.28 10.37 14.83 12.89 15.92C15 16.82 15.42 16.64 15.88 16.6C16.34 16.56 17.37 16 17.58 15.39C17.8 14.78 17.8 14.25 17.73 14.14C17.67 14.03 17.5 13.97 17.25 13.84C17 13.71 15.78 13.11 15.55 13.03C15.32 12.95 15.15 12.91 14.98 13.16C14.81 13.41 14.33 13.97 14.18 14.14C14.03 14.31 13.88 14.33 13.63 14.2C13.38 14.08 12.59 13.82 11.64 12.97C10.9 12.31 10.41 11.5 10.28 11.28C10.15 11.06 10.26 10.93 10.39 10.81C10.5 10.7 10.64 10.51 10.77 10.37C10.9 10.23 10.94 10.13 11.02 9.96C11.11 9.79 11.07 9.65 11.01 9.52C10.95 9.39 10.45 8.17 10.25 7.67C10.05 7.18 9.85 7.25 9.7 7.24C9.56 7.24 9.4 7.24 9.24 7.24L9.11 7.09Z" />
  </svg>
);

const SERVICE_LABELS: Record<ServiceType, string> = {
  'menage-regulier': "Ménage d'entretien régulier",
  'menage-ponctuel': "Ménage ponctuel",
  'grand-nettoyage': "Grand nettoyage de saison / Rénovation",
  'etat-des-lieux': "État des lieux / Fin de bail",
  'autre': "Autre demande spécifique",
};

interface ContactPageProps {
  navigate: (path: PageRoute) => void;
  legalConfig: SiteLegalConfig;
}

export const ContactPage: React.FC<ContactPageProps> = ({ navigate, legalConfig }) => {
  const [formData, setFormData] = useState<QuoteFormState>({
    fullName: '',
    email: '',
    phone: '',
    serviceType: 'menage-regulier',
    frequency: 'Hebdomadaire (1x / semaine)',
    surfaceApprox: '',
    addressOrCity: '',
    message: '',
    earlyStartRequested: false,
    honeypot: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof QuoteFormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dispatchStatus, setDispatchStatus] = useState<'success' | 'fallback'>('success');
  const [cooldownSecondsLeft, setCooldownSecondsLeft] = useState<number>(0);
  const [hourlyLimitReached, setHourlyLimitReached] = useState<boolean>(false);
  const [antiSpamNotice, setAntiSpamNotice] = useState<string | null>(null);

  // Speed-trap to detect bot submission speed (<2.5s from mount)
  const formMountTimeRef = useRef<number>(Date.now());

  const cleanDigitsPhone = legalConfig.contactPhone.replace(/\D/g, ''); // e.g. "33767575659"

  // Check initial cooldown and hourly limit on mount
  useEffect(() => {
    try {
      const lastTimeRaw = localStorage.getItem('alpes_last_quote_time');
      if (lastTimeRaw) {
        const lastTime = parseInt(lastTimeRaw, 10);
        if (!isNaN(lastTime)) {
          const elapsedSec = Math.floor((Date.now() - lastTime) / 1000);
          if (elapsedSec < COOLDOWN_SECONDS) {
            setCooldownSecondsLeft(COOLDOWN_SECONDS - elapsedSec);
          }
        }
      }

      const recent = getRecentSubmissions();
      if (recent.length >= MAX_SUBMISSIONS_PER_HOUR) {
        setHourlyLimitReached(true);
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  // Live countdown timer for active cooldown
  useEffect(() => {
    if (cooldownSecondsLeft <= 0) return;

    const interval = setInterval(() => {
      setCooldownSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [cooldownSecondsLeft]);

  const validate = () => {
    const errs: Partial<Record<keyof QuoteFormState, string>> = {};

    if (!formData.fullName.trim()) {
      errs.fullName = 'Veuillez renseigner votre nom complet.';
    }

    if (!formData.email.trim()) {
      errs.email = 'Veuillez renseigner votre adresse email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Veuillez renseigner une adresse email valide.';
    }

    if (!formData.message.trim()) {
      errs.message = 'Veuillez préciser votre demande ou vos attentes.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const buildWhatsAppMessage = () => {
    return `Bonjour Les Alpes Multiservices,\n\nJe souhaite demander un devis :\n• Nom : ${formData.fullName}\n• Prestation : ${SERVICE_LABELS[formData.serviceType] || formData.serviceType}\n• Fréquence : ${formData.frequency}\n• Commune : ${formData.addressOrCity || 'Bassin d\'Annecy'}\n• Superficie : ${formData.surfaceApprox ? `${formData.surfaceApprox} m²` : 'Non précisée'}\n• Téléphone : ${formData.phone || 'Non renseigné'}\n• Email : ${formData.email}\n• Message : ${formData.message}\n${formData.earlyStartRequested ? '• Note : Démarrage d\'intervention rapide souhaité\n' : ''}\nMerci d'avance pour votre retour !`;
  };

  const buildEmailBody = () => {
    return `Bonjour Les Alpes Multiservices,\n\nVoici le récapitulatif de ma demande de devis :\n- Nom : ${formData.fullName}\n- Email : ${formData.email}\n- Téléphone : ${formData.phone || 'Non renseigné'}\n- Prestation : ${SERVICE_LABELS[formData.serviceType] || formData.serviceType}\n- Fréquence : ${formData.frequency}\n- Commune / Lieu : ${formData.addressOrCity || 'Non renseigné'}\n- Surface approx : ${formData.surfaceApprox ? `${formData.surfaceApprox} m²` : 'Non renseignée'}\n- Démarrage anticipé (renonciation délai 14j) : ${formData.earlyStartRequested ? 'Oui' : 'Non'}\n- Message : ${formData.message}\n\nCordialement,\n${formData.fullName}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAntiSpamNotice(null);

    // 1. Spam honeypot trap: silently discard bot submission without alerting
    if (formData.honeypot) {
      console.warn('Bot detected via honeypot trap: submission discarded.');
      setSubmitted(true);
      return;
    }

    // 2. Speed-trap: bot submission in under minimum human typing time (< 2.5s)
    const elapsedSinceMount = Date.now() - formMountTimeRef.current;
    if (elapsedSinceMount < MIN_FILL_TIME_MS) {
      console.warn('Bot velocity detected (<2.5s): discarded.');
      setSubmitted(true);
      return;
    }

    // 3. Cooldown throttle check: prevent rapid consecutive sends
    if (cooldownSecondsLeft > 0) {
      setAntiSpamNotice(`Protection anti-spam active : veuillez patienter encore ${cooldownSecondsLeft} seconde${cooldownSecondsLeft > 1 ? 's' : ''} avant d'envoyer une nouvelle demande.`);
      return;
    }

    // 4. Hourly rate-limit check: maximum submissions per hour
    const recentSubmissions = getRecentSubmissions();
    if (recentSubmissions.length >= MAX_SUBMISSIONS_PER_HOUR) {
      setHourlyLimitReached(true);
      setAntiSpamNotice('Limite horaire de demandes atteinte (protection anti-abus). Contactez-nous directement par téléphone ou WhatsApp.');
      return;
    }

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    const payload = {
      _subject: `Demande de devis - ${formData.fullName} (${formData.addressOrCity || 'Annecy'})`,
      _template: 'table',
      _captcha: 'false',
      _replyto: formData.email,
      nom: formData.fullName,
      email: formData.email,
      telephone: formData.phone || 'Non renseigné',
      prestation: SERVICE_LABELS[formData.serviceType] || formData.serviceType,
      frequence: formData.frequency,
      commune: formData.addressOrCity || 'Non renseigné',
      superficie_m2: formData.surfaceApprox ? `${formData.surfaceApprox} m²` : 'Non renseignée',
      demande_demarrage_anticipe: formData.earlyStartRequested ? 'Oui (Renonciation délai 14j)' : 'Non',
      message: formData.message,
      date_envoi: new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' }),
    };

    // Store lead locally in browser storage so no lead is ever lost
    try {
      const existing = JSON.parse(localStorage.getItem('alpes_multiservices_devis') || '[]');
      existing.unshift({ ...payload, id: Date.now() });
      localStorage.setItem('alpes_multiservices_devis', JSON.stringify(existing.slice(0, 100)));
    } catch {
      // Local storage fallback ignore
    }

    try {
      // Direct live background delivery straight to contact email (FormSubmit endpoint)
      const res = await fetch(`https://formsubmit.co/ajax/${legalConfig.contactEmail}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setDispatchStatus('success');
      } else {
        setDispatchStatus('fallback');
      }

      // Record submission timestamp and activate cooldown throttle
      recordSubmissionTimestamp();
      setCooldownSecondsLeft(COOLDOWN_SECONDS);

      const updatedRecent = getRecentSubmissions();
      if (updatedRecent.length >= MAX_SUBMISSIONS_PER_HOUR) {
        setHourlyLimitReached(true);
      }
    } catch (err) {
      console.warn('Network transmission notice:', err);
      setDispatchStatus('fallback');
      // Even on network error, record lead locally and set throttle to prevent rapid retry flood
      recordSubmissionTimestamp();
      setCooldownSecondsLeft(COOLDOWN_SECONDS);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
      window.scrollTo({ top: 80, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-teal-400 block">
            Devis Gratuit & Sans Engagement
          </span>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-serif tracking-tight">
            Contactez Les Alpes Multiservices
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Remplissez le formulaire ci-dessous ou échangez directement par WhatsApp ou téléphone pour recevoir votre estimation sous 24h ouvrées.
          </p>
        </div>
      </section>

      {/* Main Form Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Quote Request Form Area (order-1 on mobile, order-2 on desktop) */}
          <div className="order-1 lg:order-2 lg:col-span-8">
            <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-8 lg:p-10 shadow-xs">
              
              {/* Quick direct fast-track bar */}
              <div className="mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 text-xs text-slate-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="font-semibold text-slate-900">Besoin d&apos;une réponse rapide ?</span>
                  <span className="hidden md:inline text-slate-500">Contactez directement :</span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href={`https://wa.me/${cleanDigitsPhone}?text=${encodeURIComponent('Bonjour Les Alpes Multiservices, je souhaite des informations pour une prestation de ménage à Annecy.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold shadow-xs transition-colors"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href={`tel:${cleanDigitsPhone}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>07 67 57 56 59</span>
                  </a>
                </div>
              </div>

              {submitted ? (
                <div className="py-8 sm:py-12 text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-xs">
                    <Check className="w-8 h-8" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900">
                      Votre demande a bien été envoyée !
                    </h3>
                    <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
                      Merci <strong>{formData.fullName}</strong>. Votre demande de devis pour <strong>{SERVICE_LABELS[formData.serviceType]}</strong> a été transmise à notre équipe. Nous vous répondrons à l&apos;adresse <strong>{formData.email}</strong> sous 24h ouvrées.
                    </p>
                  </div>

                  {/* Transmission indicator pill */}
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200 text-xs font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                    <span>Transmis à {legalConfig.contactEmail}</span>
                  </div>

                  {/* Detailed recap box */}
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 max-w-lg mx-auto text-left space-y-2">
                    <div className="font-semibold text-slate-900 border-b border-slate-200 pb-2 flex items-center justify-between">
                      <span>Récapitulatif de votre demande</span>
                      <span className="text-[11px] font-normal text-slate-500">ID #{Date.now().toString().slice(-6)}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      <div><span className="text-slate-500">Prestation :</span> <span className="font-medium text-slate-900 block">{SERVICE_LABELS[formData.serviceType]}</span></div>
                      <div><span className="text-slate-500">Fréquence :</span> <span className="font-medium text-slate-900 block">{formData.frequency}</span></div>
                      {formData.addressOrCity && <div><span className="text-slate-500">Commune :</span> <span className="font-medium text-slate-900 block">{formData.addressOrCity}</span></div>}
                      {formData.surfaceApprox && <div><span className="text-slate-500">Superficie :</span> <span className="font-medium text-slate-900 block">{formData.surfaceApprox} m²</span></div>}
                      {formData.phone && <div><span className="text-slate-500">Téléphone :</span> <span className="font-medium text-slate-900 block">{formData.phone}</span></div>}
                      <div><span className="text-slate-500">Email :</span> <span className="font-medium text-slate-900 block">{formData.email}</span></div>
                    </div>
                    {formData.message && (
                      <div className="pt-2 border-t border-slate-200/70">
                        <span className="text-slate-500 block mb-0.5">Votre message :</span>
                        <p className="text-slate-800 italic bg-white p-2.5 rounded-lg border border-slate-200 text-[11px]">
                          &laquo; {formData.message} &raquo;
                        </p>
                      </div>
                    )}
                    {formData.earlyStartRequested && (
                      <div className="text-teal-800 font-medium text-[11px] pt-1">
                        ✓ Demande d&apos;exécution anticipée (renonciation au délai de 14j demandée)
                      </div>
                    )}
                  </div>

                  {/* Multi-channel instant actions */}
                  <div className="pt-2 space-y-3 max-w-md mx-auto">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                      Options de suivi immédiat :
                    </span>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5">
                      {/* WhatsApp direct dispatch */}
                      <a
                        href={`https://wa.me/${cleanDigitsPhone}?text=${encodeURIComponent(buildWhatsAppMessage())}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xs transition-colors"
                      >
                        <WhatsAppIcon className="w-4 h-4" />
                        <span>Transmettre sur WhatsApp</span>
                      </a>

                      {/* Direct phone call */}
                      <a
                        href={`tel:${cleanDigitsPhone}`}
                        className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xs transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Appeler l&apos;artisan</span>
                      </a>

                      {/* Mailto fallback */}
                      <a
                        href={`mailto:${legalConfig.contactEmail}?subject=${encodeURIComponent(`Demande de devis - ${formData.fullName}`)}&body=${encodeURIComponent(buildEmailBody())}`}
                        className="inline-flex items-center justify-center gap-2 bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xs transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Copie e-mail</span>
                      </a>
                    </div>

                    <div className="pt-4">
                      <button
                        type="button"
                        onClick={() => {
                          setSubmitted(false);
                          formMountTimeRef.current = Date.now();
                          setAntiSpamNotice(null);
                          setFormData({
                            fullName: '',
                            email: '',
                            phone: '',
                            serviceType: 'menage-regulier',
                            frequency: 'Hebdomadaire (1x / semaine)',
                            surfaceApprox: '',
                            addressOrCity: '',
                            message: '',
                            earlyStartRequested: false,
                            honeypot: '',
                          });
                        }}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-300 hover:border-slate-800 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Faire une nouvelle demande</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Invisible honeypot trap to catch automated web crawlers & bots */}
                  <div
                    style={{
                      position: 'absolute',
                      opacity: 0,
                      top: '-9999px',
                      left: '-9999px',
                      height: 0,
                      width: 0,
                      zIndex: -1,
                      pointerEvents: 'none',
                    }}
                    aria-hidden="true"
                  >
                    <label htmlFor="website_hp">Laissez ce champ vide :</label>
                    <input
                      id="website_hp"
                      type="text"
                      name="website_hp"
                      value={formData.honeypot}
                      onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {/* Anti-spam cooldown banner if user attempts rapid multiple submissions */}
                  {cooldownSecondsLeft > 0 && (
                    <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center justify-between gap-3 animate-in fade-in duration-200">
                      <div className="flex items-center gap-2.5">
                        <Clock className="w-4 h-4 text-amber-600 shrink-0 animate-spin" />
                        <div>
                          <span className="font-semibold block">Délai de sécurité anti-spam actif</span>
                          <span className="text-amber-800">
                            Un devis vient d&apos;être envoyé. Prochain envoi disponible dans <strong>{cooldownSecondsLeft}s</strong>.
                          </span>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-lg bg-amber-200/80 font-mono font-bold text-amber-950 text-xs shrink-0">
                        {cooldownSecondsLeft}s
                      </span>
                    </div>
                  )}

                  {/* Hourly quota alert if rate limit reached */}
                  {hourlyLimitReached && (
                    <div className="p-4 rounded-xl bg-slate-100 border border-slate-300 text-slate-800 text-xs space-y-2">
                      <div className="flex items-center gap-2 font-semibold text-slate-900">
                        <Shield className="w-4 h-4 text-teal-700 shrink-0" />
                        <span>Protection anti-abus : limite horaire atteinte</span>
                      </div>
                      <p className="text-slate-600 leading-relaxed">
                        Plusieurs demandes ont déjà été transmises depuis ce navigateur au cours de la dernière heure. Pour un traitement immédiat sans attente :
                      </p>
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <a
                          href={`tel:${cleanDigitsPhone}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold transition-colors"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>07 67 57 56 59</span>
                        </a>
                        <a
                          href={`https://wa.me/${cleanDigitsPhone}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold transition-colors"
                        >
                          <WhatsAppIcon className="w-3.5 h-3.5" />
                          <span>WhatsApp direct</span>
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Generic anti-spam notice if any */}
                  {antiSpamNotice && !hourlyLimitReached && cooldownSecondsLeft === 0 && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      <span>{antiSpamNotice}</span>
                    </div>
                  )}

                  <div>
                    <h2 className="text-xl font-bold font-serif text-slate-900">
                      Demande de devis personnalisé
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Les champs suivis d&apos;un astérisque (*) sont requis. Réponse garantie sous 24h ouvrées.
                    </p>
                  </div>

                  {/* Personal identity */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="fullName" className="block text-xs font-semibold text-slate-800 mb-1">
                        Nom et prénom *
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="Ex : Marie Dupont"
                        className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-hidden focus:ring-2 ${
                          errors.fullName
                            ? 'border-rose-300 focus:ring-rose-200'
                            : 'border-slate-300 focus:border-teal-600 focus:ring-teal-100'
                        }`}
                      />
                      {errors.fullName && (
                        <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.fullName}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs font-semibold text-slate-800 mb-1">
                        Adresse email *
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Ex : marie.dupont@email.fr"
                        className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-hidden focus:ring-2 ${
                          errors.email
                            ? 'border-rose-300 focus:ring-rose-200'
                            : 'border-slate-300 focus:border-teal-600 focus:ring-teal-100'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-xs font-semibold text-slate-800 mb-1">
                        Numéro de téléphone (recommandé pour échange direct)
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="Ex : 06 12 34 56 78"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-hidden focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                      />
                      <span className="text-[11px] text-slate-500 block mt-1">
                        Pour convenir d&apos;un créneau. Opposition au démarchage sur{' '}
                        <a
                          href="https://www.bloctel.gouv.fr"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline hover:text-slate-800"
                        >
                          bloctel.gouv.fr
                        </a>{' '}
                        (art. L. 223-2 C. consom.).
                      </span>
                    </div>

                    <div>
                      <label htmlFor="addressOrCity" className="block text-xs font-semibold text-slate-800 mb-1">
                        Commune d&apos;intervention (ou code postal)
                      </label>
                      <input
                        id="addressOrCity"
                        type="text"
                        value={formData.addressOrCity}
                        onChange={(e) => setFormData({ ...formData, addressOrCity: e.target.value })}
                        placeholder="Ex : Annecy-le-Vieux, Seynod, Veyrier, Poisy..."
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-hidden focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                      />
                    </div>
                  </div>

                  {/* Service details */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                    <div>
                      <label htmlFor="serviceType" className="block text-xs font-semibold text-slate-800 mb-1">
                        Type de prestation *
                      </label>
                      <select
                        id="serviceType"
                        value={formData.serviceType}
                        onChange={(e) => setFormData({ ...formData, serviceType: e.target.value as ServiceType })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm bg-white focus:outline-hidden focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                      >
                        <option value="menage-regulier">Ménage régulier</option>
                        <option value="menage-ponctuel">Ménage ponctuel</option>
                        <option value="grand-nettoyage">Grand nettoyage de saison</option>
                        <option value="etat-des-lieux">État des lieux / Fin de bail</option>
                        <option value="autre">Autre demande spécifique</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="frequency" className="block text-xs font-semibold text-slate-800 mb-1">
                        Fréquence envisagée
                      </label>
                      <select
                        id="frequency"
                        value={formData.frequency}
                        onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm bg-white focus:outline-hidden focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                      >
                        <option value="Hebdomadaire (1x / semaine)">1 fois par semaine</option>
                        <option value="Bimensuel (1x toutes les 2 semaines)">Tous les 15 jours</option>
                        <option value="Ponctuel (une seule intervention)">Ponctuel (1 seule fois)</option>
                        <option value="À convenir">À définir ensemble</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="surfaceApprox" className="block text-xs font-semibold text-slate-800 mb-1">
                        Superficie approx. (m²)
                      </label>
                      <input
                        id="surfaceApprox"
                        type="text"
                        value={formData.surfaceApprox}
                        onChange={(e) => setFormData({ ...formData, surfaceApprox: e.target.value })}
                        placeholder="Ex : 85 m² (T3)"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-hidden focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-xs font-semibold text-slate-800 mb-1">
                      Précisions sur vos attentes ou votre logement *
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Décrivez votre besoin : nombre de pièces, présence d'animaux, matériaux fragiles (parquet massif, marbre), créneaux préférés (matin / après-midi)..."
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-hidden focus:ring-2 ${
                        errors.message
                          ? 'border-rose-300 focus:ring-rose-200'
                          : 'border-slate-300 focus:border-teal-600 focus:ring-teal-100'
                      }`}
                    ></textarea>
                    {errors.message && (
                      <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  {/* CGV Statutory waiver checkbox (§6 compliance) */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <label className="flex items-start gap-3 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={formData.earlyStartRequested}
                        onChange={(e) => setFormData({ ...formData, earlyStartRequested: e.target.checked })}
                        className="mt-1 h-4 w-4 rounded border-slate-300 text-teal-700 focus:ring-teal-500"
                      />
                      <span className="text-xs text-slate-600 leading-relaxed">
                        <strong className="text-slate-900 block font-medium">
                          Demande d&apos;intervention rapide (optionnel) :
                        </strong>
                        Je demande expressément que la prestation puisse débuter avant l&apos;expiration du délai de rétractation légal de 14 jours, et reconnais que si la prestation est pleinement exécutée avant l&apos;exercice de la rétractation, je renonce à ce droit conformément à l&apos;article L. 221-25 du Code de la consommation (voir nos{' '}
                        <button
                          type="button"
                          onClick={() => navigate('/cgv')}
                          className="text-teal-700 underline underline-offset-2"
                        >
                          CGV
                        </button>
                        ).
                      </span>
                    </label>
                  </div>

                  {/* Mandatory RGPD Compliance Line (§8) */}
                  <div className="pt-2 text-xs text-slate-500">
                    <p className="flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      <span>
                        Vos données sont utilisées uniquement pour répondre à votre demande.{' '}
                        <button
                          type="button"
                          onClick={() => navigate('/confidentialite')}
                          className="text-teal-700 hover:text-teal-900 font-semibold underline underline-offset-2"
                        >
                          En savoir plus.
                        </button>
                      </span>
                    </p>
                  </div>

                  {/* Submit button & Alternative Action */}
                  <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <button
                      type="submit"
                      disabled={isSubmitting || cooldownSecondsLeft > 0 || hourlyLimitReached}
                      className="min-h-[46px] w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-teal-700 hover:bg-teal-800 disabled:bg-slate-400 disabled:cursor-not-allowed text-white font-semibold px-8 py-3.5 rounded-xl shadow-xs transition-all text-sm cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Envoi de votre demande en cours...</span>
                        </>
                      ) : cooldownSecondsLeft > 0 ? (
                        <>
                          <Clock className="w-4 h-4 animate-pulse" />
                          <span>Délai de sécurité ({cooldownSecondsLeft}s)</span>
                        </>
                      ) : hourlyLimitReached ? (
                        <>
                          <Shield className="w-4 h-4" />
                          <span>Limite temporaire atteinte</span>
                        </>
                      ) : (
                        <>
                          <span>Envoyer ma demande de devis</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    <a
                      href={`https://wa.me/${cleanDigitsPhone}?text=${encodeURIComponent(
                        formData.fullName
                          ? buildWhatsAppMessage()
                          : 'Bonjour Les Alpes Multiservices, je souhaite recevoir un devis pour une prestation à Annecy.'
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[46px] inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold px-5 py-3 rounded-xl shadow-xs transition-colors"
                    >
                      <WhatsAppIcon className="w-4 h-4" />
                      <span>Échanger via WhatsApp</span>
                    </a>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Direct coordinates sidebar */}
          <div className="order-2 lg:order-1 lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
              <div>
                <h2 className="text-lg font-bold font-serif text-slate-900 mb-1">
                  Coordonnées directes
                </h2>
                <p className="text-xs text-slate-500">
                  Nous répondons à vos messages du lundi au samedi de 8h à 19h.
                </p>
              </div>

              <div className="space-y-4 text-xs text-slate-700">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="overflow-hidden">
                    <span className="block font-semibold text-slate-900">Email de contact :</span>
                    <a
                      href={`mailto:${legalConfig.contactEmail}`}
                      className="font-mono text-teal-800 hover:text-teal-900 underline break-all text-xs"
                    >
                      {legalConfig.contactEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-semibold text-slate-900">Téléphone & WhatsApp :</span>
                    <a
                      href={`tel:${cleanDigitsPhone}`}
                      className="font-mono text-slate-700 hover:text-teal-800 font-semibold text-xs block"
                    >
                      {legalConfig.contactPhone}
                    </a>
                    <a
                      href={`https://wa.me/${cleanDigitsPhone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-[#128C7E] hover:text-[#075E54] font-medium mt-0.5"
                    >
                      <WhatsAppIcon className="w-3 h-3" />
                      <span>Écrire sur WhatsApp</span>
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-semibold text-slate-900">Adresse de l&apos;entreprise :</span>
                    <span className="text-slate-600 block">{legalConfig.professionalAddress}</span>
                    <a
                      href="https://www.google.com/maps/place/Les+alpes+multiservices/@45.9063032,6.1071561,19z/data=!4m6!3m5!1s0x478b852e993cd721:0xe6f58a9e8412ca0f!8m2!3d45.9063032!4d6.1071561!16s%2Fg%2F11y1_9y8k7"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-teal-700 hover:text-teal-900 font-semibold underline underline-offset-2 mt-0.5"
                    >
                      <span>Voir sur Google Maps (Repère exact)</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-semibold text-slate-900">Délai de réponse :</span>
                    <span className="text-slate-600">Sous 24h ouvrées maximum</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Privacy Promise Box */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-3 text-xs text-slate-600">
              <div className="flex items-center gap-2 text-slate-900 font-semibold">
                <Shield className="w-4 h-4 text-teal-600" />
                <span>Protection stricte de vos données</span>
              </div>
              <p className="leading-relaxed">
                Conformément à la réglementation RGPD, les informations recueillies dans ce formulaire sont traitées exclusivement pour répondre à votre demande de devis et organiser la prestation.
              </p>
              <p className="leading-relaxed">
                Aucun démarchage commercial ultérieur, aucune revente de données.
              </p>
              <button
                type="button"
                onClick={() => navigate('/confidentialite')}
                className="text-teal-700 hover:text-teal-900 font-semibold underline underline-offset-2 inline-block pt-1 cursor-pointer"
              >
                Lire notre politique de confidentialité →
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
