import { Moon, Sun } from "lucide-react"
import { useState } from "react"

import { DitherControls } from "@/components/dither-controls"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { DitheredLogo } from "@/components/ui/dithered-logo"
import { useDebouncedValue } from "@/hooks/use-debounced-value"
import { DEFAULT_DITHER_SETTINGS } from "@/lib/dither-settings"

export function App() {
  const { theme, setTheme } = useTheme()
  const [settings, setSettings] = useState(DEFAULT_DITHER_SETTINGS)
  const applied = useDebouncedValue(settings, 150)
  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)

  return (
    <div className="relative min-h-svh overflow-hidden bg-background text-foreground">
      <DitheredLogo
        imageSrc="/logo_mark.png"
        className="h-svh w-full text-foreground"
        gridSize={applied.gridSize}
        scale={applied.scale}
        dotScale={applied.dotScale}
        invert={applied.invert}
        cornerRadius={applied.cornerRadius}
        threshold={applied.threshold}
        contrast={applied.contrast}
        gamma={applied.gamma}
        blur={applied.blur}
        diffusionStrength={applied.diffusionStrength}
        serpentine={applied.serpentine}
        particleColor="currentColor"
      />

      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between p-4">
        <p className="pointer-events-none text-xs tracking-[0.2em] text-muted-foreground uppercase">
          Ottr
        </p>
        <Button
          variant="outline"
          size="icon"
          className="pointer-events-auto"
          aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
          onClick={() => setTheme(isDark ? "light" : "dark")}
        >
          {isDark ? <Sun /> : <Moon />}
        </Button>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-end p-4">
        <div className="pointer-events-auto">
          <DitherControls
            value={settings}
            onChange={setSettings}
            onReset={() => setSettings(DEFAULT_DITHER_SETTINGS)}
          />
        </div>
      </div>
    </div>
  )
}

export default App
