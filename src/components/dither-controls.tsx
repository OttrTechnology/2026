import { RotateCcw } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import type { DitherSettings } from "@/lib/dither-settings"

type DitherControlsProps = {
  value: DitherSettings
  onChange: (next: DitherSettings) => void
  onReset: () => void
}

function NumberSlider({
  id,
  label,
  value,
  min,
  max,
  step,
  format = (n) => n.toString(),
  onChange,
  disabled,
}: {
  id: string
  label: string
  value: number
  min: number
  max: number
  step: number
  format?: (value: number) => string
  onChange: (value: number) => void
  disabled?: boolean
}) {
  return (
    <div className={disabled ? "space-y-1.5 opacity-40" : "space-y-1.5"}>
      <div className="flex items-center justify-between gap-3">
        <Label htmlFor={id} className="text-xs font-normal text-muted-foreground">
          {label}
        </Label>
        <span className="font-mono text-[11px] tabular-nums">{format(value)}</span>
      </div>
      <Slider
        id={id}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        value={[value]}
        onValueChange={(next) => {
          const parsed = Array.isArray(next) ? next[0] : next
          if (typeof parsed === "number") onChange(parsed)
        }}
      />
    </div>
  )
}

function ToggleRow({
  id,
  label,
  checked,
  onCheckedChange,
}: {
  id: string
  label: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <Label htmlFor={id} className="text-xs font-normal text-muted-foreground">
        {label}
      </Label>
      <Switch
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        size="sm"
      />
    </div>
  )
}

export function DitherControls({ value, onChange, onReset }: DitherControlsProps) {
  const patch = (partial: Partial<DitherSettings>) =>
    onChange({ ...value, ...partial })

  return (
    <Card
      size="sm"
      className="max-h-[min(70svh,560px)] w-[min(calc(100vw-1.5rem),280px)] overflow-y-auto bg-card/85 backdrop-blur-md"
    >
      <CardHeader className="border-b">
        <CardTitle>Dither</CardTitle>
        <CardAction>
          <Button variant="ghost" size="xs" onClick={onReset}>
            <RotateCcw />
            Reset
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 py-3">
        <NumberSlider
          id="gridSize"
          label="Grid size"
          value={value.gridSize}
          min={80}
          max={400}
          step={1}
          onChange={(gridSize) => patch({ gridSize })}
        />
        <NumberSlider
          id="scale"
          label="Scale"
          value={value.scale}
          min={0.2}
          max={1}
          step={0.01}
          format={(n) => n.toFixed(2)}
          onChange={(scale) => patch({ scale })}
        />
        <NumberSlider
          id="dotScale"
          label="Dot scale"
          value={value.dotScale}
          min={0.3}
          max={3}
          step={0.05}
          format={(n) => n.toFixed(2)}
          onChange={(dotScale) => patch({ dotScale })}
        />
        <ToggleRow
          id="invert"
          label="Invert"
          checked={value.invert}
          onCheckedChange={(invert) => patch({ invert })}
        />
        <NumberSlider
          id="cornerRadius"
          label="Corner radius"
          value={value.cornerRadius}
          min={0}
          max={0.5}
          step={0.01}
          format={(n) => n.toFixed(2)}
          disabled={!value.invert}
          onChange={(cornerRadius) => patch({ cornerRadius })}
        />
        <NumberSlider
          id="threshold"
          label="Threshold"
          value={value.threshold}
          min={0}
          max={255}
          step={1}
          onChange={(threshold) => patch({ threshold })}
        />
        <NumberSlider
          id="contrast"
          label="Contrast"
          value={value.contrast}
          min={-100}
          max={100}
          step={1}
          onChange={(contrast) => patch({ contrast })}
        />
        <NumberSlider
          id="gamma"
          label="Gamma"
          value={value.gamma}
          min={0.3}
          max={3}
          step={0.05}
          format={(n) => n.toFixed(2)}
          onChange={(gamma) => patch({ gamma })}
        />
        <NumberSlider
          id="blur"
          label="Blur"
          value={value.blur}
          min={0}
          max={10}
          step={0.05}
          format={(n) => n.toFixed(2)}
          onChange={(blur) => patch({ blur })}
        />
        <NumberSlider
          id="diffusionStrength"
          label="Diffusion"
          value={value.diffusionStrength}
          min={0}
          max={2}
          step={0.05}
          format={(n) => n.toFixed(2)}
          onChange={(diffusionStrength) => patch({ diffusionStrength })}
        />
        <ToggleRow
          id="serpentine"
          label="Serpentine"
          checked={value.serpentine}
          onCheckedChange={(serpentine) => patch({ serpentine })}
        />
      </CardContent>
    </Card>
  )
}
