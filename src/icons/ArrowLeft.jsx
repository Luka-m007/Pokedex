export const ArrowLeft = ({ width = 24, height = 24, ...rest }) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width={width}
			height={height}
			fill='currentColor'
			viewBox='0 0 24 24'
			{...rest}>
			<path d='m6 12 6 5v-4h6v-2h-6V7z'></path>
		</svg>
	)
}
