// sdk.js — Element SDK setup (guarded for React environment)

const defaultConfig = {
  store_name: 'Curate Store',
  tagline: 'Where luxury meets simplicity',
  background_color: '#FAF8F5',
  surface_color: '#FFFFFF',
  text_color: '#1F1F1F',
  primary_action_color: '#1F1F1F',
  secondary_action_color: '#C8A97E',
  font_family: 'Poppins',
  font_size: 14
};

function applyConfig(config) {
  document.body.style.backgroundColor = config.background_color || defaultConfig.background_color;
  document.body.style.fontFamily = `${config.font_family || defaultConfig.font_family}, sans-serif`;
  const h = document.getElementById('loginHeading');
  if (h) h.innerHTML = `Welcome to<br><span class="text-gold font-medium">${config.store_name || defaultConfig.store_name}</span>`;
  const t = document.getElementById('loginTagline');
  if (t) t.textContent = config.tagline || defaultConfig.tagline;
  const b = document.getElementById('navBrand');
  if (b) b.textContent = (config.store_name || defaultConfig.store_name).split(' ')[0];
}

// Only init the SDK if it actually exists (it won't in a plain React app)
if (window.elementSdk) {
  window.elementSdk.init({
    defaultConfig,
    onConfigChange: async (config) => { applyConfig(config); },
    mapToCapabilities: (config) => ({
      recolorables: [
        { get: () => config.background_color || defaultConfig.background_color, set: (v) => { config.background_color = v; window.elementSdk.setConfig({ background_color: v }); } },
        { get: () => config.surface_color || defaultConfig.surface_color, set: (v) => { config.surface_color = v; window.elementSdk.setConfig({ surface_color: v }); } },
        { get: () => config.text_color || defaultConfig.text_color, set: (v) => { config.text_color = v; window.elementSdk.setConfig({ text_color: v }); } },
        { get: () => config.primary_action_color || defaultConfig.primary_action_color, set: (v) => { config.primary_action_color = v; window.elementSdk.setConfig({ primary_action_color: v }); } },
        { get: () => config.secondary_action_color || defaultConfig.secondary_action_color, set: (v) => { config.secondary_action_color = v; window.elementSdk.setConfig({ secondary_action_color: v }); } },
      ],
      borderables: [],
      fontEditable: { get: () => config.font_family || defaultConfig.font_family, set: (v) => { config.font_family = v; window.elementSdk.setConfig({ font_family: v }); } },
      fontSizeable: { get: () => config.font_size || defaultConfig.font_size, set: (v) => { config.font_size = v; window.elementSdk.setConfig({ font_size: v }); } }
    }),
    mapToEditPanelValues: (config) => new Map([
      ['store_name', config.store_name || defaultConfig.store_name],
      ['tagline', config.tagline || defaultConfig.tagline]
    ])
  });
} 