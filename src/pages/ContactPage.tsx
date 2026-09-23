import React, { useState } from 'react';
import { PageRoute, SiteLegalConfig, ServiceType, QuoteFormState } from '../types';
import { Mail, Phone, MapPin, Send, CheckCircle2, Shield, AlertCircle, Info, Clock, Check, ExternalLink } from 'lucide-react';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Spam honeypot trap: if filled by a robot, silently discard
    if (formData.honeypot) {
      console.warn('Honeypot filled, discarded.');
      return;
    }

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate reliable dispatch to CMS lead store & owner email
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      window.scrollTo({ top: 100, behavior: 'smooth' });
    }, 600);
  };

  return (
    <div className="space-y-16 pb-16">
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-8 sm:py-14 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-4xl mx-auto text-center space-y-3 sm:space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-teal-400 block">
            Devis Gratuit & Sans Engagement
          </span>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-serif tracking-tight">
            Contactez Les Alpes Multiservices
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Remplissez le formulaire ci-dessous pour recevoir une estimation rapide et sur mesure sous 24h ouvrées.
          </p>
        </div>
      </section>

      {/* Main Form Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Quote Request Form (order-1 on mobile so first input is well above the fold, order-2 on lg) */}
          <div className="order-1 lg:order-2 lg:col-span-8">
            <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-8 lg:p-10 shadow-xs">
              {/* Service Reassurance Intro Block */}
              <div className="mb-6 p-4 rounded-2xl bg-teal-50/70 border border-teal-200/80 shadow-xs flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-teal-700 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <div className="font-bold text-slate-900 text-sm font-serif">
                    Estimation gratuite & réponse garantie sous 24h ouvrées
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Étude personnalisée sans engagement de vos besoins d&apos;entretien ménager sur Annecy et tout le bassin lacustre.
                  </p>
                </div>
              </div>

              {submitted ? (
                <div className="py-12 text-center space-y-5 animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold font-serif text-slate-900">
                    Votre demande a bien été envoyée !
                  </h3>
                  <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
                    Merci <strong>{formData.fullName}</strong>. Nous avons bien reçu votre demande de devis pour : <strong>{formData.serviceType}</strong>. Un récapitulatif détaillé vous sera transmis à l&apos;adresse <strong>{formData.email}</strong> sous 24h.
                  </p>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 max-w-md mx-auto text-left space-y-1">
                    <div className="font-semibold text-slate-900 mb-1">Résumé de votre demande :</div>
                    <div>• <strong>Prestation :</strong> {formData.serviceType}</div>
                    <div>• <strong>Fréquence souhaitée :</strong> {formData.frequency}</div>
                    {formData.addressOrCity && <div>• <strong>Commune :</strong> {formData.addressOrCity}</div>}
                    {formData.surfaceApprox && <div>• <strong>Superficie :</strong> {formData.surfaceApprox} m²</div>}
                    {formData.earlyStartRequested && (
                      <div className="text-teal-800 font-medium">
                        • Demande d&apos;exécution anticipée (renonciation au délai de 14j demandée)
                      </div>
                    )}
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={`mailto:${legalConfig.contactEmail}?subject=${encodeURIComponent(`Demande de devis - ${formData.fullName}`)}&body=${encodeURIComponent(
                        `Bonjour Les Alpes Multiservices,\n\nVoici le récapitulatif de ma demande de devis :\n- Nom : ${formData.fullName}\n- Email : ${formData.email}\n- Téléphone : ${formData.phone || 'Non renseigné'}\n- Prestation : ${formData.serviceType}\n- Fréquence : ${formData.frequency}\n- Commune / Lieu : ${formData.addressOrCity || 'Non renseigné'}\n- Surface : ${formData.surfaceApprox ? `${formData.surfaceApprox} m²` : 'Non renseignée'}\n- Message : ${formData.message}\n\nCordialement,\n${formData.fullName}`
                      )}`}
                      className="inline-flex items-center gap-2 bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold px-5 py-2.5 rounded-xl shadow-xs transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Envoyer une copie depuis ma boîte mail</span>
                    </a>
                    <button
                      onClick={() => {
                        setSubmitted(false);
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
                      className="px-5 py-2.5 rounded-xl border border-slate-300 hover:border-slate-800 text-slate-700 text-xs font-semibold transition-colors"
                    >
                      Nouvelle demande
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Honeypot anti-spam trap (invisible to human users) */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="website_hp">Ne pas remplir si vous êtes un humain :</label>
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

                  <div>
                    <h2 className="text-xl font-bold font-serif text-slate-900">
                      Demande de devis personnalisé
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Les champs suivis d&apos;un astérisque (*) sont requis.
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
                        Numéro de téléphone (optionnel)
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
                        Pour convenir d&apos;un créneau. Vous avez le droit de vous inscrire gratuitement sur la liste d&apos;opposition au démarchage téléphonique sur{' '}
                        <a
                          href="https://www.bloctel.gouv.fr"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline hover:text-slate-800"
                        >
                          bloctel.gouv.fr
                        </a>{' '}
                        (art. L. 223-2 du Code de la consommation).
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
                        placeholder="Ex : Annecy-le-Vieux, Seynod, Veyrier..."
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
                      placeholder="Décrivez votre besoin : nombre de pièces, présence d'animaux, matériaux fragiles (parquet, marbre), créneaux préférés (matin / après-midi)..."
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

                  {/* Submit button */}
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="min-h-[44px] w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-teal-700 hover:bg-teal-800 disabled:bg-slate-400 text-white font-semibold px-8 py-3.5 rounded-xl shadow-sm transition-all text-sm cursor-pointer"
                    >
                      {isSubmitting ? (
                        <span>Envoi de votre demande en cours...</span>
                      ) : (
                        <>
                          <span>Envoyer ma demande de devis</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Left Column on Desktop, Secondary on Mobile (order-2 lg:order-1 lg:col-span-4) */}
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
                    <span className="block font-semibold text-slate-900">Téléphone :</span>
                    <a
                      href={`tel:${legalConfig.contactPhone.replace(/\s+/g, '')}`}
                      className="font-mono text-slate-700 hover:text-teal-800 font-semibold text-xs"
                    >
                      {legalConfig.contactPhone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-semibold text-slate-900">Adresse :</span>
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
                Aucun démarchage commercial ultérieur, aucune cession de données.
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
