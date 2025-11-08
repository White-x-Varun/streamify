import React from "react";
import { useThemeStore } from "../store/useThemeStore";
import { PaletteIcon } from "lucide-react";
import { THEMES } from "../constants";

const ThemeSelector = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="dropdown dropdown-end">
      {/* Outer button */}
      <button tabIndex={0} className="btn btn-ghost btn-sm">
        <PaletteIcon className="h-5 w-5 stroke-current" />
      </button>

      {/* Dropdown content */}
      <div
        tabIndex={0}
        className="dropdown-content mt-2 p-1 shadow-2xl bg-base-100 backdrop-blur-lg rounded-2xl w-56 border border-base-content/10 max-h-80 overflow-y-auto"
        style={{ backgroundColor: 'var(--base-100)', borderColor: 'var(--base-content)' }}
      >
        <div className="space-y-1">
          {THEMES.map((themeOption) => (
            <button
              key={themeOption.name}
              className={`w-full px-4 py-3 rounded-xl flex items-center gap-3 transition-colors ${
                theme === themeOption.name
                  ? "bg-primary text-primary-content"
                  : "hover:bg-base-content/10 text-base-content"
              }`}
              onClick={() => setTheme(themeOption.name)}
              style={{
                color: theme === themeOption.name ? undefined : 'var(--base-content)',
                backgroundColor: theme === themeOption.name ? undefined : 'transparent'
              }}
            >
              <PaletteIcon className="h-4 w-4 stroke-current" />
              <span className="text-sm font-medium">{themeOption.label}</span>
              <div className="ml-auto flex gap-1">
                {themeOption.colors.map((color, i) => (
                  <span
                    key={i}
                    className="h-2 w-2 rounded-full border border-base-content/20"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemeSelector;
