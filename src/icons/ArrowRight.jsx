export const ArrowRight = ({ width = 24, height = 24, ...rest }) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width={width}
			height={height}
			fill='currentColor'
			viewBox='0 0 24 24'
			{...rest}>
			<path d='M6 13h6v4l6-5-6-5v4H6z'></path>
		</svg>
	)
}
