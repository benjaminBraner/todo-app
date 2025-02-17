export const getDarkColor = (color, factor = 0.8) => {
	// Elimina el símbolo '#' si está presente
	const hex = color.replace('#', '')

	// Convierte el color hexadecimal a valores RGB
	const r = parseInt(hex.substring(0, 2), 16)
	const g = parseInt(hex.substring(2, 4), 16)
	const b = parseInt(hex.substring(4, 6), 16)

	// Oscurece cada componente multiplicándolos por el factor (por defecto 0.8)
	const darken = (value) => Math.max(0, Math.min(255, Math.floor(value * factor)))

	const darkR = darken(r)
	const darkG = darken(g)
	const darkB = darken(b)

	// Convierte los valores RGB nuevamente a hexadecimal
	const toHex = (value) => value.toString(16).padStart(2, '0')

	return `#${toHex(darkR)}${toHex(darkG)}${toHex(darkB)}`
}
