'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface SiteImagesConfig {
  hero: string;
  automotriz: string;
  hogares: string;
  comercios: string;
  logo: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'automotriz' | 'hogares' | 'comercios';
  film: string;
  location: string;
  image: string;
  description: string;
  videoUrl?: string;
  mediaType?: 'image' | 'video';
  borderRadius?: number;
}

export interface SiteCalculatorConfig {
  rollWidthMeters: number;
  usableWidthMeters: number;
  cuttingMarginCm: number;
  residentialSafetyMarginPercent: number;
  automotiveSafetyMarginPercent: number;
  commercialSafetyMarginPercent: number;
  standardRollLengthMeters: number;
  disclaimer: string;
}

export interface CustomTextItem {
  id: string;
  key: string;
  label: string;
  value: string;
}

export interface ParticipationItem {
  id: string;
  title: string;
  event: string;
  city: string;
  year: string;
  badge: string;
  description?: string;
}

export interface SiteTextsConfig {
  // Datos comerciales y contacto
  businessName: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  instagram: string;
  footerDescription: string;

  // Barra de anuncios / aviso destacado superior
  announcementActive: boolean;
  announcementText: string;

  // Portada Principal (Hero)
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  heroCtaCalculator: string;
  heroCtaCatalog: string;
  heroStat1Number: string;
  heroStat1Label: string;
  heroStat2Number: string;
  heroStat2Label: string;
  heroStat3Number: string;
  heroStat3Label: string;

  // Por qué Luminadia / Fundamento Técnico
  aboutBadge: string;
  aboutTitle: string;
  aboutParagraph1: string;
  aboutParagraph2: string;

  // Ámbitos de Aplicación (Servicios)
  servicesTitle: string;
  servicesSubtitle: string;
  serviceAutoTitle: string;
  serviceAutoDesc: string;
  serviceHomeTitle: string;
  serviceHomeDesc: string;
  serviceCommTitle: string;
  serviceCommDesc: string;

  // + Servicios Profesionales (Arquitectura, Contabilidad y Consultoría)
  masServiciosBadge: string;
  masServiciosTitle: string;
  masServiciosSubtitle: string;
  masServiciosDesc: string;

  // Textos libres adicionales elegidos por el admin
  customTexts: CustomTextItem[];
}

export const DEFAULT_SITE_IMAGES: SiteImagesConfig = {
  hero: '/images/hero-fachada.jpg',
  automotriz: '/images/automotriz.jpg',
  hogares: '/images/hogares.jpg',
  comercios: '/images/comercios.jpg',
  logo: '/images/luminadia-logo.png',
};

export const DEFAULT_PROJECTS: ProjectItem[] = [
  {
    id: 'p1',
    title: 'Pick-Up Toyota Hilux - Blindaje Térmico Completo',
    category: 'automotriz',
    film: 'Nano Cerámica Carbón 20 + Parabrisas Cerámica 70',
    location: 'Valle Central, Catamarca',
    image: '/images/automotriz.jpg',
    description: 'Instalación completa de control solar térmico para uso en zonas mineras y rurales con alta exposición solar. Termoformado de luneta en una sola pieza.',
  },
  {
    id: 'p2',
    title: 'Residencia en Falda de la Montaña - Ventanales Oeste',
    category: 'hogares',
    film: 'Nano Cerámica 70 & Dual Reflectiva 15',
    location: 'San Fernando del Valle de Catamarca',
    image: '/images/hogares.jpg',
    description: 'Tratamiento de 48 m² de ventanales con vista a las sierras. Reducción de 8°C en el interior de la sala principal en horario de verano.',
  },
  {
    id: 'p3',
    title: 'Showroom Comercial & Oficinas en Centro',
    category: 'comercios',
    film: 'Nano Cerámica Térmica 70 (Clara)',
    location: 'Centro Comercial, Catamarca',
    image: '/images/comercios.jpg',
    description: 'Protección integral de vidrieras de indumentaria contra rayos UV evitando decoloración de prendas y resplandor sobre puestos de trabajo.',
  },
  {
    id: 'p4',
    title: 'Sedán Volkswagen Vento - Confort Acústico y Térmico',
    category: 'automotriz',
    film: 'Nano Cerámica 20 en laterales y luneta',
    location: 'Padre Zanello 341, Catamarca',
    image: '/images/hero.jpg',
    description: 'Aplicación de tono grafito intermedio de alta nitidez para conductor y acompañantes sin interferencia en telepeaje ni señal satelital.',
  },
];

export const DEFAULT_PARTICIPATIONS: ParticipationItem[] = [
  {
    id: 'part-1',
    title: 'Expo Catamarca Construcción & Minería',
    event: 'Feria de la Construcción y Minería del NOA',
    city: 'Catamarca',
    year: '2025',
    badge: 'Expositores Oficiales',
    description: 'Demostración de rechazo infrarrojo y transmisión térmica en vidrio en tiempo real.',
  },
  {
    id: 'part-2',
    title: 'Expo Construcción & Arquitectura Buenos Aires',
    event: 'Congreso de Eficiencia Energética en Vidriados',
    city: 'Buenos Aires',
    year: '2025',
    badge: 'Capacitación Certificada',
    description: 'Actualización en normas de transmitancia térmica y películas nano-cerámicas de control solar.',
  },
  {
    id: 'part-3',
    title: 'Encuentro NOA de Arquitectura Sustentable',
    event: 'Mesa Técnica de Asoleamiento en Regiones Cálidas',
    city: 'Catamarca / Salta',
    year: '2024',
    badge: 'Asesores Técnicos de Fachadas',
    description: 'Disertación sobre el impacto del filtro solar en el confort y ahorro de climatización.',
  },
  {
    id: 'part-4',
    title: 'Seminario Automotriz de Películas de Alta Performance',
    event: 'Centro de Capacitación y Termoformado de Precisión',
    city: 'Córdoba',
    year: '2024',
    badge: 'Certificación Profesional',
    description: 'Técnicas avanzadas de termoformado en seco y patronaje de lunetas complejas sin cortes.',
  },
];

export const DEFAULT_CALCULATOR_CONFIG: SiteCalculatorConfig = {
  rollWidthMeters: 1.52,
  usableWidthMeters: 1.50,
  cuttingMarginCm: 2.5,
  residentialSafetyMarginPercent: 10,
  automotiveSafetyMarginPercent: 15,
  commercialSafetyMarginPercent: 12,
  standardRollLengthMeters: 30,
  disclaimer: 'Cálculo técnico orientativo. Los consumos finales pueden variar según cortes, termoformado y curvaturas del cristal.',
};

export const DEFAULT_SITE_TEXTS: SiteTextsConfig = {
  businessName: 'Luminadia',
  address: 'Padre Zanello 341, San Fernando del Valle de Catamarca',
  phone: '+54 9 383 427-2000',
  email: 'contacto@luminadia.com.ar',
  hours: 'Lunes a Viernes de 8:30 a 13:00 y 16:30 a 20:30 hs · Sábados de 9:00 a 13:00 hs',
  instagram: 'https://www.instagram.com/luminadia_catam/',
  footerDescription: 'Especialistas en control solar y películas American Tint · Surface Innovation en Catamarca. Window Films, Smart Film, PPF y Vinilos con rechazo calórico superior.',

  announcementActive: false,
  announcementText: 'Asesoramiento y relevamiento técnico en obra sin cargo en Catamarca Capital y Valle Central.',

  heroBadge: 'San Fernando del Valle de Catamarca · Taller y Relevamiento en Obra',
  heroTitle: 'Control solar de alta tecnología.',
  heroSubtitle: 'Láminas American Tint · Surface Innovation para vehículos, residencias y empresas: Window Films, Smart Film, PPF y Vinilos con máxima claridad óptica y rechazo térmico.',
  heroCtaCalculator: 'Calcular Materiales',
  heroCtaCatalog: 'Ver Catálogo de Láminas',
  heroStat1Number: '99%',
  heroStat1Label: 'Bloqueo UV Total',
  heroStat2Number: '88%',
  heroStat2Label: 'Rechazo Térmico IR',
  heroStat3Number: '1.52m',
  heroStat3Label: 'Ancho Útil de Rollo',

  aboutBadge: 'Quiénes somos y cómo trabajamos',
  aboutTitle: 'Ingeniería óptica para el clima de Catamarca.',
  aboutParagraph1: 'En Luminadia trabajamos con la línea oficial de control solar American Tint · Surface Innovation, diseñadas para soportar la alta radiación térmica y ultravioleta del Valle de Catamarca.',
  aboutParagraph2: 'No aplicamos tintes genéricos: seleccionamos películas con tecnología American Tint (Window Films de alto rechazo, Smart Film conmutable, PPF y vinilos) que filtran el calor sin alterar la visibilidad ni provocar deslumbramientos.',

  servicesTitle: 'Soluciones adaptadas a cada superficie vidriada.',
  servicesSubtitle: 'Cada proyecto responde a requerimientos técnicos específicos de transmisión de luz, seguridad y rechazo de calor.',
  serviceAutoTitle: 'Autos, Pick-Ups y Utilitarios',
  serviceAutoDesc: 'Láminas termoformables para parabrisas, laterales y lunetas térmicas. Protección contra el calor agobiante al volante y preservación del habitáculo.',
  serviceHomeTitle: 'Hogares, Casas y Departamentos',
  serviceHomeDesc: 'Ventanales residenciales, galerías vidriadas y tragaluces. Reducción drástica del calor interior y protección de pisos, muebles y cortinas contra la decoloración.',
  serviceCommTitle: 'Comercios, Oficinas y Empresas',
  serviceCommDesc: 'Fachadas corporativas, locales comerciales y vidrieras a la calle. Climatización eficiente, privacidad diurna y confort visual para clientes y puestos de trabajo.',

  // + Servicios Profesionales
  masServiciosBadge: 'Equipo Interdisciplinario · Arquitectura, Contabilidad & Obra',
  masServiciosTitle: '+ Servicios Profesionales & Consultoría Especializada',
  masServiciosSubtitle: 'Respaldados por profesionales de la arquitectura y las ciencias económicas para brindar soluciones integrales en proyectos residenciales, comerciales e industriales.',
  masServiciosDesc: 'Los titulares de Luminadia aúnan formación en arquitectura, diseño y finanzas, lo que permite abordar no solo la instalación técnica de láminas, sino el diagnóstico integral de asoleamiento, balance térmico, optimización energética y planificación de costos para desarrollos constructivos y licitaciones.',

  customTexts: [
    {
      id: 'txt-garantia',
      key: 'garantia_oficial',
      label: 'Garantía Escrita Oficial',
      value: 'Hasta 10 años de garantía escrita oficial contra decoloración, desprendimiento o burbujas.',
    },
    {
      id: 'txt-instalacion',
      key: 'tiempo_instalacion',
      label: 'Tiempo de Instalación en Taller',
      value: 'Instalación automotriz en el día con turno previo en nuestro taller de Padre Zanello 341.',
    },
    {
      id: 'txt-american-tint',
      key: 'marca_american_tint',
      label: 'Láminas American Tint · Surface Innovation',
      value: 'Window Films · Smart Film · PPF · Vinilos con certificación y colocación especializada en Catamarca.',
    },
  ],
};

interface SiteConfigContextType {
  images: SiteImagesConfig;
  projects: ProjectItem[];
  participations: ParticipationItem[];
  texts: SiteTextsConfig;
  calculator: SiteCalculatorConfig;
  updateImages: (newImages: Partial<SiteImagesConfig>) => Promise<boolean>;
  updateProjects: (newProjects: ProjectItem[]) => Promise<boolean>;
  updateParticipations: (newParticipations: ParticipationItem[]) => Promise<boolean>;
  addParticipation: (item: Omit<ParticipationItem, 'id'>) => Promise<boolean>;
  deleteParticipation: (id: string) => Promise<boolean>;
  resetParticipationsToDefault: () => Promise<boolean>;
  updateTexts: (newTexts: Partial<SiteTextsConfig>) => Promise<boolean>;
  updateCalculator: (newCalc: Partial<SiteCalculatorConfig>) => Promise<boolean>;
  uploadImageFile: (file: File, section: string) => Promise<string>;
  resetImagesToDefault: () => Promise<boolean>;
  resetCalculatorToDefault: () => Promise<boolean>;
  resetTextsToDefault: () => Promise<boolean>;
  getCustomText: (key: string, fallback?: string) => string;
}

const SiteConfigContext = createContext<SiteConfigContextType>({
  images: DEFAULT_SITE_IMAGES,
  projects: DEFAULT_PROJECTS,
  participations: DEFAULT_PARTICIPATIONS,
  texts: DEFAULT_SITE_TEXTS,
  calculator: DEFAULT_CALCULATOR_CONFIG,
  updateImages: async () => false,
  updateProjects: async () => false,
  updateParticipations: async () => false,
  addParticipation: async () => false,
  deleteParticipation: async () => false,
  resetParticipationsToDefault: async () => false,
  updateTexts: async () => false,
  updateCalculator: async () => false,
  uploadImageFile: async () => '',
  resetImagesToDefault: async () => false,
  resetCalculatorToDefault: async () => false,
  resetTextsToDefault: async () => false,
  getCustomText: () => '',
});

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

export function SiteConfigProvider({ children }: { children: React.ReactNode }) {
  const [images, setImages] = useState<SiteImagesConfig>(DEFAULT_SITE_IMAGES);
  const [projects, setProjects] = useState<ProjectItem[]>(DEFAULT_PROJECTS);
  const [participations, setParticipations] = useState<ParticipationItem[]>(DEFAULT_PARTICIPATIONS);
  const [texts, setTexts] = useState<SiteTextsConfig>(DEFAULT_SITE_TEXTS);
  const [calculator, setCalculator] = useState<SiteCalculatorConfig>(DEFAULT_CALCULATOR_CONFIG);

  // Carga inicial desde localStorage y backend
  useEffect(() => {
    // 1. Cargar desde localStorage para disponibilidad instantánea sin parpadeos
    try {
      const storedImages = localStorage.getItem('luminadia_site_images');
      if (storedImages) {
        try {
          const parsed = JSON.parse(storedImages);
          if (parsed && typeof parsed === 'object') {
            const resolvedHero = (parsed.hero && parsed.hero !== '/images/hero.jpg') ? parsed.hero : DEFAULT_SITE_IMAGES.hero;
            setImages((prev) => ({
              hero: resolvedHero,
              automotriz: (typeof parsed.automotriz === 'string' && parsed.automotriz.trim() !== '') ? parsed.automotriz : (prev.automotriz || DEFAULT_SITE_IMAGES.automotriz),
              hogares: (typeof parsed.hogares === 'string' && parsed.hogares.trim() !== '') ? parsed.hogares : (prev.hogares || DEFAULT_SITE_IMAGES.hogares),
              comercios: (typeof parsed.comercios === 'string' && parsed.comercios.trim() !== '') ? parsed.comercios : (prev.comercios || DEFAULT_SITE_IMAGES.comercios),
              logo: (typeof parsed.logo === 'string' && parsed.logo.trim() !== '') ? parsed.logo : (prev.logo || DEFAULT_SITE_IMAGES.logo),
            }));
          }
        } catch {}
      }
      const storedProjects = localStorage.getItem('luminadia_site_projects');
      if (storedProjects) {
        setProjects(JSON.parse(storedProjects));
      }
      const storedParts = localStorage.getItem('luminadia_site_participations');
      if (storedParts) {
        setParticipations(JSON.parse(storedParts));
      }
      const storedTexts = localStorage.getItem('luminadia_site_texts');
      if (storedTexts) {
        setTexts((prev) => ({ ...prev, ...JSON.parse(storedTexts) }));
      }
      const storedCalc = localStorage.getItem('luminadia_site_calculator');
      if (storedCalc) {
        setCalculator((prev) => ({ ...prev, ...JSON.parse(storedCalc) }));
      }
    } catch (e) {
      console.warn('Error reading site config from localStorage:', e);
    }

    // 2. Sincronizar con backend
    const syncWithBackend = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/content/settings`);
        if (!res.ok) return;
        const settings: Array<{ key: string; value: string }> = await res.json();
        const settingsMap: Record<string, string> = {};
        settings.forEach((s) => {
          settingsMap[s.key] = s.value;
        });

        // Actualizar imágenes si existen en el backend con fallback infalible a DEFAULT_SITE_IMAGES
        setImages((prev) => {
          const backendHero = settingsMap['image_hero'] || settingsMap['hero'];
          const resolvedHero = (backendHero && backendHero !== '/images/hero.jpg') ? backendHero : (prev.hero && prev.hero !== '/images/hero.jpg' ? prev.hero : DEFAULT_SITE_IMAGES.hero);
          const updated: SiteImagesConfig = {
            hero: resolvedHero,
            automotriz: settingsMap['image_automotriz'] || settingsMap['automotriz'] || prev.automotriz || DEFAULT_SITE_IMAGES.automotriz,
            hogares: settingsMap['image_hogares'] || settingsMap['hogares'] || prev.hogares || DEFAULT_SITE_IMAGES.hogares,
            comercios: settingsMap['image_comercios'] || settingsMap['comercios'] || prev.comercios || DEFAULT_SITE_IMAGES.comercios,
            logo: settingsMap['image_logo'] || settingsMap['logo'] || prev.logo || DEFAULT_SITE_IMAGES.logo,
          };
          try {
            localStorage.setItem('luminadia_site_images', JSON.stringify(updated));
          } catch {}
          return updated;
        });

        // Actualizar proyectos si existen en el backend
        if (settingsMap['projects_json']) {
          try {
            const parsed = JSON.parse(settingsMap['projects_json']);
            if (Array.isArray(parsed) && parsed.length > 0) {
              setProjects(parsed);
              localStorage.setItem('luminadia_site_projects', JSON.stringify(parsed));
            }
          } catch {}
        }

        // Actualizar participaciones si existen en el backend
        if (settingsMap['participations_json']) {
          try {
            const parsed = JSON.parse(settingsMap['participations_json']);
            if (Array.isArray(parsed) && parsed.length > 0) {
              setParticipations(parsed);
              localStorage.setItem('luminadia_site_participations', JSON.stringify(parsed));
            }
          } catch {}
        }

        // Actualizar textos si existen en el backend
        if (settingsMap['site_texts_json']) {
          try {
            const parsed = JSON.parse(settingsMap['site_texts_json']);
            setTexts((prev) => {
              const updated = { ...prev, ...parsed };
              localStorage.setItem('luminadia_site_texts', JSON.stringify(updated));
              return updated;
            });
          } catch {}
        } else {
          // Retrocompatibilidad con claves individuales
          setTexts((prev) => {
            const updated = {
              ...prev,
              businessName: settingsMap['business_name'] || prev.businessName,
              address: settingsMap['address'] || prev.address,
              phone: settingsMap['phone_whatsapp'] || prev.phone,
              instagram: settingsMap['instagram'] || prev.instagram,
              heroTitle: settingsMap['hero_title'] || prev.heroTitle,
              heroSubtitle: settingsMap['hero_subtitle'] || prev.heroSubtitle,
            };
            try {
              localStorage.setItem('luminadia_site_texts', JSON.stringify(updated));
            } catch {}
            return updated;
          });
        }

        // Actualizar calculadora si existe en backend
        if (settingsMap['calculator_config_json']) {
          try {
            const parsed = JSON.parse(settingsMap['calculator_config_json']);
            setCalculator((prev) => {
              const updated = { ...prev, ...parsed };
              localStorage.setItem('luminadia_site_calculator', JSON.stringify(updated));
              return updated;
            });
          } catch {}
        } else if (settingsMap['default_roll_width']) {
          const rw = parseFloat(settingsMap['default_roll_width']);
          if (!isNaN(rw) && rw > 0) {
            setCalculator((prev) => ({ ...prev, rollWidthMeters: rw }));
          }
        }
      } catch (err) {
        console.warn('Could not sync settings from backend, using local defaults/storage:', err);
      }
    };

    syncWithBackend();
  }, []);

  // Subir archivos de imagen
  const uploadImageFile = async (file: File, section: string): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('section', section);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || 'Error al subir la imagen.');
    }

    const data = await res.json();
    return data.url;
  };

  // Actualizar imágenes
  const updateImages = async (newImages: Partial<SiteImagesConfig>): Promise<boolean> => {
    const cleanUpdates: Partial<SiteImagesConfig> = {};
    (Object.keys(newImages) as Array<keyof SiteImagesConfig>).forEach((k) => {
      const val = newImages[k];
      if (typeof val === 'string' && val.trim() !== '') {
        cleanUpdates[k] = val;
      } else {
        cleanUpdates[k] = DEFAULT_SITE_IMAGES[k];
      }
    });

    const updated = { ...images, ...cleanUpdates };
    setImages(updated);
    try {
      localStorage.setItem('luminadia_site_images', JSON.stringify(updated));
    } catch {}

    try {
      const keysMap: Record<keyof SiteImagesConfig, string> = {
        hero: 'image_hero',
        automotriz: 'image_automotriz',
        hogares: 'image_hogares',
        comercios: 'image_comercios',
        logo: 'image_logo',
      };

      for (const [key, value] of Object.entries(cleanUpdates)) {
        const backendKey = keysMap[key as keyof SiteImagesConfig];
        if (backendKey && value) {
          // Guardar bajo la clave canónica con prefijo
          await fetch(`${BACKEND_URL}/content/settings/${backendKey}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ value }),
          }).catch(() => {});

          // Y también bajo la clave directa para compatibilidad
          await fetch(`${BACKEND_URL}/content/settings/${key}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ value }),
          }).catch(() => {});
        }
      }
      return true;
    } catch (err) {
      console.error('Error persisting images to backend:', err);
      return false;
    }
  };

  // Actualizar proyectos
  const updateProjects = async (newProjects: ProjectItem[]): Promise<boolean> => {
    setProjects(newProjects);
    try {
      localStorage.setItem('luminadia_site_projects', JSON.stringify(newProjects));
    } catch {}

    try {
      await fetch(`${BACKEND_URL}/content/settings/projects_json`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value: JSON.stringify(newProjects) }),
      }).catch(() => {});
      return true;
    } catch (err) {
      console.error('Error persisting projects to backend:', err);
      return false;
    }
  };

  // Actualizar textos del sitio
  const updateTexts = async (newTexts: Partial<SiteTextsConfig>): Promise<boolean> => {
    const updated = { ...texts, ...newTexts };
    setTexts(updated);
    try {
      localStorage.setItem('luminadia_site_texts', JSON.stringify(updated));
    } catch {}

    try {
      // Guardar el JSON consolidado completo
      await fetch(`${BACKEND_URL}/content/settings/site_texts_json`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value: JSON.stringify(updated) }),
      }).catch(() => {});

      // Sincronizar también campos clave para retrocompatibilidad
      const syncKeys = [
        { k: 'business_name', v: updated.businessName },
        { k: 'address', v: updated.address },
        { k: 'phone_whatsapp', v: updated.phone },
        { k: 'instagram', v: updated.instagram },
        { k: 'hero_title', v: updated.heroTitle },
        { k: 'hero_subtitle', v: updated.heroSubtitle },
      ];
      for (const item of syncKeys) {
        if (item.v) {
          await fetch(`${BACKEND_URL}/content/settings/${item.k}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ value: item.v }),
          }).catch(() => {});
        }
      }

      return true;
    } catch (err) {
      console.error('Error persisting texts to backend:', err);
      return false;
    }
  };

  // Actualizar parámetros de la calculadora
  const updateCalculator = async (newCalc: Partial<SiteCalculatorConfig>): Promise<boolean> => {
    const updated = { ...calculator, ...newCalc };
    setCalculator(updated);
    try {
      localStorage.setItem('luminadia_site_calculator', JSON.stringify(updated));
    } catch {}

    try {
      await fetch(`${BACKEND_URL}/content/settings/calculator_config_json`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value: JSON.stringify(updated) }),
      }).catch(() => {});

      if (updated.rollWidthMeters) {
        await fetch(`${BACKEND_URL}/content/settings/default_roll_width`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ value: updated.rollWidthMeters.toString() }),
        }).catch(() => {});
      }

      return true;
    } catch (err) {
      console.error('Error persisting calculator settings to backend:', err);
      return false;
    }
  };

  // Función de consulta rápida de texto personalizado
  const getCustomText = (key: string, fallback: string = ''): string => {
    const item = texts.customTexts?.find((t) => t.key === key);
    return item?.value || fallback;
  };

  // Actualizar lista de participaciones
  const updateParticipations = async (newParticipations: ParticipationItem[]): Promise<boolean> => {
    setParticipations(newParticipations);
    try {
      localStorage.setItem('luminadia_site_participations', JSON.stringify(newParticipations));
    } catch {}

    try {
      await fetch(`${BACKEND_URL}/content/settings/participations_json`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value: JSON.stringify(newParticipations) }),
      }).catch(() => {});
      return true;
    } catch (err) {
      console.error('Error persisting participations to backend:', err);
      return false;
    }
  };

  const addParticipation = async (item: Omit<ParticipationItem, 'id'>): Promise<boolean> => {
    const newItem: ParticipationItem = {
      ...item,
      id: `part-${Date.now()}`,
    };
    const updated = [newItem, ...participations];
    return updateParticipations(updated);
  };

  const deleteParticipation = async (id: string): Promise<boolean> => {
    const updated = participations.filter((p) => p.id !== id);
    return updateParticipations(updated);
  };

  const resetParticipationsToDefault = async (): Promise<boolean> => {
    return updateParticipations(DEFAULT_PARTICIPATIONS);
  };

  // Restaurar imágenes por defecto
  const resetImagesToDefault = async (): Promise<boolean> => {
    return updateImages(DEFAULT_SITE_IMAGES);
  };

  // Restaurar calculadora por defecto
  const resetCalculatorToDefault = async (): Promise<boolean> => {
    return updateCalculator(DEFAULT_CALCULATOR_CONFIG);
  };

  // Restaurar textos por defecto
  const resetTextsToDefault = async (): Promise<boolean> => {
    return updateTexts(DEFAULT_SITE_TEXTS);
  };

  return (
    <SiteConfigContext.Provider
      value={{
        images,
        projects,
        participations,
        texts,
        calculator,
        updateImages,
        updateProjects,
        updateParticipations,
        addParticipation,
        deleteParticipation,
        resetParticipationsToDefault,
        updateTexts,
        updateCalculator,
        uploadImageFile,
        resetImagesToDefault,
        resetCalculatorToDefault,
        resetTextsToDefault,
        getCustomText,
      }}
    >
      {children}
    </SiteConfigContext.Provider>
  );
}

export function useSiteConfig() {
  return useContext(SiteConfigContext);
}
