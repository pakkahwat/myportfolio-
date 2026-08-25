// Small presentational primitives replacing the Vuetify components the
// original relied on (v-chip, v-btn, v-avatar, v-progress-linear, v-icon).
// Visual identity for each usage is carried by the surrounding scoped CSS
// (ported 1:1 from the Vue components), so these only need to reproduce
// layout/structure, not Vuetify's internal theming engine.
import type { ReactNode, ButtonHTMLAttributes } from 'react'

export function Icon({
  icon,
  size,
  color,
  className,
}: {
  icon: string
  size?: number
  color?: 'primary' | 'green' | string
  className?: string
}) {
  const colorVar =
    color === 'primary' ? 'var(--amber)' : color === 'green' ? 'var(--green)' : color
  return (
    <span
      className={`mdi ${icon} v-icon-inline${className ? ` ${className}` : ''}`}
      style={{ fontSize: size ? `${size}px` : undefined, color: colorVar }}
      aria-hidden="true"
    />
  )
}

export function Chip({
  children,
  variant = 'flat',
  color,
  size = 'default',
  icon,
  className = '',
}: {
  children: ReactNode
  variant?: 'flat' | 'tonal' | 'outlined'
  color?: 'primary'
  size?: 'small' | 'x-small' | 'default'
  icon?: string
  className?: string
}) {
  const sizeClass = size === 'small' ? 'v-chip--small' : size === 'x-small' ? 'v-chip--x-small' : ''
  const variantClass = `v-chip--${variant}${color ? ` v-chip--${color}` : ''}`
  return (
    <span className={`v-chip ${sizeClass} ${variantClass} ${className}`.trim()}>
      {icon && <Icon icon={icon} size={14} color={color === 'primary' ? 'primary' : undefined} />}
      {children}
    </span>
  )
}

export function Btn({
  children,
  variant = 'flat',
  color,
  size = 'default',
  icon,
  className = '',
  onClick,
  type = 'button',
  ...rest
}: {
  children?: ReactNode
  variant?: 'flat' | 'outlined' | 'text' | 'icon'
  color?: 'primary'
  size?: 'small' | 'default'
  icon?: string
  className?: string
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  const sizeClass = size === 'small' ? 'v-btn--small' : ''
  const variantClass = `v-btn--${variant}${color ? ` v-btn--${color}` : ''}`
  return (
    <button
      type={type}
      className={`v-btn ${sizeClass} ${variantClass} ${className}`.trim()}
      onClick={onClick}
      {...rest}
    >
      {icon && !children && <Icon icon={icon} size={20} />}
      {icon && children && <Icon icon={icon} size={16} />}
      {children}
    </button>
  )
}

export function Avatar({
  size,
  children,
  className = '',
}: {
  size: number
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`v-avatar ${className}`.trim()} style={{ width: size, height: size }}>
      {children}
    </div>
  )
}

export function ProgressLinear({
  value,
  height = 4,
  color = 'var(--amber)',
  bgColor = '#30363d',
  style,
  className = '',
}: {
  value: number
  height?: number
  color?: string
  bgColor?: string
  style?: React.CSSProperties
  className?: string
}) {
  return (
    <div
      className={`v-progress-linear ${className}`.trim()}
      style={{ height, background: bgColor }}
    >
      <div
        className="v-progress-linear__bar"
        style={{ width: `${value}%`, background: color, ...style }}
      />
    </div>
  )
}
